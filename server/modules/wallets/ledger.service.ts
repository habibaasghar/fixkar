import { db } from "@/server/shared/db";
import { LedgerEntryType, LedgerTransactionType, WalletBalanceField } from "@prisma/client";
import { ValidationError, ConflictError } from "@/server/shared/errors";
import { WalletRepository } from "./wallet.repository";
import { logger } from "@/server/shared/logger";

const BALANCE_TOLERANCE = 0.01; // float rounding slack, in PKR

export interface LedgerEntryInput {
  walletId: string;
  entryType: LedgerEntryType;
  amount: number;
  balanceField: WalletBalanceField;
  /** True when the other side of this entry is outside the ledger (COD cash in, payout cash out). No matching wallet entry is required for these. */
  isExternal?: boolean;
}

export interface PostLedgerTransactionInput {
  type: LedgerTransactionType;
  description: string;
  bookingId?: string;
  referenceId?: string;
  entries: LedgerEntryInput[];
}

/**
 * The single write path for every wallet balance change (Phase 9.1's
 * decision, extended). Nothing outside this module may call
 * `db.wallet.update` on a balance field directly. Guarantees:
 *   1. Atomicity — the whole set of entries commits or none do ($transaction).
 *   2. Double-entry balance — ALL credit and debit amounts (including
 *      external ones) must sum to the same total, checked before anything
 *      is written. This is the standard "books always balance" property.
 *   3. Balance mutation only happens for non-external entries. An `isExternal`
 *      entry's counterpart is outside the ledger (COD cash from a customer,
 *      a payout leaving to a vendor's bank) — it exists so the transaction's
 *      entries sum to zero for auditability, but applying its delta to a
 *      wallet would be double-counting: the real economic effect is already
 *      captured by the non-external entry(ies) in the same transaction.
 * Balance mutation itself uses Prisma's atomic increment/decrement (a single
 * UPDATE statement), which is race-free without needing SELECT...FOR UPDATE —
 * there is no read-then-write gap for two concurrent postings to land in.
 */
export class LedgerService {
  static async post(input: PostLedgerTransactionInput) {
    if (input.entries.length < 1) {
      throw new ValidationError("A ledger transaction requires at least one entry.");
    }
    for (const entry of input.entries) {
      if (entry.amount <= 0) {
        throw new ValidationError("Ledger entry amounts must be positive.");
      }
    }

    const totalCredits = input.entries.filter((e) => e.entryType === LedgerEntryType.CREDIT).reduce((sum, e) => sum + e.amount, 0);
    const totalDebits = input.entries.filter((e) => e.entryType === LedgerEntryType.DEBIT).reduce((sum, e) => sum + e.amount, 0);

    if (Math.abs(totalCredits - totalDebits) > BALANCE_TOLERANCE) {
      throw new ConflictError(`Ledger entries do not balance: credits (${totalCredits}) != debits (${totalDebits}).`);
    }

    const ledgerTransaction = await db.$transaction(async (tx) => {
      const created = await tx.ledgerTransaction.create({
        data: {
          type: input.type,
          description: input.description,
          bookingId: input.bookingId,
          referenceId: input.referenceId,
        },
      });

      for (const entry of input.entries) {
        await tx.ledgerEntry.create({
          data: {
            ledgerTransactionId: created.id,
            walletId: entry.walletId,
            entryType: entry.entryType,
            amount: entry.amount,
            balanceField: entry.balanceField,
            isExternal: entry.isExternal ?? false,
          },
        });

        if (!entry.isExternal) {
          const delta = entry.entryType === LedgerEntryType.CREDIT ? entry.amount : -entry.amount;
          await WalletRepository.applyDelta(tx, entry.walletId, entry.balanceField, delta);
        }
      }

      return created;
    });

    logger.info({
      module: "wallets",
      action: "ledgerPost",
      message: `Ledger transaction ${ledgerTransaction.id} posted (${input.type})`,
      data: { ledgerTransactionId: ledgerTransaction.id, type: input.type, bookingId: input.bookingId, entryCount: input.entries.length },
    });

    return ledgerTransaction;
  }

  /** Idempotency guard for booking-completion postings — see booking.service.ts. */
  static async hasPostedForBooking(bookingId: string, type: LedgerTransactionType): Promise<boolean> {
    const existing = await db.ledgerTransaction.findFirst({ where: { bookingId, type }, select: { id: true } });
    return existing !== null;
  }
}
