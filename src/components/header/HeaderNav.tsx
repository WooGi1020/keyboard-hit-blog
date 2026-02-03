"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import LottieKeyboard from "../animation/lottieKeyboard";
import { Mouse } from "lucide-react";
import { LazyLoadLottieKeyboard } from "../lazy/LazyWrapper";

const ThemeChangeButton = dynamic(() => import("../themes/ThemeChangeButton"), {
  ssr: false,
});

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center h-full w-full max-w-[1232px] px-4 mx-auto">
      <div className="flex gap-3 items-center">
        <Link href="/" className="group relative flex items-center justify-center w-28 h-10">
          <div className="absolute inset-x-1 h-10 bg-muted/40 rounded-lg border-2 border-border/40 group-hover:border-blue-500/30 transition-all duration-300" />

          {/* Mouse - Fixed absolute position to keep layout stable during Lottie loading */}
          <Mouse className="absolute right-3.5 bottom-3 w-4 h-4 text-foreground  transition-all duration-300 stroke-[2.5] z-20" />

          {/* Keyboard - Lazy loaded but centered via parent flex */}
          <LazyLoadLottieKeyboard />
        </Link>
        <Link
          href="/about"
          className={`${pathname === "/about" && `bg-accent text-accent-foreground rounded-lg`}`}
        >
          <Button variant="ghost">About Me</Button>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeChangeButton />
      </div>
    </nav>
  );
}

export default HeaderNav;
