"use client";

import Image from "next/image";
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

const featuredEvent = {
  title: "Back to School Community Outreach",
  date: "August 24, 2026",
  time: "10:00 AM",
  location: "Bo, Sierra Leone",
  image: "/event-featured.jpg",
  description:
    "A community-centered outreach focused on helping vulnerable children return to school with dignity, confidence, and the supplies they need to begin the academic year well.",
  highlights: [
    "School bags, books, and learning materials",
    "Child support outreach for vulnerable families",
    "Volunteer and community participation",
    "Opportunities for donor and partner support",
  ],
};

const upcomingEvents = [
  {
    title: "School Supplies Drive",
    date: "September 12, 2026",
    time: "11:00 AM",
    location: "Freetown, Sierra Leone",
    image: "/event-supplies.jpg",
    description:
      "A focused event to gather and distribute school materials to children in need.",
    type: "Upcoming Event",
  },
  {
    title: "Child Wellness & Medical Support Day",
    date: "October 3, 2026",
    time: "9:00 AM",
    location: "Kenema, Sierra Leone",
    image: "/event-medical.jpg",
    description:
      "A care-centered event supporting children through basic medical help, wellness support, and family assistance.",
    type: "Upcoming Event",
  },
  {
    title: "Community Feeding Outreach",
    date: "November 7, 2026",
    time: "1:00 PM",
    location: "Makeni, Sierra Leone",
    image: "/event-feeding.jpg",
    description:
      "A nutrition-focused community event aimed at helping vulnerable children and families facing hardship.",
    type: "Upcoming Event",
  },
];

const eventTypes = [
  {
    title: "Community Outreach",
    desc: "Ground-level events that bring direct help, visibility, and compassion to children and families.",
    icon: "◎",
  },
  {
    title: "Fundraising Events",
    desc: "Special gatherings designed to raise support for education, nutrition, medical care, and child protection.",
    icon: "✦",
  },
  {
    title: "Volunteer Activities",
    desc: "Hands-on opportunities for people to give time, skills, and service to the mission.",
    icon: "➜",
  },
  {
    title: "Partnership Events",
    desc: "Collaborative events with churches, schools, businesses, and communities that expand impact.",
    icon: "↺",
  },
];

const pastEvents = [
  {
    title: "Children’s Support Outreach",
    summary:
      "A local outreach focused on practical child support, encouragement, and essential assistance for vulnerable families.",
  },
  {
    title: "School Readiness Distribution",
    summary:
      "An event dedicated to helping children prepare for school with supplies, essentials, and renewed confidence.",
  },
  {
    title: "Community Hope Gathering",
    summary:
      "A gathering that brought together supporters, families, and community voices around the shared mission of protecting children.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f1f17] px-5 py-20 text-white sm:py-28 lg:px-8 xl:px-12">
        <div className="absolute inset-0">
          <div className="absolute left-[-80px] top-8 h-52 w-52 rounded-full bg-[#d4a017]/10 blur-3xl" />
          <div className="absolute right-[-80px] bottom-0 h-72 w-72 rounded-full bg-[#214c34]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1150px]">
          <Reveal direction="fade">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f0c857]">
              Events
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Gatherings That Turn Compassion Into Action
            </h1>
          </Reveal>

          <Reveal delay={250} direction="up">
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/80 sm:text-xl">
              Our events create opportunities for supporters, volunteers,
              partners, and communities to come together on behalf of vulnerable
              children in Sierra Leone.
            </p>
          </Reveal>

          <Reveal delay={400} direction="up">
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full bg-[#d4a017] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#173325] transition duration-300 hover:bg-[#e0b63f]"
              >
                Get Involved
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
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal direction="up">
            <p className="text-2xl font-semibold leading-10 text-[#214c34] sm:text-3xl sm:leading-[1.6]">
              Every event is a chance to serve, support, and stand closer to the mission.
            </p>
          </Reveal>

          <Reveal delay={150} direction="fade">
            <p className="mt-6 text-lg leading-8 text-[#5f6663]">
              From outreach programs to fundraising efforts, our events help
              connect people with meaningful ways to make a difference.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured event */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal direction="left">
              <div className="relative min-h-[340px] lg:min-h-[560px]">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f17]/70 via-[#0f1f17]/20 to-transparent" />
              </div>
            </Reveal>

            <div className="flex items-center">
              <Reveal delay={120} direction="right">
                <div className="px-8 py-10 sm:px-10 lg:px-12">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#d4a017]">
                    Featured Event
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#214c34] sm:text-4xl">
                    {featuredEvent.title}
                  </h2>

                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#626a67]">
                    {featuredEvent.date} • {featuredEvent.time} • {featuredEvent.location}
                  </p>

                  <div className="mt-5 h-[3px] w-14 rounded-full bg-[#d4a017]" />

                  <p className="mt-6 text-[16px] leading-8 text-[#5f6663]">
                    {featuredEvent.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                      Event Highlights
                    </p>

                    <ul className="mt-3 space-y-3 text-[15px] leading-8 text-[#5f6663]">
                      {featuredEvent.highlights.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-[#214c34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#183826]"
                    >
                      Ask About This Event
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-8 text-center">
            <Reveal direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                Upcoming Events
              </p>
            </Reveal>

            <Reveal delay={100} direction="up">
              <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
                Join Us in the Work Ahead
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 100} direction="up">
                <article className="group overflow-hidden rounded-[24px] border border-[#e7dfd0] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
                  <div className="relative h-72 overflow-hidden bg-[#d9dde3]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f17]/45 via-transparent to-transparent" />
                  </div>

                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d4a017]">
                      {event.type}
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#214c34]">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#626a67]">
                      {event.date} • {event.time}
                    </p>

                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#626a67]">
                      {event.location}
                    </p>

                    <p className="mt-4 text-[15px] leading-8 text-[#626a67]">
                      {event.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px] rounded-[28px] bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:p-12">
          <Reveal direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
              Ways We Gather
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
              The Kinds of Events That Support the Mission
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {eventTypes.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} direction="up">
                <div className="rounded-2xl border border-[#ece4d7] bg-[#fcfaf6] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#214c34] text-xl text-[#f0c857]">
                    {item.icon}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-[#214c34]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-8 text-[#626a67]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="h-full rounded-[24px] bg-[#214c34] p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                  Why Events Matter
                </p>

                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Events Build Visibility, Unity, and Real Support
                </h2>

                <p className="mt-5 text-[16px] leading-8 text-white/85">
                  Events help bring people closer to the mission. They create
                  moments where generosity, service, and partnership can turn
                  into direct help for vulnerable children and families.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} direction="right">
              <div className="h-full rounded-[24px] bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                  Past Community Moments
                </p>

                <div className="mt-5 space-y-5">
                  {pastEvents.map((event) => (
                    <div
                      key={event.title}
                      className="rounded-2xl border border-[#ece4d7] bg-[#fcfaf6] p-5"
                    >
                      <h3 className="text-lg font-semibold text-[#214c34]">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-8 text-[#626a67]">
                        {event.summary}
                      </p>
                    </div>
                  ))}
                </div>
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
                Be Part of the Next Gathering
              </p>
            </Reveal>

            <Reveal delay={100} direction="up">
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Show Up for the Mission in a Way That Matters
              </h2>
            </Reveal>

            <Reveal delay={250} direction="fade">
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/80">
                Whether you attend, volunteer, donate, or partner with us,
                your participation can help move compassion into visible action.
              </p>
            </Reveal>

            <Reveal delay={400} direction="up">
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center rounded-xl bg-[#d4a017] px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90"
                >
                  Get Involved
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