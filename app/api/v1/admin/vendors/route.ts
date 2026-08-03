import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";
import { VerificationStatus } from "@prisma/client";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_VENDOR_VIEW);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const verificationStatus = searchParams.get("status") as VerificationStatus | null;
  const citySlug = searchParams.get("citySlug") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const result = await VendorService.adminListVendors(
    { verificationStatus: verificationStatus ?? undefined, citySlug, search },
    page,
    pageSize
  );

  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
