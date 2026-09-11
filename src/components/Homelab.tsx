import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  { name: "Jellyfin", desc: "media" },
  { name: "Immich", desc: "photos" },
  { name: "Vaultwarden", desc: "passwords" },
  { name: "Portainer", desc: "container mgmt" },
  { name: "ConvertX", desc: "file conversion" },
  { name: "MySpeed", desc: "speedtests" },
  { name: "cloudflared", desc: "tunnel" },
];

export default function Homelab() {
  return (
    <section id="homelab" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="homelab"
          title="My Raspberry Pi home server."
          lede="A Pi 4 (8 GB) on Debian with Docker and CasaOS — treated as infrastructure I maintain, not just a list of apps."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="h-full rounded-xl border border-white/[0.08] bg-[#111113] p-6">
              <h3 className="font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase">
                the setup
              </h3>
              <ul className="mt-4 space-y-2.5 font-mono text-[13px] leading-relaxed">
                {[
                  ["board", "raspberry pi 4 model b · 8gb"],
                  ["os", "debian / raspberry pi os"],
                  ["runtime", "docker + compose · casaos"],
                  ["storage", "external hdd"],
                  ["access", "cloudflare tunnel · ssh"],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="w-20 shrink-0 text-zinc-600">{k}</span>
                    <span className="text-zinc-300">{v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm leading-relaxed text-zinc-400">
                No open ports at home — everything remote goes through an
                encrypted tunnel, and admin happens over SSH. Updates and
                backups are part of the routine, including the occasional
                late-night debugging session.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full rounded-xl border border-white/[0.08] bg-[#111113] p-6">
              <h3 className="font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase">
                services i run
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {services.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3.5 py-3"
                  >
                    <p className="text-sm font-medium text-zinc-200">{s.name}</p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      {s.desc}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-zinc-600">
                $ docker ps --format &quot;running:{" "}
                {services.length} services, maintained by me&quot;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
