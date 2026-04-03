"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const typingPhrases = ["time", "money", "clients", "sleep"];

function useTypingEffect(
  phrases: string[],
  typingSpeed = 120,
  deletingSpeed = 80,
  pauseDuration = 2000
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
            return;
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return text;
}

export function Hero() {
  const typedWord = useTypingEffect(typingPhrases);

  return (
    <section className="relative flex min-h-0 md:min-h-[100dvh] items-center overflow-hidden px-6 pt-20 pb-10 md:pt-24 md:pb-16">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber/8 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Mobile layout: centered photo + text */}
        <div className="flex flex-col items-center text-center md:hidden">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full ring-2 ring-teal/30 ring-offset-2 ring-offset-bg">
              <Image
                src="/images/headshot.png"
                alt="Masudur Rahman"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl">
              Stop losing{" "}
              <span className="inline-block min-w-[4ch] text-amber">
                {typedWord}
                <span className="animate-blink">|</span>
              </span>
              <br />
              to work AI can handle
            </h1>
            <p className="mx-auto mb-6 max-w-[40ch] text-base text-text-muted leading-relaxed">
              I help businesses automate what slows them down — from workflow automation to voice AI agents.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="https://calendar.app.google/u8anzw3Wr3MC3WTX6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98]"
              >
                Book a Call
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-white active:scale-[0.98]"
              >
                See My Work
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop/tablet layout: side by side */}
        <div className="hidden md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tighter lg:text-6xl">
              Stop losing{" "}
              <span className="inline-block min-w-[4ch] text-left text-amber">
                {typedWord}
                <span className="animate-blink">|</span>
              </span>
              <br />
              to work AI can handle
            </h1>
            <p className="mb-8 max-w-[55ch] text-lg text-text-muted leading-relaxed">
              From intelligent workflow automation to voice AI agents, I help
              businesses automate what slows them down so they can focus on what
              matters.
            </p>
            <div className="flex gap-4">
              <a
                href="https://calendar.app.google/u8anzw3Wr3MC3WTX6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98]"
              >
                Book a Call
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-all hover:border-text-muted hover:text-white active:scale-[0.98]"
              >
                See My Work
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="relative h-60 w-60 lg:h-80 lg:w-80 overflow-hidden rounded-2xl">
                <Image
                  src="/images/headshot.png"
                  alt="Masudur Rahman"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
              <div className="absolute -inset-3 -z-10 rounded-2xl border border-teal/20" />
              <div className="absolute -inset-6 -z-20 rounded-3xl bg-teal/5 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
