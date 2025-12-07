"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const LazyGiscus = dynamic(() => import("@/components/giscus/Giscus"), {
  ssr: false,
});

const LazyLottieMonitor = dynamic(() => import("@/components/animation/lottieMonitor"), {
  ssr: false,
});

const LazyLottieKeyboard = dynamic(() => import("@/components/animation/lottieKeyboard"), {
  ssr: false,
});

export function LazyLoadGiscus() {
  return <LazyGiscus />;
}

export function LazyLoadLottieMonitor() {
  return <LazyLottieMonitor className="lottie-animation mx-auto relative bottom-5" />;
}

export function LazyLoadLottieKeyboard() {
  const pathname = usePathname();

  return (
    <LazyLottieKeyboard
      className={`${pathname === "/" ? "lottie-animation" : ""} absolute top-12 left-1/2 -translate-x-1/2`}
    />
  );
}
