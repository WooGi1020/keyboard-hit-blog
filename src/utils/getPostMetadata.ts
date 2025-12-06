import { posts } from "#site/content";
import { Post } from "#site/content";

type PostMetaData = Omit<Post, "code">;

export function getPostMetaData(): PostMetaData[] {
  return posts.map(({ code, ...meta }) => meta);
}
