import { supabaseAdmin } from "@/server/shared/supabase";
import { appConfig } from "@/server/config/app.config";
import { AppError, ValidationError } from "@/server/shared/errors";
import { PRIVATE_BUCKETS, UploadBucket } from "./file.validators";

export interface UploadFileOptions {
  file: Buffer;
  filename: string;
  mimeType: string;
  bucket: UploadBucket;
}

export class FileService {
  private static allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  private static maxFileSizeBytes = 10 * 1024 * 1024; // 10MB
  private static defaultSignedUrlExpirySeconds = 5 * 60; // 5 minutes, per Phase 8 §7 CNIC document security

  static isPrivateBucket(bucket: UploadBucket): boolean {
    return PRIVATE_BUCKETS.includes(bucket);
  }

  static async uploadFile(options: UploadFileOptions): Promise<{ fileId: string; path: string; bucket: UploadBucket; publicUrl?: string }> {
    if (!this.allowedMimeTypes.includes(options.mimeType)) {
      throw new ValidationError("Invalid file type. Only JPEG, PNG, WebP, and PDF files are allowed.");
    }

    if (options.file.byteLength > this.maxFileSizeBytes) {
      throw new ValidationError("File size exceeds maximum limit of 10MB.");
    }

    const bucketName = appConfig.supabase.buckets[options.bucket];
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${options.filename}`;
    const filePath = `${options.bucket}/${uniqueFilename}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, options.file, {
        contentType: options.mimeType,
        upsert: false,
      });

    if (error) {
      throw new AppError(`Storage upload failed: ${error.message}`, 500, "STORAGE_ERROR");
    }

    // Private buckets (e.g. CNIC documents) are never exposed via public URL —
    // callers must request a short-lived signed URL through getSignedUrl().
    const publicUrl = !this.isPrivateBucket(options.bucket)
      ? supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl
      : undefined;

    return {
      fileId: data.path,
      path: filePath,
      bucket: options.bucket,
      publicUrl,
    };
  }

  /** Generates a short-lived signed URL for reading a file in a private bucket (e.g. admin KYC review). */
  static async getSignedUrl(bucket: UploadBucket, filePath: string, expiresInSeconds = this.defaultSignedUrlExpirySeconds): Promise<string> {
    const bucketName = appConfig.supabase.buckets[bucket];
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .createSignedUrl(filePath, expiresInSeconds);

    if (error || !data) {
      throw new AppError(`Failed to generate signed URL: ${error?.message}`, 500, "STORAGE_ERROR");
    }

    return data.signedUrl;
  }
}
