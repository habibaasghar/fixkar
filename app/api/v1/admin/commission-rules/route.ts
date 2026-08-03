import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { createCommissionRuleSchema } from "@/server/modules/commission/commission.validators";
import { CommissionService } from "@/server/modules/commission/commission.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_VIEW);
  const rules = await CommissionService.listRules();
  return apiSuccess(rules);
});

export const POST = withErrorHandler(async (request: Request) => {
  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_MANAGE);

  const body = await request.json();
  const input = createCommissionRuleSchema.parse(body);

  const rule = await CommissionService.createRule(input, auth.userId, ipAddress);
  return apiSuccess(rule, undefined, 201);
});
