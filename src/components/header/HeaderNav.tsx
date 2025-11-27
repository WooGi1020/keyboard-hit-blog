"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ThemeChangeButton = dynamic(() => import("../themes/ThemeChangeButton"), {
  ssr: false,
});

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center h-full w-full max-w-[1232px] px-4 mx-auto">
      <div className="flex gap-3 items-center">
        <Link href="/posts/all">
          <h1 className="text-[18px] font-semibold outline-none">키보드 두들기며 먹고살기</h1>
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
