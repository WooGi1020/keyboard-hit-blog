import { LazyVisitStatistics } from "@/components/lazy/LazyWrapper";

export default function MainHeader() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 mb-12">
      {/* 타이틀과 배경 통계 데이터가 겹치는 영역 */}
      <div className="relative pt-8 pb-12 sm:pt-12 sm:pb-20">
        <LazyVisitStatistics />

        <div className="relative z-10 pointer-events-none">
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter text-foreground mb-6 uppercase mix-blend-plus-lighter dark:mix-blend-lighten">
            keyboard hit!
          </h1>
          <p className="text-muted-foreground text-base sm:text-xl font-medium max-w-[700px] leading-relaxed break-keep">
            새로이 알게된 내용과 관심있는 주제들을 위해 키보드를 두들기는 공간
          </p>
        </div>
      </div>
    </div>
  );
}
