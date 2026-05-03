"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaXmark, FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { PERSONA } from "@/lib/persona";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navKeys = ["about", "services", "projects", "skills", "youtube", "faqs", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const links = navKeys.map((k) => ({ href: `#${k}`, label: t(k) }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-xl border-b border-border-card shadow-lg shadow-black/20"
            : "bg-bg/60 backdrop-blur-md border-b border-border-card/50"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-xl font-bold font-[family-name:var(--font-heading)]">
            <span className="text-teal">M</span>asudur Rahman
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-teal"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 border-l border-border-card pl-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href={PERSONA.contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-amber px-4 py-2 text-sm font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.97]"
            >
              {t("bookCall")}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[70] flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-text transition-all duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-text transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-text transition-all duration-300 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile drawer — fully opaque, scroll-locked, full viewport */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[65] flex flex-col bg-bg lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100 transition-opacity duration-200"
            : "pointer-events-none opacity-0 transition-opacity duration-200"
        }`}
      >
        {/* Top bar inside drawer mirrors the header so it feels continuous */}
        <div className="flex items-center justify-between border-b border-border-card px-6 py-5">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-xl font-bold font-[family-name:var(--font-heading)]"
          >
            <span className="text-teal">M</span>asudur Rahman
          </a>
          <button
            onClick={() => setIsOpen(false)}
            aria-label={t("closeMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition hover:bg-white/5 hover:text-text"
          >
            <FaXmark className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable middle: nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-3 py-4 text-lg font-medium text-text transition hover:bg-white/[0.04]"
                >
                  <span>{link.label}</span>
                  <FaArrowRight className="h-3.5 w-3.5 text-text-muted/40 transition-all group-hover:translate-x-1 group-hover:text-amber" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sticky footer: lang/theme + primary CTA */}
        <div className="border-t border-border-card px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              {t("preferences")}
            </p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={PERSONA.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3.5 text-base font-semibold text-emerald-300 transition-all hover:bg-emerald-400/20 active:scale-[0.98]"
            >
              <FaWhatsapp className="h-4 w-4" />
              {t("whatsapp")}
            </a>
            <a
              href={PERSONA.contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-4 py-3.5 text-base font-semibold text-bg shadow-md shadow-amber/20 transition-all hover:bg-amber-dark active:scale-[0.98]"
            >
              {t("bookCall")}
              <FaArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
