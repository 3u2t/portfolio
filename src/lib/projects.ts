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
    slug: "silence-filler",
    title: "Silence Filler",
    tagline: "Spotify when it is quiet, paused when other audio plays.",
    status: "live", statusLabel: "available on GitHub",
    stack: ["Python", "Windows", "Spotify"], links: [],
    github: "https://github.com/3u2t/silence-filler",
    body: ["A Windows tray app that pauses Spotify when other apps play audio and resumes it when things go quiet.", "It uses Windows media controls and does not need a Spotify API key."],
    highlights: ["Audio-aware playback", "Tray controls and configurable exceptions", "Windows media controls"],
  },
  {
    slug: "pi-backup-hub",
    title: "Pi Backup Hub",
    tagline: "A project for automating backups.",
    status: "live", statusLabel: "available on GitHub",
    stack: ["Python", "Backups"], links: [],
    github: "https://github.com/3u2t/pi-backup-hub",
    body: ["A backup automation project focused on making recurring backup workflows easier to manage.", "The source code is available on GitHub."],
    highlights: ["Scheduled backups", "Backup workflow automation"],
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
      "My portfolio itself is one of my projects. Next.js + TypeScript + Tailwind, built with a focus on clear presentation.",
      "I keep it honest: no fake experience, no invented stats. GitHub data loads live, and if the API is down it shows placeholders instead of fake numbers.",
    ],
    highlights: [
      "App Router + TypeScript, component-based",
      "Live GitHub section with graceful fallback",
      "Responsive, component-based design",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
