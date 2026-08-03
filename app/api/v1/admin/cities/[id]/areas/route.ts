import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { requireAdminAuth } from "@/server/shared/admin-guard";
import { PERMISSIONS } from "@/server/shared/permissions";
import { createAreaSchema } from "@/server/modules/catalog/catalog.validators";
import { CatalogService } from "@/server/modules/catalog/catalog.service";

export const GET = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const areas = await CatalogService.listAreasForCity(id);
  return apiSuccess(areas);
});

export const POST = withErrorHandler(async (request: Request, context?: unknown) => {
  const { params } = context as { params: Promise<{ id: string }> };
  const { id } = await params;

  const { auth, ipAddress } = await requireAdminAuth(request, PERMISSIONS.ADMIN_CATALOG_MANAGE);

  const body = await request.json();
  const input = createAreaSchema.parse(body);

  const area = await CatalogService.createArea(id, input, auth.userId, ipAddress);
  return apiSuccess(area, undefined, 201);
});
