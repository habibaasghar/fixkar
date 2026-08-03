import { NextResponse } from "next/server";

/** Liveness: is the process up and able to respond at all? No dependency checks — a DB outage should not make Kubernetes/the platform kill and restart a perfectly healthy process. */
export async function GET() {
  return NextResponse.json({ status: "alive" });
}
