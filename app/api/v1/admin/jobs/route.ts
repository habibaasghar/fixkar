import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { ensureJobsRegistered, listJobs } from "@/server/shared/jobs";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_SYSTEM_MANAGE);

  ensureJobsRegistered();
  return apiSuccess(listJobs());
});
