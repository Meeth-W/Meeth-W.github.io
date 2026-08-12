/**
 * Everything behind the content: a hairline grid, one restrained violet bloom,
 * and a film of noise so the flat blacks don't band on wide gradients.
 *
 * Fixed and pointer-events-none — it never participates in layout, so it can't
 * cause horizontal overflow at any width.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid. Masked to fade toward the bottom so it reads as depth rather
          than as a texture stuck to the screen. */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff09 1px, transparent 1px), linear-gradient(to bottom, #ffffff09 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, #000 35%, transparent 78%)",
        }}
      />

      {/* The one glow on the site. Wide, weak, high up — behind the nav and
          hero, never a blob sitting under a heading. */}
      <div
        className="absolute -top-[28rem] left-1/2 h-[52rem] w-[80rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent)",
        }}
      />

      {/* Noise. Inline SVG turbulence — no image request, a few hundred bytes. */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette, so the page edges settle into the frame. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 40%, transparent 55%, #050509 100%)",
        }}
      />
    </div>
  );
}
