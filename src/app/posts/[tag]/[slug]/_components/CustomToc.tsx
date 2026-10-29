"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Copy, MessageSquareText, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function CustomToc() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(".post-prose h1[id], .post-prose h2[id]")
    );
    const frame = requestAnimationFrame(() => {
      setItems(
        headings.map((heading) => ({
          id: heading.id,
          text: (heading.textContent || "").replace(/^🔗\s*/, ""),
          level: Number(heading.tagName.slice(1)),
        }))
      );
      setActiveId(headings[0]?.id || "");
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" }
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크를 복사했습니다.");
    } catch {
      toast.error("링크를 복사하지 못했습니다.");
    }
  }

  if (!items.length) return null;
  const links = items.map((item) => (
    <li key={item.id}>
      <Link
        href={`#${item.id}`}
        aria-current={activeId === item.id ? "location" : undefined}
        className={cn("post-toc-link", activeId === item.id && "is-active")}
        onClick={() => setActiveId(item.id)}
      >
        {item.text}
      </Link>
    </li>
  ));

  return (
    <>
      <details className="post-toc-inline">
        <summary>
          이 글의 내용 <span>{items.length}개 항목</span>
        </summary>
        <ol>{links}</ol>
        <div className="post-toc-actions">
          <button type="button" onClick={copyLink} aria-label="글 링크 복사">
            <Copy size={14} aria-hidden="true" /> <span>링크 복사</span>
          </button>
          <a href="#post-comments" aria-label="댓글로 이동">
            <MessageSquareText size={14} aria-hidden="true" /> <span>댓글</span>
          </a>
        </div>
      </details>
      <aside className="post-toc-aside" aria-label="글 목차">
        <div className="post-toc-sticky">
          <p className="post-toc-label">이 글의 내용</p>
          <ol>{links}</ol>
          <div className="post-toc-actions">
            <button type="button" onClick={copyLink} aria-label="글 링크 복사" title="링크 복사">
              <Copy size={15} />
            </button>
            <a href="#post-comments" aria-label="댓글로 이동" title="댓글">
              <MessageSquareText size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
                })
              }
              aria-label="맨 위로 이동"
              title="맨 위로"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CustomToc;
