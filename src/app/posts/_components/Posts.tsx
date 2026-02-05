import PostCard from "@/app/posts/_components/PostCard";
import { notFound } from "next/navigation";
import { getPostMetaData } from "@/utils/tagUtil";

interface PostsProps {
  tag?: string;
  posts: ReturnType<typeof getPostMetaData>;
}

function Posts({ tag, posts }: PostsProps) {
  const filteredPosts = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  if (sortedPosts.length === 0) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-2">
        {/* Most Recent Post - Large Layout */}
        <PostCard post={sortedPosts[0]} size="large" />

        {/* Following 2 Posts - Medium/Grid Layout */}
        {sortedPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            {sortedPosts.slice(1, 3).map((post) => (
              <PostCard key={post.slug} post={post} size="medium" />
            ))}
          </div>
        )}

        {/* Rest of the Posts - Standard Grid Layout */}
        {sortedPosts.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {sortedPosts.slice(3).map((post) => (
              <PostCard key={post.slug} post={post} size="small" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
