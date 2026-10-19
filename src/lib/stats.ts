import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";

export interface VisitStats {
  totalViews: number;
  dailyViews: number;
  history: number[];
}

const HISTORY_DAYS = 7;
const EMPTY_STATS: VisitStats = {
  totalViews: 0,
  dailyViews: 0,
  history: Array.from({ length: HISTORY_DAYS }, () => 0),
};

let client: Redis | null | undefined;

/**
 * Upstash 환경 변수가 없는 환경(로컬 개발, CI)에서는 null을 돌려준다.
 * 통계는 부가 기능이라 저장소가 없어도 페이지는 렌더되어야 한다.
 */
function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

const todayKey = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split("T")[0];
};

export async function getVisitStats(): Promise<VisitStats> {
  const redis = getRedis();
  if (!redis) return EMPTY_STATS;

  try {
    const historyKeys = Array.from(
      { length: HISTORY_DAYS },
      (_, i) => `stats:daily:views:${todayKey(i)}`
    ).reverse();

    const [totalViews, ...historyViews] = await Promise.all([
      redis.get<number>("stats:total:views"),
      ...historyKeys.map((key) => redis.get<number>(key)),
    ]);

    return {
      totalViews: Number(totalViews ?? 0),
      dailyViews: Number(historyViews[HISTORY_DAYS - 1] ?? 0),
      history: historyViews.map((v) => Number(v ?? 0)),
    };
  } catch (error) {
    console.error("[stats] read failed:", error);
    return EMPTY_STATS;
  }
}

/**
 * 페이지(서버 컴포넌트)용 읽기. 정적 생성·ISR과 함께 쓰도록 Next 데이터 캐시에 5분 보관한다.
 * Upstash 클라이언트의 fetch는 no-store라, 그대로 부르면 정적 렌더가 동적으로 바뀐다.
 */
export const getCachedVisitStats = unstable_cache(getVisitStats, ["visit-stats"], {
  revalidate: 300,
  tags: ["visit-stats"],
});

export async function recordVisit(ip: string): Promise<VisitStats> {
  const redis = getRedis();
  if (!redis) return EMPTY_STATS;

  try {
    const today = todayKey();
    const isNewVisitor = await redis.set(`visitor:${today}:${ip}`, "1", { nx: true, ex: 86400 });

    if (isNewVisitor) {
      await Promise.all([
        redis.incr("stats:total:views"),
        redis.incr(`stats:daily:views:${today}`),
      ]);
    }
  } catch (error) {
    console.error("[stats] write failed:", error);
  }

  return getVisitStats();
}
