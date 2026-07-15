"use client";

// The Talent Gallery — data-driven from /data/talents.json (see data.ts for
// the safeguarding render rule and media-upload instructions). Cards work
// with NO media uploaded: a branded duotone initial tile shows until the
// poster/video files exist in /public/assets/talents/.

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import GoldThread from "../../components/GoldThread";
import { CATEGORIES, SPONSOR_TIERS, visibleTalents, type Talent } from "./data";

const MAX_PLAYING = 3;
const playing = new Set<HTMLVideoElement>();

function fmtDuration(s: number) {
  return `0:${String(s).padStart(2, "0")}`;
}

// ── Media frame: gold corner brackets; poster→video; initial tile fallback ──
function TalentMedia({ t, large = false }: { t: Talent; large?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOk, setPosterOk] = useState(true);
  const [videoOk, setVideoOk] = useState(true);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !videoOk || large) return;
    if (playing.size >= MAX_PLAYING && !playing.has(v)) return;
    playing.add(v);
    v.play().catch(() => setVideoOk(false));
  }, [videoOk, large]);
  const stop = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    playing.delete(v);
  }, []);

  // Mobile (no hover): play while in viewport, pause off-screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || large) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? tryPlay() : stop()),
      { threshold: 0.6 },
    );
    io.observe(v);
    return () => { io.disconnect(); stop(); };
  }, [tryPlay, stop, large]);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden bg-[#0d2015]"
      onMouseEnter={large ? undefined : tryPlay}
      onMouseLeave={large ? undefined : stop}
    >
      {/* branded duotone initial tile — visible until a poster is uploaded */}
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,#1d4030,#0d2015_70%)]">
        <span className="font-heading text-[64px] italic text-[#c9962a]/45">{t.firstName[0]}</span>
      </div>
      {posterOk && t.poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={t.poster}
          alt={`${t.firstName}, ${t.age} — ${t.talentTitle}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover saturate-[0.85]"
          onError={() => setPosterOk(false)}
        />
      )}
      {videoOk && t.video && (
        <video
          ref={videoRef}
          muted={!large}
          loop
          playsInline
          controls={large}
          preload="none"
          poster={posterOk && t.poster ? t.poster : undefined}
          className={`absolute inset-0 h-full w-full object-cover ${large ? "" : "pointer-events-none"}`}
          onError={() => setVideoOk(false)}
        >
          <source src={t.video} type="video/mp4" />
          {t.captions && <track kind="captions" srcLang="en" label="English" src={t.captions} default />}
        </video>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1a10]/45 via-transparent to-transparent" />
      {/* gold corner brackets — the signature frame */}
      {["left-1.5 top-1.5 border-l border-t", "right-1.5 top-1.5 border-r border-t",
        "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"].map(c => (
        <span key={c} className={`pointer-events-none absolute h-3.5 w-3.5 border-[#e8b84b]/80 ${c}`} />
      ))}
      {videoOk && t.video && t.durationSec > 0 && !large && (
        <span className="absolute bottom-2 right-2 bg-[#0a1a10]/80 px-1.5 py-0.5 text-[10px] font-bold text-[#e8b84b]">
          {fmtDuration(t.durationSec)}
        </span>
      )}
      {t.sponsored && (
        <span className="absolute left-0 top-3 bg-[#c9962a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0a1a10]">
          Sponsored ♥
        </span>
      )}
    </div>
  );
}

