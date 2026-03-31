"use client";

import { Section } from "./Section";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineCheckCircle } from "react-icons/hi2";

const highlights = [
  "CTO & Partner at Wicflow (Finland)",
  "AI automation systems running in production daily",
  "Clients across Finland, Sweden, and globally",
];

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border-card bg-bg-card/50 p-8 md:p-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl md:h-64 md:w-64">
              <Image
                src="/images/headshot.png"
                alt="Masudur Rahman"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/40 to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border-card" />
            </div>
            <div className="absolute -inset-2 -z-10 rounded-2xl border border-teal/20" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <p className="mb-1 text-sm font-medium text-teal">Who I Am</p>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Masudur Rahman
            </h2>
            <p className="mb-5 text-text-muted leading-relaxed">
              I build AI systems that handle real work for real businesses.
              Email automation, voice AI agents, agentic workflows. If it can
              be automated with AI, I&apos;ve probably built it.
            </p>

            <ul className="mb-6 space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                  <HiOutlineCheckCircle className="h-5 w-5 flex-shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3 font-medium text-bg transition-colors hover:bg-teal-dark"
            >
              Work With Me
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
