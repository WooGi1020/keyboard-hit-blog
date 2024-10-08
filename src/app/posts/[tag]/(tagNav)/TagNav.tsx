"use client";

import type { TagInfos } from "@blogType";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function TagNav({ tagInfos, allTagCount }: { tagInfos: TagInfos; allTagCount: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center mx-auto max-w-[350px] max-[500px]:max-w-[700px] overflow-x-auto px-2 whitespace-nowrap gap-1 text-lg border-b-2 border-input pb-3">
      <Link
        className={`text-chart-5 px-2 py-1 rounded-md hover:bg-input ${pathname === "/posts/all" && "bg-input"}`}
        href="/posts/all"
      >
        All <span>({allTagCount})</span>
      </Link>
      {tagInfos.map((tagInfo) => (
        <Link
          className={`text-chart-5 px-2 py-1 rounded-md hover:bg-input ${pathname === `/posts/${tagInfo.tag}` && "bg-input"}`}
          href={`/posts/${tagInfo.tag}`}
          key={tagInfo.tag}
        >
          {tagInfo.tag} <span>({tagInfo.count})</span>
        </Link>
      ))}
    </nav>
  );
}
