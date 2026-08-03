import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { createCitySchema } from "@/server/modules/catalog/catalog.validators";
import { CatalogService } from "@/server/modules/catalog/catalog.service";

export const GET = withErrorHandler(async (request: Request) => {
  await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);
  const cities = await CatalogService.listCities();
  return apiSuccess(cities);
});

export const POST = withErrorHandler(async (request: Request) => {
  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const body = await request.json();
  const input = createCitySchema.parse(body);

  const city = await CatalogService.createCity(input, auth.userId, ipAddress);
  return apiSuccess(city, undefined, 201);
});
