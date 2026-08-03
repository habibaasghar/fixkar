import { CommissionRepository } from "./commission.repository";
import { NotFoundError } from "@/server/shared/errors";
import { recordAuditLog } from "@/server/shared/audit";
import { CreateCommissionRuleInput, UpdateCommissionRuleInput } from "./commission.validators";

export class CommissionService {
  static async listRules() {
    return CommissionRepository.listAll();
  }

  static async createRule(input: CreateCommissionRuleInput, adminUserId: string, ipAddress: string | null) {
    const rule = await CommissionRepository.create(input);
    await recordAuditLog({ adminUserId, action: "COMMISSION_RULE_CREATED", targetType: "CommissionRule", targetId: rule.id, newState: input, ipAddress });
    return rule;
  }

  static async updateRule(id: string, input: UpdateCommissionRuleInput, adminUserId: string, ipAddress: string | null) {
    const existing = await CommissionRepository.findById(id);
    if (!existing) throw new NotFoundError("Commission rule not found.");

    const updated = await CommissionRepository.update(id, input);
    await recordAuditLog({
      adminUserId,
      action: "COMMISSION_RULE_UPDATED",
      targetType: "CommissionRule",
      targetId: id,
      previousState: { type: existing.type, value: existing.value, isActive: existing.isActive },
      newState: input,
      ipAddress,
    });
    return updated;
  }
}
