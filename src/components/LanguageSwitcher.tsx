"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineGlobeAlt, HiOutlineCheck } from "react-icons/hi2";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const LOCALE_LABEL: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "EN" },
  bn: { label: "বাংলা", flag: "BN" },
};

let translateLoaded = false;
function loadGoogleTranslate() {
  if (typeof window === "undefined" || translateLoaded) return;
  translateLoaded = true;

  // Mounting target
  if (!document.getElementById("google_translate_element")) {
    const host = document.createElement("div");
    host.id = "google_translate_element";
    host.style.position = "fixed";
    host.style.bottom = "1rem";
    host.style.left = "1rem";
    host.style.zIndex = "60";
    document.body.appendChild(host);
  }

  // Init callback expected by Google's loader
  (window as unknown as { googleTranslateElementInit: () => void })
    .googleTranslateElementInit = () => {
    const g = (window as unknown as {
      google?: { translate?: { TranslateElement: new (cfg: object, id: string) => unknown } };
    }).google;
    if (!g?.translate?.TranslateElement) return;
    new g.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false },
      "google_translate_element",
    );
  };

  const s = document.createElement("script");
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  const openTranslate = () => {
    setOpen(false);
    loadGoogleTranslate();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("switchAria")}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border-card bg-bg-card/40 px-2.5 py-1.5 text-xs font-medium text-text-muted transition hover:border-teal/40 hover:text-text"
      >
        <HiOutlineGlobeAlt className="h-3.5 w-3.5" />
        <span className="font-mono">{LOCALE_LABEL[locale].flag}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border-card bg-bg-card/95 p-1 shadow-2xl shadow-black/40 backdrop-blur"
          role="menu"
        >
            {(Object.keys(LOCALE_LABEL) as Locale[]).map((loc) => {
              const active = loc === locale;
              return (
                <button
                  key={loc}
                  role="menuitem"
                  type="button"
                  onClick={() => switchTo(loc)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-teal/10 text-teal"
                      : "text-text hover:bg-white/5"
                  }`}
                >
                  <span>{LOCALE_LABEL[loc].label}</span>
                  {active && <HiOutlineCheck className="h-4 w-4" />}
                </button>
              );
            })}
            <div className="my-1 border-t border-border-card" />
            <button
              type="button"
              role="menuitem"
              onClick={openTranslate}
              className="flex w-full flex-col rounded-lg px-3 py-2 text-left text-sm text-text-muted transition hover:bg-white/5 hover:text-text"
            >
              <span className="flex items-center gap-2">
                <HiOutlineGlobeAlt className="h-3.5 w-3.5" />
                {t("more")}
              </span>
              <span className="text-[11px] text-text-muted/80">
                {t("moreSub")}
              </span>
            </button>
        </div>
      )}
    </div>
  );
}
