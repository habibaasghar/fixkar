import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { registerVendorSchema } from "@/server/modules/vendors/vendor.validators";
import { VendorService } from "@/server/modules/vendors/vendor.service";
import { ValidationError } from "@/server/shared/errors";
import { applyRateLimit, getClientIp } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

async function readFileField(formData: FormData, field: string): Promise<{ file: Buffer; filename: string; mimeType: string } | undefined> {
  const value = formData.get(field);
  if (!(value instanceof File)) return undefined;
  const arrayBuffer = await value.arrayBuffer();
  return { file: Buffer.from(arrayBuffer), filename: value.name, mimeType: value.type };
}

export const POST = withErrorHandler(async (request: Request) => {
  const formData = await request.formData();

  const textFields = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
  );
  const input = registerVendorSchema.parse(textFields);

  await applyRateLimit(`partner-register:${input.phone}`, RATE_LIMITS.partnerRegister.limit, RATE_LIMITS.partnerRegister.windowMs);
  await applyRateLimit(`partner-register-ip:${getClientIp(request)}`, RATE_LIMITS.partnerRegister.limit, RATE_LIMITS.partnerRegister.windowMs);

  const cnicFront = await readFileField(formData, "cnicFrontImage");
  const cnicBack = await readFileField(formData, "cnicBackImage");
  const selfie = await readFileField(formData, "selfieImage");

  if (!cnicFront) throw new ValidationError("CNIC front image is required.", [{ field: "cnicFrontImage", issue: "Missing file." }]);
  if (!cnicBack) throw new ValidationError("CNIC back image is required.", [{ field: "cnicBackImage", issue: "Missing file." }]);

  const result = await VendorService.registerVendor(input, { cnicFront, cnicBack, selfie });

  return apiSuccess(result, undefined, 201);
});
