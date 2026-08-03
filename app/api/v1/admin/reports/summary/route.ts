import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { ReportService } from "@/server/modules/reports/report.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_VIEW);

  const { searchParams } = new URL(request.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const range = {
    from: fromParam ? new Date(fromParam) : undefined,
    to: toParam ? new Date(toParam) : undefined,
  };

  const summary = await ReportService.getSummary(range);
  return apiSuccess(summary);
});
