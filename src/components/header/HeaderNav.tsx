"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import LottieKeyboard from "../animation/lottieKeyboard";

const ThemeChangeButton = dynamic(() => import("../themes/ThemeChangeButton"), {
  ssr: false,
});

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center h-full w-full max-w-[1232px] px-4 mx-auto">
      <div className="flex gap-0 items-center">
        <Link href="/" className="flex items-center w-18">
          <LottieKeyboard className="-translate-y-3.5 w-15 h-15 hover:w-16 hover:h-16 transition-all duration-200" />
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
