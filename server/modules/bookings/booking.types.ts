import { BookingStatus } from "@prisma/client";

/**
 * Legal state transitions. A vendor drives ASSIGNED -> EN_ROUTE -> IN_PROGRESS
 * -> COMPLETED; CANCELLED is reachable from any pre-COMPLETED state by either
 * party (see booking.service.ts for who's allowed to trigger which). DISPUTED
 * exists in the schema (Phase 7 scaffold) but has no writer yet — out of
 * scope for this phase (no dispute-resolution flow requested).
 */
export const BOOKING_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  ASSIGNED: [BookingStatus.EN_ROUTE, BookingStatus.CANCELLED],
  EN_ROUTE: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
  IN_PROGRESS: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
  COMPLETED: [],
  CANCELLED: [],
  DISPUTED: [],
};

export function isValidTransition(from: BookingStatus, to: BookingStatus): boolean {
  return BOOKING_TRANSITIONS[from]?.includes(to) ?? false;
}
