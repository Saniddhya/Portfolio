import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — AI Engineer & Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OpenGraph card, rendered at build/edge time. Matches the site's palette so
 * the card reads as part of the same system rather than a bolted-on asset.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#d6ff4b" }} />
          <div style={{ color: "#6c6a66", fontSize: 20, letterSpacing: 6 }}>
            SANIDHYA.DEV
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f2efe9",
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Building intelligence
            <br />
            into products.
          </div>

          <div style={{ color: "#a3a09a", fontSize: 28, marginTop: 28 }}>
            AI Engineer · Full-Stack Builder
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, color: "#6c6a66", fontSize: 18 }}>
          <div style={{ borderTop: "1px solid rgba(242,239,233,0.15)", paddingTop: 20, flex: 1 }}>
            AI Systems
          </div>
          <div style={{ borderTop: "1px solid rgba(242,239,233,0.15)", paddingTop: 20, flex: 1 }}>
            Full-Stack
          </div>
          <div style={{ borderTop: "1px solid rgba(242,239,233,0.15)", paddingTop: 20, flex: 1 }}>
            Pune, India
          </div>
        </div>
      </div>
    ),
    size,
  );
}