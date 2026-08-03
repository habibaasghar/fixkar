import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { BookingService } from "@/server/modules/bookings/booking.service";
import { BookingStatus } from "@prisma/client";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_BOOKING_MANAGE);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const status = searchParams.get("status") as BookingStatus | null;
  const citySlug = searchParams.get("citySlug") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const result = await BookingService.adminSearch({ status: status ?? undefined, citySlug, search }, page, pageSize);
  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
