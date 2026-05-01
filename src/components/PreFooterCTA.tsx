import { getTranslations } from "next-intl/server";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { PERSONA } from "@/lib/persona";

export async function PreFooterCTA() {
  const t = await getTranslations("preFooter");

  return (
    <section
      aria-labelledby="prefooter-heading"
      className="relative overflow-hidden border-y border-border-card bg-bg-card/40 px-6 py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal/8 blur-[120px]" />
        <div className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2
          id="prefooter-heading"
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
        >
          {t("headline")}
        </h2>
        <p className="mt-4 max-w-[55ch] text-base text-text-muted leading-relaxed sm:text-lg">
          {t("sub")}
        </p>

        <div className="mt-8">
          <a
            href={PERSONA.contact.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-7 py-4 text-base font-semibold text-bg shadow-lg shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-amber/30 active:scale-[0.98] sm:text-lg"
          >
            {t("cta")}
            <HiOutlineArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
