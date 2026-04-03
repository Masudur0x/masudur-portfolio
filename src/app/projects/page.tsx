import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectsGrid } from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Masudur Rahman",
  description:
    "Real AI automation systems running in production. Case studies from businesses in Finland, Sweden, and globally.",
};

export default function ProjectsPage() {
  return (
    <section className="px-6 pt-32 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
        >
          &larr; Back home
        </a>
        <div className="mb-4 h-1 w-10 rounded-full bg-amber" />
        <h1 className="mb-3 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
          All Projects
        </h1>
        <p className="mb-12 max-w-[55ch] text-text-muted text-base md:text-lg leading-relaxed">
          Every AI system I&apos;ve built for real businesses. Production
          workflows, voice agents, and automation that runs daily.
        </p>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
