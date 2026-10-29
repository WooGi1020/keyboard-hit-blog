"use client";

import { usePathname } from "next/navigation";
import HomeLink from "./HomeLink";
import { LazyThemeChangeButton } from "../lazy/LazyWrapper";
import AboutMeLink from "./AboutMeLink";

function HeaderNav() {
  const pathname = usePathname();
  return (
    <nav className="site-header-nav" aria-label="주 메뉴">
      <div className="site-header-links">
        <HomeLink pathname={pathname} />
        <AboutMeLink pathname={pathname} />
      </div>
      <LazyThemeChangeButton />
    </nav>
  );
}
export default HeaderNav;
