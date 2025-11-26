import { posts } from "#site/content";
import { TagNav } from "@/app/posts/[tag]/(tagNav)/TagNav";
import Posts from "@/app/posts/_components/Posts";
import { getMetaData } from "@/lib/getMetaData";
import LottieKeyboard from "@/components/animation/lottieKeyboard";
import { notFound } from "next/navigation"; // notFound import 확인

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

// ✅ 수정 1: 'all' 경로 추가 및 태그 인코딩 처리
export async function generateStaticParams() {
  const tags = new Set(posts.flatMap((post) => post.tags));

  const paths = Array.from(tags).map((tag) => ({
    tag: tag, // 필요하다면 여기서 tag.toLowerCase() 등을 고려해야 함
  }));

  // ✨ 중요: 'all' 경로는 실제 데이터에 없으므로 수동으로 추가해야 함
  paths.push({ tag: "all" });

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  // 한글 태그일 경우 깨짐 방지를 위해 decodeURIComponent 권장
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
  const decodedTag = decodeURIComponent(tag); // ✅ URL 인코딩 해제 (한글 태그 대비)

  // 메모리 데이터 계산
  const { tagInfos, allTagCount } = getTagData();

  // ✅ 유효성 검사: 'all'도 아니고, 실제 태그 목록에도 없다면 404
  // (generateStaticParams에 있더라도 런타임 방어 로직)
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

      {/* Posts 컴포넌트에 넘길 때 인코딩된 tag를 넘길지, 디코딩된걸 넘길지 결정 필요.
          보통 데이터 비교를 위해 decodedTag를 넘기는 게 안전함 */}
      <Posts tag={decodedTag} />
    </>
  );
}

export default PostsPage;
