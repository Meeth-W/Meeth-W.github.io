import { cn } from "@/lib/utils";

/** The compact ghost glyph — same silhouette as the mascot, no face detail. */
export function GhostGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 26"
      className={cn("size-5", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 21V12a9 9 0 0 1 18 0v9c0 2.2-2 2.9-3.6 1.4-1.2-1.1-2.6-1.1-3.8.2-1.2 1.4-2.6 1.4-3.8 0-1.2-1.3-2.6-1.4-3.8-.2C4.6 23.9 3 23.2 3 21Z"
        fill="currentColor"
      />
      <circle cx="9" cy="12" r="1.9" fill="var(--color-void)" />
      <circle cx="15" cy="12" r="1.9" fill="var(--color-void)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <GhostGlyph className="size-5 text-accent transition-colors duration-300 group-hover:text-accent-bright" />
      <span className="font-mono text-sm tracking-[0.22em] text-fg uppercase">
        Ghostyy
      </span>
    </span>
  );
}
