import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { researchEntries } from "@/lib/research";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Action";
import { Panel } from "@/components/ui/Panel";
import { Reveal } from "@/components/effects/Reveal";

export function ResearchPreview() {
  return (
    <Section id="research">
      <SectionHeader
        index="04"
        label="Research.log"
        title="Questions I haven't finished with"
        description="Not interests — open engineering problems, each with something concrete that would settle it."
        action={<TextLink href="/research">Full log</TextLink>}
      />

      <Reveal>
        <Panel className="divide-y divide-line">
          {researchEntries.slice(0, 4).map((entry) => (
            <Link
              key={entry.id}
              href={`/research#${entry.slug}`}
              className="group flex flex-col gap-2 px-5 py-6 transition-colors hover:bg-white/2 sm:flex-row sm:items-baseline sm:gap-6 sm:px-8"
            >
              <span className="label shrink-0 transition-colors group-hover:text-accent">
                [{entry.id}]
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent-bright sm:text-xl">
                  {entry.title}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                  {entry.question}
                </span>
              </span>
              <ArrowRight
                className="hidden size-4 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                aria-hidden="true"
              />
            </Link>
          ))}
        </Panel>
      </Reveal>
    </Section>
  );
}
