"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  codeChildren: React.ReactNode;
}

// props에 children이 포함되어 있는지 확인하는 타입 가드
function hasChildrenProp(element: any): element is { props: { children: React.ReactNode } } {
  return (
    typeof element === "object" &&
    element !== null &&
    "props" in element &&
    "children" in element.props
  );
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  // ✅ 타입 가드를 사용하여 children.props.children에 안전하게 접근
  if (React.isValidElement(children) && hasChildrenProp(children)) {
    return extractTextFromChildren(children.props.children);
  }

  return "";
};

export default function CustomCopyButton({ codeChildren }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    // children prop에서 텍스트 콘텐츠를 추출
    const code = extractTextFromChildren(codeChildren).trim();

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
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="size-6 text-zinc-400 hover:bg-white/10 hover:text-zinc-100 transition-colors"
      aria-label="코드 복사"
    >
      {isCopied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
    </Button>
  );
}
