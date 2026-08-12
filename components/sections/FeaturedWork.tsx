import { featuredProjects } from "@/lib/projects";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Action";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/effects/Reveal";

export function FeaturedWork() {
  // The lead project already has the whole Current Focus section to itself.
  const rest = featuredProjects.filter((p) => p.slug !== "basis-sdk");

  return (
    <Section id="work">
      <SectionHeader
        index="03"
        label="Featured work"
        title="Projects worth reading about"
        description="Each of these has a case study — what the problem was, what I actually built, and where it falls short."
        action={<TextLink href="/projects">All projects</TextLink>}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06} className="flex">
            <ProjectCard project={project} className="w-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
