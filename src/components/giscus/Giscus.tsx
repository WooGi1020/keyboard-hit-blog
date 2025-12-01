"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const theme = resolvedTheme === "dark" ? "dark_high_contrast" : "light_high_contrast";
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "WooGi1020/keyboard-hit-blog");
    scriptElem.setAttribute("data-repo-id", repoId!);
    scriptElem.setAttribute("data-category", "Comment");
    scriptElem.setAttribute("data-category-id", categoryId!);
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
  }, [mounted, theme, repoId, categoryId]);

  useEffect(() => {
    if (!mounted) return;
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
  }, [theme, mounted]);

  return <section ref={ref} id="giscus-comment-box" style={{ minHeight: "300px" }} />;
}
