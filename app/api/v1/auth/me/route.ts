import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { AuthService } from "@/server/modules/auth/auth.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const token = request.headers.get("Authorization")!.split(" ")[1];
  const sessionExpiresAt = AuthService.getSessionExpiry(token);

  return apiSuccess({
    userId: auth.userId,
    phone: auth.phone,
    role: auth.role,
    session: { expiresAt: sessionExpiresAt },
  });
});
