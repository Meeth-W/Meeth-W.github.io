import { ImageResponse } from "next/og";

export const alt = "Ghostyy — Meeth Waghela — AI · Security · Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time and written into the static export. */
export const dynamic = "force-static";

/** The mascot, inlined as a data URI so satori can rasterise it as an image. */
const GHOST = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 118" width="100" height="118">
    <defs><linearGradient id="g" x1="50" y1="4" x2="50" y2="112" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FBFAFF"/><stop offset="55%" stop-color="#E4DFFF"/><stop offset="100%" stop-color="#B9AEF5"/>
    </linearGradient></defs>
    <path d="M12 94 V50 C12 26 29 9 50 9 C71 9 88 26 88 50 V94 c0 9 -8 12 -15 6 c-5 -5 -11 -5 -16 1 c-5 6 -11 6 -16 0 c-5 -6 -11 -6 -16 -1 c-7 6 -13 3 -13 -6 Z" fill="url(#g)"/>
    <ellipse cx="35" cy="49" rx="5.6" ry="7" fill="#0B0B12"/>
    <ellipse cx="63" cy="49" rx="5.6" ry="7" fill="#0B0B12"/>
    <path d="M43 66 q7 7 14 0" stroke="#0B0B12" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="25" cy="61" rx="6" ry="3.4" fill="#8B7EFF" opacity="0.3"/>
    <ellipse cx="73" cy="61" rx="6" ry="3.4" fill="#8B7EFF" opacity="0.3"/>
  </svg>`,
)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050509",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(139,126,255,0.22), transparent 55%)",
          padding: "70px 80px",
          position: "relative",
        }}
      >
        {/* Top rule + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: 8,
              color: "#9B98A8",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#7FD1A8",
              }}
            />
            Ghostyy // Online
          </div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#62606D" }}>
            meeth-w.github.io
          </div>
        </div>

        {/* Name + ghost */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 60,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 104,
                lineHeight: 1,
                color: "#F2F0FF",
                letterSpacing: -3,
              }}
            >
              Meeth Waghela
            </div>
            <div
              style={{
                marginTop: 34,
                fontSize: 30,
                letterSpacing: 10,
                color: "#8B7EFF",
                textTransform: "uppercase",
              }}
            >
              AI · Security · Systems
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GHOST} width={190} height={224} alt="" />
        </div>

        {/* Bottom line */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 32,
            fontSize: 27,
            color: "#9B98A8",
          }}
        >
          I build systems, break them on purpose, and go looking for the part
          that gave.
        </div>
      </div>
    ),
    size,
  );
}
