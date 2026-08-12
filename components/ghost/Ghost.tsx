"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type GhostState = "online" | "idle" | "thinking" | "sleeping" | "lost";

type GhostProps = {
  state?: GhostState;
  /** Sizing comes from the class name so the SVG scales with its container. */
  className?: string;
  /** Violet bloom behind the body. Off by default; on in the hero. */
  glow?: boolean;
  /** Accessible name. Pass null for purely decorative instances. */
  label?: string | null;
};

/**
 * The mascot. Deliberately vector rather than ASCII: monospace art breaks at
 * narrow widths and under fonts that don't have the glyphs, and this has to
 * survive 320px.
 *
 * The body is one path — a dome with a five-scallop hem. Expressions swap only
 * the face, so the silhouette stays constant across states.
 */
export function Ghost({
  state = "online",
  className,
  glow = false,
  label = "Ghostyy",
}: GhostProps) {
  const uid = useId().replace(/:/g, "");
  const bodyGradient = `ghost-body-${uid}`;
  const bloom = `ghost-bloom-${uid}`;

  return (
    <svg
      viewBox="0 0 100 118"
      className={cn("overflow-visible", className)}
      role={label ? "img" : "presentation"}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={bodyGradient} x1="50" y1="4" x2="50" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBFAFF" />
          <stop offset="55%" stopColor="#E4DFFF" />
          <stop offset="100%" stopColor="#B9AEF5" />
        </linearGradient>
        {glow && (
          <radialGradient id={bloom} cx="50%" cy="46%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {glow && <ellipse cx="50" cy="56" rx="66" ry="60" fill={`url(#${bloom})`} />}

      {/* Body */}
      <path
        d="M12 94 V50 C12 26 29 9 50 9 C71 9 88 26 88 50 V94
           c0 9 -8 12 -15 6
           c-5 -5 -11 -5 -16 1
           c-5 6 -11 6 -16 0
           c-5 -6 -11 -6 -16 -1
           c-7 6 -13 3 -13 -6 Z"
        fill={`url(#${bodyGradient})`}
      />

      {/* A single soft highlight, top-left, so the body doesn't read as flat. */}
      <ellipse cx="34" cy="32" rx="11" ry="14" fill="#FFFFFF" opacity="0.5" transform="rotate(-18 34 32)" />

      <Face state={state} />
    </svg>
  );
}

const INK = "#0B0B12";

function Face({ state }: { state: GhostState }) {
  switch (state) {
    case "sleeping":
      return (
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round">
          <path d="M31 50 q6 6 12 0" />
          <path d="M57 50 q6 6 12 0" />
          <path d="M44 68 q6 4 12 0" />
          {/* Two z's, drifting off. */}
          <g stroke="var(--color-accent)" strokeWidth="2.4" opacity="0.85">
            <path d="M86 22 h8 l-8 9 h8" />
            <path d="M96 8 h6 l-6 7 h6" opacity="0.6" />
          </g>
        </g>
      );

    case "idle":
      return (
        <g>
          {/* Half-lidded: a flat bar rather than a round eye. */}
          <rect x="30" y="48" width="14" height="4.5" rx="2.25" fill={INK} />
          <rect x="56" y="48" width="14" height="4.5" rx="2.25" fill={INK} />
          <path d="M44 66 h12" stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
      );

    case "thinking":
      return (
        <g>
          {/* Pupils shifted up and right — looking away from the viewer. */}
          <ellipse cx="35" cy="46" rx="5.4" ry="6.6" fill={INK} />
          <ellipse cx="61" cy="46" rx="5.4" ry="6.6" fill={INK} />
          <path d="M45 66 q5 -4 10 0" stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <g fill="var(--color-accent)">
            <circle cx="84" cy="26" r="3" opacity="0.9" />
            <circle cx="93" cy="16" r="2" opacity="0.6" />
            <circle cx="99" cy="9" r="1.4" opacity="0.35" />
          </g>
        </g>
      );

    case "lost":
      return (
        <g>
          {/* Wide, mismatched, faintly alarmed. */}
          <ellipse cx="34" cy="50" rx="6.8" ry="7.6" fill={INK} />
          <ellipse cx="62" cy="49" rx="5.6" ry="6.4" fill={INK} />
          <path
            d="M40 70 q4 -5 8 0 q4 5 8 0"
            stroke={INK}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );

    case "online":
    default:
      return (
        <g>
          <ellipse cx="35" cy="49" rx="5.6" ry="7" fill={INK} />
          <ellipse cx="63" cy="49" rx="5.6" ry="7" fill={INK} />
          {/* The ᴗ mouth. */}
          <path d="M43 66 q7 7 14 0" stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none" />
          {/* Blush, barely there. */}
          <ellipse cx="25" cy="61" rx="6" ry="3.4" fill="var(--color-accent)" opacity="0.28" />
          <ellipse cx="73" cy="61" rx="6" ry="3.4" fill="var(--color-accent)" opacity="0.28" />
        </g>
      );
  }
}
