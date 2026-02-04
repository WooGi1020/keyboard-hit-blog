import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AboutMeLink({ pathname }: { pathname: string }) {
  return (
    <Link href="/about" title="about me 링크" className="group">
      <Button
        variant="ghost"
        className={cn(
          "relative px-3 gap-1.5 transition-colors hover:bg-transparent",
          pathname === "/about"
            ? "text-foreground font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="relative">
          About Me
          <span
            className={cn(
              "absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300",
              pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
            )}
          />
        </span>
      </Button>
    </Link>
  );
}
