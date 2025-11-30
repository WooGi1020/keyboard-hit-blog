import { posts } from "#site/content"; // ✅ Velite 데이터
import { notFound } from "next/navigation";
import { getMetaData } from "@/utils/getMetaData";
import PostMeta from "@/app/posts/[tag]/[slug]/_components/PostMeta";
import PostContent from "@/app/posts/[tag]/[slug]/_components/PostContent";
import Giscus from "@/components/giscus/Giscus";
import LottieMonitor from "@/components/animation/lottieMonitor";
import dayjs from "dayjs";

interface Params {
  tag: string;
  slug: string;
}

type Props = {
  params: Promise<Params>;
};

// 1. 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const { tag, slug } = await params;

  // Velite 데이터는 메모리에 로드되므로 동기적으로 검색
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
    ogImage: `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(tag)}&date=${formattedDate.format("YYYY-MM-DD")}&v=3`,
  });
}

// 2. 정적 경로 생성 (SSG)
export async function generateStaticParams() {
  // 모든 태그-슬러그 조합에 대해 정적 페이지 생성
  return posts.flatMap((post) =>
    post.tags.map((tag) => ({
      tag: tag,
      slug: post.slug,
    }))
  );
}

// 3. 페이지 컴포넌트
async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const { tag, slug } = resolvedParams;

  const post = posts.find((p) => p.slug === slug && p.tags.includes(tag));
  const formattedDate = dayjs(post!.date);

  if (!post) return notFound();

  const imagePath = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(tag)}&date=${formattedDate.format("YYYY-MM-DD")}`;

  return (
    <section className="flex flex-col gap-6 w-full max-w-[900px] mx-auto">
      <div className="min-h-20 mx-auto max-sm:-mb-4">
        <LottieMonitor className="lottie-animation mx-auto relative bottom-5" />
      </div>

      {/* PostMeta는 tag, slug를 직접 받도록 설계되었습니다 (이전 대화 기반) */}
      <PostMeta tag={tag} slug={slug} />

      <div className="border dark:border-gray-500 border-gray-400 -mt-5" />

      {/* ✅ 수정 핵심: PostContent 인터페이스에 맞춰 'code'로 전달 */}
      <PostContent code={post.code} imagePath={imagePath} />

      <Giscus />
    </section>
  );
}

export default PostPage;