function ProfileModal({ t, onClose }: { t: Talent; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const share = async () => {
    const url = `${location.origin}/talents/gallery#child-${t.id}`; // URL only — never media
    try {
      if (navigator.share) await navigator.share({ url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`${t.firstName} — ${t.talentTitle}`}
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#0a1a10]/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="max-h-[92svh] w-full max-w-lg overflow-y-auto border-t-[1.5px] border-[#c9962a]/50 bg-[#0d2015] sm:border-[1.5px]">
        <div className="flex items-center justify-between px-5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8b84b]">{t.firstName} · {t.town}</p>
          <button ref={closeRef} onClick={onClose} aria-label="Close profile"
            className="flex h-10 w-10 items-center justify-center text-white/50 transition hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8b84b]">✕</button>
        </div>
        <div className="px-5"><TalentMedia t={t} large /></div>
        <div className="px-5 pb-6 pt-4">
          <h2 className="font-heading text-2xl font-semibold text-white">{t.talentTitle}</h2>
          <p className="mt-2 text-[14px] leading-6 text-white/70">{t.story}</p>
          <p className="mt-3 text-[11px] leading-5 text-white/40">
            All contact between sponsors and children is reviewed and delivered by the foundation — there is no direct messaging.
          </p>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a]">What sponsorship provides</p>
          <div className="mt-2 space-y-2">
            {SPONSOR_TIERS.map(tier => (
              <div key={tier.amount} className="flex items-baseline gap-3 border border-white/10 px-3.5 py-2.5">
                <span className="shrink-0 font-heading text-lg font-semibold text-[#e8b84b]">{tier.amount}</span>
                <span className="text-[13px] text-white/75"><b className="text-white">{tier.label}</b> — {tier.detail}</span>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[10px] italic text-white/35">Final tier amounts to be confirmed by the foundation.</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link href={`/sponsor?child=${t.id}`}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[#c9962a] px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition hover:bg-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
              ♥ Sponsor {t.firstName}
            </Link>
            <button onClick={share}
              className="flex min-h-[48px] items-center justify-center border border-white/25 px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-white/70 transition hover:border-[#c9962a]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8b84b]">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const talents = visibleTalents();
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get("cat") || "all");
  const [open, setOpen] = useState<Talent | null>(null);

  // deep links: #child-{id} opens a profile; ?cat= preselects a tab
  useEffect(() => {
    const id = location.hash.replace("#child-", "");
    if (id) {
      const t = talents.find(x => x.id === id);
      if (t) setOpen(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openProfile = (t: Talent) => { setOpen(t); history.replaceState(null, "", `#child-${t.id}`); };
  const closeProfile = () => { setOpen(null); history.replaceState(null, "", location.pathname + location.search); };
  const pickCat = (id: string) => {
    setCat(id);
    history.replaceState(null, "", id === "all" ? location.pathname : `?cat=${id}`);
  };

  const counts: Record<string, number> = { all: talents.length };
  for (const t of talents) counts[t.category] = (counts[t.category] || 0) + 1;
  const shown = cat === "all" ? talents : talents.filter(t => t.category === cat);

  return (
    <div className="min-h-[100svh] bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      {/* hero */}
      <section className="px-5 pb-8 pt-10 text-center sm:pt-14">
        <GoldThread className="mx-auto w-24" />
        <h1 className="mt-5 font-heading text-[clamp(30px,6vw,52px)] font-semibold leading-tight">
          Every child has <em className="italic text-[#e8b84b]">a talent</em>.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-white/65">
          Watch them shine — and help one keep going.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-[11px] leading-5 text-white/40">
          All photos and videos are shared with the consent of each child&apos;s guardian.
        </p>
      </section>

      {/* category tabs — the journey objects carry into navigation */}
      <div className="sticky top-[60px] z-30 border-y border-white/10 bg-[#0a1a10]/95 backdrop-blur-md sm:top-[64px]">
        <div className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none]">
          {CATEGORIES.map(c => {
            const active = cat === c.id;
            const n = counts[c.id] || 0;
            if (c.id !== "all" && n === 0) return null;
            return (
              <button key={c.id} onClick={() => pickCat(c.id)}
                className={`relative flex min-h-[44px] shrink-0 items-center gap-1.5 px-3.5 text-[11px] font-bold uppercase tracking-[0.12em] transition focus-visible:outline-2 focus-visible:outline-[#e8b84b] ${active ? "text-[#e8b84b]" : "text-white/50 hover:text-white"}`}>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 ${active ? "animate-bounce [animation-iteration-count:1]" : ""}`} fill="currentColor" aria-hidden="true">
                  <path d={c.icon} />
                </svg>
                {c.label} <span className="opacity-50">{n}</span>
                {active && <span className="absolute inset-x-2 bottom-0 h-[2px] bg-[#c9962a]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* the grid */}
      <section className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(t => (
          <article key={t.id} id={`child-${t.id}`} className="group border border-white/10 bg-[#0d2015]/60 transition hover:border-[#c9962a]/40">
            <button onClick={() => openProfile(t)} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
              aria-label={`Open ${t.firstName}'s profile`}>
              <TalentMedia t={t} />
            </button>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-heading text-xl font-semibold">{t.firstName}, {t.age}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{t.town}</p>
              </div>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c9962a]">
                {CATEGORIES.find(c => c.id === t.category)?.label || t.category}
              </p>
              <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/70">{t.talentTitle}</p>
              {t.sponsored ? (
                <Link href={`/sponsor?child=${t.id}&encourage=1`}
                  className="mt-4 flex min-h-[44px] items-center justify-center border border-[#c9962a]/50 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8b84b] transition hover:border-[#e8b84b] focus-visible:outline-2 focus-visible:outline-[#e8b84b]">
                  Send encouragement
                </Link>
              ) : (
                <Link href={`/sponsor?child=${t.id}`}
                  className="mt-4 flex min-h-[44px] items-center justify-center gap-2 bg-[#c9962a] px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a1a10] transition hover:bg-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
                  ♥ Sponsor {t.firstName}
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* safeguarding promise */}
      <section className="border-t border-white/10 px-5 py-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">Our child-safeguarding promise</p>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-white/60">
          First names and town only. Every photo and video published with guardian consent and the child&apos;s
          own assent. No direct contact between visitors and children — every message passes through the
          foundation. Any child can be removed from this site within 24 hours.
        </p>
        <Link href="/child-safeguarding" className="mt-3 inline-block text-[12px] uppercase tracking-[0.16em] text-[#e8b84b] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#e8b84b]">
          Read the full policy
        </Link>
      </section>

      {open && <ProfileModal t={open} onClose={closeProfile} />}
    </div>
  );
}

export default function TalentGalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-[#0a1a10]" />}>
      <Gallery />
    </Suspense>
  );
}
