"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const talents = [
  {
    name: "Aminata Koroma", age: 14, country: "Sierra Leone", flag: "🇸🇱",
    type: "Music", icon: "🎵",
    detail: "Original Vocalist",
    fact: "Wrote her first song at age 9",
    audio: "/audio/talent-aminata.mp3",
    href: "/programs/talent/music",
    label: "Rise (Original Composition)",
  },
  {
    name: "Kwame Asante", age: 16, country: "Ghana", flag: "🇬🇭",
    type: "Football", icon: "⚽",
    detail: "Striker · U-17",
    fact: "23 goals in regional league this season",
    audio: "/audio/talent-kofi.mp3",
    href: "/programs/talent/football",
    label: "23 goals · Regional MVP",
  },
  {
    name: "Fatou Diop", age: 13, country: "Senegal", flag: "🇸🇳",
    type: "Music", icon: "🎵",
    detail: "Singer & Songwriter",
    fact: "Performs in 3 languages — Wolof, French & English",
    audio: "/audio/talent-fatou.mp3",
    href: "/programs/talent/music",
    label: "Teranga (Original)",
  },
  {
    name: "Chidi Okonkwo", age: 17, country: "Nigeria", flag: "🇳🇬",
    type: "Technology", icon: "💡",
    detail: "Young Developer",
    fact: "Built a health app serving 800 families",
    audio: "/audio/talent-chidi.mp3",
    href: "/programs/talent/technology",
    label: "Health app · 800 families",
  },
  {
    name: "Amara Sesay", age: 15, country: "Sierra Leone", flag: "🇸🇱",
    type: "Football", icon: "⚽",
    detail: "Midfielder · U-15",
    fact: "Scouted by 2 academies last year",
    audio: "/audio/talent-aminata.mp3",
    href: "/programs/talent/football",
    label: "Scouted by 2 academies",
  },
  {
    name: "Ngozi Adeyemi", age: 16, country: "Nigeria", flag: "🇳🇬",
    type: "Academic", icon: "📚",
    detail: "Top National Scholar",
    fact: "Highest science score in her entire state",
    audio: "/audio/talent-chidi.mp3",
    href: "/programs/talent/academic",
    label: "Target: MIT · Full scholarship",
  },
  {
    name: "Kofi Mensah", age: 14, country: "Ghana", flag: "🇬🇭",
    type: "Music", icon: "🎵",
    detail: "Afrobeats Producer",
    fact: "Produces beats using a phone and free apps",
    audio: "/audio/talent-kofi.mp3",
    href: "/programs/talent/music",
    label: "Tomorrow (Original)",
  },
  {
    name: "Aissatou Barry", age: 17, country: "Guinea", flag: "🇬🇳",
    type: "Academic", icon: "📚",
    detail: "Mathematics Prodigy",
    fact: "Won the West Africa Mathematics Olympiad",
    audio: "/audio/talent-fatou.mp3",
    href: "/programs/talent/academic",
    label: "Olympiad winner · Age 17",
  },
  {
    name: "Emmanuel Dabo", age: 15, country: "Ivory Coast", flag: "🇨🇮",
    type: "Technology", icon: "💡",
    detail: "Solar Innovator",
    fact: "Built a solar kit for his village for just $12",
    audio: "/audio/talent-chidi.mp3",
    href: "/programs/talent/technology",
    label: "Solar kit · $12 build cost",
  },
  {
    name: "Mariama Bah", age: 13, country: "Guinea", flag: "🇬🇳",
    type: "Music", icon: "🎵",
    detail: "Traditional & Modern Fusion",
    fact: "Blends Fula instruments with modern pop",
    audio: "/audio/talent-fatou.mp3",
    href: "/programs/talent/music",
    label: "Fula fusion · Original",
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Music:      { bg: "#1a1a3a", text: "#a78bfa", border: "#3a3a6a" },
  Football:   { bg: "#1a2e1a", text: "#5ed68a", border: "#2a4a2a" },
  Technology: { bg: "#1a2a3a", text: "#60a5fa", border: "#2a3a5a" },
  Academic:   { bg: "#2a1a1a", text: "#f97316", border: "#4a2a1a" },
};

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
    setPlaying(false); setDismissed(true); setVisible(false);
    sessionStorage.setItem("talent-player-dismissed", "1");
  };

  const t = talents[current];
  const colors = typeColors[t.type];
  const isMusic = t.type === "Music";

  if (dismissed || !visible) return null;

  return (
    <>
      <audio ref={audioRef} src={t.audio} preload="metadata" />
      <div className={`fixed bottom-6 right-6 z-[200] w-[300px] bg-[#0d1a10] border border-[#2a4a32] rounded-[14px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Type badge bar */}
        <div className="flex items-center justify-between px-4 py-2" style={{ background: colors.bg, borderBottom: `0.5px solid ${colors.border}` }}>
          <div className="flex items-center gap-2">
            <span>{t.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: colors.text }}>{t.type} Talent · Africa</span>
          </div>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: colors.text }} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1a3a22]">
          <div className="h-10 w-10 rounded-full bg-[#1a3a22] border-2 border-[#c9962a] flex items-center justify-center text-xl shrink-0">
            {t.flag}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#f0ede4] truncate">{t.name}</p>
            <p className="text-[11px] text-[#6a8a72]">Age {t.age} · {t.country} · {t.detail}</p>
          </div>
          <button onClick={dismiss} className="text-[#4a6a52] hover:text-[#8aaa92] transition shrink-0 ml-1" aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Fact */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-[11px] text-[#8aaa92] italic border-l-2 border-[#c9962a] pl-2 leading-relaxed">"{t.fact}"</p>
        </div>

        {/* Audio / Stats */}
        <div className="px-4 py-3">
          {isMusic ? (
            <div className="flex items-center gap-3 mb-3">
              <button onClick={toggle} className="h-8 w-8 rounded-full bg-[#c9962a] flex items-center justify-center shrink-0 hover:bg-[#e8b84b] transition" aria-label={playing ? "Pause" : "Play"}>
                {playing
                  ? <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a1a10"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                  : <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a1a10"><polygon points="1,0.5 9.5,5 1,9.5"/></svg>
                }
              </button>
              <div className="flex-1">
                <p className="text-[10px] text-[#4a6a52] mb-1 truncate">{t.label}</p>
                <div className="flex items-center gap-[2px] h-4 mb-1">
                  {[6,10,16,9,14,20,13,8,18,14,11,18,16,9,15,20,8,13,18,6].map((h, i) => (
                    <div key={i} style={{ height: h, width: 2, borderRadius: 1, background: i < Math.floor(progress * 20) ? "#c9962a" : "#2a4a32" }} />
                  ))}
                </div>
                <div className="h-[2px] bg-[#1a3a22] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9962a] rounded-full transition-all duration-200" style={{ width: `${progress * 100}%` }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3 p-2 rounded-lg" style={{ background: colors.bg, border: `0.5px solid ${colors.border}` }}>
              <span className="text-lg">{t.icon}</span>
              <p className="text-[11px] font-medium" style={{ color: colors.text }}>{t.label}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Link href={t.href} className="flex-1 bg-[#c9962a] text-[#0a0f0c] text-[11px] font-medium rounded-[7px] py-2 flex items-center justify-center gap-1.5 hover:bg-[#e8b84b] transition">
              ♥ Sponsor {t.name.split(" ")[0]}
            </Link>
            <button onClick={next} className="border border-[#2a4a32] text-[#6a8a72] rounded-[7px] px-3 py-2 hover:border-[#5ed68a] hover:text-[#5ed68a] transition" aria-label="Next talent">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="0,0.5 8,6 0,11.5"/><rect x="9" y="0" width="2" height="12"/></svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {talents.map((_, i) => (
              <button key={i} onClick={() => { audioRef.current?.pause(); setPlaying(false); setProgress(0); setCurrent(i); }}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === current ? 16 : 6, background: i === current ? "#c9962a" : "#2a4a32" }}
                aria-label={`Talent ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
