import { labGroups } from "@/lib/lab";
import { Container } from "@/components/ui/Section";
import { Action } from "@/components/ui/Action";
import { Ghost } from "@/components/ghost/Ghost";
import { Reveal } from "@/components/effects/Reveal";

export function LabTeaser() {
  const names = labGroups.flatMap((g) => g.items.map((i) => i.name));
  const total = names.length;

  return (
    <section id="lab" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="ticked relative overflow-hidden border border-line bg-surface/60">
            <div className="flex flex-col items-start gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="label text-accent">07</span>
                  <span className="label">/ Lab</span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  Not everything needs to become a startup
                </h2>
                <p className="mt-4 leading-relaxed text-fg-dim">
                  {total} smaller things — a CNN behind a drawing canvas, an API
                  scratchpad, Minecraft mods that taught me more about
                  architecture than any course did, and a bot that fishes.
                </p>

                <Action href="/lab" className="mt-8">
                  Open the lab
                </Action>
              </div>

              <Ghost
                state="idle"
                className="w-20 shrink-0 self-center opacity-80 sm:w-28"
                label={null}
              />
            </div>

            {/* A slow strip of names along the bottom edge. Duplicated once so
                the loop is seamless; hidden from assistive tech. */}
            <div
              className="relative flex overflow-hidden border-t border-line py-3"
              aria-hidden="true"
            >
              <div className="animate-marquee flex shrink-0 gap-8 pr-8 font-mono text-[0.6875rem] tracking-[0.14em] whitespace-nowrap text-fg-muted uppercase">
                {[...names, ...names].map((name, i) => (
                  <span key={`${name}-${i}`} className="flex items-center gap-8">
                    {name}
                    <span className="text-accent/40">/</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
