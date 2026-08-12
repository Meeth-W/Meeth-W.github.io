import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

import {
  categoryMeta,
  getProject,
  projects,
  statusMeta,
} from "@/lib/projects";
import { Container } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge, Tag } from "@/components/ui/Badge";
import { Action } from "@/components/ui/Action";
import { Flow } from "@/components/projects/Flow";
import { Reveal } from "@/components/effects/Reveal";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${statusMeta[project.status].label}`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* ---- Header ---- */}
      <header className="border-b border-line pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All projects
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="label text-accent">{project.id}</span>
            <span className="label">/ {categoryMeta[project.category]}</span>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{project.name}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-dim">
            {project.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.github && (
              <Action
                href={project.github}
                external
                variant="primary"
                icon={<GithubIcon className="size-4" />}
              >
                Source
              </Action>
            )}
            {project.demo && (
              <Action href={project.demo} external>
                Live demo
              </Action>
            )}
          </div>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16">
          {/* ---- Body ---- */}
          <div className="min-w-0 order-2 lg:order-1">
            {project.flow && (
              <Reveal>
                <Panel className="mb-14 p-6 sm:p-8">
                  <Flow steps={project.flow} label="Pipeline" />
                </Panel>
              </Reveal>
            )}

            <div className="space-y-14">
              {project.sections?.map((section, i) => (
                <Reveal key={section.heading}>
                  <section>
                    <div className="flex items-center gap-3">
                      <span className="label text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-mono text-sm tracking-[0.18em] text-fg uppercase">
                        {section.heading}
                      </h2>
                      <span className="rule h-px flex-1" aria-hidden="true" />
                    </div>

                    {section.paragraphs && (
                      <div className="mt-6 space-y-5">
                        {section.paragraphs.map((p) => (
                          <p
                            key={p.slice(0, 40)}
                            className="leading-[1.75] text-fg-dim"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.bullets && (
                      <ul className="mt-6 space-y-3.5">
                        {section.bullets.map((b) => (
                          <li
                            key={b.slice(0, 40)}
                            className="flex gap-3.5 leading-relaxed text-fg-dim"
                          >
                            <span
                              className="mt-2.5 size-1 shrink-0 rounded-full bg-accent/70"
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---- Metadata rail ---- */}
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <Panel className="p-6">
                <dl>
                  <div className="pb-4">
                    <dt className="label">Status</dt>
                    <dd className="mt-2.5 font-mono text-sm text-fg-dim">
                      {statusMeta[project.status].label}
                    </dd>
                  </div>
                  <div className="border-t border-line py-4">
                    <dt className="label">Category</dt>
                    <dd className="mt-2.5 font-mono text-sm text-fg-dim">
                      {categoryMeta[project.category]}
                    </dd>
                  </div>
                  <div className="border-t border-line py-4">
                    <dt className="label">Period</dt>
                    <dd className="mt-2.5 font-mono text-sm text-fg-dim">
                      {project.period}
                    </dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="label">Stack</dt>
                    <dd className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Panel>
            </div>
          </aside>
        </div>
      </Container>

      {/* ---- Next project ---- */}
      <Container className="pb-8">
        <Link
          href={`/projects/${next.slug}`}
          className="group ticked relative flex items-center justify-between gap-6 border border-line bg-surface/60 p-6 transition-colors hover:border-accent/35 hover:bg-surface sm:p-8"
        >
          <div className="min-w-0">
            <span className="label">Next</span>
            <span className="mt-3 block truncate font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent-bright sm:text-2xl">
              {next.name}
            </span>
          </div>
          <ArrowRight
            className="size-5 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </article>
  );
}
