import { BookingStatus, LedgerEntryType, LedgerTransactionType, WalletBalanceField } from "@prisma/client";
import { BookingRepository } from "./booking.repository";
import { CustomerRepository } from "@/server/modules/customers/customer.repository";
import { VendorRepository } from "@/server/modules/vendors/vendor.repository";
import { NotFoundError, ForbiddenError, ConflictError, ValidationError } from "@/server/shared/errors";
import { isValidTransition } from "./booking.types";
import { UpdateBookingStatusInput } from "./booking.validators";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";
import { logger } from "@/server/shared/logger";
import { recordAuditLog } from "@/server/shared/audit";
import { CommissionEngine } from "@/server/modules/commission/commission.engine";
import { WalletRepository } from "@/server/modules/wallets/wallet.repository";
import { LedgerService } from "@/server/modules/wallets/ledger.service";

type LeadForBooking = {
  id: string;
  customerId: string | null;
  citySlug: string;
  serviceSlug: string;
  cityId: string;
  categoryId: string;
};

export class BookingService {
  /** Called right after a vendor accepts a Lead — see LeadService.acceptLead. */
  static async createFromAcceptedLead(lead: LeadForBooking, vendorProfileId: string) {
    if (!lead.customerId) {
      // Should be unreachable: LeadService.createLead always provisions a
      // CustomerProfile. Guarding here rather than letting a NOT NULL
      // constraint violation surface as an opaque 500.
      throw new ConflictError("Lead has no associated customer profile; cannot create a booking.");
    }

    const booking = await BookingRepository.create({
      lead: { connect: { id: lead.id } },
      customer: { connect: { id: lead.customerId } },
      vendor: { connect: { id: vendorProfileId } },
      citySlug: lead.citySlug,
      serviceSlug: lead.serviceSlug,
      city: { connect: { id: lead.cityId } },
      category: { connect: { id: lead.categoryId } },
      status: BookingStatus.ASSIGNED,
      statusLogs: { create: { status: BookingStatus.ASSIGNED, changedBy: vendorProfileId } },
    });

    logger.info({
      module: "bookings",
      action: "createFromAcceptedLead",
      message: `Booking ${booking.id} created from lead ${lead.id}`,
      data: { bookingId: booking.id, leadId: lead.id, vendorId: vendorProfileId },
    });

    const full = await BookingRepository.findByIdWithRelations(booking.id);
    if (full?.customer?.userId) {
      await NotificationService.trigger(full.customer.userId, NOTIFICATION_EVENTS.BOOKING_CONFIRMED, { bookingId: booking.id });
    }

    return full;
  }

  /**
   * The Phase 15 financial hook: calculates commission, credits the
   * platform's commission revenue and the vendor's pending earnings, and
   * stamps totalAmount/commissionAmount onto the Booking row. Idempotent —
   * safe to call even if a booking is somehow completed twice (vendor path,
   * then an admin force-status), since it checks for an existing posting
   * first rather than trusting the caller never double-fires.
   */
  private static async processCompletionFinancials(bookingId: string, totalAmount: number, cityId: string, categoryId: string, vendorId: string) {
    const alreadyPosted = await LedgerService.hasPostedForBooking(bookingId, LedgerTransactionType.BOOKING_PAYMENT);
    if (alreadyPosted) {
      logger.warn({ module: "bookings", action: "processCompletionFinancials", message: `Booking ${bookingId} already has a BOOKING_PAYMENT ledger entry — skipping duplicate posting.` });
      return;
    }

    const { commissionAmount, rule, usedFallback } = await CommissionEngine.resolve(totalAmount, categoryId, cityId);
    const vendorEarning = totalAmount - commissionAmount;

    const platformWallet = await WalletRepository.getOrCreatePlatformWallet();
    const vendorWallet = await WalletRepository.getOrCreateVendorWallet(vendorId);

    await LedgerService.post({
      type: LedgerTransactionType.BOOKING_PAYMENT,
      description: `Booking ${bookingId} completed — commission ${usedFallback ? "(system default)" : rule ? `(rule ${rule.id})` : ""}`,
      bookingId,
      entries: [
        // External: the customer's payment (cash/COD in V1) entering the system's books.
        { walletId: platformWallet.id, entryType: LedgerEntryType.DEBIT, amount: totalAmount, balanceField: WalletBalanceField.AVAILABLE, isExternal: true },
        // Platform retains its commission.
        { walletId: platformWallet.id, entryType: LedgerEntryType.CREDIT, amount: commissionAmount, balanceField: WalletBalanceField.AVAILABLE },
        // Vendor's earnings, owed but not yet settled.
        { walletId: vendorWallet.id, entryType: LedgerEntryType.CREDIT, amount: vendorEarning, balanceField: WalletBalanceField.PENDING },
      ],
    });

    await BookingRepository.updateDetails(bookingId, { totalAmount, commissionAmount });

    logger.info({
      module: "bookings",
      action: "processCompletionFinancials",
      message: `Booking ${bookingId} financials posted: total=${totalAmount}, commission=${commissionAmount}, vendorEarning=${vendorEarning}`,
      data: { bookingId, totalAmount, commissionAmount, vendorEarning },
    });
  }

