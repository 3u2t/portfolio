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
      </div>
    </section>
  );
}
