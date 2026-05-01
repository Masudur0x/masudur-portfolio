"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { PERSONA } from "@/lib/persona";

const STAT_KEYS = ["automations", "countries", "hours"] as const;

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as string[];
  const stats = STAT_KEYS.map((key, i) => ({
    key,
    label: t(`stats.${key}`),
    value: PERSONA.stats[i]?.value ?? "",
  }));

  return (
    <Section id="about">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border-card bg-bg-card/50 p-5 sm:p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          {/* Left: Text */}
          <div>
            <p className="mb-1 text-sm font-medium tracking-wider text-amber uppercase">
              {t("kicker")}
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              {PERSONA.name}
            </h2>
            <p className="mb-5 text-text-muted leading-relaxed">
              {t("shortBio")}
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
              {t("workWithMe")}
            </a>
          </div>

          {/* Right: Stats */}
          <div className="space-y-5">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="rounded-xl border border-border-card bg-bg/60 p-5"
              >
                <span className="block text-3xl font-bold tracking-tight text-teal">
                  <CountUp value={stat.value} />
                </span>
                <span className="text-sm text-text-muted">{stat.label}</span>
              </div>
            ))}

            <div className="rounded-xl border border-border-card bg-bg/60 p-5">
              <p className="text-xs text-text-muted mb-1">{t("currentlyAt")}</p>
              <p className="font-semibold">
                {PERSONA.currentlyAt.name}{" "}
                <span className="text-text-muted font-normal">
                  — {PERSONA.currentlyAt.location}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = numStr ? parseInt(numStr.replace(/,/g, ""), 10) : 0;

  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || !target) {
      setDisplay(target);
      return;
    }

    const node = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(target);
      return;
    }

    // Scale duration to target so small values get more time per step.
    // 3 → ~1200ms, 50 → 1600ms, 1000+ → capped at 2000ms.
    const duration = Math.min(2000, Math.max(1200, 800 + target * 1.2));
    // For small targets, linear feels more honest than ease-out (which
    // would compress all visible steps into the first half).
    const useLinear = target <= 10;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = useLinear ? t : 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);

    return () => io.disconnect();
  }, [target]);

  const formatted = display.toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
