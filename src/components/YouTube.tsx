"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { FaYoutube } from "react-icons/fa6";

export function YouTube() {
  return (
    <Section id="youtube">
      <SectionHeading>Watch Me Build</SectionHeading>
      <SectionSubheading>
        I share tutorials, builds, and AI automation tips on YouTube. Subscribe
        to learn how I build these systems.
      </SectionSubheading>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder video cards — will be replaced with real embeds */}
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="group flex aspect-video items-center justify-center rounded-2xl border border-border-card bg-bg-card transition-all hover:border-teal/40"
          >
            <div className="text-center text-text-muted">
              <FaYoutube className="mx-auto mb-2 h-12 w-12 opacity-40" />
              <p className="text-sm">Video {n} Coming Soon</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.youtube.com/@IamMasudurRahman"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-3 font-medium text-red-400 transition-colors hover:bg-red-500/20"
        >
          <FaYoutube className="h-5 w-5" />
          Subscribe on YouTube
        </a>
      </div>
    </Section>
  );
}
