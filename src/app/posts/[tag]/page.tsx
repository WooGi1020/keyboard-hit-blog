import { posts } from "#site/content";
import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import LottieKeyboard from "@/components/animation/lottieKeyboard";
import { notFound } from "next/navigation";
import { getTagData } from "@/utils/tagUtil";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = new Set(posts.flatMap((post) => post.tags));

  const paths = Array.from(tags).map((tag) => ({
    tag: tag,
  }));

  paths.push({ tag: "all" });

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return getMetaData({
    title: decodedTag,
    description: `Post 목록 - ${decodedTag}`,
    asPath: `/posts/${tag}`,
    ogImage: `/images/opgraph/op-image.png`,
  });
}

async function PostsPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const { tagInfos, allTagCount } = getTagData();

  const isValidTag = tagInfos.some((t) => t.tag === decodedTag);

  if (!isValidTag) {
    return notFound();
  }

  return (
    <>
      <div className="min-h-20 mx-auto">
        <LottieKeyboard className="lottie-animation relative bottom-8" />
      </div>

      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts tag={decodedTag} />
    </>
  );
}

export default PostsPage;
