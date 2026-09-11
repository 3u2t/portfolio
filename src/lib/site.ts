// ─── Site-wide constants. Edit here. ───────────────────────────
export const site = {
  name: "Tom",
  handle: "3u2t",
  location: "Germany",
  github: "https://github.com/3u2t",
  website: "https://four04.de",
  // Placeholder — mail on four04.de is not set up yet.
  // TODO: picks up real inbox once DNS/mail is fixed, then remove the note.
  emailPlaceholder: "hello@four04.de",
  emailNote: "placeholder — mail on my domain isn't set up yet",
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#homelab", label: "Homelab" },
  { href: "#contact", label: "Contact" },
] as const;
