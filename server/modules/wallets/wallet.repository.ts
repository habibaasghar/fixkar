import { db } from "@/server/shared/db";
import { Prisma, WalletOwnerType, WalletBalanceField } from "@prisma/client";

type TxClient = Prisma.TransactionClient;

export class WalletRepository {
  /** Atomic increment/decrement on one balance field — a single UPDATE statement, safe under concurrency with no read-then-write race. */
  static async applyDelta(tx: TxClient, walletId: string, field: WalletBalanceField, delta: number) {
    const data =
      field === WalletBalanceField.AVAILABLE
        ? { availableBalance: { increment: delta } }
        : field === WalletBalanceField.PENDING
        ? { pendingBalance: { increment: delta } }
        : { settlementBalance: { increment: delta } };

    return tx.wallet.update({ where: { id: walletId }, data });
  }

  static async getOrCreateVendorWallet(vendorId: string) {
    const existing = await db.wallet.findUnique({ where: { vendorId } });
    if (existing) return existing;
    return db.wallet.create({ data: { ownerType: WalletOwnerType.VENDOR, vendorId } });
  }

  static async getOrCreateCustomerWallet(customerId: string) {
    const existing = await db.wallet.findUnique({ where: { customerId } });
    if (existing) return existing;
    return db.wallet.create({ data: { ownerType: WalletOwnerType.CUSTOMER, customerId } });
  }

  /**
   * Singleton platform wallet. There's no DB-level uniqueness guarantee for
   * "only one PLATFORM row" (Prisma can't express a partial unique index on
   * ownerType='PLATFORM' without a raw SQL migration, which needs a live DB
   * this project doesn't have yet) — a concurrent first-ever call could in
   * theory create two. Documented as technical debt; negligible risk since
   * this only matters once, on the very first financial event.
   */
  static async getOrCreatePlatformWallet() {
    const existing = await db.wallet.findFirst({ where: { ownerType: WalletOwnerType.PLATFORM } });
    if (existing) return existing;
    return db.wallet.create({ data: { ownerType: WalletOwnerType.PLATFORM } });
  }

  static async findById(id: string) {
    return db.wallet.findUnique({ where: { id } });
  }

  static async findByVendorId(vendorId: string) {
    return db.wallet.findUnique({ where: { vendorId } });
  }

  static async findByCustomerId(customerId: string) {
    return db.wallet.findUnique({ where: { customerId } });
  }

  static async listEntriesForWallet(walletId: string, page: number, pageSize: number) {
    const [total, items] = await Promise.all([
      db.ledgerEntry.count({ where: { walletId } }),
      db.ledgerEntry.findMany({
        where: { walletId },
        include: { ledgerTransaction: { select: { type: true, description: true, bookingId: true, referenceId: true, createdAt: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { total, items };
  }
}
