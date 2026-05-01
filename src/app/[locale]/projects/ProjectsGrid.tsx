import { ProjectCard } from "@/components/Projects";
import type { PersonaProject } from "@/lib/persona";

export function ProjectsGrid({ projects }: { projects: PersonaProject[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <div key={project.slug} className="h-full">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
