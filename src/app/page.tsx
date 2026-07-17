import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ServiceOverview } from "@/components/sections/service-overview";
import { BuildLoop } from "@/components/sections/build-loop";
import { DemoGrid } from "@/components/sections/demo-grid";
import { WorkIndex } from "@/components/sections/work-index";
import { TechStack } from "@/components/sections/tech-stack";
import { ProjectCTA } from "@/components/sections/project-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ServiceOverview />
      <BuildLoop />
      <DemoGrid />
      <WorkIndex />
      <TechStack />
      <ProjectCTA />
    </>
  );
}
