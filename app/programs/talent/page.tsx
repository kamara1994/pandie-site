"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const tracks = [
  { id: "football", icon: "⚽", title: "Football Academy", sub: "Players across Africa", desc: "Real player profiles — position, stats, region. Sponsors can browse and fund a player's journey to professional football.", color: "#214c34", href: "/programs/talent/football", countries: ["Sierra Leone","Nigeria","Ghana","Kenya","Senegal","Cameroon"] },
  { id: "music", icon: "🎵", title: "Music & Arts", sub: "Listen to real voices", desc: "Press play and hear a child sing. Real audio, real stories. The most powerful experience on this platform.", color: "#c9962a", href: "/programs/talent/music", countries: ["Sierra Leone","Nigeria","South Africa","Tanzania","Ethiopia","Mali"] },
  { id: "academic", icon: "🎓", title: "Academic Excellence", sub: "Africa's future leaders", desc: "Exceptional young scholars — their subject, achievement, and dream. Sponsor a scholarship that changes a family forever.", color: "#0a1a10", href: "/programs/talent/academic", countries: ["Sierra Leone","Rwanda","Ghana","Egypt","Morocco","Uganda"] },
  { id: "technology", icon: "💻", title: "Technology & Innovation", sub: "Building Africa's future", desc: "Young coders and innovators already building products from their communities. Fund the next African tech founder.", color: "#1a3826", href: "/programs/talent/technology", countries: ["Sierra Leone","Nigeria","Kenya","South Africa","Egypt","Tunisia"] },
];

const featured = {
  name: "Aminata Koroma", age: 14, country: "Sierra Leone", talent: "Music", quote: "I sing because it is the only thing that makes me forget we have nothing. But I want it to give us everything.", track: "music", flag: "🇸🇱"
};

export default function TalentHubPage() {
  const { ref, inView } = useInView();
  const talents = useCountUp(247, 2000, inView);
  const countries = useCountUp(18, 1800, inView);
  const mentors = useCountUp(43, 1600, inView);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[#f4f1ea]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-28 text-white lg:px-20 lg:py-36">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-10 transition hover:text-white">← All Programs</Link>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-6" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", transitionDelay: "100ms" }}>
                <div className="h-px w-10 bg-[#c9962a]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Program 07 · Pan-African</span>
              </div>
              <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.02] text-white" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease", transitionDelay: "250ms" }}>
                Africa&apos;s Talent<br /><em className="italic text-[#e8b84b]">Discovery Platform</em>
              </h1>
              <p className="mt-8 text-lg leading-8 text-white/60" style={{ opacity: visible ? 1 : 0, transition: "all 0.7s ease", transitionDelay: "400ms" }}>
                54 countries. Hundreds of millions of children. The next Mohamed Salah, Burna Boy, and Elon Musk are growing up right now in villages the world ignores. We find them first.
              </p>
              <div className="mt-10 flex flex-wrap gap-4" style={{ opacity: visible ? 1 : 0, transition: "all 0.7s ease", transitionDelay: "550ms" }}>
                <Link href="/programs/talent/music" className="bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                  🎵 Listen to a Talent
                </Link>
                <Link href="/programs/talent/football" className="border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white">
                  ⚽ Browse Players
                </Link>
              </div>
            </div>

            {/* Featured talent card */}
            <div className="bg-[#162a1c] border border-white/10 p-8" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease", transitionDelay: "500ms" }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">Featured Talent of the Month</span>
              <div className="mt-6 flex items-start gap-5">
                <div className="h-20 w-20 shrink-0 bg-[#214c34] flex items-center justify-center text-4xl">{featured.flag}</div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-white">{featured.name}</h3>
                  <p className="text-[13px] text-[#c9962a] mt-1">Age {featured.age} · {featured.country} · {featured.talent}</p>
                </div>
              </div>
              <blockquote className="mt-6 font-heading text-lg italic font-light text-white/70 leading-7 border-l-2 border-[#c9962a] pl-5">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <Link href={`/programs/talent/${featured.track}`} className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] transition hover:gap-4">
                Hear Her Sing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <div ref={ref} className="bg-[#c9962a] px-6 py-8 lg:px-20">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-between gap-8">
          {[
            { num: talents, suffix: "+", label: "Talents Discovered" },
            { num: countries, suffix: "", label: "African Countries" },
            { num: mentors, suffix: "+", label: "Active Mentors" },
          ].map(({ num, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-4xl font-semibold text-[#0a1a10]">{num}{suffix}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]/60">{label}</p>
            </div>
          ))}
          <div className="text-center">
            <p className="font-heading text-4xl font-semibold text-[#0a1a10]">4</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]/60">Talent Tracks</p>
          </div>
        </div>
      </div>

      {/* 4 TRACK CARDS */}
      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Choose a Track</span>
            <h2 className="mt-4 font-heading text-[clamp(34px,4vw,56px)] font-semibold text-[#1a2e1f]">Every gift is<br /><em className="italic text-[#214c34]">worth finding</em></h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {tracks.map((t) => (
              <Link key={t.id} href={t.href} className="group block overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div className="p-8" style={{ background: t.color }}>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl">{t.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-2">{t.sub}</span>
                  </div>
                  <div className="h-[2px] w-8 bg-[#c9962a] mb-5 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-heading text-2xl font-semibold text-white mb-3">{t.title}</h3>
                  <p className="text-[14px] leading-7 text-white/55 mb-6">{t.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {t.countries.slice(0,4).map(c => (
                      <span key={c} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 border border-white/15 px-2.5 py-1">{c}</span>
                    ))}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 border border-white/15 px-2.5 py-1">+more</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] transition-all duration-300 group-hover:gap-4">
                    Explore {t.title} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NOMINATE / MENTOR CTA */}
      <section className="bg-[#0a1a10] px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2">
          <div className="border border-white/10 p-10 hover:border-[#c9962a]/40 transition">
            <span className="text-4xl block mb-6">⭐</span>
            <div className="h-[2px] w-8 bg-[#c9962a] mb-5" />
            <h3 className="font-heading text-2xl font-semibold text-white mb-3">Know a talent in Africa?</h3>
            <p className="text-[14px] leading-7 text-white/50 mb-8">Teachers, coaches, parents, community leaders — anyone can nominate a child with extraordinary gift. Any country. Any talent.</p>
            <Link href="/programs/talent#nominate" className="inline-flex items-center gap-2 bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">Nominate a Child →</Link>
          </div>
          <div className="border border-white/10 p-10 hover:border-[#c9962a]/40 transition">
            <span className="text-4xl block mb-6">🤝</span>
            <div className="h-[2px] w-8 bg-[#c9962a] mb-5" />
            <h3 className="font-heading text-2xl font-semibold text-white mb-3">Are you a professional?</h3>
            <p className="text-[14px] leading-7 text-white/50 mb-8">Footballers, musicians, doctors, engineers, developers — become a mentor and be the reason a child from Africa reaches the world.</p>
            <Link href="/programs/talent#mentor" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white">Become a Mentor →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
