import { CommissionRule, CommissionType } from "@prisma/client";
import { CommissionRepository } from "./commission.repository";

const DEFAULT_COMMISSION_SETTING_KEY = "default_commission_percentage";
const FALLBACK_PERCENTAGE = 12; // only used if the SystemSetting row itself doesn't exist yet

function specificityScore(rule: CommissionRule): number {
  // Higher = more specific. category+city=2, one of them=1, global=0.
  return (rule.categoryId ? 1 : 0) + (rule.cityId ? 1 : 0);
}

export interface CommissionResolution {
  commissionAmount: number;
  rule: CommissionRule | null;
  usedFallback: boolean;
}

/**
 * No hardcoded commission values: resolves the most specific active
 * CommissionRule (category+city > category-only > city-only > global), and
 * only falls back to the SystemSetting "default_commission_percentage" row
 * if no rule exists at all. FALLBACK_PERCENTAGE above is a last-resort
 * constant used only if that SystemSetting row is itself missing — not a
 * hardcoded commission value in the normal path.
 */
export class CommissionEngine {
  static async resolve(totalAmount: number, categoryId: string, cityId: string): Promise<CommissionResolution> {
    const candidates = await CommissionRepository.findAllApplicable(categoryId, cityId);

    const rule = candidates.sort((a, b) => specificityScore(b) - specificityScore(a))[0] ?? null;

    if (rule) {
      const commissionAmount = rule.type === CommissionType.FLAT ? rule.value : totalAmount * (rule.value / 100);
      return { commissionAmount: Math.min(commissionAmount, totalAmount), rule, usedFallback: false };
    }

    const setting = await CommissionRepository.getSystemSetting(DEFAULT_COMMISSION_SETTING_KEY);
    const percentage = setting ? parseFloat(setting.value) : FALLBACK_PERCENTAGE;
    const commissionAmount = totalAmount * (percentage / 100);

    return { commissionAmount: Math.min(commissionAmount, totalAmount), rule: null, usedFallback: true };
  }
}
