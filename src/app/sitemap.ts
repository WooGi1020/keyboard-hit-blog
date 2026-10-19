import { posts } from "#site/content";
import type { MetadataRoute } from "next";
import META_DATA from "@/constant/META_DATA";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? META_DATA.url;

const defaultSiteMaps: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapFromPosts: MetadataRoute.Sitemap = posts.flatMap((post) =>
    post.tags.map((tag) => ({
      url: `${baseUrl}/posts/${tag}/${post.slug}`,
      lastModified: new Date(post.createdDate),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  return [...defaultSiteMaps, ...sitemapFromPosts];
}
