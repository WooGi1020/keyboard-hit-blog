import { Suspense } from "react";
import VisitorStats from "@/components/stat/VisitStats";
import { getCachedVisitStats } from "@/lib/stats";
import StatsSkeleton from "./StatsSkeleton";

export default function MainHeader() {
  // 서버 컴포넌트에서 저장소를 직접 읽는다. 자기 API를 다시 fetch하지 않으므로
  // 배포 URL 환경 변수나 로컬 포트에 의존하지 않는다. 5분 캐시(ISR 주기와 동일).
  const visitCountPromise = getCachedVisitStats();

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 mb-12 relative group">
      <Suspense fallback={<StatsSkeleton />}>
        <VisitorStats visitPromise={visitCountPromise} />
      </Suspense>
      <div className="relative pt-8 pb-12 sm:pt-12 sm:pb-20">
        <div className="relative z-10 pointer-events-none">
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter text-foreground mb-6 uppercase mix-blend-plus-lighter dark:mix-blend-lighten">
            keyboard hit!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-xl font-medium max-w-[700px] leading-relaxed break-keep">
            새로이 알게된 내용과 관심있는 주제들을 위해 키보드를 두들기는 공간
          </p>
        </div>
      </div>
    </div>
  );
}
