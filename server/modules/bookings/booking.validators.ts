import { z } from "zod";

export const updateBookingStatusSchema = z.object({
  status: z.enum(["EN_ROUTE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  notes: z.string().max(500).optional(),
  // Vendor enters the final invoice amount when marking COMPLETED (Phase 8's
  // "Vendor taps COMPLETED + enters invoice amount") — required for the
  // Phase 15 financial engine to calculate commission on completion.
  totalAmount: z.number().positive().optional(),
});

export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;

export const cancelBookingSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
