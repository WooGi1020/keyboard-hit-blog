import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import components from "./MarkdownComponent";
import CustomToc from "./CustomToc";

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
    <article className="relative w-full max-w-[900px] mx-auto">
      <div className="relative w-full aspect-21/9 mb-10 overflow-hidden">
        <Image
          src={`/images/thumbnails/${imagePath}.jpg`}
          alt="포스트 썸네일 이미지"
          fill
          priority
          className="object-contain"
        />
      </div>
      <CustomToc />
      <div className="prose dark:prose-invert max-w-none">
        <Component components={components} />
      </div>
    </article>
  );
}

export default PostContent;
