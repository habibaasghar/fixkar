import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { createTemplateSchema } from "@/server/modules/notifications/notification.validators";
import { TemplateService } from "@/server/modules/notifications/template.service";
import { recordAuditLog } from "@/server/shared/audit";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const templates = await TemplateService.listAll();
  return apiSuccess(templates);
});

export const POST = withErrorHandler(async (request: Request) => {
  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const body = await request.json();
  const { key, channel, locale, subject, body: templateBody } = createTemplateSchema.parse(body);

  const template = await TemplateService.createVersion(key, channel, locale, subject, templateBody);

  await recordAuditLog({
    adminUserId: auth.userId,
    action: "NOTIFICATION_TEMPLATE_CREATED",
    targetType: "NotificationTemplate",
    targetId: template.id,
    newState: { key, channel, locale, version: template.version },
    ipAddress,
  });

  return apiSuccess(template, undefined, 201);
});
