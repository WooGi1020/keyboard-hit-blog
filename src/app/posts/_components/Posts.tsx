import { posts } from "#site/content";
import PostCard from "@/app/posts/_components/PostCard";
import { notFound } from "next/navigation";

interface PostsProps {
  tag?: string;
}

function Posts({ tag }: PostsProps) {
  // 1. 태그 필터링
  // posts를 직접 할당하지 않고 로직 시작

  console.log(`[DEBUG] Tag: ${tag}, Total Posts: ${posts.length}`);
  let filteredPosts = posts;

  if (tag && tag !== "all") {
    // filter는 새로운 배열을 반환하므로 안전함
    filteredPosts = posts.filter((post) => post.tags.includes(tag));
  }

  // 2. 최신순 정렬 (수정됨)
  // filter를 거치지 않은 경우(all)에는 원본 posts를 참조하고 있으므로
  // sort()가 원본을 건드리지 않도록 [...filteredPosts]로 얕은 복사 후 정렬해야 함
  filteredPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-[950px] w-full mx-auto">
      <div className="flex flex-wrap gap-10 justify-between w-full max-lg:justify-center">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
