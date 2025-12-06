import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === "development";

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Untitled Post";
  const tag = searchParams.get("tag") || "etc";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  // 🚨 폰트 크기 및 여백을 추가적으로 대폭 축소
  const config = {
    width: 366,
    height: 192,
    paddingHeader: "6px 8px", // 헤더 패딩 최소화
    paddingBody: "10px 14px", // 본문 패딩 최소화
    fontSizeTag: 10, // 태그 폰트 크기 추가 축소
    fontSizeCode: 10, // 코드 폰트 크기 추가 축소
    gapHeader: 5, // 헤더 아이콘 간격 최소화
    dotSize: 6, // 헤더 점 크기 최소화
    borderRadiusOuter: "6px", // 외부 모서리 둥글기 추가 축소
    borderRadiusTag: "2px", // 태그 모서리 둥글기 최소화
    marginTop: "15px", // 외부 마진 최소화

    // 내부 폰트 크기 및 여백 재조정
    codeMarginTop: "5px", // 내부 여백 축소
    codeMarginLeft: "12px", // 들여쓰기 축소
    codeTitleMarginTop: "3px",
    codeTitleFontSize: 12, // 타이틀 윗줄 폰트 축소
    titleFontSizeAdjustment: 4, // 타이틀 최종 폰트 크기 조정 (+2에서 +4로)
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
          boxShadow: "0px 1px 4px -1px rgba(0, 0, 0, 0.3)", // 그림자 더 약화
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: config.paddingHeader,
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "#0f172a",
          }}
        >
          {/* 헤더 점들 */}
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

          {/* 태그 영역 */}
          <div
            style={{
              fontSize: config.fontSizeTag,
              color: "#cbd5e1",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "2px", // 간격 최소화
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "2px 6px", // 패딩 최소화
              borderRadius: config.borderRadiusTag,
            }}
          >
            <span>{tag}</span>
          </div>
        </div>

        {/* 코드 본문 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: config.paddingBody,
            flexGrow: 1,
            color: "#e2e8f0",
            fontSize: config.fontSizeCode,
            lineHeight: 1.3, // 라인 높이 약간 축소
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {/* const Post = () => ( */}
          <div
            style={{
              display: "flex",
              gap: "5px",
              color: "#c084fc",
              fontSize: config.fontSizeCode,
            }}
          >
            const <span style={{ color: "#fcd34d" }}>Post</span>
            <span style={{ color: "#e2e8f0" }}>{`= () => (`}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: config.codeMarginTop,
              marginLeft: config.codeMarginLeft,
            }}
          >
            {/* 날짜 주석 */}
            <span
              style={{ color: "#94a3b8", fontSize: config.fontSizeCode }} // 주석 폰트도 코드 폰트와 동일하게
            >{`// ${date}`}</span>

            {/* 타이틀 */}
            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: config.fontSizeCode,
                marginTop: "3px", // 마진 축소
                lineHeight: 1.1,
                textShadow: "0 1px 2px rgba(56, 189, 248, 0.1)",
              }}
            >
              <span style={{ color: "#c084fc" }}>return</span> "{title}";
            </span>
          </div>

          {/* ); 및 커서 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px", // 여백 축소
              color: "#e2e8f0",
            }}
          >
            {`);`}
            <div
              style={{
                display: "flex",
                width: "1.5px",
                height: "12px", // 커서 높이 추가 축소
                backgroundColor: "#38bdf8",
                marginLeft: "3px", // 커서 마진 축소
                marginBottom: "-1px",
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
