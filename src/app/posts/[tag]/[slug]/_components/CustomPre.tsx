import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import CustomCopyButton from "./CustomCopyButton";

type CustomPreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

function CustomPre({
  children,
  className,
  style,
  "data-language": language,
  ...props
}: CustomPreProps) {
  const lang = language || "text";
  if (lang === "find") {
    return (
      <div className="post-note" role="note">
        <span className="post-note-label">참고</span>
        <pre
          {...props}
          className={cn("post-note-content", className)}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {children}
        </pre>
      </div>
    );
  }
  return (
    <div data-copy-scope className="post-code">
      <div className="post-code-toolbar">
        <span className="post-code-language">{lang}</span>
        <CustomCopyButton codeChildren={children} />
      </div>
      <pre
        {...props}
        data-copy-target
        data-language={lang}
        tabIndex={0}
        className={cn("post-code-pre", className)}
        style={{ ...style, backgroundColor: "transparent" }}
      >
        {children}
      </pre>
    </div>
  );
}

export default CustomPre;
