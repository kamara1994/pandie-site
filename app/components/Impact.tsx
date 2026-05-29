"use client";

import { useEffect, useRef, useState } from "react";

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

const stats = [
  { target: 500, suffix: "+", label: "Children Reached",  sub: "Through all programs combined", color: "#c9962a" },
  { target: 300, suffix: "+", label: "In Education",      sub: "Back in school with supplies",  color: "#6aab7e" },
  { target: 200, suffix: "+", label: "Fed & Nourished",   sub: "Regular nutrition support",     color: "#7eb4d4" },
  { target: 6,   suffix: "",  label: "Core Programs",     sub: "Addressing every need",         color: "#c9962a" },
];

export default function Impact() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0a1a10] py-28 xl:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c9962a]/20 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c9962a]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>
      <div className="relative w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />Our Impact<span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-6 font-heading text-[clamp(38px,4.5vw,64px)] font-semibold leading-[1.1] text-white">
            Behind Every Number<br /><em className="italic text-[#e8b84b]">Is a Name</em>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/55">Every statistic represents a real child in Sierra Leone whose life changed because someone chose to care.</p>
        </div>
        <div className="mt-20 grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ target, suffix, label, sub, color }, i) => (
            <div key={label} className="flex flex-col items-center justify-center bg-[#0a1a10] px-8 py-14 text-center transition-all duration-500"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transitionDelay: `${i * 120}ms` }}>
              <div className="font-heading text-[clamp(52px,5vw,80px)] font-semibold leading-none" style={{ color }}>
                <CountUp target={target} suffix={suffix} start={inView} duration={1800 + i * 200} />
              </div>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">{label}</p>
              <p className="mt-2 text-[13px] leading-5 text-white/35">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-20 max-w-3xl border-l-2 border-[#c9962a] py-2 pl-10">
          <p className="font-heading text-[1.6rem] font-light italic leading-[1.5] text-white/80">
            &ldquo;When a child receives food, they can concentrate in school. When they receive education, they gain independence. When they receive compassion, they gain belief in their own worth.&rdquo;
          </p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9962a]">— The Pandie Mission</p>
        </div>
      </div>
    </section>
  );
}
