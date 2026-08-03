import { RateLimitError } from "../errors";
import { getCache } from "../cache";

/**
 * Best-effort client IP extraction for anonymous (unauthenticated) rate limiting.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Now backed by the shared CacheProvider (Phase 17) instead of a private
 * in-process Map — correct across multiple instances once REDIS_URL is set,
 * and unchanged in behavior (falls back to MemoryCacheProvider) when it
 * isn't. Callers are unaffected beyond needing `await` (added throughout in
 * this phase), since the counting logic and thrown error are identical.
 */
export async function applyRateLimit(identifier: string, limit = 100, windowMs = 60 * 1000): Promise<void> {
  const count = await getCache().incrWithExpiry(`ratelimit:${identifier}`, windowMs);

  if (count > limit) {
    throw new RateLimitError();
  }
}
