import { db } from "@/server/shared/db";
import { SettlementStatus } from "@prisma/client";

export class SettlementRepository {
  static async isReferenceNumberTaken(referenceNumber: string): Promise<boolean> {
    const existing = await db.settlement.findUnique({ where: { referenceNumber }, select: { id: true } });
    return existing !== null;
  }

  static async create(data: { vendorId: string; walletId: string; referenceNumber: string; amount: number; notes?: string }) {
    return db.settlement.create({ data });
  }

  static async findById(id: string) {
    return db.settlement.findUnique({ where: { id } });
  }

  // Phase 17 audit fix: was an unbounded findMany — a vendor's full payout
  // history now paginates instead of returning every settlement ever made.
  static async listForVendor(vendorId: string, page = 1, pageSize = 20) {
    const where = { vendorId };
    const [total, items] = await Promise.all([
      db.settlement.count({ where }),
      db.settlement.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);
    return { total, items };
  }

  static async listAll(filters: { status?: SettlementStatus; vendorId?: string }, page: number, pageSize: number) {
    const where = { ...(filters.status ? { status: filters.status } : {}), ...(filters.vendorId ? { vendorId: filters.vendorId } : {}) };
    const [total, items] = await Promise.all([
      db.settlement.count({ where }),
      db.settlement.findMany({
        where,
        include: { vendor: { select: { fullName: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { total, items };
  }

  static async markCompleted(id: string) {
    return db.settlement.update({ where: { id }, data: { status: SettlementStatus.COMPLETED, completedAt: new Date() } });
  }

  static async markFailed(id: string, notes?: string) {
    return db.settlement.update({ where: { id }, data: { status: SettlementStatus.FAILED, notes } });
  }
}
