import { posts } from "#site/content";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const defaultSiteMaps: MetadataRoute.Sitemap = [
  {
    url: baseUrl || "https://keyboard-hit-blog.vercel.app",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${baseUrl || "https://keyboard-hit-blog.vercel.app"}/about`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapFromPosts: MetadataRoute.Sitemap = posts.flatMap((post) =>
    post.tags.map((tag) => ({
      url: `${baseUrl || "https://keyboard-hit-blog.vercel.app"}/posts/${tag}/${post.slug}`,
      lastModified: new Date(post.createdDate),
      changeFrequency: "daily" as const, // 타입 안전성 확보
      priority: 0.7,
    }))
  );

  return [...defaultSiteMaps, ...sitemapFromPosts];
}
