// ─── Non-programming technical skills. TO UPDATE: edit groups. ─
// Deliberately no programming-languages-as-skills list.
// Languages/frameworks appear only as factual "used in" badges on projects.

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Linux",
    blurb: "My daily environment. I learn by using it, not from slides.",
    items: ["Fedora Workstation", "Debian", "Raspberry Pi OS", "Bash basics", "SSH", "PuTTY"],
  },
  {
    title: "Self-hosting & containers",
    blurb: "Running my own stuff on a Pi and keeping it alive.",
    items: ["Docker", "Docker Compose", "CasaOS", "Portainer", "External HDD storage", "Basic server admin"],
  },
  {
    title: "Networking & Cloudflare",
    blurb: "Home networking plus safe remote access.",
    items: ["Cloudflare DNS", "Cloudflare Tunnel", "DNS basics", "Home networking", "cloudflared", "No open ports"],
  },
  {
    title: "VoIP",
    blurb: "Early experiments — still learning the fundamentals.",
    items: ["SIP basics", "Self-hosted experiments", "Home-network testing"],
  },
  {
    title: "Privacy (practical)",
    blurb: "User/dev perspective — not a security professional.",
    items: ["Mullvad VPN", "Mullvad Browser", "uBlock Origin", "Bitwarden", "Signal", "Proton Mail", "VeraCrypt", "DNS privacy"],
  },
  {
    title: "AI-assisted coding",
    blurb: "A tool I steer — I read, test and own what ships.",
    items: ["GitHub", "VS Code", "OpenCode", "AI coding assistants", "LLM dev workflows"],
  },
  {
    title: "Hardware",
    blurb: "Real-world value over spec sheets.",
    items: ["PCs & components", "CPUs / GPUs", "SSDs & HDDs", "Home servers", "Linux hardware", "Networking gear"],
  },
  {
    title: "FPV drones",
    blurb: "Electronics, radio, firmware, troubleshooting.",
    items: ["RadioMaster Pocket ELRS", "Eachine EV800DM", "Rush Solo Tank VTX", "GEPRC FCs", "Betaflight", "GPS", "6S LiPo", "HOTA D6 Pro"],
  },
];

// Compact "tech I use" badges for the Stack section (no proficiency claims).
export const stackBadges: { category: string; items: string[] }[] = [
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Data", items: ["SQLite", "PostgreSQL"] },
  { category: "Infra", items: ["Linux", "Docker", "Docker Compose", "Raspberry Pi", "Cloudflare", "Vercel"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "SSH", "PuTTY"] },
  { category: "Homelab", items: ["CasaOS", "Portainer", "Home Assistant", "Jellyfin", "Immich", "Vaultwarden"] },
];
