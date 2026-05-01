"use client";

import { useEffect, useState } from "react";

const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
const PAUSE_DURATION = 2000;

export function HeroTypingWord({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0] ?? "");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prevPhrases, setPrevPhrases] = useState(phrases);

  if (prevPhrases !== phrases) {
    setPrevPhrases(phrases);
    setText(phrases[0] ?? "");
    setPhraseIndex(0);
    setIsDeleting(false);
  }

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!current) return;

    // Fully typed → pause, then start deleting.
    if (!isDeleting && text === current) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      return () => clearTimeout(t);
    }

    // Fully erased → move to next phrase, start typing again.
    if (isDeleting && text === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 0);
      return () => clearTimeout(t);
    }

    // Otherwise type or delete one character.
    const delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const t = setTimeout(() => {
      setText(
        isDeleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <>
      {text}
      <span className="animate-blink">|</span>
    </>
  );
}
