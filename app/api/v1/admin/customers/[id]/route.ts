import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { CustomerService } from "@/server/modules/customers/customer.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  await requireAdminAuth(request, PERMISSIONS.ADMIN_CUSTOMER_VIEW);

  const customer = await CustomerService.adminGetCustomer(id);
  return apiSuccess(customer);
});
