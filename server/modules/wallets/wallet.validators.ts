import { z } from "zod";

export const manualAdjustmentSchema = z.object({
  field: z.enum(["AVAILABLE", "PENDING", "SETTLEMENT"]),
  amount: z.number().positive(),
  direction: z.enum(["credit", "debit"]),
  reason: z.string().min(2).max(500),
});
export type ManualAdjustmentInput = z.infer<typeof manualAdjustmentSchema>;

export const refundSchema = z.object({
  amount: z.number().positive(),
  reason: z.string().min(2).max(500),
});
export type RefundInput = z.infer<typeof refundSchema>;
