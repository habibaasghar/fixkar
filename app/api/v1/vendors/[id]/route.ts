import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { VendorService } from "@/server/modules/vendors/vendor.service";

export const GET = withErrorHandler(async (_request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const profile = await VendorService.getPublicProfile(id);
  return apiSuccess(profile);
});
