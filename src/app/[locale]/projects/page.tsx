import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PERSONA } from "@/lib/persona";
import { ProjectsGrid } from "./ProjectsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <section className="px-6 pt-32 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
        >
          {t("backHome")}
        </Link>
        <div className="mb-4 h-1 w-10 rounded-full bg-amber" />
        <h1 className="mb-3 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
          {t("allTitle")}
        </h1>
        <p className="mb-12 max-w-[55ch] text-text-muted text-base md:text-lg leading-relaxed">
          {t("allDescription")}
        </p>

        <ProjectsGrid projects={PERSONA.projects} />
      </div>
    </section>
  );
}
