import { db } from "@/server/shared/db";
import { LedgerEntryType, LedgerTransactionType, WalletOwnerType } from "@prisma/client";
import { WalletRepository } from "@/server/modules/wallets/wallet.repository";

interface DateRange {
  from?: Date;
  to?: Date;
}

/**
 * Reusable reporting services built directly on the LedgerEntry/LedgerTransaction
 * tables — the source of truth. Designed so the Phase 14 dashboard (or any
 * future admin reporting page) can call these directly without refactoring:
 * each method takes an optional date range and returns a plain number/summary.
 */
export class ReportService {
  private static rangeWhere(range?: DateRange) {
    if (!range?.from && !range?.to) return {};
    return { createdAt: { ...(range.from ? { gte: range.from } : {}), ...(range.to ? { lte: range.to } : {}) } };
  }

  /** Platform's realized commission revenue (non-external CREDIT entries to the platform wallet's AVAILABLE balance from booking completions). */
  static async getCommissionTotal(range?: DateRange): Promise<number> {
    const platformWallet = await WalletRepository.getOrCreatePlatformWallet();
    const result = await db.ledgerEntry.aggregate({
      where: {
        walletId: platformWallet.id,
        entryType: LedgerEntryType.CREDIT,
        isExternal: false,
        ledgerTransaction: { type: LedgerTransactionType.BOOKING_PAYMENT, ...this.rangeWhere(range) },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }

  static async getDailyRevenue(date: Date): Promise<number> {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(date); end.setHours(23, 59, 59, 999);
    return this.getCommissionTotal({ from: start, to: end });
  }

  static async getMonthlyRevenue(year: number, month: number): Promise<number> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return this.getCommissionTotal({ from: start, to: end });
  }

  /** Total vendor earnings recognized (pending + settled) across all vendors, or one vendor if given. */
  static async getVendorEarningsTotal(vendorWalletId?: string, range?: DateRange): Promise<number> {
    const result = await db.ledgerEntry.aggregate({
      where: {
        ...(vendorWalletId ? { walletId: vendorWalletId } : { wallet: { ownerType: WalletOwnerType.VENDOR } }),
        entryType: LedgerEntryType.CREDIT,
        isExternal: false,
        ledgerTransaction: { type: LedgerTransactionType.BOOKING_PAYMENT, ...this.rangeWhere(range) },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }

  static async getRefundTotal(range?: DateRange): Promise<number> {
    const platformWallet = await WalletRepository.getOrCreatePlatformWallet();
    const result = await db.ledgerEntry.aggregate({
      where: {
        walletId: platformWallet.id,
        entryType: LedgerEntryType.DEBIT,
        ledgerTransaction: { type: LedgerTransactionType.REFUND, ...this.rangeWhere(range) },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }

  static async getSummary(range?: DateRange) {
    const [commissionTotal, vendorEarningsTotal, refundTotal] = await Promise.all([
      this.getCommissionTotal(range),
      this.getVendorEarningsTotal(undefined, range),
      this.getRefundTotal(range),
    ]);
    return { commissionTotal, vendorEarningsTotal, refundTotal };
  }
}
