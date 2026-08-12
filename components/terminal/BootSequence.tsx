"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Command, Cursor, Output } from "./Terminal";

export type BootStep = { command: string; output: string };

const CHAR_MS = 16;
const AFTER_OUTPUT_MS = 340;

/**
 * Types through a fixed script once, on mount, then stops. Nothing here is
 * load-bearing — every fact in the script also appears as ordinary text
 * elsewhere in the hero, so a reader who never sees the animation loses
 * nothing.
 *
 * Under prefers-reduced-motion the whole script renders immediately.
 */
export function BootSequence({ steps }: { steps: BootStep[] }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const done = step >= steps.length;

  useEffect(() => {
    if (reduced || done) return;

    const current = steps[step];

    // Phase 1: type the command one character at a time.
    if (typed < current.command.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), CHAR_MS);
      return () => clearTimeout(t);
    }

    // Phase 2: reveal the output, then move to the next step.
    if (!showOutput) {
      const t = setTimeout(() => setShowOutput(true), 90);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setStep((n) => n + 1);
      setTyped(0);
      setShowOutput(false);
    }, AFTER_OUTPUT_MS);
    return () => clearTimeout(t);
  }, [reduced, done, step, typed, showOutput, steps]);

  if (reduced) {
    return (
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.command}>
            <Command>{s.command}</Command>
            <Output>{s.output}</Output>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((s, i) => {
        if (i > step) return null;

        const isCurrent = i === step;
        const text = isCurrent ? s.command.slice(0, typed) : s.command;
        const outputVisible = !isCurrent || showOutput;

        return (
          <div key={s.command}>
            <Command>
              {text}
              {isCurrent && !outputVisible && <Cursor />}
            </Command>
            {outputVisible && (
              <Output>
                {s.output}
                {done && i === steps.length - 1 && <Cursor />}
              </Output>
            )}
          </div>
        );
      })}
    </div>
  );
}
