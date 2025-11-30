"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import animationData from "../../../public/lottie/animation.json";
import whiteAnimationData from "../../../public/lottie/whiteAnimation.json";

function LottieKeyboard({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={cn(className)}>
      <Lottie
        autoplay
        loop
        animationData={theme === "white" ? animationData : whiteAnimationData}
        style={{ height: "80px", width: "80px" }}
      />
    </div>
  );
}

export default LottieKeyboard;
