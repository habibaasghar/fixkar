import { Role } from "@prisma/client";
import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest, requireRole } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { addVendorDocumentSchema } from "@/server/modules/vendors/vendor.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";

/**
 * Registers metadata for a document already uploaded via the authenticated
 * POST /v1/files/upload (bucket=vendorDocs) endpoint — this route never
 * receives raw file bytes itself, it just links a private storage path to
 * this vendor's profile.
 */
export const POST = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const body = await request.json();
  const input = addVendorDocumentSchema.parse(body);

  const document = await VendorService.addDocument(auth.userId, input);
  return apiSuccess(document, undefined, 201);
});
