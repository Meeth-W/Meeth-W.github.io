import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A pipeline rendered as boxes and connectors. Flows down on narrow screens
 * and across on wide ones — no horizontal scroll, no fixed-width ASCII.
 */
export function Flow({
  steps,
  className,
  label = "Pipeline",
}: {
  steps: string[];
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      <p className="label mb-4">{label}</p>
      <ol className="flex flex-col gap-1 md:flex-row md:flex-wrap md:items-stretch md:gap-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1 md:contents">
            <div className="flex flex-1 items-center border border-line bg-surface/60 px-3.5 py-2.5 font-mono text-[0.6875rem] tracking-wide text-fg-dim uppercase md:flex-none">
              <span
                className="mr-2.5 text-accent/60 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </div>

            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center text-fg-muted"
              >
                <ChevronDown className="size-3.5 md:hidden" />
                <ChevronRight className="hidden size-3.5 md:block" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A single monospace key/value row, used in project metadata blocks. */
export function MetaRow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line py-4", className)}>
      <dt className="label">{label}</dt>
      <dd className="mt-2.5 text-sm text-fg-dim">{children}</dd>
    </div>
  );
}
