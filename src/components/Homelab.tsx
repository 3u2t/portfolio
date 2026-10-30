import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Homelab() {
  return (
    <section id="homelab" className="scroll-mt-20 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading kicker="experiments" title="Learning by doing." lede="I enjoy exploring Linux, networking and self-hosting through hands-on projects." />
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-zinc-400">
            Experimenting, troubleshooting and maintaining projects helps me understand how technology fits together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
