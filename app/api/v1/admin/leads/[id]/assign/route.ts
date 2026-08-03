import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { assignLeadSchema } from "@/server/modules/admin/admin.validators";
import { LeadService } from "@/server/modules/leads/lead.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_LEAD_MANAGE);

  const body = await request.json();
  const { vendorId, notes } = assignLeadSchema.parse(body);

  const lead = await LeadService.adminAssign(id, vendorId, auth.userId, ipAddress, notes);
  return apiSuccess(lead);
});
