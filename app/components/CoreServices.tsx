"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

const images = ["/service-education.jpg","/service-nutrition.jpg","/service-medical.jpg","/service-protection.jpg"];
const hrefs  = ["/programs/education","/programs/nutrition","/programs/medical","/programs/protection"];
const nums   = ["01","02","03","04"];
const stats  = ["300+","200+","150+","100%"];

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

export default function CoreServices() {
  const { t } = useLang();
  const services = t.core.s;

  const head = useInView(0.4);
  const grid = useInView(0.12);
  const tiles = useInView(0.15);

  const rise = (on: boolean, delay = 0): React.CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(34px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] py-16 sm:py-20 lg:py-28 xl:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#214c34]/[0.03] blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#c9962a]/[0.05] blur-3xl" />
      </div>
      <div className="relative w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div ref={head.ref} className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9962a] sm:text-[11px] sm:tracking-[0.38em]" style={rise(head.inView, 0)}>
            <span className="h-px w-6 bg-[#c9962a] sm:w-8" />{t.core.badge}<span className="h-px w-6 bg-[#c9962a] sm:w-8" />
          </span>
          <h2 className="mt-5 font-heading text-[clamp(32px,7vw,68px)] font-semibold leading-[1.08] text-[#1a2e1f] sm:mt-6 sm:leading-[1.05]" style={rise(head.inView, 120)}>
            {t.core.heading1}<br /><em className="italic text-[#214c34]">{t.core.heading2}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-[#5f6663] sm:mt-6 sm:text-lg sm:leading-8" style={rise(head.inView, 240)}>{t.core.body}</p>
        </div>

        {/* Core 4 programs */}
        <div ref={grid.ref} className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:mt-20 xl:grid-cols-4">
          {services.map((service, idx) => (
            <article key={idx} style={rise(grid.inView, idx * 120)}
              className="group relative flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
              <div className="relative h-56 overflow-hidden bg-[#d4d8da] sm:h-64">
                <Image src={images[idx]} alt={service.title} fill sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACQQAAIBBAICAwEAAAAAAAAAAAECAwQREiExBRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmqmvI7bVR215ijAOpHWJvhY790WD4qFbQtdPLbyWkE1uSZjKpJI" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2418]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0f2418]/80 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">{t.core.exploreProgram}</span>
                  <span className="text-2xl text-[#c9962a]">→</span>
                </div>
                <div className="absolute right-5 top-5 font-heading text-5xl font-semibold leading-none text-white/20">{nums[idx]}</div>
                <div className="absolute bottom-4 left-4 flex flex-col bg-[#c9962a] px-3 py-2">
                  <span className="text-lg font-bold leading-none text-[#0a1a10]">{stats[idx]}</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0a1a10]/70">{service.statLabel}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="h-[2px] w-10 bg-[#c9962a] transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-5 font-heading text-[1.5rem] font-semibold leading-tight text-[#1a2e1f] sm:text-[1.6rem]">{service.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-[#626a67]">{service.description}</p>
                <Link href={hrefs[idx]} className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition-all duration-300 hover:gap-4 sm:mt-8">
                  {t.core.exploreProgram} <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Programs 5, 6, 7 */}
        <div ref={tiles.ref} className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-3 sm:gap-6">
          {[
            { num:"05", title:t.core.p5title, desc:t.core.p5desc, href:"/programs/sponsorship", icon:"👶", isNew:false },
            { num:"06", title:t.core.p6title, desc:t.core.p6desc, href:"/programs/outreach",   icon:"🤝", isNew:false },
            { num:"07", title:t.core.p7title, desc:t.core.p7desc, href:"/programs/talent",     icon:"⭐", isNew:true  },
          ].map((p, i) => (
            <Link key={p.num} href={p.href} style={rise(tiles.inView, i * 110)}
              className={`group relative flex items-center gap-5 px-6 py-6 transition-all duration-300 sm:gap-6 sm:px-8 sm:py-7 ${p.isNew ? "bg-[#c9962a] hover:bg-[#e8b84b]" : "bg-[#0f2418] hover:bg-[#1a3826]"}`}>
              {p.isNew && <span className="absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]/60">{t.core.p7new}</span>}
              <span className="flex-shrink-0 text-4xl">{p.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: p.isNew ? "rgba(10,26,16,0.5)" : "rgba(201,150,42,0.7)" }}>Program {p.num}</p>
                <h3 className={`font-heading text-xl font-semibold leading-tight ${p.isNew ? "text-[#0a1a10]" : "text-white"}`}>{p.title}</h3>
                <p className={`mt-2 text-[13px] leading-5 ${p.isNew ? "text-[#0a1a10]/65" : "text-white/50"}`}>{p.desc}</p>
              </div>
              <span className={`flex-shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-2 ${p.isNew ? "text-[#0a1a10]/60" : "text-[#c9962a]"}`}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
