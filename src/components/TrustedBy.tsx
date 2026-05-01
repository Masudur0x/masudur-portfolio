"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const PIXELS_PER_SECOND = 40;

export function TrustedBy() {
  const t = useTranslations("marquee");
  const items = (t.raw("items") ?? []) as string[];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const halfWidthRef = useRef(0);

  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const decayingRef = useRef(false);
  const pausedRef = useRef(false);

  const loop = items.length ? [...items, ...items] : [];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = (x: number) => {
      const half = halfWidthRef.current || 1;
      let v = x % half;
      if (v > 0) v -= half;
      return v;
    };

    const tick = (now: number) => {
      const last = lastTimeRef.current ?? now;
      const dt = (now - last) / 1000;
      lastTimeRef.current = now;

      if (draggingRef.current) {
        // user controls offset directly
      } else if (decayingRef.current) {
        offsetRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(0.001, dt);
        if (Math.abs(velocityRef.current) < PIXELS_PER_SECOND) {
          decayingRef.current = false;
          velocityRef.current = 0;
        }
      } else if (!pausedRef.current) {
        offsetRef.current -= PIXELS_PER_SECOND * dt;
      }

      offsetRef.current = wrap(offsetRef.current);
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    decayingRef.current = false;
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + dx;

    const now = performance.now();
    const dt = (now - lastMoveTimeRef.current) / 1000;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastMoveXRef.current) / dt;
    }
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = now;
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (Math.abs(velocityRef.current) > PIXELS_PER_SECOND) {
      decayingRef.current = true;
    }
  };

  if (!items.length) return null;

  return (
    <section
      aria-label={t("label")}
      className="relative overflow-hidden border-y border-amber/15 bg-gradient-to-b from-amber/[0.04] via-transparent to-amber/[0.04] py-8 sm:py-10"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Pinned left label */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3 pr-6 sm:pl-8 sm:pr-16">
        <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-amber backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.18em]">
          {t("label")}
        </span>
      </div>
      {/* Gradient that masks items behind the pinned label */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg via-bg/95 to-transparent sm:w-56" />
      {/* Right edge fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-32" />

      <div
        className="overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center select-none will-change-transform"
        >
          {/* Spacer matching the pinned label width */}
          <span aria-hidden className="block w-32 shrink-0 sm:w-56" />
          {loop.map((item, i) => (
            <Item key={`${item}-${i}`} text={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center">
      <span className="whitespace-nowrap px-4 text-[13px] font-medium tracking-tight text-text/85 transition-colors duration-200 hover:text-amber sm:px-8 sm:text-base">
        {text}
      </span>
      <span aria-hidden className="block h-1 w-1 shrink-0 rotate-45 bg-amber/50" />
    </div>
  );
}
