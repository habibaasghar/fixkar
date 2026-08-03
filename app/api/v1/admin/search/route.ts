import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { AdminSearchService } from "@/server/modules/admin/search.service";
import { ValidationError } from "@/server/shared/errors";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_SEARCH);

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query || query.trim().length < 2) {
    throw new ValidationError("Query parameter 'q' must be at least 2 characters.", [{ field: "q", issue: "Too short." }]);
  }

  const results = await AdminSearchService.search(query.trim());
  return apiSuccess(results);
});
