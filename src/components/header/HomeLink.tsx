import { Mouse } from "lucide-react";
import { LazyLoadLottieKeyboard } from "../lazy/LazyWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomeLink({ pathname }: { pathname: string }) {
  return (
    <Link
      href="/"
      title="메인 페이지 링크"
      className="group relative flex items-center justify-center w-28 h-10 transition-transform duration-300"
    >
      <div
        className={cn(
          "absolute inset-x-1 h-10 bg-accent-foreground/20 dark:bg-muted/80 rounded-lg border-2 border-border/40",
          pathname === "/" ? "border-foreground/10" : "border-transparent"
        )}
      />

      <div className="absolute inset-x-1 inset-y-0 pointer-events-none overflow-hidden rounded-lg">
        <span
          className={cn(
            "absolute top-0 left-0 h-0.5 bg-foreground/50 transition-all duration-300",
            pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
        <span
          className={cn(
            "absolute top-0 left-0 w-0.5 bg-foreground/50 transition-all duration-300",
            pathname === "/" ? "h-full" : "h-0 group-hover:h-full"
          )}
        />
        <span
          className={cn(
            "absolute top-0 right-0 w-0.5 bg-foreground/50 transition-all duration-300 delay-200",
            pathname === "/" ? "h-full" : "h-0 group-hover:h-full"
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-foreground/50 transition-all duration-300 delay-200",
            pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </div>

      <Mouse className="absolute right-3.5 bottom-3 w-4 h-4 text-foreground stroke-[2.5] z-20 animate-mouse-move" />

      <LazyLoadLottieKeyboard />
    </Link>
  );
}
