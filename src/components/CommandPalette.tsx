"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

// Command palette (Cmd/Ctrl+K). Data + filtering are pure and tested;
// the component only handles UI, focus and navigation.

export type PaletteEntry = {
  id: string;
  kind: "section" | "project" | "action";
  label: string;
  hint: string;
  keywords: string;
  href?: string;
  external?: string;
  copy?: string;
};

export function buildEntries(): PaletteEntry[] {
  const sections: PaletteEntry[] = [
    { id: "home", kind: "section", label: "Home", hint: "top", keywords: "start landing hero", href: "#home" },
    { id: "about", kind: "section", label: "About", hint: "whoami", keywords: "about me intro", href: "#about" },
    { id: "now", kind: "section", label: "Currently building", hint: "now", keywords: "currently working on status", href: "#now" },
    { id: "projects", kind: "section", label: "Projects", hint: "work", keywords: "projects work apps", href: "#projects" },
    { id: "stack", kind: "section", label: "Stack & skills", hint: "tech", keywords: "stack skills technologies tools", href: "#stack" },
    { id: "homelab", kind: "section", label: "Homelab", hint: "pi server", keywords: "homelab raspberry pi server selfhosted", href: "#homelab" },
    { id: "github", kind: "section", label: "GitHub", hint: "repos", keywords: "github repositories code", href: "#github" },
    { id: "contact", kind: "section", label: "Contact", hint: "say hi", keywords: "contact email reach", href: "#contact" },
  ];
  const projectEntries: PaletteEntry[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    kind: "project",
    label: p.title,
    hint: p.tagline,
    keywords: p.stack.join(" "),
    href: `/projects/${p.slug}`,
  }));
  const actions: PaletteEntry[] = [
    { id: "copy-github", kind: "action", label: "Copy GitHub URL", hint: site.github, keywords: "copy github link url", copy: site.github },
    { id: "copy-email", kind: "action", label: "Copy email (placeholder)", hint: site.emailPlaceholder, keywords: "copy email mail contact", copy: site.emailPlaceholder },
    { id: "open-github", kind: "action", label: "Open GitHub profile", hint: "↗", keywords: "open github profile external", external: site.github },
    { id: "open-site", kind: "action", label: "Open Website", hint: "↗", keywords: "open website external", external: site.website },
  ];
  return [...sections, ...projectEntries, ...actions];
}

export function filterPalette(entries: PaletteEntry[], query: string): PaletteEntry[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return entries;
  return entries.filter((e) => {
    const hay = `${e.label} ${e.hint} ${e.keywords} ${e.kind}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export function openPalette() {
  window.dispatchEvent(new CustomEvent("open-palette"));
}

const KIND_LABEL: Record<PaletteEntry["kind"], string> = {
  section: "go",
  project: "project",
  action: "do",
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const entries = useMemo(() => buildEntries(), []);
  const results = useMemo(() => filterPalette(entries, query), [entries, query]);

  const openRef = useRef(false);

  useEffect(() => {
    const reset = () => {
      setQuery("");
      setActive(0);
      setNotice("");
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) {
          openRef.current = false;
          setOpen(false);
        } else {
          reset();
          openRef.current = true;
          setOpen(true);
        }
      }
    };
    const onOpen = () => {
      reset();
      openRef.current = true;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(entry: PaletteEntry) {
    if (entry.copy) {
      navigator.clipboard?.writeText(entry.copy).then(
        () => setNotice(`copied: ${entry.copy}`),
        () => setNotice("copy failed — select it manually")
      );
      return;
    }
    if (entry.external) {
      window.open(entry.external, "_blank", "noopener");
      setOpen(false);
      return;
    }
    if (entry.href) {
      setOpen(false);
      const url =
        entry.href.startsWith("#") && window.location.pathname !== "/"
          ? `/${entry.href}`
          : entry.href;
      window.location.href = url;
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[active];
      if (entry) run(entry);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="mx-auto mt-24 w-[calc(100%-2.5rem)] max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0e0e11] shadow-[0_0_80px_-20px_rgba(52,211,153,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4">
          <span aria-hidden className="font-mono text-sm text-emerald-400">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="type a section, project, or action..."
            aria-label="Search sections, projects and actions"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-12 w-full bg-transparent font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
          <kbd className="hidden rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:block">
            esc
          </kbd>
        </div>
        <div ref={listRef} className="max-h-72 overflow-y-auto p-1.5" role="listbox" aria-label="Results">
          {results.length === 0 ? (
            <p className="px-3 py-5 text-center font-mono text-[13px] text-zinc-500">
              nothing found. (have you tried turning it off and on again?)
            </p>
          ) : (
            results.map((entry, i) => (
              <button
                key={entry.id}
                role="option"
                aria-selected={i === active}
                data-index={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => run(entry)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-emerald-400/10" : "bg-transparent"
                }`}
              >
                <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                  {KIND_LABEL[entry.kind]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-sm ${i === active ? "text-emerald-200" : "text-zinc-200"}`}>
                    {entry.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-zinc-500">
                    {entry.hint}
                  </span>
                </span>
                <span aria-hidden className="font-mono text-xs text-zinc-600">
                  {i === active ? "↵" : ""}
                </span>
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2 font-mono text-[10.5px] text-zinc-600">
          <span>↑↓ navigate · enter open · esc close</span>
          <span className={notice ? "text-emerald-400" : ""}>{notice || "tomshell palette"}</span>
        </div>
      </div>
    </div>
  );
}
