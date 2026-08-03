import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { editBookingSchema } from "@/server/modules/admin/admin.validators";
import { BookingService } from "@/server/modules/bookings/booking.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  await requireAdminAuth(request, PERMISSIONS.ADMIN_BOOKING_MANAGE);

  const booking = await BookingService.adminGetById(id);
  return apiSuccess(booking);
});

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_BOOKING_MANAGE);

  const body = await request.json();
  const input = editBookingSchema.parse(body);

  const booking = await BookingService.adminEdit(id, input, auth.userId, ipAddress);
  return apiSuccess(booking);
});
