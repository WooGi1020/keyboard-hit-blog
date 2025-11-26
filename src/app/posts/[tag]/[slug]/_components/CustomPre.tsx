"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// pre 태그의 모든 속성을 포함하는 타입
type CustomPreProps = React.ComponentPropsWithoutRef<"pre">;

function CustomPre({ children, className, style, ...props }: CustomPreProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    // 텍스트만 깔끔하게 추출
    const code = preRef.current?.textContent;

    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast({ description: "클립보드에 복사되었습니다." });
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        toast({ variant: "destructive", description: "복사에 실패했습니다." });
      }
    }
  };

  return (
    // 1. Wrapper: 여기서 배경색(#282c34)과 테두리, 둥근 모서리를 담당합니다.
    <div className="relative my-6 overflow-hidden rounded-xl border border-zinc-700 bg-[#282c34] shadow-xl dark:border-zinc-800">
      {/* 2. Mac Style Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#282c34] px-4 py-3">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-[#ff5f56]" />
          <div className="size-3 rounded-full bg-[#ffbd2e]" />
          <div className="size-3 rounded-full bg-[#27c93f]" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="size-6 text-zinc-400 hover:bg-white/10 hover:text-zinc-100 transition-colors"
          aria-label="코드 복사"
        >
          {isCopied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
        </Button>
      </div>

      {/* 3. Code Area */}
      {/* overflow-x-auto를 여기에 주어야 스크롤바가 둥근 모서리 안쪽에 생깁니다 */}
      <div className="relative w-full overflow-x-auto">
        <pre
          ref={preRef}
          {...props}
          // ✅ 핵심 해결책: 인라인 스타일을 여기서 직접 제어합니다.
          // 기존 style을 유지하되, background만 투명하게 덮어씁니다.
          style={{ ...style, backgroundColor: "transparent" }}
          className={cn(
            // Tailwind 클래스로 마진/패딩 초기화 및 폰트 설정
            "min-w-full py-4 px-4 text-sm font-mono leading-relaxed focus:outline-none",
            "bg-transparent m-0 border-0", // 명시적 초기화
            className
          )}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

export default CustomPre;
