import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { updateCommissionRuleSchema } from "@/server/modules/commission/commission.validators";
import { CommissionService } from "@/server/modules/commission/commission.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_MANAGE);

  const body = await request.json();
  const input = updateCommissionRuleSchema.parse(body);

  const rule = await CommissionService.updateRule(id, input, auth.userId, ipAddress);
  return apiSuccess(rule);
});
