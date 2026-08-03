import { AddressLabel } from "@prisma/client";
import { CustomerRepository } from "./customer.repository";
import { NotFoundError, ValidationError, ForbiddenError } from "@/server/shared/errors";
import { UpdateCustomerProfileInput, CreateAddressInput, UpdateAddressInput } from "./customer.validators";
import { recordAuditLog } from "@/server/shared/audit";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";
import { BookingRepository } from "@/server/modules/bookings/booking.repository";

export class CustomerService {
  /** Lazily provisions the CustomerProfile on first touch — mirrors the bare-User auto-create in auth.middleware.ts. */
  static async getOrCreateProfile(userId: string) {
    const existing = await CustomerRepository.findByUserId(userId);
    if (existing) return existing;

    const created = await CustomerRepository.createForUser(userId);
    await NotificationService.trigger(userId, NOTIFICATION_EVENTS.CUSTOMER_REGISTERED, { customerId: created.id });
    return created;
  }

  /** For unauthenticated flows (e.g. lead submission) that only have a phone number, not a session. */
  static async getOrCreateProfileByPhone(phone: string, name?: string) {
    return CustomerRepository.getOrCreateByPhone(phone, name);
  }

  static async updateProfile(userId: string, input: UpdateCustomerProfileInput) {
    const profile = await this.getOrCreateProfile(userId);
    return CustomerRepository.updateProfile(profile.id, {
      name: input.name,
      preferredArea: input.preferredArea,
      preferredLanguage: input.preferredLanguage,
    });
  }

  static async listAddresses(userId: string) {
    const profile = await this.getOrCreateProfile(userId);
    return CustomerRepository.listAddresses(profile.id);
  }

  private static async resolveCityAndArea(citySlug: string, areaSlug: string) {
    const city = await CustomerRepository.findCityBySlug(citySlug);
    if (!city) throw new ValidationError("Invalid city selection.", [{ field: "citySlug", issue: "City not found." }]);

    const area = await CustomerRepository.findAreaByCityAndSlug(city.id, areaSlug);
    if (!area) throw new ValidationError("Invalid area selection.", [{ field: "areaSlug", issue: "Area not found in the selected city." }]);

    return { city, area };
  }

  static async addAddress(userId: string, input: CreateAddressInput) {
    const profile = await this.getOrCreateProfile(userId);
    const { city, area } = await this.resolveCityAndArea(input.citySlug, input.areaSlug);

    const existingCount = await CustomerRepository.countAddresses(profile.id);
    // The customer's first address is always the default, regardless of what was passed.
    const isDefault = existingCount === 0 ? true : input.isDefault;

    return CustomerRepository.createAddress({
      customerId: profile.id,
      label: input.label as AddressLabel,
      cityId: city.id,
      areaId: area.id,
      street: input.street,
      landmark: input.landmark,
      latitude: input.latitude,
      longitude: input.longitude,
      isDefault,
    });
  }

  private static async getOwnedAddressOrThrow(userId: string, addressId: string) {
    const profile = await this.getOrCreateProfile(userId);
    const address = await CustomerRepository.findAddressById(addressId);
    if (!address) throw new NotFoundError("Address not found.");
    if (address.customerId !== profile.id) {
      throw new ForbiddenError("You do not have permission to access this address.");
    }
    return { profile, address };
  }

  static async updateAddress(userId: string, addressId: string, input: UpdateAddressInput) {
    const { profile, address } = await this.getOwnedAddressOrThrow(userId, addressId);

    let cityId: string | undefined;
    let areaId: string | undefined;
    if (input.citySlug || input.areaSlug) {
      // Resolve areas against the target city: a newly provided citySlug, or
      // else the address's current city (so `areaSlug`-only updates still
      // validate against the right city without requiring citySlug too).
      const city = input.citySlug ? await CustomerRepository.findCityBySlug(input.citySlug) : null;
      if (input.citySlug && !city) {
        throw new ValidationError("Invalid city selection.", [{ field: "citySlug", issue: "City not found." }]);
      }
      const targetCityId = city?.id ?? address.cityId;
      cityId = city?.id;

      if (input.areaSlug) {
        const area = await CustomerRepository.findAreaByCityAndSlug(targetCityId, input.areaSlug);
        if (!area) throw new ValidationError("Invalid area selection.", [{ field: "areaSlug", issue: "Area not found in the selected city." }]);
        areaId = area.id;
      }
    }

    return CustomerRepository.updateAddress(addressId, profile.id, {
      label: input.label as AddressLabel | undefined,
      cityId,
      areaId,
      street: input.street,
      landmark: input.landmark,
      latitude: input.latitude,
      longitude: input.longitude,
      isDefault: input.isDefault,
    });
  }

  static async deleteAddress(userId: string, addressId: string) {
    await this.getOwnedAddressOrThrow(userId, addressId);
    await CustomerRepository.deleteAddress(addressId);
    return { success: true };
  }

  // ---- Admin platform (Phase 14) ----

  static async adminListCustomers(search: string | undefined, page: number, pageSize: number) {
    return CustomerRepository.listAll(search, page, pageSize);
  }

  static async adminGetCustomer(customerId: string) {
    const profile = await CustomerRepository.findById(customerId);
    if (!profile) throw new NotFoundError("Customer not found.");
    const { items: bookings } = await BookingRepository.listForCustomer(customerId);
    return { profile, bookings };
  }

  static async adminSuspend(customerId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    const profile = await CustomerRepository.findById(customerId);
    if (!profile) throw new NotFoundError("Customer not found.");

    await CustomerRepository.suspend(customerId);

    await recordAuditLog({
      adminUserId,
      action: "CUSTOMER_SUSPENDED",
      targetType: "CustomerProfile",
      targetId: customerId,
      previousState: { accountStatus: profile.accountStatus },
      newState: { accountStatus: "SUSPENDED", notes },
      ipAddress,
    });

    await NotificationService.trigger(profile.userId, NOTIFICATION_EVENTS.CUSTOMER_SUSPENDED, { customerId });

    return CustomerRepository.findById(customerId);
  }

  static async adminRestore(customerId: string, adminUserId: string, ipAddress: string | null) {
    const profile = await CustomerRepository.findById(customerId);
    if (!profile) throw new NotFoundError("Customer not found.");

    await CustomerRepository.restore(customerId);

    await recordAuditLog({
      adminUserId,
      action: "CUSTOMER_RESTORED",
      targetType: "CustomerProfile",
      targetId: customerId,
      previousState: { accountStatus: profile.accountStatus },
      newState: { accountStatus: "ACTIVE" },
      ipAddress,
    });

    await NotificationService.trigger(profile.userId, NOTIFICATION_EVENTS.CUSTOMER_RESTORED, { customerId });

    return CustomerRepository.findById(customerId);
  }
}
