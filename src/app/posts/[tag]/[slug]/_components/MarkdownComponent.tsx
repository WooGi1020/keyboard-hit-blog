import CustomPre from "@/app/posts/[tag]/[slug]/_components/CustomPre";
import dynamic from "next/dynamic";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

const CustomToc = dynamic(() => import("@/app/posts/[tag]/[slug]/_components/CustomToc"), {
  ssr: false,
});

function CustomLink({
  children,
  href,
  ...props
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link href={href || "#"} {...props}>
      {children}
    </Link>
  );
}

function CustomImg({
  src,
  alt = "블로그 포스트 개별 이미지",
  ...props
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element, react/jsx-props-no-spreading
  return <img src={src} alt={alt || "포스트 이미지"} {...props} />;
}

function CustomCode({
  children,
  className,
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  // `inline code`인지 확인
  const isInline = !className;
  return isInline ? (
    <code className="text-sm text-gray-400 px-1 py-0.5 rounded">{children}</code>
  ) : (
    <code className={`${className} text-white`}>{children}</code>
  );
}

const components = {
  a: CustomLink,
  img: CustomImg,
  pre: CustomPre,
  code: CustomCode,
  TOC: CustomToc,
};

export default components;
