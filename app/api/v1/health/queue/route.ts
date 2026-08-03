import { NextResponse } from "next/server";
import { checkQueue } from "@/server/shared/health";

export async function GET() {
  const result = await checkQueue();
  return NextResponse.json(result, { status: result.status === "unhealthy" ? 503 : 200 });
}
