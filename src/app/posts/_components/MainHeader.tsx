import VisitorStats from "@/components/stat/VisitStats";
import { Suspense } from "react";
import StatsSkeleton from "./StatsSkeleton";

async function getVisitStats() {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/stats`, {
    method: "GET",
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch stats");

  return res.json();
}

export default function MainHeader() {
  const visitCountPromise = getVisitStats();

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
