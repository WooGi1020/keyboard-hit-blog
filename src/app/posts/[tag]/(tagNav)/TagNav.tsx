"use client";

import type { TagInfos } from "@blogType";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export function TagNav({ tagInfos, allTagCount }: { tagInfos: TagInfos; allTagCount: number }) {
  const pathname = usePathname();

  useEffect(() => {
    const selectedLink = document.querySelector(`a[href='${pathname}']`);
    selectedLink?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <nav className="flex items-center mx-auto max-w-[350px] sm:max-w-[700px] overflow-x-auto px-2 whitespace-nowrap gap-1 text-lg border-b-2 border-input pb-3 custom-scrollbar">
      <Link
        className={`text-chart-1 font-semibold px-2 py-1 rounded-md hover:bg-input ${pathname === "/" && "bg-input"}`}
        href="/"
      >
        전체 <span>({allTagCount})</span>
      </Link>
      {tagInfos.map((tagInfo) => (
        <Link
          className={`text-chart-1 font-semibold px-2 py-1 rounded-md hover:bg-input ${pathname === `/posts/${tagInfo.tag}` && "bg-input"}`}
          href={`/posts/${tagInfo.tag}`}
          key={tagInfo.tag}
        >
          {tagInfo.tag} <span>({tagInfo.count})</span>
        </Link>
      ))}
    </nav>
  );
}
