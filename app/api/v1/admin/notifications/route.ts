import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { QueueService } from "@/server/modules/notifications/queue.service";
import { NotificationDeliveryStatus, NotificationChannel } from "@prisma/client";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const status = searchParams.get("status") as NotificationDeliveryStatus | null;
  const channel = searchParams.get("channel") as NotificationChannel | null;
  const userId = searchParams.get("userId") ?? undefined;

  const result = await QueueService.listAll({ status: status ?? undefined, channel: channel ?? undefined, userId }, page, pageSize);
  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
