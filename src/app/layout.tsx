import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geist.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
