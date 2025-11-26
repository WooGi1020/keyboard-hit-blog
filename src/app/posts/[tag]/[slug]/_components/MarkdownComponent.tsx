import CustomPre from "@/app/posts/[tag]/[slug]/_components/CustomPre"; // ✅ CustomPre 경로 확인
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
// import CustomToc from "./CustomToc"; // TOC 컴포넌트가 있다면 주석 해제

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImgProps = ComponentPropsWithoutRef<"img">;
type CodeProps = ComponentPropsWithoutRef<"code">;

// 1. 링크 스타일 (파란색 + 호버 밑줄)
function CustomLink({ href, children, ...props }: AnchorProps) {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  const baseClass =
    "font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 decoration-2";

  if (isInternalLink) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass} {...props}>
      {children}
    </a>
  );
}

// 2. 이미지 스타일 (반응형 + 둥근 모서리 + 그림자)
function CustomImg({ src, alt, ...props }: ImgProps) {
  // Next/Image를 Markdown에서 쓰려면 width/height를 알아야 하는데(rehype 플러그인 필요),
  // 여기서는 안전하게 img 태그를 쓰되 스타일링으로 보완합니다.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || "content image"}
      // max-w-full h-auto: 반응형 처리
      // rounded-xl shadow-lg: 모던한 외관
      className="mx-auto my-8 h-auto max-w-full rounded-xl border border-zinc-200 shadow-lg dark:border-zinc-800"
      {...props}
    />
  );
}

// 3. 인라인 코드 스타일 (하이라이팅)
function CustomCode({ children, className, ...props }: CodeProps) {
  // className이 없으면 인라인 코드 (`code`)입니다.
  // className이 있으면 코드 블록(```js ... ```) 내부의 code이며, 이는 CustomPre가 처리합니다.
  const isInline = !className;

  if (isInline) {
    return (
      <code
        // Zinc 계열 배경색과 텍스트로 차분하게 강조
        className="rounded-md bg-zinc-200 px-1.5 py-0.5 font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        {...props}
      >
        {children}
      </code>
    );
  }

  // 코드 블록 내부의 code 태그는 스타일을 CustomPre에 위임하거나 그대로 둡니다.
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

const components = {
  a: CustomLink,
  img: CustomImg,
  pre: CustomPre,
  code: CustomCode,
  TOC: () => null,
};

export default components;
