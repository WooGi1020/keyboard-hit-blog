import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === "development";

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Untitled Post";
  const tag = searchParams.get("tag") || "etc";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const config = {
    width: 366,
    height: 192,
    paddingHeader: "12px 16px",
    paddingBody: "24px 28px",
    fontSizeTag: 15,
    fontSizeCode: 17,
    gapHeader: 8,
    dotSize: 10,
    borderRadiusOuter: "12px",
    borderRadiusTag: "4px",
    marginTop: "30px",
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
          // 조건부 boxShadow 제거, small 버전 값 사용
          boxShadow: "0px 4px 12px -2px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: config.paddingHeader,
            // 조건부 borderBottom 제거, small 버전 값 사용
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
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
              // 조건부 gap 제거, small 버전 값 사용
              gap: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              // 조건부 padding 제거, small 버전 값 사용
              padding: "4px 10px",
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
          {/* 조건부 gap 제거, small 버전 값 사용 */}
          <div style={{ display: "flex", gap: "8px", color: "#c084fc" }}>
            const <span style={{ color: "#fcd34d" }}>Post</span>
            <span style={{ color: "#e2e8f0" }}>{`= () => (`}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // 조건부 marginTop 제거, small 버전 값 사용
              marginTop: "12px",
              // 조건부 marginLeft 제거, small 버전 값 사용
              marginLeft: "24px",
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: config.fontSizeCode }}>{`// ${date}`}</span>

            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: config.fontSizeCode,
                // 조건부 marginTop 제거, small 버전 값 사용
                marginTop: "6px",
                lineHeight: 1.2,
                // 조건부 textShadow 제거, small 버전 값 사용
                textShadow: "0 1px 5px rgba(56, 189, 248, 0.2)",
              }}
            >
              <span style={{ color: "#c084fc" }}>return</span> "{title}";
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              // 조건부 marginTop 제거, small 버전 값 사용
              marginTop: "16px",
              color: "#e2e8f0",
            }}
          >
            {`);`}
            <div
              style={{
                display: "flex",
                // 조건부 width/height 제거, small 버전 값 사용
                width: "2px",
                height: "24px",
                backgroundColor: "#38bdf8",
                // 조건부 marginLeft/marginBottom 제거, small 버전 값 사용
                marginLeft: "6px",
                marginBottom: "-3px",
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
