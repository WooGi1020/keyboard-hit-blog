"use client";

import { Mouse } from "lucide-react";
import { LazyLoadLottieKeyboard } from "../lazy/LazyWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useHydrated from "@/hooks/useHydrated";

export default function HomeLink({ pathname }: { pathname: string }) {
  const mounted = useHydrated();

  const segments = pathname.split("/").filter(Boolean);
  const isActive = pathname === "/" || (pathname.startsWith("/posts") && segments.length <= 2);

  const active = mounted && isActive;

  const lineBase = "absolute bg-foreground/50 transition-all duration-300";

  return (
    <Link
      href="/"
      title="홈으로"
      aria-label="홈으로"
      aria-current={active ? "page" : undefined}
      data-active={active}
      className="group relative flex items-center justify-center w-28 h-10 transition-transform duration-300"
    >
      <div className="site-keyboard-keycap absolute inset-x-1 h-10 rounded-lg border-2" />

      <div className="absolute inset-x-1 inset-y-0 pointer-events-none overflow-hidden rounded-lg">
        <span
          className={cn(
            lineBase,
            "top-0 left-0 h-0.5 w-0 group-hover:w-full group-data-[active=true]:w-full"
          )}
        />
        <span
          className={cn(
            lineBase,
            "top-0 left-0 w-0.5 h-0 group-hover:h-full group-data-[active=true]:h-full"
          )}
        />
        <span
          className={cn(
            lineBase,
            "top-0 right-0 w-0.5 h-0 delay-200 group-hover:h-full group-data-[active=true]:h-full"
          )}
        />
        <span
          className={cn(
            lineBase,
            "bottom-0 left-0 h-0.5 w-0 delay-200 group-hover:w-full group-data-[active=true]:w-full"
          )}
        />
      </div>

      <Mouse className="absolute right-3.5 bottom-3 w-4 h-4 text-foreground stroke-[2.5] z-20 animate-mouse-move" />
      <LazyLoadLottieKeyboard />
    </Link>
  );
}
