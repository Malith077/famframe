"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SCREENSHOTS } from "@/lib/site";

const AUTOPLAY_MS = 4000;

/**
 * Auto-advancing, swipeable phone-frame carousel of app screenshots.
 * Slides come from HERO_SCREENSHOTS (swap the images in public/screenshots/).
 */
export function HeroCarousel() {
  const slides = HERO_SCREENSHOTS;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  // Autoplay, respecting reduced-motion and pause-on-hover.
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, slides.length, go]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  }

  return (
    <div
      className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Phone frame */}
      <div
        className="relative w-full rounded-[2.75rem] border border-surface-variant bg-surface-lowest p-2.5 shadow-[var(--shadow-modal)]"
        role="group"
        aria-roledescription="carousel"
        aria-label="App screenshots"
      >
        {/* dynamic island */}
        <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-on-surface/90" />
        <div
          className="overflow-hidden rounded-[2.1rem]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                draggable={false}
                className="w-full shrink-0 select-none"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-primary"
                : "w-2 bg-outline-variant hover:bg-primary-container"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
