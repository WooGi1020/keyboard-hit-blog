import { Post, posts } from "#site/content";

type PostMetaData = Omit<Post, "code">;

export function getTagData() {
  const allTagCount = posts.length;
  const tagCountMap: Record<string, number> = {};

  posts.forEach((post) => {
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
  return posts.map(({ code, ...meta }) => meta);
}
