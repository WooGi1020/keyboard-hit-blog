import PostCard from "@/app/posts/_components/PostCard";
import type { getStudyPostMetaData } from "@/utils/tagUtil";

interface StudyPostsProps {
  posts: ReturnType<typeof getStudyPostMetaData>;
}

function StudyPosts({ posts }: StudyPostsProps) {
  return (
    <section className="home-posts" aria-labelledby="study-posts-title">
      <div className="home-posts-heading">
        <h2 id="study-posts-title">공부 기록</h2>
        <span>{posts.length}편</span>
      </div>
      {posts.length ? (
        <div className="home-post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="study-empty">아직 정리한 글이 없습니다.</p>
      )}
    </section>
  );
}
export default StudyPosts;
