"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const artists = [
  { id: 1, name: "Aminata Koroma", age: 14, country: "Sierra Leone", flag: "🇸🇱", genre: "Afropop / Soul", region: "Freetown", story: "Aminata taught herself to sing by listening to the radio through a neighbour's wall. She has never had a lesson. The first time a music producer heard her voice, he went silent for a full minute.", dream: "Record an album that the whole of Africa hears", audio: "/audio/talent-aminata.mp3", audioLabel: "Original song — 'Rise'", monthly: "$35/mo", yearly: "$420/yr", highlight: "Competed in national school talent show — first place" },
  { id: 2, name: "Kofi Asante", age: 16, country: "Ghana", flag: "🇬🇭", genre: "Highlife / R&B", region: "Kumasi", story: "Kofi writes his own songs. He records them on his friend's phone in a storeroom because it has the least echo. His lyrics are being described by music teachers as unusually mature and emotionally sophisticated.", dream: "Collaborate with Sarkodie and play at Accra's biggest stage", audio: "/audio/talent-kofi.mp3", audioLabel: "Original track — 'Tomorrow'", monthly: "$40/mo", yearly: "$480/yr", highlight: "200,000 plays on a self-uploaded track" },
  { id: 3, name: "Fatou Diop", age: 13, country: "Senegal", flag: "🇸🇳", genre: "Afrobeats / Traditional", region: "Dakar", story: "Fatou blends traditional Senegalese rhythms with modern Afrobeats in ways that music scholars say take years of formal training to achieve. She has had none.", dream: "Represent Senegal at the Africa Music Awards", audio: "/audio/talent-fatou.mp3", audioLabel: "Original composition — 'Teranga'", monthly: "$35/mo", yearly: "$420/yr", highlight: "Featured on national radio at age 12" },
  { id: 4, name: "Chidi Okonkwo", age: 17, country: "Nigeria", flag: "🇳🇬", genre: "Afrobeats / Gospel", region: "Lagos", story: "Chidi can play four instruments. He learned all of them by watching YouTube on a phone that wasn't his. His arrangements are described by a Lagos-based producer as 'professional ready.'", dream: "Produce music for African and international artists", audio: "/audio/talent-chidi.mp3", audioLabel: "Produced instrumental — 'Lagos Rain'", monthly: "$45/mo", yearly: "$540/yr", highlight: "Produced tracks used in church of 5,000 members" },
  { id: 5, name: "Amina Hassan", age: 15, country: "Ethiopia", flag: "🇪🇹", genre: "Ethio-Jazz / Soul", region: "Addis Ababa", story: "Amina's voice carries the unique tonal quality of Ethiopian music combined with a modern soulfulness that stops people where they stand. She performs at weddings to help support her family.", dream: "Bring Ethiopian music to the global stage", audio: "/audio/talent-amina.mp3", audioLabel: "Live recording — 'Habesha Soul'", monthly: "$35/mo", yearly: "$420/yr", highlight: "Invited to perform at Ethiopian cultural festival" },
  { id: 6, name: "Yemi Adeyinka", age: 16, country: "Nigeria", flag: "🇳🇬", genre: "Afropop / Dance", region: "Ibadan", story: "Yemi choreographs, writes, and performs. Her energy on stage is magnetic. She has built a following purely through sharing short videos — but has no studio access, no coach, and no industry connection.", dream: "Perform at a major African music festival", audio: "/audio/talent-yemi.mp3", audioLabel: "Live performance recording — 'Move'", monthly: "$40/mo", yearly: "$480/yr", highlight: "50,000 social media followers built with no budget" },
];

function AudioPlayer({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else {
      document.querySelectorAll("audio").forEach(el => { if (el !== a) el.pause(); });
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime / (a.duration || 1));
    const onDur = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onDur);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("loadedmetadata", onDur); a.removeEventListener("ended", onEnd); };
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="bg-[#0a1a10] p-4 mt-4">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="h-10 w-10 shrink-0 bg-[#c9962a] flex items-center justify-center transition hover:bg-[#e8b84b]" aria-label={playing ? "Pause" : "Play"}>
          {playing
            ? <svg width="14" height="14" viewBox="0 0 14 14" fill="#0a1a10"><rect x="2" y="2" width="4" height="10"/><rect x="8" y="2" width="4" height="10"/></svg>
            : <svg width="14" height="14" viewBox="0 0 14 14" fill="#0a1a10"><polygon points="2,1 13,7 2,13"/></svg>
          }
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white/70 mb-2 truncate">{label}</p>
          <div className="h-1.5 bg-white/10 cursor-pointer" onClick={seek}>
            <div className="h-full bg-[#c9962a] transition-all duration-100" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        <span className="text-[11px] text-white/40 shrink-0">
          {duration > 0 ? fmt((audioRef.current?.currentTime || 0)) : "0:00"}
        </span>
      </div>
      {!playing && progress === 0 && (
        <p className="mt-2 text-[10px] text-white/30 italic">* Add real audio file to /public{src} to activate</p>
      )}
    </div>
  );
}

export default function MusicPage() {
  const [sponsored, setSponsored] = useState<number[]>([]);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs/talent" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← Talent Hub</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Music & Arts · Africa</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.02] text-white">Press Play.<br /><em className="italic text-[#e8b84b]">Hear Africa&apos;s Future.</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">These artists have never had a lesson, a studio, or a manager. What they have is a gift that stops people where they stand. Listen. Then decide if their voice deserves to be heard by the world.</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2">
          {artists.map((a) => (
            <article key={a.id} className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
              <div className="bg-[#0a1a10] px-6 pt-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 bg-[#214c34] flex items-center justify-center text-3xl shrink-0">{a.flag}</div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white">{a.name}</h3>
                      <p className="text-[12px] text-[#c9962a]">Age {a.age} · {a.country} · {a.genre}</p>
                    </div>
                  </div>
                </div>
                <AudioPlayer src={a.audio} label={a.audioLabel} />
              </div>
              <div className="p-6">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
                <p className="text-[14px] leading-7 text-[#626a67] mb-4">{a.story}</p>
                <div className="bg-[#f4f1ea] px-4 py-3 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Dream</p>
                  <p className="text-[13px] italic text-[#1a2e1f]">&ldquo;{a.dream}&rdquo;</p>
                </div>
                <div className="text-[11px] text-[#c9962a] font-semibold mb-5">⭐ {a.highlight}</div>
                <div className="border-t border-[#e0dbd0] pt-5">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{a.monthly}</p><p className="text-[10px] text-[#626a67]">Monthly</p></div>
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{a.yearly}</p><p className="text-[10px] text-[#626a67]">Full Year</p></div>
                  </div>
                  {sponsored.includes(a.id) ? (
                    <div className="w-full bg-[#214c34] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white">✓ Thank You for Supporting!</div>
                  ) : (
                    <Link href="/donate" onClick={() => setSponsored(prev => [...prev, a.id])}
                      className="block w-full bg-[#c9962a] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                      Support {a.name.split(" ")[0]}&apos;s Music →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#c9962a] px-6 py-16 text-center lg:px-20">
        <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-semibold text-[#0a1a10]">Their voice deserves<br />to be heard by the world</h2>
        <p className="mt-4 text-lg text-[#0a1a10]/70 max-w-lg mx-auto">Studio time, vocal coaching, production access, and industry connections — your sponsorship makes it real.</p>
        <Link href="/donate" className="mt-8 inline-block bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Support a Young Artist</Link>
      </section>
    </main>
  );
}
