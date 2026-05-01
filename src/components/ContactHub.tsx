"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaCommentDots,
  FaWhatsapp,
  FaXmark,
  FaChevronUp,
} from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { PERSONA } from "@/lib/persona";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((m) => m.ChatWidget),
  { ssr: false }
);
const VoiceWidget = dynamic(
  () => import("./VoiceWidget").then((m) => m.VoiceWidget),
  { ssr: false }
);

type ActiveSurface = "none" | "voice" | "chat";

export function ContactHub() {
  const t = useTranslations("contactHub");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<ActiveSurface>("none");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!expanded) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  useEffect(() => {
    const handler = () => {
      setActive("voice");
      setExpanded(false);
    };
    window.addEventListener("masudur:open-voice", handler);
    return () => window.removeEventListener("masudur:open-voice", handler);
  }, []);

  const openVoice = useCallback(() => {
    setActive("voice");
    setExpanded(false);
  }, []);
  const openChat = useCallback(() => {
    setActive("chat");
    setExpanded(false);
  }, []);
  const closeSurface = useCallback(() => setActive("none"), []);

  const surfaceLive = active !== "none";

  return (
    <>
      {active === "chat" && (
        <ChatWidget open onClose={closeSurface} />
      )}
      {active === "voice" && (
        <VoiceWidget open onClose={closeSurface} />
      )}

      <div
        ref={containerRef}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
      >
        <AnimatePresence>
          {expanded && (
            <motion.ul
              key="hub-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col items-end gap-2.5"
            >
              <HubOption
                icon={<FaMicrophone className="h-4 w-4" />}
                label={t("talkLive")}
                hint={t("talkLiveHint")}
                onClick={openVoice}
                accent="amber"
              />
              <HubOption
                icon={<FaCommentDots className="h-4 w-4" />}
                label={t("chat")}
                hint={t("chatHint")}
                onClick={openChat}
                accent="teal"
              />
              <HubOption
                icon={<FaWhatsapp className="h-4 w-4" />}
                label={t("whatsapp")}
                hint={t("whatsappHint")}
                href={PERSONA.contact.whatsapp}
                accent="emerald"
              />
            </motion.ul>
          )}
        </AnimatePresence>

        {!surfaceLive && (
          <motion.button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? t("closeMenuAria") : t("openMenuAria")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-amber/40 bg-bg-card/95 px-4 py-3 text-sm font-medium text-text shadow-2xl shadow-black/40 backdrop-blur transition hover:border-amber active:scale-[0.98] sm:px-5 sm:py-3.5"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber text-bg">
              <AnimatePresence mode="wait" initial={false}>
                {expanded ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <FaXmark className="h-3.5 w-3.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="mic"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <FaMicrophone className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
              {!expanded && (
                <span className="absolute inset-0 rounded-full bg-amber/40 animate-ping" />
              )}
            </span>
            <span className="hidden whitespace-nowrap sm:inline">
              {expanded ? t("close") : t("open")}
            </span>
            <FaChevronUp
              className={`hidden h-3 w-3 text-text-muted transition-transform sm:inline ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        )}
      </div>
    </>
  );
}

interface HubOptionProps {
  icon: React.ReactNode;
  label: string;
  hint: string;
  onClick?: () => void;
  href?: string;
  accent: "amber" | "teal" | "emerald";
}

function HubOption({ icon, label, hint, onClick, href, accent }: HubOptionProps) {
  const accentRing = {
    amber: "border-amber/30 hover:border-amber",
    teal: "border-teal/30 hover:border-teal",
    emerald: "border-emerald-400/30 hover:border-emerald-400",
  }[accent];
  const accentChip = {
    amber: "bg-amber text-bg",
    teal: "bg-teal text-bg",
    emerald: "bg-emerald-500 text-white",
  }[accent];

  const inner = (
    <>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${accentChip}`}
      >
        {icon}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-sm font-medium text-text">{label}</span>
        <span className="text-[11px] text-text-muted">{hint}</span>
      </span>
    </>
  );

  const className = `inline-flex items-center gap-3 rounded-full border bg-bg-card/95 px-3 py-2 pr-5 shadow-xl shadow-black/40 backdrop-blur transition active:scale-[0.98] ${accentRing}`;

  return (
    <motion.li
      variants={{
        open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } },
        closed: { opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.14 } },
      }}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {inner}
        </button>
      )}
    </motion.li>
  );
}
