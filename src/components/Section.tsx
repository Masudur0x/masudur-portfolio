"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`px-6 py-16 md:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="mb-4 h-1 w-10 rounded-full bg-teal" />
      <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export function SectionSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="mb-10 max-w-2xl text-text-muted text-base md:text-lg leading-relaxed">
      {children}
    </p>
  );
}
