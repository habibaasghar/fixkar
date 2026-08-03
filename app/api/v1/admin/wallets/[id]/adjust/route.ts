import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { manualAdjustmentSchema } from "@/server/modules/wallets/wallet.validators";
import { WalletService } from "@/server/modules/wallets/wallet.service";
import { WalletBalanceField } from "@prisma/client";

export const POST = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_MANAGE);

  const body = await request.json();
  const { field, amount, direction, reason } = manualAdjustmentSchema.parse(body);

  const wallet = await WalletService.adminManualAdjustment(id, field as WalletBalanceField, amount, direction, reason, auth.userId, ipAddress);
  return apiSuccess(wallet);
});
