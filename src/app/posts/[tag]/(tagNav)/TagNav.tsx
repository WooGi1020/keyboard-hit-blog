"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import VisitorStats from "@/components/stat/VisitStats";

interface TagInfo {
  tag: string;
  count: number;
}

export function TagNav({ tagInfos, allTagCount }: { tagInfos: TagInfo[]; allTagCount: number }) {
  const pathname = usePathname();

  useEffect(() => {
    const selectedLink = document.querySelector(`a[href='${pathname}']`);
    selectedLink?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pathname]);

  const isActive = (path: string) => pathname === path || (path === "/" && pathname === "/");

  return (
    <nav className="flex items-center justify-between w-full max-w-[1240px] mx-auto overflow-x-auto px-4 sm:px-6 py-3 mb-6 sm:py-6 no-scrollbar gap-2 sm:gap-3">
      <div className="flex gap-3 sm:gap-4">
        <Link
          className={cn(
            "px-5 py-2 text-sm sm:text-base font-bold whitespace-nowrap rounded-full border",
            isActive("/")
              ? "bg-foreground text-background border-foreground shadow-sm"
              : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          )}
          href="/"
        >
          전체 <span className="ml-1 opacity-50 font-medium">{allTagCount}</span>
        </Link>
        {tagInfos.map((tagInfo) => (
          <Link
            className={cn(
              "px-5 py-2 text-sm sm:text-base font-bold whitespace-nowrap rounded-full border",
              isActive(`/posts/${tagInfo.tag}`)
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            )}
            href={`/posts/${tagInfo.tag}`}
            key={tagInfo.tag}
          >
            {tagInfo.tag} <span className="ml-1 opacity-50 font-medium">{tagInfo.count}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
