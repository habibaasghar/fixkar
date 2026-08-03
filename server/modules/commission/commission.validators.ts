import { z } from "zod";

export const createCommissionRuleSchema = z
  .object({
    categoryId: z.string().uuid().optional(),
    cityId: z.string().uuid().optional(),
    type: z.enum(["FLAT", "PERCENTAGE"]),
    value: z.number().min(0),
  })
  .refine((data) => data.type !== "PERCENTAGE" || data.value <= 100, {
    message: "Percentage commission value must be between 0 and 100.",
    path: ["value"],
  });
export type CreateCommissionRuleInput = z.infer<typeof createCommissionRuleSchema>;

export const updateCommissionRuleSchema = z.object({
  type: z.enum(["FLAT", "PERCENTAGE"]).optional(),
  value: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});
export type UpdateCommissionRuleInput = z.infer<typeof updateCommissionRuleSchema>;
