"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function PostThumbnail({ imagePath }: { imagePath: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-21/9 mb-10 overflow-hidden bg-transparent flex items-center justify-center">
      {isLoading && <div className="size-10 rounded-full border-t-2 border-chart-1 animate-spin" />}

      <Image
        src={imagePath}
        alt="포스트 썸네일 이미지"
        layout="fill"
        unoptimized
        priority
        fetchPriority="high"
        objectFit="contain"
        onLoadingComplete={() => setIsLoading(false)}
        className={cn(
          "transition-all duration-500",
          isLoading ? "opacity-0 blur-sm" : "opacity-100 blur-0"
        )}
      />
    </div>
  );
}
