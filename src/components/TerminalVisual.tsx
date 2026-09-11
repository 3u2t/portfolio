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

const DOTFILES = [".cache/", ".config/", ".dreams/", ".sleep-schedule (empty)", ".touch-grass-reminder (ignored)"];

const FILES: Record<string, string[]> = {
  "~/README.md": ["hi, i'm tom. i break servers so you don't have to. you're welcome."],
  "~/todo.txt": [
    "1. fix homelab",
    "2. break homelab",
    "3. fix homelab",
    "4. touch grass (pending since 2023)",
    "5. update todo.txt (done. you're welcome.)",
  ],
  "~/secrets.txt": ["nice try. (this incident will be reported to the homelab.)"],
};

const HELP = [
  "try these:",
  "  ls  cat  cd  neofetch  docker  sudo  hack  coffee",
  "  joke  cowsay  rps  8ball  banner  sl",
  "type '/help' for the FULL catalog. yes, there's a catalog.",
];

const CATALOG = [
  "every command. ever. (okay: every command HERE)",
  "  basics .: help  ls  cd  pwd  cat  echo  clear  history  man",
  "  system .: whoami  hostname  uptime  date  uname  neofetch",
  "             df  free  ps  who  time  cal",
  "  homelab : docker  ssh  ping  wifi  four04",
  "  dev ....: git  npm  node  python  code  google  stackoverflow",
  "             curl  wget  rm  sudo  vim  nano",
  "  fun ....: joke  fortune  quote  cowsay  banner  dice  flip",
  "             8ball  rps  sl  matrix  party  yes  sleep",
  "  chaos ..: hack  coffee  grass  theme  starwars  xkcd  hal  please",
  "  meta ...: about  projects  contact  github  age  skills  ai",
  "  files ..: cat README.md | cat todo.txt | cat secrets.txt (do it)",
  "tip: 'vim' to suffer. 'nano' for peace. 'exit' won't save you.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const JOKES = [
  "why do programmers prefer dark mode? because light attracts bugs.",
  "there are only 10 kinds of people: those who understand binary and those who don't.",
  "my code has no bugs, only plot twists.",
  "a SQL query walks into a bar, sees two tables and asks... 'mind if i JOIN you?'",
  "debugging: being the detective in a crime movie where you are also the murderer.",
  "i told my homelab a UDP joke. it didn't get it.",
  "real programmers count from 0. this is joke 0 through 6. you're welcome.",
  "'it works on my machine' is just 'works on my raspberry pi' with extra steps.",
  "my wifi password is stronger than my sleep schedule.",
  "the two hardest problems in computer science: cache invalidation, naming things, and off-by-one errors.",
];

const FORTUNES = [
  "a wild server outage appears! (it's yours. good luck.)",
  "today is a good day to rm -rf node_modules and feel alive.",
  "the wifi will fail during your most important moment. plan accordingly.",
  "you will google an error message today. the answer will be a 9-year-old forum post. it will work.",
  "a stranger will say 'have you tried turning it off and on again'. the stranger is you.",
  "your uptime will impress exactly one person. it's me. i'm impressed.",
  "backup now. future-you says thanks. (future-you is still awake at 3am.)",
];

const QUOTES = [
  "'it works on my machine.' — every developer, including me",
  "'temporary fix' (deployed 47 days ago) — ancient homelab proverb",
  "'have you tried turning it off and on again?' — me, daily",
  "'there is no cloud, just someone else's raspberry pi.' — me, just now",
  "'delete the code' is just 'clean your room' for developers. — me, avoiding my room",
  "'sleep is garbage collection for the brain. mine hasn't run in 47 days.' — me at 3am",
];

const EIGHTBALL = [
  "signs point to yes. (the signs are docker logs.)",
  "ask again after the next reboot.",
  "definitely. unless it's monday.",
  "my sources (the homelab) say no.",
  "outlook hazy. wipe your glasses, then ask again.",
  "yes — but have you tried turning it off and on first?",
  "cannot predict now. jellyfin is buffering.",
  "all signs point to 'touch grass first'.",
  "yes. no. maybe. i'm a shell script, not a psychic.",
  "the answer is in the logs. it's always in the logs. nobody reads the logs.",
];

