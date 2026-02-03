"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import getImagePath from "@/utils/getImagePath";
import { Activity, useState } from "react";
import { getPostMetaData } from "@/utils/tagUtil";
import { getFormattedDate } from "@/utils/getDate";
import { cn } from "@/lib/utils";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

type PostMetaData = ArrayElement<ReturnType<typeof getPostMetaData>>;

interface PostCardProps {
  post: PostMetaData;
  size?: "large" | "medium" | "small";
}

function PostCard({ post, size = "small" }: PostCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const formattedDate = getFormattedDate(
    post.updatedDate ? post.updatedDate : post.createdDate,
    "YYYY. MM. DD"
  );

  const mainTag = post.tags && post.tags.length > 0 ? post.tags[0] : "etc";
  const postUrl = `/posts/${mainTag}/${post.slug}`;
  const imagePath = getImagePath(post.title, mainTag, formattedDate);

  const isLarge = size === "large";

  return (
    <Link
      href={postUrl}
      className={cn(
        "group flex p-4 sm:p-6 hover:rounded-2xl hover:shadow-md hover:bg-accent/30 dark:hover:bg-accent-dark/90 dark:shadow-accent-dark/20 transition-all duration-100",
        isLarge
          ? "flex-col lg:flex-row gap-6 lg:gap-8 lg:items-stretch sm:mb-12 lg:mb-16 mb-0"
          : "flex-col h-full",
        "max-sm:py-5 max-sm:border-b max-sm:border-border/50 hover:border-transparent"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-r-xl lg:rounded-r-2xl border border-border/40 dark:border-[#0f172a] shrink-0",
          isLarge
            ? "w-full lg:w-[55%] aspect-video sm:aspect-[1.91/1]"
            : "w-full aspect-[1.91/1] mb-4 lg:mb-5",
          "max-sm:hidden" // Hide thumbnail on mobile as requested
        )}
      >
        <Activity mode={isLoading ? "visible" : "hidden"}>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950 z-10">
            <div className="size-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </div>
        </Activity>
        <Image
          src={imagePath}
          alt={post.title}
          fill
          priority={isLarge}
          sizes={isLarge ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className={cn("flex flex-col flex-1 w-full", isLarge && "lg:py-2")}>
        <div className="flex items-center gap-2 mb-3 lg:mb-4 justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">
              {mainTag}
            </span>
            <span className="text-[10px] text-muted-foreground/30 font-bold"> • </span>
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
              {post.readingTime || 1} min read
            </span>
          </div>
          <Activity mode={isLarge ? "visible" : "hidden"}>
            <div className="animate-pulse">
              <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                New!
              </p>
            </div>
          </Activity>
        </div>

        <h2
          className={cn(
            "font-black text-foreground leading-[1.3] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-keep",
            isLarge
              ? "text-2xl sm:text-4xl lg:text-4xl mb-4 lg:mb-6"
              : "text-lg sm:text-xl mb-2 lg:mb-3"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "text-muted-foreground leading-relaxed break-keep line-clamp-2",
            isLarge ? "text-base lg:text-lg mb-6 lg:mb-8" : "text-[13px] sm:text-sm mb-4 lg:mb-6",
            "max-sm:hidden" // Hide description on mobile for lower height list feel
          )}
        >
          {post.description}
        </p>

        <div className="flex items-center mt-auto pt-3 lg:pt-4 border-t border-border/40 max-sm:border-none max-sm:pt-0">
          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground/60 tracking-tight uppercase">
            {formattedDate}
          </span>
          <div className="ml-auto flex items-center text-[10px] font-black text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 max-sm:hidden">
            Read More! <ArrowRight className="ml-1.5 size-3 stroke-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
