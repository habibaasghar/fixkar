import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { BookingService } from "@/server/modules/bookings/booking.service";
import { cancelBookingSchema } from "@/server/modules/bookings/booking.validators";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json().catch(() => ({}));
  const { reason } = cancelBookingSchema.parse(body);

  const booking = await BookingService.cancelByCustomer(id, auth.userId, reason);
  return apiSuccess(booking);
});
