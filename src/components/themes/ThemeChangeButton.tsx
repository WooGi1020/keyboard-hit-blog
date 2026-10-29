"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function ThemeChangeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "라이트 모드로 전환" : "다크 모드로 전환";
  return (
    <button
      type="button"
      className="site-theme-button"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        aria-hidden="true"
        className={cn("site-theme-icon", isDark ? "is-hidden" : "is-visible")}
      />
      <Moon
        aria-hidden="true"
        className={cn("site-theme-icon", isDark ? "is-visible" : "is-hidden")}
      />
    </button>
  );
}
export default ThemeChangeButton;
