import { cn } from "@/lib/utils";
import { statusMeta, type ProjectStatus } from "@/lib/projects";

const toneClass = {
  accent: "text-accent border-accent/30 bg-accent/8",
  signal: "text-signal border-signal/25 bg-signal/8",
  caution: "text-caution border-caution/25 bg-caution/8",
  muted: "text-fg-muted border-line bg-white/2",
} as const;

const dotClass = {
  accent: "bg-accent",
  signal: "bg-signal",
  caution: "bg-caution",
  muted: "bg-fg-muted",
} as const;

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const { label, tone } = statusMeta[status];
  const animated = tone === "accent" || tone === "signal";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.625rem] tracking-[0.16em] uppercase",
        toneClass[tone],
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          dotClass[tone],
          animated && "animate-pulse-dot",
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

/** Technology chips and similar. Intentionally plain. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line bg-white/2 px-2 py-1 font-mono text-[0.6875rem] text-fg-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
