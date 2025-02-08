import components from "@/app/posts/[tag]/[slug]/_components/MarkdownComponent";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkBreak from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";

async function PostContent({ content, imagePath }: { content: string; imagePath: string }) {
  return (
    <article className="relative prose dark:prose-dark w-full max-w-[950px]">
      <div className="relative w-full h-auto mb-[80px]">
        <Image
          src={`/images/thumbnails/${imagePath}.jpg`}
          alt="포스트 썸네일 이미지"
          width={950}
          height={281}
          priority
          sizes="100%"
          className="object-contain"
        />
      </div>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreak],
            rehypePlugins: [
              [
                rehypeSlug,
                rehypeAutolinkHeadings,
                {
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
              [
                rehypePrettyCode,
                {
                  theme: "one-dark-pro",
                  keepBackground: true,
                  defaultLang: {
                    block: "javascript",
                    inline: "text", // 인라인 코드 처리 방식 다르게 설정
                  },
                },
              ],
            ],
            format: "mdx",
          },
        }}
        components={components}
      />
    </article>
  );
}

export default PostContent;
