import { db } from "./db";
import { getCache } from "./cache";
import { supabaseAdmin } from "./supabase";

export interface HealthCheckResult {
  status: "healthy" | "degraded" | "unhealthy";
  details?: string;
  latencyMs?: number;
}

export async function checkDatabase(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    await db.$queryRaw`SELECT 1`;
    return { status: "healthy", latencyMs: Date.now() - start };
  } catch (err) {
    return { status: "unhealthy", details: err instanceof Error ? err.message : "Unknown database error" };
  }
}

export async function checkRedis(): Promise<HealthCheckResult> {
  const cache = getCache();
  if (cache.name === "memory") {
    // Not a failure — REDIS_URL just isn't configured, so the in-memory
    // fallback is active by design (see server/shared/cache/index.ts).
    return { status: "degraded", details: "REDIS_URL not configured — using single-instance in-memory cache." };
  }
  const start = Date.now();
  const ok = await cache.ping();
  return ok ? { status: "healthy", latencyMs: Date.now() - start } : { status: "unhealthy", details: "Redis ping failed." };
}

export async function checkStorage(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const { error } = await supabaseAdmin.storage.listBuckets();
    if (error) return { status: "unhealthy", details: error.message };
    return { status: "healthy", latencyMs: Date.now() - start };
  } catch (err) {
    return { status: "unhealthy", details: err instanceof Error ? err.message : "Unknown storage error" };
  }
}

export async function checkQueue(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const pendingCount = await db.notificationDispatch.count({ where: { status: "PENDING" } });
    // Not itself unhealthy — a growing backlog just means the (currently
    // manual, per Phase 16/17) processor hasn't been triggered recently.
    return { status: pendingCount > 1000 ? "degraded" : "healthy", details: `${pendingCount} pending dispatch(es)`, latencyMs: Date.now() - start };
  } catch (err) {
    return { status: "unhealthy", details: err instanceof Error ? err.message : "Unknown queue error" };
  }
}
