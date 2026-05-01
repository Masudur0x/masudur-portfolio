"use client";

import { ReactNode } from "react";

function openVoiceCall() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("masudur:open-voice"));
  }
}

export function VoiceCallButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={openVoiceCall} className={className}>
      {children}
    </button>
  );
}
