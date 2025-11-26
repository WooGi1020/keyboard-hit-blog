import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import dayjs from "dayjs";
import { Post } from "#site/content";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const formattedDate = dayjs(post.date);

  // ✅ 안전 장치: 태그가 없을 경우를 대비해 기본값 설정
  // 태그가 아예 없는 경우 URL이 /posts/undefined/slug가 되는 것을 방지
  const mainTag = post.tags && post.tags.length > 0 ? post.tags[0] : "etc";
  const cleanedTag = mainTag.replace(/\./g, "");

  const postUrl = `/posts/${mainTag}/${post.slug}`;

  // ✅ 이미지 경로: 썸네일 폴더 구조가 태그명과 100% 일치해야 함을 가정
  // 공백이 포함된 태그일 경우 인코딩 문제 소지가 있으므로 파일명은 영어/소문자 권장
  const imagePath = `/images/thumbnails/${cleanedTag}/${post.slug}.jpg`;

  return (
    <Link
      href={postUrl}
      className="card hover:hover-card border-2 border-input w-[450px] h-[450px] rounded-xl post group"
    >
      <div className="w-full h-[250px] relative overflow-hidden rounded-t-xl">
        <Image
          src={imagePath}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 450px"
          // ✅ 이미지 로딩 실패 시 UI가 깨지는 것을 방지하거나 object-cover 유지
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4 h-[200px]">
        <span className="text-chart-1 text-sm font-medium">{mainTag}</span>

        <h2 className="text-xl font-semibold line-clamp-2 leading-tight">{post.title}</h2>

        <p className="text-sm dark:text-gray-400 text-gray-500 line-clamp-2">{post.description}</p>

        <div className="mt-auto flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex gap-1.5 items-center">
            <Calendar className="size-3.5" />
            <span>{formattedDate.format("YYYY년 MM월 DD일")}</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <Clock className="size-3.5" />
            {/* Velite config에서 readingTime을 계산하지 않았을 경우 0 대신 1분으로 표시 */}
            <span>{post.readingTime || 1}분</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
