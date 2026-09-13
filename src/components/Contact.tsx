import { site } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.015]"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="contact"
          title="Say hi."
          lede="Simplest way to reach me is GitHub. Email below is a placeholder until mail on my domain works again."
        />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-emerald-400/25"
            >
              <p className="font-mono text-xs text-zinc-500">github</p>
              <p className="mt-1 font-medium text-zinc-100">
                @{site.handle} ↗
              </p>
            </a>
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
              <p className="font-mono text-xs text-zinc-500">email</p>
              <p className="mt-1 font-medium text-zinc-100">
                {site.emailPlaceholder}
              </p>
              <p className="mt-1 font-mono text-[11px] text-amber-400/80">
                {site.emailNote}
              </p>
            </div>
            <a
              href={site.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-emerald-400/25"
            >
              <p className="font-mono text-xs text-zinc-500">website</p>
              <p className="mt-1 font-medium text-zinc-100">{site.websiteLabel} ↗</p>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
