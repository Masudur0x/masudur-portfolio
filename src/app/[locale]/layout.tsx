import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist, Hind_Siliguri } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactHubLazy } from "@/components/ContactHubLazy";
import { Providers } from "@/components/Providers";
import { routing } from "@/i18n/routing";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Masudur Rahman | AI Automation Developer & CTO",
  description:
    "I build AI systems that save businesses time and money. Specializing in n8n workflow automation, voice AI agents, and agentic AI systems.",
  keywords: [
    "AI automation",
    "n8n",
    "Vapi",
    "Retell",
    "voice AI",
    "agentic AI",
    "workflow automation",
    "CTO",
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${geist.variable} ${hindSiliguri.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <NextIntlClientProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ContactHubLazy />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
