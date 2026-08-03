import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { createCategorySchema } from "@/server/modules/catalog/catalog.validators";
import { CatalogService } from "@/server/modules/catalog/catalog.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);
  const categories = await CatalogService.listCategories();
  return apiSuccess(categories);
});

export const POST = withErrorHandler(async (request: Request) => {
  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const body = await request.json();
  const input = createCategorySchema.parse(body);

  const category = await CatalogService.createCategory(input, auth.userId, ipAddress);
  return apiSuccess(category, undefined, 201);
});
