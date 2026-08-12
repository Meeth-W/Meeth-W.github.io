import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The base surface. One border, a faint inner lift, optional corner ticks.
 * No rounded-2xl-with-a-gradient cards anywhere on this site.
 */
export function Panel({
  children,
  className,
  ticks = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  ticks?: boolean;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag
      className={cn(
        "relative border border-line bg-surface/70",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]",
        ticks && "ticked",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A panel header bar — the strip with a monospace title, styled like the
 * title bar of a terminal window.
 */
export function PanelBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-line bg-raised/60 px-4 py-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The three dots. Muted, not macOS traffic lights. */
export function WindowDots() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="size-2 rounded-full bg-fg-muted/40" />
      <span className="size-2 rounded-full bg-fg-muted/40" />
      <span className="size-2 rounded-full bg-accent/50" />
    </div>
  );
}
