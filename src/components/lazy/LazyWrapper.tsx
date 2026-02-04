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

const ThemeChangeButton = dynamic(() => import("../themes/ThemeChangeButton"), {
  ssr: false,
});

export function LazyThemeChangeButton() {
  return <ThemeChangeButton />;
}

export function LazyLoadGiscus() {
  return <LazyGiscus />;
}

export function LazyLoadLottieMonitor() {
  return <LazyLottieMonitor className="animate-fall mx-auto" />;
}

export function LazyLoadLottieKeyboard() {
  return (
    <LazyLottieKeyboard className="animate-fall w-14 h-14 transition-transform duration-300 -translate-y-3.5 -translate-x-2" />
  );
}
