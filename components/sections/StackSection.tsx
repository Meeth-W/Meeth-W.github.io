import { stackGroups } from "@/lib/stack";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Reveal } from "@/components/effects/Reveal";

export function StackSection({ index = "05" }: { index?: string }) {
  return (
    <Section id="stack">
      <SectionHeader
        index={index}
        label="Stack"
        title="What I actually build with"
        description="Grouped by what it's for rather than arranged as a wall of logos. Everything here appears in something I've shipped."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, i) => (
          <Reveal key={group.key} delay={i * 0.05} className="flex">
            <Panel className="flex w-full flex-col p-6">
              <div className="flex items-baseline gap-3">
                <span className="label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-sm tracking-[0.14em] text-fg uppercase">
                  {group.title}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                {group.note}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.8125rem] text-fg-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
