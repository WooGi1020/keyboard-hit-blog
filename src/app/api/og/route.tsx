import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === "development";

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Untitled Post";
  const tag = searchParams.get("tag") || "Etc";
  const createdDate = searchParams.get("createdDate") || new Date().toISOString().split("T")[0];
  const updatedDate = searchParams.get("updatedDate");
  const dateText = (updatedDate || createdDate).replace(/-/g, ".");

  const width = 1200;
  const height = 630;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        padding: "0 100px",
        position: "relative",
      }}
    >
      {/* Decorative accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "16px",
          backgroundColor: "#0f172a",
        }}
      />

      {/* Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#3b82f6",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              backgroundColor: "#3b82f6",
              marginRight: "16px",
            }}
          />
          {tag}
        </div>

        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            color: "#0f172a",
            lineHeight: 1.2,
            wordBreak: "keep-all",
            maxWidth: "1000px",
            marginBottom: "40px",
          }}
        >
          {title}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "100px",
          right: "100px",
          display: "flex",
          alignItems: "center",
          width: "1000px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", fontSize: "24px", color: "#64748b", fontWeight: "600" }}>
            {dateText}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "24px", color: "#94a3b8", fontWeight: "500" }}>
          keyboard-hit.blog
        </div>
      </div>
    </div>,
    {
      width,
      height,
      headers: {
        "Cache-Control": isDev ? "no-store, no-cache" : "public, max-age=31536000, immutable",
      },
    }
  );
}
