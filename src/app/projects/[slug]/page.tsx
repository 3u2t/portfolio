import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import Badge from "@/components/Badge";
import StatusDot from "@/components/StatusDot";
import Reveal from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} · Tom`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8">
      <Reveal>
        <Link
          href="/#projects"
          className="font-mono text-[13px] text-zinc-500 transition-colors hover:text-emerald-300"
        >
          ← all projects
        </Link>
        <div className="mt-6">
          <StatusDot status={project.status} label={project.statusLabel} />
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-400">{project.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Badge key={t} label={t} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10 space-y-4 leading-relaxed text-zinc-400">
        {project.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>

      <Reveal className="mt-8 rounded-xl border border-white/[0.08] bg-[#111113] p-6">
        <h2 className="font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase">
          highlights
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span aria-hidden className="text-emerald-400">
                →
              </span>
              {h}
            </li>
          ))}
        </ul>
      </Reveal>

      {(project.links.length > 0 || project.github) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300"
            >
              {l.label} ↗
            </a>
          ))}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/12 bg-white/[0.04] px-5 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              Repository ↗
            </a>
          ) : null}
        </div>
      )}
    </article>
  );
}
