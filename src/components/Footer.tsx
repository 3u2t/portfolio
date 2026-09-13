import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[13px] text-zinc-500">
          Built with code, curiosity{" "}
          <span className="text-zinc-700">&amp;</span> too many terminal
          windows.
        </p>
        <div className="flex items-center gap-5 font-mono text-[13px] text-zinc-500">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-300"
          >
            GitHub
          </a>
          <a
            href={site.website}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-300"
          >
            {site.websiteLabel}
          </a>
          <span className="text-zinc-700">© {year} Tom</span>
        </div>
      </div>
      <p className="mx-auto max-w-5xl px-5 pb-6 font-mono text-[11px] leading-relaxed text-zinc-700 sm:px-8">
        privacy: this site counts visits (IP, browser, rough location) for
        basic stats — no cookies, no fingerprints, no ad-tech.
      </p>
    </footer>
  );
}
