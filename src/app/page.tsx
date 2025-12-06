import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/utils/getMetaData";
import { getPostMetaData } from "@/utils/getPostMetadata";
import { getTagData } from "@/utils/tagUtil";

import { LazyLoadLottieKeyboard } from "@/components/lazy/LazyWrapper";

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
    <>
      <div className="mx-auto">
        <LazyLoadLottieKeyboard />
      </div>

      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts tag="all" posts={postMetaData} />
    </>
  );
}
