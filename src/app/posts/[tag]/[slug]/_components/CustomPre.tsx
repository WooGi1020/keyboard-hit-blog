"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CustomPreProps = React.ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

function CustomPre({
  children,
  className,
  style,
  "data-language": dataLanguage,
  ...props
}: CustomPreProps) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const lang = dataLanguage || "text";

  const handleCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast.success("클립보드에 복사되었습니다.");
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        toast.error("복사에 실패했습니다.");
      }
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-900 shadow-xl dark:border-zinc-800 border border-slate-200">
      <div className="flex items-center justify-between bg-slate-200 dark:bg-[#282c34] px-4 py-3">
        <div className="flex gap-2 items-center">
          <div className="size-3 rounded-full bg-[#ff5f56]" />
          <div className="size-3 rounded-full bg-[#ffbd2e]" />
          <div className="size-3 rounded-full bg-[#27c93f]" />
          <span className="text-xs font-medium ml-2 text-zinc-500 dark:text-zinc-400 uppercase">
            {lang}
          </span>
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

      <div className="relative w-full overflow-x-auto">
        <pre
          ref={preRef}
          data-language={lang}
          {...props}
          style={{ ...style, backgroundColor: "transparent" }}
          className={cn(
            "min-w-full text-sm leading-relaxed focus:outline-none p-4",
            "bg-transparent m-0 border-0",
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
