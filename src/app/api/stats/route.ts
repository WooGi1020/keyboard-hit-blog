import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

async function getStats() {
  const dailyHistoryKeys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return `stats:daily:views:${d.toISOString().split("T")[0]}`;
  }).reverse();

  const [totalViews, ...historyViews] = await Promise.all([
    redis.get("stats:total:views"),
    ...dailyHistoryKeys.map((key) => redis.get(key)),
  ]);

  return {
    totalViews: Number(totalViews ?? 0),
    dailyViews: Number(historyViews[6] ?? 0),
    history: historyViews.map((v) => Number(v ?? 0)),
  };
}

export async function GET() {
  const stats = await getStats();
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip")) ?? "127.0.0.1";

  const today = new Date().toISOString().split("T")[0];

  const visitorKey = `visitor:${today}:${ip}`;
  const isNewVisitor = await redis.set(visitorKey, "1", { nx: true, ex: 86400 });

  if (isNewVisitor) {
    await Promise.all([redis.incr("stats:total:views"), redis.incr(`stats:daily:views:${today}`)]);
  }

  const stats = await getStats();
  return NextResponse.json(stats);
}
