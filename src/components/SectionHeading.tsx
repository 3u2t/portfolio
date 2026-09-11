import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/90 uppercase">
        {"//"} {kicker}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        {title}
      </h2>
      {lede ? <p className="mt-3 leading-relaxed text-zinc-400">{lede}</p> : null}
    </Reveal>
  );
}
