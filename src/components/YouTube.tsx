"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { FaYoutube } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export function YouTube() {
  const t = useTranslations("youtube");

  return (
    <Section id="youtube">
      <SectionHeading>{t("heading")}</SectionHeading>
      <SectionSubheading>{t("subheading")}</SectionSubheading>

      <div className="mx-auto max-w-xl rounded-2xl border border-border-card bg-bg-card/60 p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <FaYoutube className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{t("comingSoonTitle")}</h3>
        <p className="mb-6 text-sm text-text-muted leading-relaxed">
          {t("comingSoonBody")}
        </p>
        <a
          href="https://www.youtube.com/@IamMasudurRahman"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 px-6 py-3 font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98]"
        >
          <FaYoutube className="h-5 w-5" />
          {t("subscribe")}
        </a>
      </div>
    </Section>
  );
}
