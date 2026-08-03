import { LedgerEntryType, LedgerTransactionType, WalletBalanceField, SettlementStatus } from "@prisma/client";
import { SettlementRepository } from "./settlement.repository";
import { WalletRepository } from "@/server/modules/wallets/wallet.repository";
import { LedgerService } from "@/server/modules/wallets/ledger.service";
import { VendorRepository } from "@/server/modules/vendors/vendor.repository";
import { NotFoundError, ValidationError, ConflictError } from "@/server/shared/errors";
import { recordAuditLog } from "@/server/shared/audit";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";

export class SettlementService {
  private static async generateReferenceNumber(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = `STL-${Math.floor(10000 + Math.random() * 90000)}`;
      if (!(await SettlementRepository.isReferenceNumberTaken(code))) return code;
    }
    throw new ConflictError("Could not generate a unique settlement reference. Please try again.");
  }

  /** Moves `amount` from the vendor's pendingBalance into settlementBalance and creates a PENDING Settlement record. */
  static async create(vendorId: string, amount: number, notes: string | undefined, adminUserId: string, ipAddress: string | null) {
    if (amount <= 0) throw new ValidationError("Settlement amount must be positive.");

    const vendor = await VendorRepository.findFullProfileById(vendorId);
    if (!vendor) throw new NotFoundError("Vendor not found.");

    const wallet = await WalletRepository.getOrCreateVendorWallet(vendorId);
    if (wallet.pendingBalance < amount) {
      throw new ConflictError(`Cannot settle ${amount} — vendor's pending balance is only ${wallet.pendingBalance}.`);
    }

    const referenceNumber = await this.generateReferenceNumber();

    const settlement = await SettlementRepository.create({ vendorId, walletId: wallet.id, referenceNumber, amount, notes });

    await LedgerService.post({
      type: LedgerTransactionType.SETTLEMENT,
      description: `Settlement ${referenceNumber} created`,
      referenceId: settlement.id,
      entries: [
        { walletId: wallet.id, entryType: LedgerEntryType.DEBIT, amount, balanceField: WalletBalanceField.PENDING },
        { walletId: wallet.id, entryType: LedgerEntryType.CREDIT, amount, balanceField: WalletBalanceField.SETTLEMENT },
      ],
    });

    await recordAuditLog({
      adminUserId,
      action: "SETTLEMENT_CREATED",
      targetType: "Settlement",
      targetId: settlement.id,
      newState: { vendorId, amount, referenceNumber },
      ipAddress,
    });

    await NotificationService.trigger(vendor.userId, NOTIFICATION_EVENTS.SETTLEMENT_CREATED, { settlementId: settlement.id, referenceNumber, amount });

    return settlement;
  }

  /** Marks a PENDING settlement COMPLETED and removes the amount from the vendor's tracked balance (paid out — no gateway integration yet, so this is a bookkeeping-only completion). */
  static async complete(settlementId: string, adminUserId: string, ipAddress: string | null) {
    const settlement = await SettlementRepository.findById(settlementId);
    if (!settlement) throw new NotFoundError("Settlement not found.");
    if (settlement.status !== SettlementStatus.PENDING) {
      throw new ConflictError(`Settlement cannot be completed — current status is ${settlement.status}.`);
    }

    await LedgerService.post({
      type: LedgerTransactionType.SETTLEMENT,
      description: `Settlement ${settlement.referenceNumber} completed (paid out)`,
      referenceId: settlement.id,
      entries: [
        { walletId: settlement.walletId, entryType: LedgerEntryType.DEBIT, amount: settlement.amount, balanceField: WalletBalanceField.SETTLEMENT },
        { walletId: settlement.walletId, entryType: LedgerEntryType.CREDIT, amount: settlement.amount, balanceField: WalletBalanceField.SETTLEMENT, isExternal: true },
      ],
    });

    const updated = await SettlementRepository.markCompleted(settlementId);

    const vendor = await VendorRepository.findFullProfileById(settlement.vendorId);

    await recordAuditLog({
      adminUserId,
      action: "SETTLEMENT_COMPLETED",
      targetType: "Settlement",
      targetId: settlementId,
      previousState: { status: SettlementStatus.PENDING },
      newState: { status: SettlementStatus.COMPLETED },
      ipAddress,
    });

    if (vendor) {
      await NotificationService.trigger(vendor.userId, NOTIFICATION_EVENTS.SETTLEMENT_COMPLETED, { settlementId, referenceNumber: settlement.referenceNumber });
    }

    return updated;
  }

  static async listForVendor(vendorUserId: string, page = 1, pageSize = 20) {
    const vendor = await VendorRepository.findFullProfileByUserId(vendorUserId);
    if (!vendor) throw new NotFoundError("No vendor profile exists for this account.");
    return SettlementRepository.listForVendor(vendor.id, page, pageSize);
  }

  static async adminList(filters: { status?: SettlementStatus; vendorId?: string }, page: number, pageSize: number) {
    return SettlementRepository.listAll(filters, page, pageSize);
  }
}
