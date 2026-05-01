import { PERSONA, type PersonaProject } from "./persona";

// Public Project type kept for components that import it.
// Derived from the canonical PersonaProject in persona.ts.
export type Project = PersonaProject;

export const projects: Project[] = PERSONA.projects;
