import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================================
   TokoHeroCarousel
   ----------------------------------------------------------------------------
   A self-contained hero carousel for the Toko site. No external CSS or UI
   library required — styles are injected once via a scoped <style> tag, so it
   drops into any React app (Vite, Next, CRA) without Tailwind config.

   Fonts: this component references "Anton" (headlines) and "Mona Sans" (body),
   matching CLAUDE.md. Make sure those @font-face / @import rules are loaded
   globally in the app (they are in the HTML prototype). Fallbacks are provided.

   USAGE
   -----
   import TokoHeroCarousel from "./TokoHeroCarousel";

   // zero-config (uses the placeholder DEFAULT_SLIDES):
   <TokoHeroCarousel />

   // real content:
   <TokoHeroCarousel
     slides={[
       { bg: "/banners/mixer.png", eyebrow: "Featured", title: "Mixer Bots",
         body: "…", cta: { label: "View Collection", href: "/c/mixer-bots" } },
     ]}
     autoplay
     interval={6000}
     pauseOnHover
   />

   SLIDE SHAPE
   -----------
   {
     bg:      string  // image path/URL OR a CSS background value (e.g. gradient)
     label?:  string  // caption shown on gradient placeholder slides
     eyebrow?:string  // small uppercase line above the title
     title:   string  // big Anton headline
     body?:   string  // supporting text
     cta?:    { label: string, href?: string, onClick?: (e) => void }
   }
   ========================================================================== */

export const DEFAULT_SLIDES = [
  {
    bg: "linear-gradient(120deg, #3b2c8f 0%, #5b3fb0 45%, #7d5fd6 100%)",
    label: "Replace with banner image",
    eyebrow: "Featured Collection",
    title: "Mixer Bots",
    body: "Universal Pictures. Sony. Netflix. Microsoft. Samsung. Wall Street Journal. DOW Jones. Nike. Honda.",
    cta: { label: "View Collection", href: "#" },
  },
  {
    bg: "linear-gradient(120deg, #0f5d52 0%, #0e8a6e 50%, #16a34a 100%)",
    label: "Replace with banner image",
    eyebrow: "Now on the Launchpad",
    title: "Genesis Drop",
    body: "Be first to mint the inaugural release. Deterministic generation, fully on-chain provenance.",
    cta: { label: "Go to Launchpad", href: "#" },
  },
  {
    bg: "linear-gradient(120deg, #7a1f4f 0%, #b8295f 50%, #f59e0b 120%)",
    label: "Replace with banner image",
    eyebrow: "Secondary Marketplace",
    title: "Trade Your Tokens",
    body: "Buy, sell, and discover issued tokens peer-to-peer with transparent pricing and history.",
    cta: { label: "Browse Market", href: "#" },
  },
];

const isImage = (s) =>
  typeof s === "string" &&
  (/\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(s) ||
    (/^(https?:|\/|data:)/i.test(s) && !/gradient/i.test(s)));

let stylesInjected = false;
function useCarouselStyles() {
  useEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-toko-hero-carousel", "");
    el.textContent = CAROUSEL_CSS;
    document.head.appendChild(el);
  }, []);
}

