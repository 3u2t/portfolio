"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#09090b]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#home" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] font-mono text-sm text-emerald-400"
          >
            ~
          </span>
          <span className="font-mono text-sm text-zinc-200">
            tom<span className="text-zinc-500">@homelab</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              GitHub
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-palette"))
            }
            className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300 sm:flex"
          >
            <span aria-hidden>⌘K</span>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md border border-white/10 text-zinc-300 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="font-mono text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="border-t border-white/[0.07] bg-[#09090b]/95 px-5 py-4 backdrop-blur-md md:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-[15px] text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-white/10 bg-white/[0.05] px-3 py-2.5 text-center font-mono text-sm text-zinc-200"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
