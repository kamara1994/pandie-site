"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Potential in Motion / "The Journey" — scroll-scrubbed cinematic story.
// Built to the canonical spec tables: §3.1 object choreography, §3.2 sky
// stops, §3.3 captions (word-for-word), duotone portrait recipe, 4-corner
// brackets, chapter dots (left edge), scene props, finale sequence.
// Every beat is scrubbed to scroll and fully reversible.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldThread from "../components/GoldThread";
import { STORY_SCENES, STORY_FINALE } from "./story";
import { useLang } from "@/app/context/LanguageContext";

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion(): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MQ);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MQ).matches,
    () => null,
  );
}

const HEART_PATH =
  "M100 172c-3 0-44-26-62-52-14-20-12-46 8-58 16-10 40-4 54 16 14-20 38-26 54-16 20 12 22 38 8 58-18 26-59 52-62 52z";

// §3.2 environment color script — exact stops
const SKY: [number, string, string][] = [
  [0, "rgb(24,52,40)", "rgb(122,98,58)"],
  [30, "rgb(22,56,36)", "rgb(56,110,66)"],
  [55, "rgb(30,42,30)", "rgb(150,92,44)"],
  [72, "rgb(14,28,24)", "rgb(58,50,34)"],
  [88, "rgb(7,17,16)", "rgb(12,30,24)"],
  [100, "rgb(5,13,13)", "rgb(10,26,21)"],
];

// ── child silhouettes: stylized figures, one pose per chapter ──
function ChildFigure({ pose }: { pose: "kick" | "sing" | "receive" | "stand" }) {
  return (
    <svg viewBox="0 0 120 170" className="h-full w-full" aria-hidden="true">
      <g fill="#0d2015" stroke="#c9a24b" strokeOpacity="0.25" strokeWidth="1.5">
        <circle cx="60" cy="26" r="15" />
        <path d="M48 44 Q60 38 72 44 L70 96 Q60 102 50 96 Z" />
        {pose === "sing" ? (
          <>
            <path d="M50 50 Q34 62 36 84 l7 2 Q46 68 56 58 Z" />
            <path d="M70 50 Q84 34 88 14 l-7 -3 Q76 32 64 46 Z" />
          </>
        ) : pose === "receive" ? (
          <>
            <path d="M50 50 Q30 56 22 66 l4 7 Q38 62 56 58 Z" />
            <path d="M70 50 Q90 56 98 66 l-4 7 Q82 62 64 58 Z" />
          </>
        ) : (
          <>
            <path d="M50 50 Q38 66 40 88 l7 1 Q48 70 58 58 Z" />
            <path d="M70 50 Q82 66 80 88 l-7 1 Q72 70 62 58 Z" />
          </>
        )}
        {pose === "kick" ? (
          <>
            <path d="M52 96 L48 150 l9 2 L64 100 Z" />
            <g className="pim-kickleg" style={{ transformOrigin: "66px 98px" }}>
              <path d="M64 96 L76 146 l9 -3 L74 98 Z" />
            </g>
          </>
        ) : (
          <>
            <path d="M52 96 L48 152 l9 1 L63 100 Z" />
            <path d="M66 98 L70 152 l9 -1 L74 98 Z" />
          </>
        )}
      </g>
    </svg>
  );
}

// ── scene props: home / tree / schoolhouse+gold flag / clinic tent+cross ──
function Prop({ kind }: { kind: "home" | "tree" | "school" | "clinic" }) {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      {kind === "home" && (
        <g>
          <path d="M30 60 L80 28 L130 60 Z" fill="#122a1c" />
          <rect x="42" y="60" width="76" height="50" fill="#0d2015" />
          <rect x="72" y="80" width="18" height="30" fill="#c9a24b" opacity="0.35" />
        </g>
      )}
      {kind === "tree" && (
        <g>
          <rect x="74" y="62" width="10" height="52" rx="4" fill="#0d2015" />
          <circle cx="80" cy="44" r="30" fill="#122a1c" />
          <circle cx="58" cy="58" r="20" fill="#122a1c" />
          <circle cx="102" cy="56" r="22" fill="#122a1c" />
        </g>
      )}
      {kind === "school" && (
        <g>
          <path d="M24 62 L80 34 L136 62 Z" fill="#122a1c" />
          <rect x="34" y="62" width="92" height="48" fill="#0d2015" />
          <rect x="70" y="82" width="20" height="28" fill="#c9a24b" opacity="0.3" />
          <rect x="120" y="20" width="3" height="44" fill="#0d2015" />
          <path d="M123 22 l22 6 -22 6 Z" fill="#c9a24b" />
        </g>
      )}
      {kind === "clinic" && (
        <g>
          <path d="M28 110 L52 46 Q80 30 108 46 L132 110 Z" fill="#122a1c" />
          <path d="M62 110 L80 70 L98 110 Z" fill="#0d2015" />
          <rect x="74" y="46" width="12" height="4" fill="#c9a24b" />
          <rect x="78" y="42" width="4" height="12" fill="#c9a24b" />
        </g>
      )}
    </svg>
  );
}

