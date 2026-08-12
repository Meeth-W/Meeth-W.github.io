import type { Metadata } from "next";
import {
  Brain,
  Database,
  FlaskConical,
  Layers,
  Shield,
  Share2,
} from "lucide-react";

import { site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Terminal, Command, Output } from "@/components/terminal/Terminal";
import { Ghost } from "@/components/ghost/Ghost";
import { StackSection } from "@/components/sections/StackSection";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meeth Waghela — known online as Ghostyy. Final-year IT engineering student at Thakur College of Engineering & Technology, building AI systems, security tooling and full-stack applications.",
  alternates: { canonical: "/about" },
};

const interests = [
  {
    icon: Brain,
    title: "AI systems",
    note: "Local models, retrieval, and the engineering underneath rather than the demo on top.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    note: "Behavioural detection, anomaly scoring, and attacks that don't have a signature yet.",
  },
  {
    icon: Layers,
    title: "Full-stack systems",
    note: "Whole applications — API, storage, interface — because the interesting bugs live at the seams.",
  },
  {
    icon: Share2,
    title: "Graph systems",
    note: "Structure as the thing being queried, not as an afterthought bolted onto rows.",
  },
  {
    icon: Database,
    title: "Data engineering",
    note: "Picking a store by the shape of the question instead of by habit.",
  },
  {
    icon: FlaskConical,
    title: "Research",
    note: "Turning the recurring questions into something measurable rather than another repository.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        path="~/about"
        title="Meeth Waghela"
        lead="Known online as Ghostyy. Final-year IT engineering student, and someone who has never been able to leave a system alone once it started behaving strangely."
        meta={[
          { label: "Alias", value: "ghostyy" },
          { label: "Location", value: site.location },
        ]}
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          {/* ---- Prose ---- */}
          <div className="space-y-6 text-lg leading-[1.75] text-fg-dim">
            <p>
              I&apos;m in my final year of a B.E. in Information Technology at{" "}
              <span className="text-fg">
                Thakur College of Engineering &amp; Technology
              </span>
              . Most of what I actually know came from building things slightly
              beyond what I could justify at the time, then having to understand
              them well enough to fix what broke.
            </p>
            <p>
              The through-line across my work is a distrust of black boxes.
              Almost everything I build with language models runs locally,
              because a hosted API hides exactly the constraints — latency,
              memory, context cost — that determine how a system should be
              designed. The same instinct shows up in security: I would rather
              generate the attack, watch the telemetry, and find out whether
              detection holds than read a benchmark that says it does.
            </p>
            <p>
              Right now most of my time goes to{" "}
              <span className="text-fg">BASIS SDK</span>, my engineering thesis
              — behavioural anomaly detection shipped as Django middleware,
              along with the experiment suite that measures it honestly enough
              to report its own blind spots.
            </p>
            <p className="text-fg-muted">
              I&apos;m not especially interested in building another CRUD
              application. Most of my projects start as questions I
              couldn&apos;t leave alone, and the good ones end with a clearer
              understanding of why the obvious approach doesn&apos;t work.
            </p>
          </div>

          {/* ---- Terminal card ---- */}
          <div className="space-y-5">
            <Terminal title="ghostyy@localhost: ~/whoami">
              <div className="space-y-4">
                <div>
                  <Command>whoami</Command>
                  <Output>meeth waghela · ghostyy</Output>
                </div>
                <div>
                  <Command>cat /etc/education</Command>
                  <Output>
                    {site.education.degree}
                    <br />
                    <span className="text-fg-dim">
                      {site.education.institution}
                    </span>
                    <br />
                    <span className="text-fg-muted">
                      {site.education.year}
                    </span>
                  </Output>
                </div>
                <div>
                  <Command>groups</Command>
                  <Output>ai security systems data research</Output>
                </div>
              </div>
            </Terminal>

            <Panel className="flex items-center gap-6 p-6">
              <Ghost
                state="thinking"
                className="w-16 shrink-0"
                label={null}
              />
              <p className="font-mono text-xs leading-relaxed text-fg-muted">
                The ghost isn&apos;t the absence of something. It&apos;s what
                remains after it leaves.
              </p>
            </Panel>
          </div>
        </div>
      </Container>

      {/* ---- Interests ---- */}
      <Section id="interests">
        <SectionHeader
          index="01"
          label="Interests"
          title="Where my attention goes"
          description="Six areas that keep showing up in what I choose to build."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map(({ icon: Icon, title, note }, i) => (
            <Reveal key={title} delay={i * 0.04} className="flex">
              <Panel className="flex w-full flex-col p-6">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {note}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Section>

      <StackSection index="02" />
      <Contact index="03" />
    </>
  );
}
