import { posts } from "#site/content";
import { getMetaData } from "@/utils/getMetaData";
import PostMeta from "@/app/posts/[tag]/[slug]/_components/PostMeta";
import PostContent from "@/app/posts/[tag]/[slug]/_components/PostContent";
import getImagePath from "@/utils/getImagePath";

import { LazyLoadGiscus } from "@/components/lazy/LazyWrapper";
import { getFormattedDate } from "@/utils/getDate";
import { STUDY_TAG } from "@/constant/STUDY";

interface Params {
  tag: string;
  slug: string;
}

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props) {
  const { tag, slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));
  const formattedDate = getFormattedDate(post ? post.createdDate : "", "YYYY-MM-DD");

  if (!post) {
    return getMetaData({
      title: "Page Not Found",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    });
  }

  return getMetaData({
    title: post.title,
    description: post.description!,
    asPath: `/posts/${tag}/${slug}`,
    // 스터디 글은 글마다 이미지를 만들지 않고 블로그 기본 공유 이미지를 쓴다.
    ogImage:
      tag === STUDY_TAG
        ? undefined
        : getImagePath(
            post.title,
            tag,
            formattedDate,
            post.updatedDate ? getFormattedDate(post.updatedDate, "YYYY-MM-DD") : undefined
          ),
  });
}

export async function generateStaticParams() {
  return posts.flatMap((post) =>
    post.tags.map((tag) => ({
      tag: tag,
      slug: post.slug,
    }))
  );
}

async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const { tag, slug } = resolvedParams;

  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));

  if (!post) return null;

  return (
    <section className="post-page">
      <PostMeta tag={tag} slug={slug} />
      <PostContent key={post.slug} code={post.code} />
      <section id="post-comments" className="post-comments" aria-label="댓글" tabIndex={-1}>
        <LazyLoadGiscus />
      </section>
    </section>
  );
}

export default PostPage;
