import { getMetaData } from "@/utils/getMetaData";
import type { Metadata } from "next";

export const metadata: Metadata = getMetaData({
  title: "About Me",
  description: "블로그 및 프로젝트에 대한 소개 페이지",
  asPath: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <section className="max-w-[700px] mx-auto">{children}</section>;
}
