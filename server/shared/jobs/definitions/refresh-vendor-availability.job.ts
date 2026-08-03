import { JobDefinition } from "../job.types";
import { VendorRepository } from "@/server/modules/vendors/vendor.repository";

/** Idempotent: the underlying updateMany's WHERE clause only ever matches rows that still need clearing — a second run finds nothing left to do. */
export const refreshVendorAvailabilityJob: JobDefinition = {
  name: "refresh-vendor-availability",
  description: "Clears isVacationMode for vendors whose vacationEnd date has passed.",
  run: async () => {
    const count = await VendorRepository.clearExpiredVacationMode();
    return { success: true, message: `Cleared expired vacation mode for ${count} vendor(s).`, data: { count } };
  },
};
