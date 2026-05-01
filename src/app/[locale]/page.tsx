import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { YouTube } from "@/components/YouTube";
import { FAQs } from "@/components/FAQs";
import { Contact } from "@/components/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Projects />
      <Skills />
      <YouTube />
      <FAQs />
      <Contact />
    </>
  );
}
