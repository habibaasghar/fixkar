import { z } from "zod";

export const uploadBucketSchema = z.enum(["vendorDocs", "portfolio", "blog", "categoryIcons"]);

export type UploadBucket = z.infer<typeof uploadBucketSchema>;

/** Buckets that must never be served via public URL — only short-lived signed URLs. */
export const PRIVATE_BUCKETS: readonly UploadBucket[] = ["vendorDocs"];
