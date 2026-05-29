"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const talents = [
  { name: "Aminata Koroma", country: "Sierra Leone", flag: "🇸🇱", type: "Music", song: "Rise (Original)", audio: "/audio/talent-aminata.mp3", href: "/programs/talent/music" },
  { name: "Kwame Asante", country: "Ghana", flag: "🇬🇭", type: "Football", song: "Highlight Reel", audio: "/audio/talent-kofi.mp3", href: "/programs/talent/football" },
  { name: "Fatou Diop", country: "Senegal", flag: "🇸🇳", type: "Music", song: "Teranga (Original)", audio: "/audio/talent-fatou.mp3", href: "/programs/talent/music" },
  { name: "Chidi Okonkwo", country: "Nigeria", flag: "🇳🇬", type: "Technology", song: "Chidi's Story", audio: "/audio/talent-chidi.mp3", href: "/programs/talent/technology" },
];

export default function TalentPlayer() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * talents.length));
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
      <div className={`fixed bottom-6 right-6 z-[200] w-[300px] bg-[#0d1a10] border border-[#2a4a32] rounded-[14px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1a3a22]">
          <div className="h-9 w-9 rounded-full bg-[#1a3a22] border-2 border-[#c9962a] flex items-center justify-center text-lg shrink-0">
            {t.flag}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#f0ede4] truncate">{t.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ed68a] animate-pulse shrink-0" />
              <p className="text-[11px] text-[#6a8a72] truncate">{t.type} · {t.country}</p>
            </div>
          </div>
          <button onClick={dismiss} className="text-[#4a6a52] hover:text-[#8aaa92] transition shrink-0" aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          {/* Audio row */}
          <div className="flex items-center gap-3 mb-3">
            <button onClick={toggle} className="h-8 w-8 rounded-full bg-[#c9962a] flex items-center justify-center shrink-0 hover:bg-[#e8b84b] transition" aria-label={playing ? "Pause" : "Play"}>
              {playing
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a1a10"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                : <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a1a10"><polygon points="1,0.5 9.5,5 1,9.5"/></svg>
              }
            </button>
            <div className="flex-1">
              {/* Waveform */}
              <div className="flex items-center gap-[2px] h-5 mb-1">
                {[6,10,16,9,14,20,13,8,18,14,11,18,16,9,15,20,8,13,18,6,12,16,14,10,20,13].map((h, i) => (
                  <div key={i} style={{ height: h, width: 2, borderRadius: 1, background: i < Math.floor(progress * 26) ? "#c9962a" : "#2a4a32", transition: "background 0.1s" }} />
                ))}
              </div>
              {/* Progress bar */}
              <div className="h-[2px] bg-[#1a3a22] rounded-full overflow-hidden">
                <div className="h-full bg-[#c9962a] rounded-full transition-all duration-200" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link href={t.href} className="flex-1 bg-[#c9962a] text-[#0a0f0c] text-[11px] font-medium rounded-[7px] py-2 flex items-center justify-center gap-1.5 hover:bg-[#e8b84b] transition">
              ♥ Sponsor
            </Link>
            <button onClick={next} className="border border-[#2a4a32] text-[#6a8a72] rounded-[7px] px-3 py-2 text-[11px] hover:border-[#5ed68a] hover:text-[#5ed68a] transition" aria-label="Next">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="0,0.5 8,6 0,11.5"/><rect x="9" y="0" width="2" height="12"/></svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {talents.map((_, i) => (
              <button key={i} onClick={() => { audioRef.current?.pause(); setPlaying(false); setProgress(0); setCurrent(i); }} className={`h-1.5 w-1.5 rounded-full transition-all ${i === current ? "bg-[#c9962a]" : "bg-[#2a4a32]"}`} aria-label={`Talent ${i+1}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
