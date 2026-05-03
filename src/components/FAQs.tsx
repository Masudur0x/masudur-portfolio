import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { HiOutlinePlus } from "react-icons/hi2";
import { Section, SectionHeading, SectionSubheading } from "./Section";

interface FAQItem {
  q: string;
  a: string;
}

export async function FAQs() {
  const t = await getTranslations("faqs");
  const items = t.raw("items") as FAQItem[];

  // FAQPage JSON-LD — picked up by Google AI Overviews, Perplexity, ChatGPT
  // search citations. Mirror the visible content 1:1.
  // Source data is compile-time translation strings (no user input). Escape
  // `<` to `<` so a stray `</script>` in copy can't break out of the tag.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const jsonLdSafe = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <Section id="faqs" className="bg-bg-card/30 section-glow">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {jsonLdSafe}
      </Script>

      <SectionHeading>{t("heading")}</SectionHeading>
      <SectionSubheading>{t("subheading")}</SectionSubheading>

      <div className="mx-auto max-w-3xl divide-y divide-border-card overflow-hidden rounded-2xl border border-border-card bg-bg-card">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 transition-colors hover:bg-bg/40">
              <span className="text-base font-medium text-text sm:text-lg">
                {item.q}
              </span>
              <HiOutlinePlus
                className="h-5 w-5 flex-shrink-0 text-teal transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted sm:text-base">
                {item.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
