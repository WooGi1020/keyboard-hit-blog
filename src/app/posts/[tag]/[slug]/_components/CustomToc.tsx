"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StepBack, Copy, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string | null;
  level: number;
}

const MOBILE_MAX_WIDTH = "768px";
const WEB_MAX_WIDTH = "1280px";

function CustomToc() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const router = useRouter();

  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const isTablet = useMediaQuery(`(max-width: ${WEB_MAX_WIDTH})`);

  const handleClickBack = () => router.push("/posts/all");

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ description: "게시글 링크가 복사되었습니다." });
    } catch {
      toast({ variant: "destructive", description: "링크 복사에 실패했습니다." });
    }
  };

  const handleClickToComment = () => {
    const commentSection = document.querySelector(".giscus");
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("#giscus-comment-box");
    }
  };

  useEffect(() => {
    const headers = Array.from(document.querySelectorAll("article h1, article h2")).map(
      (header) => ({
        id: header.id,
        text: header.textContent,
        level: Number(header.tagName.substring(1)), // h1 -> 1, h2 -> 2
      })
    );

    setTocItems(headers);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    document.querySelectorAll("article h1, article h2").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClickCopy}
          className="rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur"
        >
          <Copy className="size-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClickToComment}
          className="rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur"
        >
          <MessageSquareText className="size-5" />
        </Button>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="my-10 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
          On this page
        </p>
        <ul className="space-y-2">
          {tocItems.map((item) => (
            <li key={item.id} className={cn(item.level === 2 && "pl-4")}>
              <Link
                href={`#${item.id}`}
                className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <aside
      className="absolute top-0 -right-[300px] h-full hidden xl:block w-[260px]"
      aria-label="Table of Contents"
    >
      <div className="sticky top-[300px] flex flex-col gap-8">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pl-4">
            On this page
          </p>

          <ul className="space-y-3 border-l border-zinc-200 dark:border-zinc-800 pl-4">
            {tocItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    setActiveId(item.id);
                  }}
                  className={cn(
                    "block text-sm transition-all duration-200 leading-snug",
                    item.level === 2 && "pl-4 text-xs",
                    activeId === item.id
                      ? "font-medium text-blue-600 dark:text-blue-400 -translate-x-px"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                >
                  {activeId === item.id && (
                    <span className="absolute -left-[17px] top-0 h-full w-0.5 rounded-full bg-blue-600 dark:bg-blue-400 content-[''] transition-all" />
                  )}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 border-t border-zinc-200 pt-6 mx-4 dark:border-zinc-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClickBack}
            className="h-8 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <StepBack className="mr-2 size-4" />
            <span className="text-xs">목록</span>
          </Button>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickCopy}
            className="size-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            title="링크 복사"
          >
            <Copy className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickToComment}
            className="size-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            title="댓글 보기"
          >
            <MessageSquareText className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default CustomToc;
