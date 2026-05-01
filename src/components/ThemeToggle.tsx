"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;
  const Icon = isDark ? HiOutlineSun : HiOutlineMoon;
  const next = isDark ? "light" : "dark";
  const label = t(next);

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={t("toggleAria")}
      title={`${t("toggleAria")} · ${label}`}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border-card bg-bg-card/40 text-text-muted transition hover:border-teal/40 hover:text-text"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
