"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const talents = [
  { name: "Aminata Koroma", country: "Sierra Leone", flag: "🇸🇱", song: "Rise (Original)", audio: "/audio/talent-aminata.mp3", href: "/programs/talent/music" },
  { name: "Kofi Asante", country: "Ghana", flag: "🇬🇭", song: "Tomorrow (Original)", audio: "/audio/talent-kofi.mp3", href: "/programs/talent/music" },
  { name: "Fatou Diop", country: "Senegal", flag: "🇸🇳", song: "Teranga (Original)", audio: "/audio/talent-fatou.mp3", href: "/programs/talent/music" },
];

export default function TalentPlayer() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("talent-player-dismissed")) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime / (a.duration || 1));
    const onEnd = () => { setPlaying(false); setProgress(0); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  }, [current]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const next = () => {
    audioRef.current?.pause();
    setPlaying(false); setProgress(0);
    setCurrent(c => (c + 1) % talents.length);
  };

  const dismiss = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("talent-player-dismissed", "1");
  };

  const t = talents[current];

  if (dismissed || !visible) return null;

  return (
    <>
      <audio ref={audioRef} src={t.audio} preload="metadata" />
      <div className={`fixed bottom-6 left-1/2 z-[200] w-[92vw] max-w-[560px] -translate-x-1/2 bg-[#0a1a10] shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-[#c9962a]/30 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Progress bar */}
        <div className="h-[2px] bg-white/10">
          <div className="h-full bg-[#c9962a] transition-all duration-200" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="flex items-center gap-4 px-5 py-4">
          {/* Flag avatar */}
          <div className="h-11 w-11 shrink-0 bg-[#214c34] flex items-center justify-center text-2xl">{t.flag}</div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-0.5">Pandie Talent · Africa</p>
            <p className="text-[14px] font-semibold text-white truncate">{t.name} <span className="text-white/40 font-normal">— {t.song}</span></p>
            <p className="text-[11px] text-white/35">{t.country}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={toggle} className="h-10 w-10 bg-[#c9962a] flex items-center justify-center transition hover:bg-[#e8b84b]" aria-label={playing ? "Pause" : "Play"}>
              {playing
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a1a10"><rect x="1" y="1" width="4" height="10"/><rect x="7" y="1" width="4" height="10"/></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a1a10"><polygon points="1,0.5 11.5,6 1,11.5"/></svg>
              }
            </button>
            <button onClick={next} className="h-10 w-10 border border-white/10 flex items-center justify-center text-white/50 transition hover:text-white hover:border-white/30" aria-label="Next talent">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="0,0.5 8,7 0,13.5"/><rect x="10" y="0" width="2" height="14"/></svg>
            </button>
          </div>

          {/* Support link */}
          <Link href={t.href} className="hidden sm:inline-flex items-center gap-2 bg-[#c9962a]/15 border border-[#c9962a]/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] transition hover:bg-[#c9962a]/25 shrink-0">
            Support →
          </Link>

          {/* Dismiss */}
          <button onClick={dismiss} className="h-8 w-8 shrink-0 flex items-center justify-center text-white/30 hover:text-white/70 transition" aria-label="Dismiss player">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
