// ─── Projects. TO UPDATE: add/remove an entry, keep the shape. ──
// Shown on the homepage (#projects) and on /projects/[slug].
// status: "live" | "building" | "experiment"
// Only use links that actually exist. Leave a link out instead of guessing.

export type ProjectStatus = "live" | "building" | "experiment";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  statusLabel: string;
  stack: string[];
  links: { label: string; href: string }[];
  github?: string;
  body: string[];
  highlights: string[];
};

export const statusDot: Record<ProjectStatus, string> = {
  live: "bg-emerald-400",
  building: "bg-amber-400",
  experiment: "bg-zinc-400",
};

export const projects: Project[] = [
  {
    slug: "infra",
    title: "Private Infrastructure",
    tagline: "My personal domain + self-hosted ecosystem.",
    status: "live",
    statusLabel: "live — maintained",
    stack: ["Cloudflare", "Cloudflare Tunnel", "Linux", "Docker", "Raspberry Pi"],
    links: [],
    body: [
      "My private domain and homelab are where my web projects and infrastructure meet. I run services myself and learn how DNS, tunnels and containers fit together.",
      "Nothing enterprise-grade — a setup I built, broke a few times, and keep improving. That's kind of the point. Domain is private for security.",
    ],
    highlights: [
      "Cloudflare Tunnel for safe remote access without port forwarding — no open ports",
      "Docker services on Linux, maintained by me (incl. Home Assistant for smart home)",
      "Hosts my experiments and links everything together",
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    tagline: "This site — built and maintained by me.",
    status: "building",
    statusLabel: "you're looking at it",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    links: [],
    github: "https://github.com/3u2t/portfolio",
    body: [
      "My portfolio itself is one of my projects. Next.js + TypeScript + Tailwind, deployed on Vercel with a Docker fallback for my Pi.",
      "I keep it honest: no fake experience, no invented stats. GitHub data loads live, and if the API is down it shows placeholders instead of fake numbers.",
    ],
    highlights: [
      "App Router + TypeScript, component-based",
      "Live GitHub section with graceful fallback",
      "Standalone output so it also runs in Docker on ARM",
    ],
  },
  {
    slug: "pi-home-server",
    title: "Raspberry Pi Home Server",
    tagline: "My homelab: self-hosted services on a Pi 4.",
    status: "live",
    statusLabel: "running at home",
    stack: ["Raspberry Pi 4 8GB", "Debian", "Docker", "CasaOS", "Cloudflare Tunnel", "SSH"],
    links: [],
    body: [
      "A Raspberry Pi 4 (8GB) running Debian/Raspberry Pi OS with Docker and CasaOS, plus an external HDD for storage. Remote access goes through Cloudflare Tunnel — no open ports — and SSH for admin.",
      "I treat it as infrastructure, not an app list: updates, backups, and figuring out why something stopped at 11pm is the actual hobby.",
    ],
    highlights: [
      "Services I run: Jellyfin, Immich, Home Assistant, Vaultwarden, Portainer, ConvertX, MySpeed, cloudflared",
      "External HDD storage, CasaOS + Portainer for management",
      "Cloudflare Tunnel + SSH, basic home networking",
    ],
  },
  {
    slug: "lazerdim",
    title: "lazerdim.de",
    tagline: "My personal linktree — all my links in one place.",
    status: "live",
    statusLabel: "live",
    stack: ["HTML", "CSS", "JavaScript", "Vercel", "Cloudflare"],
    links: [{ label: "lazerdim.de", href: "https://lazerdim.de" }],
    body: [
      "lazerdim.de is my personal link hub — a clean, fast single-page site that collects my socials, projects and contact links in one place.",
      "Built as a lightweight static site and deployed on Vercel behind Cloudflare. No framework bloat, just direct links that people actually use.",
    ],
    highlights: [
      "Single-page linktree, fast and mobile-first",
      "Deployed on Vercel + Cloudflare",
      "Central hub for my GitHub, projects and contact",
    ],
  },
  {
    slug: "lanmap",
    title: "LANMap",
    tagline: "See what's on your network — self-hosted LAN discovery + monitoring.",
    status: "building",
    statusLabel: "building",
    stack: ["TypeScript", "Node.js", "Express", "React", "Vite", "SQLite", "Docker", "Go"],
    links: [],
    github: "https://github.com/3u2t/lanmap",
    body: [
      "I run a Raspberry Pi at home and could never remember what was on my LAN — so I built a small self-hosted dashboard that discovers devices, pings the ones I care about, and shows what happened.",
      "Discovery via ARP/neighbour table + ping sweep + reverse DNS, presence tracking so a single dropped ping doesn't flap, plus latency/packet-loss monitoring with history, network map, gateway/internet checks and alerts — all live over WebSocket.",
    ],
    highlights: [
      "LAN discovery + presence tracking with 3-strike rule",
      "Monitoring with latency/loss history, uPlot charts and alerts",
      "Self-hosted: Docker + CasaOS ready, optional Go agent, Windows build",
    ],
  },
  {
    slug: "servertimeline",
    title: "ServerTimeline",
    tagline: "Self-hosted infrastructure history + network observation.",
    status: "building",
    statusLabel: "building",
    stack: ["TypeScript", "React", "Vite", "Express", "Tauri", "Docker"],
    links: [],
    github: "https://github.com/3u2t/servertimeline",
    body: [
      "I wanted to know what changed on my homelab and when — so I built a self-hosted timeline that records events, endpoints and containers instead of just showing the current state.",
      "Local monitoring only: interfaces, listening ports, routes, systemd and Docker, with an event timeline, network view and optional desktop app. No internet scanning, nothing remote.",
    ],
    highlights: [
      "Event timeline: what changed, when, which service and IP",
      "Network observation with interfaces, endpoints and containers",
      "Web + desktop (Tauri), Docker-ready, demo mode included",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
