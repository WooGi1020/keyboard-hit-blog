"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TagInfo {
  tag: string;
  count: number;
}

export function TagNav({ tagInfos, allTagCount }: { tagInfos: TagInfo[]; allTagCount: number }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const selectedLink = document.querySelector(`a[href='${pathname}']`);
    selectedLink?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [pathname]);

  const getIsActive = (path: string) => {
    if (!mounted) return false;
    return pathname === path;
  };

  const navItemClass = cn(
    "px-5 py-2 text-sm sm:text-base font-bold whitespace-nowrap rounded-full border transition-colors",
    "bg-background text-muted-foreground border-border",
    "hover:border-foreground hover:text-foreground", // 호버
    "data-[active=true]:bg-foreground data-[active=true]:text-background data-[active=true]:border-foreground data-[active=true]:shadow-sm"
  );

  return (
    <nav className="flex items-center justify-between w-full max-w-[1240px] mx-auto overflow-x-auto px-4 sm:px-6 py-3 mb-6 sm:py-6 no-scrollbar gap-2 sm:gap-3">
      <div className="flex gap-3 sm:gap-4">
        <Link className={navItemClass} href="/" data-active={getIsActive("/")}>
          전체 <span className="ml-1 opacity-50 font-medium">{allTagCount}</span>
        </Link>

        {tagInfos.map((tagInfo) => {
          const tagPath = `/posts/${tagInfo.tag}`;
          return (
            <Link
              key={tagInfo.tag}
              className={navItemClass}
              href={tagPath}
              data-active={getIsActive(tagPath)}
            >
              {tagInfo.tag} <span className="ml-1 opacity-50 font-medium">{tagInfo.count}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
