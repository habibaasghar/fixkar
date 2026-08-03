import { CacheProvider } from "./cache.types";

interface Entry {
  value: string;
  expiresAt: number | null;
}

interface CounterEntry {
  count: number;
  resetAt: number;
}

/**
 * Single-instance, in-process fallback — this is the same Map-based
 * mechanism the rate limiter used directly before Phase 17 (see the old
 * comment in rate-limit.middleware.ts). Correct for local dev and a
 * single-instance deployment; NOT correct once the app runs on more than one
 * instance, since each instance would have its own independent counters.
 * Set REDIS_URL to activate RedisCacheProvider instead — see cache/index.ts.
 */
export class MemoryCacheProvider implements CacheProvider {
  readonly name = "memory" as const;
  private store = new Map<string, Entry>();
  private counters = new Map<string, CounterEntry>();

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    this.store.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async incrWithExpiry(key: string, windowMs: number): Promise<number> {
    const now = Date.now();
    const record = this.counters.get(key);

    if (!record || now > record.resetAt) {
      this.counters.set(key, { count: 1, resetAt: now + windowMs });
      return 1;
    }

    record.count += 1;
    return record.count;
  }

  async ping(): Promise<boolean> {
    return true;
  }
}
