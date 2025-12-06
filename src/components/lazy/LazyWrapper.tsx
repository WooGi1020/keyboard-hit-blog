"use client";

import dynamic from "next/dynamic";

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
  return <LazyLottieKeyboard className="lottie-animation relative bottom-8" />;
}
