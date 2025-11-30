import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import LottieKeyboard from "@/components/animation/lottieKeyboard";
import { getMetaData } from "@/utils/getMetaData";
import { getTagData } from "@/utils/tagUtil";

export async function generateMetadata() {
  return getMetaData({
    description: "개발 블로그 메인 페이지",
    asPath: "/",
    ogImage: "/images/opgraph/op-image.png",
  });
}

export default function Home() {
  const { tagInfos, allTagCount } = getTagData();

  return (
    <>
      <div className="mx-auto">
        <LottieKeyboard className="lottie-animation relative bottom-8" />
      </div>

      <TagNav tagInfos={tagInfos} allTagCount={allTagCount} />
      <Posts />
    </>
  );
}
