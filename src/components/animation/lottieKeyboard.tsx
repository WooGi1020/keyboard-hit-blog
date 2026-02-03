"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import animationData from "../../../public/lottie/animation.json";
import whiteAnimationData from "../../../public/lottie/whiteAnimation.json";

function LottieKeyboard({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Lottie
        autoplay
        loop
        animationData={theme === "dark" ? whiteAnimationData : animationData}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default LottieKeyboard;
