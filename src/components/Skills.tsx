"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Automation",
    skills: ["n8n", "Make", "Zapier", "Trigger.dev", "API Integration"],
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
    title: "Web & Apps",
    skills: ["Next.js", "React", "Tailwind CSS", "Electron", "Claude Code"],
  },
  {
    title: "Infrastructure",
    skills: ["Vercel", "Netlify", "Docker", "Supabase", "PostgreSQL"],
  },
  {
    title: "Integrations",
    skills: ["Gmail / Outlook", "Slack", "Google Sheets", "CRMs", "WhatsApp Bots"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Skills() {
  return (
    <Section id="skills" className="bg-bg-card/30 section-glow">
      <SectionHeading>Skills & Tools</SectionHeading>
      <SectionSubheading>
        The stack I use to build production AI systems — from no-code workflows
        to full custom applications.
      </SectionSubheading>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="rounded-2xl border border-border-card bg-bg-card p-5 transition-all hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5"
          >
            <h3 className="mb-3 text-sm font-semibold text-teal uppercase tracking-wider">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border-card bg-bg px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-teal/30 hover:text-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
