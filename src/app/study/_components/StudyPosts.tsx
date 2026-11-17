import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFormattedDate } from "@/utils/getDate";
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
        <ol className="study-list">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.tags[0]}/${post.slug}`} className="study-item">
                <span className="study-item-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="study-item-copy">
                  <h3>{post.title}</h3>
                  {post.description && <p>{post.description}</p>}
                  <div className="study-item-meta">
                    <time dateTime={new Date(post.createdDate).toISOString()}>
                      {getFormattedDate(post.updatedDate || post.createdDate, "YYYY.MM.DD")}
                      {post.updatedDate ? " 수정" : ""}
                    </time>
                    <span>읽는 시간 {post.readingTime || 1}분</span>
                  </div>
                </div>
                <ArrowUpRight className="study-item-arrow" size={17} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="study-empty">아직 정리한 글이 없습니다.</p>
      )}
    </section>
  );
}
export default StudyPosts;
