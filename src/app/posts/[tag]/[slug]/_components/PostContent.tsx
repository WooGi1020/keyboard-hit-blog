import * as runtime from "react/jsx-runtime";
import components from "./MarkdownComponent";
import CustomToc from "./CustomToc";

const useMDX = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface PostContentProps {
  code: string;
}

function PostContent({ code }: PostContentProps) {
  const Component = useMDX(code);

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
