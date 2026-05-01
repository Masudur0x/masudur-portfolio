"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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

  const links = navKeys.map((k) => ({ href: `#${k}`, label: t(k) }));

  return (
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
        <div className="hidden items-center gap-6 md:flex">
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
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
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

        {/* Mobile drawer — CSS-only slide */}
        <div
          aria-hidden={!isOpen}
          className={`fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-6 bg-bg/95 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-medium text-text-muted transition-colors hover:text-teal"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <a
            href={PERSONA.contact.calendar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-amber px-6 py-3 text-lg font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.97]"
          >
            {t("bookCall")}
          </a>
        </div>
      </nav>
    </header>
  );
}
