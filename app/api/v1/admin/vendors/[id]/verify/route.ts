import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { verifyVendorSchema } from "@/server/modules/admin/admin.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_VENDOR_MANAGE);

  const body = await request.json();
  const { decision, notes } = verifyVendorSchema.parse(body);

  const vendor = decision === "approve"
    ? await VendorService.adminApprove(id, notes, auth.userId, ipAddress)
    : await VendorService.adminReject(id, notes, auth.userId, ipAddress);

  return apiSuccess(vendor);
});
