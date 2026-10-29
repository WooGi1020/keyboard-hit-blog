"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface TagInfo {
  tag: string;
  count: number;
}

export function TagNav({ tagInfos, allTagCount }: { tagInfos: TagInfo[]; allTagCount: number }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const selected = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!selected || !navRef.current) return;
    const nav = navRef.current;
    const left = selected.offsetLeft;
    if (left < nav.scrollLeft || left + selected.offsetWidth > nav.scrollLeft + nav.clientWidth)
      nav.scrollLeft = left;
  }, [pathname]);
  const tags = [
    { tag: "전체", count: allTagCount, href: "/" },
    ...tagInfos.map((item) => ({ ...item, href: `/posts/${item.tag}` })),
  ];
  return (
    <nav ref={navRef} className="home-tags" aria-label="글 주제">
      {tags.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="home-tag"
          aria-current={pathname === item.href ? "page" : undefined}
        >
          <span>{item.tag}</span>
          <span className="home-tag-count">{item.count}</span>
        </Link>
      ))}
    </nav>
  );
}
