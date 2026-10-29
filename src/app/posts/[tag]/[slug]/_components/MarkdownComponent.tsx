import CustomPre from "./CustomPre";
import Link from "next/link";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type CodeProps = ComponentPropsWithoutRef<"code"> & {
  "data-language"?: string;
  "data-theme"?: string;
};

function CustomH1(props: HeadingProps) {
  return <h1 {...props} />;
}
function CustomH2(props: HeadingProps) {
  return <h2 {...props} />;
}
function CustomH3(props: HeadingProps) {
  return <h3 {...props} />;
}
function CustomH4(props: HeadingProps) {
  return <h4 {...props} />;
}

function CustomTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="post-table-wrap" role="region" aria-label="표" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  );
}

function CustomLink({ href, children, className, ...props }: ComponentPropsWithoutRef<"a">) {
  const linkClass = cn("post-link", className);
  if (href?.startsWith("#") || href?.startsWith("/")) {
    return (
      <Link href={href} className={linkClass} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props}>
      {children}
    </a>
  );
}

function CustomImg({ src, alt, width, height, ...props }: ComponentPropsWithoutRef<"img">) {
  return (
    <>
      <div className="post-image" style={{ width, height }}>
        <Image
          src={src as string | StaticImport}
          alt={alt || ""}
          fill
          sizes="(max-width: 800px) 100vw, 760px"
          className="object-contain"
          {...props}
        />
      </div>
      {alt && <p className="post-image-caption">{alt}</p>}
    </>
  );
}

function CustomCode({ children, className, ...props }: CodeProps) {
  return (
    <code className={cn("post-code-content", className)} {...props}>
      {children}
    </code>
  );
}

const components = {
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  table: CustomTable,
  a: CustomLink,
  img: CustomImg,
  pre: CustomPre,
  code: CustomCode,
  TOC: () => null,
};

export default components;
