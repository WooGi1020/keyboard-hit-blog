import Link from "next/link";

export default function AboutMeLink({ pathname }: { pathname: string }) {
  return (
    <Link
      href="/about"
      className="site-about-link"
      aria-current={pathname === "/about" ? "page" : undefined}
    >
      <span>About Me</span>
    </Link>
  );
}
