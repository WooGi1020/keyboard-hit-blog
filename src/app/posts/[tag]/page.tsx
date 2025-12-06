import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getTagData } from "@/utils/tagUtil";
import { getPostMetaData } from "@/utils/getPostMetadata";

import { LazyLoadLottieKeyboard } from "@/components/lazy/LazyWrapper";

type Props = {
  params: { tag: string };
};

export async function generateStaticParams() {
  const postMetaData = getPostMetaData();
  const tags = new Set(postMetaData.flatMap((post) => post.tags));

  const paths = Array.from(tags).map((tag) => ({
    tag: tag,
  }));

  paths.push({ tag: "all" });

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { tag } = params;
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
  console.log(decodedTag);

  const { tagInfos, allTagCount } = getTagData();
  const postMetaData: ReturnType<typeof getPostMetaData> = getPostMetaData(); // 가벼운 데이터 로드

  const isValidTag = decodedTag === "all" || tagInfos.some((t) => t.tag === decodedTag);

  return (
    <>
      <div className="min-h-20 mx-auto">
        <LazyLoadLottieKeyboard />
      </div>
      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts tag={decodedTag} posts={postMetaData} /> {/* 데이터를 prop으로 주입 */}
    </>
  );
}

export default PostsPage;
