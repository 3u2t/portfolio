import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Homelab from "@/components/Homelab";
import AiWorkflow from "@/components/AiWorkflow";
import BeyondSoftware from "@/components/BeyondSoftware";
import GithubSection from "@/components/GithubSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <section aria-label="File scanner" className="mx-auto max-w-5xl px-5 pt-28 sm:px-8">
        <div className="rounded-xl border border-emerald-400/20 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-zinc-100">File scanner</h2>
          <p className="mt-2 text-sm text-zinc-400">Scan a file with VirusTotal, inspired by AhmedScanner.</p>
          <Link href="/scanner" className="mt-4 inline-block text-sm text-emerald-300 hover:underline">Open scanner →</Link>
        </div>
      </section>
      <Hero />
      <About />
      <CurrentlyBuilding />
      <Projects />
      <Stack />
      <Homelab />
      <AiWorkflow />
      <BeyondSoftware />
      <GithubSection />
      <Contact />
    </>
  );
}
