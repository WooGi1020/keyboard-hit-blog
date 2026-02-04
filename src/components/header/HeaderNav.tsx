"use client";

import { usePathname } from "next/navigation";
import HomeLink from "./HomeLink";
import { LazyThemeChangeButton } from "../lazy/LazyWrapper";
import AboutMeLink from "./AboutMeLink";

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center h-full w-full max-w-[1232px] px-4 mx-auto">
      <div className="flex gap-3 items-center">
        <HomeLink pathname={pathname} />
        <AboutMeLink pathname={pathname} />
      </div>
      <div className="flex items-center gap-3">
        <LazyThemeChangeButton />
      </div>
    </nav>
  );
}

export default HeaderNav;
