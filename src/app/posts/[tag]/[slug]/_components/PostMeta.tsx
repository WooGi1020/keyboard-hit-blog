import { posts } from "#site/content"; // .velite에서 생성된 데이터
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

interface PostMetaProps {
  tag: string;
  slug: string;
}

function PostMeta({ tag, slug }: PostMetaProps) {
  // ✅ Velite 데이터 검색
  // tag가 배열(tags)에 포함되어 있고 slug가 일치하는지 확인
  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));

  if (!post) return notFound();

  const formattedDate = dayjs(post.date);

  return (
    <div className="max-w-[800px] w-full mx-auto p-4">
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
          <span className="dark:text-gray-400">{formattedDate.format("YYYY년 MM월 DD일")}</span>
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
