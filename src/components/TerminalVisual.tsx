"use client";

import { useEffect, useState } from "react";

const LINES = [
  "$ whoami",
  "tom — 14, germany",
  "$ uptime --pretty",
  "homelab: up 47 days",
  "$ docker ps --format '{{.Names}}'",
  "jellyfin  immich  vaultwarden",
  "$ cloudflared tunnel info",
  "tunnel: healthy · 0 open ports",
];

export default function TerminalVisual() {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? LINES.length
      : 2
  );

  useEffect(() => {
    if (count >= LINES.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 650);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div
      aria-hidden
      className="animate-drift overflow-hidden rounded-xl border border-white/10 bg-[#0e0e11]/90 shadow-[0_0_60px_-20px_rgba(52,211,153,0.25)] backdrop-blur"
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          tom@fedora: ~
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/90">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          online
        </span>
      </div>
      <div className="terminal-scroll min-h-[168px] overflow-x-auto p-4 font-mono text-[12.5px] leading-6">
        {LINES.slice(0, count).map((line, i) => (
          <p
            key={i}
            className={line.startsWith("$") ? "text-zinc-200" : "text-zinc-500"}
          >
            {line}
          </p>
        ))}
        <p className="text-zinc-200">
          $ <span className="animate-blink text-emerald-400">▊</span>
        </p>
      </div>
    </div>
  );
}
