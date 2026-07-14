"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useCountUp(target: number, duration = 2000, start = false, instant = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (instant) { setCount(target); return; }
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, instant]);
  return count;
}

export default function Hero() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const slides = ["/heroimage.jpeg", "/heroimage3.jpeg", "/heroimage7.jpeg"];

  useEffect(() => { setVisible(true); }, []);

  // Auto-rotation pauses entirely for reduced-motion visitors (dots still work)
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [reduced]);

  const children  = useCountUp(500, 1800, visible, reduced);
  const education = useCountUp(300, 1800, visible, reduced);
  const nutrition = useCountUp(200, 1800, visible, reduced);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a1a10]" style={{ minHeight: "100svh" }}>
      {/* Ken Burns drift — desktop only (mobile keeps the whole photo visible, untouched) */}
      <style>{`
        .pf-hero-img { transition: transform 8s ease-out; }
        @media (min-width: 1024px) {
          .pf-hero-img.pf-active { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-hero-img { transition: none !important; transform: none !important; }
        }
      `}</style>

      {/* Phone: show the WHOLE photo (object-contain). Desktop: full-bleed (object-cover).
          next/image serves responsive AVIF/WebP and preloads the first slide (LCP). */}
      {slides.map((src, i) => (
        <div key={src} aria-hidden="true"
          className="absolute inset-0 overflow-hidden transition-opacity motion-reduce:transition-none"
          style={{ opacity: slide === i ? 1 : 0, transitionDuration: "1500ms" }}>
          <Image src={src} alt="" fill priority={i === 0} sizes="100vw"
            className={`pf-hero-img object-contain object-center lg:object-cover ${slide === i ? "pf-active" : ""}`} />
        </div>
      ))}

      {/* On phone the overlay is lighter so the full photo stays visible; on desktop it's the original strong gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/85 via-[#0a1a10]/35 to-[#0a1a10]/55 lg:bg-gradient-to-r lg:from-[#0a1a10]/95 lg:via-[#0a1a10]/70 lg:to-[#0a1a10]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/70 via-transparent to-transparent lg:from-[#0a1a10]/85" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 pt-28 sm:px-12 sm:pb-24 lg:justify-center lg:px-20 lg:py-0 xl:px-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 transition-all duration-700 motion-reduce:transition-none"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "100ms" }}>
            <div className="h-px w-8 bg-[#c9962a] sm:w-10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9962a] sm:text-[11px] sm:tracking-[0.32em]">{t.hero.badge}</span>
          </div>

          <h1 className="mt-6 font-heading text-[clamp(38px,8vw,86px)] font-semibold leading-[1.04] text-white sm:mt-7 sm:leading-[1.02]">
            {[t.hero.line1, t.hero.line2].map((w, i) => (
              <span key={i} className="inline-block"
                style={{ animation: visible && !reduced ? `wordReveal 0.7s cubic-bezier(.22,1,.36,1) ${200 + i * 90}ms both` : "none" }}>
                {w}
              </span>
            )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, " ", el], [])}
            <br />
            <span className="inline-block" style={{ animation: visible && !reduced ? `wordReveal 0.7s cubic-bezier(.22,1,.36,1) 380ms both` : "none" }}>{t.hero.line3a}</span>{" "}
            <em className="italic text-[#e8b84b]">
              <span className="inline-block" style={{ animation: visible && !reduced ? `wordReveal 0.7s cubic-bezier(.22,1,.36,1) 470ms both` : "none" }}>{t.hero.line3b}</span>
            </em>
            <br />
            <span className="inline-block" style={{ animation: visible && !reduced ? `wordReveal 0.7s cubic-bezier(.22,1,.36,1) 560ms both` : "none" }}>{t.hero.line4}</span>
          </h1>

          <div className="mt-7 h-[3px] rounded-full bg-[#c9962a] transition-all duration-1000 motion-reduce:transition-none sm:mt-8"
            style={{ width: visible || reduced ? "80px" : "0px", transitionDelay: "500ms" }} />

          <p className="mt-7 max-w-xl text-[16px] leading-7 text-white/80 transition-all duration-700 motion-reduce:transition-none sm:mt-8 sm:text-[17px] sm:leading-8 lg:text-white/75"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "400ms" }}>
            {t.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 transition-all duration-700 motion-reduce:transition-none sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "550ms" }}>
            <Link href="/donate"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,150,42,0.45)]">
              <span className="relative z-10 flex items-center gap-3">{t.hero.cta1} <span className="text-base leading-none">→</span></span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:hidden" />
            </Link>
            <Link href="/about"
              className="inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:text-white">
              {t.hero.cta2}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8 transition-all duration-700 motion-reduce:transition-none sm:mt-16 sm:gap-10 sm:pt-10"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "700ms" }}>
            {[
              { num: children,  suffix: "+", label: t.hero.stat1Label },
              { num: education, suffix: "+", label: t.hero.stat2Label },
              { num: nutrition, suffix: "+", label: t.hero.stat3Label },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <p className="font-heading text-[34px] font-semibold leading-none text-white sm:text-[42px]">
                  {num.toLocaleString()}<span className="text-[#c9962a]">{suffix}</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-5 z-20 flex gap-2 sm:bottom-10 sm:right-8">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
            aria-current={slide === i}
            className="flex h-11 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
            <span className="h-[2px] transition-all duration-500 motion-reduce:transition-none"
              style={{ width: slide === i ? "28px" : "12px", background: slide === i ? "#c9962a" : "rgba(255,255,255,0.3)" }} />
          </button>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 lg:flex">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-white/10">
          <div className="animate-scrollCue absolute inset-x-0 top-0 h-4 rounded-full bg-gradient-to-b from-[#c9962a] via-[#c9962a]/60 to-transparent motion-reduce:hidden" />
        </div>
      </div>
    </section>
  );
}
