"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    name: "Jellyfin",
    desc: "media",
    detail:
      "My movies & shows, streamed straight from the Pi. Transcoding works... eventually. It's a Pi — be nice.",
  },
  {
    name: "Immich",
    desc: "photos",
    detail:
      "Automatic phone photo backup, self-hosted. Finally free from cloud-storage guilt.",
  },
  {
    name: "Vaultwarden",
    desc: "passwords",
    detail:
      "My passwords live in my house now. Bitwarden-compatible, paranoia-approved.",
  },
  {
    name: "Portainer",
    desc: "container mgmt",
    detail:
      "Docker dashboard for when SSH feels like too much typing. (It's never too much typing.)",
  },
  {
    name: "ConvertX",
    desc: "file conversion",
    detail:
      "Converts random file formats at 2am. Don't ask why 2am.",
  },
  {
    name: "MySpeed",
    desc: "speedtests",
    detail:
      "Automated speedtests on schedule. Hard evidence for when the wifi gets blamed.",
  },
  {
    name: "cloudflared",
    desc: "tunnel",
    detail:
      "The tunnel daemon. No open ports, no port forwarding, no funny business.",
  },
];

export default function Homelab() {
  const [open, setOpen] = useState<string | null>(null);
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
                services i run — click for details
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {services.map((s) => {
                  const expanded = open === s.name;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setOpen(expanded ? null : s.name)}
                        className={`w-full rounded-lg border px-3.5 py-3 text-left transition-colors ${
                          expanded
                            ? "border-emerald-400/30 bg-emerald-400/[0.05]"
                            : "border-white/[0.07] bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse-dot"
                          />
                          <span className="text-sm font-medium text-zinc-200">
                            {s.name}
                          </span>
                          <span className="ml-auto font-mono text-[11px] text-zinc-500">
                            {s.desc}
                          </span>
                          <span
                            aria-hidden
                            className={`font-mono text-xs text-zinc-500 transition-transform ${expanded ? "rotate-180" : ""}`}
                          >
                            ▾
                          </span>
                        </span>
                        {expanded ? (
                          <span className="mt-2 block border-t border-white/[0.07] pt-2 text-[13px] leading-relaxed text-zinc-400">
                            {s.detail}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
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
