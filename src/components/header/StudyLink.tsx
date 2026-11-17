import Link from "next/link";
import { STUDY_PATH, STUDY_TAG } from "@/constant/STUDY";

export default function StudyLink({ pathname }: { pathname: string }) {
  // 스터디 글 상세(/posts/Study/...)를 읽는 동안에도 탭을 켜 둔다.
  const isActive = pathname === STUDY_PATH || pathname.startsWith(`/posts/${STUDY_TAG}/`);
  return (
    <Link
      href={STUDY_PATH}
      className="site-about-link"
      aria-current={isActive ? "page" : undefined}
    >
      <span>Study</span>
    </Link>
  );
}
