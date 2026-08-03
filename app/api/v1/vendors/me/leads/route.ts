import { Role } from "@prisma/client";
import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest, requireRole } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { VendorService } from "@/server/modules/vendors/vendor.service";
import { LeadService } from "@/server/modules/leads/lead.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const vendorProfile = await VendorService.getOwnProfile(auth.userId);
  const leads = await LeadService.listAssignedToVendor(vendorProfile.id);
  return apiSuccess(leads);
});
