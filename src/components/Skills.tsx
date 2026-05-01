"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { useTranslations } from "next-intl";

const skillCategories = [
  {
    key: "automation",
    skills: ["n8n", "Make", "Zapier", "Trigger.dev", "API Integration"],
  },
  {
    key: "ai",
    skills: ["Claude", "OpenAI / GPT", "LangChain", "Prompt Engineering", "RAG Systems"],
  },
  {
    key: "voice",
    skills: ["Vapi", "Retell", "Twilio", "Call Routing", "Speech-to-Text"],
  },
  {
    key: "web",
    skills: ["Next.js", "React", "Tailwind CSS", "Electron", "Claude Code"],
  },
  {
    key: "infra",
    skills: ["Vercel", "Netlify", "Docker", "Supabase", "PostgreSQL"],
  },
  {
    key: "integrations",
    skills: ["Gmail / Outlook", "Slack", "Google Sheets", "CRMs", "WhatsApp Bots"],
  },
] as const;

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="bg-bg-card/30 section-glow">
      <SectionHeading>{t("heading")}</SectionHeading>
      <SectionSubheading>{t("subheading")}</SectionSubheading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <div
            key={category.key}
            className="rounded-2xl border border-border-card bg-bg-card p-5 transition-all hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5"
          >
            <h3 className="mb-3 text-sm font-semibold text-teal uppercase tracking-wider">
              {t(`categories.${category.key}`)}
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
          </div>
        ))}
      </div>
    </Section>
  );
}
