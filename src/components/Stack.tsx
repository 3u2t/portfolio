import { skillGroups, stackBadges } from "@/lib/skills";
import Badge from "./Badge";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  return (
    <section
      id="stack"
      className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.015]"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="stack & skills"
          title="Hands-on tech, not buzzwords."
          lede="Non-programming skills first — that's where most of my time goes. No proficiency bars, no expert claims: this is what I use and keep learning."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 70}>
              <div className="h-full rounded-xl border border-white/[0.08] bg-[#111113] p-5">
                <h3 className="font-mono text-sm text-emerald-300">{g.title}</h3>
                <p className="mt-1 text-[13px] text-zinc-500">{g.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <Badge key={item} label={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5 sm:p-6">
            <h3 className="font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase">
              tech used across my projects
            </h3>
            <div className="mt-4 space-y-3">
              {stackBadges.map((row) => (
                <div key={row.category} className="flex flex-wrap items-center gap-2">
                  <span className="w-20 shrink-0 font-mono text-[11px] text-zinc-600">
                    {row.category}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {row.items.map((t) => (
                      <Badge key={t} label={t} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-zinc-600">
              Frameworks and services above are things I&apos;ve used in real
              projects — listed as facts, not as skill claims.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
