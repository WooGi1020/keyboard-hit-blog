import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import components from "./MarkdownComponent";
import CustomToc from "./CustomToc";
import PostThumbnail from "./PostThumbnail";

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
      <PostThumbnail imagePath={imagePath} />
      <CustomToc />
      <div className="prose dark:prose-invert max-w-none">
        <Component components={components} />
      </div>
    </article>
  );
}

export default PostContent;
