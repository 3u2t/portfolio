import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

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
        <ul className="mt-5 space-y-2 text-sm text-zinc-400">
          <li>• Web apps and small tools</li>
          <li>• Linux, technology and learning by doing</li>
          <li>• Open-source contributions and FPV drones</li>
        </ul>
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-white/[0.08] py-10">
        <h2 className="text-xl font-semibold text-zinc-100">Projects</h2>
        <ul className="mt-5 divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#111113]">
          {projects.map(project => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 px-5 py-4 transition-colors hover:bg-white/[0.03]">
                <span className="font-medium text-zinc-100">{project.title} <span className="text-emerald-400">↗</span></span>
                <span className="text-sm text-zinc-400">{project.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
        <a href="https://github.com/pulls?q=is%3Apr+author%3A3u2t" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-emerald-300 hover:underline">My open-source pull requests ↗</a>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-white/[0.08] pt-10">
        <h2 className="text-xl font-semibold text-zinc-100">Say hi.</h2>
        <p className="mt-2 text-sm text-zinc-400">Find me on GitHub.</p>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-emerald-300 hover:underline">@{site.handle} on GitHub ↗</a>
      </section>
    </div>
  );
}
