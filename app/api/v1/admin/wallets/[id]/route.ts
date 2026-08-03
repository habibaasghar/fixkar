import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { WalletService } from "@/server/modules/wallets/wallet.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_VIEW);

  const wallet = await WalletService.adminGetWallet(id);
  return apiSuccess(wallet);
});
