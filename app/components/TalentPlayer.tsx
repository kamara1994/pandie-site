"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const talents = [
  { flag:"🇸🇱", name:"Aminata Koroma", age:14, loc:"Freetown, Sierra Leone", type:"Music", icon:"🎵", detail:"Vocalist & Songwriter", fact:"Wrote her first song at age 9 with no instrument", media:"audio", label:"Rise — original composition", href:"/programs/talent/music", c:{ bg:"#0d1110", card:"#1a1020", border:"#4a2a6a", accent:"#a78bfa", badge:"#1a1a3a", badgeTxt:"#a78bfa" }},
  { flag:"🇬🇭", name:"Kwame Asante", age:16, loc:"Accra, Ghana", type:"Football", icon:"⚽", detail:"Striker · U-17 Regional MVP", fact:"23 goals this season — scouts calling from Europe", media:"stat", label:"23 goals · 2 academy offers · U-17 MVP", href:"/programs/talent/football", c:{ bg:"#0a1a0d", card:"#0f2a14", border:"#2a6a3a", accent:"#5ed68a", badge:"#1a2e1a", badgeTxt:"#5ed68a" }},
  { flag:"🇸🇳", name:"Fatou Diop", age:13, loc:"Dakar, Senegal", type:"Music", icon:"🎵", detail:"Trilingual Singer", fact:"Sings in Wolof, French and English — age 13", media:"audio", label:"Teranga — original", href:"/programs/talent/music", c:{ bg:"#0d1110", card:"#1a1020", border:"#4a2a6a", accent:"#a78bfa", badge:"#1a1a3a", badgeTxt:"#a78bfa" }},
  { flag:"🇳🇬", name:"Chidi Okonkwo", age:17, loc:"Lagos, Nigeria", type:"Technology", icon:"💡", detail:"Developer & Innovator", fact:"Built a health app for 800 families on a borrowed laptop", media:"stat", label:"800 families · Health app · Age 17", href:"/programs/talent/technology", c:{ bg:"#0a0f1a", card:"#0f1a2e", border:"#1a3a6a", accent:"#60a5fa", badge:"#1a2a3a", badgeTxt:"#60a5fa" }},
  { flag:"🇨🇮", name:"Emmanuel Dabo", age:15, loc:"Abidjan, Ivory Coast", type:"Technology", icon:"💡", detail:"Solar Innovator", fact:"Built a solar kit powering 6 homes for just $12", media:"stat", label:"6 homes powered · $12 build · Age 15", href:"/programs/talent/technology", c:{ bg:"#0a0f1a", card:"#0f1a2e", border:"#1a3a6a", accent:"#60a5fa", badge:"#1a2a3a", badgeTxt:"#60a5fa" }},
  { flag:"🇬🇳", name:"Aissatou Barry", age:17, loc:"Conakry, Guinea", type:"Academic", icon:"📚", detail:"Mathematics Prodigy", fact:"Won the West Africa Mathematics Olympiad at 17", media:"stat", label:"Olympiad champion · Target: MIT", href:"/programs/talent/academic", c:{ bg:"#1a0e08", card:"#2a1a0a", border:"#6a3a0a", accent:"#fb923c", badge:"#2a1a0a", badgeTxt:"#fb923c" }},
  { flag:"🇬🇭", name:"Kofi Mensah", age:14, loc:"Kumasi, Ghana", type:"Music", icon:"🎵", detail:"Afrobeats Producer", fact:"Produces full tracks on a phone — no laptop, no studio", media:"audio", label:"Tomorrow — original", href:"/programs/talent/music", c:{ bg:"#0d1110", card:"#1a1020", border:"#4a2a6a", accent:"#a78bfa", badge:"#1a1a3a", badgeTxt:"#a78bfa" }},
  { flag:"🇸🇱", name:"Amara Sesay", age:15, loc:"Bo, Sierra Leone", type:"Football", icon:"⚽", detail:"Midfielder · U-15", fact:"Trains barefoot every morning before school starts", media:"stat", label:"18 assists · Scouted by 2 academies", href:"/programs/talent/football", c:{ bg:"#0a1a0d", card:"#0f2a14", border:"#2a6a3a", accent:"#5ed68a", badge:"#1a2e1a", badgeTxt:"#5ed68a" }},
  { flag:"🇲🇦", name:"Yasmine El Fassi", age:16, loc:"Marrakech, Morocco", type:"Academic", icon:"📚", detail:"Top National Scholar", fact:"Top science score in all of Morocco — full scholarship target", media:"stat", label:"Top 1% nationally · Cambridge target", href:"/programs/talent/academic", c:{ bg:"#1a0e08", card:"#2a1a0a", border:"#6a3a0a", accent:"#fb923c", badge:"#2a1a0a", badgeTxt:"#fb923c" }},
  { flag:"🇬🇳", name:"Mariama Bah", age:13, loc:"Labé, Guinea", type:"Music", icon:"🎵", detail:"Fula Fusion Artist", fact:"Blends ancient Fula instruments with modern pop at age 13", media:"audio", label:"Sunrise — Fula fusion original", href:"/programs/talent/music", c:{ bg:"#0d1110", card:"#1a1020", border:"#4a2a6a", accent:"#a78bfa", badge:"#1a1a3a", badgeTxt:"#a78bfa" }},
];

