"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CornerDownLeft,
  FlaskConical,
  FolderGit2,
  Home,
  Mail,
  Microscope,
  Search,
  User,
} from "lucide-react";
import { navItems, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

type PaletteContext = { open: () => void };

const Ctx = createContext<PaletteContext>({ open: () => {} });

export function useCommandPalette() {
  return useContext(Ctx);
}

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: ReactNode;
  href: string;
  external?: boolean;
};

const navIcons: Record<string, ReactNode> = {
  "/": <Home className="size-4" />,
  "/projects": <FolderGit2 className="size-4" />,
  "/research": <Microscope className="size-4" />,
  "/lab": <FlaskConical className="size-4" />,
  "/about": <User className="size-4" />,
};

/** Everything here is build-time constant, so the list is built once. */
const ITEMS: Item[] = (function buildItems(): Item[] {
  return [
    ...navItems.map((n) => ({
      id: `nav:${n.href}`,
      label: n.label,
      hint: n.path,
      group: "Navigate",
      icon: navIcons[n.href] ?? <Home className="size-4" />,
      href: n.href,
    })),
    ...projects.map((p) => ({
      id: `project:${p.slug}`,
      label: p.name,
      hint: p.id,
      group: "Projects",
      icon: <FolderGit2 className="size-4" />,
      href: `/projects/${p.slug}`,
    })),
    {
      id: "ext:github",
      label: "GitHub",
      hint: "github.com/Meeth-W",
      group: "External",
      icon: <GithubIcon className="size-4" />,
      href: site.github,
      external: true,
    },
    {
      id: "ext:email",
      label: "Email",
      hint: site.email,
      group: "External",
      icon: <Mail className="size-4" />,
      href: `mailto:${site.email}`,
      external: true,
    },
  ];
})();

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Ctx.Provider value={value}>
      {children}
      {isOpen && <Palette onClose={() => setIsOpen(false)} />}
    </Ctx.Provider>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q),
    );
  }, [query]);

  const run = useCallback(
    (item: Item) => {
      onClose();
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) =>
          results.length ? (c - 1 + results.length) % results.length : 0,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[cursor];
        if (item) run(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, cursor, run, onClose]);

  // Scroll the highlighted row into view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-void/80 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div className="relative w-full max-w-xl border border-line bg-overlay shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-fg-muted" aria-hidden="true" />
          {/* Autofocus is correct here: the dialog exists to be typed into. */}
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Results change, so the highlight goes back to the top.
              setCursor(0);
            }}
            placeholder="Search pages and projects…"
            aria-label="Search pages and projects"
            className="w-full bg-transparent py-4 font-mono text-sm text-fg outline-none placeholder:text-fg-muted"
          />
          <kbd className="hidden shrink-0 border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-muted sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center font-mono text-xs text-fg-muted">
              no matches. the ghost looked, there is nothing here.
            </p>
          )}

          {results.map((item, index) => {
            // A group heading appears wherever the group changes.
            const showGroup = item.group !== results[index - 1]?.group;
            const active = index === cursor;

            return (
              <div key={item.id}>
                {showGroup && (
                  <p className="label px-3 pt-3 pb-2">{item.group}</p>
                )}
                <button
                  type="button"
                  data-index={index}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => run(item)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                    active ? "bg-accent/12 text-fg" : "text-fg-dim",
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0",
                      active ? "text-accent" : "text-fg-muted",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {item.label}
                  </span>
                  <span className="hidden truncate font-mono text-[0.6875rem] text-fg-muted sm:block">
                    {item.hint}
                  </span>
                  {active &&
                    (item.external ? (
                      <ArrowUpRight
                        className="size-3.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                    ) : (
                      <CornerDownLeft
                        className="size-3.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                    ))}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
