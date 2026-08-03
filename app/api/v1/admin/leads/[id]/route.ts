import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { LeadService } from "@/server/modules/leads/lead.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  await requireAdminAuth(request, PERMISSIONS.ADMIN_LEAD_MANAGE);

  const lead = await LeadService.adminGetById(id);
  return apiSuccess(lead);
});
