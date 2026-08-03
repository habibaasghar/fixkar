import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { refundSchema } from "@/server/modules/wallets/wallet.validators";
import { WalletService } from "@/server/modules/wallets/wallet.service";

export const POST = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_MANAGE);

  const body = await request.json();
  const { amount, reason } = refundSchema.parse(body);

  const result = await WalletService.adminRefund(id, amount, reason, auth.userId, ipAddress);
  return apiSuccess(result);
});
