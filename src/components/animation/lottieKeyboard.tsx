"use client";

import { Lottie } from "lottie-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// JSON을 번들에 넣지 않고 public 경로에서 받아온다 (lottie-react 3의 `src`).
const LIGHT_SRC = "/lottie/keyboard-paper.json";
const DARK_SRC = "/lottie/keyboard-paper-dark.json?v=2";

function LottieKeyboard({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Lottie
        src={resolvedTheme === "dark" ? DARK_SRC : LIGHT_SRC}
        autoplay
        loop
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default LottieKeyboard;
