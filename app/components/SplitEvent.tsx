"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function SplitEvent() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const details = [
    ["📍", t.event.locLabel,  t.event.locVal],
    ["📅", t.event.dateLabel, t.event.dateVal],
    ["🎯", t.event.goalLabel, t.event.goalVal],
  ];

  return (
    <section className="grid lg:grid-cols-2">
      <div ref={ref} className="relative overflow-hidden bg-[#0a1a10] px-8 py-20 sm:px-14 lg:px-16 xl:px-20"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        <div className="pointer-events-none absolute right-[-60px] top-[-40px] h-64 w-64 rounded-full bg-[#c9962a]/10 blur-3xl" />
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 bg-[#c9962a]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#c9962a]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9962a]" />{t.event.badge}
          </span>
          <h2 className="mt-6 font-heading text-[clamp(32px,3.5vw,52px)] font-semibold leading-tight text-white">
            {t.event.heading1}<br /><em className="italic text-[#e8b84b]">{t.event.heading2}</em>
          </h2>
          <p className="mt-6 text-[16px] leading-8 text-white/65">{t.event.body}</p>
          <div className="mt-10 space-y-4 border-t border-white/10 pt-10">
            {details.map(([icon, label, value]) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xl">{icon}</span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</span>
                  <p className="text-[14px] font-semibold text-white/80">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/events"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]">
              <span className="relative z-10">{t.event.cta1}</span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
            <Link href="/donate"
              className="inline-flex items-center border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white">
              {t.event.cta2}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-[520px]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>
        <Image src="/event.jpg" alt="Pandie Foundation event" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/60 via-transparent to-transparent lg:hidden" />
        <div className="absolute bottom-8 right-8 bg-[#0a1a10]/90 p-6 backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">{t.event.donateLabel}</p>
          <p className="mt-2 font-heading text-2xl font-semibold text-white">{t.event.donateBody}</p>
          <Link href="/donate"
            className="group relative mt-4 inline-block overflow-hidden bg-[#c9962a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
            <span className="relative z-10">{t.event.donateCta}</span>
            <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
