import components from "./MarkdownComponent";
import CustomToc from "./CustomToc";
import parseMDX from "@/utils/parseMDX";

interface PostContentProps {
  code: string;
}

function PostContent({ code }: PostContentProps) {
  const Component = parseMDX(code);

  return (
    <article className="relative w-full max-w-[900px] mx-auto">
      <CustomToc />
      <div className="prose dark:prose-invert max-w-none">
        <Component components={components} />
      </div>
    </article>
  );
}

export default PostContent;
