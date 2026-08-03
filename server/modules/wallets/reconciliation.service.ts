import { db } from "@/server/shared/db";
import { LedgerEntryType, WalletBalanceField } from "@prisma/client";
import { logger } from "@/server/shared/logger";

const TOLERANCE = 0.01; // float rounding slack, in PKR

export interface WalletMismatch {
  walletId: string;
  field: WalletBalanceField;
  stored: number;
  computed: number;
}

const FIELD_COLUMN: Record<WalletBalanceField, "availableBalance" | "pendingBalance" | "settlementBalance"> = {
  AVAILABLE: "availableBalance",
  PENDING: "pendingBalance",
  SETTLEMENT: "settlementBalance",
};

/**
 * Phase 9.1's decision: balances are stored (not derived) for read
 * performance, but must be periodically reconciled against the ledger — the
 * source of truth — to catch any drift. Per that decision, mismatches are
 * ALERTED, never silently auto-corrected (a silent fix would hide the bug
 * that caused the drift in the first place).
 *
 * Implemented as two bulk queries (one groupBy across all wallets' ledger
 * entries, one findMany of all wallets) rather than a per-wallet loop, so
 * this stays O(1) round trips regardless of how many wallets exist.
 */
export class WalletReconciliationService {
  static async reconcileAll(): Promise<{ checked: number; mismatches: WalletMismatch[] }> {
    const [wallets, sums] = await Promise.all([
      db.wallet.findMany({ select: { id: true, availableBalance: true, pendingBalance: true, settlementBalance: true } }),
      db.ledgerEntry.groupBy({
        by: ["walletId", "balanceField", "entryType"],
        where: { isExternal: false },
        _sum: { amount: true },
      }),
    ]);

    const computed = new Map<string, Record<WalletBalanceField, number>>();
    for (const wallet of wallets) {
      computed.set(wallet.id, { AVAILABLE: 0, PENDING: 0, SETTLEMENT: 0 });
    }
    for (const row of sums) {
      const bucket = computed.get(row.walletId);
      if (!bucket) continue;
      const amount = row._sum.amount ?? 0;
      bucket[row.balanceField] += row.entryType === LedgerEntryType.CREDIT ? amount : -amount;
    }

    const mismatches: WalletMismatch[] = [];
    for (const wallet of wallets) {
      const expected = computed.get(wallet.id)!;
      for (const field of Object.values(WalletBalanceField)) {
        const stored = wallet[FIELD_COLUMN[field]];
        const expectedValue = expected[field];
        if (Math.abs(stored - expectedValue) > TOLERANCE) {
          mismatches.push({ walletId: wallet.id, field, stored, computed: expectedValue });
        }
      }
    }

    if (mismatches.length > 0) {
      logger.error({
        module: "wallets",
        action: "reconcileAll",
        message: `Wallet reconciliation found ${mismatches.length} mismatch(es) — stored balance disagrees with the ledger`,
        data: { mismatches },
      });
    }

    return { checked: wallets.length, mismatches };
  }
}
