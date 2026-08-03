import { NextResponse } from "next/server";
import { checkDatabase, checkRedis, checkStorage, checkQueue } from "@/server/shared/health";

/** Overall application health — aggregates every dependency. Not gated by auth: monitoring tools (uptime checks, load balancers) need to reach this anonymously. */
export async function GET() {
  const [database, redis, storage, queue] = await Promise.all([checkDatabase(), checkRedis(), checkStorage(), checkQueue()]);

  const checks = { database, redis, storage, queue };
  const anyUnhealthy = Object.values(checks).some((c) => c.status === "unhealthy");
  const overall = anyUnhealthy ? "unhealthy" : Object.values(checks).some((c) => c.status === "degraded") ? "degraded" : "healthy";

  return NextResponse.json({ status: overall, checks, timestamp: new Date().toISOString() }, { status: anyUnhealthy ? 503 : 200 });
}
