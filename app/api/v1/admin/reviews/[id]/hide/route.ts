import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { hideReviewSchema } from "@/server/modules/reviews/review.validators";
import { ReviewService } from "@/server/modules/reviews/review.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_REVIEW_MODERATE);

  const body = await request.json();
  const { reason } = hideReviewSchema.parse(body);

  const review = await ReviewService.adminHide(id, reason, auth.userId, ipAddress);
  return apiSuccess(review);
});
