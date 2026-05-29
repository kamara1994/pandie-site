"use client";

import Link from "next/link";
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

function Reveal({
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
          : "opacity-0 scale-[0.98]";

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

const waysToHelp = [
  {
    title: "Donate",
    desc: "Give financial support to help provide school materials, food, medical care, and urgent assistance to vulnerable children.",
    href: "/donate",
    button: "Support Now",
  },
  {
    title: "Sponsor a Child",
    desc: "Make a lasting difference through ongoing support that helps a child grow with stability, dignity, and hope.",
    href: "/sponsor",
    button: "Sponsor a Child",
  },
  {
    title: "Volunteer",
    desc: "Offer your time, skills, ideas, or professional support to strengthen the mission of Pandie Foundation.",
    href: "/contact",
    button: "Volunteer With Us",
  },
  {
    title: "Partner With Us",
    desc: "Businesses, churches, schools, nonprofits, and community groups can partner with us to create deeper and wider impact.",
    href: "/contact",
    button: "Become a Partner",
  },
];

const supportWays = [
  {
    title: "Give Monthly",
    text: "Monthly support helps us plan ahead and respond consistently to the needs of children and families.",
    icon: "↺",
  },
  {
    title: "Donate Supplies",
    text: "Support through clothing, school items, hygiene products, food supplies, or medical essentials can change lives.",
    icon: "✦",
  },
  {
    title: "Fund a Project",
    text: "Help fund a focused initiative such as school support, feeding outreach, medical cases, or child protection work.",
    icon: "◎",
  },
  {
    title: "Spread the Word",
    text: "Share our mission with friends, family, faith communities, and online networks so more people can join the cause.",
    icon: "➜",
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f1f17] px-5 py-20 text-white sm:py-28 lg:px-8 xl:px-12">
        <div className="absolute inset-0">
          <div className="absolute left-[-80px] top-10 h-48 w-48 rounded-full bg-[#d4a017]/10 blur-3xl" />
          <div className="absolute right-[-80px] bottom-0 h-64 w-64 rounded-full bg-[#214c34]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1150px]">
          <Reveal direction="fade">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f0c857]">
              Get Involved
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Be the Reason a Child Feels Seen, Safe, and Supported
            </h1>
          </Reveal>

          <Reveal delay={250} direction="up">
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/80 sm:text-xl">
              There are many ways to stand with Pandie Foundation. Whether you
              give, sponsor, volunteer, partner, or share our mission, your
              involvement helps restore dignity and hope to vulnerable children
              in Sierra Leone.
            </p>
          </Reveal>

          <Reveal delay={400} direction="up">
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-[#d4a017] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#173325] transition duration-300 hover:bg-[#e0b63f]"
              >
                Donate Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[950px] text-center">
          <Reveal direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
              Every Hand Matters
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
              You Do Not Need to Do Everything. You Just Need to Do Something.
            </h2>
          </Reveal>

          <Reveal delay={250} direction="fade">
            <p className="mt-6 text-[17px] leading-8 text-[#5f6663]">
              Real change is built through ordinary people making meaningful
              choices. A single gift, a shared opportunity, a new partnership,
              or a commitment to sponsor one child can become the turning point
              in a child’s life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main ways to get involved */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {waysToHelp.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} direction="up">
                <div className="group flex h-full flex-col rounded-[22px] border border-[#e6dfd1] bg-white p-7 shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
                  <div className="h-[3px] w-14 rounded-full bg-[#d4a017] transition-all duration-300 group-hover:w-20" />

                  <h3 className="mt-5 text-2xl font-semibold text-[#214c34]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-8 text-[#626a67]">
                    {item.desc}
                  </p>

                  <Link
                    href={item.href}
                    className="mt-auto pt-8 inline-flex items-center justify-center rounded-full bg-[#214c34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#183826]"
                  >
                    {item.button}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other support options */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px] rounded-[26px] bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:p-12">
          <Reveal direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
              More Ways to Help
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
              Support the Mission in the Way That Fits You Best
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {supportWays.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} direction="up">
                <div className="rounded-2xl border border-[#ece4d7] bg-[#fcfaf6] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#214c34] text-xl text-[#f0c857]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#214c34]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-8 text-[#626a67]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why involvement matters */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="h-full rounded-[24px] bg-[#214c34] p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                  Why It Matters
                </p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Your Involvement Reaches Far Beyond One Moment
                </h2>
                <p className="mt-5 text-[16px] leading-8 text-white/85">
                  When you stand with Pandie Foundation, you help create access
                  to education, food, care, stability, and protection. You help
                  children remain in school, receive treatment, and experience
                  the dignity every human life deserves.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} direction="right">
              <div className="h-full rounded-[24px] bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                  What Your Support Can Do
                </p>

                <ul className="mt-5 space-y-4 text-[16px] leading-8 text-[#5f6663]">
                  <li>Provide school materials and practical learning support</li>
                  <li>Help feed children facing hunger and malnutrition</li>
                  <li>Support urgent medical care and treatment</li>
                  <li>Protect vulnerable children through compassionate care</li>
                  <li>Strengthen families and communities with hope-based support</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="rounded-[28px] bg-[#0f1f17] p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-14">
            <Reveal direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">
                Join the Mission
              </p>
            </Reveal>

            <Reveal delay={100} direction="up">
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Compassion Becomes Stronger When People Move Together
              </h2>
            </Reveal>

            <Reveal delay={250} direction="fade">
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/80">
                Whether your contribution is financial, practical, professional,
                or relational, there is a place for you in this work. Together,
                we can help vulnerable children experience a better future.
              </p>
            </Reveal>

            <Reveal delay={400} direction="up">
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
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}