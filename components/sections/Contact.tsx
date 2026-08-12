import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: `@${site.githubUser}`,
    href: site.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Instagram",
    value: "@meeth._05",
    href: site.instagram,
    icon: InstagramIcon,
    external: true,
  },
];

export function Contact({ index = "08" }: { index?: string }) {
  return (
    <Section id="contact">
      <SectionHeader
        index={index}
        label="Contact"
        title="Say something"
        description="Open to conversations about AI systems, security engineering, and problems that don't have a tidy answer yet. No form — a form would need a server, and this site doesn't have one."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {channels.map(({ label, value, href, icon: Icon, external }, i) => (
          <Reveal key={label} delay={i * 0.06} className="flex">
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className="group ticked relative flex w-full flex-col justify-between gap-8 border border-line bg-surface/60 p-6 transition-colors hover:border-accent/35 hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className="label transition-colors group-hover:text-accent">
                  {label}
                </span>
                <Icon
                  className="size-4 text-fg-muted transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <span className="font-mono text-sm break-all text-fg-dim transition-colors group-hover:text-fg">
                {value}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
