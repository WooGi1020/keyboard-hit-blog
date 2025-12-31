import CustomPre from "@/app/posts/[tag]/[slug]/_components/CustomPre";
import Link from "next/link";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImgProps = ComponentPropsWithoutRef<"img">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParaProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type LiProps = ComponentPropsWithoutRef<"li">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type TableProps = ComponentPropsWithoutRef<"table">;
type ThProps = ComponentPropsWithoutRef<"th">;
type TdProps = ComponentPropsWithoutRef<"td">;

function CustomH1({ children, ...props }: HeadingProps) {
  return (
    <h1
      className="mt-10 mb-4 text-2xl text-chart-1  sm:text-3xl font-bold tracking-tight scroll-m-20"
      {...props}
    >
      {children}
    </h1>
  );
}

function CustomH2({ children, ...props }: HeadingProps) {
  return (
    <h2
      className="mt-12 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground pb-2 border-b border-border scroll-m-20 first:mt-0"
      {...props}
    >
      {children}
    </h2>
  );
}

function CustomH3({ children, ...props }: HeadingProps) {
  return (
    <h3
      className="mt-8 mb-3 text-lg sm:text-xl font-semibold tracking-tight text-foreground scroll-m-20"
      {...props}
    >
      {children}
    </h3>
  );
}

function CustomH4({ children, ...props }: HeadingProps) {
  return (
    <h4
      className="mt-6 mb-2 text-lg font-semibold tracking-tight text-foreground scroll-m-20"
      {...props}
    >
      {children}
    </h4>
  );
}

function CustomP({ children, ...props }: ParaProps) {
  return (
    <p className="leading-7 not-first:mt-6 text-base" {...props}>
      {children}
    </p>
  );
}

function CustomBlockquote({ children, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className="my-6 border-l-4 border-blue-500 px-6 py-2 italic dark:bg-muted/30 bg-slate-100 rounded-r-md text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function CustomUl({ children, ...props }: ListProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 marker:text-muted-foreground" {...props}>
      {children}
    </ul>
  );
}

function CustomOl({ children, ...props }: ListProps) {
  return (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-muted-foreground" {...props}>
      {children}
    </ol>
  );
}

function CustomLi({ children, ...props }: LiProps) {
  return (
    <li className="pl-1" {...props}>
      {children}
    </li>
  );
}

function CustomHr(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-10 border-border" {...props} />;
}

// --- [Table Components] ---

function CustomTable({ children, ...props }: TableProps) {
  return (
    <div className="my-8 w-full overflow-y-auto">
      <table className="w-full overflow-hidden rounded-lg border border-border text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function CustomTh({ children, ...props }: ThProps) {
  return (
    <th
      className="border-b border-border bg-muted/50 px-4 py-3 text-left font-bold text-foreground [[align=center]]:text-center [[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  );
}

function CustomTd({ children, ...props }: TdProps) {
  return (
    <td
      className="border-b border-border/40 px-4 py-3 align-middle [[align=center]]:text-center [[align=right]]:text-right last:border-0"
      {...props}
    >
      {children}
    </td>
  );
}

// --- [Existing Components] ---

function CustomLink({ href, children, ...props }: AnchorProps) {
  const isInternalLink = href && href.startsWith("#");
  const baseClass = "font-medium text-chart-1! transition-colors hover:underline";

  if (isInternalLink) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass} {...props}>
      {children}
    </a>
  );
}

function CustomImg({ src, alt, width, height, ...props }: ImgProps) {
  const imgSrc: string | StaticImport = src as string | StaticImport;
  return (
    <>
      <div
        className="relative mx-auto mt-8 mb-2 aspect-video max-w-full rounded-2xl overflow-hidden"
        style={{ width, height }}
      >
        <Image src={imgSrc} alt={alt || ""} layout="fill" priority objectFit="contain" {...props} />
      </div>
      <p className="text-center text-sm mb-8 text-muted-foreground">{alt}</p>
    </>
  );
}

function CustomCode({ children, className, ...props }: CodeProps) {
  const isBlock =
    ("data-language" in props && props["data-language"] !== "text") ||
    (typeof children === "string" && children.includes("\n"));

  if (!isBlock) {
    return (
      <code
        className="relative mx-1 rounded-md border border-zinc-300 bg-zinc-200 px-2 text-[1rem] font-medium text-rose-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-rose-400 before:content-none after:content-none"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className="p-4 rounded" {...props}>
      {children}
    </code>
  );
}

const components = {
  // Typography
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  p: CustomP,
  blockquote: CustomBlockquote,
  ul: CustomUl,
  ol: CustomOl,
  li: CustomLi,
  hr: CustomHr,

  // Table
  table: CustomTable,
  th: CustomTh,
  td: CustomTd,

  // Others
  a: CustomLink,
  img: CustomImg,
  pre: CustomPre,
  code: CustomCode,
  TOC: () => null,
};

export default components;
