export interface CacheProvider {
  readonly name: "redis" | "memory";
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  /** Atomic increment-with-expiry — the rate limiter's core primitive. Returns the count after incrementing. */
  incrWithExpiry(key: string, windowMs: number): Promise<number>;
  /** Best-effort — used by health checks. Should not throw for a healthy provider. */
  ping(): Promise<boolean>;
}
