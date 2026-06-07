"use client";
import Link from "next/link";
import { useT } from "../components/AutoTranslate";

function Tx({ children, className }: { children: string; className?: string }) {
  const t = useT(children);
  return <span className={className}>{t}</span>;
}

const ways = [
  { icon: "💛", title: "Donate", desc: "Give financially — one-time or monthly — and directly fund education, nutrition, medical care, and protection for children in Sierra Leone.", href: "/donate", cta: "Donate Now", dark: true },
  { icon: "👶", title: "Sponsor a Child", desc: "Commit to one child's journey. Your monthly support provides stability, dignity, and a future they can believe in.", href: "/donate", cta: "Sponsor a Child", dark: false },
  { icon: "🤝", title: "Become a Partner", desc: "Companies and organizations can partner with Pandie Foundation for CSR campaigns, co-branded events, and impact reporting.", href: "/contact", cta: "Explore Partnership", dark: true },
  { icon: "🙋", title: "Volunteer", desc: "Offer your time, skills, or professional expertise — remotely or in person — to strengthen our mission and operations.", href: "/contact", cta: "Volunteer With Us", dark: false },
  { icon: "📣", title: "Spread the Word", desc: "Share our mission on social media, with your community, or with your employer. Awareness creates donors and donors save lives.", href: "/contact", cta: "Get Sharing Materials", dark: true },
  { icon: "🏢", title: "Corporate Giving", desc: "Align your brand with a cause that matters. Employee giving programs, matching gifts, and sponsorships all welcome.", href: "/contact", cta: "Talk to Us", dark: false },
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>Join the Mission</Tx></span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">
            <Tx>Six Ways to</Tx><br /><em className="italic text-[#e8b84b]"><Tx>Get Involved</Tx></em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            <Tx>Every person who joins this mission — as a donor, volunteer, partner, or advocate — becomes part of a family that refuses to look away from a child in need.</Tx>
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className={`group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${w.dark ? "bg-[#0a1a10] text-white" : "bg-white text-[#1a2e1f]"} shadow-[0_2px_20px_rgba(0,0,0,0.07)]`}>
              <span className="text-4xl mb-6">{w.icon}</span>
              <div className="h-[2px] w-8 bg-[#c9962a] mb-5 transition-all duration-500 group-hover:w-16" />
              <h3 className={`font-heading text-2xl font-semibold mb-3 ${w.dark ? "text-white" : "text-[#1a2e1f]"}`}><Tx>{w.title}</Tx></h3>
              <p className={`flex-1 text-[15px] leading-7 mb-8 ${w.dark ? "text-white/60" : "text-[#626a67]"}`}><Tx>{w.desc}</Tx></p>
              <Link href={w.href} className="inline-flex items-center gap-2 bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
                <Tx>{w.cta}</Tx> →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#214c34] px-6 py-20 text-center lg:px-20">
        <div className="mx-auto max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>The Power of One</Tx></span>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,56px)] font-semibold text-white">
            <Tx>One person. One decision.</Tx><br /><em className="italic text-[#e8b84b]"><Tx>One child's life changed.</Tx></em>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65 max-w-xl mx-auto">
            <Tx>You don't need to be wealthy to make a difference. You just need to care. Whatever you can give — time, money, voice, or skill — it matters more than you know.</Tx>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="bg-[#c9962a] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]"><Tx>Start Giving</Tx></Link>
            <Link href="/contact" className="border border-white/30 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-white/60"><Tx>Contact Us</Tx></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
