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
