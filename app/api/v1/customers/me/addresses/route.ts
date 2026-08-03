import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { createAddressSchema } from "@/server/modules/customers/customer.validators";
import { CustomerService } from "@/server/modules/customers/customer.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const addresses = await CustomerService.listAddresses(auth.userId);
  return apiSuccess(addresses);
});

export const POST = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = createAddressSchema.parse(body);

  const address = await CustomerService.addAddress(auth.userId, input);
  return apiSuccess(address, undefined, 201);
});
