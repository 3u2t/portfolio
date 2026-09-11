import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const facts = [
  { k: "daily driver", v: "Fedora Workstation" },
  { k: "homelab", v: "Raspberry Pi 4 · Docker" },
  { k: "workflow", v: "VS Code + AI assistants I steer" },
  { k: "learning style", v: "build it, break it, fix it" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="about"
          title="I learn by building real things."
          lede="I'm Tom, 14, from Germany. I'm not a senior engineer and I don't pretend to be one — I'm someone who likes figuring out how stuff works and ends up with running projects along the way."
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="space-y-4 leading-relaxed text-zinc-400">
            <p>
              My main environment is{" "}
              <span className="text-zinc-200">Linux</span> — Fedora on my desk,
              Debian on my Raspberry Pi. Most of what I know comes from
              self-hosting services, reading logs, and fixing whatever I broke
              the night before.
            </p>
            <p>
              I build websites and small tools, run my own infrastructure with{" "}
              <span className="text-zinc-200">Docker and Cloudflare Tunnel</span>,
              and use AI coding tools to move faster — while reading, testing
              and maintaining everything I ship.
            </p>
            <p className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 font-mono text-[13px] leading-relaxed text-zinc-500">
              <span className="text-emerald-400">$</span> cat mindset.txt
              <br />
              curious &gt; clever. working &gt; perfect. honest &gt; impressive.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <dl className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.08] bg-[#111113]">
              {facts.map((f) => (
                <div key={f.k} className="flex gap-4 px-5 py-4">
                  <dt className="w-28 shrink-0 font-mono text-[11px] text-zinc-500 uppercase">
                    {f.k}
                  </dt>
                  <dd className="text-sm text-zinc-200">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
