import { NextResponse } from "next/server";
import { checkDatabase } from "@/server/shared/health";

export async function GET() {
  const result = await checkDatabase();
  return NextResponse.json(result, { status: result.status === "unhealthy" ? 503 : 200 });
}
