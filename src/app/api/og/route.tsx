import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === "development";

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Untitled Post";
  const tag = searchParams.get("tag") || "etc";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          // 어두운 그라데이션 배경으로 깊이감 추가
          backgroundImage: "linear-gradient(to bottom right, #2d3748, #1a202c)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "85%",
            backgroundColor: "#282c34",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 32px",
              borderBottom: "2px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "#21252b", // 헤더 색상을 약간 더 어둡게 분리
            }}
          >
            <div style={{ display: "flex", gap: "14px" }}>
              <div
                style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ff5f56" }}
              />
              <div
                style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ffbd2e" }}
              />
              <div
                style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#27c93f" }}
              />
            </div>

            <div
              style={{
                fontSize: 28,
                color: "#abb2bf",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "6px 16px",
                borderRadius: "8px",
              }}
            >
              <span>{tag}</span>
            </div>
          </div>

          {/* Content Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "48px 56px", // 패딩 조정
              flexGrow: 1,
              color: "#abb2bf",
              fontSize: 32, // 폰트 사이즈 약간 조정
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
              fontFamily: "monospace", // 모노스페이스 폰트 명시
            }}
          >
            <div style={{ display: "flex", gap: "16px", color: "#c678dd" }}>
              const <span style={{ color: "#e5c07b" }}>Title</span> ={" "}
              <span style={{ color: "#abb2bf" }}>{`() => (`}</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "24px",
                marginLeft: "48px",
              }}
            >
              <span style={{ color: "#7f848e", fontSize: 32 }}>{`// ${date}`}</span>
              <span
                style={{
                  color: "#61afef",
                  fontWeight: "bold",
                  fontSize: 32,
                  marginTop: "12px",
                  lineHeight: 1.2,
                }}
              >
                "{title}"
              </span>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", marginTop: "32px", color: "#abb2bf" }}
            >
              {`);`}
              <div
                style={{
                  display: "flex",
                  width: "4px",
                  height: "48px",
                  backgroundColor: "#528bff",
                  marginLeft: "12px",
                  marginBottom: "-6px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": isDev ? "no-store, no-cache" : "public, max-age=31536000, immutable",
      },
    }
  );
}
