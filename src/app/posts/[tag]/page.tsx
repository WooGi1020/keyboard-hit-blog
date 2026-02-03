import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getTagData } from "@/utils/tagUtil";
import { getPostMetaData } from "@/utils/tagUtil";
import MainHeader from "../_components/MainHeader";

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
  const postMetaData: ReturnType<typeof getPostMetaData> = getPostMetaData();

  return (
    <section className="flex flex-col w-full pb-20 pt-16 sm:pt-24">
      <MainHeader />
      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts tag={decodedTag} posts={postMetaData} />
    </section>
  );
}

export default PostsPage;
