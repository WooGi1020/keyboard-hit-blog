"use client";

import { useEffect, useState } from "react";

export default function VisitorStats() {
  const [stats, setStats] = useState<{
    totalViews: number;
    dailyViews: number;
    history: number[];
  } | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const VISITED_KEY = `visited_at_${today}`;
    const CACHE_KEY = `stats_cache_${today}`;
    const CACHE_TIME = 5 * 60 * 1000;

    const cachedItem = localStorage.getItem(CACHE_KEY);
    const hasVisitedToday = localStorage.getItem(VISITED_KEY);

    if (cachedItem) {
      try {
        const { data, timestamp } = JSON.parse(cachedItem);
        setStats(data);

        // 오늘 이미 방문했었고, 캐시가 아직 유효하다면(5분 미만) fetch 생략
        const isCacheValid = Date.now() - timestamp < CACHE_TIME;
        if (hasVisitedToday && isCacheValid) return;
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    Object.keys(localStorage).forEach((key) => {
      if (
        (key.startsWith("visited_at_") || key.startsWith("stats_cache_")) &&
        !key.includes(today)
      ) {
        localStorage.removeItem(key);
      }
    });

    const method = hasVisitedToday ? "GET" : "POST";
    fetch("/api/stats", { method })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        if (method === "POST") localStorage.setItem(VISITED_KEY, "true");
      })
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  if (!stats) return null;

  const history = stats.history;
  const maxHistory = Math.max(...history, 1);
  const dataPoints = history.map((val, i) => ({
    x: (i / (history.length - 1)) * 100,
    y: 40 - (val / maxHistory) * 30,
  }));

  const curvePath = dataPoints.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    return `${acc} C ${cp1x},${prev.y} ${cp1x},${point.y} ${point.x},${point.y}`;
  }, "");

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none animate-fade-in">
      <div className="absolute inset-0 opacity-10 sm:opacity-[0.2]">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-full transform scale-y-110 origin-bottom"
        >
          {[10, 20, 30].map((line) => (
            <line
              key={line}
              x1="0"
              y1={line}
              x2="100"
              y2={line}
              stroke="currentColor"
              strokeWidth="0.05"
              strokeDasharray="1,1"
              className="text-primary"
            />
          ))}

          <path
            d={`${curvePath} L 100 40 L 0 40 Z`}
            fill="url(#stats-gradient)"
            className="text-primary"
          />

          <path
            d={curvePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          />

          <defs>
            <linearGradient id="stats-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-3 left-0 right-0 px-6 sm:flex justify-end gap-3 items-end opacity-60 hover:opacity-100 transition-opacity duration-500 hidden">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary ">
              지금까지 키보드를 두들겨준 분들
            </span>
            <span className="text-3xl font-black ml-auto tabular-nums tracking-tighter text-foreground leading-none">
              {stats.totalViews.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end text-right gap-1">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-primary">오늘 키보드를 두들겨준 분들</span>
            <span className="text-3xl  font-black tabular-nums tracking-tighter text-primary leading-none">
              {stats.dailyViews.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
