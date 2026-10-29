import { ImageResponse } from "next/og";
import { OG_IMAGE_VERSION, THUMBNAIL_IMAGE_VERSION } from "@/utils/getImagePath";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = Array.from(searchParams.get("title") || "keyboard hit!")
    .slice(0, 100)
    .join("");
  const tag = (searchParams.get("tag") || "Blog").slice(0, 40);
  const variant = searchParams.get("variant") || "post";
  const isHome = variant === "home";
  const isCollection = variant === "collection";
  const dark = searchParams.get("theme") === "dark";
  const updated = (searchParams.get("updatedDate") || "").slice(0, 10);
  const created = (searchParams.get("createdDate") || "").slice(0, 10);
  const dateText = (updated || created).replace(/-/g, ".");
  const colors = dark
    ? {
        bg: "#1b1b1b",
        ink: "#e6e6e6",
        muted: "#a9a9a9",
        line: "#474747",
        accent: "#9eacc1",
        tint: "#272727",
      }
    : {
        bg: "#fafafa",
        ink: "#18181b",
        muted: "#71717a",
        line: "#e0e0e3",
        accent: "#e97358",
        tint: "#faf0ed",
      };
  const units = Array.from(title).reduce(
    (sum, char) => sum + (/[^\u0000-\u00ff]/.test(char) ? 1 : 0.55),
    0
  );
  const fontSize = isHome ? 112 : isCollection ? 100 : units > 70 ? 48 : units > 45 ? 56 : 64;
  const versioned =
    searchParams.get("v") === OG_IMAGE_VERSION &&
    (variant !== "thumbnail" || searchParams.get("art") === THUMBNAIL_IMAGE_VERSION);
  const cacheControl =
    process.env.NODE_ENV === "development"
      ? "no-store"
      : versioned
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate";

  const imageHeader = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 58,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {isHome ? (
          <span style={{ fontSize: 22, color: colors.muted }}>우기의 개발기록</span>
        ) : (
          <>
            <span>keyboard </span>
            <span style={{ color: colors.accent }}>hit!</span>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 18px",
          border: `1px solid ${colors.line}`,
          borderBottom: `3px solid ${colors.accent}`,
          borderRadius: 8,
          backgroundColor: colors.tint,
          color: colors.accent,
          fontSize: 21,
        }}
      >
        {isHome ? "개발 기록" : tag}
      </div>
    </div>
  );

  if (variant === "thumbnail") {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 64px 80px",
          position: "relative",
          backgroundColor: colors.bg,
          color: colors.ink,
        }}
      >
        {imageHeader}
        <div
          style={{
            display: "flex",
            position: "relative",
            maxWidth: "100%",
            maxHeight: 245,
            overflow: "hidden",
            fontSize: title.length > 24 ? 64 : 84,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: -2,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: { "Cache-Control": cacheControl, "X-OG-Image-Version": OG_IMAGE_VERSION },
      }
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "54px 64px 42px",
        backgroundColor: colors.bg,
        color: colors.ink,
        position: "relative",
      }}
    >
      {imageHeader}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          paddingBottom: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            maxHeight: 328,
            overflow: "hidden",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: isHome ? -6 : -2,
            wordBreak: "keep-all",
            width: "100%",
          }}
        >
          {isHome ? (
            <>
              <span>keyboard </span>
              <span style={{ color: colors.accent }}>hit!</span>
            </>
          ) : (
            title
          )}
        </div>
        {(isHome || isCollection) && (
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 27,
              lineHeight: 1.6,
              color: colors.muted,
            }}
          >
            {isHome
              ? "새로 알게 된 내용과 관심 있는 주제를 기록하는 공간"
              : "키보드 두들기며 먹고살기 · 주제별 개발 기록"}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${colors.line}`,
          paddingTop: 22,
          color: colors.muted,
          fontSize: 20,
        }}
      >
        <div style={{ display: "flex" }}>
          {variant === "post" && dateText
            ? `${dateText}${updated ? " 수정" : ""}`
            : "키보드 두들기며 먹고살기"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>keyboard-hit-blog.vercel.app</span>
          <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
            <rect
              x="2"
              y="2"
              width="30"
              height="20"
              rx="3"
              stroke={colors.muted}
              strokeWidth="1.5"
            />
            <path d="M12 28H22M17 22V28" stroke={colors.muted} strokeWidth="1.5" />
            <path
              d="M8 8H15V16H8V8ZM20 8H26M20 12H26M20 16H24"
              stroke={colors.accent}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": cacheControl, "X-OG-Image-Version": OG_IMAGE_VERSION },
    }
  );
}
