import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-200 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent/45 bg-accent/12 text-accent-bright hover:bg-accent/20 hover:border-accent/70",
  ghost:
    "border border-line bg-transparent text-fg-dim hover:text-fg hover:border-fg-muted/50 hover:bg-white/3",
};

/**
 * Internal or external call-to-action. External links get the diagonal arrow
 * and the rel attributes; internal ones don't.
 */
export function Action({
  href,
  children,
  variant = "ghost",
  external,
  className,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {external && (
        <ArrowUpRight
          className="size-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}

/** The small "→ see everything" link that sits beside section headers. */
export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] uppercase text-fg-dim transition-colors hover:text-accent",
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
        aria-hidden="true"
      />
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
