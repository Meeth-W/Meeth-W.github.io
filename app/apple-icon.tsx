import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Home-screen icon. The SVG favicon covers browsers; iOS wants a raster. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B12",
        }}
      >
        <svg width="120" height="142" viewBox="0 0 100 118">
          <path
            d="M12 94 V50 C12 26 29 9 50 9 C71 9 88 26 88 50 V94 c0 9 -8 12 -15 6 c-5 -5 -11 -5 -16 1 c-5 6 -11 6 -16 0 c-5 -6 -11 -6 -16 -1 c-7 6 -13 3 -13 -6 Z"
            fill="#B8A7FF"
          />
          <ellipse cx="35" cy="49" rx="6" ry="7.4" fill="#0B0B12" />
          <ellipse cx="63" cy="49" rx="6" ry="7.4" fill="#0B0B12" />
          <path
            d="M43 66 q7 7 14 0"
            stroke="#0B0B12"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    size,
  );
}
