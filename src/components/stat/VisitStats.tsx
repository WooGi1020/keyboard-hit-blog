"use client";

import { use, useEffect, useState } from "react";
import RollingNumber from "./RollingNumber";
import type { VisitStats as Stats } from "@/lib/stats";

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
    x: (i / Math.max(history.length - 1, 1)) * 100,
    y: 40 - (val / maxHistory) * 30,
  }));

  const curvePath = dataPoints.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    return `${acc} C ${cp1x},${prev.y} ${cp1x},${point.y} ${point.x},${point.y}`;
  }, "");

  return (
    <div className="home-stats">
      <svg viewBox="0 0 100 44" className="home-stats-chart" aria-hidden="true">
        <path
          d={curvePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <dl>
        <div>
          <dt>전체 방문</dt>
          <dd aria-label={`${stats.totalViews.toLocaleString()}회`}>
            <span aria-hidden="true">
              <RollingNumber value={stats.totalViews} />
            </span>
          </dd>
        </div>
        <div>
          <dt>오늘 방문</dt>
          <dd aria-label={`${stats.dailyViews.toLocaleString()}회`}>
            <span aria-hidden="true">
              <RollingNumber value={stats.dailyViews} />
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
