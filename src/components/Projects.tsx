"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "AI Email Automation",
    client: "Scalling School, Finland",
    industry: "Education / Online Business",
    image: "/images/project-gmail.png",
    metric: "Hours saved daily",
    metricValue: "3+",
    problem:
      "Spending hours manually reading, categorizing, and replying to emails. Important messages were getting buried.",
    solution:
      "Built an n8n workflow with AI email classification, knowledge base integration, conversation history tracking, and automated draft generation that sounds human.",
    results: [
      "Inbox fully organized automatically",
      "Human-sounding drafts ready to review and send",
      "Hours of daily email work eliminated",
    ],
    tags: ["n8n", "AI Classification", "Email Automation"],
  },
  {
    title: "Intelligent Quote System",
    client: "HVAC Company, Finland",
    industry: "HVAC / Manufacturing",
    image: "/images/project-outlook.png",
    metric: "Employee workload replaced",
    metricValue: "1",
    problem:
      "Complex email handling with attachments (images, PDFs, Excel, Word), pricing calculations, and parts catalog lookups taking up one full employee's time.",
    solution:
      "Designed a production n8n workflow handling multi-format attachments, custom pricing rules, parts catalog integration, calculation tools, and full conversation history.",
    results: [
      "Effectively replaced one employee's workload",
      "Handles complex attachments automatically",
      "Running in production, processing daily",
    ],
    tags: ["n8n", "Document Processing", "Production System"],
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading>What Happened When I Turned the AI On</SectionHeading>
      <SectionSubheading>
        Real systems running in production for real businesses.
      </SectionSubheading>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group overflow-hidden rounded-2xl border border-border-card bg-bg-card transition-all hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5"
          >
            {/* Screenshot */}
            <div className="relative h-64 overflow-hidden border-b border-border-card">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent" />
            </div>

            <div className="p-8">
              {/* Key metric */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-teal">{project.metricValue}</span>
                <span className="text-sm text-text-muted">{project.metric}</span>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium text-teal">
                  {project.industry}
                </span>
                <span className="text-border-card">|</span>
                <span className="text-xs text-text-muted">
                  {project.client}
                </span>
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
                <span className="text-sm font-medium text-text">
                  Results:
                </span>
                <ul className="mt-2 space-y-1">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
