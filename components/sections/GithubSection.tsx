import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Action";
import { GithubPanel } from "@/components/github/GithubPanel";
import { Reveal } from "@/components/effects/Reveal";

export function GithubSection() {
  return (
    <Section id="github">
      <SectionHeader
        index="06"
        label="GitHub"
        title="The public record"
        description="This site is hosted from a GitHub repository, so it may as well read from one. Fetched in the browser — there is no server here to hide a token behind, and none is needed."
        action={
          <TextLink href={site.github} external>
            @{site.githubUser}
          </TextLink>
        }
      />

      <Reveal>
        <GithubPanel />
      </Reveal>
    </Section>
  );
}
