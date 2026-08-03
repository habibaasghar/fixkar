import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { verifyOtpSchema } from "@/server/modules/auth/auth.validators";
import { AuthService } from "@/server/modules/auth/auth.service";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();
  const { phone, otp } = verifyOtpSchema.parse(body);

  await applyRateLimit(`verify-otp:${phone}`, RATE_LIMITS.verifyOtp.limit, RATE_LIMITS.verifyOtp.windowMs);

  const session = await AuthService.verifyOtp(phone, otp);
  return apiSuccess({ session });
});
