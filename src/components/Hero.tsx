import Image from "next/image";
import { FaMicrophone } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { PERSONA } from "@/lib/persona";
import { HeroTypingWord } from "./HeroTypingWord";
import { VoiceCallButton } from "./VoiceCallButton";

export async function Hero() {
  const t = await getTranslations("hero");
  const phrases = t.raw("typing") as string[];
  const headshotAlt = t("headshotAlt");
  const headlineCue = t("headlineCue");
  const headlineTrail = t("headlineTrail");

  const voiceBtnInner = (
    <>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bg/60 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-bg" />
      </span>
      <FaMicrophone className="h-3.5 w-3.5" />
      {t("talkLive")}
    </>
  );

  return (
    <section className="relative flex min-h-0 md:min-h-[100dvh] items-center overflow-hidden px-6 pt-28 pb-12 md:pt-24 md:pb-16">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber/8 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Mobile layout: centered photo + text */}
        <div className="flex flex-col items-center text-center md:hidden">
          <div className="mb-6">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-teal/30 ring-offset-2 ring-offset-bg">
              <Image
                src="/images/headshot.png"
                alt={headshotAlt}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight [word-spacing:0.1em] sm:text-5xl">
              {t("headlineLead")}
              <br />
              {headlineCue}{" "}
              <span className="inline-block min-w-[5ch] text-amber">
                <HeroTypingWord phrases={phrases} />
              </span>
              {headlineTrail && <> {headlineTrail}</>}
            </h1>
            <p className="mx-auto mb-6 max-w-[40ch] text-base text-text-muted leading-relaxed">
              {t("subheadMobile")}
            </p>
            <div className="flex flex-col gap-3">
              <VoiceCallButton className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98]">
                {voiceBtnInner}
              </VoiceCallButton>
              <a
                href={PERSONA.contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-text-strong active:scale-[0.98]"
              >
                {t("bookCall")}
              </a>
              <a
                href="#projects"
                className="mt-1 inline-flex items-center justify-center text-sm font-medium text-text-muted underline decoration-text-muted/30 underline-offset-4 transition-colors hover:text-text"
              >
                {t("seeWork")}
              </a>
            </div>
          </div>
        </div>

        {/* Desktop/tablet layout: side by side */}
        <div className="hidden md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-20 items-center">
          <div>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight [word-spacing:0.1em] lg:text-6xl">
              {t("headlineLead")}
              <br />
              {headlineCue}{" "}
              <span className="inline-block min-w-[5ch] text-left text-amber">
                <HeroTypingWord phrases={phrases} />
              </span>
              {headlineTrail && <> {headlineTrail}</>}
            </h1>
            <p className="mb-8 max-w-[55ch] text-lg text-text-muted leading-relaxed">
              {t("subheadDesktop")}
            </p>
            <div className="flex flex-wrap gap-3">
              <VoiceCallButton className="group inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98]">
                {voiceBtnInner}
              </VoiceCallButton>
              <a
                href={PERSONA.contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-text-strong active:scale-[0.98]"
              >
                {t("bookCall")}
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-text-strong active:scale-[0.98]"
              >
                {t("seeWork")}
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="relative h-60 w-60 lg:h-80 lg:w-80 overflow-hidden rounded-2xl">
                <Image
                  src="/images/headshot.png"
                  alt={headshotAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 240px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
              <div className="absolute -inset-3 -z-10 rounded-2xl border border-teal/20" />
              <div className="absolute -inset-6 -z-20 rounded-3xl bg-teal/5 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
