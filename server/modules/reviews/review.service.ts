import { ReviewRepository } from "./review.repository";
import { NotFoundError } from "@/server/shared/errors";
import { recordAuditLog } from "@/server/shared/audit";

export class ReviewService {
  static async adminList(filters: { isHidden?: boolean; vendorId?: string }, page: number, pageSize: number) {
    return ReviewRepository.listAll(filters, page, pageSize);
  }

  static async adminHide(reviewId: string, reason: string, adminUserId: string, ipAddress: string | null) {
    const review = await ReviewRepository.findById(reviewId);
    if (!review) throw new NotFoundError("Review not found.");

    const updated = await ReviewRepository.setHidden(reviewId, true, reason);

    await recordAuditLog({
      adminUserId,
      action: "REVIEW_HIDDEN",
      targetType: "Review",
      targetId: reviewId,
      previousState: { isHidden: review.isHidden },
      newState: { isHidden: true, reason },
      ipAddress,
    });

    return updated;
  }

  static async adminRestore(reviewId: string, adminUserId: string, ipAddress: string | null) {
    const review = await ReviewRepository.findById(reviewId);
    if (!review) throw new NotFoundError("Review not found.");

    const updated = await ReviewRepository.setHidden(reviewId, false);

    await recordAuditLog({
      adminUserId,
      action: "REVIEW_RESTORED",
      targetType: "Review",
      targetId: reviewId,
      previousState: { isHidden: review.isHidden },
      newState: { isHidden: false },
      ipAddress,
    });

    return updated;
  }
}