const wvH = [6,10,16,9,14,20,13,8,18,14,11,18,16,9,15,20,8,13,18,6,12,16,14,10,20,13];

export default function TalentPlayer() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [cur, setCur] = useState(() => Math.floor(Math.random() * talents.length));
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!sessionStorage.getItem("talent-dismissed")) setVisible(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProg(a.currentTime / (a.duration || 1));
    const onEnd = () => { setPlaying(false); setProg(0); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  }, [cur]);

  const stopPlay = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setProg(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCur(c => (c + 1) % talents.length);
      stopPlay();
    }, 7000);
  }, [stopPlay]);

  useEffect(() => {
    if (visible && !hidden) resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [visible, hidden, resetAuto]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const go = (idx: number) => {
    stopPlay();
    setProg(0);
    setCur(idx);
    resetAuto();
  };

  const minimize = () => {
    stopPlay();
    setHidden(true);
    if (autoRef.current) clearInterval(autoRef.current);
  };

  const reopen = () => {
    setHidden(false);
    setCur(Math.floor(Math.random() * talents.length));
    resetAuto();
  };

  const dismiss = () => {
    stopPlay();
    setDismissed(true);
    sessionStorage.setItem("talent-dismissed", "1");
  };

  if (dismissed || !visible) return null;

  const t = talents[cur];

  return (
    <>
      {t.media === "audio" && <audio ref={audioRef} src={`/audio/talent-${t.name.split(" ")[0].toLowerCase()}.mp3`} preload="metadata" />}

      <style>{`
        @keyframes pandieRing { 0%{opacity:.9;transform:scale(1)} 100%{opacity:0;transform:scale(1.15)} }
        @keyframes pandieFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.05)} }
        @keyframes pandiePopIn { from{transform:scale(.75) translateY(24px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes pandieBoing { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-12px)} 50%{transform:translateY(-6px)} 75%{transform:translateY(-10px)} }
        @keyframes pandieGlow { from{transform:scale(1)} to{transform:scale(1.06)} }
        @keyframes pandiePbGlow { from{box-shadow:0 0 0 0 ${t.c.accent}40} to{box-shadow:0 0 0 6px ${t.c.accent}00} }
      `}</style>

      {/* Floating star when minimized */}
      {hidden && (
        <div className="fixed bottom-6 right-6 z-[200]" style={{ animation: "pandieFloat 2s ease-in-out infinite" }}>
          <div className="absolute inset-[-6px] rounded-full border-[1.5px] pointer-events-none" style={{ borderColor: t.c.accent, animation: "pandieRing 2s ease-out infinite", color: t.c.accent }} />
          <div className="absolute inset-[-14px] rounded-full border pointer-events-none opacity-40" style={{ borderColor: t.c.accent, animation: "pandieRing 2s ease-out infinite .5s" }} />
          <button onClick={reopen} className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-none cursor-pointer" style={{ background: t.c.accent }} aria-label="Show talents">🌟</button>
        </div>
      )}

      {/* Main popup */}
      {!hidden && (
        <div className="fixed bottom-6 right-6 z-[200]" style={{ animation: "pandiePopIn .5s cubic-bezier(.19,1,.22,1) both" }}>
          <div className="absolute inset-[-8px] rounded-[20px] border-[1.5px] pointer-events-none" style={{ borderColor: t.c.accent, animation: "pandieRing 2.5s ease-out infinite" }} />
          <div className="absolute inset-[-18px] rounded-[26px] border pointer-events-none opacity-40" style={{ borderColor: t.c.accent, animation: "pandieRing 2.5s ease-out infinite .8s" }} />

          <div className="w-[276px] rounded-[14px] overflow-hidden border transition-all duration-700" style={{ background: t.c.bg, borderColor: t.c.border, animation: "pandieBoing .45s cubic-bezier(.36,.07,.19,.97)" }}>

            {/* Hook bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <div>
                <p className="text-[11px] font-medium transition-colors duration-700" style={{ color: t.c.accent }}>Hey! Want to watch our talents? 🌍</p>
                <p className="text-[9px] opacity-40 text-white tracking-wide">Africa's next generation — discover them</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={minimize} className="text-white/20 hover:text-white/60 transition text-[13px] bg-transparent border-none cursor-pointer" aria-label="Minimize">—</button>
                <button onClick={dismiss} className="text-white/20 hover:text-white/60 transition bg-transparent border-none cursor-pointer" aria-label="Close">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Card row */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 transition-all duration-700" style={{ background: t.c.card, borderColor: t.c.accent, animation: "pandieGlow 2s ease-in-out infinite alternate" }}>
                {t.flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#f0ede4] truncate">{t.name}</p>
                <p className="text-[10px] text-[#6a8a72]">Age {t.age} · {t.loc}</p>
                <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 transition-all duration-700" style={{ background: t.c.badge, color: t.c.badgeTxt }}>{t.icon} {t.type}</span>
              </div>
            </div>

            {/* Fact */}
            <p className="mx-3 my-2 text-[11px] italic text-[#8aaa92] border-l-2 pl-2.5 leading-snug transition-all duration-700" style={{ borderColor: t.c.accent }}>"{t.fact}"</p>

            {/* Media */}
            <div className="px-3 pb-2">
              {t.media === "audio" ? (
                <div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={toggle} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all duration-700" style={{ background: t.c.accent, animation: "pandiePbGlow 1.8s ease-in-out infinite alternate" }} aria-label={playing ? "Pause" : "Play"}>
                      {playing
                        ? <svg width="10" height="10" viewBox="0 0 10 10" fill={t.c.bg}><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                        : <svg width="10" height="10" viewBox="0 0 10 10" fill={t.c.bg}><polygon points="1,0.5 9.5,5 1,9.5"/></svg>
                      }
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-[2px] h-5">
                        {wvH.map((h, i) => (
                          <div key={i} style={{ width: 2, height: h, borderRadius: 1, background: i < Math.floor(prog * wvH.length) ? t.c.accent : "rgba(255,255,255,.1)", transition: "background .1s" }} />
                        ))}
                      </div>
                      <div className="h-[2px] rounded-full overflow-hidden mt-1" style={{ background: "rgba(255,255,255,.08)" }}>
                        <div className="h-full rounded-full transition-all duration-100" style={{ width: `${prog * 100}%`, background: t.c.accent }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] mt-1 pl-[42px]" style={{ color: t.c.border }}>{t.label}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 rounded-[9px] border transition-all duration-700" style={{ background: t.c.card, borderColor: t.c.border }}>
                  <span className="text-[15px]">{t.icon}</span>
                  <span className="text-[11px] font-medium transition-colors duration-700" style={{ color: t.c.accent }}>{t.label}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link href={t.href} className="flex items-center justify-center gap-1.5 mx-3 mb-2 py-2.5 rounded-[9px] text-[12px] font-medium transition-all duration-700 no-underline" style={{ background: t.c.accent, color: t.c.bg }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><path d="M6.5 1C3.46 1 1 3.46 1 6.5S3.46 12 6.5 12 12 9.54 12 6.5 9.54 1 6.5 1zm0 1.5a4 4 0 110 8 4 4 0 010-8zm0 1.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>
              Watch {t.name.split(" ")[0]}'s talent →
            </Link>

            {/* Dots + Next */}
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-1">
                {talents.map((_, i) => (
                  <button key={i} onClick={() => go(i)} className="h-[5px] rounded-full border-none cursor-pointer transition-all duration-300" style={{ width: i === cur ? 14 : 5, background: i === cur ? t.c.accent : "rgba(255,255,255,.15)" }} aria-label={`Talent ${i+1}`} />
                ))}
              </div>
              <button onClick={() => go((cur + 1) % talents.length)} className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/80 bg-transparent border border-white/10 hover:border-white/30 rounded-[7px] px-2.5 py-1 cursor-pointer transition-all">
                Next <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><polygon points="0,0.5 7,5.5 0,10.5"/><rect x="8.5" y="0" width="2" height="11"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
