"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Automation",
    skills: ["n8n", "Make (Integromat)", "Zapier", "API Integration", "Webhooks"],
  },
  {
    title: "AI & LLMs",
    skills: ["Claude", "OpenAI / GPT", "LangChain", "Prompt Engineering", "RAG Systems"],
  },
  {
    title: "Voice AI",
    skills: ["Vapi", "Retell", "Twilio", "Call Routing", "Speech-to-Text"],
  },
  {
    title: "Integrations",
    skills: ["Gmail / Outlook", "Slack", "Google Sheets", "CRMs", "Databases"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "PostgreSQL", "Supabase", "Vercel", "Linux / VPS"],
  },
];

export function Skills() {
  return (
    <Section id="skills" className="bg-bg-card/30 section-glow">
      <SectionHeading>Skills & Tools</SectionHeading>
      <SectionSubheading>
        The stack I use to build production AI systems.
      </SectionSubheading>

      <div className="flex flex-wrap justify-center gap-6">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="w-full rounded-2xl border border-border-card bg-bg-card p-6 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <h3 className="mb-4 text-lg font-semibold text-teal">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border-card bg-bg px-3 py-1.5 text-sm text-text transition-colors hover:border-teal/30 hover:text-teal"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
