import { posts } from "#site/content";
import { getFormattedDate } from "@/utils/getDate";
import { Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

interface PostMetaProps {
  tag: string;
  slug: string;
}

function PostMeta({ tag, slug }: PostMetaProps) {
  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));

  if (!post) return notFound();

  const formattedCreatedDate = getFormattedDate(post.createdDate, "YYYY년 MM월 DD일");

  const formattedUpdatedDate = post.updatedDate
    ? getFormattedDate(post.updatedDate, "YYYY년 MM월 DD일")
    : null;

  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full mb-6">
        <p className="text-md text-chart-1 mb-2 text-center">{tag}</p>
        <h1 className="text-4xl font-bold text-chart-2 mb-4 text-center max-sm:text-3xl break-keep">
          {post.title}
        </h1>
        <p className="text-lg text-black dark:text-white text-center max-sm:text-[16px] break-keep">
          {post.description}
        </p>
      </div>
      <div className="flex max-w-[700px] mx-auto w-full justify-between items-center text-gray-600 text-sm">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 dark:text-gray-400" />
            <span className="dark:text-gray-400">{formattedCreatedDate}</span>
          </div>

          {post.updatedDate && (
            <div className="flex items-center gap-2 text-chart-1">
              <Calendar className="size-4" />
              <span>{formattedUpdatedDate} 수정</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 dark:text-gray-400" />
          <span className="dark:text-gray-400">
            {/* ✅ Config의 transform에서 계산된 값 사용 */}
            Reading Time : {post.readingTime ?? 1}분
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostMeta;
