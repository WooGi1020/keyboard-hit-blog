import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getTagData } from "@/utils/tagUtil";
import { getPostMetaData } from "@/utils/tagUtil";
import MainHeader from "../_components/MainHeader";
import getImagePath from "@/utils/getImagePath";

// 방문 통계를 5분마다 다시 읽는다 (예전 fetch의 next.revalidate와 같은 주기).
export const revalidate = 300;

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const postMetaData = getPostMetaData();
  const tags = new Set(postMetaData.flatMap((post) => post.tags));

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return getMetaData({
    title: decodedTag,
    description: `Post 목록 - ${decodedTag}`,
    asPath: `/posts/${tag}`,
    ogImage: getImagePath(decodedTag, decodedTag, "", undefined, { variant: "collection" }),
  });
}

async function PostsPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const { tagInfos, allTagCount } = getTagData();
  const postMetaData: ReturnType<typeof getPostMetaData> = getPostMetaData();

  return (
    <section className="home-page">
      <MainHeader />
      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts tag={decodedTag} posts={postMetaData} />
    </section>
  );
}

export default PostsPage;
