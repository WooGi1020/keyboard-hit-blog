import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import CustomCopyButton from "./CustomCopyButton";

const ACCENT_COLOR_LIGHT = "hsl(45, 100%, 70%)";
const ACCENT_COLOR_DARK = "hsl(45, 100%, 75%)";

type CustomPreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

function CustomPre({
  children,
  className,
  style,
  "data-language": dataLanguage,
  ...props
}: CustomPreProps) {
  const isFind = dataLanguage && dataLanguage === "find";
  const lang = dataLanguage || "text";

  if (isFind) {
    return (
      <pre
        className={`
        my-6 pl-10 pr-4 rounded-lg relative overflow-hidden text-sm
        bg-orange-100 text-orange-800 
        dark:bg-blue-950 dark:text-blue-300
      `}
        {...props}
      >
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl select-none"
          style={{
            color: "rgb(251 191 36)",
            filter: `drop-shadow(0 0 4px ${className?.includes("dark") ? ACCENT_COLOR_DARK : ACCENT_COLOR_LIGHT})`,
          }}
        >
          💡
        </span>

        <code className="block whitespace-pre-wrap">{children}</code>
      </pre>
    );
  }

  return (
    <div
      data-copy-scope
      className="relative my-6 overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-900 shadow-xl dark:border-zinc-800 border border-slate-200"
    >
      <div className="flex items-center justify-between bg-slate-200 dark:bg-[#282c34] px-4 py-3">
        <div className="flex gap-2 items-center">
          <div className="size-3 rounded-full bg-[#ff5f56]" />
          <div className="size-3 rounded-full bg-[#ffbd2e]" />
          <div className="size-3 rounded-full bg-[#27c93f]" />
          <span className="text-xs font-medium ml-2 text-zinc-500 dark:text-zinc-400 uppercase">
            {lang}
          </span>
        </div>

        <CustomCopyButton codeChildren={children} />
      </div>

      <div className="relative w-full overflow-x-auto">
        <pre
          data-copy-target
          data-language={lang}
          {...props}
          style={{ ...style, backgroundColor: "transparent" }}
          className={cn(
            "min-w-full text-sm leading-relaxed focus:outline-none p-4",
            "bg-transparent m-0 border-0",
            className
          )}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

export default CustomPre;
