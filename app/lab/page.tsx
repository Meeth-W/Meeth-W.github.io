import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { labGroups } from "@/lib/lab";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Badge";
import { Ghost } from "@/components/ghost/Ghost";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experiments, tools, Minecraft mods and coursework that escaped — the smaller things Meeth Waghela (Ghostyy) has built.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  const total = labGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHeader
        path="~/lab"
        title="The lab"
        lead="Smaller things. Some were useful, some were finished, and a few were neither — kept because building them taught me something the polished projects couldn't."
        meta={[
          { label: "Entries", value: String(total) },
          { label: "Vibe", value: "Unserious" },
        ]}
      />

      <Container className="py-14 sm:py-20">
        <div className="space-y-16 sm:space-y-20">
          {labGroups.map((group, gi) => (
            <section key={group.key}>
              <div className="flex items-center gap-3">
                <span className="label text-accent">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h2 className="font-mono text-sm tracking-[0.18em] text-fg uppercase">
                  {group.title}
                </h2>
                <span className="rule h-px flex-1" aria-hidden="true" />
                <span className="label">{group.items.length}</span>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted">
                {group.blurb}
              </p>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {group.items.map((item, i) => (
                  <li key={item.name} className="flex">
                    <Reveal delay={i * 0.04} className="flex w-full">
                      <Wrapper href={item.github}>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent-bright">
                            {item.name}
                          </h3>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="font-mono text-[0.625rem] text-fg-muted tabular-nums">
                              {item.year}
                            </span>
                            {item.github && (
                              <ArrowUpRight
                                className="size-3.5 text-fg-muted transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-dim">
                          {item.note}
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <li key={t}>
                              <Tag>{t}</Tag>
                            </li>
                          ))}
                        </ul>
                      </Wrapper>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-line pt-16 text-center">
          <Ghost state="sleeping" className="w-20 opacity-70" label={null} />
          <p className="max-w-md font-mono text-sm leading-relaxed text-fg-muted">
            That&apos;s everything worth showing. The rest is coursework,
            half-finished branches, and one bot that fishes.
          </p>
        </div>
      </Container>
    </>
  );
}

/** Lab entries link out when there's a repository, and sit still when there isn't. */
function Wrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "group ticked relative flex w-full flex-col border border-line bg-surface/60 p-6 transition-colors";

  if (!href) return <div className={className}>{children}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${className} hover:border-accent/35 hover:bg-surface`}
    >
      {children}
    </a>
  );
}
