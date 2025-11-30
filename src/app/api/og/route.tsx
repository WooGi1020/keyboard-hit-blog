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
          flexDirection: "column",
          margin: "auto",
          width: "90%",
          height: "85%",
          marginTop: "60px",
          backgroundColor: "#1e293b",
          borderRadius: "24px",
          boxShadow: "0px 8px 25px -5px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 32px",
            borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "#0f172a",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {/* 창 조절 버튼: 채도를 살짝 낮춰서 덜 튀게 조정 */}
            <div
              style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ef4444" }}
            />
            <div
              style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#f59e0b" }}
            />
            <div
              style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#22c55e" }}
            />
          </div>

          <div
            style={{
              fontSize: 28,
              color: "#cbd5e1",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
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
            padding: "48px 56px",
            flexGrow: 1,
            color: "#e2e8f0",
            fontSize: 32,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", gap: "16px", color: "#c084fc" }}>
            {" "}
            const <span style={{ color: "#fcd34d" }}>Title</span> = {/* Amber-300 */}
            <span style={{ color: "#e2e8f0" }}>{`() => (`}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "24px",
              marginLeft: "48px",
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: 32 }}>{`// ${date}`}</span>

            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: 32,
                marginTop: "12px",
                lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(56, 189, 248, 0.2)",
              }}
            >
              "{title}"
            </span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "32px", color: "#e2e8f0" }}
          >
            {`);`}
            <div
              style={{
                display: "flex",
                width: "4px",
                height: "48px",
                backgroundColor: "#38bdf8",
                marginLeft: "12px",
                marginBottom: "-6px",
                boxShadow: "0 0 10px #38bdf8",
              }}
            />
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
