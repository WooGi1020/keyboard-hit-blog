import { createElement } from "react";
import components from "./MarkdownComponent";
import CustomToc from "./CustomToc";
import parseMDX from "@/utils/parseMDX";

interface PostContentProps {
  code: string;
}

function PostContent({ code }: PostContentProps) {
  // 서버 컴포넌트. 컴파일된 MDX는 parseMDX가 코드 문자열 기준으로 캐시하므로
  // 같은 글을 다시 렌더해도 컴포넌트 identity가 유지된다.
  const content = createElement(parseMDX(code), { components });

  return (
    <article className="relative w-full max-w-[900px] mx-auto">
      <CustomToc />
      <div className="prose dark:prose-invert max-w-none break-keep">{content}</div>
    </article>
  );
}

export default PostContent;
