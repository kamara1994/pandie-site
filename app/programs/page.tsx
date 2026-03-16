"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function RevealLine({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}) {
  const { ref, visible } = useReveal();
  const hidden =
    direction === "up"
      ? "opacity-0 translate-y-8"
      : direction === "left"
        ? "opacity-0 -translate-x-10"
        : direction === "right"
          ? "opacity-0 translate-x-10"
          : "opacity-0 scale-[0.97]";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StaggeredText({
  lines,
  baseDelay = 0,
  className = "",
}: {
  lines: string[];
  baseDelay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="space-y-1">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`transition-all duration-700 ease-out ${className} ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${baseDelay + i * 120}ms` }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function SwingHeading({
  text,
  className = "",
  baseDelay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const { ref, visible } = useReveal();
  const words = text.split(" ");
  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`${className} flex flex-wrap gap-x-3 gap-y-1`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-500 ease-out ${
            visible
              ? "opacity-100 translate-y-0 rotate-0"
              : "opacity-0 translate-y-6 rotate-3"
          }`}
          style={{ transitionDelay: `${baseDelay + i * 80}ms` }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}

const programs = [
  {
    id: "education",
    image: "/service-education.jpg",
    title: "Education Support",
    tagline: "Every child deserves a seat in a classroom.",
    description:
      "Helping vulnerable children stay in school through school fees, supplies, uniforms, learning materials, encouragement, and practical academic support. When a child has the tools to learn, their entire future changes.",
    impact: "School fees covered, books provided, uniforms supplied.",
    color: "#214c34",
  },
  {
    id: "nutrition",
    image: "/service-nutrition.jpg",
    title: "Nutrition Support",
    tagline: "A fed child is a child who can learn.",
    description:
      "Providing food assistance and child-centered nutrition support for children facing hunger and malnutrition. Hunger robs children of focus, energy, and hope. We make sure no child has to choose between eating and learning.",
    impact: "Daily meals provided, malnutrition addressed.",
    color: "#d4a017",
  },
  {
    id: "medical",
    image: "/service-medical.jpg",
    title: "Medical Assistance",
    tagline: "No child should suffer from a preventable illness.",
    description:
      "Helping children access basic medical care, treatment, and urgent health support when families cannot afford it. From routine checkups to emergency treatment, we ensure every child gets the care they deserve.",
    impact: "Medical treatments funded, health checks conducted.",
    color: "#214c34",
  },
  {
    id: "protection",
    image: "/service-protection.jpg",
    title: "Child Protection",
    tagline: "Every child deserves to feel safe.",
    description:
      "Standing with vulnerable children through care, advocacy, and support that restores dignity, safety, and hope. We work with families and communities to ensure children are protected from neglect, abuse, and exploitation.",
    impact: "Children protected, families supported.",
    color: "#d4a017",
  },
  {
    id: "sponsorship",
    image: "/service-sponsorship.jpg",
    title: "Child Sponsorship",
    tagline: "One donor. One child. One transformed future.",
    description:
      "Our sponsorship program connects compassionate donors directly with a child's journey. Through monthly or full sponsorship, you personally support one child's education, nutrition, and wellbeing — and watch them grow.",
    impact: "Children sponsored, futures secured.",
    color: "#214c34",
  },
  {
    id: "outreach",
    image: "/service-outreach.jpg",
    title: "Community Outreach",
    tagline: "Change starts from within the community.",
    description:
      "Working hand in hand with parents, local leaders, schools, and community groups to create sustainable change. We don't just help children — we strengthen the families and communities that surround them.",
    impact: "Communities strengthened, families empowered.",
    color: "#d4a017",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">

      {/* ── Hero Banner ── */}
      <section className="bg-[#0f1f17] px-5 py-20 text-white sm:py-28 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1100px]">
          <RevealLine direction="fade">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">
              Pandie Foundation
            </p>
          </RevealLine>
          <div className="mt-5">
            <SwingHeading
              as="h1"
              text="Our Programs"
              className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
              baseDelay={100}
            />
          </div>
          <StaggeredText
            baseDelay={400}
            className="mt-1 text-lg leading-9 text-white/80 sm:text-xl max-w-2xl"
            lines={[
              "We serve vulnerable children in Sierra Leone through education,",
              "nutrition, medical care, and compassionate protection",
              "designed to restore dignity and build lasting hope.",
            ]}
          />
        </div>
      </section>

      {/* ── Program Cards ── */}
      <section className="px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <RevealLine direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                What We Do
              </p>
            </RevealLine>
            <div className="mt-4 flex justify-center">
              <SwingHeading
                text="Six Programs. One Mission."
                className="text-3xl font-semibold text-[#214c34] sm:text-4xl"
                baseDelay={100}
              />
            </div>
            <RevealLine delay={400} direction="fade">
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#5f6663]">
                Every program we build is guided by one principle: treat each
                child as if they were our own.
              </p>
            </RevealLine>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {programs.slice(0, 4).map((program, i) => (
              <RevealLine key={program.id} delay={i * 100} direction="up">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-[#e7dfd0]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {/* Gold accent bar */}
                    <div className="absolute bottom-0 left-0 h-1 w-12 bg-[#d4a017]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-[#214c34]">
                      {program.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[#626a67]">
                      {program.description}
                    </p>
                    <Link
                      href={`/programs/${program.id}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#214c34] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d4a017] hover:text-[#173325]"
                    >
                      Explore Program
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </RevealLine>
            ))}
          </div>

          {/* Bottom two programs */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {programs.slice(4).map((program, i) => (
              <RevealLine key={program.id} delay={i * 150} direction="up">
                <div className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  {/* Image */}
                  <div className="relative w-[200px] shrink-0 overflow-hidden bg-[#e7dfd0] sm:w-[240px]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 h-full w-1 bg-[#d4a017]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d4a017]">
                      {program.tagline}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#214c34]">
                      {program.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[#626a67]">
                      {program.description}
                    </p>
                    <Link
                      href={`/programs/${program.id}`}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-[#214c34] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d4a017] hover:text-[#173325]"
                    >
                      Explore Program
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </RevealLine>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Program ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] lg:grid-cols-2">

            {/* Left image */}
            <div className="relative min-h-[300px] lg:min-h-[420px]">
              <Image
                src="/laugingchildren.png"
                alt="Children supported by Pandie Foundation"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Right content */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-10 lg:px-12 lg:py-14">
              <RevealLine direction="right">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                  Featured Program
                </p>
              </RevealLine>
              <div className="mt-4">
                <SwingHeading
                  text="Pandie Child Support Program"
                  className="text-3xl font-semibold text-[#214c34] sm:text-4xl"
                  baseDelay={100}
                />
              </div>
              <StaggeredText
                baseDelay={300}
                className="mt-2 text-[16px] leading-8 text-[#5f6663]"
                lines={[
                  "Our flagship program supports the most vulnerable children",
                  "in Sierra Leone with education assistance, nutrition support,",
                  "and access to basic medical care.",
                  "It is the heart of everything Pandie Foundation does —",
                  "a promise that no child will be left behind.",
                ]}
              />
              <RevealLine delay={700} direction="up">
                <Link
                  href="/donate"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#d4a017] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
                >
                  Support This Program
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealLine>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Campaign ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2">

            {/* Left — dark red content */}
            <div className="flex flex-col justify-center bg-[#8b1a1a] px-8 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
              <RevealLine direction="left">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                  Upcoming Campaign
                </p>
              </RevealLine>
              <div className="mt-4">
                <SwingHeading
                  text="Back to School & Child Wellness Drive"
                  className="text-3xl font-semibold text-white sm:text-4xl"
                  baseDelay={100}
                />
              </div>
              <StaggeredText
                baseDelay={400}
                className="mt-2 text-[16px] leading-8 text-white/85"
                lines={[
                  "Join us as we provide school materials, nutrition support,",
                  "and basic health assistance for vulnerable children in Sierra Leone.",
                  "Together, we can help children return to school",
                  "healthier, safer, and full of hope.",
                ]}
              />
              <RevealLine delay={800} direction="up">
                <Link
                  href="/events"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/40 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
                >
                  View Event
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealLine>
            </div>

            {/* Right — image */}
            <div className="relative min-h-[300px] lg:min-h-[420px]">
              <Image
                src="/feature-story.jpg"
                alt="Back to school campaign"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stories Highlight ── */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Story 1 */}
            <RevealLine direction="up" delay={0}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <div className="relative h-52 w-full overflow-hidden bg-[#e7dfd0]">
                  <Image
                    src="/feature-story.jpg"
                    alt="A child back in school"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#214c34]">
                    A Child Back in School
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#626a67]">
                    Through support, encouragement, and basic school materials,
                    a vulnerable child was able to return to class with
                    confidence and renewed hope.
                  </p>
                  <Link
                    href="/stories"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d4a017] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
                  >
                    Success Stories
                  </Link>
                </div>
              </div>
            </RevealLine>

            {/* Story 2 */}
            <RevealLine direction="up" delay={150}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <div className="relative h-52 w-full overflow-hidden bg-[#e7dfd0]">
                  <Image
                    src="/feature-program.jpg"
                    alt="Acts of kindness"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#214c34]">
                    Acts of Kindness
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#626a67]">
                    From meals and medical help to school support, every act
                    of care restores dignity and protects the future of
                    vulnerable children.
                  </p>
                  <Link
                    href="/stories"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d4a017] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
                  >
                    More Good News
                  </Link>
                </div>
              </div>
            </RevealLine>

            {/* Featured program card */}
            <RevealLine direction="right" delay={300}>
              <div className="flex flex-col justify-center rounded-2xl bg-[#214c34] p-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                  Featured Program
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight">
                  Pandie Child Support Program
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  Our flagship program supports the most vulnerable children
                  in Sierra Leone with education assistance, nutrition support,
                  and access to basic medical care.
                </p>
                <Link
                  href="/donate"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#d4a017] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
                >
                  View Program
                </Link>
              </div>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-5 pb-20 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#214c34] p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-14">
          <RevealLine direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">
              Make a Difference Today
            </p>
          </RevealLine>
          <div className="mt-5 flex justify-center">
            <SwingHeading
              text="Every Program Starts With One Decision — Yours"
              className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl max-w-3xl"
              baseDelay={100}
            />
          </div>
          <StaggeredText
            baseDelay={600}
            className="mt-4 text-lg leading-9 text-white/80 max-w-2xl mx-auto"
            lines={[
              "Your donation funds the programs that change children's lives.",
              "Whether you give, volunteer, sponsor a child, or partner with us —",
              "every act of generosity becomes a child fed, educated, healed, and protected.",
            ]}
          />
          <RevealLine delay={1000} direction="up">
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-xl bg-[#d4a017] px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90"
              >
                Donate Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Partner With Us
              </Link>
            </div>
          </RevealLine>
        </div>
      </section>

    </main>
  );
}