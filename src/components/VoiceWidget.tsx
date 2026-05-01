"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from "react-icons/fa6";
import { RetellWebClient } from "retell-client-js-sdk";
import { useTranslations } from "next-intl";

interface VoiceWidgetProps {
  open: boolean;
  onClose: () => void;
}

type CallState = "idle" | "connecting" | "live" | "ended" | "error";

interface TranscriptTurn {
  role: "agent" | "user";
  content: string;
}

interface RetellUpdateEvent {
  transcript?: { role: string; content: string }[];
}

export function VoiceWidget({ open, onClose }: VoiceWidgetProps) {
  const t = useTranslations("voice");
  const clientRef = useRef<RetellWebClient | null>(null);
  const [state, setState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [agentTalking, setAgentTalking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const stopCall = useCallback(() => {
    try {
      clientRef.current?.stopCall();
    } catch {}
    clientRef.current = null;
    startedRef.current = false;
    setAgentTalking(false);
  }, []);

  const startCall = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setError(null);
    setTranscript([]);
    setMuted(false);
    setState("connecting");

    const client = new RetellWebClient();
    clientRef.current = client;

    try {
      const res = await fetch("/api/voice/token", { method: "POST" });
      if (clientRef.current !== client) return;
      const data = (await res.json().catch(() => ({}))) as {
        accessToken?: string;
        error?: string;
      };
      if (clientRef.current !== client) return;
      if (!res.ok || !data.accessToken) {
        throw new Error(data.error ?? `Token error (${res.status})`);
      }

      client.on("call_started", () => setState("live"));
      client.on("call_ended", () => {
        setState("ended");
        startedRef.current = false;
      });
      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));
      client.on("update", (update: RetellUpdateEvent) => {
        if (!update?.transcript) return;
        const turns: TranscriptTurn[] = update.transcript
          .filter((turn) => turn.role === "agent" || turn.role === "user")
          .map((turn) => ({ role: turn.role as "agent" | "user", content: turn.content }));
        setTranscript(turns);
      });
      client.on("error", (e: unknown) => {
        const msg =
          typeof e === "string"
            ? e
            : (e as { message?: string })?.message ?? "Call error";
        setError(msg);
        setState("error");
        startedRef.current = false;
      });

      if (clientRef.current !== client) return;
      await client.startCall({ accessToken: data.accessToken });
      if (clientRef.current !== client) {
        try { client.stopCall(); } catch {}
      }
    } catch (err) {
      const msg = (err as Error).message ?? "Could not start the call";
      const friendly =
        msg.toLowerCase().includes("permission") ||
        msg.toLowerCase().includes("notallowed")
          ? t("micBlocked")
          : msg;
      setError(friendly);
      setState("error");
      startedRef.current = false;
    }
  }, [t]);

  useEffect(() => {
    if (!open) return;
    void startCall();
    return () => {
      stopCall();
    };
  }, [open, startCall, stopCall]);

  const toggleMute = () => {
    const c = clientRef.current;
    if (!c) return;
    if (muted) {
      c.unmute();
      setMuted(false);
    } else {
      c.mute();
      setMuted(true);
    }
  };

  const handleClose = () => {
    stopCall();
    setState("idle");
    onClose();
  };

  const lastAgentTurn = [...transcript].reverse().find((t) => t.role === "agent");
  const lastUserTurn = [...transcript].reverse().find((t) => t.role === "user");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="voice-panel"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-amber/30 bg-bg text-text shadow-2xl shadow-black/60 sm:bottom-8 sm:right-8"
          role="dialog"
          aria-label={t("title")}
        >
          <header className="flex items-center justify-between border-b border-border-card bg-gradient-to-b from-amber/[0.06] to-transparent px-4 py-3">
            <div className="flex items-center gap-3">
              <StatusDot state={state} />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{t("title")}</p>
                <p className="text-[11px] text-text-muted">
                  {t(state === "idle" ? "ready" : state)}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-text-muted transition hover:bg-white/5 hover:text-text"
              aria-label={t("closeAria")}
              type="button"
            >
              <FaXmark className="h-4 w-4" />
            </button>
          </header>

          <div className="flex flex-col items-center gap-5 px-6 py-7">
            <Waveform live={state === "live"} active={agentTalking} />

            <div className="min-h-[88px] w-full text-center">
              {state === "error" && (
                <p className="text-sm text-red-300">{error}</p>
              )}
              {state === "connecting" && (
                <p className="text-sm text-text-muted">{t("connectingBody")}</p>
              )}
              {state === "ended" && (
                <p className="text-sm text-text-muted">{t("endedBody")}</p>
              )}
              {state === "live" && (
                <div className="space-y-1 text-left">
                  {lastAgentTurn && (
                    <p className="text-sm text-text">
                      <span className="text-amber">{t("agentLabel")}</span>
                      {lastAgentTurn.content}
                    </p>
                  )}
                  {lastUserTurn && (
                    <p className="text-xs text-text-muted">
                      <span className="text-teal">{t("youLabel")}</span>
                      {lastUserTurn.content}
                    </p>
                  )}
                  {!lastAgentTurn && !lastUserTurn && (
                    <p className="text-center text-sm text-text-muted">
                      {t("listening")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                disabled={state !== "live"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-card bg-bg-card text-text transition hover:border-text-muted disabled:opacity-40"
                aria-label={muted ? t("unmuteAria") : t("muteAria")}
                type="button"
              >
                {muted ? (
                  <FaMicrophoneSlash className="h-4 w-4" />
                ) : (
                  <FaMicrophone className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={handleClose}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 active:scale-95"
                aria-label={t("endCallAria")}
                type="button"
              >
                <FaPhoneSlash className="h-5 w-5" />
              </button>
              {state === "error" || state === "ended" ? (
                <button
                  onClick={() => void startCall()}
                  className="rounded-full border border-amber/40 bg-amber/10 px-4 py-2 text-sm font-medium text-amber transition hover:bg-amber/20"
                  type="button"
                >
                  {t("tryAgain")}
                </button>
              ) : (
                <div className="h-12 w-12" aria-hidden />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusDot({ state }: { state: CallState }) {
  const color =
    state === "live"
      ? "bg-emerald-400"
      : state === "connecting"
      ? "bg-amber"
      : state === "error"
      ? "bg-red-400"
      : "bg-text-muted";
  return (
    <span className="relative flex h-2.5 w-2.5">
      {state === "live" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

function Waveform({ live, active }: { live: boolean; active: boolean }) {
  const bars = 7;
  return (
    <div
      className="flex h-20 items-center justify-center gap-1.5"
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-1.5 rounded-full bg-amber"
          animate={
            live
              ? {
                  height: active
                    ? [12, 56, 22, 48, 16, 40, 24][i % 7]
                    : [8, 14, 10, 12, 9, 13, 11][i % 7],
                  opacity: active ? 1 : 0.45,
                }
              : { height: 6, opacity: 0.25 }
          }
          transition={{
            duration: active ? 0.5 : 1.4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
