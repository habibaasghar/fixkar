import { LedgerEntryType, LedgerTransactionType, WalletBalanceField } from "@prisma/client";
import { WalletRepository } from "./wallet.repository";
import { LedgerService } from "./ledger.service";
import { VendorRepository } from "@/server/modules/vendors/vendor.repository";
import { CustomerRepository } from "@/server/modules/customers/customer.repository";
import { BookingRepository } from "@/server/modules/bookings/booking.repository";
import { NotFoundError, ValidationError, ConflictError } from "@/server/shared/errors";
import { recordAuditLog } from "@/server/shared/audit";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";

export class WalletService {
  static async getVendorWalletSummary(vendorUserId: string) {
    const profile = await VendorRepository.findFullProfileByUserId(vendorUserId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    return WalletRepository.getOrCreateVendorWallet(profile.id);
  }

  static async getVendorEntries(vendorUserId: string, page: number, pageSize: number) {
    const profile = await VendorRepository.findFullProfileByUserId(vendorUserId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    const wallet = await WalletRepository.getOrCreateVendorWallet(profile.id);
    return WalletRepository.listEntriesForWallet(wallet.id, page, pageSize);
  }

  static async getCustomerWalletSummary(customerUserId: string) {
    const profile = await CustomerRepository.findByUserId(customerUserId);
    if (!profile) throw new NotFoundError("No customer profile exists for this account.");
    return WalletRepository.getOrCreateCustomerWallet(profile.id);
  }

  static async getCustomerEntries(customerUserId: string, page: number, pageSize: number) {
    const profile = await CustomerRepository.findByUserId(customerUserId);
    if (!profile) throw new NotFoundError("No customer profile exists for this account.");
    const wallet = await WalletRepository.getOrCreateCustomerWallet(profile.id);
    return WalletRepository.listEntriesForWallet(wallet.id, page, pageSize);
  }

  // ---- Admin ----

  static async adminGetWallet(walletId: string) {
    const wallet = await WalletRepository.findById(walletId);
    if (!wallet) throw new NotFoundError("Wallet not found.");
    return wallet;
  }

  static async adminGetPlatformWallet() {
    return WalletRepository.getOrCreatePlatformWallet();
  }

  /**
   * Admin manual correction — always posted as a real entry against the
   * target wallet plus an `isExternal` offsetting entry, since a manual
   * correction by definition doesn't have a natural second internal account
   * (it exists specifically to fix a discrepancy against reality, not to
   * model a transfer between two of our own wallets).
   */
  static async adminManualAdjustment(
    walletId: string,
    field: WalletBalanceField,
    amount: number,
    direction: "credit" | "debit",
    reason: string,
    adminUserId: string,
    ipAddress: string | null
  ) {
    const wallet = await WalletRepository.findById(walletId);
    if (!wallet) throw new NotFoundError("Wallet not found.");

    const ledgerTransaction = await LedgerService.post({
      type: LedgerTransactionType.MANUAL_CORRECTION,
      description: reason,
      entries: [
        {
          walletId,
          entryType: direction === "credit" ? LedgerEntryType.CREDIT : LedgerEntryType.DEBIT,
          amount,
          balanceField: field,
        },
        {
          walletId,
          entryType: direction === "credit" ? LedgerEntryType.DEBIT : LedgerEntryType.CREDIT,
          amount,
          balanceField: field,
          isExternal: true,
        },
      ],
    });

    await recordAuditLog({
      adminUserId,
      action: "WALLET_MANUAL_ADJUSTMENT",
      targetType: "Wallet",
      targetId: walletId,
      newState: { field, amount, direction, reason, ledgerTransactionId: ledgerTransaction.id },
      ipAddress,
    });

    return WalletRepository.findById(walletId);
  }

  /**
   * Refunds a booking's amount (or a partial amount) back to the customer as
   * in-app spendable credit, funded by reducing the platform's recognized
   * commission revenue. Both sides are our own wallets — no external entry
   * needed, since no real payment gateway exists yet to refund money to
   * (matches "Gateway integrations come later").
   */
  static async adminRefund(bookingId: string, amount: number, reason: string, adminUserId: string, ipAddress: string | null) {
    if (amount <= 0) throw new ValidationError("Refund amount must be positive.");

    const booking = await BookingRepository.findByIdWithRelations(bookingId);
    if (!booking) throw new NotFoundError("Booking not found.");
    if (!booking.totalAmount) {
      throw new ConflictError("Cannot refund a booking that has no recorded totalAmount yet.");
    }

    const platformWallet = await WalletRepository.getOrCreatePlatformWallet();
    const customerWallet = await WalletRepository.getOrCreateCustomerWallet(booking.customer.id);

    const ledgerTransaction = await LedgerService.post({
      type: LedgerTransactionType.REFUND,
      description: reason,
      bookingId,
      entries: [
        { walletId: platformWallet.id, entryType: LedgerEntryType.DEBIT, amount, balanceField: WalletBalanceField.AVAILABLE },
        { walletId: customerWallet.id, entryType: LedgerEntryType.CREDIT, amount, balanceField: WalletBalanceField.AVAILABLE },
      ],
    });

    await recordAuditLog({
      adminUserId,
      action: "REFUND_ISSUED",
      targetType: "Booking",
      targetId: bookingId,
      newState: { amount, reason, ledgerTransactionId: ledgerTransaction.id },
      ipAddress,
    });

    await NotificationService.trigger(booking.customer.userId, NOTIFICATION_EVENTS.REFUND_ISSUED, { bookingId, amount });

    return { customerWallet: await WalletRepository.findById(customerWallet.id), ledgerTransactionId: ledgerTransaction.id };
  }
}
