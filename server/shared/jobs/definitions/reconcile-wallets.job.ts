import { JobDefinition } from "../job.types";
import { WalletReconciliationService } from "@/server/modules/wallets/reconciliation.service";

/** Idempotent by nature — a pure read/compare, no writes at all (mismatches are alerted, never auto-corrected, per Phase 9.1's decision). */
export const reconcileWalletsJob: JobDefinition = {
  name: "reconcile-wallets",
  description: "Recomputes every wallet's balance from the ledger and alerts on any drift from the stored value.",
  run: async () => {
    const result = await WalletReconciliationService.reconcileAll();
    return {
      success: result.mismatches.length === 0,
      message: result.mismatches.length === 0
        ? `Checked ${result.checked} wallet(s) — no mismatches.`
        : `Checked ${result.checked} wallet(s) — found ${result.mismatches.length} mismatch(es). See logs for details.`,
      data: result,
    };
  },
};
