import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProject } from "@/lib/projects";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Terminal, SystemStatus } from "@/components/terminal/Terminal";
import { StatusBadge, Tag } from "@/components/ui/Badge";
import { Flow } from "@/components/projects/Flow";
import { Reveal } from "@/components/effects/Reveal";

const processes: {
  name: string;
  state: string;
  tone?: "accent" | "signal" | "muted";
}[] = [
  { name: "basis-sdk", state: "running", tone: "accent" },
  { name: "malware-tracer", state: "running", tone: "signal" },
  { name: "research", state: "running", tone: "signal" },
  { name: "portfolio", state: "building", tone: "accent" },
  { name: "sleep", state: "not found", tone: "muted" },
];

const exploring = [
  "AI memory",
  "Token efficiency",
  "RAG systems",
  "Behavioural cybersecurity",
  "Graph intelligence",
  "Local inference",
];

export function CurrentFocus() {
  const basis = getProject("basis-sdk");
  if (!basis) return null;

  return (
    <Section id="focus">
      <SectionHeader
        index="02"
        label="Current focus"
        title="What's running right now"
        description="One thesis project taking most of the time, and a set of questions running in the background behind it."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        {/* ---- The main thing ---- */}
        <Reveal className="flex">
          <Panel ticks className="group flex w-full flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label text-accent">Currently building</span>
              <StatusBadge status={basis.status} />
            </div>

            <h3 className="mt-6 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              <Link
                href={`/projects/${basis.slug}`}
                className="transition-colors hover:text-accent-bright"
              >
                {basis.name}
              </Link>
            </h3>

            <p className="mt-4 max-w-xl leading-relaxed text-fg-dim">
              Behavioural anomaly detection that installs as Django middleware,
              learns what an application&apos;s normal traffic looks like, and
              flags the actors who stop matching it — shipped with the attack
              scenarios and benchmark harness used to prove it works.
            </p>

            {basis.flow && <Flow steps={basis.flow} className="mt-8" />}

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {basis.technologies.slice(0, 5).map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>

            <Link
              href={`/projects/${basis.slug}`}
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-accent uppercase transition-colors hover:text-accent-bright"
            >
              Read the case study
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Panel>
        </Reveal>

        {/* ---- Process monitor + exploring ---- */}
        <Reveal delay={0.08} className="flex flex-col gap-5">
          <Terminal title="ghostyy@localhost: ~/ps" className="flex-1">
            <SystemStatus rows={processes} />
          </Terminal>

          <Panel className="p-6">
            <p className="label">Exploring</p>
            <ul className="mt-5 space-y-3">
              {exploring.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-sm text-fg-dim"
                >
                  <span className="text-accent/60" aria-hidden="true">
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
