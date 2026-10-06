import { ImageResponse } from "next/og";

export const alt = "FixKar: home services and renovation in Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: 80, background: "#0e2a47", color: "#fff",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: "#7dd3fc" }}>FixKar.pk</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Home Services &amp; Renovation Solutions in Pakistan
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: "#cbd5e1" }}>
          Repairs, installations and home improvement projects
        </div>
      </div>
    ),
    size
  );
}
