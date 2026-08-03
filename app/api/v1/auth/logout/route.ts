import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { logoutSchema } from "@/server/modules/auth/auth.validators";
import { AuthService } from "@/server/modules/auth/auth.service";

export const POST = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json().catch(() => ({}));
  const { scope } = logoutSchema.parse(body);

  const token = request.headers.get("Authorization")!.split(" ")[1];
  const result = await AuthService.logout(token, scope);
  return apiSuccess(result);
});
