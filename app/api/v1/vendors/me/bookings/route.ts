import { Role } from "@prisma/client";
import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest, requireRole } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { parsePaginationParams } from "@/server/shared/pagination";
import { BookingService } from "@/server/modules/bookings/booking.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const { page, pageSize } = parsePaginationParams(request.url);
  const { total, items } = await BookingService.listForVendor(auth.userId, page, pageSize);
  return apiSuccess(items, { page, pageSize, total, hasMore: page * pageSize < total });
});
