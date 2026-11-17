import type { Post } from "#site/content";
import { posts } from "#site/content";
import { isStudyPost } from "@/constant/STUDY";

type PostMetaData = Omit<Post, "code">;

// 홈과 태그 탭이 쓰는 글. 스터디 글은 /study 에서 따로 보여주므로 뺀다.
const feedPosts = posts.filter((post) => !isStudyPost(post));

export function getTagData() {
  const allTagCount = feedPosts.length;
  const tagCountMap: Record<string, number> = {};

  feedPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
    });
  });

  const tagInfos = Object.entries(tagCountMap).map(([tag, count]) => ({
    tag,
    count,
  }));

  return { tagInfos, allTagCount };
}

export function getPostMetaData(): PostMetaData[] {
  return feedPosts.map(({ code: _code, ...meta }) => meta);
}

// 스터디 글은 시리즈로 읽히도록 먼저 쓴 글부터 돌려준다.
export function getStudyPostMetaData(): PostMetaData[] {
  return posts
    .filter(isStudyPost)
    .map(({ code: _code, ...meta }) => meta)
    .sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
}
