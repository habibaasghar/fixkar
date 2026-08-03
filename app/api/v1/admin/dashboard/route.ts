import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { DashboardService } from "@/server/modules/admin/dashboard.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_DASHBOARD_VIEW);
  const kpis = await DashboardService.getKpis();
  return apiSuccess(kpis);
});
