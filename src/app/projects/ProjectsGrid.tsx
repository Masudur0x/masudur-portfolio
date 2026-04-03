"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/Projects";
import type { Project } from "@/lib/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div key={project.title} variants={cardVariants} className="h-full">
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
