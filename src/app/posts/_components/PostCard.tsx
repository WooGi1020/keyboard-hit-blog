"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import getImagePath from "@/utils/getImagePath";
import { getPostThumbnailLabel } from "@/constant/POST_THUMBNAILS";
import { useState } from "react";
import { useTheme } from "next-themes";
import useHydrated from "@/hooks/useHydrated";
import type { getPostMetaData } from "@/utils/tagUtil";
import { getFormattedDate } from "@/utils/getDate";
import { cn } from "@/lib/utils";

type PostMetaData = ReturnType<typeof getPostMetaData>[number];
interface PostCardProps {
  post: PostMetaData;
  size?: "large" | "medium" | "small";
}

function PostCard({ post, size = "small" }: PostCardProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const mainTag = post.tags[0] || "etc";
  const isFeatured = size === "large";
  const date = getFormattedDate(post.updatedDate || post.createdDate, "YYYY.MM.DD");
  const imagePath = getImagePath(
    isFeatured ? post.title : getPostThumbnailLabel(post.slug, mainTag),
    mainTag,
    getFormattedDate(post.createdDate, "YYYY-MM-DD"),
    post.updatedDate ? getFormattedDate(post.updatedDate, "YYYY-MM-DD") : undefined,
    {
      theme: resolvedTheme === "dark" ? "dark" : "light",
      variant: isFeatured ? "post" : "thumbnail",
    }
  );
  return (
    <Link
      href={`/posts/${mainTag}/${post.slug}`}
      className={cn("home-post-card", isFeatured && "is-featured")}
    >
      <div className="home-post-image" aria-hidden="true">
        <div className="home-post-image-fallback">
          <span>{mainTag}</span>
          <span>keyboard hit!</span>
        </div>
        {hydrated && failedImage !== imagePath && (
          <Image
            src={imagePath}
            alt=""
            fill
            preload={isFeatured}
            sizes={
              isFeatured
                ? "(max-width: 767px) 100vw, 480px"
                : "(min-width: 1200px) 360px, (min-width: 640px) 50vw, 100vw"
            }
            unoptimized
            className="home-post-thumbnail"
            onError={() => setFailedImage(imagePath)}
          />
        )}
      </div>
      <div className="home-post-copy">
        <div className="home-post-kicker">
          <span className="home-post-tag">{mainTag}</span>
          {isFeatured && <span className="home-post-latest">최근 글</span>}
        </div>
        <h3>{post.title}</h3>
        {isFeatured && post.description && (
          <p className="home-post-description">{post.description}</p>
        )}
        <div className="home-post-meta">
          <span>
            {date}
            {post.updatedDate ? " 수정" : ""}
          </span>
          {isFeatured && <span>읽는 시간 {post.readingTime || 1}분</span>}
          <ArrowUpRight size={17} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
export default PostCard;
