import { Role } from "@prisma/client";
import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest, requireRole } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { updateVendorAvailabilitySchema } from "@/server/modules/vendors/vendor.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const profile = await VendorService.getOwnProfile(auth.userId);
  return apiSuccess(profile.availability);
});

export const PATCH = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = updateVendorAvailabilitySchema.parse(body);

  const availability = await VendorService.updateAvailability(auth.userId, input);
  return apiSuccess(availability);
});
