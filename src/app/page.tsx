import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import TerminalVisual from "@/components/TerminalVisual";

export default function Home() {
  return (
    <div id="home" className="mx-auto max-w-4xl px-5 pt-28 pb-20 sm:px-8">
      <section aria-labelledby="scanner-heading" className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
        <p className="font-mono text-xs text-emerald-400">TRY IT OUT</p>
        <h1 id="scanner-heading" className="mt-3 text-2xl font-semibold text-zinc-100 sm:text-3xl">File scanner</h1>
        <p className="mt-2 text-sm text-zinc-400">Check a file with VirusTotal. Inspired by AhmedScanner.</p>
        <Link href="/scanner" className="mt-5 inline-block rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-300">Open scanner →</Link>
      </section>

      <section id="about" className="scroll-mt-24 py-12">
        <p className="font-mono text-xs text-emerald-400">HEY, I'M TOM</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">I like building things.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">I'm a young developer from Germany. I enjoy making useful things, trying ideas out and figuring out how they work along the way.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Build", "Web apps, small tools and projects I actually use."],
            ["Explore", "Linux, technology and learning by doing."],
            ["Beyond code", "FPV drones, hardware and open source."],
          ].map(([title, text]) => <div key={title} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"><h3 className="font-medium text-zinc-100">{title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></div>)}
        </div>
      </section>

      <section id="terminal" aria-labelledby="terminal-heading" className="scroll-mt-24 border-t border-white/[0.08] py-10">
        <div className="mb-5">
          <p className="font-mono text-xs text-emerald-400">TOMSHELL</p>
          <h2 id="terminal-heading" className="mt-2 text-xl font-semibold text-zinc-100">Try the terminal.</h2>
          <p className="mt-2 text-sm text-zinc-400">A little interactive demo. Type <span className="font-mono text-zinc-200">help</span> to explore.</p>
        </div>
        <TerminalVisual />
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-white/[0.08] py-10">
        <h2 className="text-xl font-semibold text-zinc-100">Projects</h2>
        <p className="mt-2 text-sm text-zinc-400">A few things I've been working on.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {projects.map(project => (
            <article key={project.slug} className="flex flex-col rounded-xl border border-white/[0.08] bg-[#111113] p-5">
              <p className="font-mono text-xs text-emerald-400">{project.statusLabel}</p>
              <h3 className="mt-2 text-lg font-medium text-zinc-100">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>
              <p className="mt-4 text-xs text-zinc-500">{project.stack.slice(0, 3).join(" · ")}</p>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-block text-sm text-emerald-300 hover:underline">Project details →</Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="contributions-heading" className="border-t border-white/[0.08] py-10">
        <p className="font-mono text-xs text-emerald-400">OPEN SOURCE</p>
        <h2 id="contributions-heading" className="mt-2 text-xl font-semibold text-zinc-100">Contributing to projects I like.</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["CLI-Anything", "Betaflight CLI harness", "https://github.com/HKUDS/CLI-Anything/pull/595"],
            ["Dynamic Island for Windows", "Audio and interface fixes", "https://github.com/devcode90/Dynamic-Island-for-Windows/pull/128"],
            ["Fluence Desktop", "Multilingual interface and dashboard fixes", "https://github.com/raviumeshkulkarni-web/Fluence-Desktop/pull/15"],
            ["adhd", "Frame selection and parser improvements", "https://github.com/UditAkhourii/adhd/pull/66"],
          ].map(([name, description, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border border-white/[0.08] p-4 transition-colors hover:border-emerald-400/40"><span className="font-medium text-zinc-100">{name} ↗</span><span className="mt-1 block text-sm text-zinc-400">{description}</span></a></li>)}
        </ul>
        <a href="https://github.com/pulls?q=is%3Apr+author%3A3u2t" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-emerald-300 hover:underline">More pull requests on GitHub ↗</a>
      </section>

      <section aria-labelledby="now-heading" className="border-t border-white/[0.08] py-10">
        <h2 id="now-heading" className="text-xl font-semibold text-zinc-100">Currently into</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
          <li>• Building and improving web projects</li>
          <li>• Exploring Linux and networking</li>
          <li>• Trying AI coding tools while staying hands-on with the code</li>
        </ul>
      </section>

      <section id="fpv" aria-labelledby="fpv-heading" className="scroll-mt-24 border-t border-white/[0.08] py-10">
        <p className="font-mono text-xs text-emerald-400">BEYOND SOFTWARE</p>
        <h2 id="fpv-heading" className="mt-2 text-xl font-semibold text-zinc-100">FPV drones.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">Flying is only half the fun. I also like the electronics, radio systems and firmware behind it.</p>
        <ul className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <li className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">• Flying and building</li>
          <li className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">• Betaflight and troubleshooting</li>
          <li className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">• Radio and hardware</li>
        </ul>
        <a href="https://github.com/HKUDS/CLI-Anything/pull/595" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-emerald-300 hover:underline">Betaflight CLI contribution ↗</a>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-white/[0.08] pt-10">
        <h2 className="text-xl font-semibold text-zinc-100">Say hi.</h2>
        <p className="mt-2 text-sm text-zinc-400">Find me on GitHub.</p>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-emerald-300 hover:underline">@{site.handle} on GitHub ↗</a>
      </section>
    </div>
  );
}
