import { site } from "@/lib/site";
import TerminalVisual from "./TerminalVisual";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      {/* subtle background glow + grid, kept faint on purpose */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 35%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-12 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
            <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            14 · Germany · Fedora + Raspberry Pi
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Building things with code, Linux{" "}
            <span className="text-zinc-500">&amp;</span> curiosity.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">
            I&apos;m Tom — a 14-year-old developer and technology enthusiast
            from Germany. I build web applications, experiment with self-hosted
            infrastructure and enjoy understanding how things work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300"
            >
              View Projects
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/12 bg-white/[0.04] px-5 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              GitHub ↗
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] text-zinc-500">
            <div className="flex gap-2">
              <dt className="text-zinc-600">os</dt>
              <dd className="text-zinc-400">fedora workstation</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-zinc-600">homelab</dt>
              <dd className="text-zinc-400">rpi 4 · docker</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-zinc-600">net</dt>
              <dd className="text-zinc-400">cloudflare tunnel</dd>
            </div>
          </dl>
        </div>

        <TerminalVisual />
      </div>
    </section>
  );
}
