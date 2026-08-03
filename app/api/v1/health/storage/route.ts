import { NextResponse } from "next/server";
import { checkStorage } from "@/server/shared/health";

export async function GET() {
  const result = await checkStorage();
  return NextResponse.json(result, { status: result.status === "unhealthy" ? 503 : 200 });
}
