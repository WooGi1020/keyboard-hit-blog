import { posts } from "#site/content";
import { getFormattedDate } from "@/utils/getDate";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LazyLoadLottieMonitor } from "@/components/lazy/LazyWrapper";

interface PostMetaProps {
  tag: string;
  slug: string;
}

function PostMeta({ tag, slug }: PostMetaProps) {
  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));
  if (!post) return notFound();
  return (
    <header className="post-header">
      <div className="post-heading-top">
        <Link href={`/posts/${tag}`} className="post-category">
          {tag}
        </Link>
        <div className="post-heading-visual" aria-hidden="true">
          <LazyLoadLottieMonitor />
        </div>
      </div>
      <h1>{post.title}</h1>
      {post.description && <p className="post-description">{post.description}</p>}
      <div className="post-meta">
        <time dateTime={new Date(post.createdDate).toISOString()}>
          {getFormattedDate(post.createdDate, "YYYY.MM.DD")}
        </time>
        {post.updatedDate && (
          <span>
            <time dateTime={new Date(post.updatedDate).toISOString()}>
              {getFormattedDate(post.updatedDate, "YYYY.MM.DD")}
            </time>{" "}
            수정
          </span>
        )}
        <span>읽는 시간 {post.readingTime ?? 1}분</span>
      </div>
    </header>
  );
}

export default PostMeta;
