import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { processQueueSchema } from "@/server/modules/notifications/notification.validators";
import { QueueService } from "@/server/modules/notifications/queue.service";

/**
 * Manual trigger for testing/ops — this codebase has no background
 * worker/cron infra yet (same gap as Lead expiry in Phase 13), so this is
 * the only way to actually drain the queue today. A future scheduled job
 * would call QueueService.processPendingBatch() directly instead.
 */
export const POST = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const body = await request.json().catch(() => ({}));
  const { batchSize } = processQueueSchema.parse(body);

  const result = await QueueService.processPendingBatch(batchSize);
  return apiSuccess(result);
});
