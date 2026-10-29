import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getPostMetaData } from "@/utils/tagUtil";
import { getTagData } from "@/utils/tagUtil";
import MainHeader from "./posts/_components/MainHeader";
import getImagePath from "@/utils/getImagePath";

// 방문 통계를 5분마다 다시 읽는다 (예전 fetch의 next.revalidate와 같은 주기).
export const revalidate = 300;

export async function generateMetadata() {
  return getMetaData({
    description: "개발 블로그 메인 페이지",
    asPath: "/",
    ogImage: getImagePath("keyboard hit!", "Blog", "", undefined, { variant: "home" }),
  });
}

export default function Home() {
  const { tagInfos, allTagCount } = getTagData();
  const postMetaData: ReturnType<typeof getPostMetaData> = getPostMetaData();

  return (
    <section className="home-page">
      <MainHeader />
      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts posts={postMetaData} />
    </section>
  );
}
