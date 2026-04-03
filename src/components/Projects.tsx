"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";

const HOMEPAGE_LIMIT = 4;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-border-card bg-bg-card transition-all hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5">
      {/* Screenshot */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden border-b border-border-card">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent" />
      </div>

      <div className="p-5 sm:p-8">
        {/* Key metric */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-amber">
            {project.metricValue}
          </span>
          <span className="text-sm text-text-muted">{project.metric}</span>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-teal">
            {project.industry}
          </span>
          <span className="text-border-card">|</span>
          <span className="text-xs text-text-muted">{project.client}</span>
        </div>

        <h3 className="mb-4 text-xl font-semibold">{project.title}</h3>

        <div className="space-y-3 text-sm text-text-muted">
          <div>
            <span className="font-medium text-text">Problem: </span>
            {project.problem}
          </div>
          <div>
            <span className="font-medium text-text">Solution: </span>
            {project.solution}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-sm font-medium text-text">Results:</span>
          <ul className="mt-2 space-y-1">
            {project.results.map((result) => (
              <li
                key={result}
                className="flex items-start gap-2 text-sm text-text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                {result}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-card bg-bg px-3 py-1 text-xs font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const visible = projects.slice(0, HOMEPAGE_LIMIT);
  const hasMore = projects.length > HOMEPAGE_LIMIT;

  return (
    <Section id="projects">
      <SectionHeading>What Happened When I Turned the AI On</SectionHeading>
      <SectionSubheading>
        Real systems running in production for real businesses.
      </SectionSubheading>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:gap-8 md:grid-cols-2"
      >
        {visible.map((project) => (
          <motion.div key={project.title} variants={cardVariants} className="h-full">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-white active:scale-[0.98]"
          >
            See All Projects
          </a>
        </div>
      )}
    </Section>
  );
}
