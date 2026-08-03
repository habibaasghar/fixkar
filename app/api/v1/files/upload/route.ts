import { withErrorHandler, apiSuccess } from "@/server/shared/response";
import { FileService } from "@/server/modules/files/file.service";
import { ValidationError } from "@/server/shared/errors";
import { uploadBucketSchema } from "@/server/modules/files/file.validators";
import { authenticateRequest } from "@/server/shared/middleware/auth.middleware";
import { applyRateLimit } from "@/server/shared/middleware/rate-limit.middleware";
import { RATE_LIMITS } from "@/server/shared/rate-limit.config";

export const POST = withErrorHandler(async (request: Request) => {
  const auth = await authenticateRequest(request);
  await applyRateLimit(`file-upload:${auth.userId}`, RATE_LIMITS.fileUpload.limit, RATE_LIMITS.fileUpload.windowMs);

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const bucket = uploadBucketSchema.parse(formData.get("bucket") || "portfolio");

  if (!file) {
    throw new ValidationError("No file provided in form data.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await FileService.uploadFile({
    file: buffer,
    filename: file.name,
    mimeType: file.type,
    bucket,
  });

  return apiSuccess(result, undefined, 201);
});
