import { Prisma } from "@prisma/client";
import { CatalogRepository } from "./catalog.repository";
import { NotFoundError, ConflictError, ValidationError } from "@/server/shared/errors";
import { recordAuditLog } from "@/server/shared/audit";
import { CreateCategoryInput, UpdateCategoryInput, CreateCityInput, UpdateCityInput, CreateAreaInput, UpdateAreaInput } from "./catalog.validators";

function isForeignKeyViolation(err: unknown): boolean {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003";
}

export class CatalogService {
  // Categories
  static async listCategories() {
    return CatalogRepository.listCategories();
  }

  static async createCategory(input: CreateCategoryInput, adminUserId: string, ipAddress: string | null) {
    const category = await CatalogRepository.createCategory(input);
    await recordAuditLog({ adminUserId, action: "CATEGORY_CREATED", targetType: "ServiceCategory", targetId: category.id, newState: input, ipAddress });
    return category;
  }

  static async updateCategory(id: string, input: UpdateCategoryInput, adminUserId: string, ipAddress: string | null) {
    const existing = await CatalogRepository.findCategoryById(id);
    if (!existing) throw new NotFoundError("Category not found.");

    const updated = await CatalogRepository.updateCategory(id, input);
    await recordAuditLog({ adminUserId, action: "CATEGORY_UPDATED", targetType: "ServiceCategory", targetId: id, previousState: existing, newState: input, ipAddress });
    return updated;
  }

  static async deleteCategory(id: string, adminUserId: string, ipAddress: string | null) {
    const existing = await CatalogRepository.findCategoryById(id);
    if (!existing) throw new NotFoundError("Category not found.");

    try {
      await CatalogRepository.deleteCategory(id);
    } catch (err) {
      if (isForeignKeyViolation(err)) {
        throw new ConflictError("Cannot delete this category — it is still referenced by existing vendors, services, or leads.");
      }
      throw err;
    }

    await recordAuditLog({ adminUserId, action: "CATEGORY_DELETED", targetType: "ServiceCategory", targetId: id, previousState: existing, ipAddress });
    return { success: true };
  }

  // Cities
  static async listCities() {
    return CatalogRepository.listCities();
  }

  static async createCity(input: CreateCityInput, adminUserId: string, ipAddress: string | null) {
    const city = await CatalogRepository.createCity(input);
    await recordAuditLog({ adminUserId, action: "CITY_CREATED", targetType: "City", targetId: city.id, newState: input, ipAddress });
    return city;
  }

  static async updateCity(id: string, input: UpdateCityInput, adminUserId: string, ipAddress: string | null) {
    const existing = await CatalogRepository.findCityById(id);
    if (!existing) throw new NotFoundError("City not found.");

    const updated = await CatalogRepository.updateCity(id, input);
    await recordAuditLog({ adminUserId, action: "CITY_UPDATED", targetType: "City", targetId: id, previousState: { status: existing.status }, newState: input, ipAddress });
    return updated;
  }

  // Areas
  static async listAreasForCity(cityId: string) {
    const city = await CatalogRepository.findCityById(cityId);
    if (!city) throw new NotFoundError("City not found.");
    return CatalogRepository.listAreasForCity(cityId);
  }

  static async createArea(cityId: string, input: CreateAreaInput, adminUserId: string, ipAddress: string | null) {
    const city = await CatalogRepository.findCityById(cityId);
    if (!city) throw new ValidationError("Invalid city.", [{ field: "cityId", issue: "City not found." }]);

    const area = await CatalogRepository.createArea(cityId, input);
    await recordAuditLog({ adminUserId, action: "AREA_CREATED", targetType: "Area", targetId: area.id, newState: { cityId, ...input }, ipAddress });
    return area;
  }

  static async updateArea(id: string, input: UpdateAreaInput, adminUserId: string, ipAddress: string | null) {
    const existing = await CatalogRepository.findAreaById(id);
    if (!existing) throw new NotFoundError("Area not found.");

    const updated = await CatalogRepository.updateArea(id, input);
    await recordAuditLog({ adminUserId, action: "AREA_UPDATED", targetType: "Area", targetId: id, previousState: existing, newState: input, ipAddress });
    return updated;
  }

  static async deleteArea(id: string, adminUserId: string, ipAddress: string | null) {
    const existing = await CatalogRepository.findAreaById(id);
    if (!existing) throw new NotFoundError("Area not found.");

    try {
      await CatalogRepository.deleteArea(id);
    } catch (err) {
      if (isForeignKeyViolation(err)) {
        throw new ConflictError("Cannot delete this area — it is still referenced by existing vendors, addresses, or leads.");
      }
      throw err;
    }

    await recordAuditLog({ adminUserId, action: "AREA_DELETED", targetType: "Area", targetId: id, previousState: existing, ipAddress });
    return { success: true };
  }
}
