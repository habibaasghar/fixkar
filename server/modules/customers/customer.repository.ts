import { db } from "@/server/shared/db";
import { NOT_DELETED } from "@/server/shared/soft-delete";
import { Prisma, AddressLabel, Role, AccountStatus } from "@prisma/client";

export class CustomerRepository {
  static async findByUserId(userId: string) {
    return db.customerProfile.findFirst({
      where: { userId, ...NOT_DELETED },
      include: { addresses: { orderBy: { createdAt: "asc" } } },
    });
  }

  static async createForUser(userId: string) {
    return db.customerProfile.create({
      data: { userId },
      include: { addresses: true },
    });
  }

  static async findUserByPhone(phone: string) {
    return db.user.findUnique({ where: { phone } });
  }

  /** Find-or-create a User+CustomerProfile by phone, for flows with no Supabase session yet (e.g. anonymous lead submission). */
  static async getOrCreateByPhone(phone: string, name?: string) {
    let user = await db.user.findUnique({ where: { phone }, include: { customerProfile: true } });

    if (!user) {
      user = await db.user.create({
        data: { phone, role: Role.CUSTOMER, customerProfile: { create: { name } } },
        include: { customerProfile: true },
      });
      return user.customerProfile!;
    }

    if (!user.customerProfile) {
      return db.customerProfile.create({ data: { userId: user.id, name } });
    }

    // Fill in a name we didn't have yet, but never overwrite one the customer already set.
    if (name && !user.customerProfile.name) {
      return db.customerProfile.update({ where: { id: user.customerProfile.id }, data: { name } });
    }

    return user.customerProfile;
  }

  static async updateProfile(customerId: string, data: Prisma.CustomerProfileUpdateInput) {
    return db.customerProfile.update({ where: { id: customerId }, data });
  }

  /** Admin action — suspend/restore use accountStatus (Phase 12 field, previously unwritten), not deletedAt/soft-delete. */
  static async suspend(customerId: string) {
    return db.customerProfile.update({ where: { id: customerId }, data: { accountStatus: AccountStatus.SUSPENDED } });
  }

  static async restore(customerId: string) {
    return db.customerProfile.update({ where: { id: customerId }, data: { accountStatus: AccountStatus.ACTIVE } });
  }

  static async findById(customerId: string) {
    return db.customerProfile.findFirst({ where: { id: customerId, ...NOT_DELETED }, include: { user: { select: { phone: true } }, addresses: true } });
  }

  static async listAll(search: string | undefined, page: number, pageSize: number) {
    const where: Prisma.CustomerProfileWhereInput = {
      ...NOT_DELETED,
      ...(search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { user: { phone: { contains: search } } }] }
        : {}),
    };

    const [total, items] = await Promise.all([
      db.customerProfile.count({ where }),
      db.customerProfile.findMany({
        where,
        include: { user: { select: { phone: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { total, items };
  }

  static async findCityBySlug(slug: string) {
    return db.city.findUnique({ where: { slug } });
  }

  static async findAreaByCityAndSlug(cityId: string, areaSlug: string) {
    return db.area.findUnique({ where: { cityId_slug: { cityId, slug: areaSlug } } });
  }

  static async listAddresses(customerId: string) {
    return db.customerAddress.findMany({
      where: { customerId },
      include: { city: { select: { slug: true, name: true } }, area: { select: { slug: true, name: true } } },
      orderBy: { createdAt: "asc" },
    });
  }

  static async findAddressById(addressId: string) {
    return db.customerAddress.findUnique({ where: { id: addressId } });
  }

  static async countAddresses(customerId: string): Promise<number> {
    return db.customerAddress.count({ where: { customerId } });
  }

  static async clearDefaultAddress(customerId: string, exceptAddressId?: string) {
    return db.customerAddress.updateMany({
      where: { customerId, isDefault: true, ...(exceptAddressId ? { id: { not: exceptAddressId } } : {}) },
      data: { isDefault: false },
    });
  }

  static async createAddress(data: {
    customerId: string;
    label: AddressLabel;
    cityId: string;
    areaId: string;
    street: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
    isDefault: boolean;
  }) {
    return db.$transaction(async (tx) => {
      if (data.isDefault) {
        await tx.customerAddress.updateMany({ where: { customerId: data.customerId, isDefault: true }, data: { isDefault: false } });
      }
      return tx.customerAddress.create({ data });
    });
  }

  static async updateAddress(addressId: string, customerId: string, data: {
    label?: AddressLabel;
    cityId?: string;
    areaId?: string;
    street?: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
  }) {
    return db.$transaction(async (tx) => {
      if (data.isDefault === true) {
        await tx.customerAddress.updateMany({ where: { customerId, isDefault: true, id: { not: addressId } }, data: { isDefault: false } });
      }
      return tx.customerAddress.update({ where: { id: addressId }, data });
    });
  }

  static async deleteAddress(addressId: string) {
    return db.customerAddress.delete({ where: { id: addressId } });
  }
}
