import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import Badge from "./Badge";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import StatusDot from "./StatusDot";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#111113] p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/25 hover:shadow-[0_12px_40px_-16px_rgba(52,211,153,0.25)]">
      <StatusDot status={project.status} label={project.statusLabel} />
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-100">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors group-hover:text-emerald-300"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        {project.tagline}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((t) => (
          <Badge key={t} label={t} />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-zinc-200 transition-colors hover:text-emerald-300"
        >
          Details →
        </Link>
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-zinc-500 transition-colors hover:text-emerald-300"
          >
            {l.label} ↗
          </a>
        ))}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-zinc-500 transition-colors hover:text-emerald-300"
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="projects"
          title="Things I've built and run."
          lede="Web apps, infrastructure and experiments — everything here is something I actually set up, tested and maintain. Click through for details."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-zinc-100">Open-source contributions</h3>
          <p className="mt-2 text-sm text-zinc-400">Selected pull requests in projects I contribute to.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["CLI-Anything", "Betaflight CLI harness", "https://github.com/HKUDS/CLI-Anything/pull/595"],
              ["Dynamic Island for Windows", "Audio and interface fixes", "https://github.com/devcode90/Dynamic-Island-for-Windows/pull/128"],
              ["Fluence Desktop", "Multilingual interface and dashboard fixes", "https://github.com/raviumeshkulkarni-web/Fluence-Desktop/pull/15"],
              ["adhd", "Frame selection and parser improvements", "https://github.com/UditAkhourii/adhd/pull/66"],
            ].map(([name, description, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-emerald-400/40">
                <span className="font-medium text-zinc-100">{name} ↗</span>
                <span className="mt-1 block text-sm text-zinc-400">{description}</span>
              </a>
            ))}
          </div>
          <a href="https://github.com/pulls?q=is%3Apr+author%3A3u2t" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-emerald-300 hover:underline">View pull requests on GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}
