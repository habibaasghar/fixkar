import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { updatePreferencesSchema } from "@/server/modules/notifications/notification.validators";
import { PreferenceService } from "@/server/modules/notifications/preference.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const preferences = await PreferenceService.get(auth.userId);
  return apiSuccess(preferences);
});

export const PATCH = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = updatePreferencesSchema.parse(body);

  const preferences = await PreferenceService.update(auth.userId, input);
  return apiSuccess(preferences);
});
