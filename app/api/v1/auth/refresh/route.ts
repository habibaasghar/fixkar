import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { refreshSessionSchema } from "@/server/modules/auth/auth.validators";
import { AuthService } from "@/server/modules/auth/auth.service";
import { applyRateLimit, getClientIp } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

export const POST = withErrorHandler(async (request: Request) => {
  await applyRateLimit(`auth-refresh:${getClientIp(request)}`, RATE_LIMITS.authRefresh.limit, RATE_LIMITS.authRefresh.windowMs);

  const body = await request.json();
  const { refreshToken } = refreshSessionSchema.parse(body);

  const session = await AuthService.refreshSession(refreshToken);
  return apiSuccess({ session });
});
