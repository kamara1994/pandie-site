"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ target, suffix = "", duration = 2000, start }: { target: number; suffix?: string; duration?: number; start: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

const statNums = [
  { target:500, suffix:"+", color:"#c9962a" },
  { target:300, suffix:"+", color:"#6aab7e" },
  { target:200, suffix:"+", color:"#7eb4d4" },
  { target:6,   suffix:"",  color:"#c9962a" },
];

export default function Impact() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0a1a10] py-28 xl:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c9962a]/20 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c9962a]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
        <div className="absolute left-1/4 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9962a]/[0.055] blur-[110px]" />
        <div className="absolute right-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#6aab7e]/[0.07] blur-[130px]" />
      </div>
      <div className="relative w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />{t.impact.badge}<span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-6 font-heading text-[clamp(38px,4.5vw,64px)] font-semibold leading-[1.1] text-white">
            {t.impact.heading1}<br /><em className="italic text-[#e8b84b]">{t.impact.heading2}</em>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/55">{t.impact.body}</p>
        </div>
        <div className="mt-20 grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {t.impact.s.map(({ label, sub }, i) => (
            <div key={i}
              className="group relative flex flex-col items-center justify-center bg-[#0a1a10] px-8 py-14 text-center transition-all duration-500 hover:bg-[#0d2016]"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transitionDelay: `${i * 120}ms` }}>
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: statNums[i].color }} />
              <div className="font-heading text-[clamp(52px,5vw,80px)] font-semibold leading-none" style={{ color: statNums[i].color, textShadow:`0 0 60px ${statNums[i].color}28` }}>
                <CountUp target={statNums[i].target} suffix={statNums[i].suffix} start={inView} duration={1800 + i * 200} />
              </div>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{label}</p>
              <p className="mt-2 text-[12px] leading-5 text-white/35">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-20 max-w-3xl border-l-2 border-[#c9962a] py-2 pl-10">
          <p className="font-heading text-[1.6rem] font-light italic leading-[1.5] text-white/80">{t.impact.quote}</p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9962a]">{t.impact.quoteAuthor}</p>
        </div>
      </div>
    </section>
  );
}
