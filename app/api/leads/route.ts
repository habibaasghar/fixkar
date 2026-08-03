import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { createLeadSchema } from "@/server/modules/leads/lead.validators";
import { LeadService } from "@/server/modules/leads/lead.service";
import { applyRateLimit, getClientIp } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

export const POST = withErrorHandler(async (request: Request) => {
  await applyRateLimit(`lead-submission:${getClientIp(request)}`, RATE_LIMITS.leadSubmission.limit, RATE_LIMITS.leadSubmission.windowMs);

  const body = await request.json();
  const validatedInput = createLeadSchema.parse(body);

  const lead = await LeadService.createLead(validatedInput);

  return apiSuccess({ leadId: lead.id, status: lead.status }, undefined, 201);
});
