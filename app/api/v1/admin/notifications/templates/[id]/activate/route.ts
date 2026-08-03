import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { TemplateService } from "@/server/modules/notifications/template.service";
import { recordAuditLog } from "@/server/shared/audit";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const template = await TemplateService.activate(id);

  await recordAuditLog({ adminUserId: auth.userId, action: "NOTIFICATION_TEMPLATE_ACTIVATED", targetType: "NotificationTemplate", targetId: id, ipAddress });

  return apiSuccess(template);
});
