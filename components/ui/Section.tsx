import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * The numbered section header used down the whole site:
 *
 *   02 / PROJECTS ──────────────────────────
 *   Featured work
 *   Optional line of context.
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  action,
  className,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 sm:mb-14", className)}>
      <div className="flex items-center gap-3">
        <span className="label text-accent">{index}</span>
        <span className="label">/ {label}</span>
        <span className="rule h-px flex-1" aria-hidden="true" />
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium sm:text-3xl">{title}</h2>
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-fg-dim sm:text-base">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}
