import { posts } from "#site/content";
import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/lib/getMetaData";
import LottieKeyboard from "@/components/animation/lottieKeyboard";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

function getTagData() {
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
    title: decodedTag === "all" ? "전체 포스트" : decodedTag,
    description: `Post 목록 - ${decodedTag}`,
    asPath: `/posts/${tag}`,
    ogImage: `/images/opgraph/op-image.png`,
  });
}

async function PostsPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const { tagInfos, allTagCount } = getTagData();

  const isAll = decodedTag === "all";
  const isValidTag = tagInfos.some((t) => t.tag === decodedTag);

  if (!isAll && !isValidTag) {
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
