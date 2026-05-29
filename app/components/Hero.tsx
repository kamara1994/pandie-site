"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);

  const slides = ["/heroimage.jpeg", "/heroimage3.jpeg", "/heroimage7.jpeg"];

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const children  = useCountUp(500, 1800, visible);
  const education = useCountUp(300, 1800, visible);
  const nutrition = useCountUp(200, 1800, visible);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a1a10]" style={{ minHeight: "100svh" }}>

      {/* CSS background slides — works for any image size */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: slide === i ? 1 : 0,
            transitionDuration: "1500ms",
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/95 via-[#0a1a10]/70 to-[#0a1a10]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/80 via-transparent to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "100ms" }}>
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Sierra Leone · Est. 2024</span>
          </div>

          <h1 className="mt-7 font-heading text-[clamp(48px,6vw,86px)] font-semibold leading-[1.02] text-white transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "250ms" }}>
            Every Child<br />Deserves a{" "}
            <em className="italic text-[#e8b84b]">Mother&apos;s</em><br />Love
          </h1>

          <div className="mt-8 h-[3px] rounded-full bg-[#c9962a] transition-all duration-1000"
            style={{ width: visible ? "80px" : "0px", transitionDelay: "500ms" }} />

          <p className="mt-8 max-w-xl text-[17px] leading-8 text-white/75 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "400ms" }}>
            Pandie Foundation stands in the gap for vulnerable children across Sierra Leone — providing education, nutrition, medical care, and the warmth of human dignity.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "550ms" }}>
            <Link href="/donate"
              className="inline-flex items-center gap-3 bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,150,42,0.4)]">
              Make an Impact <span className="text-base leading-none">→</span>
            </Link>
            <Link href="/about"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:text-white">
              Our Story
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 border-t border-white/10 pt-10 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "700ms" }}>
            {[
              { num: children,  suffix: "+", label: "Children Reached" },
              { num: education, suffix: "+", label: "In Education" },
              { num: nutrition, suffix: "+", label: "Fed & Nourished" },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <p className="font-heading text-[42px] font-semibold leading-none text-white">
                  {num.toLocaleString()}<span className="text-[#c9962a]">{suffix}</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 right-8 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
            className="h-[2px] transition-all duration-500"
            style={{ width: slide === i ? "28px" : "12px", background: slide === i ? "#c9962a" : "rgba(255,255,255,0.3)" }} />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="h-8 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  );
}
