import { posts } from "#site/content"; // ✅ Velite 데이터
import { notFound } from "next/navigation";
import { getMetaData } from "@/utils/getMetaData";
import PostMeta from "@/app/posts/[tag]/[slug]/_components/PostMeta";
import PostContent from "@/app/posts/[tag]/[slug]/_components/PostContent";
import Giscus from "@/components/giscus/Giscus";
import LottieMonitor from "@/components/animation/lottieMonitor";
import dayjs from "dayjs";
import getImagePath from "@/utils/getImagePath";

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
  const formattedDate = dayjs(post!.date);

  if (!post) {
    return getMetaData({
      title: "Page Not Found",
      description: "요청하신 포스트를 찾을 수 없습니다.",
      asPath: `/posts/${tag}/${slug}`,
    });
  }

  return getMetaData({
    title: post.title,
    description: post.description!,
    asPath: `/posts/${tag}/${slug}`,
    ogImage: getImagePath(post.title, tag, formattedDate),
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
  const formattedDate = dayjs(post!.date);

  if (!post) return notFound();

  const imagePath = getImagePath(post.title, tag, formattedDate);

  return (
    <section className="flex flex-col gap-6 w-full max-w-[800px] mx-auto">
      <div className="min-h-20 mx-auto max-sm:-mb-4">
        <LottieMonitor className="lottie-animation mx-auto relative bottom-5" />
      </div>
      <PostMeta tag={tag} slug={slug} />
      <div className="border dark:border-gray-500 border-gray-400 -mt-5" />
      <PostContent code={post.code} imagePath={imagePath} />
      <Giscus />
    </section>
  );
}

export default PostPage;
