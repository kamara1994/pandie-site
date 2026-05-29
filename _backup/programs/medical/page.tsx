"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealLine({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade"; }) {
  const { ref, visible } = useReveal();
  const hidden = direction === "up" ? "opacity-0 translate-y-8" : direction === "left" ? "opacity-0 -translate-x-10" : direction === "right" ? "opacity-0 translate-x-10" : "opacity-0 scale-[0.97]";
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function StaggeredText({ lines, baseDelay = 0, className = "" }: { lines: string[]; baseDelay?: number; className?: string; }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="space-y-2">
      {lines.map((line, i) => (
        <p key={i} className={`transition-all duration-700 ease-out ${className} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${baseDelay + i * 120}ms` }}>
          {line}
        </p>
      ))}
    </div>
  );
}

function SwingHeading({ text, className = "", baseDelay = 0, as: Tag = "h2" }: { text: string; className?: string; baseDelay?: number; as?: "h1" | "h2" | "h3"; }) {
  const { ref, visible } = useReveal();
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`${className} flex flex-wrap gap-x-3 gap-y-1`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className={`inline-block transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-6 rotate-3"}`} style={{ transitionDelay: `${baseDelay + i * 80}ms` }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}

export default function MedicalPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      <section className="bg-[#0f1f17] px-5 py-20 text-white sm:py-28 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1100px]">
          <RevealLine direction="fade">
            <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f0c857] transition hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              All Programs
            </Link>
          </RevealLine>
          <div className="mt-6">
            <SwingHeading as="h1" text="Medical Assistance" className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl" baseDelay={100} />
          </div>
          <StaggeredText baseDelay={400} className="mt-1 text-lg leading-9 text-white/80 max-w-2xl" lines={["No child should suffer from a preventable illness.", "Every child deserves access to the care that saves lives."]} />
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <RevealLine direction="left">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">The Problem</p>
              </RevealLine>
              <div className="mt-3">
                <SwingHeading text="Children Are Suffering From Treatable Conditions" className="text-3xl font-semibold text-[#214c34] sm:text-4xl" baseDelay={100} />
              </div>
              <StaggeredText baseDelay={300} className="mt-3 text-[17px] leading-8 text-[#5f6663]" lines={[
                "Across Sierra Leone, children suffer from illnesses that are entirely preventable.",
                "Malaria, infections, malnutrition-related complications —",
                "conditions that could be treated with basic medicine and care.",
                "But when families cannot afford treatment, children suffer in silence.",
                "Some lose their lives. Others lose years of school and development.",
                "This should not happen. With the right support, it does not have to.",
              ]} />

              <div className="mt-10">
                <RevealLine direction="left" delay={200}>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">What We Provide</p>
                </RevealLine>
                <div className="mt-5 grid gap-3">
                  {[
                    "Basic medical treatment funding",
                    "Access to clinics and healthcare facilities",
                    "Medicine and prescription support",
                    "Routine health checkups for enrolled children",
                    "Emergency medical assistance",
                    "Health education for families and caregivers",
                  ].map((item, i) => (
                    <RevealLine key={item} delay={i * 80} direction="left">
                      <div className="flex items-center gap-3 rounded-xl border border-[#e7dfd0] bg-white px-4 py-3">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-[#d4a017]" />
                        <p className="text-[15px] text-[#214c34]">{item}</p>
                      </div>
                    </RevealLine>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <RevealLine direction="right">
                <div className="rounded-2xl bg-[#214c34] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">Why It Matters</p>
                  <StaggeredText baseDelay={100} className="mt-3 text-[16px] leading-8 text-white/85" lines={[
                    "A sick child cannot learn. A child in pain cannot dream.",
                    "When we provide medical support, we do more than treat illness —",
                    "we restore the possibility of a normal, healthy childhood.",
                    "Health is not a luxury. It is the foundation of everything.",
                  ]} />
                </div>
              </RevealLine>

              <RevealLine direction="right" delay={200}>
                <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">A Child's Story</p>
                  <SwingHeading text="She Had a Fever for Two Weeks. We Got Her Help." className="mt-3 text-xl font-semibold text-[#214c34]" baseDelay={100} />
                  <StaggeredText baseDelay={200} className="mt-3 text-[15px] leading-7 text-[#626a67]" lines={[
                    "Fatmata was seven years old when she fell ill with malaria.",
                    "Her family had no money for treatment and watched helplessly",
                    "as her condition worsened over two weeks.",
                    "Pandie Foundation stepped in, covered her treatment,",
                    "and within weeks Fatmata was back in school — healthy, happy, and smiling.",
                  ]} />
                </div>
              </RevealLine>

              <RevealLine direction="right" delay={300}>
                <div className="rounded-2xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">Our Goal</p>
                  <p className="mt-3 text-[16px] leading-8 text-[#5f6663]">
                    To ensure that no child in Sierra Leone loses their life or their future to an illness that could have been prevented or treated with basic care and medicine.
                  </p>
                </div>
              </RevealLine>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#214c34] p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-14">
          <RevealLine direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">Support Medical Care</p>
          </RevealLine>
          <div className="mt-4 flex justify-center">
            <SwingHeading text="Give a Child the Gift of Health" className="text-3xl font-semibold text-white sm:text-4xl" baseDelay={100} />
          </div>
          <StaggeredText baseDelay={400} className="mt-4 text-lg leading-9 text-white/80 max-w-xl mx-auto" lines={[
            "Your donation can fund medicine, treatment, and checkups",
            "that give children a healthy chance at life.",
          ]} />
          <RevealLine delay={700} direction="up">
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/donate" className="inline-flex items-center justify-center rounded-xl bg-[#d4a017] px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90">
                Donate Now
              </Link>
              <Link href="/programs" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
                View All Programs
              </Link>
            </div>
          </RevealLine>
        </div>
      </section>
    </main>
  );
}