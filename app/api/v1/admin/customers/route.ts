import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { CustomerService } from "@/server/modules/customers/customer.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_CUSTOMER_VIEW);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const search = searchParams.get("search") ?? undefined;

  const result = await CustomerService.adminListCustomers(search, page, pageSize);
  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
