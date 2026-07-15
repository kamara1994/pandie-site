"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GoldThread from "../components/GoldThread";
import { useLang } from "@/app/context/LanguageContext";

// The Talent Room — a cinematic 3D gateway into the Talent Program.
// Act 1: 3D intro (rotating gold diamond). Act 2: the invitation.
// Act 3: a rotating 3D gallery room; each gold frame opens a discipline.
// Pure CSS 3D — no libraries, CSP-safe, light enough for low-end phones.

const ROOMS = [
  { icon: "⚽", title: "Football Academy", sub: "Players across Africa", href: "/programs/talent/football", glow: "#2f6b45" },
  { icon: "🎵", title: "Music & Arts", sub: "Listen to real voices", href: "/programs/talent/music", glow: "#c9962a" },
  { icon: "🎓", title: "Academic Excellence", sub: "Africa's future leaders", href: "/programs/talent/academic", glow: "#5a7d5d" },
  { icon: "💻", title: "Technology & Innovation", sub: "Building Africa's future", href: "/programs/talent/technology", glow: "#1a5a6b" },
];

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

export default function TalentRoomPage() {
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);
  const reduced = usePrefersReducedMotion();
  const [act, setAct] = useState<"intro" | "ask" | "room">("intro");
  const [face, setFace] = useState(0);

  // The intro plays ~2.8s, then the invitation appears.
  // Reduced motion skips straight to the invitation.
  useEffect(() => {
    if (reduced) { setAct("ask"); return; }
    const t = setTimeout(() => setAct("ask"), 2800);
    return () => clearTimeout(t);
  }, [reduced]);

  const rotate = (dir: 1 | -1) => setFace(f => f + dir);
  const active = ((face % ROOMS.length) + ROOMS.length) % ROOMS.length;

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      <style>{`
        .tr-stage { perspective: 1200px; }
        .tr-diamond {
          transform-style: preserve-3d;
          animation: trSpin 6s linear infinite;
        }
        .tr-diamond span {
          position: absolute; inset: 0;
          border: 1.5px solid rgba(232,184,75,0.85);
          box-shadow: 0 0 24px rgba(201,150,42,0.35), inset 0 0 24px rgba(201,150,42,0.12);
        }
        .tr-diamond span:nth-child(1) { transform: rotateY(0deg); }
        .tr-diamond span:nth-child(2) { transform: rotateY(45deg); }
        .tr-diamond span:nth-child(3) { transform: rotateY(90deg); }
        .tr-diamond span:nth-child(4) { transform: rotateY(135deg); }
        @keyframes trSpin { from { transform: rotateX(18deg) rotateY(0deg); } to { transform: rotateX(18deg) rotateY(360deg); } }
        .tr-orbit { animation: trOrbit 4.5s linear infinite; transform-origin: 50% 50%; }
        .tr-orbit:nth-child(2) { animation-duration: 6s; animation-direction: reverse; }
        .tr-orbit:nth-child(3) { animation-duration: 8s; }
        @keyframes trOrbit { from { transform: rotate(0deg) translateX(110px) rotate(0deg); } to { transform: rotate(360deg) translateX(110px) rotate(-360deg); } }
        .tr-carousel {
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(.22,1,.36,1);
        }
        .tr-panel { position: absolute; inset: 0; backface-visibility: hidden; }
        .tr-fadeup { animation: trFadeUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        @keyframes trFadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .tr-diamond, .tr-orbit { animation: none !important; }
          .tr-carousel { transition: none !important; }
          .tr-fadeup { animation: none !important; }
        }
      `}</style>

      {/* Ambience: gold glow + serif watermark, the site's signature vocabulary */}
      <div className="pointer-events-none absolute -left-1/4 top-0 h-[80vw] w-[80vw] rounded-full bg-[radial-gradient(circle,rgba(201,150,42,0.10),transparent_70%)] sm:h-[45vw] sm:w-[45vw]" />
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-4 right-0 select-none font-heading text-[34vw] italic leading-none text-white/[0.03] lg:text-[240px]">Talent</p>

      {/* ── Act 1 + 2: the 3D intro and the invitation ── */}
      {act !== "room" && (
        <section className="tr-stage relative z-10 flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 text-center">
          {/* Rotating gold diamond */}
          <div className="relative h-[180px] w-[180px] sm:h-[220px] sm:w-[220px]">
            <div className="tr-diamond absolute inset-6 rotate-45">
              <span /><span /><span /><span />
            </div>
            <span className="tr-orbit absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#e8b84b] shadow-[0_0_10px_rgba(232,184,75,0.9)]" />
            <span className="tr-orbit absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 h-1 w-1 rounded-full bg-white/70" />
            <span className="tr-orbit absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#c9962a]" />
          </div>

          <h1 className="mt-10 font-heading text-[clamp(32px,7vw,58px)] font-semibold leading-tight">
            {tr("Every child carries a gift.")}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-white/60">
            Footballers. Singers. Scholars. Inventors. Real young talents from
            across Africa — waiting for one person to believe in them.
          </p>

          {act === "ask" && (
            <div className="tr-fadeup mt-10 w-full max-w-sm">
              <GoldThread className="mx-auto w-24" />
              <p className="mt-5 font-heading text-2xl font-semibold">{tr("Would you like to meet them?")}</p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setAct("room")}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#c9962a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b] sm:flex-none"
                >
                  {tr("Yes — open the room")}
                </button>
                <Link
                  href="/"
                  className="flex items-center justify-center px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white/40 transition hover:text-white"
                >
                  {tr("Not yet")}
                </Link>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Act 3: the Talent Room ── */}
      {act === "room" && (
        <section className="relative z-10 flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-4 pb-16 pt-8">
          <div className="tr-fadeup text-center">
            <div className="mx-auto flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#c9962a]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9962a]">{tr("The Talent Room")}</span>
              <span className="h-px w-8 bg-[#c9962a]" />
            </div>
            <h2 className="mt-3 font-heading text-[clamp(26px,5vw,40px)] font-semibold">
              {tr("Four doors. Countless futures.")}
            </h2>
          </div>

          {/* The rotating room */}
          <div className="tr-stage mt-10 h-[340px] w-[270px] sm:h-[380px] sm:w-[340px]">
            <div
              className="tr-carousel relative h-full w-full"
              style={{ transform: `translateZ(-260px) rotateY(${face * -90}deg)` }}
            >
              {ROOMS.map((room, i) => (
                <div
                  key={room.title}
                  className="tr-panel"
                  style={{ transform: `rotateY(${i * 90}deg) translateZ(260px)` }}
                >
                  <Link
                    href={room.href}
                    tabIndex={active === i ? 0 : -1}
                    aria-hidden={active !== i}
                    className="group flex h-full w-full flex-col items-center justify-between border-[1.5px] border-[#c9962a]/50 bg-[#0d2015]/95 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition hover:border-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b84b]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40" style={{ background: `radial-gradient(circle at 50% 0%, ${room.glow}, transparent 70%)` }} />
                    <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#e8b84b]/70" />
                    <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#e8b84b]/70" />
                    <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#e8b84b]/70" />
                    <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#e8b84b]/70" />

                    <span className="relative mt-6 text-6xl sm:text-7xl">{room.icon}</span>
                    <div className="relative">
                      <p className="font-heading text-2xl font-semibold sm:text-[26px]">{room.title}</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-[#e8b84b]/80">{room.sub}</p>
                    </div>
                    <span className="relative mb-2 inline-flex items-center gap-2 bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition group-hover:bg-[#e8b84b]">
                      {tr("Step inside →")}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Room controls */}
          <div className="tr-fadeup mt-9 flex items-center gap-5">
            <button
              onClick={() => rotate(-1)}
              aria-label="Previous talent"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9962a]/40 text-[#e8b84b] transition hover:border-[#e8b84b] hover:bg-[#c9962a]/10 focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
            >
              ←
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {ROOMS.map((_, i) => (
                <span key={i} className="h-[2px] transition-all duration-500"
                  style={{ width: active === i ? "26px" : "10px", background: active === i ? "#c9962a" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
            <button
              onClick={() => rotate(1)}
              aria-label="Next talent"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9962a]/40 text-[#e8b84b] transition hover:border-[#e8b84b] hover:bg-[#c9962a]/10 focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
            >
              →
            </button>
          </div>

          <Link href="/talents/gallery" className="tr-fadeup mt-8 text-[12px] uppercase tracking-[0.2em] text-white/40 underline-offset-4 transition hover:text-[#e8b84b] hover:underline">
            {tr("Or browse every talent at once")}
          </Link>
        </section>
      )}
    </div>
  );
}
