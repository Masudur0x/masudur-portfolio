"use client";

import { Section } from "./Section";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi2";

const highlights = [
  "CTO & Partner at Wicflow (Finland)",
  "Production AI systems processing thousands of tasks daily",
  "Clients across Finland, Sweden, and globally",
];

const stats = [
  { value: "50+", label: "Automations Built" },
  { value: "3+", label: "Countries Served" },
  { value: "1000+", label: "Hours Saved for Clients" },
];

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border-card bg-bg-card/50 p-5 sm:p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-1 text-sm font-medium tracking-wider text-amber uppercase">
              Who I Am
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              Masudur Rahman
            </h2>
            <p className="mb-5 text-text-muted leading-relaxed">
              I build AI systems that do the work your team shouldn&apos;t have
              to. Email automation, voice AI agents, agentic workflows. If it
              can be automated with AI, I&apos;ve built it.
            </p>

            <ul className="mb-6 space-y-2.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-text-muted"
                >
                  <HiOutlineCheckCircle className="h-5 w-5 flex-shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98]"
            >
              Work With Me
            </a>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border-card bg-bg/60 p-5"
              >
                <span className="block text-3xl font-bold tracking-tight text-teal">
                  {stat.value}
                </span>
                <span className="text-sm text-text-muted">{stat.label}</span>
              </motion.div>
            ))}

            <div className="rounded-xl border border-border-card bg-bg/60 p-5">
              <p className="text-xs text-text-muted mb-1">
                Currently building at
              </p>
              <p className="font-semibold">
                Wicflow{" "}
                <span className="text-text-muted font-normal">— Finland</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
