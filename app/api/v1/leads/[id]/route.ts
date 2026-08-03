import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { LeadService } from "@/server/modules/leads/lead.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const auth = await authenticateRequest(request);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const lead = await LeadService.getLeadById(id, auth.userId);
  return apiSuccess(lead);
});
