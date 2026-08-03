import { z } from "zod";

export const createSettlementSchema = z.object({
  vendorId: z.string().uuid(),
  amount: z.number().positive(),
  notes: z.string().max(500).optional(),
});
export type CreateSettlementInput = z.infer<typeof createSettlementSchema>;
