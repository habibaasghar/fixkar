import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { updateCustomerProfileSchema } from "@/server/modules/customers/customer.validators";
import { CustomerService } from "@/server/modules/customers/customer.service";

// Not gated by requireRole(CUSTOMER): a User's `role` reflects their primary
// context (e.g. VENDOR), but the schema already allows one User to hold both
// a VendorProfile and a CustomerProfile (a vendor who also books services).
// Any authenticated user can have/create a customer profile.

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const profile = await CustomerService.getOrCreateProfile(auth.userId);
  return apiSuccess(profile);
});

export const PATCH = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = updateCustomerProfileSchema.parse(body);

  const profile = await CustomerService.updateProfile(auth.userId, input);
  return apiSuccess(profile);
});
