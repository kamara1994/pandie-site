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
