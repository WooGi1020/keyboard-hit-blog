import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === "development";

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Untitled Post";
  const tag = searchParams.get("tag") || "etc";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const sizeParam = searchParams.get("size");

  const isSmall = sizeParam === "small";

  // 디자인 스케일링 설정
  const config = isSmall
    ? {
        width: 653,
        height: 343,
        paddingHeader: "12px 16px",
        paddingBody: "24px 28px",
        fontSizeTag: 15,
        fontSizeCode: 17,
        gapHeader: 8,
        dotSize: 10,
        borderRadiusOuter: "12px",
        borderRadiusTag: "4px",
        marginTop: "30px",
      }
    : {
        width: 1200,
        height: 630,
        paddingHeader: "24px 32px",
        paddingBody: "48px 56px",
        fontSizeTag: 28,
        fontSizeCode: 32,
        gapHeader: 14,
        dotSize: 18,
        borderRadiusOuter: "24px",
        borderRadiusTag: "8px",
        marginTop: "60px",
      };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "90%",
          height: "85%",
          marginTop: config.marginTop,
          backgroundColor: "#1e293b",
          borderRadius: config.borderRadiusOuter,
          boxShadow: isSmall
            ? "0px 4px 12px -2px rgba(0, 0, 0, 0.3)"
            : "0px 8px 25px -5px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: config.paddingHeader,
            borderBottom: isSmall
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "2px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "#0f172a",
          }}
        >
          <div style={{ display: "flex", gap: `${config.gapHeader}px` }}>
            <div
              style={{
                width: config.dotSize,
                height: config.dotSize,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />
            <div
              style={{
                width: config.dotSize,
                height: config.dotSize,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            />
            <div
              style={{
                width: config.dotSize,
                height: config.dotSize,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
          </div>

          <div
            style={{
              fontSize: config.fontSizeTag,
              color: "#cbd5e1",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: isSmall ? "4px" : "8px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: isSmall ? "4px 10px" : "6px 16px",
              borderRadius: config.borderRadiusTag,
            }}
          >
            <span>{tag}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: config.paddingBody,
            flexGrow: 1,
            color: "#e2e8f0",
            fontSize: config.fontSizeCode,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", gap: isSmall ? "8px" : "16px", color: "#c084fc" }}>
            const <span style={{ color: "#fcd34d" }}>Post</span>
            <span style={{ color: "#e2e8f0" }}>{`= () => (`}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: isSmall ? "12px" : "24px",
              marginLeft: isSmall ? "24px" : "48px",
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: config.fontSizeCode }}>{`// ${date}`}</span>

            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: config.fontSizeCode,
                marginTop: isSmall ? "6px" : "12px",
                lineHeight: 1.2,
                textShadow: isSmall
                  ? "0 1px 5px rgba(56, 189, 248, 0.2)"
                  : "0 2px 10px rgba(56, 189, 248, 0.2)",
              }}
            >
              <span style={{ color: "#c084fc" }}>return</span> "{title}";
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: isSmall ? "16px" : "32px",
              color: "#e2e8f0",
            }}
          >
            {`);`}
            <div
              style={{
                display: "flex",
                width: isSmall ? "2px" : "4px",
                height: isSmall ? "24px" : "48px",
                backgroundColor: "#38bdf8",
                marginLeft: isSmall ? "6px" : "12px",
                marginBottom: isSmall ? "-3px" : "-6px",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: config.width,
      height: config.height,
      headers: {
        "Cache-Control": isDev ? "no-store, no-cache" : "public, max-age=31536000, immutable",
      },
    }
  );
}
