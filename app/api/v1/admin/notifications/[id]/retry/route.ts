import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { QueueService } from "@/server/modules/notifications/queue.service";
import { recordAuditLog } from "@/server/shared/audit";

export const POST = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const dispatch = await QueueService.retry(id);

  await recordAuditLog({
    adminUserId: auth.userId,
    action: "NOTIFICATION_RETRIED",
    targetType: "NotificationDispatch",
    targetId: id,
    ipAddress,
  });

  return apiSuccess(dispatch);
});
