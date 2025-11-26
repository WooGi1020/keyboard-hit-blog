"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StepBack, CopySlashIcon, AppWindowIcon, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string | null;
  level: number;
}

// 반응형 기준점
const MOBILE_MAX_WIDTH = "768px";
const WEB_MAX_WIDTH = "1280px"; // 이 이하에서는 본문 내부에 인라인으로 표시

function CustomToc() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const router = useRouter();

  // 미디어 쿼리
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const isTablet = useMediaQuery(`(max-width: ${WEB_MAX_WIDTH})`);

  const handleClickBack = () => router.push("/posts/all");

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ description: "링크가 복사되었습니다." });
    } catch {
      toast({ variant: "destructive", description: "링크 복사에 실패했습니다." });
    }
  };

  const handleClickToComment = () => {
    // Giscus 댓글 영역으로 부드럽게 이동
    const commentSection = document.querySelector(".giscus");
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // fallback
      router.push("#giscus-comment-box");
    }
  };

  useEffect(() => {
    // 1. 헤더 수집
    const headers = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3")).map(
      (header) => ({
        id: header.id,
        text: header.textContent,
        // h1=1, h2=2, h3=3
        level: Number(header.tagName.substring(1)),
      })
    );

    // 제목(h1)은 제외하고 h2부터 보여주기 (필요 시 조정)
    const filteredHeaders = headers.filter((h) => h.level > 1);
    setTocItems(filteredHeaders);

    // 2. 스크롤 감지 (Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" } // 화면 상단 40% 지점에서 감지
    );

    document.querySelectorAll(".prose h2, .prose h3").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- 1. 모바일 뷰 (우측 하단 플로팅) ---
  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClickCopy}
          className="rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800"
        >
          <CopySlashIcon className="size-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClickToComment}
          className="rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800"
        >
          <MessageSquareText className="size-5" />
        </Button>
      </div>
    );
  }

  // --- 2. 태블릿/작은 데스크탑 뷰 (본문 상단 인라인 박스) ---
  if (isTablet) {
    return (
      <div className="my-10 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
          On this page
        </p>
        <ul className="space-y-2">
          {tocItems.map((item) => (
            <li key={item.id} style={{ paddingLeft: (item.level - 2) * 16 }}>
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

  // --- 3. 데스크탑 사이드바 뷰 (요청하신 Absolute Right 포지션) ---
  return (
    <aside
      // ✅ 요청하신 위치 로직 유지: absolute top-0 -right-XX
      // -right-80은 약 320px입니다. 너비를 고려해 적절히 배치합니다.
      className="absolute top-0 -right-[340px] h-full hidden xl:block w-[280px]"
      aria-label="Table of Contents"
    >
      {/* Sticky 컨테이너 */}
      <div className="sticky top-[120px] flex flex-col">
        {/* TOC 리스트 영역 */}
        <div className="px-4">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            On this page
          </p>

          {/* 왼쪽 보더 라인 추가로 계층 구조 시각화 */}
          <ul className="space-y-2.5 border-l border-zinc-200 dark:border-zinc-800 pl-4">
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
                    "block text-sm transition-colors duration-200 leading-snug hover:text-zinc-900 dark:hover:text-zinc-100",
                    // 레벨에 따른 들여쓰기
                    item.level === 3 && "pl-4",
                    // 활성화 상태 스타일
                    activeId === item.id
                      ? "font-medium text-blue-600 dark:text-blue-400 translate-x-1"
                      : "text-zinc-500 dark:text-zinc-500"
                  )}
                >
                  {/* 활성화 시 왼쪽에 작은 불릿 포인트 표시 (선택사항) */}
                  {activeId === item.id && (
                    <span className="absolute -left-[21px] h-full w-0.5 rounded-full bg-blue-600 dark:bg-blue-400 content-['']" />
                  )}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 액션 버튼 그룹 (심플하게 변경) */}
        <div className="flex items-center gap-2 border-t border-zinc-200 pt-6 mx-4 dark:border-zinc-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClickBack}
            className="h-9 px-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <StepBack className="mr-2 size-4" />
            <span className="text-xs">목록</span>
          </Button>
          <div className="flex-1" /> {/* 간격 벌리기 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickCopy}
            className="size-9 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="링크 복사"
          >
            <CopySlashIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickToComment}
            className="size-9 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="댓글 보기"
          >
            <AppWindowIcon className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default CustomToc;
