import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { VendorService } from "@/server/modules/vendors/vendor.service";
import { recordAuditLog } from "@/server/shared/audit";

/**
 * Returns short-lived signed URLs for a vendor's private KYC documents so the
 * verification team can actually view the CNIC/selfie/business docs they're
 * approving. Gated by ADMIN_VENDOR_VIEW. Access is audited, since viewing a
 * person's CNIC is a sensitive action worth a trail.
 */
export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_VENDOR_VIEW);

  const result = await VendorService.adminGetDocumentSignedUrls(id);

  await recordAuditLog({
    adminUserId: auth.userId,
    action: "VENDOR_DOCUMENTS_VIEWED",
    targetType: "VendorProfile",
    targetId: id,
    ipAddress,
  });

  return apiSuccess(result);
});
