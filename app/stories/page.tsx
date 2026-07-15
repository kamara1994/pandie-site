"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "../components/AutoTranslate";

function Tx({ children, className }: { children: string; className?: string }) {
  const t = useT(children);
  return <span className={className}>{t}</span>;
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up"|"left"|"right"|"fade" }) {
  const { ref, visible } = useReveal();
  const hidden = direction === "up" ? "opacity-0 translate-y-8" : direction === "left" ? "opacity-0 -translate-x-10" : direction === "right" ? "opacity-0 translate-x-10" : "opacity-0 scale-[0.98]";
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const stories = [
  { name: "Aminata", age: "10", location: "Bo", program: "Education", image: "/story-featured.jpg", quote: "I want to become a teacher one day.", story: "Aminata loved school but her mother couldn't afford supplies. With Pandie's support she received books, uniforms, and renewed confidence to keep going.", color: "#214c34" },
  { name: "Musa", age: "9", location: "Makeni", program: "Nutrition", image: "/story-nutrition.jpg", quote: "Now I can think clearly in class.", story: "Musa came to school hungry every day. The feeding program gave him daily meals and transformed his ability to concentrate and learn.", color: "#c9962a" },
  { name: "Hawa", age: "11", location: "Kenema", program: "Education", image: "/story-education.jpg", quote: "I raised my hand in class for the first time.", story: "Hawa was determined but lacked materials. Books, supplies, and encouragement from Pandie gave her the confidence to participate fully.", color: "#214c34" },
  { name: "Mariama", age: "8", location: "Freetown", program: "Medical", image: "/service-medical.jpg", quote: "I feel strong again.", story: "A preventable illness kept Mariama home for weeks. Medical assistance through Pandie got her treated and back in the classroom.", color: "#c9962a" },
  { name: "Ibrahim", age: "12", location: "Bo", program: "Protection", image: "/story-protection.jpg", quote: "Someone believed in me.", story: "Ibrahim faced neglect at home. The protection program gave him safety, support, and adults who showed up consistently for him.", color: "#214c34" },
  { name: "Kadiatu", age: "7", location: "Makeni", program: "Essentials", image: "/story-essentials.jpg", quote: "I have what I need now.", story: "Basic supplies — a school bag, pencils, a uniform — changed how Kadiatu felt walking into school every single morning.", color: "#c9962a" },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white sm:py-32 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>Real Children · Real Change</Tx></span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">
            <Tx>Behind Every Number</Tx><br /><em className="italic text-[#e8b84b]"><Tx>Is a Name</Tx></em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            <Tx>These are not statistics. These are children with names, voices, dreams — and futures that changed because someone chose to care.</Tx>
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up">
            <div className="grid overflow-hidden lg:grid-cols-2">
              <div className="relative min-h-[420px] bg-[#0a1a10]">
                <Image src="/story-featured.jpg" alt="Aminata" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1a10]/60" />
                <div className="absolute bottom-8 left-8">
                  <span className="inline-block bg-[#c9962a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]"><Tx>Featured Story</Tx></span>
                </div>
              </div>
              <div className="bg-[#0a1a10] p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]"><Tx>Education · Bo, Sierra Leone</Tx></span>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white lg:text-4xl">
                  <Tx>Aminata — Age 10</Tx><br /><em className="italic text-[#e8b84b]"><Tx>"I want to become a teacher one day."</Tx></em>
                </h2>
                <p className="mt-6 text-[16px] leading-8 text-white/65">
                  <Tx>Aminata loved school, but her mother struggled to afford books, supplies, and basic daily needs. Some days she went to class worried she might have to stop. Through Pandie Foundation, she received school supplies, support, and the confidence to keep going. Today she sits in class with renewed hope — and a dream.</Tx>
                </p>
                <Link href="/donate" className="gold-cta mt-8 inline-flex w-fit items-center gap-3 bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]">
                  <Tx>Support a Child Like Aminata →</Tx>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-10 bg-[#c9962a]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>More Stories</Tx></span>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.name} delay={i * 80} direction="up">
                <article className="group flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                  <div className="relative h-56 overflow-hidden bg-[#d4d8da]">
                    <Image src={s.image} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ background: s.color, color: s.color === "#c9962a" ? "#0a1a10" : "white" }}><Tx>{s.program}</Tx></span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="h-[2px] w-8 bg-[#c9962a] mb-4 transition-all duration-500 group-hover:w-14" />
                    <h3 className="font-heading text-xl font-semibold text-[#1a2e1f]">{s.name}, <Tx>Age</Tx> {s.age} · {s.location}</h3>
                    <p className="mt-2 font-heading text-base italic text-[#c9962a]">"<Tx>{s.quote}</Tx>"</p>
                    <p className="mt-4 flex-1 text-[14px] leading-7 text-[#626a67]"><Tx>{s.story}</Tx></p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#214c34] px-6 py-20 text-center lg:px-20">
        <Reveal direction="up">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>Be Part of the Story</Tx></span>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,58px)] font-semibold text-white"><Tx>Every story starts with</Tx><br /><em className="italic text-[#e8b84b]"><Tx>someone who cared</Tx></em></h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65"><Tx>Your donation writes the next chapter for a child in Sierra Leone.</Tx></p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="gold-cta bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]"><Tx>Donate Now</Tx></Link>
            <Link href="/donate" className="border border-white/30 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-white/60"><Tx>Sponsor a Child</Tx></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
