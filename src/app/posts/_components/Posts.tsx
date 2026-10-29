import PostCard from "./PostCard";
import { notFound } from "next/navigation";
import type { getPostMetaData } from "@/utils/tagUtil";

interface PostsProps {
  tag?: string;
  posts: ReturnType<typeof getPostMetaData>;
}

function Posts({ tag, posts }: PostsProps) {
  const sortedPosts = posts
    .filter((post) => !tag || post.tags.includes(tag))
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  if (!sortedPosts.length) notFound();
  return (
    <section className="home-posts" aria-labelledby="home-posts-title">
      <div className="home-posts-heading">
        <h2 id="home-posts-title">{tag ? `${tag} 글` : "최근 글"}</h2>
        <span>{sortedPosts.length}편</span>
      </div>
      <PostCard post={sortedPosts[0]} size="large" />
      {sortedPosts.length > 1 && (
        <div className="home-post-grid">
          {sortedPosts.slice(1).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
export default Posts;
