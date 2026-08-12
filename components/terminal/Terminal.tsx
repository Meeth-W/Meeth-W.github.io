import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Panel, PanelBar, WindowDots } from "@/components/ui/Panel";

/**
 * A terminal-shaped panel. This is an interface layer used to present real
 * content — not a screenshot of a terminal, and not a code block.
 */
export function Terminal({
  title,
  children,
  className,
  bodyClassName,
  action,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  action?: ReactNode;
}) {
  return (
    <Panel ticks className={cn("overflow-hidden", className)}>
      <PanelBar>
        <WindowDots />
        <span className="truncate font-mono text-[0.6875rem] tracking-wide text-fg-muted">
          {title}
        </span>
        {action && <div className="ml-auto">{action}</div>}
      </PanelBar>
      <div
        className={cn(
          "p-4 font-mono text-[0.8125rem] leading-relaxed sm:p-6 sm:text-sm",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </Panel>
  );
}

/** `$ command` — the prompt glyph is decorative and hidden from assistive tech. */
export function Command({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex gap-2 text-fg-dim", className)}>
      <span className="shrink-0 text-accent select-none" aria-hidden="true">
        $
      </span>
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}

/** The response to a command. */
export function Output({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-1 pl-4 break-words text-fg", className)}>{children}</p>
  );
}

export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "animate-cursor ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-accent",
        className,
      )}
    />
  );
}

/**
 * The process-monitor list. Rows are labels, not measurements — there is no
 * percentage here because there is nothing real to measure.
 */
export function SystemStatus({
  rows,
}: {
  rows: { name: string; state: string; tone?: "accent" | "signal" | "muted" }[];
}) {
  const tones = {
    accent: "text-accent",
    signal: "text-signal",
    muted: "text-fg-muted",
  } as const;

  return (
    <ul className="space-y-2.5">
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-baseline gap-3 font-mono text-[0.8125rem]"
        >
          <span className="text-fg">{row.name}</span>
          <span
            className="min-w-4 flex-1 translate-y-[-0.2em] border-b border-dashed border-line"
            aria-hidden="true"
          />
          <span
            className={cn(
              "shrink-0 tracking-[0.14em] uppercase",
              tones[row.tone ?? "muted"],
            )}
          >
            {row.state}
          </span>
        </li>
      ))}
    </ul>
  );
}
