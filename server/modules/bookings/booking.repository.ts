import { db } from "@/server/shared/db";
import { BookingStatus, Prisma } from "@prisma/client";
import { NOT_DELETED } from "@/server/shared/soft-delete";

const DETAIL_INCLUDE = {
  customer: { select: { id: true, userId: true, name: true } },
  vendor: { select: { id: true, userId: true, slug: true, fullName: true } },
  lead: { select: { id: true, referenceCode: true, description: true } },
  items: true,
  statusLogs: { orderBy: { createdAt: "asc" as const } },
  review: true,
};

export class BookingRepository {
  static async create(data: Prisma.BookingCreateInput) {
    return db.booking.create({ data, include: DETAIL_INCLUDE });
  }

  static async findById(id: string) {
    return db.booking.findFirst({ where: { id, ...NOT_DELETED } });
  }

  static async findByIdWithRelations(id: string) {
    return db.booking.findFirst({ where: { id, ...NOT_DELETED }, include: DETAIL_INCLUDE });
  }

  // Phase 17 audit fix: these were unbounded findMany calls — a long-tenured
  // customer/vendor's full history now paginates instead of returning every
  // row ever created.
  static async listForCustomer(customerId: string, page = 1, pageSize = 20) {
    const where = { customerId, ...NOT_DELETED };
    const [total, items] = await Promise.all([
      db.booking.count({ where }),
      db.booking.findMany({ where, include: DETAIL_INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);
    return { total, items };
  }

  static async listForVendor(vendorId: string, page = 1, pageSize = 20) {
    const where = { vendorId, ...NOT_DELETED };
    const [total, items] = await Promise.all([
      db.booking.count({ where }),
      db.booking.findMany({ where, include: DETAIL_INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);
    return { total, items };
  }

  /** Unguarded — kept for callers that have already validated the transition themselves. */
  static async updateStatus(id: string, status: BookingStatus, changedBy: string, notes?: string) {
    return db.$transaction([
      db.booking.update({ where: { id }, data: { status } }),
      db.bookingStatusLog.create({ data: { bookingId: id, status, changedBy, notes } }),
    ]);
  }

  /**
   * Atomic guarded transition — succeeds only if the booking was still in
   * `fromStatus` at the moment of the UPDATE, preventing two concurrent
   * status-update calls (or a cancel racing a completion) from both applying.
   */
  static async tryTransitionStatus(id: string, fromStatus: BookingStatus, toStatus: BookingStatus, changedBy: string, notes?: string): Promise<boolean> {
    const result = await db.booking.updateMany({ where: { id, status: fromStatus }, data: { status: toStatus } });
    if (result.count === 1) {
      await db.bookingStatusLog.create({ data: { bookingId: id, status: toStatus, changedBy, notes } });
      return true;
    }
    return false;
  }

  static async listAll(filters: { status?: BookingStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    const where: Prisma.BookingWhereInput = {
      ...NOT_DELETED,
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.citySlug ? { citySlug: filters.citySlug } : {}),
      ...(filters.search
        ? { OR: [{ id: filters.search }, { lead: { referenceCode: { contains: filters.search, mode: "insensitive" } } }] }
        : {}),
    };

    const [total, items] = await Promise.all([
      db.booking.count({ where }),
      db.booking.findMany({ where, include: DETAIL_INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);

    return { total, items };
  }

  static async updateDetails(id: string, data: { scheduledAt?: Date; totalAmount?: number; commissionAmount?: number }) {
    return db.booking.update({ where: { id }, data });
  }

  /** Admin override — writes the status unconditionally (no legal-transition check, no concurrency guard needed since this is a deliberate admin correction, not a racing user action). */
  static async forceStatus(id: string, status: BookingStatus, changedBy: string, notes?: string) {
    return db.$transaction([
      db.booking.update({ where: { id }, data: { status } }),
      db.bookingStatusLog.create({ data: { bookingId: id, status, changedBy, notes } }),
    ]);
  }
}
