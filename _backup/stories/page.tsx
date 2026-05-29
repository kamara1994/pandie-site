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

const featuredStory = {
  name: "Aminata",
  age: "10 years old",
  location: "Bo, Sierra Leone",
  image: "/story-featured.jpg",
  title: "From Uncertainty to Hope",
  challenge:
    "Aminata loved school, but her mother struggled to afford books, supplies, and basic daily needs. Some days she went to class worried that she might have to stop attending altogether.",
  help:
    "Through Pandie Foundation, she received school supplies, learning support, and practical care that helped her continue her education with confidence.",
  outcome:
    "Today, Aminata is back in class with renewed hope. Her story is a reminder that when one child is supported, a future begins to reopen.",
};

const childStories = [
  {
    name: "Musa",
    age: "9 years old",
    location: "Makeni",
    program: "Nutrition Support",
    image: "/story-nutrition.jpg",
    challenge:
      "Musa often came to school hungry, making it hard for him to focus and learn.",
    help:
      "Pandie Foundation supported him through food assistance and child-centered nutrition support.",
    outcome:
      "With better nourishment, Musa has more strength, better concentration, and a brighter school experience.",
  },
  {
    name: "Hawa",
    age: "11 years old",
    location: "Kenema",
    program: "Education Support",
    image: "/story-education.jpg",
    challenge:
      "Hawa was determined to learn, but lacked basic school materials and support.",
    help:
      "The foundation provided books, supplies, and practical education support so she could remain in school.",
    outcome:
      "Hawa now studies with confidence and continues to pursue her dream of building a better future.",
  },
  {
    name: "Mariama",
    age: "8 years old",
    location: "Freetown",
    program: "Medical Assistance",
    image: "/story-medical.jpg",
    challenge:
      "Mariama faced a health issue that became more serious because her family could not easily afford treatment.",
    help:
      "Pandie Foundation stepped in with medical assistance and support for urgent care.",
    outcome:
      "She received the help she needed, bringing relief to her family and hope for recovery.",
  },
  {
    name: "Ibrahim",
    age: "12 years old",
    location: "Port Loko",
    program: "Child Protection",
    image: "/story-protection.jpg",
    challenge:
      "Ibrahim was growing up in a difficult environment and needed support, safety, and encouragement.",
    help:
      "The foundation helped connect him with compassionate care and practical support.",
    outcome:
      "He now has a stronger sense of security, belonging, and hope for what lies ahead.",
  },
  {
    name: "Kadiatu",
    age: "10 years old",
    location: "Bo",
    program: "Clothing & Essentials",
    image: "/story-essentials.jpg",
    challenge:
      "Kadiatu’s family struggled to provide clothing, shoes, and daily essentials.",
    help:
      "Pandie Foundation provided practical essentials to help restore dignity and stability.",
    outcome:
      "She is now able to attend school and daily life with greater confidence and comfort.",
  },
  {
    name: "Samuel",
    age: "13 years old",
    location: "Kailahun",
    program: "Community Support",
    image: "/story-community.jpg",
    challenge:
      "Samuel’s progress was affected by broader hardship at home and limited community support.",
    help:
      "The foundation’s outreach and family-centered support helped strengthen the environment around him.",
    outcome:
      "With more stability and encouragement, Samuel is better positioned to grow and keep moving forward.",
  },
];

export default function StoriesPage() {
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
              Stories of Hope
            </p>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Real Children. Real Struggles. Real Hope.
            </h1>
          </Reveal>

          <Reveal delay={250} direction="up">
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/80 sm:text-xl">
              Every child we serve carries a story. These stories reflect how
              support through education, nutrition, medical care, protection,
              and essentials can help restore dignity and open the door to a
              better future.
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
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white/15"
              >
                Get Involved
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
              Behind every act of support is a child whose tomorrow becomes a little brighter.
            </p>
          </Reveal>

          <Reveal delay={150} direction="fade">
            <p className="mt-6 text-lg leading-8 text-[#5f6663]">
              These stories help show what compassionate action can do when it
              reaches children and families at the right time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured story */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal direction="left">
              <div className="relative min-h-[340px] lg:min-h-[560px]">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.name}
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
                    Featured Story
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#214c34] sm:text-4xl">
                    {featuredStory.title}
                  </h2>

                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#5f6663]">
                    {featuredStory.name} • {featuredStory.age} • {featuredStory.location}
                  </p>

                  <div className="mt-5 h-[3px] w-14 rounded-full bg-[#d4a017]" />

                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                        The Challenge
                      </p>
                      <p className="mt-2 text-[16px] leading-8 text-[#5f6663]">
                        {featuredStory.challenge}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                        How We Helped
                      </p>
                      <p className="mt-2 text-[16px] leading-8 text-[#5f6663]">
                        {featuredStory.help}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                        The Outcome
                      </p>
                      <p className="mt-2 text-[16px] leading-8 text-[#5f6663]">
                        {featuredStory.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/donate"
                      className="inline-flex items-center justify-center rounded-full bg-[#214c34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#183826]"
                    >
                      Help Change More Lives
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple child stories */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-8 text-center">
            <Reveal direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                More Stories of Impact
              </p>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
                Children We Have Helped Through the Program
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {childStories.map((story, i) => (
              <Reveal key={story.name + story.program} delay={i * 100} direction="up">
                <article className="group overflow-hidden rounded-[24px] border border-[#e7dfd0] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
                  <div className="relative h-72 overflow-hidden bg-[#d9dde3]">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f17]/45 via-transparent to-transparent" />
                  </div>

                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d4a017]">
                      {story.program}
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#214c34]">
                      {story.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#626a67]">
                      {story.age} • {story.location}
                    </p>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                          Challenge
                        </p>
                        <p className="mt-2 text-[15px] leading-8 text-[#626a67]">
                          {story.challenge}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                          How We Helped
                        </p>
                        <p className="mt-2 text-[15px] leading-8 text-[#626a67]">
                          {story.help}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#214c34]">
                          Outcome
                        </p>
                        <p className="mt-2 text-[15px] leading-8 text-[#626a67]">
                          {story.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dignity section */}
      <section className="px-5 pb-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px] grid gap-6 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="h-full rounded-[24px] bg-[#214c34] p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                Why We Share Stories
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Because People Give More Deeply When They Truly See
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-white/85">
                Stories help turn compassion into action. They show that behind
                every need is a life, a name, a dream, and a future worth protecting.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} direction="right">
            <div className="h-full rounded-[24px] bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
                Our Commitment
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
                We Share With Dignity and Respect
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5f6663]">
                Pandie Foundation is committed to telling stories in a way that
                honors children and families. We do not believe in exploiting pain.
                We believe in showing need with compassion, truth, and dignity.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="rounded-[28px] bg-[#0f1f17] p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-14">
            <Reveal direction="up">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f0c857]">
                Be Part of the Next Story
              </p>
            </Reveal>

            <Reveal delay={100} direction="up">
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Your Support Can Help Write a Better Future for Another Child
              </h2>
            </Reveal>

            <Reveal delay={250} direction="fade">
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/80">
                Through giving, sponsorship, and partnership, you can help bring
                education, nutrition, care, and hope to more children in Sierra Leone.
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
                  href="/get-involved"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
                >
                  Get Involved
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}