  private static async getOwnedBookingOrThrow(bookingId: string, requestingUserId: string) {
    const booking = await BookingRepository.findByIdWithRelations(bookingId);
    if (!booking) throw new NotFoundError("Booking not found.");

    const isCustomer = booking.customer.userId === requestingUserId;
    const isVendor = booking.vendor.userId === requestingUserId;
    if (!isCustomer && !isVendor) {
      throw new ForbiddenError("You do not have permission to access this booking.");
    }

    return { booking, isCustomer, isVendor };
  }

  static async getById(bookingId: string, requestingUserId: string) {
    const { booking } = await this.getOwnedBookingOrThrow(bookingId, requestingUserId);
    return booking;
  }

  static async listForCustomer(userId: string, page = 1, pageSize = 20) {
    const profile = await CustomerRepository.findByUserId(userId);
    if (!profile) return { total: 0, items: [] };
    return BookingRepository.listForCustomer(profile.id, page, pageSize);
  }

  static async listForVendor(userId: string, page = 1, pageSize = 20) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) return { total: 0, items: [] };
    return BookingRepository.listForVendor(profile.id, page, pageSize);
  }

  /** Vendor-driven status update: EN_ROUTE / IN_PROGRESS / COMPLETED / CANCELLED. */
  static async updateStatus(bookingId: string, requestingUserId: string, input: UpdateBookingStatusInput) {
    const { booking, isVendor } = await this.getOwnedBookingOrThrow(bookingId, requestingUserId);
    if (!isVendor) {
      throw new ForbiddenError("Only the assigned vendor can update booking status.");
    }

    const targetStatus = input.status as BookingStatus;
    if (!isValidTransition(booking.status, targetStatus)) {
      throw new ConflictError(`Cannot transition booking from ${booking.status} to ${targetStatus}.`);
    }

    const totalAmount = input.totalAmount ?? booking.totalAmount ?? undefined;
    if (targetStatus === BookingStatus.COMPLETED && !totalAmount) {
      throw new ValidationError("A totalAmount (final invoice amount) is required to mark a booking completed.", [{ field: "totalAmount", issue: "Required when completing a booking." }]);
    }

    const transitioned = await BookingRepository.tryTransitionStatus(bookingId, booking.status, targetStatus, booking.vendor.id, input.notes);
    if (!transitioned) {
      throw new ConflictError("Booking status changed concurrently — please refresh and try again.");
    }

    if (targetStatus === BookingStatus.COMPLETED) {
      await this.processCompletionFinancials(bookingId, totalAmount!, booking.cityId, booking.categoryId, booking.vendor.id);
      await NotificationService.trigger(booking.customer.userId, NOTIFICATION_EVENTS.BOOKING_COMPLETED, { bookingId });
    } else if (targetStatus === BookingStatus.CANCELLED) {
      await NotificationService.trigger(booking.customer.userId, NOTIFICATION_EVENTS.BOOKING_CANCELLED, { bookingId });
    }

    return BookingRepository.findByIdWithRelations(bookingId);
  }

  /** Customer-driven cancellation — cannot cancel COMPLETED or already-CANCELLED bookings. */
  static async cancelByCustomer(bookingId: string, requestingUserId: string, reason?: string) {
    const { booking, isCustomer } = await this.getOwnedBookingOrThrow(bookingId, requestingUserId);
    if (!isCustomer) {
      throw new ForbiddenError("Only the customer who owns this booking can cancel it.");
    }

    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
      throw new ConflictError(`Booking cannot be cancelled — current status is ${booking.status}.`);
    }

    const transitioned = await BookingRepository.tryTransitionStatus(bookingId, booking.status, BookingStatus.CANCELLED, booking.customer.id, reason);
    if (!transitioned) {
      throw new ConflictError("Booking status changed concurrently — please refresh and try again.");
    }

    await NotificationService.trigger(booking.vendor.userId, NOTIFICATION_EVENTS.BOOKING_CANCELLED, { bookingId });

    return BookingRepository.findByIdWithRelations(bookingId);
  }

  // ---- Admin platform (Phase 14) ----

  static async adminSearch(filters: { status?: BookingStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    return BookingRepository.listAll(filters, page, pageSize);
  }

  static async adminGetById(bookingId: string) {
    const booking = await BookingRepository.findByIdWithRelations(bookingId);
    if (!booking) throw new NotFoundError("Booking not found.");
    return booking;
  }

  static async adminEdit(bookingId: string, data: { scheduledAt?: Date; totalAmount?: number; commissionAmount?: number }, adminUserId: string, ipAddress: string | null) {
    const booking = await BookingRepository.findByIdWithRelations(bookingId);
    if (!booking) throw new NotFoundError("Booking not found.");

    const updated = await BookingRepository.updateDetails(bookingId, data);

    await recordAuditLog({
      adminUserId,
      action: "BOOKING_EDITED",
      targetType: "Booking",
      targetId: bookingId,
      previousState: {
        scheduledAt: booking.scheduledAt?.toISOString() ?? null,
        totalAmount: booking.totalAmount,
        commissionAmount: booking.commissionAmount,
      },
      newState: {
        scheduledAt: data.scheduledAt?.toISOString() ?? null,
        totalAmount: data.totalAmount ?? null,
        commissionAmount: data.commissionAmount ?? null,
      },
      ipAddress,
    });

    return updated;
  }

  /** Admin override — bypasses the normal vendor-driven state machine entirely. Still audited + logged to BookingStatusLog. */
  static async adminForceStatus(bookingId: string, targetStatus: BookingStatus, adminUserId: string, ipAddress: string | null, notes?: string, totalAmount?: number) {
    const booking = await BookingRepository.findByIdWithRelations(bookingId);
    if (!booking) throw new NotFoundError("Booking not found.");

    const resolvedTotalAmount = totalAmount ?? booking.totalAmount ?? undefined;
    if (targetStatus === BookingStatus.COMPLETED && !resolvedTotalAmount) {
      throw new ValidationError("A totalAmount is required to force-complete a booking (set it here or via the booking edit endpoint first).", [
        { field: "totalAmount", issue: "Required when completing a booking." },
      ]);
    }

    await BookingRepository.forceStatus(bookingId, targetStatus, adminUserId, notes);

    await recordAuditLog({
      adminUserId,
      action: "BOOKING_STATUS_FORCED",
      targetType: "Booking",
      targetId: bookingId,
      previousState: { status: booking.status },
      newState: { status: targetStatus, notes },
      ipAddress,
    });

    if (targetStatus === BookingStatus.COMPLETED) {
      await this.processCompletionFinancials(bookingId, resolvedTotalAmount!, booking.cityId, booking.categoryId, booking.vendor.id);
      await NotificationService.trigger(booking.customer.userId, NOTIFICATION_EVENTS.BOOKING_COMPLETED, { bookingId });
    } else if (targetStatus === BookingStatus.CANCELLED) {
      await NotificationService.trigger(booking.customer.userId, NOTIFICATION_EVENTS.BOOKING_CANCELLED, { bookingId });
    }

    logger.info({ module: "bookings", action: "adminForceStatus", message: `Booking ${bookingId} forced to ${targetStatus} by admin ${adminUserId}` });

    return BookingRepository.findByIdWithRelations(bookingId);
  }

  static async adminCancel(bookingId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    return this.adminForceStatus(bookingId, BookingStatus.CANCELLED, adminUserId, ipAddress, notes);
  }

  static async adminComplete(bookingId: string, adminUserId: string, ipAddress: string | null, notes?: string, totalAmount?: number) {
    return this.adminForceStatus(bookingId, BookingStatus.COMPLETED, adminUserId, ipAddress, notes, totalAmount);
  }
}
