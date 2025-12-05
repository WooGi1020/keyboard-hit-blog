import readingTimeFunc from "@/lib/readingTime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { defineConfig, defineCollection, s } from "velite";

// 1. Post 컬렉션(스키마) 정의
const posts = defineCollection({
  name: "Post",
  pattern: "**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(),
      date: s.isodate(),
      description: s.string().max(200).optional(),
      tag: s.string().optional(),
      tags: s.array(s.string()).default([]),
      code: s.mdx(),
    })
    .transform((data) => {
      const pureSlug = data.slug.split("/").pop()?.replace(".mdx", "") || "";
      const combinedTags = data.tags;
      if (data.tag) {
        combinedTags.push(data.tag);
      }

      return {
        ...data,
        slug: pureSlug, // 깔끔해진 slug 덮어쓰기
        tags: combinedTags, // 배열로 통일된 tags 덮어쓰기
        permalink: `/posts/${combinedTags[0] || "uncategorized"}/${pureSlug}`,
        readingTime: readingTimeFunc(data.code),
        // readingTime 등 추가 연산 가능
      };
    }),
});

export default defineConfig({
  root: "src/posts", // 콘텐츠 루트 폴더
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts,
  },
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: false,
          defaultLang: { block: "javascript", inline: "text" },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: { className: ["anchor"] },
          behavior: "wrap",
        },
      ],
    ],
  },
});