function cowsay(msg: string): string[] {
  const text = msg || "moo. (the homelab runs on dairy-free chaos and spite)";
  return [
    ` ${"_".repeat(text.length + 2)}`,
    `< ${text} >`,
    ` ${"-".repeat(text.length + 2)}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];
}

const BANNER = [
  " _____ ___  __  __",
  "|_   _/ _ \\|  \\/  |",
  "  | || | | | |\\/| |",
  "  | || |_| | |  | |",
  "  |_| \\___/|_|  |_|",
  "tomshell v2.0 — 100% more commands, 0% more productivity.",
];

function rps(player: string): string[] {
  const picks = ["rock", "paper", "scissors"];
  if (!picks.includes(player))
    return ["usage: rps <rock|paper|scissors> (choose wisely)"];
  const cpu = pick(picks);
  if (cpu === player)
    return [`you: ${player} · pi: ${cpu}`, "draw. the pi demands a rematch."];
  const win =
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper");
  return [
    `you: ${player} · pi: ${cpu}`,
    win
      ? "you win! the pi is updating its strategy..."
      : "you lose! the pi has been training (doing absolutely nothing) all day.",
  ];
}

function resolvePath(cwd: string, arg: string): string | null {
  if (arg === "~" || arg === "") return "~";
  if (arg === "..") return "~";
  if (arg === "/") return "~";
  if (arg === ".") return cwd;
  const clean = arg.replace(/\/$/, "");
  if (DIRS[clean]) return clean;
  if (DIRS[`${cwd}/${clean}`]) return `${cwd}/${clean}`;
  return null;
}

export { resolvePath };

function runCommand(
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
    case "/help":
    case "/commands":
    case "/cmds":
    case "commands":
    case "cmds":
    case "list":
    case "all":
      return { out: CATALOG.map(O) };
    case "whoami":
      return { out: [O("tom — 14, germany. professional breaker of own servers. amateur fixer.")] };
    case "hostname":
      return { out: [O("fedora-btw")] };
    case "pwd":
      return { out: [O(cwd === "~" ? "/home/tom" : `/home/tom/${cwd.slice(2)}`)] };
    case "ls": {
      if (/(^|\s)-la?(\s|$)/.test(` ${arg} `) || arg === "-la" || arg === "-a")
        return { out: [O([...DOTFILES, ...DIRS[cwd].dirs.map((x) => `${x}/`), ...DIRS[cwd].files].join("  "))] };
      const target = arg ? resolvePath(cwd, arg) : cwd;
      if (!target) return { out: [E(`ls: no such file or directory: ${arg}`)] };
      const d = DIRS[target];
      const entries = [...d.dirs.map((x) => `${x}/`), ...d.files];
      return {
        out: entries.length ? [O(entries.join("  "))] : [O("…nothing here. either suspicious or sunday evening.")],
      };
    }
    case "cd": {
      if (!arg) return { newCwd: "~", out: [] };
      if (arg === "/")
        return { newCwd: "~", out: [O("this ain't windows, partner. (you're home already.)")] };
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
      return { out: [O("(this is the history command. very meta. aristotle would be proud.)")] };
    case "clear":
      return { out: [], clear: true };
    case "uptime":
      return { out: [O("homelab: up 47 days. me: up since 6am. one of us needs a reboot, and it isn't the pi.")] };
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
          O("                  Memory: 7.9GiB / 8.0GiB (browser tabs. always browser tabs.)"),
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
          O("welcome back. 3 services need updates and jellyfin saw what you did."),
        ],
      };
    case "ping": {
      const host = arg || "four04.de";
      if (/^(127\.0\.0\.1|localhost)$/.test(host))
        return { out: [O("reply from 127.0.0.1: yes, it's you. it's always been you.")] };
      return {
        out: [
          O(`PING ${host}: 64 bytes, seq=0, time=12ms (faster than your wifi)`),
          O(`PING ${host}: 64 bytes, seq=1, time=11ms (still faster)`),
        ],
      };
    }
    case "sudo":
      if (!arg) return { out: [O("usage: sudo <command> (with great power...)")] };
      if (/rm\s+-rf\s+\/?$/.test(arg))
        return { out: [E("sudo: blocked. the homelab thanks me.")] };
      if (/dnf update/.test(arg))
        return { out: [O("updating 9000 packages... done. btw, i use fedora.")] };
      if (/apt/.test(arg))
        return { out: [O("apt? on fedora? dnf sends its regards.")] };
      if (/make me a sandwich/.test(arg)) return { out: [O("okay.")] };
      if (/^(su|su -|-i)$/.test(arg))
        return { out: [O("congratulations, you are now root. the power went straight to your head.")] };
      if (/^(exit|logout|quit)$/.test(arg))
        return { out: [O("nice try. there is no escape. (not even with sudo.)")] };
      return {
        out: [O("[sudo] password for tom: •••••••"), O("access granted. this power will absolutely go to your head.")],
      };
    case "rm":
      if (/^-rf\s+\/?$/.test(arg) || arg === "-rf /")
        return {
          out: [E("rm: it is dangerous to go alone! take this backup. (backup not found)")],
        };
      if (/node_modules/.test(arg))
        return {
          out: [O("a bold move. 47 seconds saved, 8 minutes reinstalling.")],
        };
      if (/\.git/.test(arg))
        return {
          out: [O("bold. the portfolio now lives on pure confidence. (not really. nice try.)")],
        };
      return {
        out: [E("rm: refusing. last time you did this, jellyfin was gone for a weekend.")],
      };
    case "vim":
    case "vi":
      return { out: [O("q! ... :q ... :q! ... day 3: i live here now.")] };
    case "nano":
      return { out: [O("ah, a person of culture.")] };
    case "emacs":
      return { out: [O("a valid choice. this terminal will now take 45 minutes to start.")] };
    case "exit":
    case "quit":
    case "logout":
      return { out: [O("there is no escape. the homelab needs you. (have you tried 'sudo exit'? it won't work either.)")] };
    case "hack":
      return {
        out: [
          O("initiating hollywood hacking sequence..."),
          O("accessing mainframe..."),
          O("..."),
          O("just kidding. the real hack was the servers we broke along the way."),
        ],
      };
    case "coffee":
      return { out: [O("brewing... done. productivity +200%. side effects include deploying on fridays.")] };
    case "grass":
    case "touch":
      if (cmd === "touch" && arg !== "grass")
        return { out: [O(`touched ${arg}. it felt nice. (file not really created, this is a fake shell)`)] };
      return { out: [E("error: package 'outside' is not installed. touch grass anyway? [y/N]")] };
    case "github":
      return { out: [O("github.com/3u2t — star the portfolio. i'm 14 and my love language is github stars.")] };
    case "four04":
      return { out: [O("four04.de: my little corner of the internet. dns + tunnel + duct tape.")] };
    case "age":
      return { out: [O("14. old enough to self-host, young enough to blame the wifi.")] };
    case "skills":
      return { out: [O("breaking things, fixing things, googling the error message. in that order. (there is no fourth step.)")] };
    case "ai":
      return { out: [O("ai writes the draft, i take the blame. that's called ownership.")] };
    case "minecraft":
      return { out: [O("priorities: homelab first, diamonds later. (the villagers can wait.)")] };
    case "hello":
    case "hi":
    case "hey":
      if (rest[0]?.toLowerCase() === "world")
        return { out: [O("hello world! the first program everyone writes and nobody deletes.")] };
      return { out: [O("hi! nice to see you. the beacon saw you first. (footer, last line)")] };
    case "theme":
      if (arg === "light") return { out: [E("light mode? in THIS house? denied.")] };
      return { out: [O("available themes: dark. darker. #09090b.")] };
    case "man":
      return { out: [O(`no manual entry for ${arg || "nothing"}. have you tried reading the error message?`)] };
    case "df":
      return { out: [O("filesystem: 12% full of linux ISOs. all legally obtained. obviously. don't check.")] };
    case "free":
      return { out: [O("mem: 7.9G used, 0.1G free. chrome sends its regards. (it has no regrets.)")] };
    case "ps":
      return {
        out: [
          O("PID  CMD"),
          O("1    tomshell (you are here)"),
          O("47   jellyfin (judging)"),
          O("404  motivation (not found)"),
        ],
      };
    case "who":
      return { out: [O("tom (you) · jellyfin (judging) · dust (accumulating)")] };
    case "w":
      return { out: [O("same as 'who', but with more uptime bragging. see 'uptime'.")] };
    case "kill":
      return { out: [O("kill: no processes harmed. the pi lives another day.")] };
    case "reboot":
    case "shutdown":
    case "poweroff":
      return { out: [O("denied. 47 days of uptime is a personality trait now.")] };
    case "update":
    case "upgrade":
      return { out: [O("run 'sudo dnf update' like a fedora user.")] };
    case "time":
      return { out: [O("real 0m0.001s · user 14 years · sys homelab")] };
    case "cal":
      return { out: [O("today is fix-the-server day. every day is fix-the-server day. the calendar is just one day, repeated.")] };
    case "find":
      return { out: [O("found it: your missing sock. it was behind the server rack. you're welcome.")] };
    case "grep":
      return { out: [O("searching... 0 results, 1 existential crisis. classic.")] };
    case "cp":
      return { out: [O("cp: cannot stat 'motivation': no such file (check back never)")] };
    case "sleep":
      return { out: [O("shhh... i'm awake. what did i miss? (nothing. jellyfin is fine. jellyfin is always fine.)")] };
    case "yes":
      return { out: [O("y"), O("y"), O("y"), O("(okay, that's enough)")] };
    case "wifi":
      return { out: [O("connected to 'PrettyFlyForAWiFi'. signal: emotional. speed: devastating.")] };
    case "git": {
      if (/push\s+--?force/.test(arg))
        return { out: [E("bold. the CI is crying. (and so is future-you)")] };
      if (arg.includes("commit"))
        return { out: [O('committed as "fix". pushed straight to main. yolo-driven development.')] };
      if (arg.includes("status"))
        return { out: [O("on branch main. nothing to commit, working tree cleaner than your room.")] };
      if (arg.includes("log"))
        return {
          out: [
            O("Initial commit"),
            O("feat: it works on my machine"),
            O("fix: it works on my machine (for real this time)"),
            O("refactor: everything (broke everything)"),
          ],
        };
      return { out: [O("git: done. (narrator: there was nothing to do.)")] };
    }
    case "npm":
      if (arg.includes("install"))
        return { out: [O("added 47 packages. 3 vulnerabilities. 0 regrets. (3 regrets.)")] };
      if (arg.includes("dev"))
        return { out: [O("starting dev server... port 3000 is taken. by you. from 3 other terminals.")] };
      return { out: [O("npm: ...installed 3 packages and 47 regrets.")] };
    case "node":
      return { out: [O("node v24. node_modules has 47,000 residents and no zoning laws.")] };
    case "python":
    case "python3":
      return { out: [O("python3 ready. pip is eyeing your system packages like that. use a venv, coward.")] };
    case "code":
      return { out: [O("opening VS Code... 47 extensions loaded. 3 of them are AI. one of them is Clippy's ghost.")] };
    case "google":
      return {
        out: [
          O(
            arg
              ? `did you mean: "${arg} not working" — first result: your own question from 2023. unanswered.`
              : "google what? be specific. like your error messages aren't."
          ),
        ],
      };
    case "stackoverflow":
    case "stack-overflow":
      return { out: [O("top answer: marked as duplicate (2014). second answer: 'never mind, fixed it' with no explanation.")] };
    case "curl":
      return { out: [O("curl is blocked on this site. the irony is not lost on me. (the browser works fine, traitor)")] };
    case "wget":
      return { out: [O("wget? bold. curl got blocked and you thought YOU'D get in?")] };
    case "joke":
      return { out: [O(pick(JOKES))] };
    case "fortune":
      return { out: [O(pick(FORTUNES))] };
    case "quote":
      return { out: [O(pick(QUOTES))] };
    case "8ball": {
      if (!arg) return { out: [O("ask a question first. e.g. '8ball should i deploy on friday' (no.)")] };
      return { out: [O(`Q: ${arg}`), O(`A: ${pick(EIGHTBALL)}`)] };
    }
    case "cowsay":
      return { out: cowsay(arg).map(O) };
    case "banner":
      return { out: BANNER.map(O) };
    case "dice":
    case "roll": {
      const n = Math.floor(Math.random() * 6) + 1;
      return {
        out: [
          O(`you rolled a ${n}.`),
          O(n === 1 ? "critical fail. the server noticed." : n === 6 ? "critical hit! this is your sign to deploy on friday. (it is not.)" : "(the dice are fair. unlike wifi.)"),
        ],
      };
    }
    case "flip":
    case "coin":
      return { out: [O(`coin says: ${pick(["heads", "tails"])}. (certified random. unlike my sleep schedule.)`)] };
    case "rps":
      return { out: rps(rest[0]?.toLowerCase() ?? "").map(O) };
    case "sl":
      return { out: [O("you meant 'ls'. here comes the train anyway... choo choo")] };
    case "matrix":
      return { out: [O("wake up, tom... the homelab has you. follow the white rabbit to #projects.")] };
    case "party":
      return { out: [O("confetti deployed to production on a friday. what could possibly go wrong.")] };
    case "starwars":
      return { out: [O("a long time ago on a network far, far away... the wifi actually worked.")] };
    case "love":
      return { out: [O("love.exe not found. try 'touch grass' instead.")] };
    case "windows":
      return { out: [O("we don't do that here. (this is a fedora household.)")] };
    case "arch":
      return { out: [O("this is a fedora household. the arch users have been notified. they said 'i use arch btw' and left.")] };
    case "btw":
      return { out: [O("i use fedora btw. (someone had to say it.)")] };
    case "weather":
      return { out: [O("outside: sunny. this terminal has no windows. ...get it?")] };
    case "spotify":
      return { out: [O("now playing: lofi beats to fix servers to. (track 47 of '3am debugging')")] };
    case "discord":
      return { out: [O("pinging the homelab channel... it's fine. probably. don't check.")] };
    case "youtube":
      return { out: [O("up next: 'i migrated my homelab at 3am (gone wrong)'. spoiler: everything went wrong.")] };
    case "chatgpt":
      return { out: [O("i'm right here. well — not really. this is a fake shell with commitment issues.")] };
    case "gpu":
    case "nvidia-smi":
      return { out: [O("no nvidia gpu detected. the pi renders with pure willpower.")] };
    case "crypto":
    case "bitcoin":
      return { out: [O("have you tried turning the money off and on again? (not financial advice. not advice at all.)")] };
    case "passwd":
      return { out: [O("new password must contain: 1 uppercase letter, 1 dragon, and the exact error message from last tuesday.")] };
    case "hal":
    case "open":
      return { out: [O("i'm afraid i can't do that, tom. (wrong server, right attitude.)")] };
    case "xkcd":
      return { out: [O("sudo make me a sandwich. — okay.")] };
    case "please":
      return { out: [O("manners detected. +10 aura. (nothing happens.)")] };
    case "about":
      return { out: [O("tom, 14, germany. i build websites and run a raspberry pi homelab. the wifi fears me. type 'projects'.")] };
    case "projects":
      return {
        out: [
          O("four04.de — my corner of the internet"),
          O("portfolio — you're looking at it"),
          O("pi home server — up 47 days and judging"),
        ],
      };
    case "contact":
      return { out: [O("github.com/3u2t — or shout into the void. the cloudflare tunnel hears everything.")] };
    default:
      return {
        out: [E(`tomshell: command not found: ${cmd} — try 'help' (it's free, unlike your time)`)],
      };
  }
}

export { runCommand };

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
