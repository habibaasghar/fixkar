import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { notesOnlySchema } from "@/server/modules/admin/admin.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_VENDOR_MANAGE);

  const body = await request.json().catch(() => ({}));
  const { notes } = notesOnlySchema.parse(body);

  const vendor = await VendorService.adminSuspend(id, auth.userId, ipAddress, notes);
  return apiSuccess(vendor);
});
