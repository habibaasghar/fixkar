import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const verifyVendorSchema = z.object({
  decision: z.enum(["approve", "reject"]),
  notes: z.string().max(500).optional(),
});
export type VerifyVendorInput = z.infer<typeof verifyVendorSchema>;

export const notesOnlySchema = z.object({
  notes: z.string().max(500).optional(),
});
export type NotesOnlyInput = z.infer<typeof notesOnlySchema>;

export const assignLeadSchema = z.object({
  vendorId: z.string().uuid(),
  notes: z.string().max(500).optional(),
});
export type AssignLeadInput = z.infer<typeof assignLeadSchema>;

export const editBookingSchema = z.object({
  scheduledAt: z.coerce.date().optional(),
  totalAmount: z.number().min(0).optional(),
  commissionAmount: z.number().min(0).optional(),
});
export type EditBookingInput = z.infer<typeof editBookingSchema>;

export const forceBookingStatusSchema = z.object({
  status: z.enum(["ASSIGNED", "EN_ROUTE", "IN_PROGRESS", "COMPLETED", "CANCELLED", "DISPUTED"]),
  notes: z.string().max(500).optional(),
  totalAmount: z.number().positive().optional(),
});
export type ForceBookingStatusInput = z.infer<typeof forceBookingStatusSchema>;

export const completeBookingSchema = z.object({
  notes: z.string().max(500).optional(),
  totalAmount: z.number().positive().optional(),
});
export type CompleteBookingInput = z.infer<typeof completeBookingSchema>;
