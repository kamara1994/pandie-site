#!/bin/bash
set -e
GOLD='\033[0;33m'; GREEN='\033[0;32m'; BOLD='\033[1m'; NC='\033[0m'

echo ""
echo -e "${GOLD}${BOLD}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GOLD}${BOLD}║  Pandie Foundation — Phase 6: Africa Talent Platform  ║${NC}"
echo -e "${GOLD}${BOLD}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

if [ ! -f "package.json" ] || [ ! -d "app" ]; then
  echo "ERROR: Run from inside your pandie-site folder."; exit 1
fi

mkdir -p app/programs/talent/football app/programs/talent/music app/programs/talent/academic app/programs/talent/technology
mkdir -p _backup/programs/talent
cp app/programs/talent/page.tsx _backup/programs/talent/page.tsx 2>/dev/null || true
cp app/components/Hero.tsx _backup/Hero.tsx 2>/dev/null || true
echo -e "${GREEN}✓ Directories created & originals backed up${NC}"

# ── TALENT HUB PAGE (upgraded) ────────────────────────────────────────────────
echo -e "${BOLD}Building Africa Talent Hub...${NC}"
cat > app/programs/talent/page.tsx << 'EOF'
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
    <main className="min-h-screen bg-[#f4f1ea]">

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
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Talent Hub upgraded — Pan-African${NC}"

# ── FOOTBALL PAGE ─────────────────────────────────────────────────────────────
echo -e "${BOLD}Building Football Academy page...${NC}"
cat > app/programs/talent/football/page.tsx << 'EOF'
"use client";
import Link from "next/link";
import { useState } from "react";

const players = [
  { id: 1, name: "Koffi Mensah", age: 16, country: "Ghana", flag: "🇬🇭", position: "Forward", region: "Accra", story: "Koffi scores with his left foot, right foot, and head. He plays barefoot on concrete most days. He has never owned boots.", stat1: "38 goals", stat1Label: "This season", stat2: "Scouts", stat2Val: "3 interested", dream: "Become a professional striker in Europe", monthly: "$45/mo", yearly: "$540/yr", highlight: "Top scorer in regional youth league 2024" },
  { id: 2, name: "Seun Adeyemi", age: 15, country: "Nigeria", flag: "🇳🇬", position: "Midfielder", region: "Lagos", story: "Seun reads the game like a veteran. His vision and passing have made him the heartbeat of every team he plays for — but he has no boots, no coach, and no path forward.", stat1: "92%", stat1Label: "Pass accuracy", stat2: "MVP", stat2Val: "4 tournaments", dream: "Play for the Super Eagles and then abroad", monthly: "$40/mo", yearly: "$480/yr", highlight: "Named best midfielder in Lagos youth cup" },
  { id: 3, name: "Amadou Diallo", age: 17, country: "Senegal", flag: "🇸🇳", position: "Goalkeeper", region: "Dakar", story: "Amadou has hands that seem to predict where the ball will go. His reflexes are extraordinary. He has been told he has professional potential by three coaches but has no way to access training.", stat1: "87%", stat1Label: "Save rate", stat2: "Shutouts", stat2Val: "12 this year", dream: "Play in the African Champions League", monthly: "$40/mo", yearly: "$480/yr", highlight: "Best goalkeeper in Dakar regional tournament" },
  { id: 4, name: "Joseph Kamara", age: 14, country: "Sierra Leone", flag: "🇸🇱", position: "Winger", region: "Freetown", story: "Joseph is so fast that opposing players stop trying to keep up. His acceleration over 10 yards is something coaches describe as rare. He plays with torn shoes on a dirt pitch.", stat1: "Top speed", stat1Label: "Fastest in region", stat2: "Assists", stat2Val: "22 this season", dream: "Play in the Premier League one day", monthly: "$35/mo", yearly: "$420/yr", highlight: "Fastest young player identified in Freetown 2024" },
  { id: 5, name: "David Osei", age: 16, country: "Ghana", flag: "🇬🇭", position: "Defender", region: "Kumasi", story: "David is a wall at the back. Composed under pressure, dominant in the air, and a natural leader — his teammates follow him. He has never had professional coaching.", stat1: "Clean sheets", stat1Label: "9 in a row", stat2: "Aerial", stat2Val: "Won 94%", dream: "Captain the Black Stars of Ghana", monthly: "$40/mo", yearly: "$480/yr", highlight: "Led team to unbeaten regional championship" },
  { id: 6, name: "Yaw Asante", age: 15, country: "Cameroon", flag: "🇨🇲", position: "Forward", region: "Douala", story: "Yaw learned to play watching YouTube on someone else's phone. He has no boots. He has no formal coaching. But every scout who has seen him play says the same thing: this boy is different.", stat1: "32 goals", stat1Label: "Under-16 league", stat2: "Trials", stat2Val: "Awaiting first", dream: "Follow in Eto'o's footsteps", monthly: "$40/mo", yearly: "$480/yr", highlight: "Nominated by local coach as once-in-a-decade talent" },
];

