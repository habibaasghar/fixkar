import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { previewTemplateSchema } from "@/server/modules/notifications/notification.validators";
import { TemplateService } from "@/server/modules/notifications/template.service";

/** Renders a template with sample variables without creating any dispatch/side effect — for the admin template editor. */
export const POST = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_NOTIFICATION_MANAGE);

  const body = await request.json();
  const { key, channel, locale, variables } = previewTemplateSchema.parse(body);

  const rendered = await TemplateService.preview(key, channel, locale, variables);
  return apiSuccess(rendered);
});
