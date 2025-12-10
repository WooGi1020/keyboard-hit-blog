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

  const formattedDate = getFormattedDate(
    post.updatedDate ? post.updatedDate : post.createdDate,
    "YYYY년 MM월 DD일"
  );

  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full mb-6">
        <p className="text-md text-chart-1 mb-2 text-center">{tag}</p>
        <h1 className="text-4xl font-bold text-chart-2 mb-4 text-center max-sm:text-3xl">
          {post.title}
        </h1>
        <p className="text-lg text-black dark:text-white text-center max-sm:text-[16px]">
          {post.description}
        </p>
      </div>
      <div className="flex max-w-[700px] mx-auto w-full justify-between items-center text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 dark:text-gray-400" />
          <span className="dark:text-gray-400">
            {post.updatedDate ? formattedDate + "에 수정됨" : formattedDate}
          </span>
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
