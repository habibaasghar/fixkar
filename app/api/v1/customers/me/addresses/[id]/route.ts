import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { updateAddressSchema } from "@/server/modules/customers/customer.validators";
import { CustomerService } from "@/server/modules/customers/customer.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = updateAddressSchema.parse(body);

  const address = await CustomerService.updateAddress(auth.userId, id, input);
  return apiSuccess(address);
});

export const DELETE = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const result = await CustomerService.deleteAddress(auth.userId, id);
  return apiSuccess(result);
});
