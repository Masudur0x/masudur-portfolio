"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const typingPhrases = [
  "time",
  "money",
  "hours",
  "effort",
];

function useTypingEffect(phrases: string[], typingSpeed = 120, deletingSpeed = 80, pauseDuration = 2000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(() => {
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
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

export function Hero() {
  const typedWord = useTypingEffect(typingPhrases);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden px-6 pt-32 pb-16">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber/8 blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/5 blur-[100px] animate-pulse [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            I build AI systems that
            <br className="hidden sm:block" />
            {" "}save businesses{" "}
            <span className="inline-block min-w-[3ch] text-left text-teal">
              {typedWord}
              <span className="animate-blink">|</span>
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-text-muted">
            From intelligent workflow automation to voice AI agents, I help
            businesses automate what slows them down so they can focus on what
            matters.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://calendar.app.google/u8anzw3Wr3MC3WTX6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-amber px-6 py-3 font-medium text-bg transition-colors hover:bg-amber-dark"
            >
              Book a Call
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg border border-border-card px-6 py-3 font-medium text-text transition-colors hover:border-teal hover:text-teal"
            >
              See My Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
