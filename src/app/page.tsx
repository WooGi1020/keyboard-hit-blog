import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getPostMetaData } from "@/utils/tagUtil";
import { getTagData } from "@/utils/tagUtil";
import MainHeader from "./posts/_components/MainHeader";

export async function generateMetadata() {
  return getMetaData({
    description: "개발 블로그 메인 페이지",
    asPath: "/",
    ogImage: "/images/opgraph/op-image.png",
  });
}

export default function Home() {
  const { tagInfos, allTagCount } = getTagData();
  const postMetaData: ReturnType<typeof getPostMetaData> = getPostMetaData();

  return (
    <section className="flex flex-col w-full pb-20 pt-16 sm:pt-24">
      <MainHeader />
      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts posts={postMetaData} />
    </section>
  );
}
