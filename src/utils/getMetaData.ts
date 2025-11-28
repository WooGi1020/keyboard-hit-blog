import META_DATA from "@/constant/META_DATA";
import type { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  asPath: string;
  ogImage?: string;
}

export const getMetaData = (metadataProps?: GenerateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | 키보드 두들기며 먹고살기` : META_DATA.title;
  const DESCRIPTION = description || META_DATA.description;
  const PAGE_URL = asPath || "";
  const OG_IMAGE = ogImage || META_DATA.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META_DATA.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    icons: {
      icon: "/favicon/favicon.ico",
    },
    description: DESCRIPTION,
    keywords: [...META_DATA.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
