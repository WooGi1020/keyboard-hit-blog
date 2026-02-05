"use client";

import { use, useEffect, useState } from "react";

interface Stats {
  totalViews: number;
  dailyViews: number;
  history: number[];
}

interface VisitorStatsProps {
  visitPromise: Promise<Stats>;
}

export default function VisitorStats({ visitPromise }: VisitorStatsProps) {
  const initialStats = use(visitPromise);

  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const VISITED_KEY = `visited_at_${today}`;
    const hasVisitedToday = localStorage.getItem(VISITED_KEY);

    if (!hasVisitedToday) {
      fetch("/api/stats", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          localStorage.setItem(VISITED_KEY, "true");
        })
        .catch((err) => console.error("Stats update error:", err));
    }

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("visited_at_") && !key.includes(today)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

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
      <div className="absolute inset-0 opacity-30 px-4 sm:px-6 group-hover:opacity-70 transition-opacity duration-500">
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ vectorEffect: "non-scaling-stroke" }}
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

      <div className="absolute bottom-3 left-0 right-3 px-6 flex justify-end gap-3 items-end opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-bold text-primary ">
              지금까지 키보드를 두들겨준 분들
            </span>
            <span className="text-sm sm:text-3xl font-black ml-auto tabular-nums tracking-tighter text-foreground leading-none">
              {stats.totalViews.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end text-right gap-1">
          <div className="flex flex-col items-end">
            <span className="text-[8px] sm:text-[10px] font-bold text-primary">
              오늘 키보드를 두들겨준 분들
            </span>
            <span className="text-sm sm:text-3xl font-black tabular-nums tracking-tighter text-primary leading-none">
              {stats.dailyViews.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
