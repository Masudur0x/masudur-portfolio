"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { motion } from "framer-motion";
import { HiOutlineCog8Tooth, HiOutlineMicrophone, HiOutlineCpuChip, HiOutlineLightBulb } from "react-icons/hi2";

const services = [
  {
    icon: HiOutlineCog8Tooth,
    title: "Workflow Automation",
    description:
      "Custom n8n workflows that connect your tools and automate repetitive tasks. From email processing to data pipelines, I build systems that run themselves.",
    tags: ["n8n", "API Integration", "Data Pipelines"],
  },
  {
    icon: HiOutlineMicrophone,
    title: "Voice AI Agents",
    description:
      "Intelligent voice assistants powered by Vapi and Retell that handle customer calls, qualify leads, and book appointments around the clock.",
    tags: ["Vapi", "Retell", "24/7 Agents"],
  },
  {
    icon: HiOutlineCpuChip,
    title: "Agentic AI Systems",
    description:
      "Multi-agent AI systems built with Claude and other LLMs that reason, plan, and execute complex tasks autonomously.",
    tags: ["Claude", "LLMs", "Multi-Agent"],
  },
  {
    icon: HiOutlineLightBulb,
    title: "AI Strategy & Consulting",
    description:
      "Not sure where AI fits in your business? I help you identify the highest-impact automation opportunities and build a practical roadmap.",
    tags: ["Strategy", "ROI Analysis", "Roadmap"],
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-bg-card/30 section-glow">
      <SectionHeading>What I Build</SectionHeading>
      <SectionSubheading>
        AI systems that save real time and real money. No fluff, just results.
      </SectionSubheading>

      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-2xl border border-border-card bg-bg-card p-8 transition-all hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10">
              <service.icon className="h-7 w-7 text-teal" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
            <p className="mb-4 text-text-muted leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
