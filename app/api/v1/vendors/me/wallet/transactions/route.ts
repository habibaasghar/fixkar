import { Role } from "@prisma/client";
import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { authenticateRequest, requireRole } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { WalletService } from "@/server/modules/wallets/wallet.service";

export const GET = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  requireRole(auth, [Role.VENDOR]);
  await applyRateLimit(`general:${auth.userId}`, RATE_LIMITS.general.limit, RATE_LIMITS.general.windowMs);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));

  const result = await WalletService.getVendorEntries(auth.userId, page, pageSize);
  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
