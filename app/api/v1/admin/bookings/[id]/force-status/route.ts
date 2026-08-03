import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { forceBookingStatusSchema } from "@/server/modules/admin/admin.validators";
import { BookingService } from "@/server/modules/bookings/booking.service";
import { BookingStatus } from "@prisma/client";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_BOOKING_MANAGE);

  const body = await request.json();
  const { status, notes, totalAmount } = forceBookingStatusSchema.parse(body);

  const booking = await BookingService.adminForceStatus(id, status as BookingStatus, auth.userId, ipAddress, notes, totalAmount);
  return apiSuccess(booking);
});
