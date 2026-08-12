import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { Action } from "@/components/ui/Action";
import { Ghost } from "@/components/ghost/Ghost";
import { Terminal, Command, Output, Cursor } from "@/components/terminal/Terminal";

export const metadata: Metadata = {
  title: "404 — Ghost lost",
  description: "This page has drifted off somewhere.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Ghost
        state="lost"
        glow
        className="animate-ghost-drift w-28 sm:w-36"
        label="A lost ghost"
      />

      <p className="mt-10 flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.3em] text-fg-muted uppercase">
        404
        <span className="text-fg-muted/50" aria-hidden="true">
          {"//"}
        </span>
        <span className="text-accent">Ghost lost</span>
      </p>

      <h1 className="mt-6 font-display text-3xl font-medium tracking-tight sm:text-5xl">
        <span className="text-gradient">This one drifted off</span>
      </h1>

      <p className="mt-5 max-w-md leading-relaxed text-fg-dim">
        The page you were looking for isn&apos;t here. It may have been renamed,
        it may never have existed, or it may have simply stopped resolving.
      </p>

      <Terminal
        title="ghostyy@localhost: ~"
        className="mt-10 w-full max-w-md text-left"
      >
        <Command>ls ./this-page</Command>
        <Output className="text-fg-muted">
          no such file or directory
        </Output>
        <Command className="mt-4">
          cd ~<Cursor />
        </Command>
      </Terminal>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Action href="/" variant="primary">
          Return home
        </Action>
        <Action href="/projects">View projects</Action>
      </div>
    </Container>
  );
}
