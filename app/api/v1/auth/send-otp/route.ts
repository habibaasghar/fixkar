import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { sendOtpSchema } from "@/server/modules/auth/auth.validators";
import { AuthService } from "@/server/modules/auth/auth.service";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();
  const { phone } = sendOtpSchema.parse(body);

  await applyRateLimit(`send-otp:${phone}`, RATE_LIMITS.sendOtp.limit, RATE_LIMITS.sendOtp.windowMs);

  const result = await AuthService.sendOtp(phone);
  return apiSuccess(result);
});
