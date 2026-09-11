"use client";

import { useEffect, useRef, useState } from "react";

// Interactive fake shell for the hero. Nothing executes — every command
// is answered from the tables below. Keep it short, harmless and funny.

type Line = { text: string; kind: "cmd" | "out" | "err" };

const BOOT: Line[] = [
  { text: "whoami", kind: "cmd" },
  { text: "tom — 14, germany", kind: "out" },
  { text: "uptime --pretty", kind: "cmd" },
  { text: "homelab: up 47 days", kind: "out" },
  { text: "docker ps --format '{{.Names}}'", kind: "cmd" },
  { text: "jellyfin  immich  vaultwarden", kind: "out" },
  { text: "cloudflared tunnel info", kind: "cmd" },
  { text: "tunnel: healthy · 0 open ports", kind: "out" },
];

const DIRS: Record<string, { dirs: string[]; files: string[] }> = {
  "~": {
    dirs: ["projects", "homelab", "homework"],
    files: ["README.md", "todo.txt", "secrets.txt"],
  },
  "~/projects": {
    dirs: [],
    files: ["four04/", "portfolio/", "pi-home-server/"],
  },
  "~/homelab": {
    dirs: [],
    files: ["jellyfin/", "immich/", "vaultwarden/", "dust/"],
  },
  "~/homework": { dirs: [], files: [] },
};

const FILES: Record<string, string[]> = {
  "~/README.md": ["hi, i'm tom. i break servers so you don't have to."],
  "~/todo.txt": [
    "1. fix homelab",
    "2. break homelab",
    "3. fix homelab",
    "4. touch grass (pending since 2023)",
  ],
  "~/secrets.txt": ["nice try."],
};

const HELP = [
  "available commands:",
  "  help ls cd pwd cat echo clear history",
  "  whoami uptime date uname neofetch",
  "  docker ssh ping sudo rm vim nano",
  "  hack coffee grass github age skills",
  "pro tip: there are easter eggs. try 'sudo'.",
];

export function resolvePath(cwd: string, arg: string): string | null {
  if (arg === "~" || arg === "") return "~";
  if (arg === "..") {
    if (cwd === "~") return "~";
    return "~";
  }
  if (arg === "/") return "~";
  if (arg === ".") return cwd;
  const clean = arg.replace(/\/$/, "");
  if (DIRS[clean]) return clean;
  if (DIRS[`${cwd}/${clean}`]) return `${cwd}/${clean}`;
  return null;
}

