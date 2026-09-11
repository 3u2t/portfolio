import Badge from "./Badge";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const gear = [
  "RadioMaster Pocket ELRS",
  "Eachine EV800DM",
  "Rush Solo Tank VTX",
  "GEPRC flight controllers",
  "Betaflight",
  "GPS",
  "6S LiPo",
  "HOTA D6 Pro charger",
];

export default function BeyondSoftware() {
  return (
    <section aria-label="Beyond software: FPV drones">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="beyond software"
          title="FPV drones: my hardware hobby."
          lede="Electronics, radio systems, firmware, configuration and a lot of troubleshooting — flying is only half of it."
        />
        <Reveal>
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-6">
            <div className="flex flex-wrap gap-1.5">
              {gear.map((g) => (
                <Badge key={g} label={g} />
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              I like comparing hardware by real-world value and performance,
              not by price tag — whether it&apos;s a quad, a Pi, or a GPU.
              Betaflight tuning taught me more about patient debugging than any
              tutorial.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
