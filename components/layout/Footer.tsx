import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { GhostGlyph } from "@/components/navigation/Wordmark";

const socials = [
  { label: "GitHub", href: site.github, icon: GithubIcon },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "Instagram", href: site.instagram, icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <GhostGlyph className="size-5 text-accent" />
              <span className="font-mono text-sm tracking-[0.22em] text-fg uppercase">
                Ghostyy
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Built with Next.js. Statically exported and deployed on GitHub
              Pages — no server involved.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-muted uppercase">
              <span
                className="animate-pulse-dot size-1.5 rounded-full bg-signal"
                aria-hidden="true"
              />
              Status: online
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Footer">
              <p className="label mb-4">Pages</p>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-xs text-fg-dim transition-colors hover:text-accent"
                    >
                      {item.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label mb-4">Elsewhere</p>
              <ul className="space-y-2.5">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 font-mono text-xs text-fg-dim transition-colors hover:text-accent"
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.6875rem] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Meeth W</p>
          <p className="tracking-[0.14em] uppercase">
            The ghost isn&apos;t the absence of something
          </p>
        </div>
      </Container>
    </footer>
  );
}