const positions = ["All Positions", "Forward", "Midfielder", "Goalkeeper", "Winger", "Defender"];
const countries = ["All Countries", "Ghana", "Nigeria", "Senegal", "Sierra Leone", "Cameroon"];

export default function FootballPage() {
  const [posFilter, setPosFilter] = useState("All Positions");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [sponsored, setSponsored] = useState<number[]>([]);

  const filtered = players.filter(p =>
    (posFilter === "All Positions" || p.position === posFilter) &&
    (countryFilter === "All Countries" || p.country === countryFilter)
  );

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs/talent" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← Talent Hub</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Football Academy · Africa</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.02] text-white">Africa&apos;s Next<br /><em className="italic text-[#e8b84b]">Football Stars</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">These players have the talent to reach the highest level. They don&apos;t have the opportunity. You can change that — sponsor a player and be part of their journey from day one.</p>
          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-10">
            {[["⚽", `${players.length} Players`, "Ready to be sponsored"], ["🌍", "6 Countries", "Across Africa"], ["🏆", "3 Scouts", "Already watching"]].map(([i, n, l]) => (
              <div key={n} className="flex items-center gap-3">
                <span className="text-2xl">{i}</span>
                <div><p className="font-heading text-xl font-semibold text-white">{n}</p><p className="text-[11px] text-white/40">{l}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#e0dbd0] px-6 py-5 lg:px-20">
        <div className="mx-auto max-w-5xl flex flex-wrap gap-4 items-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#626a67]">Filter:</span>
          <div className="flex flex-wrap gap-3">
            {positions.map(p => (
              <button key={p} onClick={() => setPosFilter(p)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${posFilter === p ? "bg-[#0a1a10] text-white" : "bg-[#f4f1ea] text-[#626a67] hover:bg-[#0a1a10]/10"}`}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {countries.map(c => (
              <button key={c} onClick={() => setCountryFilter(c)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${countryFilter === c ? "bg-[#c9962a] text-[#0a1a10]" : "bg-[#f4f1ea] text-[#626a67] hover:bg-[#c9962a]/20"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Player cards */}
      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#626a67]">No players match your filter. Try another combination.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article key={p.id} className="group flex flex-col bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                  {/* Player header */}
                  <div className="bg-[#0a1a10] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 bg-[#214c34] flex items-center justify-center text-3xl shrink-0">{p.flag}</div>
                        <div>
                          <h3 className="font-heading text-xl font-semibold text-white">{p.name}</h3>
                          <p className="text-[12px] text-[#c9962a]">Age {p.age} · {p.country}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] border border-[#c9962a]/40 text-[#c9962a] px-2.5 py-1.5 whitespace-nowrap">{p.position}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 text-center">
                        <p className="font-heading text-xl font-semibold text-[#c9962a]">{p.stat1}</p>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mt-0.5">{p.stat1Label}</p>
                      </div>
                      <div className="bg-white/5 p-3 text-center">
                        <p className="font-heading text-xl font-semibold text-[#c9962a]">{p.stat2Val}</p>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mt-0.5">{p.stat2}</p>
                      </div>
                    </div>
                  </div>
                  {/* Story */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
                    <p className="text-[14px] leading-7 text-[#626a67] flex-1">{p.story}</p>
                    <div className="mt-4 bg-[#f4f1ea] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Dream</p>
                      <p className="text-[13px] text-[#1a2e1f] italic">&ldquo;{p.dream}&rdquo;</p>
                    </div>
                    <div className="mt-4 text-[11px] text-[#c9962a] font-semibold">⭐ {p.highlight}</div>
                    {/* Sponsor */}
                    <div className="mt-5 border-t border-[#e0dbd0] pt-5">
                      <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-[#f4f1ea] p-3 text-center">
                          <p className="text-[11px] font-bold text-[#1a2e1f]">{p.monthly}</p>
                          <p className="text-[10px] text-[#626a67]">Monthly</p>
                        </div>
                        <div className="flex-1 bg-[#f4f1ea] p-3 text-center">
                          <p className="text-[11px] font-bold text-[#1a2e1f]">{p.yearly}</p>
                          <p className="text-[10px] text-[#626a67]">Full Year</p>
                        </div>
                      </div>
                      {sponsored.includes(p.id) ? (
                        <div className="w-full bg-[#214c34] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white">✓ Thank You for Sponsoring!</div>
                      ) : (
                        <Link href="/donate" onClick={() => setSponsored(prev => [...prev, p.id])}
                          className="block w-full bg-[#c9962a] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                          Sponsor {p.name.split(" ")[0]} →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#214c34] px-6 py-16 text-center lg:px-20">
        <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-semibold text-white">The next great African<br /><em className="italic text-[#e8b84b]">footballer is waiting</em></h2>
        <p className="mt-4 text-lg text-white/55 max-w-lg mx-auto">Your sponsorship gives them boots, coaching, nutrition, and access to scouts. Be the reason they make it.</p>
        <Link href="/donate" className="mt-8 inline-block bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">Sponsor a Player Today</Link>
      </section>
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Football Academy page built${NC}"

# ── MUSIC PAGE ────────────────────────────────────────────────────────────────
echo -e "${BOLD}Building Music & Arts page with audio player...${NC}"
cat > app/programs/talent/music/page.tsx << 'EOF'
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
EOF
echo -e "${GREEN}✓ Music & Arts page built with audio player${NC}"

# ── ACADEMIC PAGE ─────────────────────────────────────────────────────────────
echo -e "${BOLD}Building Academic Excellence page...${NC}"
cat > app/programs/talent/academic/page.tsx << 'EOF'
"use client";
import Link from "next/link";
import { useState } from "react";

const scholars = [
  { id: 1, name: "Fatima Al-Rashid", age: 16, country: "Morocco", flag: "🇲🇦", subject: "Mathematics", region: "Casablanca", story: "Fatima solved a university-level calculus problem at age 13. Her maths teacher has run out of things to teach her. She scores 100% on every exam. She cannot afford university application fees.", achievement: "Won national maths olympiad two years running", dream: "Study at MIT and solve problems in AI", university: "MIT / Oxford", monthly: "$60/mo", yearly: "$720/yr" },
  { id: 2, name: "Emmanuel Okafor", age: 17, country: "Nigeria", flag: "🇳🇬", subject: "Medicine / Biology", region: "Enugu", story: "Emmanuel memorised the entire biology textbook before his teacher finished the first chapter. He wants to become a surgeon. His family cannot afford medical school application costs.", achievement: "Top student in all of Enugu State for three years", dream: "Become a neurosurgeon and serve Africa", university: "University of Lagos / Johns Hopkins", monthly: "$65/mo", yearly: "$780/yr" },
  { id: 3, name: "Aisha Diallo", age: 15, country: "Senegal", flag: "🇸🇳", subject: "Physics & Engineering", region: "Saint-Louis", story: "Aisha built a working water purification device from scrap materials at age 14. Her physics teacher submitted her design to a national competition. It won. She has never owned a textbook.", achievement: "National science fair winner 2024 — water technology", dream: "Build clean water infrastructure across West Africa", university: "École Polytechnique / Cambridge", monthly: "$60/mo", yearly: "$720/yr" },
  { id: 4, name: "Kwame Asante", age: 16, country: "Ghana", flag: "🇬🇭", subject: "Economics / Law", region: "Cape Coast", story: "Kwame debates with the confidence of a barrister and the logic of an economist. His teachers describe him as the most analytically gifted student they have taught in 20 years.", achievement: "Won all-Africa schools debating championship", dream: "Study law at Harvard and become Ghana's President", university: "Harvard / LSE", monthly: "$60/mo", yearly: "$720/yr" },
];

export default function AcademicPage() {
  const [sponsored, setSponsored] = useState<number[]>([]);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs/talent" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← Talent Hub</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Academic Excellence · Africa</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.02] text-white">Africa&apos;s<br /><em className="italic text-[#e8b84b]">Future Leaders</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">These young scholars have minds that will change the continent. They just need the door to open. A scholarship sponsor can open it.</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2">
          {scholars.map((s) => (
            <article key={s.id} className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
              <div className="bg-[#0a1a10] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 bg-[#214c34] flex items-center justify-center text-4xl shrink-0">{s.flag}</div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">{s.name}</h3>
                    <p className="text-[12px] text-[#c9962a] mt-0.5">Age {s.age} · {s.country}</p>
                    <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] border border-[#c9962a]/40 text-[#c9962a] px-2 py-1">{s.subject}</span>
                  </div>
                </div>
                <div className="bg-white/5 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Target Universities</p>
                  <p className="text-[13px] text-white/70">{s.university}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
                <p className="text-[14px] leading-7 text-[#626a67] mb-4">{s.story}</p>
                <div className="bg-[#f4f1ea] px-4 py-3 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Achievement</p>
                  <p className="text-[13px] text-[#1a2e1f]">⭐ {s.achievement}</p>
                </div>
                <div className="bg-[#f4f1ea] px-4 py-3 mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Dream</p>
                  <p className="text-[13px] italic text-[#1a2e1f]">&ldquo;{s.dream}&rdquo;</p>
                </div>
                <div className="border-t border-[#e0dbd0] pt-5">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{s.monthly}</p><p className="text-[10px] text-[#626a67]">Monthly</p></div>
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{s.yearly}</p><p className="text-[10px] text-[#626a67]">Full Year</p></div>
                  </div>
                  {sponsored.includes(s.id) ? (
                    <div className="w-full bg-[#214c34] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white">✓ Scholarship Pledged!</div>
                  ) : (
                    <Link href="/donate" onClick={() => setSponsored(prev => [...prev, s.id])}
                      className="block w-full bg-[#c9962a] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                      Sponsor {s.name.split(" ")[0]}&apos;s Scholarship →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0a1a10] px-6 py-16 text-center lg:px-20">
        <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-semibold text-white">Intelligence without opportunity<br /><em className="italic text-[#e8b84b]">is the world&apos;s greatest waste</em></h2>
        <p className="mt-4 text-lg text-white/55 max-w-lg mx-auto">Open the door. Fund a scholarship. Change a family for three generations.</p>
        <Link href="/donate" className="mt-8 inline-block bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">Fund a Scholarship</Link>
      </section>
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Academic Excellence page built${NC}"

# ── TECHNOLOGY PAGE ───────────────────────────────────────────────────────────
echo -e "${BOLD}Building Technology & Innovation page...${NC}"
cat > app/programs/talent/technology/page.tsx << 'EOF'
"use client";
import Link from "next/link";
import { useState } from "react";

const innovators = [
  { id: 1, name: "Chidi Nwosu", age: 17, country: "Nigeria", flag: "🇳🇬", field: "App Development", region: "Lagos", project: "HealthLink — a mobile app connecting rural patients to doctors via SMS", story: "Chidi built HealthLink using a borrowed laptop and a free Wi-Fi connection at a local library. The app has been used by over 800 families in rural Nigeria. He wrote every line of code himself.", impact: "800+ families served · Zero budget · Zero support", dream: "Scale HealthLink across Africa and raise Series A funding", monthly: "$55/mo", yearly: "$660/yr" },
  { id: 2, name: "Naledi Dlamini", age: 16, country: "South Africa", flag: "🇿🇦", field: "AI & Machine Learning", region: "Johannesburg", project: "CropAI — a crop disease detection system using phone camera images", story: "Naledi trained an AI model on her school's shared computer during lunch breaks. Her model can identify 12 crop diseases with 89% accuracy. Farmers in her community are already using it.", impact: "Deployed in 3 farming communities · Built entirely alone", dream: "Use AI to solve food security across Sub-Saharan Africa", monthly: "$55/mo", yearly: "$660/yr" },
  { id: 3, name: "Ahmed Mansour", age: 17, country: "Egypt", flag: "🇪🇬", field: "Clean Energy Tech", region: "Cairo", project: "SolarKit — low-cost solar panel assembly kits for homes with no electricity", story: "Ahmed designed SolarKit using recycled components sourced from Cairo's electronics markets. Each kit costs $12 to build and can power a home's basic needs. He has built 40 of them for families in his neighbourhood.", impact: "40 homes now have electricity · Costs $12 to build", dream: "Manufacture SolarKit at scale and reach 1 million homes", monthly: "$55/mo", yearly: "$660/yr" },
  { id: 4, name: "Amara Sesay", age: 15, country: "Sierra Leone", flag: "🇸🇱", field: "Web Development", region: "Freetown", project: "SchoolNet — an offline-first learning platform for schools with no internet", story: "Amara built SchoolNet after noticing that his school's internet went down every day. The platform caches all content locally and syncs when connection returns. Three schools in Freetown now use it daily.", impact: "3 schools · 400+ students · Zero internet required", dream: "Make quality education accessible to every child in Africa regardless of connectivity", monthly: "$45/mo", yearly: "$540/yr" },
];

export default function TechnologyPage() {
  const [sponsored, setSponsored] = useState<number[]>([]);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs/talent" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← Talent Hub</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Technology & Innovation · Africa</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.02] text-white">Building Africa<br /><em className="italic text-[#e8b84b]">From the Ground Up</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">These young innovators are already building products that solve real problems — with borrowed laptops, library Wi-Fi, and no support. Imagine what they could build with yours.</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2">
          {innovators.map((inn) => (
            <article key={inn.id} className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
              <div className="bg-[#0a1a10] p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-16 w-16 bg-[#214c34] flex items-center justify-center text-4xl shrink-0">{inn.flag}</div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">{inn.name}</h3>
                    <p className="text-[12px] text-[#c9962a] mt-0.5">Age {inn.age} · {inn.country}</p>
                    <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] border border-[#c9962a]/40 text-[#c9962a] px-2 py-1">{inn.field}</span>
                  </div>
                </div>
                <div className="bg-white/5 px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-2">The Project</p>
                  <p className="text-[14px] font-semibold text-white leading-snug">{inn.project}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
                <p className="text-[14px] leading-7 text-[#626a67] mb-4">{inn.story}</p>
                <div className="bg-[#0a1a10] px-4 py-3 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Real Impact — Already</p>
                  <p className="text-[13px] text-white/70">{inn.impact}</p>
                </div>
                <div className="bg-[#f4f1ea] px-4 py-3 mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9962a] mb-1">Dream</p>
                  <p className="text-[13px] italic text-[#1a2e1f]">&ldquo;{inn.dream}&rdquo;</p>
                </div>
                <div className="border-t border-[#e0dbd0] pt-5">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{inn.monthly}</p><p className="text-[10px] text-[#626a67]">Monthly</p></div>
                    <div className="flex-1 bg-[#f4f1ea] p-3 text-center"><p className="text-[11px] font-bold text-[#1a2e1f]">{inn.yearly}</p><p className="text-[10px] text-[#626a67]">Full Year</p></div>
                  </div>
                  {sponsored.includes(inn.id) ? (
                    <div className="w-full bg-[#214c34] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white">✓ Innovation Funded!</div>
                  ) : (
                    <Link href="/donate" onClick={() => setSponsored(prev => [...prev, inn.id])}
                      className="block w-full bg-[#c9962a] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                      Fund {inn.name.split(" ")[0]}&apos;s Innovation →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#214c34] px-6 py-16 text-center lg:px-20">
        <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-semibold text-white">Africa&apos;s next tech founder<br /><em className="italic text-[#e8b84b]">is building right now with nothing</em></h2>
        <p className="mt-4 text-lg text-white/55 max-w-lg mx-auto">A laptop, internet access, and a mentor can take them from a library floor to a global stage.</p>
        <Link href="/donate" className="mt-8 inline-block bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">Fund an Innovator</Link>
      </section>
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Technology & Innovation page built${NC}"

# ── HOMEPAGE FLOATING MUSIC PLAYER ────────────────────────────────────────────
echo -e "${BOLD}Adding homepage floating music player...${NC}"
cat > app/components/TalentPlayer.tsx << 'EOF'
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
EOF
echo -e "${GREEN}✓ Floating music player component built${NC}"

# ── ADD PLAYER TO LAYOUT ──────────────────────────────────────────────────────
echo -e "${BOLD}Adding music player to layout...${NC}"
python3 - << 'PYEOF'
with open('app/layout.tsx', 'r') as f:
    content = f.read()

if 'TalentPlayer' not in content:
    content = content.replace(
        'import ChatWidget from "./components/ChatWidget";',
        'import ChatWidget from "./components/ChatWidget";\nimport TalentPlayer from "./components/TalentPlayer";'
    )
    content = content.replace(
        '<ChatWidget />',
        '<ChatWidget />\n        <TalentPlayer />'
    )
    with open('app/layout.tsx', 'w') as f:
        f.write(content)
    print("TalentPlayer added to layout")
else:
    print("TalentPlayer already in layout")
PYEOF
echo -e "${GREEN}✓ Music player added to layout${NC}"

# ── UPDATE SITEMAP ────────────────────────────────────────────────────────────
echo -e "${BOLD}Updating sitemap with talent sub-pages...${NC}"
cat > app/sitemap.ts << 'EOF'
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pandiefoundation.org";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/donate`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/programs/education`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/nutrition`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/medical`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/protection`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/outreach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/talent`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/programs/talent/football`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/music`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/academic`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/technology`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
EOF
echo -e "${GREEN}✓ Sitemap updated — 19 pages indexed${NC}"

echo ""
echo -e "${GOLD}${BOLD}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GOLD}${BOLD}║      ✅  Phase 6 Complete — Africa Talent Platform!   ║${NC}"
echo -e "${GOLD}${BOLD}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Built:"
echo -e "  ✦ /programs/talent         — Pan-Africa hub with live stats"
echo -e "  ✦ /programs/talent/football — 6 player cards, filter by position/country, sponsor buttons"
echo -e "  ✦ /programs/talent/music    — 6 artist cards with BUILT-IN audio player, sponsor buttons"
echo -e "  ✦ /programs/talent/academic — 4 scholar profiles, scholarship sponsorship"
echo -e "  ✦ /programs/talent/technology — 4 innovator profiles, fund their projects"
echo -e "  ✦ Homepage floating player  — Slides up after 3s, plays talent music, rotates 3 artists"
echo -e "  ✦ Sitemap                   — 19 pages indexed"
echo ""
echo -e "${BOLD}For real audio:${NC} Add .mp3 files to /public/audio/"
echo -e "  talent-aminata.mp3  talent-kofi.mp3  talent-fatou.mp3"
echo -e "  talent-chidi.mp3    talent-amina.mp3  talent-yemi.mp3"
echo ""
echo -e "Run ${BOLD}npm run dev${NC} — visit ${BOLD}localhost:3000/programs/talent${NC}"
echo -e "Wait 3 seconds on the homepage and watch the music player appear!"
