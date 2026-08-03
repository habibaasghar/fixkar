import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { completeBookingSchema } from "@/server/modules/admin/admin.validators";
import { BookingService } from "@/server/modules/bookings/booking.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_BOOKING_MANAGE);

  const body = await request.json().catch(() => ({}));
  const { notes, totalAmount } = completeBookingSchema.parse(body);

  const booking = await BookingService.adminComplete(id, auth.userId, ipAddress, notes, totalAmount);
  return apiSuccess(booking);
});
