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
