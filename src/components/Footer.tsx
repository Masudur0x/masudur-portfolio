import { getTranslations, getLocale } from "next-intl/server";
import { FaCalendarCheck } from "react-icons/fa6";
import { socialLinks } from "@/lib/socials";
import { PERSONA } from "@/lib/persona";
import { Link } from "@/i18n/navigation";

const exploreKeys = ["about", "services", "projects", "faqs", "contact"] as const;
const serviceLinks = [
  { key: "service1", anchor: "services" },
  { key: "service2", anchor: "services" },
  { key: "service3", anchor: "services" },
  { key: "service4", anchor: "services" },
  { key: "service5", anchor: "services" },
] as const;

export async function Footer() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");
  const locale = await getLocale();

  return (
    <footer className="relative border-t border-border-card bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pb-8 sm:pt-20">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-8 sm:gap-x-10 md:grid-cols-12 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-none">
              <span className="text-teal">M</span>asudur Rahman
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {t("tagline")}
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-border-card bg-bg-card/40">
              <div className="flex items-center gap-2 border-b border-border-card/70 px-4 py-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-300">
                  {t("available")}
                </span>
              </div>

              <a
                href={PERSONA.contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-amber transition-colors hover:bg-amber/[0.06]"
              >
                <span className="inline-flex items-center gap-2">
                  <FaCalendarCheck className="h-4 w-4" />
                  {t("bookCallCta")}
                </span>
                <span className="text-amber/70 transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {t("servicesHeading")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <FooterLink href={`/#${s.anchor}` as const} locale={locale}>
                    {t(s.key)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {t("exploreHeading")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {exploreKeys.map((key) => (
                <li key={key}>
                  <FooterLink href={`/#${key}` as const} locale={locale}>
                    {tNav(key)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {t("connectHeading")}
            </h4>
            <div className="mt-4 flex flex-wrap justify-start gap-2 md:justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:-translate-y-0.5 hover:border-amber/40 hover:text-amber active:scale-95 sm:h-10 sm:w-10"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 border-t border-border-card pt-6 text-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Masudur Rahman. {t("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  locale,
  children,
}: {
  href: `/#${string}`;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      locale={locale}
      className="group inline-flex items-center gap-2 text-sm text-text/80 transition-colors hover:text-amber"
    >
      <span
        aria-hidden
        className="inline-block h-[1px] w-0 bg-amber transition-all duration-300 group-hover:w-3"
      />
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
    </Link>
  );
}
