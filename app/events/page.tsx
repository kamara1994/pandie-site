"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useT } from "../components/AutoTranslate";

function Tx({ children, className }: { children: string; className?: string }) {
  const t = useT(children);
  return <span className={className}>{t}</span>;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="transition-all duration-700 ease-out" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const events = [
  { title: "Back to School Community Outreach", date: "Aug 24, 2026", time: "10:00 AM", location: "Bo, Sierra Leone", image: "/event-featured.jpg", status: "upcoming", highlights: ["School bags & books", "Child support outreach", "Volunteer participation", "Donor opportunities"] },
  { title: "School Supplies Drive", date: "Sep 12, 2026", time: "9:00 AM", location: "Makeni, Sierra Leone", image: "/event-supplies.jpg", status: "upcoming", highlights: ["Stationery & uniforms", "Learning kits", "Community volunteers"] },
  { title: "Child Wellness & Medical Camp", date: "Oct 5, 2026", time: "8:00 AM", location: "Kenema, Sierra Leone", image: "/event-medical.jpg", status: "upcoming", highlights: ["Free health screening", "Basic medical care", "Nutrition assessment"] },
  { title: "Community Feeding Drive", date: "Nov 20, 2026", time: "11:00 AM", location: "Freetown, Sierra Leone", image: "/event-feeding.jpg", status: "upcoming", highlights: ["Hot meals served", "Nutrition packages", "Family support"] },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>On The Ground · Sierra Leone</Tx></span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">
            <Tx>Events &</Tx><br /><em className="italic text-[#e8b84b]"><Tx>Campaigns</Tx></em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65"><Tx>Every event is a direct act of care — bringing food, education, medical help, and hope to children who need it most.</Tx></p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid overflow-hidden lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[420px]">
                <Image src={events[0].image} alt={events[0].title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-flex items-center gap-2 bg-[#c9962a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] mb-4">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0a1a10]" /><Tx>Upcoming</Tx>
                  </span>
                  <h2 className="font-heading text-3xl font-semibold text-white"><Tx>{events[0].title}</Tx></h2>
                </div>
              </div>
              <div className="bg-[#214c34] p-10 flex flex-col justify-center">
                <div className="space-y-5 mb-8">
                  {[["📅", events[0].date], ["🕐", events[0].time], ["📍", events[0].location]].map(([icon, val]) => (
                    <div key={val} className="flex items-center gap-4">
                      <span className="text-xl">{icon}</span>
                      <span className="text-[15px] font-semibold text-white"><Tx>{val}</Tx></span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-4"><Tx>What to Expect</Tx></p>
                  <ul className="space-y-3">
                    {events[0].highlights.map(h => (
                      <li key={h} className="flex items-center gap-3 text-[14px] text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c9962a] shrink-0" /><Tx>{h}</Tx>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/donate" className="gold-cta mt-10 inline-flex items-center justify-center bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]">
                  <Tx>Support This Event →</Tx>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-10 bg-[#c9962a]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>All Upcoming Events</Tx></span>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(1).map((event, i) => (
              <Reveal key={event.title} delay={i * 80}>
                <article className="group overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-7">
                    <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-[#1a2e1f] leading-tight"><Tx>{event.title}</Tx></h3>
                    <div className="mt-4 space-y-2">
                      <p className="text-[13px] text-[#626a67]">📅 <Tx>{event.date}</Tx> · <Tx>{event.time}</Tx></p>
                      <p className="text-[13px] text-[#626a67]">📍 <Tx>{event.location}</Tx></p>
                    </div>
                    <Link href="/donate" className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition hover:gap-4">
                      <Tx>Support Event</Tx> <span className="text-[#c9962a]">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1a10] px-6 py-20 text-center lg:px-20">
        <Reveal>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>Get Involved</Tx></span>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,56px)] font-semibold text-white"><Tx>Want to sponsor</Tx><br /><em className="italic text-[#e8b84b]"><Tx>an event?</Tx></em></h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/55"><Tx>Partner with us and put your brand behind a mission that matters. Corporate sponsors receive recognition, reporting, and the knowledge their support reached real children.</Tx></p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="gold-cta bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]"><Tx>Become a Sponsor</Tx></Link>
            <Link href="/donate" className="border border-white/20 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-white/50"><Tx>Donate to an Event</Tx></Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
