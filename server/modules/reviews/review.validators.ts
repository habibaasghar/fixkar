import { z } from "zod";

export const hideReviewSchema = z.object({
  reason: z.string().min(2).max(300),
});
export type HideReviewInput = z.infer<typeof hideReviewSchema>;
