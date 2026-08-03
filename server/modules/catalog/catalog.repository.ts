import { db } from "@/server/shared/db";
import { CityStatus } from "@prisma/client";

export class CatalogRepository {
  // Categories
  static async listCategories() {
    return db.serviceCategory.findMany({ orderBy: { sortOrder: "asc" } });
  }

  static async findCategoryById(id: string) {
    return db.serviceCategory.findUnique({ where: { id } });
  }

  static async createCategory(data: { slug: string; name: string; shortName: string; iconUrl?: string; sortOrder?: number; metaTitle?: string; metaDescription?: string }) {
    return db.serviceCategory.create({ data });
  }

  static async updateCategory(id: string, data: Partial<{ slug: string; name: string; shortName: string; iconUrl?: string; sortOrder: number; metaTitle?: string; metaDescription?: string }>) {
    return db.serviceCategory.update({ where: { id }, data });
  }

  static async deleteCategory(id: string) {
    return db.serviceCategory.delete({ where: { id } });
  }

  // Cities
  static async listCities() {
    return db.city.findMany({ include: { areas: true }, orderBy: { name: "asc" } });
  }

  static async findCityById(id: string) {
    return db.city.findUnique({ where: { id }, include: { areas: true } });
  }

  static async createCity(data: { slug: string; name: string; status?: CityStatus }) {
    return db.city.create({ data });
  }

  static async updateCity(id: string, data: Partial<{ slug: string; name: string; status: CityStatus }>) {
    return db.city.update({ where: { id }, data });
  }

  // Areas
  static async listAreasForCity(cityId: string) {
    return db.area.findMany({ where: { cityId }, orderBy: { name: "asc" } });
  }

  static async findAreaById(id: string) {
    return db.area.findUnique({ where: { id } });
  }

  static async createArea(cityId: string, data: { slug: string; name: string }) {
    return db.area.create({ data: { cityId, ...data } });
  }

  static async updateArea(id: string, data: Partial<{ slug: string; name: string }>) {
    return db.area.update({ where: { id }, data });
  }

  static async deleteArea(id: string) {
    return db.area.delete({ where: { id } });
  }
}
