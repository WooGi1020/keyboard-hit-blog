"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import { Post } from "#site/content";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const formattedDate = dayjs(post.date);

  const mainTag = post.tags && post.tags.length > 0 ? post.tags[0] : "etc";
  const postUrl = `/posts/${mainTag}/${post.slug}`;
  const imagePath = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(mainTag)}&date=${formattedDate.format("YYYY-MM-DD")}&v=3`;

  return (
    <Link
      href={postUrl}
      className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden border border-input hover:-translate-y-1 hover:shadow-md hover:shadow-black/3 dark:hover:shadow-white/3 transition-transform duration-300"
    >
      <div
        className="
    relative w-full aspect-16/10 overflow-hidden bottom-4.5 flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-200 dark:from-slate-700 dark:to-slate-900
  "
      >
        <Image
          src={imagePath}
          alt={post.title}
          fill
          priority
          unoptimized
          className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 px-4 sm:px-5 md:px-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-md">
            {mainTag}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
            <Clock className="size-3 sm:size-3.5" />
            <span>{post.readingTime || 1} min</span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-foreground leading-snug tracking-tight mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {post.title}
        </h2>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center justify-between py-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground font-medium">
            <Calendar className="size-3 sm:size-3.5" />
            <span>{formattedDate.format("YYYY. MM. DD")}</span>
          </div>

          <div className="flex items-center text-[10px] sm:text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Read more <ArrowRight className="ml-1 size-3 sm:size-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
