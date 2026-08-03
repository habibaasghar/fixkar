import { NextResponse } from "next/server";
import { checkDatabase } from "@/server/shared/health";

/** Readiness: can this instance actually serve real traffic right now? Only the database is load-bearing enough to gate on — Redis/storage degrade gracefully (see health.ts), so they don't belong in the readiness gate. */
export async function GET() {
  const database = await checkDatabase();
  const ready = database.status !== "unhealthy";
  return NextResponse.json({ status: ready ? "ready" : "not_ready", database }, { status: ready ? 200 : 503 });
}
