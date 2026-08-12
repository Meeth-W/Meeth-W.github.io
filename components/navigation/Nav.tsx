"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { useCommandPalette } from "./CommandPaletteProvider";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const palette = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every link inside the mobile menu closes it on click, so there is no
  // effect here syncing `open` to the pathname.

  // While the mobile menu is open, the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-none focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:border focus:border-accent/50 focus:bg-overlay focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[76rem] items-center gap-6 px-5 sm:px-8"
        >
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${site.alias} — home`}
          >
            <Wordmark />
          </Link>

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg-dim",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1 rounded-full transition-colors",
                        active
                          ? "bg-accent"
                          : "bg-transparent group-hover:bg-fg-muted",
                      )}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={palette.open}
              className="hidden items-center gap-2 border border-line px-3 py-2 font-mono text-[0.6875rem] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-dim md:flex"
              aria-label="Open command palette"
            >
              <CommandIcon className="size-3.5" aria-hidden="true" />
              <span aria-hidden="true">K</span>
            </button>

            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 border border-line px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-dim uppercase transition-colors hover:border-accent/40 hover:text-accent sm:flex"
            >
              <GithubIcon className="size-3.5" />
              GitHub
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center border border-line text-fg-dim transition-colors hover:text-fg lg:hidden"
            >
              {open ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} pathname={pathname} onClose={() => setOpen(false)} />
    </>
  );
}

/**
 * A full-height sheet rather than a shrunken navbar: large tap targets, the
 * terminal path spelled out under each label, and contact links at the base.
 */
function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-0 top-16 z-40 flex flex-col bg-void/97 backdrop-blur-xl lg:hidden"
    >
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="divide-y divide-line border-y border-line">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span
                    className={cn(
                      "label",
                      active ? "text-accent" : "text-fg-muted",
                    )}
                  >
                    {item.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-2xl",
                        active ? "text-fg" : "text-fg-dim",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[0.6875rem] text-fg-muted">
                      {item.path}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 border border-line px-4 py-3 font-mono text-xs tracking-[0.14em] text-fg-dim uppercase"
          >
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 border border-line px-4 py-3 font-mono text-xs tracking-[0.14em] text-fg-dim uppercase"
          >
            Email
          </a>
        </div>
      </nav>
    </div>
  );
}
