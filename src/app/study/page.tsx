import { getMetaData } from "@/utils/getMetaData";
import { getStudyPostMetaData } from "@/utils/tagUtil";
import getImagePath from "@/utils/getImagePath";
import { STUDY_PATH, STUDY_TAG } from "@/constant/STUDY";
import StudyPosts from "./_components/StudyPosts";

export async function generateMetadata() {
  return getMetaData({
    title: STUDY_TAG,
    description: "관심 있게 공부한 주제를 순서대로 모아 둔 기록",
    asPath: STUDY_PATH,
    ogImage: getImagePath(STUDY_TAG, STUDY_TAG, "", undefined, { variant: "collection" }),
  });
}

export default function StudyPage() {
  const posts = getStudyPostMetaData();

  return (
    <section className="home-page">
      <header className="study-hero">
        <p className="home-eyebrow">Study</p>
        <h1>공부한 것들을 모아 두는 곳</h1>
        <p className="home-intro">
          작업하면서 알게 된 내용이 아니라, 관심이 생겨서 따로 공부한 주제를 순서대로 정리한다.
        </p>
      </header>
      <StudyPosts posts={posts} />
    </section>
  );
}
