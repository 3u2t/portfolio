// ─── Site-wide constants. Edit here. ───────────────────────────
export const site = {
  name: "Tom",
  handle: "3u2t",
  location: "Germany",
  github: "https://github.com/3u2t",
  // Canonical URL — injected via env for privacy, fallback is generic placeholder
  // Set NEXT_PUBLIC_SITE_URL in Vercel (Production) to your private domain.
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  // Email hidden for privacy — share privately on request
  emailPlaceholder: "on request",
  emailNote: "shared privately",
  websiteLabel: "Website",
  linktree: "https://lazerdim.de",
  linktreeLabel: "lazerdim.de",
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#homelab", label: "Homelab" },
  { href: "#contact", label: "Contact" },
] as const;