// ── portrait card: duotone photo, FOUR gold corner brackets, nameplate ──
function PortraitCard({ scene }: { scene: (typeof STORY_SCENES)[number] }) {
  const age = { Musa: 9, Aminata: 10, Hawa: 11, Ibrahim: 12 }[scene.childName] ?? "";
  return (
    <div className="w-[128px] rotate-2 sm:w-[150px]">
      <div className="pf-duo relative aspect-[150/196] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
        <Image src={scene.image} alt={`${scene.childName} — ${scene.program}`} fill sizes="150px"
          className="object-cover" style={{ objectPosition: scene.objectPosition }} />
        <div className="pf-duo-tint pointer-events-none absolute inset-0" />
        {["left-1.5 top-1.5 border-l border-t", "right-1.5 top-1.5 border-r border-t",
          "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"].map(c => (
          <span key={c} className={`pointer-events-none absolute z-10 h-3.5 w-3.5 border-[#e8cd85] ${c}`} />
        ))}
      </div>
      <div className="mt-1.5 bg-[#0a1c11]/90 px-2 py-1.5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#e8cd85]">
          {scene.childName} {age} · {scene.town}
        </p>
      </div>
    </div>
  );
}

function ReducedMotionStory() {
  return (
    <div className="bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      <style>{`
        .pf-duo { background: linear-gradient(160deg, #e8cd85, #f4eee0); }
        .pf-duo img { filter: grayscale(1) contrast(1.06); mix-blend-mode: multiply; }
        .pf-duo-tint { background: #143424; mix-blend-mode: lighten; }
      `}</style>
      <section className="px-6 py-16 text-center sm:py-24">
        <GoldThread className="mx-auto w-24" />
        <h1 className="mx-auto mt-6 max-w-2xl font-heading text-[clamp(32px,6vw,56px)] font-semibold leading-tight">
          Every dream starts with one gift.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/65">
          One object travels from child to child — a football, a microphone, a
          book, a stethoscope — and becomes a glowing heart.
        </p>
      </section>
      {STORY_SCENES.map((s, i) => (
        <section key={s.id} className="border-t border-white/10 px-6 py-14">
          <div className={`mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
            <div className="shrink-0"><PortraitCard scene={s} /></div>
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9a24b]">{s.kicker}</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold italic">{s.quote}</h2>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-white/70">{s.headline} {s.description}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function FinalCallToAction({ replay }: { replay?: () => void }) {
  return (
    <section id="story-end" className="relative overflow-hidden bg-[#0a1a10] px-6 py-20 text-center text-white sm:py-28">
      <div className="pointer-events-none absolute -right-1/4 -top-1/3 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.12),transparent_70%)] sm:h-[35vw] sm:w-[35vw]" />
      <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#c9a24b]">Make a Difference Today</p>
      <h2 className="mx-auto mt-4 max-w-2xl font-heading text-[clamp(30px,5.5vw,52px)] font-semibold leading-tight">
        {STORY_FINALE.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/70">{STORY_FINALE.support}</p>
      <div className="mx-auto mt-9 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
        <Link href={STORY_FINALE.primaryCta.href}
          className="group relative inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 overflow-hidden bg-[#c9a24b] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a1c11] transition hover:-translate-y-px hover:bg-[#e8cd85] hover:shadow-[0_6px_24px_rgba(201,162,75,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8cd85] sm:flex-none">
          <span className="relative z-10">{STORY_FINALE.primaryCta.label} →</span>
          <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:hidden" />
        </Link>
        <Link href={STORY_FINALE.secondaryCta.href}
          className="inline-flex min-h-[48px] items-center justify-center border border-white/30 px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white/80 transition hover:border-[#c9a24b]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8cd85]">
          {STORY_FINALE.secondaryCta.label} →
        </Link>
      </div>
      {replay && (
        <button onClick={replay}
          className="mt-7 text-[12px] uppercase tracking-[0.18em] text-white/40 underline-offset-4 transition hover:text-[#e8cd85] hover:underline focus-visible:outline-2 focus-visible:outline-[#e8cd85]">
          replay the journey
        </button>
      )}
    </section>
  );
}

// §3.3 caption copy — canonical; "A chance to…" only as the sub-line


export default function PotentialInMotionPage() {
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const scrollLenRef = useRef(5400);

  useEffect(() => {
    try { localStorage.setItem("pf_journey_seen", "1"); } catch {}
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(wrap);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const stage = q(".pim-stage")[0] as HTMLElement;
      const W = () => stage.getBoundingClientRect().width;
      const H = () => stage.getBoundingClientRect().height;
      const X = (p: number) => () => (W() * p) / 100;
      const Y = (p: number) => () => (H() * p) / 100;

      gsap.set(q(".pim-object"), { x: X(50), y: Y(-14), xPercent: -50, yPercent: -50 });
      gsap.set(q(".pim-obj-svg > g"), { opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".pim-g-ball"), { opacity: 1 });
      gsap.set(q(".pim-scene"), { autoAlpha: 0, y: 30 });
      gsap.set(q(".pim-caption"), { autoAlpha: 0 });
      gsap.set(q(".pim-cap-0"), { autoAlpha: 1 });
      gsap.set(q(".pim-cap-0 .pim-w"), { yPercent: 0, opacity: 1 });
      gsap.set(q(".pim-shadow"), { x: X(50), xPercent: -50, y: Y(76) });
      gsap.set(q(".pim-crowd"), { autoAlpha: 0 });
      gsap.set(q(".pim-hands"), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap, start: "top top",
          end: isMobile ? "+=3600" : "+=5400",
          onRefresh: () => { scrollLenRef.current = isMobile ? 3600 : 5400; },
          scrub: 1, pin: stage, anticipatePin: 1,
          onUpdate: self => {
            setProgress(self.progress);
            if (self.progress > 0.95) { try { localStorage.setItem("pf_journey_done", "1"); } catch {} }
          },
        },
      });

      const cap = (i: number, at: number, out: number) => {
        if (i > 0) {
          tl.to(q(`.pim-cap-${i}`), { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, at)
            .fromTo(q(`.pim-cap-${i} .pim-w`), { yPercent: 120, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.35, ease: "power3.out" }, at);
        }
        if (out < 100) tl.to(q(`.pim-cap-${i}`), { autoAlpha: 0, duration: 1.2 }, out);
      };
      const scene = (i: number, at: number, out: number) => {
        tl.to(q(`.pim-sc-${i}`), { autoAlpha: 1, y: 0, duration: 2.4, ease: "power2.out" }, at);
        if (out < 100) tl.to(q(`.pim-sc-${i}`), { autoAlpha: 0, y: 20, duration: 1.8 }, out);
      };
      const morph = (from: string, to: string, at: number) => {
        tl.to(q(".pim-obj-svg"), { scale: 1.35, duration: 1.2, ease: "power2.out" }, at)
          .to(q(".pim-obj-svg"), { scale: 1, duration: 1.2, ease: "power2.in" }, at + 1.5)
          .to(q(".pim-glow"), { opacity: 0.9, scale: 1.6, duration: 1.2 }, at)
          .to(q(".pim-glow"), { opacity: 0, scale: 0.6, duration: 1.4 }, at + 1.4)
          .fromTo(q(".pim-spark"), { opacity: 0, scale: 0.2, x: 0, y: 0 },
            { opacity: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: "power2.out",
              x: (n: number) => Math.cos((n / 14) * Math.PI * 2) * 42,
              y: (n: number) => Math.sin((n / 14) * Math.PI * 2) * 42 }, at + 0.2)
          .to(q(".pim-spark"), { opacity: 0, duration: 0.9, stagger: 0.05 }, at + 1.4)
          .to(q(`.pim-g-${from}`), { opacity: 0, rotate: 80, duration: 1.4, ease: "power2.inOut" }, at + 0.4)
          .fromTo(q(`.pim-g-${to}`), { opacity: 0, rotate: -70 },
            { opacity: 1, rotate: 0, duration: 1.6, ease: "power2.out" }, at + 1);
      };
      const flight = (at: number, dur: number) => {
        tl.to(q(".pim-trail"), { opacity: 0.85, duration: dur * 0.3 }, at)
          .to(q(".pim-trail"), { opacity: 0, duration: dur * 0.3 }, at + dur * 0.7)
          .to(q(".pim-obj-spin"), { rotate: "+=720", duration: dur }, at)
          .to(q(".pim-shadow"), { scaleX: 0.45, opacity: 0.09, duration: dur / 2 }, at)
          .to(q(".pim-shadow"), { scaleX: 1, opacity: 0.36, duration: dur / 2 }, at + dur / 2);
      };

      // ── environment ──
      SKY.slice(1).forEach(([p], i) => {
        const prev = SKY[i][0];
        tl.fromTo(q(`.pim-sky-${i + 1}`), { opacity: 0 }, { opacity: 1, duration: (p as number) - prev }, prev)
          .to(q(`.pim-sky-${i}`), { opacity: 0, duration: (p as number) - prev }, prev);
      });
      tl.fromTo(q(".pim-sun"), { x: X(15), y: Y(70) }, { x: X(50), y: Y(16), duration: 40, ease: "sine.out" }, 0)
        .to(q(".pim-sun"), { x: X(84), y: Y(58), duration: 25, ease: "sine.in" }, 45)
        .to(q(".pim-sun"), { opacity: 0, duration: 6 }, 66)
        .fromTo(q(".pim-moon"), { opacity: 0 }, { opacity: 0.9, duration: 8 }, 72)
        .fromTo(q(".pim-stars"), { opacity: 0 }, { opacity: 1, duration: 10 }, 72)
        .fromTo(q(".pim-firefly"), { opacity: 0 }, { opacity: 0.9, duration: 4, stagger: 0.5 }, 78)
        .fromTo(q(".pim-shooting-star"), { x: 0, y: 0, opacity: 0 },
          { x: 170, y: 64, opacity: 0.95, duration: 1.8, ease: "power1.in" }, 88.5)
        .to(q(".pim-shooting-star"), { opacity: 0, duration: 0.7 }, 90.3)
        .to(q(".pim-cloud-1"), { xPercent: 22, duration: 88 }, 0)
        .to(q(".pim-cloud-2"), { xPercent: -18, duration: 88 }, 0)
        .to(q(".pim-cloud"), { opacity: 0, duration: 8 }, 80)
        .to(q(".pim-hill-far"), { xPercent: -5, duration: 100 }, 0)
        .to(q(".pim-hill-mid"), { xPercent: -12, duration: 100 }, 0)
        .to(q(".pim-hill-near"), { xPercent: -22, duration: 100 }, 0)
        .to(q(".pim-hill-far path"), { attr: { fill: "#0e2318" }, duration: 100 }, 0)
        .to(q(".pim-hill-mid path"), { attr: { fill: "#0a1c12" }, duration: 100 }, 0)
        .to(q(".pim-hill-near path"), { attr: { fill: "#071009" }, duration: 100 }, 0)
        .to(q(".pim-ground"), { backgroundColor: "#060d08", duration: 100 }, 0);

      // ── §3.1 choreography ──
      tl.to(q(".pim-object"), { y: Y(74), duration: 5, ease: "power2.in" }, 0)
        .to(q(".pim-obj-svg"), { scaleX: 1.3, scaleY: 0.68, duration: 0.5 }, 4.8)
        .to(q(".pim-obj-svg"), { scaleX: 1, scaleY: 1, duration: 0.5 }, 5.3)
        .to(q(".pim-object"), { y: Y(58), duration: 1.6, ease: "power2.out" }, 5.4)
        .to(q(".pim-object"), { y: Y(74), duration: 1.6, ease: "power2.in" }, 7)
        .to(q(".pim-obj-svg"), { scaleX: 1.22, scaleY: 0.76, duration: 0.4 }, 8.5)
        .to(q(".pim-obj-svg"), { scaleX: 1, scaleY: 1, duration: 0.5 }, 8.9)
        .fromTo(q(".pim-dust-1"), { opacity: 0, scale: 0.3 }, { opacity: 0.5, scale: 1.4, duration: 0.8 }, 4.9)
        .to(q(".pim-dust-1"), { opacity: 0, duration: 0.8 }, 5.8)
        .fromTo(q(".pim-dust-2"), { opacity: 0, scale: 0.3 }, { opacity: 0.4, scale: 1.2, duration: 0.7 }, 8.6)
        .to(q(".pim-dust-2"), { opacity: 0, duration: 0.7 }, 9.4)
        .to(q(".pim-cue"), { autoAlpha: 0, duration: 2 }, 5);
      cap(0, 0, 9);

      tl.to(q(".pim-object"), { x: X(26), duration: 6 }, 10)
        .to(q(".pim-shadow"), { x: X(26), duration: 6 }, 10)
        .to(q(".pim-obj-spin"), { rotate: "-=720", duration: 6 }, 10);
      scene(1, 11, 27);
      cap(1, 12, 21);

      tl.to(q(".pim-kickleg"), { rotate: 24, duration: 3, ease: "power1.inOut" }, 20)
        .to(q(".pim-kickleg"), { rotate: -62, duration: 1.6, ease: "power3.in" }, 23.4)
        .to(q(".pim-kickleg"), { rotate: 0, duration: 2.5, ease: "power1.out" }, 26)
        .to(q(".pim-object"), { x: X(52), y: Y(30), duration: 3, ease: "power2.out" }, 25)
        .to(q(".pim-object"), { x: X(74), y: Y(58), duration: 5, ease: "power2.in" }, 28)
        .to(q(".pim-shadow"), { x: X(74), duration: 8 }, 25);
      flight(25, 8);
      morph("ball", "mic", 28.5);

      scene(2, 32, 47);
      cap(2, 35, 45);
      (q(".pim-note") as HTMLElement[]).forEach((n, i) => {
        tl.fromTo(n, { autoAlpha: 0, y: 0 }, { autoAlpha: 0.95, y: () => -H() * 0.11, duration: 3, ease: "sine.out" }, 36 + i * 2.4)
          .to(n, { autoAlpha: 0, y: () => -H() * 0.22, duration: 2.4, ease: "sine.in" }, 39 + i * 2.4);
      });

      tl.to(q(".pim-object"), { x: X(50), y: Y(24), duration: 5, ease: "power2.out" }, 46)
        .to(q(".pim-object"), { x: X(26), y: Y(66), duration: 5, ease: "power2.in" }, 51)
        .to(q(".pim-shadow"), { x: X(26), duration: 10 }, 46);
      flight(46, 10);
      morph("mic", "book", 50);

      scene(3, 54, 63);
      cap(3, 56, 62);
      tl.fromTo(q(".pim-page"), { scaleX: 0.15 }, { scaleX: 1, duration: 2, ease: "power2.out" }, 57);

      tl.to(q(".pim-object"), { x: X(50), y: Y(24), duration: 4, ease: "power2.out" }, 62)
        .to(q(".pim-object"), { x: X(76), y: Y(56), duration: 4, ease: "power2.in" }, 66)
        .to(q(".pim-shadow"), { x: X(76), duration: 8 }, 62);
      flight(62, 8);
      morph("book", "steth", 64.5);

      scene(4, 68, 77);
      cap(4, 70, 76);
      (q(".pim-ring") as HTMLElement[]).forEach((r, i) => {
        tl.fromTo(r, { opacity: 0, scale: 0.3 }, { opacity: 0.8, scale: 2.1, duration: 2.6, ease: "sine.out" }, 71.5 + i * 2)
          .to(r, { opacity: 0, duration: 1.4 }, 73.2 + i * 2);
      });

      tl.to(q(".pim-object"), { x: X(50), y: Y(40), duration: 5, ease: "power1.inOut" }, 76)
        .to(q(".pim-shadow"), { opacity: 0, duration: 2.5 }, 78);
      morph("steth", "heart", 78.5);
      cap(5, 77, 89);

      tl.to(q(".pim-object"), { scale: 2.25, y: Y(44), duration: 16, ease: "power1.inOut" }, 82)
        .to(q(".pim-heart-glow"), { opacity: 0.9, duration: 8 }, 82)
        .fromTo(q(".pim-hands"), { autoAlpha: 0, yPercent: 100 }, { autoAlpha: 1, yPercent: 8, duration: 10, ease: "power2.out" }, 85)
        .fromTo(q(".pim-crowd"), { autoAlpha: 0, yPercent: 110 }, { autoAlpha: 1, yPercent: 0, duration: 7, ease: "power2.out" }, 85.5);
      (q(".pim-rain") as HTMLElement[]).forEach((h, i) => {
        tl.fromTo(h, { autoAlpha: 0, y: () => -H() * 0.1 }, { autoAlpha: 0.85, y: () => H() * 0.3, duration: 4, ease: "sine.in" }, 93 + (i % 4) * 0.8)
          .to(h, { autoAlpha: 0, duration: 1.4 }, 97 + (i % 4) * 0.5);
      });
      cap(6, 90, 100);
      tl.to({}, { duration: 1 }, 99);

      if (!isMobile && window.matchMedia("(pointer: fine)").matches) {
        const toX = gsap.quickTo(q(".pim-parallax")[0], "x", { duration: 0.9, ease: "power2.out" });
        const toY = gsap.quickTo(q(".pim-parallax")[0], "y", { duration: 0.9, ease: "power2.out" });
        const onMove = (e: PointerEvent) => {
          toX(((e.clientX / window.innerWidth) - 0.5) * -14);
          toY(((e.clientY / window.innerHeight) - 0.5) * -8);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, wrap);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { window.removeEventListener("load", onLoad); ctx.revert(); };
  }, [reduced]);

  const CAPS = [
    { k: "PANDIE FOUNDATION · A SCROLL STORY", q: tr("Every dream starts with one gift."), s: tr("Scroll — and follow it") },
    ...STORY_SCENES.map(s => ({ k: s.kicker, q: tr(s.quote), s: tr(s.headline) })),
    { k: "05", q: tr("One gift can become any dream."), s: "" },
    { k: "MAKE A DIFFERENCE TODAY", q: tr("Now it's in your hands."), s: "" },
  ];
  const activeChapter = Math.min(5, Math.floor(progress * 6));
  const smooth = () => (window.matchMedia(REDUCED_MQ).matches ? "auto" : "smooth") as ScrollBehavior;
  const replay = () => window.scrollTo({ top: 0, behavior: smooth() });
  // Jump to a chapter: pin starts at the wrapper top; chapter i begins at i/6.
  // Land in the heart of each chapter, not on its boundary/flight.
  const CHAPTER_POS = [0.02, 0.15, 0.38, 0.58, 0.72, 0.93];
  const jumpTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + CHAPTER_POS[i] * scrollLenRef.current, behavior: smooth() });
  };

  // Arrow keys step through the chapters while the story is on screen.
  useEffect(() => {
    if (reduced !== false) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; // story not on screen
      const cur = Math.min(5, Math.floor(progress * 6));
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); jumpTo(Math.min(5, cur + 1)); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); jumpTo(Math.max(0, cur - 1)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, progress]);

  // scene compositions: child pose, prop, which side the child anchors
  const SCENES: ["kick" | "sing" | "receive" | "stand", "home" | "tree" | "school" | "clinic", "l" | "r"][] =
    [["kick", "home", "l"], ["sing", "tree", "r"], ["receive", "school", "l"], ["stand", "clinic", "r"]];

  return (
    <div>
      <article className="sr-only">
        <h1>Every dream starts with one gift.</h1>
        {STORY_SCENES.map(s => (
          <section key={s.id}>
            <h2>{s.quote}</h2>
            <p>{s.childName} — {s.program}. {s.headline} {s.description}</p>
          </section>
        ))}
        <p>One gift can become any dream. {STORY_FINALE.headline} {STORY_FINALE.support}</p>
      </article>

      {reduced === null && <div className="min-h-[100svh] bg-[#0a1a10]" />}
      {reduced === true && <ReducedMotionStory />}
      {reduced === false && (
      <div ref={wrapRef} className="relative">
        <a href="#story-end"
          className="absolute right-4 top-[84px] z-40 border border-white/25 bg-[#0a1c11]/70 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm transition hover:border-[#c9a24b]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8cd85] sm:top-[92px]">
          {tr("Skip story ↓")}
        </a>

        <section className="pim-stage relative h-[100svh] overflow-hidden bg-[#0a1a10]" aria-hidden="true">
          <style>{`
            .pf-duo { background: linear-gradient(160deg, #e8cd85, #f4eee0); }
            .pf-duo img { filter: grayscale(1) contrast(1.06); mix-blend-mode: multiply; }
            .pf-duo-tint { background: #143424; mix-blend-mode: lighten; }
          `}</style>
          <div className="pim-parallax absolute inset-[-16px]">
            {SKY.map(([p, t, b], i) => (
              <div key={p} className={`pim-sky-${i} absolute inset-0`}
                style={{ background: `linear-gradient(180deg, ${t} 0%, ${b} 100%)`, opacity: i === 0 ? 1 : 0 }} />
            ))}
            <div className="pim-sun absolute left-0 top-0 h-14 w-14 sm:h-20 sm:w-20"
              style={{ background: "radial-gradient(circle, #ffedbb 0% 42%, #e8cd85 58%, rgba(232,205,133,0) 68%)" }} />
            <div className="pim-moon absolute right-[16%] top-[14%] h-10 w-10 rounded-full opacity-0"
              style={{ background: "radial-gradient(circle at 38% 38%, #f4eee0 0 58%, #cfc7ae 70%, rgba(244,238,224,0) 72%)" }} />
            <div className="pim-stars absolute inset-0 opacity-0">
              {Array.from({ length: 46 }).map((_, i) => (
                <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white"
                  style={{ left: `${(i * 29) % 100}%`, top: `${(i * 17) % 48}%`, opacity: 0.25 + ((i * 11) % 65) / 100 }} />
              ))}
              <span className="pim-shooting-star absolute left-[12%] top-[10%] h-[2px] w-12 rotate-[21deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0" />
            </div>
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="pim-firefly absolute h-1 w-1 rounded-full bg-[#e8cd85] opacity-0 shadow-[0_0_7px_rgba(232,205,133,0.9)]"
                style={{ left: `${8 + (i * 6.4) % 86}%`, top: `${50 + (i * 7) % 22}%` }} />
            ))}
            <div className="pim-cloud pim-cloud-1 absolute left-[10%] top-[18%] h-6 w-32 rounded-full bg-white/10 blur-md" />
            <div className="pim-cloud pim-cloud-2 absolute right-[14%] top-[28%] h-5 w-24 rounded-full bg-white/[0.08] blur-md" />
            <svg className="pim-hill-far absolute bottom-[24%] left-[-6%] w-[120%] blur-[2.2px]" viewBox="0 0 1200 130" preserveAspectRatio="none" style={{ height: "16%" }}>
              <path d="M0 130 L0 84 Q170 22 380 72 Q580 116 780 54 Q980 6 1200 74 L1200 130 Z" fill="#2c5a3c" />
            </svg>
            <svg className="pim-hill-mid absolute bottom-[19%] left-[-8%] w-[124%] blur-[0.9px]" viewBox="0 0 1200 150" preserveAspectRatio="none" style={{ height: "19%" }}>
              <path d="M0 150 L0 86 Q240 18 470 82 Q690 138 900 66 Q1060 14 1200 86 L1200 150 Z" fill="#1d4530" />
            </svg>
            <svg className="pim-hill-near absolute bottom-[14%] left-[-11%] w-[130%]" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: "14%" }}>
              <path d="M0 120 L0 78 Q300 30 620 76 Q920 116 1200 70 L1200 120 Z" fill="#14291d" />
            </svg>
            <div className="pim-ground absolute bottom-0 h-[26%] w-full" style={{ background: "#0d1f15" }} />
          </div>

          {STORY_SCENES.map((s, i) => {
            const [pose, prop, side] = SCENES[i];
            return (
              <div key={s.id} className={`pim-scene pim-sc-${i + 1} absolute inset-0`}>
                <div className={`absolute bottom-[21%] ${side === "l" ? "left-[8%] sm:left-[14%]" : "right-[8%] sm:right-[14%]"} flex items-end gap-1`}>
                  <div className="h-[88px] w-[90px] opacity-90 sm:h-[110px] sm:w-[120px]"><Prop kind={prop} /></div>
                  <div className="h-[104px] w-[74px] sm:h-[136px] sm:w-[96px]"><ChildFigure pose={pose} /></div>
                </div>
                <div className={`absolute bottom-[7%] ${side === "l" ? "right-[6%]" : "left-[6%]"}`}>
                  <PortraitCard scene={s} />
                </div>
              </div>
            );
          })}

          <div className="pim-crowd absolute bottom-[13%] left-1/2 flex -translate-x-1/2 items-end gap-1 opacity-90" style={{ transform: "translate(-50%, 110%)" }}>
            {[52, 66, 58, 72, 56, 68, 50].map((h, i) => (
              <div key={i} style={{ height: h, width: h * 0.62 }}><ChildFigure pose={i % 2 ? "stand" : "receive"} /></div>
            ))}
          </div>
          <svg className="pim-hands absolute bottom-0 left-1/2 w-[240px] -translate-x-1/2 sm:w-[320px]" viewBox="0 0 240 120" style={{ transform: "translate(-50%, 100%)" }} aria-hidden="true">
            <path d="M20 120 Q30 70 62 62 Q96 56 118 78 Q140 56 176 62 Q208 70 220 120 Z" fill="#0d2015" stroke="#c9a24b" strokeOpacity="0.35" strokeWidth="2" />
          </svg>
          {Array.from({ length: 8 }).map((_, i) => (
            <svg key={i} viewBox="0 0 200 200" className="pim-rain absolute h-4 w-4 opacity-0"
              style={{ left: `${14 + i * 10}%`, top: "22%" }} aria-hidden="true">
              <path d={HEART_PATH} fill="#c9a24b" />
            </svg>
          ))}

          <div className="pim-object absolute left-0 top-0 h-16 w-16 sm:h-[88px] sm:w-[88px]">
            <div className="pim-glow absolute inset-[-45%] rounded-full bg-[radial-gradient(circle,rgba(232,205,133,0.8),transparent_65%)] opacity-0" />
            <div className="pim-heart-glow absolute inset-[-80%] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.5),transparent_70%)] opacity-0" />
            <div className="pim-trail absolute right-full top-1/2 h-[3px] w-20 -translate-y-1/2 bg-gradient-to-l from-[#e8cd85]/90 via-[#c9a24b]/50 to-transparent opacity-0" />
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="pim-spark absolute left-1/2 top-1/2 h-1.5 w-1.5 rotate-45 bg-[#e8cd85] opacity-0" />
            ))}
            {["♪", "♫", "♪"].map((n, i) => (
              <span key={i} className="pim-note absolute font-heading text-[18px] text-[#e8cd85] opacity-0"
                style={{ left: `${-10 + i * 40}%`, top: "-8%" }}>{n}</span>
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="pim-ring absolute inset-[-10%] rounded-full border-2 border-[#e8cd85]/70 opacity-0" />
            ))}
            <div className="pim-obj-spin h-full w-full">
              <svg viewBox="0 0 200 200" className="pim-obj-svg h-full w-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
                <g className="pim-g-ball">
                  <circle cx="100" cy="100" r="62" fill="#f4eee0" stroke="#0a1c11" strokeWidth="4" />
                  <polygon points="100,72 126,91 116,122 84,122 74,91" fill="#0a1c11" />
                  <path d="M100 38 v34 M126 91 l32 -18 M116 122 l22 26 M84 122 l-22 26 M74 91 l-32 -18" stroke="#0a1c11" strokeWidth="4" fill="none" />
                </g>
                <g className="pim-g-mic">
                  <rect x="88" y="96" width="24" height="64" rx="10" fill="#8a6a1e" />
                  <circle cx="100" cy="72" r="34" fill="#c9a24b" />
                  <g fill="#0a1c11" opacity="0.55">
                    {[58, 72, 86].map(y => [86, 100, 114].map(x => <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" />))}
                  </g>
                  <path d="M64 72 a36 36 0 0 0 72 0" stroke="#e8cd85" strokeWidth="4" fill="none" />
                </g>
                <g className="pim-g-book">
                  <path d="M100 66 C 78 54, 48 54, 36 62 L36 138 C 48 130, 78 130, 100 142 Z" fill="#f4eee0" stroke="#8a6a1e" strokeWidth="4" className="pim-page" style={{ transformOrigin: "100px 100px" }} />
                  <path d="M100 66 C 122 54, 152 54, 164 62 L164 138 C 152 130, 122 130, 100 142 Z" fill="#efe6d2" stroke="#8a6a1e" strokeWidth="4" />
                  <path d="M100 66 V142" stroke="#c9a24b" strokeWidth="5" />
                  <path d="M48 78 h36 M48 92 h36 M116 78 h36 M116 92 h36" stroke="#b9a67c" strokeWidth="4" strokeLinecap="round" />
                </g>
                <g className="pim-g-steth">
                  <path d="M64 40 v42 a36 36 0 0 0 72 0 V40" stroke="#c9a24b" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M100 118 v22 a26 26 0 0 0 26 24" stroke="#c9a24b" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <circle cx="148" cy="164" r="20" fill="#e8cd85" stroke="#8a6a1e" strokeWidth="5" />
                  <circle cx="64" cy="34" r="8" fill="#8a6a1e" /><circle cx="136" cy="34" r="8" fill="#8a6a1e" />
                </g>
                <g className="pim-g-heart">
                  <path d={HEART_PATH} fill="#c9a24b" stroke="#e8cd85" strokeWidth="4" />
                  <path d="M74 84 q10 -16 26 -14" stroke="#f4eee0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
                </g>
              </svg>
            </div>
          </div>
          <div className="pim-shadow absolute left-0 top-0 h-3 w-16 rounded-[100%] bg-black/40 blur-[3px]"
            style={{ opacity: 0.36, marginTop: 34 }} />
          <div className="pim-dust-1 absolute h-5 w-14 rounded-[100%] bg-[#e8cd85]/40 blur-[4px] opacity-0" style={{ left: "46%", top: "76%" }} />
          <div className="pim-dust-2 absolute h-4 w-10 rounded-[100%] bg-[#e8cd85]/35 blur-[4px] opacity-0" style={{ left: "47%", top: "76%" }} />

          <div className="pointer-events-none absolute inset-x-0 top-[13%] z-30 px-6 text-center sm:top-[15%]">
            {CAPS.map((c, i) => (
              <div key={i} className={`pim-caption pim-cap-${i} absolute inset-x-4 top-0 sm:inset-x-10`}>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9a24b]">{c.k}</p>
                <p className="mx-auto mt-2 max-w-xl font-heading text-[clamp(22px,4.5vw,34px)] font-semibold italic leading-snug text-[#f4eee0] [text-shadow:0_2px_16px_rgba(5,13,13,0.75)]">
                  {c.q.split(" ").map((w, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom">
                      <span className="pim-w inline-block">{w}&nbsp;</span>
                    </span>
                  ))}
                </p>
                {c.s && <p className="mt-1.5 text-[12px] text-[#f4eee0]/70 [text-shadow:0_1px_8px_rgba(5,13,13,0.8)]">{c.s}</p>}
              </div>
            ))}
          </div>

          <div className="pim-cue absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">{tr("Scroll to begin")}</span>
            <span className="block h-8 w-px bg-gradient-to-b from-[#e8cd85] to-transparent" />
          </div>
        </section>

        {progress >= 0.3 && (
          <Link href="/talents"
            className="fixed right-0 top-1/2 z-40 -translate-y-1/2 border border-r-0 border-[#c9a24b]/50 bg-[#0d2015]/95 px-2.5 py-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8cd85] backdrop-blur-sm transition hover:border-[#e8cd85] hover:bg-[#c9a24b]/15 focus-visible:outline-2 focus-visible:outline-[#e8cd85] [writing-mode:vertical-rl]">
            {tr("See their talents ✦")}
          </Link>
        )}

        <div className="fixed left-2 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 sm:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <button key={i} onClick={() => jumpTo(i)} aria-label={`Chapter ${i + 1}`}
              className="flex h-6 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-[#e8cd85]">
              <span className="h-[7px] w-[7px] rounded-full transition-all duration-300"
                style={{ background: i <= activeChapter && progress > 0.001 ? "#c9a24b" : "rgba(255,255,255,0.22)",
                  boxShadow: i === activeChapter && progress > 0.001 ? "0 0 8px rgba(201,162,75,0.8)" : "none" }} />
            </button>
          ))}
        </div>
      </div>
      )}

      <FinalCallToAction replay={reduced === false ? replay : undefined} />
    </div>
  );
}
