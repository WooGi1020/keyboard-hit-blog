import { NextResponse, type NextRequest } from "next/server";
import { getVisitStats, recordVisit } from "@/lib/stats";

export async function GET() {
  return NextResponse.json(await getVisitStats());
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    (forwarded ? forwarded.split(",")[0]?.trim() : request.headers.get("x-real-ip")) ?? "127.0.0.1";

  return NextResponse.json(await recordVisit(ip));
}
