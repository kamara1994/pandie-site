"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Animation Hooks ───────────────────────────────────────────────────────────
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

function RevealLine({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade";
}) {
  const { ref, visible } = useReveal();
  const hidden = direction === "up" ? "opacity-0 translate-y-8" : direction === "left" ? "opacity-0 -translate-x-10" : direction === "right" ? "opacity-0 translate-x-10" : "opacity-0 scale-[0.97]";
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function StaggeredText({ lines, baseDelay = 0, className = "" }: {
  lines: string[]; baseDelay?: number; className?: string;
}) {
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

function SwingHeading({ text, className = "", baseDelay = 0, as: Tag = "h2" }: {
  text: string; className?: string; baseDelay?: number; as?: "h1" | "h2" | "h3";
}) {
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

// ── Counter Animation ─────────────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number; }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">

      {/* ── Hero Banner ── */}
      <section className="bg-[#0f1f17] px-5 py-20 text-white sm:py-28 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1100px]">
          <RevealLine direction="fade">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">About Pandie Foundation</p>
          </RevealLine>
          <div className="mt-5">
            <SwingHeading as="h1" text="The Mother of All" className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl" baseDelay={100} />
          </div>
          <StaggeredText baseDelay={400} className="mt-1 text-lg leading-9 text-white/80 sm:text-xl max-w-2xl" lines={[
            "A humanitarian nonprofit dedicated to protecting and uplifting",
            "vulnerable children in Sierra Leone through education, nutrition,",
            "medical assistance, and compassionate care.",
          ]} />
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <section className="px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-[#214c34] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-12">
            <div className="text-center">
              <RevealLine direction="up">
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">Our Impact</p>
              </RevealLine>
              <div className="mt-3 flex justify-center">
                <SwingHeading text="Every Number Is a Child Whose Life Changed" className="text-3xl font-semibold text-white sm:text-4xl max-w-2xl" baseDelay={100} />
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { target: 500, suffix: "+", label: "Children Supported", desc: "and counting" },
                { target: 6, suffix: "", label: "Active Programs", desc: "across Sierra Leone" },
                { target: 2, suffix: "", label: "Countries Reached", desc: "USA & Sierra Leone" },
                { target: 100, suffix: "%", label: "Donation Transparency", desc: "every cent accounted for" },
              ].map((stat, i) => (
                <RevealLine key={stat.label} delay={i * 120} direction="up">
                  <div className="rounded-xl bg-white/10 p-6 text-center ring-1 ring-white/10">
                    <p className="text-5xl font-bold text-[#f0c857]">
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">{stat.label}</p>
                    <p className="mt-1 text-sm text-white/60">{stat.desc}</p>
                  </div>
                </RevealLine>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Opening Quote ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[900px] text-center">
          <StaggeredText baseDelay={0} className="text-2xl font-semibold leading-10 text-[#214c34] sm:text-3xl sm:leading-[1.6]" lines={[
            '"Our mission is simple but urgent:',
            "to ensure that no child is denied the chance to grow, learn, and thrive",
            'simply because they were born into hardship."',
          ]} />
          <RevealLine delay={500} direction="fade">
            <p className="mt-6 text-lg leading-8 text-[#5f6663]">
              This is the conviction that gave birth to Pandie Foundation — and the promise that drives everything we do.
            </p>
          </RevealLine>
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

              {/* Founder Photo */}
              <div className="relative min-h-[380px] bg-[#0f1f17] lg:min-h-[500px]">
                <Image
                  src="/founder02.jpg"
                  alt="Joseph Allan Kamara — Founder of Pandie Foundation"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f17]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <RevealLine direction="up">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">Foundation Founder</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Joseph Allan Kamara</p>
                    <p className="mt-1 text-sm text-white/70">Founder & Executive Director</p>
                    <p className="mt-1 text-sm text-white/60">Sierra Leone — United States</p>
                  </RevealLine>
                </div>
              </div>

              {/* Founder Story */}
              <div className="px-8 py-12 sm:px-10 lg:px-12 lg:py-14">
                <RevealLine direction="right">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">A Message From the Founder</p>
                </RevealLine>
                <div className="mt-4">
                  <SwingHeading text="I Started This Foundation Because I Witnessed the Suffering Firsthand" className="text-2xl font-semibold text-[#214c34] sm:text-3xl" baseDelay={100} />
                </div>

                <StaggeredText baseDelay={300} className="mt-5 text-[17px] leading-9 text-[#5f6663]" lines={[
                  "Growing up in Sierra Leone, I saw children full of intelligence, creativity,",
                  "and dreams — who had no path forward simply because of poverty.",
                  "I saw families who loved their children deeply",
                  "but could not afford school fees, medicine, or even food.",
                  "I carried those faces with me as I built my life.",
                ]} />

                <StaggeredText baseDelay={900} className="mt-3 text-[17px] leading-9 text-[#5f6663]" lines={[
                  "When I established Pandie Foundation, I named it after my mother,",
                  "Pandie Grace Bangura — a woman who gave everything she had",
                  "to anyone who needed it, often before she took care of herself.",
                  "She taught me that compassion has no limits,",
                  "and that a mother's love should extend to every child who needs it.",
                ]} />

                <StaggeredText baseDelay={1400} className="mt-3 text-[17px] leading-9 text-[#5f6663]" lines={[
                  "This foundation is my promise to her — and to every child in Sierra Leone",
                  "who deserves the same chance I was given.",
                  "I am grateful to every donor, volunteer, and partner",
                  "who has chosen to stand with us in this mission.",
                ]} />

                <RevealLine delay={1800} direction="up">
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e7dfd0]" />
                    <p className="text-sm font-bold italic text-[#d4a017]">Joseph Allan Kamara</p>
                    <p className="text-sm text-[#8b8f8c]">— Founder & Executive Director</p>
                    <div className="h-px flex-1 bg-[#e7dfd0]" />
                  </div>
                </RevealLine>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mother's Story ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="overflow-hidden rounded-2xl bg-[#214c34] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[360px] lg:min-h-[520px]">
                <Image src="/pandie-grace.jpg" alt="Pandie Grace Bangura" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#214c34]/90 via-[#214c34]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <RevealLine direction="up">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">In Loving Memory</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Pandie Grace Bangura</p>
                    <p className="mt-1 text-sm text-white/70">The heart and soul behind this foundation</p>
                  </RevealLine>
                </div>
              </div>

              <div className="px-8 py-12 text-white sm:px-10 lg:px-12 lg:py-14">
                <RevealLine direction="right">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">The Name Behind the Foundation</p>
                </RevealLine>
                <div className="mt-4">
                  <SwingHeading text="A Son's Tribute to His Mother's Endless Love" className="text-3xl font-semibold text-white sm:text-4xl" baseDelay={100} />
                </div>

                <StaggeredText baseDelay={200} className="text-[17px] leading-9 text-white/85" lines={[
                  "Pandie Grace Bangura was not just a mother to her own children.",
                  "She was a mother to everyone around her.",
                  "In a community where many had little, she gave freely —",
                  "her time, her food, her warmth, her tears.",
                  "She saw a hungry child and fed them.",
                  "She never asked what she would receive in return.",
                ]} />

                <StaggeredText baseDelay={900} className="mt-3 text-[17px] leading-9 text-white/85" lines={[
                  "Her legacy of nurturing and generosity inspired the name Pandie,",
                  'meaning "The Mother of All."',
                  "This foundation is not just a tribute. It is a promise —",
                  "to live the compassion she modeled every single day,",
                  "and to extend her love to every child who needs it.",
                ]} />

                <RevealLine delay={1500} direction="up">
                  <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-5">
                    <p className="text-base italic leading-8 text-white/80">
                      "She believed that every child mattered — not just her own — and that true kindness is measured by how we care for those who have the least."
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#f0c857]">— Joseph Allan Kamara, Founder</p>
                  </div>
                </RevealLine>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-12">
            <div className="text-center">
              <RevealLine direction="up">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">Our Journey</p>
              </RevealLine>
              <div className="mt-3 flex justify-center">
                <SwingHeading text="From a Dream to a Movement" className="text-3xl font-semibold text-[#214c34] sm:text-4xl" baseDelay={100} />
              </div>
            </div>

            <div className="relative mt-12">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-0 h-full w-0.5 bg-[#e7dfd0] lg:left-1/2 lg:-translate-x-0.5" />

              <div className="space-y-10">
                {[
                  { year: "The Beginning", title: "A Vision Is Born", desc: "Joseph Allan Kamara, a native of Sierra Leone, witnesses the struggles of vulnerable children and carries a deep conviction that something must be done.", side: "left" },
                  { year: "The Inspiration", title: "Named After a Mother", desc: "The foundation is named in loving honor of Pandie Grace Bangura — a woman whose selfless love and compassion for others became the soul of this mission.", side: "right" },
                  { year: "The Foundation", title: "Pandie Foundation Is Established", desc: "Pandie Foundation is officially established as a humanitarian nonprofit dedicated to supporting vulnerable children in Sierra Leone through education, nutrition, and medical care.", side: "left" },
                  { year: "The Programs", title: "Six Core Programs Launched", desc: "Education Support, Nutrition Support, Medical Assistance, Child Protection, Child Sponsorship, and Community Outreach programs are developed and activated.", side: "right" },
                  { year: "The Future", title: "Growing Toward Greater Impact", desc: "With the support of donors, volunteers, and partners around the world, Pandie Foundation is expanding its reach and building toward a future where no child is left behind.", side: "left" },
                ].map((item, i) => (
                  <div key={item.year} className={`relative flex gap-6 lg:gap-0 ${item.side === "right" ? "lg:flex-row-reverse" : ""}`}>
                    {/* Dot */}
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#214c34] ring-4 ring-[#f4f1ea] lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                      <div className="h-3 w-3 rounded-full bg-[#f0c857]" />
                    </div>

                    {/* Content */}
                    <RevealLine delay={i * 120} direction={item.side === "left" ? "left" : "right"}>
                      <div className={`flex-1 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6 lg:w-[calc(50%-2.5rem)] ${item.side === "right" ? "lg:mr-auto" : "lg:ml-auto"}`}>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d4a017]">{item.year}</p>
                        <h3 className="mt-2 text-lg font-semibold text-[#214c34]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#626a67]">{item.desc}</p>
                      </div>
                    </RevealLine>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Reality ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-12">
            <RevealLine direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">The Reality We Face</p>
            </RevealLine>
            <div className="mt-3">
              <SwingHeading text="Behind Every Statistic Is a Child With a Name" className="text-3xl font-semibold text-[#214c34] sm:text-4xl" baseDelay={100} />
            </div>
            <StaggeredText baseDelay={300} className="mt-3 text-[17px] leading-8 text-[#5f6663] max-w-3xl" lines={[
              "In many communities across Sierra Leone, children face challenges",
              "that threaten their future from the very beginning.",
              "These are not distant problems — they are happening right now,",
              "to real children with real dreams.",
            ]} />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { emoji: "📚", title: "A Child Who Wants to Learn", lines: ["She wakes before sunrise and walks miles to school,", "only to sit in a classroom with no textbooks,", "with no guarantee she can return tomorrow", "if her family cannot pay the fees."], delay: 0 },
                { emoji: "🍽️", title: "A Child Who Goes to Bed Hungry", lines: ["He is nine years old and already knows", "what it feels like to concentrate through hunger.", "Some days, the only thing between him and an empty stomach", "is a single cup of rice."], delay: 200 },
                { emoji: "💊", title: "A Child Who Needs Medical Care", lines: ["She has had a fever for a week.", "Her mother knows what to do but cannot afford the medicine.", "She prays and watches and waits —", "because the alternative is unthinkable."], delay: 400 },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
                  <RevealLine delay={item.delay} direction="up">
                    <p className="text-4xl">{item.emoji}</p>
                    <h3 className="mt-4 text-lg font-semibold text-[#214c34]">{item.title}</h3>
                  </RevealLine>
                  <div className="mt-3">
                    <StaggeredText baseDelay={item.delay + 200} className="text-sm leading-7 text-[#626a67]" lines={item.lines} />
                  </div>
                </div>
              ))}
            </div>

            <RevealLine delay={600} direction="up">
              <div className="mt-8 rounded-xl bg-[#214c34] p-6 text-white">
                <StaggeredText baseDelay={700} className="text-[17px] leading-8 text-white/90" lines={[
                  "These are not distant statistics. These are real children with real dreams.",
                  "Their futures hang on whether someone — somewhere — chooses to care.",
                  "Pandie Foundation exists to be that someone.",
                ]} />
              </div>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 md:grid-cols-2">
            <RevealLine direction="left">
              <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#214c34]">
                  <svg className="h-6 w-6 text-[#f0c857]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <SwingHeading text="Our Mission" className="mt-5 text-2xl font-semibold text-[#214c34]" baseDelay={100} />
                <StaggeredText baseDelay={200} className="mt-3 text-[16px] leading-8 text-[#5f6663]" lines={[
                  "To ensure that no child is denied the chance to grow, learn,",
                  "and thrive simply because they were born into hardship.",
                  "We provide education, nutrition, medical care, and protection —",
                  "treating every child as if they were our own.",
                ]} />
              </div>
            </RevealLine>

            <RevealLine direction="right">
              <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a017]">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <SwingHeading text="Our Vision" className="mt-5 text-2xl font-semibold text-[#214c34]" baseDelay={100} />
                <StaggeredText baseDelay={200} className="mt-3 text-[16px] leading-8 text-[#5f6663]" lines={[
                  "A Sierra Leone — and ultimately an Africa —",
                  "where no child is forgotten, no child is forced to give up on education,",
                  "and every child grows up knowing that their life matters",
                  "and their future is worth fighting for.",
                ]} />
              </div>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-12">
            <RevealLine direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">What We Do</p>
            </RevealLine>
            <div className="mt-3 max-w-2xl">
              <SwingHeading text="Six Ways We Change a Child's Future" className="text-3xl font-semibold text-[#214c34] sm:text-4xl" baseDelay={100} />
            </div>
            <StaggeredText baseDelay={300} className="mt-3 text-[17px] leading-8 text-[#5f6663]" lines={[
              "We focus on the essential needs that allow a child not only to survive but to flourish.",
              "Every program we design is guided by one principle: treat each child as if they were our own.",
            ]} />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Education Support", desc: "School fees, supplies, uniforms, and materials so no child misses out on learning.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", delay: 0 },
                { title: "Nutrition & Food", desc: "Nutritious meals and food assistance so hunger never stands between a child and their future.", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", delay: 100 },
                { title: "Medical Care", desc: "Healthcare and medical support for children suffering from preventable and treatable conditions.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", delay: 200 },
                { title: "Child Protection", desc: "Advocacy, safety, and dignity programs for children at risk of neglect and exploitation.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", delay: 300 },
                { title: "Child Sponsorship", desc: "Long-term individual sponsorship connecting generous donors directly with a child's journey.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", delay: 400 },
                { title: "Community Outreach", desc: "Working hand in hand with families, local leaders, and schools to create lasting change.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", delay: 500 },
              ].map((item) => (
                <RevealLine key={item.title} delay={item.delay} direction="up">
                  <div className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6 h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#214c34]">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#214c34]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#626a67]">{item.desc}</p>
                  </div>
                </RevealLine>
              ))}
            </div>

            <RevealLine delay={600} direction="up">
              <div className="mt-8 text-center">
                <Link href="/programs" className="inline-flex items-center gap-2 rounded-xl bg-[#214c34] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d4a017] hover:text-[#173325]">
                  Explore All Programs
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 text-center">
            <RevealLine direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">Our Values</p>
            </RevealLine>
            <div className="mt-3 flex justify-center">
              <SwingHeading text="What Guides Everything We Do" className="text-3xl font-semibold text-[#214c34] sm:text-4xl" baseDelay={100} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Integrity", desc: "Transparent and accountable in everything — every resource used responsibly and with purpose.", delay: 0 },
              { title: "Compassion", desc: "Every decision made with the wellbeing of children and families placed at the very center.", delay: 100 },
              { title: "Respect", desc: "Honoring the dignity of every child, every family, and every community we are privileged to serve.", delay: 200 },
              { title: "Impact", desc: "Committed to sustainable, lasting change — not just temporary relief, but transformed futures.", delay: 300 },
            ].map((v) => (
              <RevealLine key={v.title} delay={v.delay} direction="up">
                <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full">
                  <h3 className="text-lg font-semibold text-[#214c34]">{v.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#626a67]">{v.desc}</p>
                </div>
              </RevealLine>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emotional CTA ── */}
      <section className="px-5 pb-20 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-[#214c34] p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-14">
            <RevealLine direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">Will You Answer the Call?</p>
            </RevealLine>
            <div className="mt-5 flex justify-center">
              <SwingHeading text="Somewhere in Sierra Leone Tonight, a Child Is Waiting for Hope" className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl max-w-3xl" baseDelay={100} />
            </div>
            <StaggeredText baseDelay={600} className="mt-4 text-lg leading-9 text-white/80 max-w-2xl mx-auto" lines={[
              "Supporters, partners, and donors become part of a global family",
              "committed to protecting children and restoring hope where it has been lost.",
              "Each contribution helps provide school materials, meals, medical treatment,",
              "and a safe environment for children to grow with confidence and dignity.",
            ]} />
            <StaggeredText baseDelay={1100} className="mt-3 text-lg leading-9 text-white/80 max-w-xl mx-auto" lines={[
              "When you support Pandie Foundation, you are not just giving money.",
              "You are stepping into the role that Pandie Grace Bangura",
              "embodied every single day of her beautiful life —",
              "a protector, a provider, and an unshakeable source of hope.",
            ]} />
            <RevealLine delay={1600} direction="up">
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/donate" className="inline-flex items-center justify-center rounded-xl bg-[#d4a017] px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90">
                  Donate Now — Change a Life
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
                  Get Involved
                </Link>
              </div>
            </RevealLine>
            <RevealLine delay={1900} direction="fade">
              <p className="mt-10 text-sm italic text-white/50">
                "Pandie Foundation — The Mother of All — stands for compassion without boundaries and hope without limits."
              </p>
            </RevealLine>
          </div>
        </div>
      </section>

    </main>
  );
}