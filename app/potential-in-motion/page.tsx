"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Potential in Motion — a scroll-controlled cinematic story.
// One object travels from child to child and transforms with each dream:
// football → microphone → book → stethoscope → glowing heart.
// GSAP ScrollTrigger scrubs a single pinned timeline: scrolling forward plays
// the story, scrolling back reverses it. prefers-reduced-motion gets a static
// editorial version of the identical content (no pin, no long timeline).
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldThread from "../components/GoldThread";
import { STORY_INTRO, STORY_SCENES, STORY_FINALE } from "./story";

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion(): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MQ);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MQ).matches,
    () => null, // server: undecided — render neither mode until the client knows
  );
}

const HEART_PATH =
  "M100 172c-3 0-44-26-62-52-14-20-12-46 8-58 16-10 40-4 54 16 14-20 38-26 54-16 20 12 22 38 8 58-18 26-59 52-62 52z";

// ── Child portrait: fixed 4:5 slot, cover-fit, warm duotone so photographs sit
//    inside the illustrated world. Swap photos in story.ts, not here. ──
function ChildPortrait({
  scene, refCb,
}: {
  scene: (typeof STORY_SCENES)[number];
  refCb?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={refCb} className="pim-child absolute bottom-[16%] w-[124px] sm:w-[150px] lg:w-[180px]" data-child={scene.id}>
      <div className="relative aspect-[4/5] overflow-hidden border-[1.5px] border-[#e8b84b]/60 bg-[#0d2015] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
        <Image
          src={scene.image}
          alt={`${scene.childName} — ${scene.program}`}
          fill
          sizes="180px"
          className="object-cover saturate-[0.82]"
          style={{ objectPosition: scene.objectPosition }}
        />
        {/* warm grade so the photo belongs to the illustrated scene */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1a10]/50 via-transparent to-[#c9962a]/10" />
        <div className="pointer-events-none absolute left-1.5 top-1.5 h-3 w-3 border-l border-t border-[#e8b84b]/80" />
        <div className="pointer-events-none absolute right-1.5 top-1.5 h-3 w-3 border-r border-t border-[#e8b84b]/80" />
      </div>
      <div className="mt-2 bg-[#0a1a10]/80 px-2.5 py-1.5 backdrop-blur-sm">
        <p className="text-[11px] font-bold text-white">{scene.childName}</p>
        <p className="text-[9px] uppercase tracking-[0.14em] text-[#e8b84b]/90">{scene.program}</p>
      </div>
    </div>
  );
}

// ── Static editorial version: reduced-motion users and the readable story. ──
function ReducedMotionStory() {
  return (
    <div className="bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      <section className="px-6 py-16 text-center sm:py-24">
        <GoldThread className="mx-auto w-24" />
        <h1 className="mx-auto mt-6 max-w-2xl font-heading text-[clamp(32px,6vw,56px)] font-semibold leading-tight">
          {STORY_INTRO.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/65">
          One object travels from child to child — a football, a microphone, a
          book, a stethoscope — and becomes a glowing heart. One opportunity can
          become a future.
        </p>
      </section>

      {STORY_SCENES.map((s, i) => (
        <section key={s.id} className="border-t border-white/10 px-6 py-14">
          <div className={`mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
            <div className="w-[180px] shrink-0">
              <div className="relative aspect-[4/5] overflow-hidden border-[1.5px] border-[#e8b84b]/60">
                <Image src={s.image} alt={`${s.childName} — ${s.program}`} fill sizes="180px"
                  className="object-cover saturate-[0.82]" style={{ objectPosition: s.objectPosition }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1a10]/50 via-transparent to-[#c9962a]/10" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">
                {s.childName} · {s.program}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">{s.headline}</h2>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-white/70">{s.description}</p>
              <p className="mt-3 text-[13px] italic text-[#e8b84b]/80">The opportunity arrives as {s.objectLabel}.</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function FinalCallToAction() {
  return (
    <section id="story-end" className="relative overflow-hidden bg-[#0a1a10] px-6 py-20 text-center text-white sm:py-28">
      <div className="pointer-events-none absolute -right-1/4 -top-1/3 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(201,150,42,0.12),transparent_70%)] sm:h-[35vw] sm:w-[35vw]" />
      <svg viewBox="0 0 200 200" className="mx-auto h-16 w-16" aria-hidden="true">
        <path d={HEART_PATH} fill="#c9962a" opacity="0.9" />
      </svg>
      <h2 className="mx-auto mt-6 max-w-2xl font-heading text-[clamp(30px,5.5vw,52px)] font-semibold leading-tight">
        {STORY_FINALE.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/70">{STORY_FINALE.support}</p>
      <div className="mx-auto mt-9 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={STORY_FINALE.primaryCta.href}
          className="group relative inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 overflow-hidden bg-[#c9962a] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b] sm:flex-none"
        >
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="relative z-10">{STORY_FINALE.primaryCta.label}</span>
          <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:hidden" />
        </Link>
        <Link
          href={STORY_FINALE.secondaryCta.href}
          className="inline-flex min-h-[48px] items-center justify-center border border-white/30 px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white/80 transition hover:border-[#c9962a]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
        >
          {STORY_FINALE.secondaryCta.label}
        </Link>
      </div>
    </section>
  );
}

export default function PotentialInMotionPage() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try { localStorage.setItem("pf_journey_seen", "1"); } catch {}
  }, []);

  useEffect(() => {
    if (reduced !== false) return; // wait for the media query; skip when reduced
    const wrap = wrapRef.current;
    if (!wrap) return;

    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(wrap);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const stage = q(".pim-stage")[0] as HTMLElement;
      const children = q(".pim-child") as HTMLElement[];

      // Object travel targets derive from the live child-card positions, so
      // every breakpoint gets a correct path; functional values re-resolve on
      // ScrollTrigger.refresh() (resize, fonts, images).
      const stageRect = () => stage.getBoundingClientRect();
      // lands just left of the portrait — near the child, never over the face
      const childX = (i: number) => () => {
        const c = children[i].getBoundingClientRect();
        return c.left - stageRect().left - (isMobile ? 34 : 52);
      };
      const groundY = () => stageRect().height * 0.72;
      const skyY = () => stageRect().height * 0.30;

      gsap.set(q(".pim-object"), { x: () => stageRect().width * (isMobile ? 0.18 : 0.14), y: groundY, xPercent: -50, yPercent: -50 });
      gsap.set(q(".pim-obj-svg > g"), { opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".pim-g-ball"), { opacity: 1 });
      gsap.set(children, { autoAlpha: 0, y: 40 });
      gsap.set(q(".pim-caption"), { autoAlpha: 0 });
      gsap.set(q(".pim-cap-0"), { autoAlpha: 1 });
      gsap.set(q(".pim-cap-0 .pim-cap-line"), { yPercent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: isMobile ? "+=3400" : "+=5200",
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          onUpdate: self => {
            setProgress(self.progress);
            if (self.progress > 0.95) {
              try { localStorage.setItem("pf_journey_done", "1"); } catch {}
            }
          },
        },
      });

      const cap = (i: number, at: number, out: number) => {
        if (i > 0) {
          tl.to(q(`.pim-cap-${i}`), { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, at)
            .fromTo(q(`.pim-cap-${i} .pim-cap-line`), { yPercent: 110 }, { yPercent: 0, duration: 2.4, stagger: 0.5, ease: "power3.out" }, at);
        }
        tl.to(q(`.pim-cap-${i}`), { autoAlpha: 0, duration: 1.6 }, out);
      };
      const meet = (i: number, at: number, out: number) => {
        tl.to(children[i], { autoAlpha: 1, y: 0, duration: 2.5, ease: "power2.out" }, at)
          .to(children[i], { autoAlpha: 0, y: 24, duration: 1.6 }, out);
      };
      // transformation: glow + sparks + crossfade between object groups
      const morph = (from: string, to: string, at: number) => {
        tl.to(q(".pim-glow"), { opacity: 0.9, scale: 1.5, duration: 1.4, ease: "power2.out" }, at)
          .to(q(".pim-glow"), { opacity: 0, scale: 0.6, duration: 1.6 }, at + 1.6)
          .fromTo(q(".pim-spark"), { opacity: 0, scale: 0.2 },
            { opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" }, at + 0.2)
          .to(q(".pim-spark"), { opacity: 0, y: "-=26", duration: 1.2, stagger: 0.12 }, at + 1.2)
          .to(q(`.pim-g-${from}`), { opacity: 0, rotate: 90, scale: 0.7, duration: 1.6, ease: "power2.inOut" }, at + 0.3)
          .fromTo(q(`.pim-g-${to}`), { opacity: 0, rotate: -70, scale: 0.7 },
            { opacity: 1, rotate: 0, scale: 1, duration: 1.8, ease: "power2.out" }, at + 1.1);
      };

      // ── environment: one continuous dawn→night grade ──
      tl.to(q(".pim-sky-dawn"), { opacity: 0, duration: 16 }, 12)
        .fromTo(q(".pim-sky-morning"), { opacity: 0 }, { opacity: 1, duration: 14 }, 10)
        .to(q(".pim-sky-morning"), { opacity: 0, duration: 14 }, 38)
        .fromTo(q(".pim-sky-afternoon"), { opacity: 0 }, { opacity: 1, duration: 14 }, 36)
        .to(q(".pim-sky-afternoon"), { opacity: 0, duration: 12 }, 58)
        .fromTo(q(".pim-sky-sunset"), { opacity: 0 }, { opacity: 1, duration: 12 }, 56)
        .to(q(".pim-sky-sunset"), { opacity: 0, duration: 12 }, 76)
        .fromTo(q(".pim-sky-night"), { opacity: 0 }, { opacity: 1, duration: 12 }, 74)
        .fromTo(q(".pim-sun"), { yPercent: 60, opacity: 0.9 }, { yPercent: -30, duration: 40 }, 0)
        .to(q(".pim-sun"), { yPercent: 80, opacity: 0, duration: 30 }, 52)
        .fromTo(q(".pim-stars"), { opacity: 0 }, { opacity: 1, duration: 10 }, 78)
        .fromTo(q(".pim-firefly"), { opacity: 0 }, { opacity: 0.9, duration: 6, stagger: 1.2 }, 82)
        // parallax: far layers drift slower than near layers
        .to(q(".pim-hills-far"), { xPercent: -4, duration: 100 }, 0)
        .to(q(".pim-hills-mid"), { xPercent: -9, duration: 100 }, 0)
        .to(q(".pim-fg"), { xPercent: -16, duration: 100 }, 0);

      // ── Scene 1: dawn — the ball rests, then sets off ──
      tl.to(q(".pim-object"), { y: () => groundY() - 10, duration: 2, ease: "sine.inOut" }, 0)
        .to(q(".pim-object"), { y: groundY, duration: 2, ease: "sine.inOut" }, 2)
        .to(q(".pim-cue"), { autoAlpha: 0, duration: 2 }, 4);
      cap(0, 0, 8);

      // ── Scene 2: to Musa — roll, bounce, keep-ups, kick ──
      meet(0, 8, 22);
      tl.to(q(".pim-object"), { x: childX(0), duration: 8, ease: "none" }, 8)
        .to(q(".pim-g-ball"), { rotate: 540, duration: 8, ease: "none" }, 8)
        // two travel bounces with squash + shadow reaction
        .to(q(".pim-object"), { y: () => groundY() - 46, duration: 2, ease: "power2.out" }, 9)
        .to(q(".pim-object"), { y: groundY, duration: 2, ease: "power2.in" }, 11)
        .to(q(".pim-obj-svg"), { scaleY: 0.88, duration: 0.4 }, 12.9)
        .to(q(".pim-obj-svg"), { scaleY: 1, duration: 0.5 }, 13.3)
        .to(q(".pim-shadow"), { scale: 0.55, opacity: 0.14, duration: 2 }, 9)
        .to(q(".pim-shadow"), { scale: 1, opacity: 0.3, duration: 2 }, 11)
        .fromTo(q(".pim-dust"), { opacity: 0, scale: 0.4 }, { opacity: 0.5, scale: 1.4, duration: 0.8 }, 13)
        .to(q(".pim-dust"), { opacity: 0, duration: 1 }, 13.9)
        // keep-ups at Musa's feet
        .to(q(".pim-object"), { y: () => groundY() - 34, duration: 1.1, ease: "power1.out" }, 14.5)
        .to(q(".pim-object"), { y: groundY, duration: 1.1, ease: "power1.in" }, 15.6)
        .to(q(".pim-object"), { y: () => groundY() - 40, duration: 1.2, ease: "power1.out" }, 16.8)
        .to(q(".pim-object"), { y: groundY, duration: 1.2, ease: "power1.in" }, 18)
        .to(q(".pim-obj-svg"), { scaleY: 0.9, duration: 0.3 }, 15.5)
        .to(q(".pim-obj-svg"), { scaleY: 1, duration: 0.3 }, 15.9)
        // the kick: a graceful arc to the apex
        .to(q(".pim-object"), {
          x: () => (childX(0)() + childX(1)()) / 2, y: skyY, duration: 5, ease: "power2.out",
        }, 20)
        .to(q(".pim-shadow"), { scale: 0.3, opacity: 0.06, duration: 5 }, 20)
        .to(q(".pim-trail"), { opacity: 0.7, duration: 2 }, 20)
        .to(q(".pim-trail"), { opacity: 0, duration: 2 }, 24);
      cap(1, 11, 20);

      // ── T1 at the apex: football → microphone ──
      morph("ball", "mic", 25);

      // ── Scene 3: to Aminata — the song ──
      meet(1, 29, 42);
      tl.to(q(".pim-object"), { x: childX(1), y: () => groundY() - 40, duration: 6, ease: "power1.inOut" }, 28)
        .to(q(".pim-shadow"), { scale: 0.7, opacity: 0.2, duration: 6 }, 28)
        .fromTo(q(".pim-wave"), { opacity: 0, scale: 0.3 },
          { opacity: 0.85, scale: 1.9, duration: 3.2, stagger: 1.4, ease: "sine.out" }, 33)
        .to(q(".pim-wave"), { opacity: 0, duration: 2, stagger: 1.4 }, 35.4)
        .to(q(".pim-leaf"), { rotate: 14, x: 8, duration: 4, ease: "sine.inOut" }, 33)
        .to(q(".pim-leaf"), { rotate: 0, x: 0, duration: 4, ease: "sine.inOut" }, 37);
      cap(2, 31, 40);

      // ── T2: microphone → book (the last wave becomes the spine) ──
      tl.to(q(".pim-object"), { y: skyY, x: () => (childX(1)() + childX(2)()) / 2, duration: 5, ease: "power1.inOut" }, 42);
      morph("mic", "book", 43);

      // ── Scene 4: to Hawa — the book opens, ideas rise ──
      meet(2, 47, 60);
      tl.to(q(".pim-object"), { x: childX(2), y: () => groundY() - 44, duration: 5, ease: "power1.inOut" }, 46)
        .fromTo(q(".pim-page"), { scaleX: 0.1 }, { scaleX: 1, duration: 2.4, ease: "power2.out" }, 51)
        .fromTo(q(".pim-idea"), { opacity: 0, y: 16 },
          { opacity: 0.95, y: -34, duration: 4.5, stagger: 0.9, ease: "sine.out" }, 52)
        .to(q(".pim-idea"), { opacity: 0, duration: 2, stagger: 0.9 }, 56);
      cap(3, 49, 58);

      // ── T3: book → stethoscope, gliding into golden hour ──
      tl.to(q(".pim-object"), { y: skyY, x: () => (childX(2)() + childX(3)()) / 2, duration: 5, ease: "power1.inOut" }, 60);
      morph("book", "steth", 61);

      // ── Scene 5: to Mariama ──
      meet(3, 65, 78);
      tl.to(q(".pim-object"), { x: childX(3), y: () => groundY() - 44, duration: 5, ease: "power1.inOut" }, 64);
      cap(4, 67, 76);

      // ── T4: stethoscope curls into the glowing heart; night falls ──
      tl.to(q(".pim-object"), {
        x: () => stageRect().width / 2, y: () => stageRect().height * 0.42, duration: 5, ease: "power1.inOut",
      }, 78);
      morph("steth", "heart", 79);

      // ── Scene 6: the heart comes to your hands ──
      tl.fromTo(q(".pim-kids-return"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 4, ease: "power2.out" }, 84)
        .to(q(".pim-object"), { scale: isMobile ? 2 : 2.6, y: () => stageRect().height * 0.5, duration: 12, ease: "power1.inOut" }, 84)
        .to(q(".pim-heart-glow"), { opacity: 0.85, duration: 6 }, 84)
        .fromTo(q(".pim-shooting-star"), { x: -40, y: 0, opacity: 0 },
          { x: 160, y: 60, opacity: 0.9, duration: 2.2, ease: "power1.in" }, 88)
        .to(q(".pim-shooting-star"), { opacity: 0, duration: 0.8 }, 90.2)
        .to(q(".pim-shadow"), { opacity: 0, duration: 3 }, 84);
      cap(5, 86, 99.4);
      tl.to({}, { duration: 2 }, 98); // settle room at the end of the pin

      // desktop only: a whisper of cursor parallax on the landscape
      if (!isMobile && window.matchMedia("(pointer: fine)").matches) {
        const toX = gsap.quickTo(q(".pim-parallax")[0], "x", { duration: 0.8, ease: "power2.out" });
        const toY = gsap.quickTo(q(".pim-parallax")[0], "y", { duration: 0.8, ease: "power2.out" });
        const onMove = (e: PointerEvent) => {
          toX(((e.clientX / window.innerWidth) - 0.5) * -10);
          toY(((e.clientY / window.innerHeight) - 0.5) * -6);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, wrap);

    // re-measure once images and fonts have settled
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert(); // kills the timeline, ScrollTrigger, and pin spacer
    };
  }, [reduced]);

  const activeScene = Math.min(5, Math.floor(progress * 6));

  // The readable narrative and the final CTA are server-rendered in every
  // mode; only the animated-vs-static presentation waits for the client's
  // prefers-reduced-motion answer (no hydration mismatch either way).
  return (
    <div>
      {/* Screen-reader / SEO narrative: the full story as readable text */}
      <article className="sr-only">
        <h1>{STORY_INTRO.headline}</h1>
        <p>{STORY_INTRO.support}</p>
        {STORY_SCENES.map(s => (
          <section key={s.id}>
            <h2>{s.headline}</h2>
            <p>{s.childName} — {s.program}. The opportunity arrives as {s.objectLabel}. {s.description}</p>
          </section>
        ))}
        <p>{STORY_FINALE.headline} {STORY_FINALE.support}</p>
      </article>

      {reduced === null && <div className="min-h-[100svh] bg-[#0a1a10]" />}
      {reduced === true && <ReducedMotionStory />}
      {reduced === false && (
      <div ref={wrapRef} className="relative">
        {/* Skip link: visible, above the story */}
        <a
          href="#story-end"
          className="absolute right-4 top-[84px] z-40 border border-white/25 bg-[#0a1a10]/70 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm transition hover:border-[#c9962a]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8b84b] sm:top-[92px]"
        >
          Skip the story ↓
        </a>

        {/* ── The pinned stage ── */}
        <section className="pim-stage relative h-[100svh] overflow-hidden bg-[#0a1a10]" aria-hidden="true">
          <div className="pim-parallax absolute inset-[-12px]">
            {/* skies — crossfaded through the day */}
            <div className="pim-sky-dawn absolute inset-0 bg-[linear-gradient(180deg,#f2e3d0_0%,#eac9a8_38%,#d9a86b_70%,#b3854f_100%)]" />
            <div className="pim-sky-morning absolute inset-0 bg-[linear-gradient(180deg,#bcd7d3_0%,#cfe0c3_45%,#e3d9a8_75%,#c9b06a_100%)] opacity-0" />
            <div className="pim-sky-afternoon absolute inset-0 bg-[linear-gradient(180deg,#8fc0c9_0%,#a9c9a2_50%,#d3c47e_80%,#b99a4e_100%)] opacity-0" />
            <div className="pim-sky-sunset absolute inset-0 bg-[linear-gradient(180deg,#6b4a53_0%,#a85f45_40%,#d98a3f_70%,#e8b84b_100%)] opacity-0" />
            <div className="pim-sky-night absolute inset-0 bg-[linear-gradient(180deg,#060f14_0%,#0a1a2b_45%,#0a1a10_100%)] opacity-0" />

            {/* sun */}
            <div className="pim-sun absolute left-[62%] top-[26%] h-16 w-16 rounded-full bg-[radial-gradient(circle,#fff3d6_0%,#e8b84b_55%,transparent_75%)] blur-[1px] sm:h-24 sm:w-24" />

            {/* stars + fireflies + shooting star (night) */}
            <div className="pim-stars absolute inset-0 opacity-0">
              {Array.from({ length: 26 }).map((_, i) => (
                <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white/80"
                  style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 45}%`, opacity: 0.3 + ((i * 13) % 60) / 100 }} />
              ))}
              <span className="pim-shooting-star absolute left-[15%] top-[12%] h-[2px] w-10 rotate-[22deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="pim-firefly absolute h-1.5 w-1.5 rounded-full bg-[#e8b84b] opacity-0 shadow-[0_0_8px_rgba(232,184,75,0.9)]"
                style={{ left: `${18 + i * 22}%`, top: `${52 + (i % 2) * 9}%` }} />
            ))}

            {/* landscape — layered parallax, far layers softly blurred */}
            <svg className="pim-hills-far absolute bottom-[22%] left-[-6%] w-[118%] blur-[2px]" viewBox="0 0 1200 140" preserveAspectRatio="none" style={{ height: "18%" }}>
              <path d="M0 140 L0 90 Q150 30 340 78 Q520 118 700 60 Q900 10 1200 80 L1200 140 Z" fill="#22402c" opacity="0.55" />
            </svg>
            <svg className="pim-hills-mid absolute bottom-[16%] left-[-8%] w-[122%]" viewBox="0 0 1200 160" preserveAspectRatio="none" style={{ height: "22%" }}>
              <path d="M0 160 L0 92 Q220 20 430 86 Q640 140 840 70 Q1020 16 1200 92 L1200 160 Z" fill="#173023" />
              {/* village silhouettes */}
              <g fill="#0e2318">
                <path d="M180 92 l16 -14 16 14 v22 h-32 z" />
                <path d="M560 96 l14 -12 14 12 v20 h-28 z" />
                <path d="M950 90 l18 -15 18 15 v24 h-36 z" />
                <rect x="700" y="70" width="6" height="40" rx="3" />
                <ellipse cx="703" cy="62" rx="20" ry="14" />
              </g>
            </svg>
            {/* ground */}
            <div className="absolute bottom-0 h-[30%] w-full bg-[linear-gradient(180deg,#14291d_0%,#0d1f15_60%,#0a1a10_100%)]" />

            {/* foreground grass — the fastest parallax layer */}
            <svg className="pim-fg absolute bottom-0 left-[-10%] w-[126%]" viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ height: "9%" }}>
              <g stroke="#1d3a28" strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M60 60 q4 -26 -6 -38" /><path d="M75 60 q-2 -20 8 -30" />
                <path d="M320 60 q6 -24 -4 -36" /><path d="M338 60 q-4 -18 6 -30" />
                <path d="M640 60 q4 -26 -6 -38" /><path d="M900 60 q6 -22 -2 -34" />
                <path className="pim-leaf" d="M1060 60 q8 -30 -4 -44" />
              </g>
            </svg>
          </div>

          {/* the four children along the journey */}
          {STORY_SCENES.map((s, i) => (
            <div key={s.id} className="absolute inset-0">
              <div className="absolute inset-0" style={{ left: `${[14, 38, 60, 78][i]}%` }}>
                <ChildPortrait scene={s} />
              </div>
            </div>
          ))}

          {/* the earlier children return for the finale */}
          <div className="pim-kids-return absolute bottom-[14%] left-1/2 flex -translate-x-1/2 gap-2 opacity-0">
            {STORY_SCENES.map(s => (
              <div key={s.id} className="relative h-14 w-11 overflow-hidden border border-[#e8b84b]/50 sm:h-16 sm:w-[52px]">
                <Image src={s.image} alt="" fill sizes="52px" className="object-cover saturate-[0.7]" style={{ objectPosition: s.objectPosition }} />
                <div className="absolute inset-0 bg-[#0a1a10]/40" />
              </div>
            ))}
          </div>

          {/* ── the traveling object ── */}
          <div className="pim-object absolute left-0 top-0 h-[76px] w-[76px] sm:h-[96px] sm:w-[96px]">
            <div className="pim-glow absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,rgba(232,184,75,0.75),transparent_65%)] opacity-0" />
            <div className="pim-heart-glow absolute inset-[-70%] rounded-full bg-[radial-gradient(circle,rgba(232,184,75,0.5),transparent_70%)] opacity-0" />
            <div className="pim-trail absolute right-full top-1/2 h-[3px] w-16 -translate-y-1/2 bg-gradient-to-l from-[#e8b84b]/80 to-transparent opacity-0" />
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="pim-spark absolute h-1.5 w-1.5 rotate-45 bg-[#e8b84b] opacity-0"
                style={{ left: `${12 + i * 14}%`, top: `${(i % 3) * 22}%` }} />
            ))}
            {/* sound waves (Aminata) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="pim-wave absolute inset-0 rounded-full border border-[#e8b84b]/70 opacity-0" />
            ))}
            {/* rising ideas (Hawa) */}
            {["A", "★", "7", "♪", "✎"].map((c, i) => (
              <span key={i} className="pim-idea absolute font-heading text-[15px] italic text-[#f2e3c0] opacity-0"
                style={{ left: `${8 + i * 18}%`, top: "-12%" }}>{c}</span>
            ))}

            <svg viewBox="0 0 200 200" className="pim-obj-svg h-full w-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
              {/* football */}
              <g className="pim-g-ball">
                <circle cx="100" cy="100" r="62" fill="#f4f1ea" stroke="#1a2e1f" strokeWidth="4" />
                <polygon points="100,72 126,91 116,122 84,122 74,91" fill="#1a2e1f" />
                <path d="M100 38 v34 M126 91 l32 -18 M116 122 l22 26 M84 122 l-22 26 M74 91 l-32 -18" stroke="#1a2e1f" strokeWidth="4" fill="none" />
              </g>
              {/* microphone */}
              <g className="pim-g-mic">
                <rect x="88" y="96" width="24" height="64" rx="10" fill="#8a6a1e" />
                <rect x="92" y="150" width="16" height="14" rx="4" fill="#5d4614" />
                <circle cx="100" cy="72" r="34" fill="#c9962a" />
                <g fill="#0a1a10" opacity="0.55">
                  {[58, 72, 86].map(y => [86, 100, 114].map(x => <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" />))}
                </g>
                <path d="M64 72 a36 36 0 0 0 72 0" stroke="#e8b84b" strokeWidth="4" fill="none" />
              </g>
              {/* schoolbook */}
              <g className="pim-g-book">
                <path d="M100 66 C 78 54, 48 54, 36 62 L36 138 C 48 130, 78 130, 100 142 Z" fill="#f4f1ea" stroke="#8a6a1e" strokeWidth="4" className="pim-page" style={{ transformOrigin: "100px 100px" }} />
                <path d="M100 66 C 122 54, 152 54, 164 62 L164 138 C 152 130, 122 130, 100 142 Z" fill="#efe6d2" stroke="#8a6a1e" strokeWidth="4" />
                <path d="M100 66 V142" stroke="#c9962a" strokeWidth="5" />
                <path d="M48 78 h36 M48 92 h36 M116 78 h36 M116 92 h36 M116 106 h24" stroke="#b9a67c" strokeWidth="4" strokeLinecap="round" />
              </g>
              {/* stethoscope */}
              <g className="pim-g-steth">
                <path d="M64 40 v42 a36 36 0 0 0 72 0 V40" stroke="#c9962a" strokeWidth="9" fill="none" strokeLinecap="round" />
                <path d="M100 118 v22 a26 26 0 0 0 26 24" stroke="#c9962a" strokeWidth="9" fill="none" strokeLinecap="round" />
                <circle cx="148" cy="164" r="20" fill="#e8b84b" stroke="#8a6a1e" strokeWidth="5" />
                <circle cx="64" cy="34" r="8" fill="#8a6a1e" />
                <circle cx="136" cy="34" r="8" fill="#8a6a1e" />
              </g>
              {/* the glowing heart */}
              <g className="pim-g-heart">
                <path d={HEART_PATH} fill="#c9962a" stroke="#e8b84b" strokeWidth="4" />
                <path d="M74 84 q10 -16 26 -14" stroke="#f7e3b2" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
              </g>
            </svg>
          </div>
          {/* contact shadow */}
          <div className="pim-shadow absolute left-0 top-0 h-3 w-16 -translate-x-1/2 rounded-[100%] bg-black/30 blur-[3px]"
            style={{ transform: "translate(calc(14vw - 32px), calc(72svh + 30px))" }} />

          {/* ── captions ── */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[7%] z-30 px-6 sm:bottom-[10%] sm:px-14">
            {[
              { h: STORY_INTRO.headline, p: STORY_INTRO.support },
              ...STORY_SCENES.map(s => ({ h: s.headline, p: s.description })),
              { h: STORY_FINALE.headline, p: STORY_FINALE.support },
            ].map((c, i) => (
              <div key={i} className={`pim-caption pim-cap-${i} absolute inset-x-6 bottom-0 max-w-xl sm:inset-x-14`}>
                <div className="overflow-hidden">
                  <p className="pim-cap-line font-heading text-[clamp(26px,5.5vw,46px)] font-semibold leading-tight text-white [text-shadow:0_2px_18px_rgba(10,26,16,0.8)]">{c.h}</p>
                </div>
                <div className="overflow-hidden">
                  <p className="pim-cap-line mt-2 max-w-md text-[14px] leading-6 text-white/85 [text-shadow:0_1px_10px_rgba(10,26,16,0.9)] sm:text-[15px]">{c.p}</p>
                </div>
              </div>
            ))}
          </div>

          {/* scroll cue */}
          <div className="pim-cue absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">{STORY_INTRO.scrollCue}</span>
            <span className="block h-8 w-px bg-gradient-to-b from-[#e8b84b] to-transparent" />
          </div>
        </section>

        {/* the bridge: after Musa's kick and Aminata's song, curiosity peaks */}
        {progress >= 0.3 && (
          <Link
            href="/talents"
            className="fixed right-0 top-1/2 z-40 -translate-y-1/2 border border-r-0 border-[#c9962a]/50 bg-[#0d2015]/95 px-2.5 py-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8b84b] backdrop-blur-sm transition hover:border-[#e8b84b] hover:bg-[#c9962a]/15 focus-visible:outline-2 focus-visible:outline-[#e8b84b] [writing-mode:vertical-rl]"
          >
            See their talents ✦
          </Link>
        )}

        {/* story progress — six chapters */}
        <div className="pointer-events-none fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-[2px] w-4 transition-all duration-300"
              style={{ background: i <= activeScene && progress > 0.001 ? "#c9962a" : "rgba(255,255,255,0.2)", width: i === activeScene ? 22 : 14 }} />
          ))}
        </div>
      </div>
      )}

      <FinalCallToAction />
    </div>
  );
}
