"use client";

import { useEffect, useState } from "react";

// Konami easter egg: ↑↑↓↓←→←→BA shows a toast. Pure matcher is exported
// so it stays testable; the component only wires keyboard + toast.

export const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export function konamiStep(index: number, key: string): number {
  const k = key.length === 1 ? key.toLowerCase() : key;
  if (k === KONAMI[index]) return index + 1;
  return k === KONAMI[0] ? 1 : 0;
}

export default function Konami() {
  const [count, setCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = Number(window.localStorage.getItem("konami-count") ?? 0);
      return Number.isFinite(saved) && saved > 0 ? saved : 0;
    } catch {
      return 0;
    }
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable ||
          e.metaKey ||
          e.ctrlKey ||
          e.altKey)
      ) {
        return;
      }
      index = konamiStep(index, e.key);
      if (index >= KONAMI.length) {
        index = 0;
        setCount((c) => {
          const next = c + 1;
          try {
            localStorage.setItem("konami-count", String(next));
          } catch {
            /* private mode etc. */
          }
          return next;
        });
        setVisible(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [visible, count]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[70] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 rounded-xl border border-emerald-400/30 bg-[#0e0e11]/95 px-5 py-4 shadow-[0_0_60px_-15px_rgba(52,211,153,0.4)] backdrop-blur"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] text-emerald-400 uppercase">
        ↑↑↓↓←→←→BA accepted
      </p>
      <p className="mt-1.5 text-sm text-zinc-200">
        {count <= 1
          ? "konami accepted. the homelab salutes you. (+10 aura)"
          : `again?? bold. aura total: ${count * 10}. the pi pretends to be impressed.`}
      </p>
    </div>
  );
}
