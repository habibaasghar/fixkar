import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { paginationSchema } from "@/server/modules/admin/admin.validators";
import { ReviewService } from "@/server/modules/reviews/review.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_REVIEW_MODERATE);

  const { searchParams } = new URL(request.url);
  const { page, pageSize } = paginationSchema.parse(Object.fromEntries(searchParams));
  const isHiddenParam = searchParams.get("isHidden");
  const vendorId = searchParams.get("vendorId") ?? undefined;

  const result = await ReviewService.adminList(
    { isHidden: isHiddenParam === null ? undefined : isHiddenParam === "true", vendorId },
    page,
    pageSize
  );

  return apiSuccess(result.items, { page, pageSize, total: result.total, hasMore: page * pageSize < result.total });
});
