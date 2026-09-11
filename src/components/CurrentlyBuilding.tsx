import { nowItems } from "@/lib/now";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const dot: Record<string, string> = {
  active: "bg-emerald-400 animate-pulse-dot",
  ongoing: "bg-amber-400",
  learning: "bg-sky-400",
};

export default function CurrentlyBuilding() {
  return (
    <section id="now" aria-label="Currently building" className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="now"
          title="Currently building."
          lede="A short list I keep up to date. If it's here, I'm actively touching it."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {nowItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <li className="group flex gap-3.5 rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-emerald-400/25">
                <span
                  aria-hidden
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${dot[item.status]}`}
                />
                <div>
                  <h3 className="font-medium text-zinc-100">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {item.detail}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-zinc-600">
                    [{item.status}]
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[11px] text-zinc-600">
          {"//"} edit <span className="text-zinc-500">src/lib/now.ts</span> to
          update this list
        </p>
      </div>
    </section>
  );
}
