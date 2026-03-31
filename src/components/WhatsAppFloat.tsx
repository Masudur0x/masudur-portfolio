"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-show tooltip briefly after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`relative rounded-lg bg-[#075E54] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
          showTooltip
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0 pointer-events-none"
        }`}
      >
        Chat with me!
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-[#075E54]" />
      </div>

      {/* WhatsApp button */}
      <a
        href="https://wa.link/cnj2nn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => { setShowTooltip(true); setHasInteracted(true); }}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => { setShowTooltip(true); setHasInteracted(true); }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <span className="absolute inset-[-4px] animate-pulse rounded-full border-2 border-[#25D366]/40" />

        <FaWhatsapp size={28} className="relative z-10" />
      </a>
    </div>
  );
}
