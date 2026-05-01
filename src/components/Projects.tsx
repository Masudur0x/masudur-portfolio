"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PERSONA } from "@/lib/persona";
import type { PersonaProject } from "@/lib/persona";

const HOMEPAGE_LIMIT = 4;

export function ProjectCard({ project }: { project: PersonaProject }) {
  const t = useTranslations("projects");
  const slug = project.slug;
  const title = t(`items.${slug}.title`);
  const client = t(`items.${slug}.client`);
  const industry = t(`items.${slug}.industry`);
  const metric = t(`items.${slug}.metric`);
  const problem = t(`items.${slug}.problem`);
  const solution = t(`items.${slug}.solution`);
  const results = t.raw(`items.${slug}.results`) as string[];

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-border-card bg-bg-card transition-all hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5">
      {/* Screenshot */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden border-b border-border-card">
        <Image
          src={project.image}
          alt={title}
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
          <span className="text-sm text-text-muted">{metric}</span>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-teal">{industry}</span>
          <span className="text-border-card">|</span>
          <span className="text-xs text-text-muted">{client}</span>
        </div>

        <h3 className="mb-4 text-xl font-semibold">{title}</h3>

        <div className="space-y-3 text-sm text-text-muted">
          <div>
            <span className="font-medium text-text">{t("labels.problem")} </span>
            {problem}
          </div>
          <div>
            <span className="font-medium text-text">{t("labels.solution")} </span>
            {solution}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-sm font-medium text-text">
            {t("labels.results")}
          </span>
          <ul className="mt-2 space-y-1">
            {results.map((result) => (
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
  const t = useTranslations("projects");
  const visible = PERSONA.projects.slice(0, HOMEPAGE_LIMIT);
  const hasMore = PERSONA.projects.length > HOMEPAGE_LIMIT;

  return (
    <Section id="projects">
      <SectionHeading>{t("heading")}</SectionHeading>
      <SectionSubheading>{t("subheading")}</SectionSubheading>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {visible.map((project) => (
          <div key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-text-strong active:scale-[0.98]"
          >
            {t("seeAll")}
          </Link>
        </div>
      )}
    </Section>
  );
}
