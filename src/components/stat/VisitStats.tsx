"use client";

import { use, useEffect, useState } from "react";
import RollingNumber from "./RollingNumber";
import dayjs from "dayjs";

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
    <div className="absolute inset-0 z-0 pointer-events-none select-none animate-fade-in group">
      <div className="absolute inset-0 opacity-30 px-4 sm:px-6 group-hover:opacity-70 transition-opacity duration-500">
        <div className="relative w-full h-full transform scale-y-110 origin-bottom">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
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

          <div className="absolute inset-0 pointer-events-none">
            {dataPoints.map((point, i) => {
              const date = dayjs()
                .subtract(history.length - 1 - i, "day")
                .format("MM.DD");
              return (
                <div
                  key={i}
                  className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center"
                  style={{
                    left: `${point.x}%`,
                    top: `${(point.y / 40) * 100}%`,
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  <div className="absolute bottom-full mb-1.5 flex flex-col items-center drop-shadow-sm transform -translate-x-1/2 -left-1/2">
                    <span className="text-[8px] sm:text-[10px] whitespace-nowrap font-black text-primary leading-none">
                      {history[i].toLocaleString()}
                    </span>
                    <span className="text-[6px] sm:text-[8px] whitespace-nowrap font-bold text-primary/40 leading-none mt-0.5">
                      {date}
                    </span>
                  </div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full ring-2 ring-background ring-offset-0 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 sm:-bottom-5 left-0 right-3 px-6 flex justify-end gap-3 items-end opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-bold text-primary ">
              지금까지 키보드를 두들겨준 분들
            </span>
            <RollingNumber
              value={stats.totalViews}
              className="text-sm sm:text-3xl font-black ml-auto tabular-nums tracking-tighter text-foreground leading-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-end text-right gap-1">
          <div className="flex flex-col items-end">
            <span className="text-[8px] sm:text-[10px] font-bold text-primary">
              오늘 키보드를 두들겨준 분들
            </span>
            <RollingNumber
              value={stats.dailyViews}
              className="text-sm sm:text-3xl font-black tabular-nums tracking-tighter text-primary leading-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