export function runCommand(
  raw: string,
  cwd: string
): { out: Line[]; clear?: boolean; newCwd?: string } {
  const input = raw.trim();
  if (!input) return { out: [] };
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(" ");
  const O = (text: string): Line => ({ text, kind: "out" });
  const E = (text: string): Line => ({ text, kind: "err" });

  switch (cmd.toLowerCase()) {
    case "help":
    case "?":
      return { out: HELP.map(O) };
    case "whoami":
      return { out: [O("tom — 14, germany. professional breaker of own servers.")] };
    case "hostname":
      return { out: [O("fedora-btw")] };
    case "pwd":
      return { out: [O(cwd === "~" ? "/home/tom" : `/home/tom/${cwd.slice(2)}`)] };
    case "ls": {
      const target = arg ? resolvePath(cwd, arg) : cwd;
      if (!target) return { out: [E(`ls: no such file or directory: ${arg}`)] };
      const d = DIRS[target];
      const entries = [...d.dirs.map((x) => `${x}/`), ...d.files];
      return {
        out: entries.length ? [O(entries.join("  "))] : [O("…nothing here. suspicious.")],
      };
    }
    case "cd": {
      if (!arg) return { newCwd: "~", out: [] };
      const target = resolvePath(cwd, arg);
      if (!target) return { out: [E(`cd: no such file or directory: ${arg}`)] };
      return { newCwd: target, out: [] };
    }
    case "cat": {
      if (!arg) return { out: [E("cat: missing operand (even the terminal judges you)")] };
      const key = arg.startsWith("~") ? arg : `${cwd}/${arg}`;
      const content = FILES[key] ?? FILES[arg];
      if (!content) return { out: [E(`cat: ${arg}: No such file (or no such luck)`)] };
      return { out: content.map(O) };
    }
    case "echo":
      return {
        out: [
          O(
            arg
              .replaceAll("$USER", "tom")
              .replaceAll("$HOME", "/home/tom")
              .replaceAll("$SHELL", "/bin/tomshell") || ""
          ),
        ],
      };
    case "history":
      return { out: [O("(this is the history command. very meta.)")] };
    case "clear":
      return { out: [], clear: true };
    case "uptime":
      return { out: [O("homelab: up 47 days. me: up since 6am. send coffee.")] };
    case "date":
      return { out: [O(new Date().toString())] };
    case "uname":
      return {
        out: [
          O(
            "Linux fedora-btw 6.14.0-tom-custom #1 SMP PREEMPT_DYNAMIC (it compiled, ship it) x86_64 GNU/Linux"
          ),
        ],
      };
    case "neofetch":
    case "neofetch.exe":
      return {
        out: [
          O("      _____      tom@fedora-btw"),
          O("     / ___ \\     ─────────────"),
          O("    | |   | |    OS: Fedora (btw)"),
          O("    | |___| |    Host: Raspberry Pi (spiritually)"),
          O("     \\_____/     Uptime: 47 days"),
          O("                  Shell: tomshell"),
          O("                  DE: GNOME (obviously)"),
          O("                  CPU: hamster wheel @ 4.2GHz"),
          O("                  Memory: 7.9GiB / 8.0GiB (browser tabs)"),
        ],
      };
    case "docker":
      return {
        out: [
          O("NAME            STATUS"),
          O("jellyfin        Up 47 days"),
          O("immich          Up 47 days"),
          O("vaultwarden     Up 47 days"),
          O("homework        Exited (0) three weeks ago"),
        ],
      };
    case "ssh":
      return {
        out: [
          O("connecting to homelab..."),
          O("welcome back. 3 services need updates and jellyfin is judging you."),
        ],
      };
    case "ping":
      return {
        out: [
          O(`PING ${arg || "four04.de"}: 64 bytes, seq=0, time=12ms (faster than your wifi)`),
          O(`PING ${arg || "four04.de"}: 64 bytes, seq=1, time=11ms (still faster)`),
        ],
      };
    case "sudo":
      if (!arg) return { out: [O("usage: sudo <command> (with great power...)")] };
      if (/rm\s+-rf\s+\/?$/.test(arg))
        return { out: [E("sudo: blocked. the homelab thanks me.")] };
      return {
        out: [O("[sudo] password for tom: •••••••"), O("access granted. please don't.")] ,
      };
    case "rm":
      if (/^-rf\s+\/?$/.test(arg) || arg === "-rf /")
        return {
          out: [E("rm: it is dangerous to go alone! take this backup. (backup not found)")],
        };
      return {
        out: [E("rm: refusing. last time you did this, jellyfin was gone for a weekend.")],
      };
    case "vim":
    case "vi":
      return { out: [O("q! ... :q ... :q! ... HOW DO I EXIT THIS THING")] };
    case "nano":
      return { out: [O("ah, a person of culture.")] };
    case "emacs":
      return { out: [O("a valid choice. this terminal will now take 45 minutes to start.")] };
    case "exit":
    case "quit":
    case "logout":
      return { out: [O("there is no escape. the homelab needs you.")] };
    case "hack":
      return {
        out: [
          O("initiating hollywood hacking sequence..."),
          O("accessing mainframe..."),
          O("..."),
          O("just kidding. go build something instead."),
        ],
      };
    case "coffee":
      return { out: [O("brewing... done. productivity +200%. (coffee not included)")] };
    case "grass":
    case "touch":
      if (cmd === "touch" && arg !== "grass")
        return { out: [O(`touched ${arg}. it felt nice. (file not really created, this is a fake shell)`)] };
      return { out: [E("command not found: grass. install package 'outside'? [y/N]")] };
    case "github":
      return { out: [O("github.com/3u2t — star the portfolio. i'm 14 and need validation.")] };
    case "four04":
      return { out: [O("four04.de: my little corner of the internet. dns + tunnel + duct tape.")] };
    case "age":
      return { out: [O("14. old enough to run servers, young enough to blame the wifi.")] };
    case "skills":
      return { out: [O("breaking things, fixing things, googling error messages. in that order.")] };
    case "ai":
      return { out: [O("ai is a tool, not a replacement. this terminal was still written by a human. probably.")] };
    case "minecraft":
      return { out: [O("priorities: homelab first, diamonds later.")] };
    case "hello":
    case "hi":
    case "hey":
      return { out: [O("hi! nice to see you. the beacon saw you first. (footer, last line)")] };
    case "theme":
      if (arg === "light") return { out: [E("light mode? in THIS house? denied.")] };
      return { out: [O("available themes: dark. dark mode. #09090b.")] };
    case "man":
      return { out: [O(`no manual entry for ${arg || "nothing"}. have you tried reading the error message?`)] };
    default:
      return {
        out: [E(`tomshell: command not found: ${cmd} — try 'help' (it's free, unlike your time)`)],
      };
  }
}

