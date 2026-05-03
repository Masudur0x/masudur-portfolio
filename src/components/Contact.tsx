"use client";

import { useState, FormEvent } from "react";
import { FaCheck, FaWhatsapp, FaCalendarCheck } from "react-icons/fa6";
import { Section, SectionHeading } from "./Section";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socials";
import { PERSONA } from "@/lib/persona";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      budget: String(data.get("budget") ?? ""),
      source: "contact-form",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const whatsappHref = PERSONA.contact.whatsapp;
  const calendarHref = PERSONA.contact.calendar;

  return (
    <Section id="contact" className="section-glow">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>{t("heading")}</SectionHeading>
        <p className="mb-8 sm:mb-12 max-w-[55ch] text-base sm:text-lg text-text-muted leading-relaxed">
          {t("subheading")}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 sm:gap-12 md:grid-cols-2">
        {/* Left: form OR success card */}
        {status === "success" ? (
          <SuccessCard
            title={t("successTitle")}
            body={t("successBody")}
            again={t("successAgain")}
            onReset={() => setStatus("idle")}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                {t("nameLabel")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === "sending"}
                className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === "sending"}
                className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="project"
                className="mb-1 block text-sm font-medium"
              >
                {t("projectLabel")}
              </label>
              <textarea
                id="project"
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
                className="w-full resize-none rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
                placeholder={t("projectPlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="budget" className="mb-1 block text-sm font-medium">
                {t("budgetLabel")}
              </label>
              <select
                id="budget"
                name="budget"
                disabled={status === "sending"}
                className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
              >
                <option value="">{t("budgetSelect")}</option>
                <option value="<1k">{t("budgetUnder1k")}</option>
                <option value="1k-5k">{t("budget1to5k")}</option>
                <option value="5k-10k">{t("budget5to10k")}</option>
                <option value="10k+">{t("budget10kPlus")}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-amber py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? t("sending") : t("send")}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-400">{t("error")}</p>
            )}
          </form>
        )}

        {/* Right: response promise + direct channels + socials */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="rounded-xl border border-border-card bg-bg/40 p-5">
            <h3 className="mb-2 text-base font-semibold">{t("responseTitle")}</h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {t("responseBody")}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold">{t("directTitle")}</h3>
            <p className="mb-4 text-sm text-text-muted">{t("directBody")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-400/20 active:scale-[0.98]"
              >
                <FaWhatsapp className="h-4 w-4" />
                {t("whatsappLabel")}
              </a>
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-amber/40 bg-amber/10 px-4 py-2.5 text-sm font-medium text-amber transition-all hover:bg-amber/20 active:scale-[0.98]"
              >
                <FaCalendarCheck className="h-4 w-4" />
                {t("bookCallLabel")}
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              {t("findOnline")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:border-teal/40 hover:text-text active:scale-95"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SuccessCard({
  title,
  body,
  again,
  onReset,
}: {
  title: string;
  body: string;
  again: string;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-8">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40">
        <FaCheck className="h-6 w-6 text-emerald-300" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold leading-tight text-text">
        {title}
      </h3>
      <p className="mb-6 text-base leading-relaxed text-text-muted">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-lg border border-border-card px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-white/5"
      >
        {again}
      </button>
    </div>
  );
}
