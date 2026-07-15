"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

const images = ["/service-education.jpg","/service-nutrition.jpg","/service-medical.jpg","/service-protection.jpg","/story-featured.jpg","/story-community.jpg"];
const hrefs  = ["/programs/education","/programs/nutrition","/programs/medical","/programs/protection","/programs/sponsorship","/programs/outreach"];
const nums   = ["01","02","03","04","05","06"];
const stats  = ["300+","200+","150+","100%","1:1","∞"];

export default function ProgramsPage() {
  const { t } = useLang();
  const p = t.programs;

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">{p.badge}</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">{p.heading1}<br /><em className="italic text-[#e8b84b]">{p.heading2}</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">{p.body}</p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.p.map((prog, idx) => (
            <article key={idx} className="group flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative h-56 overflow-hidden bg-[#d4d8da]">
                <Image src={images[idx]} alt={prog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0a1a10]/80 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">{p.exploreProgram}</span>
                  <span className="text-2xl text-[#c9962a]">→</span>
                </div>
                <div className="absolute right-4 top-4 font-heading text-5xl font-semibold leading-none text-white/15">{nums[idx]}</div>
                <div className="absolute bottom-4 left-4 bg-[#c9962a] px-3 py-1.5 flex flex-col">
                  <span className="text-lg font-bold leading-none text-[#0a1a10]">{stats[idx]}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0a1a10]/70">{prog.statLabel}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4 transition-all duration-500 group-hover:w-14" />
                <h3 className="font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">{prog.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#626a67]">{prog.desc}</p>
                <Link href={hrefs[idx]} className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition hover:gap-4">
                  {p.exploreProgram} <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Link href="/programs/talent" className="group block overflow-hidden bg-[#0a1a10] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden">
                <Image src="/laugingchildren.png" alt="Talent and Mentorship" fill className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1a10]/80" />
                <div className="absolute top-6 left-6">
                  <span className="inline-block bg-[#c9962a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]">{p.talent7new}</span>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5"><div className="h-px w-8 bg-[#c9962a]" /><span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">{p.talent7label}</span></div>
                <h3 className="font-heading text-[clamp(28px,4vw,48px)] font-semibold text-white leading-tight">
                  {p.talent7heading1}<br /><em className="italic text-[#e8b84b]">{p.talent7heading2}</em>
                </h3>
                <p className="mt-6 text-[16px] leading-8 text-white/55">{p.talent7body}</p>
                <div className="mt-8 flex flex-wrap gap-6">
                  {[["⚽","Football"],["🎵","Music"],["🎓","Academic"],["💻","Technology"]].map(([icon,label])=>(
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] transition-all duration-300 group-hover:gap-5">
                  {p.exploreTalent}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-center lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9962a]/[0.07] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />{p.ctaBadge}<span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-5 font-heading text-[clamp(36px,4vw,58px)] font-semibold text-white">
            {p.ctaHeading1}<br /><em className="italic text-[#e8b84b]">{p.ctaHeading2}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-white/55">{p.ctaBody}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="gold-cta bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.5)]">{p.ctaDonate}</Link>
            <Link href="/programs/talent" className="border border-white/20 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white">{p.ctaTalent}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
