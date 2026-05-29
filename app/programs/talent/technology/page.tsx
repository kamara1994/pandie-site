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
