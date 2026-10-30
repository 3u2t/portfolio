// ─── Site-wide constants. Edit here. ───────────────────────────
export const site = {
  name: "Tom",
  handle: "3u2t",
  location: "Germany",
  github: "https://github.com/3u2t",
  // Email hidden for privacy — share privately on request
  emailPlaceholder: "on request",
  emailNote: "shared privately",
} as const;

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/scanner", label: "Scanner" },
  { href: "/#projects", label: "Projects" },
  { href: "/#fpv", label: "FPV" },
  { href: "/#terminal", label: "Terminal" },
  { href: "/#contact", label: "Contact" },
] as const;
