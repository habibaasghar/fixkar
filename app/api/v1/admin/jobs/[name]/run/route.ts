import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { ensureJobsRegistered, runJob } from "@/server/shared/jobs";
import { recordAuditLog } from "@/server/shared/audit";

/**
 * Manual trigger for testing/ops — no scheduler (pg_cron / Supabase Edge
 * Function) is wired up in this environment (no live Supabase project), so
 * this is the only way to actually run a job today. See docs/background-jobs.md
 * for the production scheduling plan.
 */
export const POST = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ name: string }> };
  const { name } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_SYSTEM_MANAGE);

  ensureJobsRegistered();
  const result = await runJob(name);

  await recordAuditLog({
    adminUserId: auth.userId,
    action: "JOB_RUN",
    targetType: "Job",
    targetId: name,
    newState: { success: result.success, message: result.message },
    ipAddress,
  });

  return apiSuccess(result);
});
