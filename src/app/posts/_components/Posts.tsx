import PostCard from "@/app/posts/_components/PostCard";
import { notFound } from "next/navigation";
import { getPostMetaData } from "@/utils/getPostMetadata";

interface PostsProps {
  tag?: string;
  posts: ReturnType<typeof getPostMetaData>; // Prop으로 데이터 받기
}

function Posts({ tag, posts }: PostsProps) {
  let filteredPosts = posts; // prop으로 받은 데이터 사용

  if (tag && tag !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(tag));
  }

  filteredPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
