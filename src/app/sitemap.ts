import { posts } from "#site/content"; // ✅ Velite 데이터 import
import type { MetadataRoute } from "next";

// 기본 사이트맵 설정
const defaultSiteMaps: MetadataRoute.Sitemap = [
  {
    url: "https://keyboard-hit-blog.vercel.app", // 실제 도메인으로 수정 권장
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: "https://keyboard-hit-blog.vercel.app/posts/all",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: "https://keyboard-hit-blog.vercel.app/about",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // ✅ Velite 데이터를 기반으로 동적 사이트맵 생성
  // 하나의 글이 여러 태그를 가질 수 있으므로 flatMap으로 모든 경로 조합 생성
  const sitemapFromPosts: MetadataRoute.Sitemap = posts.flatMap((post) =>
    post.tags.map((tag) => ({
      url: `https://keyboard-hit-blog.vercel.app/posts/${tag}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "daily" as const, // 타입 안전성 확보
      priority: 0.7,
    }))
  );

  return [...defaultSiteMaps, ...sitemapFromPosts];
}