export default function TokoHeroCarousel({
  slides = DEFAULT_SLIDES,
  autoplay = true,
  interval = 6000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
  showProgressBar = true,
  enableSwipe = true,
  enableKeyboard = true,
  className = "",
}) {
  useCarouselStyles();

  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const rootRef = useRef(null);
  const dragX = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = useCallback(
    (i) => {
      if (count === 0) return;
      setIndex(loop ? (i + count) % count : Math.max(0, Math.min(count - 1, i)));
    },
    [count, loop]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // keep a ref of progress so the rAF closure can read it without re-subscribing
  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // autoplay loop driven by requestAnimationFrame (smooth progress bar)
  const autoplayOn = autoplay && !reduceMotion && count > 1;
  useEffect(() => {
    if (!autoplayOn) {
      setProgress(0);
      return;
    }
    let raf;
    let start = performance.now();
    const tick = (now) => {
      if (pausedRef.current) {
        start = now - (progressRef.current * interval) / 100;
      } else {
        const pct = Math.min(100, ((now - start) / interval) * 100);
        setProgress(pct);
        if (pct >= 100) {
          start = now;
          setIndex((i) => (loop ? (i + 1) % count : Math.min(count - 1, i + 1)));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // restart the timer whenever the active slide changes via interaction
  }, [autoplayOn, interval, loop, count, index]);

  // pause when the tab is hidden
  useEffect(() => {
    const onVis = () => (pausedRef.current = document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e) => {
    if (!enableKeyboard) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // swipe / drag
  const startDrag = (x) => {
    if (!enableSwipe) return;
    dragX.current = x;
    pausedRef.current = true;
  };
  const endDrag = (x) => {
    if (!enableSwipe || dragX.current === null) return;
    const dx = x - dragX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    dragX.current = null;
    pausedRef.current = false;
  };

  const hoverHandlers = pauseOnHover
    ? {
        onMouseEnter: () => (pausedRef.current = true),
        onMouseLeave: () => (pausedRef.current = false),
      }
    : {};

  return (
    <div
      ref={rootRef}
      className={"thc " + className}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      tabIndex={enableKeyboard ? 0 : undefined}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchEnd={(e) => endDrag(e.changedTouches[0].clientX)}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseUp={(e) => endDrag(e.clientX)}
      {...hoverHandlers}
    >
      <div
        className="thc-track"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {slides.map((s, i) => {
          const img = isImage(s.bg);
          return (
            <div
              key={i}
              className={"thc-slide" + (img ? "" : " is-placeholder")}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              data-label={!img ? s.label || "" : undefined}
              style={
                img
                  ? { backgroundImage: `url('${s.bg}')` }
                  : { background: s.bg }
              }
            >
              <div className="thc-content">
                {s.eyebrow && <p className="thc-eyebrow">{s.eyebrow}</p>}
                {s.title && <h2 className="thc-title">{s.title}</h2>}
                {s.body && <p className="thc-body">{s.body}</p>}
                {s.cta && (
                  <a
                    className="thc-cta"
                    href={s.cta.href || "#"}
                    onClick={s.cta.onClick}
                  >
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            className="thc-arrow prev"
            aria-label="Previous slide"
            onClick={prev}
          >
            &#8249;
          </button>
          <button
            className="thc-arrow next"
            aria-label="Next slide"
            onClick={next}
          >
            &#8250;
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="thc-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={"thc-dot" + (i === index ? " active" : "")}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      {showProgressBar && autoplayOn && (
        <div className="thc-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

const CAROUSEL_CSS = `
.thc {
  position: relative;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #1d1d1d;
  aspect-ratio: 16 / 6;
  min-height: 300px;
  box-shadow: 0 10px 40px -12px rgba(0,0,0,0.35);
  user-select: none;
  font-family: "Mona Sans", system-ui, sans-serif;
  outline: none;
}
@media (max-width: 720px) { .thc { aspect-ratio: 3 / 4; min-height: 460px; } }

.thc-track {
  position: absolute; inset: 0;
  display: flex;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.thc-slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}
.thc-slide::before {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(90deg,
    rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.42) 38%,
    rgba(0,0,0,0.05) 70%, rgba(0,0,0,0) 100%);
}
@media (max-width: 720px) {
  .thc-slide { align-items: flex-end; }
  .thc-slide::before {
    background: linear-gradient(0deg,
      rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.05) 100%);
  }
}

.thc-content {
  position: relative; z-index: 1;
  color: #fff;
  padding: clamp(24px, 5vw, 64px);
  max-width: 620px;
}
.thc-eyebrow {
  font-family: "Mona Sans", sans-serif;
  font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
  font-size: clamp(11px, 1.2vw, 13px); color: #f59e0b; margin: 0 0 10px;
}
.thc-title {
  font-family: "Anton", sans-serif; font-weight: 400;
  line-height: 0.98; letter-spacing: 0.5px; text-transform: uppercase;
  font-size: clamp(34px, 5.5vw, 64px); margin: 0 0 12px;
  text-shadow: 0 2px 18px rgba(0,0,0,0.35);
}
.thc-body {
  font-size: clamp(14px, 1.5vw, 18px); line-height: 1.45;
  max-width: 46ch; margin: 0 0 22px;
  color: rgba(255,255,255,0.92); text-shadow: 0 1px 10px rgba(0,0,0,0.4);
}
.thc-cta {
  display: inline-block; background: #fff; color: #000;
  font-family: "Mona Sans", sans-serif;
  font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  font-size: 14px; text-decoration: none;
  padding: 12px 22px; border-radius: 999px;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.thc-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 20px -8px rgba(0,0,0,0.5); }

.thc-slide.is-placeholder::after {
  content: attr(data-label);
  position: absolute; right: 18px; bottom: 16px; z-index: 1;
  font-family: "Mona Sans", monospace;
  font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
  color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.35);
  border: 1px dashed rgba(255,255,255,0.4);
  padding: 5px 9px; border-radius: 6px;
}

.thc-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
  width: 44px; height: 44px; border: none; border-radius: 999px;
  background: rgba(255,255,255,0.9); color: #000; cursor: pointer;
  display: grid; place-items: center; font-size: 20px;
  transition: background 150ms ease, transform 150ms ease;
  box-shadow: 0 4px 14px -4px rgba(0,0,0,0.4);
}
.thc-arrow:hover { background: #fff; transform: translateY(-50%) scale(1.06); }
.thc-arrow.prev { left: 16px; }
.thc-arrow.next { right: 16px; }
@media (max-width: 720px) {
  .thc-arrow { width: 38px; height: 38px; top: auto; bottom: 60px; transform: none; }
  .thc-arrow:hover { transform: scale(1.06); }
  .thc-arrow.prev { left: 12px; } .thc-arrow.next { right: 12px; }
}

.thc-dots {
  position: absolute; z-index: 3; right: 22px; bottom: 18px;
  display: flex; gap: 8px;
}
@media (max-width: 720px) {
  .thc-dots { left: 0; right: 0; bottom: 18px; justify-content: center; }
}
.thc-dot {
  width: 9px; height: 9px; padding: 0; border: none; border-radius: 999px;
  background: rgba(255,255,255,0.45); cursor: pointer;
  transition: width 250ms ease, background 250ms ease;
}
.thc-dot.active { width: 26px; background: #f59e0b; }

.thc-progress {
  position: absolute; left: 0; bottom: 0; z-index: 3;
  height: 3px; width: 100%; background: rgba(255,255,255,0.12);
}
.thc-progress > span { display: block; height: 100%; background: #f59e0b; }

@media (prefers-reduced-motion: reduce) { .thc-track { transition: none; } }
`;
