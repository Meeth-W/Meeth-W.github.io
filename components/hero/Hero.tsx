import { FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { site, systemInfo } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { Action } from "@/components/ui/Action";
import { Ghost } from "@/components/ghost/Ghost";
import { Terminal } from "@/components/terminal/Terminal";
import { BootSequence, type BootStep } from "@/components/terminal/BootSequence";

const boot: BootStep[] = [
  { command: "whoami", output: "meeth waghela · ghostyy" },
  { command: "cat ~/.focus", output: "ai · security · systems · research" },
  {
    command: "./status --now",
    output: "building BASIS SDK — behavioural anomaly detection",
  },
];

export function Hero() {
  return (
    <section className="relative pt-14 pb-8 sm:pt-20 sm:pb-16">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
          {/* ---- Identity ---- */}
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.3em] uppercase">
              <span
                className="animate-pulse-dot size-1.5 rounded-full bg-signal"
                aria-hidden="true"
              />
              <span className="text-fg-dim">Ghostyy</span>
              <span className="text-fg-muted" aria-hidden="true">
                {"//"}
              </span>
              <span className="text-signal">Online</span>
            </p>

            <h1 className="mt-6 font-display text-5xl leading-[0.95] font-medium tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Meeth Waghela</span>
            </h1>

            <p
              className="mt-5 font-mono text-xs tracking-[0.24em] text-accent uppercase sm:text-sm"
              aria-label="AI, security, systems, research"
            >
              AI <Sep /> Security <Sep /> Systems <Sep /> Research
            </p>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg-dim">
              I build systems, break them on purpose, and go looking for the
              part that gave.
            </p>
            <p className="mt-3 max-w-lg leading-relaxed text-fg-muted">
              Most of my projects start as questions I couldn&apos;t leave
              alone — behavioural security, AI that has to run on my own
              hardware, and what data looks like when you stop storing it in
              rows.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Action
                href="/projects"
                variant="primary"
                icon={<FolderGit2 className="size-4" aria-hidden="true" />}
              >
                View projects
              </Action>
              <Action
                href={site.github}
                external
                icon={<GithubIcon className="size-4" />}
              >
                GitHub
              </Action>
            </div>

            {/* ---- System info ---- */}
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-4">
              {systemInfo.map((row) => (
                <div key={row.key}>
                  <dt className="label">{row.key}</dt>
                  <dd className="mt-2 font-mono text-[0.6875rem] tracking-wide text-fg-dim uppercase">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Ghost + terminal ---- */}
          <div className="order-first flex flex-col items-center gap-8 lg:order-last lg:items-stretch">
            <Ghost
              state="online"
              glow
              className="animate-ghost-drift w-32 shrink-0 sm:w-40 lg:w-44 lg:self-center"
              label="Ghostyy, the site mascot"
            />

            <Terminal
              title="ghostyy@localhost: ~"
              className="w-full"
              bodyClassName="min-h-[13.5rem]"
            >
              <BootSequence steps={boot} />
            </Terminal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Sep() {
  return (
    <span className="mx-1.5 text-fg-muted" aria-hidden="true">
      ·
    </span>
  );
}
