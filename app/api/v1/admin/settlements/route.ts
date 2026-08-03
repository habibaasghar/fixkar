import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { createSettlementSchema } from "@/server/modules/settlements/settlement.validators";
import { SettlementService } from "@/server/modules/settlements/settlement.service";
import { SettlementStatus } from "@prisma/client";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_VIEW);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const status = searchParams.get("status") as SettlementStatus | null;
  const vendorId = searchParams.get("vendorId") ?? undefined;

  const result = await SettlementService.adminList({ status: status ?? undefined, vendorId }, page, pageSize);
  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});

export const POST = withErrorHandler(async (request: Request) => {
  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_FINANCE_MANAGE);

  const body = await request.json();
  const { vendorId, amount, notes } = createSettlementSchema.parse(body);

  const settlement = await SettlementService.create(vendorId, amount, notes, auth.userId, ipAddress);
  return apiSuccess(settlement, undefined, 201);
});
