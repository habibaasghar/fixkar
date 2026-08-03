import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { updateCategorySchema } from "@/server/modules/catalog/catalog.validators";
import { CatalogService } from "@/server/modules/catalog/catalog.service";

export const PATCH = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const body = await request.json();
  const input = updateCategorySchema.parse(body);

  const category = await CatalogService.updateCategory(id, input, auth.userId, ipAddress);
  return apiSuccess(category);
});

export const DELETE = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const result = await CatalogService.deleteCategory(id, auth.userId, ipAddress);
  return apiSuccess(result);
});
