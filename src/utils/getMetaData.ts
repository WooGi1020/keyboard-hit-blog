import META_DATA from "@/constant/META_DATA";
import type { Metadata } from "next";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export const getMetaData = (metadataProps?: GenerateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | 키보드 두들기며 먹고살기` : META_DATA.title || "";
  const DESCRIPTION = description || META_DATA.description || "";

  const PAGE_URL = asPath ? (asPath.startsWith("/") ? asPath : `/${asPath}`) : "";
  const OG_IMAGE = ogImage || META_DATA.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META_DATA.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META_DATA.keyword],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: "키보드 두들기며 먹고살기",
      locale: "ko_KR",
      type: title ? "article" : "website",
      url: PAGE_URL,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [OG_IMAGE],
    },
    icons: {
      icon: "/favicon/favicon.ico",
    },
  };

  return metadata;
};
