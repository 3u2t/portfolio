"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { GithubRepo } from "@/lib/github";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

type ApiState =
  | { status: "loading" }
  | { status: "ready"; repos: GithubRepo[] }
  | { status: "offline" };

export default function GithubSection() {
  const [state, setState] = useState<ApiState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (!cancelled) setState({ status: "ready", repos: json.repos ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "offline" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" aria-label="GitHub" className="scroll-mt-20 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading
          kicker="github"
          title="On GitHub."
          lede="Live data from my profile — or clean placeholders if the API can't be reached. No invented numbers, ever."
        />
        {state.status === "loading" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : state.status === "offline" ? (
          <Reveal>
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-6 text-sm leading-relaxed text-zinc-400">
              <p className="font-mono text-[12px] text-zinc-500">
                $ curl api.github.com — offline
              </p>
              <p className="mt-2">
                Couldn&apos;t load live repos right now. The code is still
                there:
              </p>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-[13px] text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
              >
                github.com/{site.handle} ↗
              </a>
            </div>
          </Reveal>
        ) : state.repos.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No public repos to show right now —{" "}
            <a
              className="text-emerald-300 hover:underline"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              view the profile directly ↗
            </a>
            .
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.repos.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 60}>
                <li className="h-full">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-emerald-400/25"
                  >
                    <p className="font-mono text-sm text-zinc-100">{r.name}</p>
                    <p className="mt-1.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-zinc-500">
                      {r.description ?? "No description yet."}
                    </p>
                    <p className="mt-3 flex items-center gap-3 font-mono text-[11px] text-zinc-600">
                      {r.language ? (
                        <span className="text-zinc-400">{r.language}</span>
                      ) : null}
                      <span>★ {r.stargazers_count}</span>
                      <span className="ml-auto">↗</span>
                    </p>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
        <div className="mt-8">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/12 bg-white/[0.04] px-5 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
          >
            @{site.handle} on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
