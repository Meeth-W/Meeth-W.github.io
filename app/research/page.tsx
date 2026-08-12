import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { researchEntries } from "@/lib/research";
import { getProject } from "@/lib/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Badge";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Open engineering questions Meeth Waghela (Ghostyy) is working through — AI memory and token efficiency, behavioural cybersecurity, graph intelligence, retrieval architecture and local model efficiency.",
  alternates: { canonical: "/research" },
};

const stateStyle = {
  open: "text-fg-muted border-line",
  "in progress": "text-accent border-accent/30",
  grounded: "text-signal border-signal/25",
} as const;

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        path="~/research"
        title="Research.log"
        lead="I'm more interested in the engineering problems underneath AI than the applications sitting on top of it. These are the ones I keep coming back to — each written as a question, because that's what they still are."
        meta={[
          { label: "Entries", value: String(researchEntries.length) },
          { label: "Resolved", value: "None yet" },
        ]}
      />

      <Container className="py-14 sm:py-20">
        <ol className="space-y-5">
          {researchEntries.map((entry) => (
            <li key={entry.id} id={entry.slug} className="scroll-mt-28">
              <Reveal>
                <Panel ticks className="p-6 sm:p-9">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-sm tracking-[0.18em] text-accent">
                      [{entry.id}]
                    </span>
                    <span
                      className={cn(
                        "border px-2 py-1 font-mono text-[0.625rem] tracking-[0.16em] uppercase",
                        stateStyle[entry.state],
                      )}
                    >
                      {entry.state}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {entry.title}
                  </h2>

                  <p className="mt-4 border-l-2 border-accent/40 pl-4 text-lg leading-relaxed text-fg italic">
                    {entry.question}
                  </p>

                  <div className="mt-7 max-w-3xl space-y-5">
                    {entry.body.map((p) => (
                      <p key={p.slice(0, 40)} className="leading-[1.75] text-fg-dim">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-9 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
                    <div>
                      <p className="label">Open threads</p>
                      <ul className="mt-4 space-y-3">
                        {entry.threads.map((t) => (
                          <li
                            key={t.slice(0, 40)}
                            className="flex gap-3 text-sm leading-relaxed text-fg-dim"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent/60"
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-7">
                      <div>
                        <p className="label">Tags</p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {entry.tags.map((t) => (
                            <li key={t}>
                              <Tag>{t}</Tag>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {entry.related && entry.related.length > 0 && (
                        <div>
                          <p className="label">Where it shows up</p>
                          <ul className="mt-4 space-y-2.5">
                            {entry.related.map((slug) => {
                              const project = getProject(slug);
                              if (!project) return null;
                              return (
                                <li key={slug}>
                                  <Link
                                    href={`/projects/${slug}`}
                                    className="group inline-flex items-center gap-1.5 font-mono text-xs text-fg-dim transition-colors hover:text-accent"
                                  >
                                    {project.name}
                                    <ArrowUpRight
                                      className="size-3 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Panel>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-2xl font-mono text-sm leading-relaxed text-fg-muted">
          <span className="text-accent" aria-hidden="true">
            ${" "}
          </span>
          The goal is to turn some of these into actual work rather than leaving
          them as repositories collecting dust.
        </p>
      </Container>
    </>
  );
}
