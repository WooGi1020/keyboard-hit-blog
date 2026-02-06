"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ThemeChangeButton() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      aria-label="테마 색상 변경버튼"
      variant="outline"
      size="icon"
      className="relative size-10 overflow-hidden rounded-lg bg-background border-2 border-border/40 hover:border-border hover:bg-accent shrink-0 focus:bg-accent focus:border-border"
      onClick={() => {
        setTheme(isDark ? "white" : "dark");
      }}
    >
      <div className="relative size-5 flex items-center justify-center">
        <Sun
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 fill-yellow-400 stroke-yellow-500"
          )}
        />
        <Moon
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            isDark
              ? "rotate-0 scale-100 opacity-100 fill-yellow-400 stroke-transparent"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">색상테마 전환 버튼</span>
    </Button>
  );
}

export default ThemeChangeButton;
