"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import {
  HiOutlineCog8Tooth,
  HiOutlineMicrophone,
  HiOutlineCpuChip,
  HiOutlineLightBulb,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { useTranslations } from "next-intl";
import { PERSONA } from "@/lib/persona";

const SERVICE_ICONS: Record<string, IconType> = {
  "voice-ai": HiOutlineMicrophone,
  "custom-automation": HiOutlineCpuChip,
  "n8n-make": HiOutlineCog8Tooth,
  strategy: HiOutlineLightBulb,
};

export function Services() {
  const t = useTranslations("services");

  return (
    <Section id="services" className="bg-bg-card/30 section-glow">
      <SectionHeading>{t("heading")}</SectionHeading>
      <SectionSubheading>{t("subheading")}</SectionSubheading>

      <div className="grid gap-6 sm:grid-cols-2">
        {PERSONA.services.map((service) => {
          const Icon = SERVICE_ICONS[service.id] ?? HiOutlineCog8Tooth;
          return (
            <div
              key={service.id}
              className="group rounded-2xl border border-border-card bg-bg-card p-5 sm:p-8 transition-all hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 active:scale-[0.99]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10">
                <Icon className="h-7 w-7 text-teal" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                {t(`items.${service.id}.title`)}
              </h3>
              <p className="mb-4 text-text-muted leading-relaxed">
                {t(`items.${service.id}.description`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-card bg-bg px-3 py-1 text-xs font-medium text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
