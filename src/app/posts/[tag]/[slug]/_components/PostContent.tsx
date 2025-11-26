import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import components from "./MarkdownComponent";
import CustomToc from "./CustomToc"; // ✅ 여기서 직접 Import

const useMDX = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface PostContentProps {
  code: string;
  imagePath: string;
}

function PostContent({ code, imagePath }: PostContentProps) {
  const Component = useMDX(code);

  return (
    // ✅ relative: 자식인 TOC의 기준점이 됨
    // ❌ overflow-hidden 절대 금지: TOC가 밖으로 나가야 함
    <article className="relative w-full max-w-[1000px] mx-auto">
      {/* 썸네일 */}
      <div className="relative w-full aspect-21/9 mb-10 overflow-hidden rounded-2xl shadow-lg border dark:border-zinc-800">
        <Image
          src={`/images/thumbnails/${imagePath}.jpg`}
          alt="포스트 썸네일 이미지"
          fill
          priority
          sizes="(max-width: 1260px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* 본문 영역 */}
      <div
        className="prose prose-zinc dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight 
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:shadow-md
        prose-pre:bg-transparent prose-pre:p-0"
      >
        <Component components={components} />
      </div>

      {/* ✅ TOC를 본문 밖(형제 레벨)으로 이동 */}
      <CustomToc />
    </article>
  );
}

export default PostContent;
