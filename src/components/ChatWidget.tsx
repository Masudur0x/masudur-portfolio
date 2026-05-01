"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark, FaPaperPlane, FaRotateLeft } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  open: boolean;
  onClose: () => void;
}

const STORAGE_KEY_PREFIX = "masudur-chat-history-v1";
const LEAD_TOKEN = "[LEAD]";

function loadHistory(storageKey: string, fallback: ChatMessage): ChatMessage[] {
  if (typeof window === "undefined") return [fallback];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [fallback];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return [fallback];
}

function saveHistory(storageKey: string, messages: ChatMessage[]) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(messages));
  } catch {}
}

function stripLeadToken(text: string): string {
  return text.replace(/\s*\[LEAD\]\s*/g, "").trim();
}

export function ChatWidget({ open, onClose }: ChatWidgetProps) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const storageKey = `${STORAGE_KEY_PREFIX}-${locale}`;
  const greeting = useMemo<ChatMessage>(
    () => ({ role: "assistant", content: t("greeting") }),
    [t],
  );
  const suggestedPrompts = useMemo(
    () => t.raw("suggested") as string[],
    [t],
  );
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [leadError, setLeadError] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    setMessages(loadHistory(storageKey, greeting));
    hydratedRef.current = true;
  }, [storageKey, greeting]);

  useEffect(() => {
    if (hydratedRef.current) saveHistory(storageKey, messages);
  }, [storageKey, messages]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, leadOpen]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || streaming) return;

      const next: ChatMessage[] = [
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: "" },
      ];
      setMessages(next);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next
              .slice(0, -1)
              .filter((m) => m.content.length > 0 || m.role === "user"),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Chat error (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assembled = "";
        let leadDetected = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.delta) {
                assembled += parsed.delta as string;
                if (!leadDetected && assembled.includes(LEAD_TOKEN)) {
                  leadDetected = true;
                }
                const visible = stripLeadToken(assembled);
                setMessages((prev) => {
                  const copy = prev.slice();
                  copy[copy.length - 1] = {
                    role: "assistant",
                    content: visible,
                  };
                  return copy;
                });
              }
            } catch {}
          }
        }

        if (leadDetected) setLeadOpen(true);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => {
          const copy = prev.slice();
          copy[copy.length - 1] = {
            role: "assistant",
            content: t("errorFallback"),
          };
          return copy;
        });
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming, t],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([greeting]);
    setInput("");
    setLeadOpen(false);
    setLeadStatus("idle");
    setLeadError(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {}
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadStatus === "sending") return;
    setLeadStatus("sending");
    setLeadError(null);
    try {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          intent: lastUser?.content ?? "",
          transcript: messages,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      setLeadStatus("sent");
    } catch (err) {
      setLeadStatus("error");
      setLeadError((err as Error).message);
    }
  };

  const showSuggestions =
    messages.length === 1 && messages[0].role === "assistant" && !streaming;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="chat-panel"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] text-white shadow-2xl shadow-black/60 sm:bottom-8 sm:right-8"
          role="dialog"
          aria-label={t("title")}
        >
          <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{t("title")}</p>
                <p className="text-[11px] text-white/50">{t("subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
                aria-label={t("resetAria")}
                type="button"
              >
                <FaRotateLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
                aria-label={t("closeAria")}
                type="button"
              >
                <FaXmark className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div
            ref={scrollerRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
            {streaming &&
              messages[messages.length - 1]?.content === "" && (
                <MessageBubble role="assistant" content="…" />
              )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => void send(p)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {leadOpen && leadStatus !== "sent" && (
              <form
                onSubmit={submitLead}
                className="mt-3 space-y-2 rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-3"
              >
                <p className="text-xs text-cyan-100/90">{t("leadIntro")}</p>
                <input
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder={t("leadNamePlaceholder")}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-cyan-400/60"
                />
                <input
                  required
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder={t("leadEmailPlaceholder")}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-cyan-400/60"
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setLeadOpen(false)}
                    className="text-xs text-white/40 transition hover:text-white/70"
                  >
                    {t("notNow")}
                  </button>
                  <button
                    type="submit"
                    disabled={leadStatus === "sending"}
                    className="rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300 disabled:opacity-50"
                  >
                    {leadStatus === "sending" ? t("leadSending") : t("leadSend")}
                  </button>
                </div>
                {leadStatus === "error" && (
                  <p className="text-xs text-red-300">{leadError}</p>
                )}
              </form>
            )}

            {leadStatus === "sent" && (
              <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3 text-xs text-emerald-100">
                {t("leadSent")}
              </div>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 border-t border-white/10 bg-black/30 px-3 py-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
              placeholder={t("inputPlaceholder")}
              className="max-h-32 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-cyan-400/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="rounded-xl bg-cyan-400 p-2.5 text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("sendAria")}
            >
              <FaPaperPlane className="h-3.5 w-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-cyan-400 px-3.5 py-2 text-sm leading-relaxed text-black"
            : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm leading-relaxed text-white/90"
        }
      >
        {content || "…"}
      </div>
    </div>
  );
}
