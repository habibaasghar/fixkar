import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { updateCitySchema } from "@/server/modules/catalog/catalog.validators";
import { CatalogService } from "@/server/modules/catalog/catalog.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const body = await request.json();
  const input = updateCitySchema.parse(body);

  const city = await CatalogService.updateCity(id, input, auth.userId, ipAddress);
  return apiSuccess(city);
});
