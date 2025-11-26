"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StepBack, CopySlashIcon, AppWindowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";

interface TOCItem {
  id: string;
  text: string | null;
  level: number;
}

const MOBILE_MAX_WIDTH = "600px";
const WEB_MAX_WIDTH = "1550px";

// TOC 컴포넌트
function CustomToc() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const router = useRouter();
  const isWebScreen = useMediaQuery(`(max-width: ${WEB_MAX_WIDTH})`);
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}`);

  const handleClickBack = () => {
    router.push("/posts/all");
  };

  const handleClickCopy = async () => {
    const link = window.location.href;

    if (link) {
      try {
        navigator.clipboard.writeText(link);
        toast({ description: "게시글 링크를 복사했습니다." });
      } catch {
        toast({ description: "게시글 링크 복사에 실패했습니다." });
      }
    }
  };

  const handleClickToComment = () => {
    router.push("#giscus-comment-box", {
      scroll: true,
    });
  };

  useEffect(() => {
    // MDX 문서에서 h2, h3 태그를 찾아서 TOC 생성
    const headers = Array.from(document.querySelectorAll("h1, h2")).map((header) => ({
      id: header.id,
      text: header.textContent,
      level: header.tagName === "H1" ? 1 : 2,
    }));

    const filteredUl = headers.slice(2);

    setTocItems(filteredUl);
  }, []);

  if (isMobileScreen) {
    return (
      <div className="fixed bottom-3 right-3 flex flex-col gap-3 z-50">
        <Button
          variant="outline"
          className="border border-primary"
          size="icon"
          onClick={handleClickCopy}
          aria-label="링크 복사하기 버튼"
        >
          <CopySlashIcon className="size-5" />
        </Button>
        <Button
          variant="outline"
          className="border border-primary"
          size="icon"
          onClick={handleClickToComment}
          aria-label="댓글 바로가기 버튼"
        >
          <AppWindowIcon className="size-5" />
        </Button>
      </div>
    );
  }

  if (isWebScreen) {
    return (
      <div className="my-20 border-2 border-input pl-8 pb-4">
        <p className="text-lg text-chart-1">게시글 키워드</p>
        <ul>
          {tocItems.map((item) => (
            <li key={item.id} style={{ marginLeft: (item.level - 1) * 20 }}>
              <Link href={`#${item.id}`} className="hover:text-gray-600 dark:text-gray-300">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <aside className="absolute top-0 right-[-300px] h-full">
      <div className="flex flex-col px-5 border border-input rounded-md sticky top-[250px] ul-toc max-w-[330px]">
        <div className="w-full border-b-2 border-input">
          <p className="text-center text-lg text-chart-1">게시글 키워드</p>
        </div>
        <ul className="pl-2">
          {tocItems.map((item) => (
            <li
              key={item.id}
              style={{ marginLeft: (item.level - 1) * 20 }}
              className="whitespace-normal list-none"
            >
              <Link
                href={`#${item.id}`}
                className={`hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300 ${item.level === 2 && "text-sm"}`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-5 border-t-2 border-input py-3">
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleClickBack}
              aria-label="뒤로가기 버튼"
            >
              <StepBack />
            </Button>
            <span className="text-sm">뒤로 가기</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleClickCopy}
              aria-label="링크 복사하기 버튼"
            >
              <CopySlashIcon className="size-5" />
            </Button>
            <span className="text-sm">링크 복사</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleClickToComment}
              aria-label="댓글 바로가기 버튼"
            >
              <AppWindowIcon className="size-5" />
            </Button>
            <span className="text-sm">댓글 보기</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CustomToc;
