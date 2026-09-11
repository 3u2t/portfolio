import Reveal from "./Reveal";

export default function AiWorkflow() {
  return (
    <section
      aria-label="AI-assisted development"
      className="border-y border-white/[0.06] bg-white/[0.015]"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/90 uppercase">
            {"//"} ai &amp; coding
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            AI speeds me up. It doesn&apos;t replace understanding.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <blockquote className="h-full rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 text-lg leading-relaxed text-zinc-200">
              “I use AI as a development tool, not as a replacement for
              understanding what I build.”
              <footer className="mt-3 font-mono text-xs text-zinc-500">
                — how I actually work
              </footer>
            </blockquote>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full rounded-xl border border-white/[0.08] bg-[#111113] p-6 text-sm leading-relaxed text-zinc-400">
              <p>
                I experiment with AI coding assistants, OpenCode and
                LLM-based workflows in VS Code and on GitHub. They help me
                scaffold faster and get unstuck.
              </p>
              <p className="mt-3">
                But everything that ships gets{" "}
                <span className="text-zinc-200">
                  read, tested and maintained by me
                </span>{" "}
                — on my own server, where broken code pages me, not someone
                else.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
