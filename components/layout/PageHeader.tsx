import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";

/**
 * Shared header for every page below the homepage: the terminal path, the
 * title, and one paragraph explaining what the page is for.
 */
export function PageHeader({
  path,
  title,
  lead,
  meta,
  children,
}: {
  path: string;
  title: string;
  lead: string;
  /** Optional monospace key/value pairs shown to the right on wide screens. */
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line pt-16 pb-14 sm:pt-24 sm:pb-20">
      <Container>
        <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-fg-muted">
          <span className="text-accent" aria-hidden="true">
            $
          </span>
          cd {path}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{title}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-dim">
              {lead}
            </p>
          </div>

          {meta && meta.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-1 lg:text-right">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-fg-dim">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {children}
      </Container>
    </header>
  );
}
