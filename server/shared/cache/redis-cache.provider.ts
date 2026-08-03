import Redis from "ioredis";
import { CacheProvider } from "./cache.types";
import { logger } from "../logger";

/**
 * UNVERIFIED IN THIS ENVIRONMENT — there is no live Redis instance reachable
 * from this dev machine, so this class has never actually connected to a
 * real server here. It's written against ioredis's documented API and
 * mirrors MemoryCacheProvider's contract exactly, but treat it as scaffolding
 * until it's exercised against a real Redis (e.g. Upstash, Supabase's Redis
 * add-on, or a self-hosted instance) in a deployed environment.
 */
export class RedisCacheProvider implements CacheProvider {
  readonly name = "redis" as const;
  private client: Redis;

  constructor(url: string) {
    this.client = new Redis(url, {
      maxRetriesPerRequest: 2,
      lazyConnect: true,
      retryStrategy: (times) => Math.min(times * 200, 2000),
    });
    this.client.on("error", (err) => {
      logger.error({ module: "cache", action: "redisError", message: "Redis connection error", error: err });
    });
  }

  private async ensureConnected(): Promise<void> {
    if (this.client.status === "wait" || this.client.status === "end") {
      await this.client.connect();
    }
  }

  async get(key: string): Promise<string | null> {
    await this.ensureConnected();
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    await this.ensureConnected();
    if (ttlSeconds) {
      await this.client.set(key, value, "EX", ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.ensureConnected();
    await this.client.del(key);
  }

  /** Atomic via Redis's native INCR — a single round trip, no read-then-write race, unlike a naive get+set. */
  async incrWithExpiry(key: string, windowMs: number): Promise<number> {
    await this.ensureConnected();
    const count = await this.client.incr(key);
    if (count === 1) {
      await this.client.pexpire(key, windowMs);
    }
    return count;
  }

  async ping(): Promise<boolean> {
    try {
      await this.ensureConnected();
      const result = await this.client.ping();
      return result === "PONG";
    } catch {
      return false;
    }
  }
}
