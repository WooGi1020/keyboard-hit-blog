import { Suspense } from "react";
import VisitorStats from "@/components/stat/VisitStats";
import { getCachedVisitStats } from "@/lib/stats";
import { LazyLoadLottieMonitor } from "@/components/lazy/LazyWrapper";
import StatsSkeleton from "./StatsSkeleton";

export default function MainHeader() {
  const visitCountPromise = getCachedVisitStats();
  return (
    <header className="home-hero">
      <div className="home-hero-copy">
        <p className="home-eyebrow">키보드 두들기며 먹고살기</p>
        <h1>
          keyboard <span>hit!</span>
        </h1>
        <p className="home-intro">새로 알게 된 내용과 관심 있는 주제를 기록하는 공간</p>
      </div>
      <div className="home-hero-visual" aria-hidden="true">
        <LazyLoadLottieMonitor />
      </div>
      <div className="home-hero-footer">
        <span className="home-hero-note">우기의 개발기록</span>
        <Suspense fallback={<StatsSkeleton />}>
          <VisitorStats visitPromise={visitCountPromise} />
        </Suspense>
      </div>
    </header>
  );
}
