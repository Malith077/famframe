import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Open Graph card (shown when the site is shared / linked).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          background: "#4a654e",
          color: "#ffffff",
          padding: "0 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 2, opacity: 0.85 }}>
          {SITE_NAME.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
          Your family&apos;s photos, shared privately.
        </div>
        <div style={{ display: "flex", fontSize: 34, opacity: 0.8 }}>
          Stored securely in your own Google Drive.
        </div>
      </div>
    ),
    { ...size },
  );
}
