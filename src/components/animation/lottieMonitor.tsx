"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import darkMonitor from "../../../public/lottie/dark-monitor.json";
import whiteMonitor from "../../../public/lottie/white-monitor.json";

function LottieMonitor({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={cn(className)}>
      <Lottie
        autoplay
        loop
        animationData={theme === "white" ? whiteMonitor : darkMonitor}
        style={{ height: "80px", width: "80px" }}
      />
    </div>
  );
}

export default LottieMonitor;