const MAX_LINES = 120;

export default function TerminalVisual() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [bootCount, setBootCount] = useState(reduced ? BOOT.length : 0);
  const [lines, setLines] = useState<Line[]>([]);
  const [cwd, setCwd] = useState("~");
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ready = bootCount >= BOOT.length;

  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => setBootCount((c) => c + 1), 500);
    return () => clearTimeout(t);
  }, [bootCount, ready]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, bootCount]);

  function submit(cmd: string) {
    const trimmed = cmd.trim();
    const echo: Line = { text: trimmed, kind: "cmd" };
    if (!trimmed) {
      setLines((prev) => [...prev.slice(-MAX_LINES), echo]);
      return;
    }
    if (trimmed === "history") {
      const histLines: Line[] = history.map((h) => ({ text: `  ${h}`, kind: "out" as const }));
      setLines((prev) => [...prev.slice(-MAX_LINES), echo, ...histLines]);
      setHistory((prev) => [...prev, trimmed]);
      setHistIndex(-1);
      return;
    }
    const result = runCommand(trimmed, cwd);
    if (result.newCwd) setCwd(result.newCwd);
    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [...prev.slice(-MAX_LINES), echo, ...result.out].slice(-MAX_LINES));
    }
    setHistory((prev) => [...prev, trimmed]);
    setHistIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Enter is handled by the form submit; here only history navigation.
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    }
  }

  const prompt = cwd === "~" ? "~" : `~${cwd.slice(1)}`;

  return (
    <div className="animate-drift overflow-hidden rounded-xl border border-white/10 bg-[#0e0e11]/90 shadow-[0_0_60px_-20px_rgba(52,211,153,0.25)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          tom@fedora: {prompt}
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/90">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          online
        </span>
      </div>
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="terminal-scroll h-60 cursor-text overflow-y-auto p-4 font-mono text-[12.5px] leading-6"
        role="log"
        aria-label="Interactive demo terminal. Type help to list commands."
      >
        {BOOT.slice(0, bootCount).map((line, i) => (
          <p
            key={`b${i}`}
            className={line.kind === "cmd" ? "text-zinc-200" : "text-zinc-500"}
          >
            {line.kind === "cmd" ? `$ ${line.text}` : line.text}
          </p>
        ))}
        {lines.map((line, i) => (
          <p
            key={`l${i}`}
            className={
              line.kind === "cmd"
                ? "text-zinc-200"
                : line.kind === "err"
                  ? "text-amber-400/90"
                  : "text-zinc-500"
            }
          >
            {line.kind === "cmd" ? `$ ${line.text}` : line.text}
          </p>
        ))}
        {ready ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(value);
              setValue("");
            }}
            className="flex items-center gap-2 text-zinc-200"
          >
            <span aria-hidden className="shrink-0 text-emerald-400">
              $
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input — type help for commands"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full flex-1 bg-transparent text-[16px] text-zinc-100 caret-emerald-400 outline-none sm:text-[12.5px]"
            />
          </form>
        ) : (
          <p className="text-zinc-200">
            $ <span className="animate-blink text-emerald-400">▊</span>
          </p>
        )}
      </div>
      <p className="border-t border-white/[0.07] px-4 py-1.5 font-mono text-[10.5px] text-zinc-600">
        tomshell — type <span className="text-zinc-400">help</span> and press
        enter. nothing here can break anything, promise.
      </p>
    </div>
  );
}
