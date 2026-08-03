import { NextResponse } from "next/server";
import { checkRedis } from "@/server/shared/health";

export async function GET() {
  const result = await checkRedis();
  return NextResponse.json(result, { status: result.status === "unhealthy" ? 503 : 200 });
}
