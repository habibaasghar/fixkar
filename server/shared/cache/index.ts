import { CacheProvider } from "./cache.types";
import { MemoryCacheProvider } from "./memory-cache.provider";
import { RedisCacheProvider } from "./redis-cache.provider";
import { logger } from "../logger";

export type { CacheProvider } from "./cache.types";

let instance: CacheProvider | null = null;

/**
 * Single place that decides Redis vs. in-memory. Everything else in the
 * codebase (rate limiter, future session/OTP caching, catalog/dashboard
 * caching) depends only on the CacheProvider interface, never on ioredis or
 * this env check directly — swapping the backing store later means nothing
 * outside this file changes. Importing RedisCacheProvider here doesn't
 * connect anything by itself (its constructor uses lazyConnect) — a real
 * connection is only attempted the first time a method is called, and only
 * when REDIS_URL is actually set.
 */
export function getCache(): CacheProvider {
  if (instance) return instance;

  if (process.env.REDIS_URL) {
    logger.info({ module: "cache", action: "init", message: "Using RedisCacheProvider (REDIS_URL configured)" });
    instance = new RedisCacheProvider(process.env.REDIS_URL);
  } else {
    logger.info({ module: "cache", action: "init", message: "Using MemoryCacheProvider (REDIS_URL not set — single-instance only)" });
    instance = new MemoryCacheProvider();
  }

  return instance;
}
