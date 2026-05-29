import Image from "next/image";
import Link from "next/link";

const programs = [
  { num: "01", title: "Education Support", desc: "School fees, uniforms, books, and learning supplies — removing every barrier between a child and their right to learn.", image: "/service-education.jpg", href: "/programs/education", stat: "300+", statLabel: "Children in school" },
  { num: "02", title: "Nutrition & Feeding", desc: "Daily nutritious meals so no child sits in a classroom too hungry to concentrate, learn, or dream.", image: "/service-nutrition.jpg", href: "/programs/nutrition", stat: "200+", statLabel: "Children fed daily" },
  { num: "03", title: "Medical Assistance", desc: "Healthcare access, treatment, and prevention for children suffering from preventable and treatable conditions.", image: "/service-medical.jpg", href: "/programs/medical", stat: "150+", statLabel: "Medical cases supported" },
  { num: "04", title: "Child Protection", desc: "Safe spaces, advocacy, and emergency support for vulnerable children facing neglect and hardship.", image: "/service-protection.jpg", href: "/programs/protection", stat: "100%", statLabel: "Commitment to dignity" },
  { num: "05", title: "Child Sponsorship", desc: "Connect directly with a child — your monthly commitment transforms one life and inspires a whole community.", image: "/service-education.jpg", href: "/programs/sponsorship", stat: "1:1", statLabel: "Sponsor to child ratio" },
  { num: "06", title: "Community Outreach", desc: "Partnering with families, schools, and local leaders to ensure our impact runs deep and lasts for generations.", image: "/service-nutrition.jpg", href: "/programs/outreach", stat: "∞", statLabel: "Community impact" },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">What We Do · Sierra Leone</span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">
            Six Pillars of<br /><em className="italic text-[#e8b84b]">Transformative Change</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">Every program is designed around one principle: treat each child as if they were our own.</p>
        </div>
      </section>

      {/* Programs grid */}
      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative h-56 overflow-hidden bg-[#d4d8da]">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/70 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 font-heading text-5xl font-semibold leading-none text-white/15">{p.num}</div>
                <div className="absolute bottom-4 left-4 bg-[#c9962a] px-3 py-1.5 flex flex-col">
                  <span className="text-lg font-bold leading-none text-[#0a1a10]">{p.stat}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0a1a10]/70">{p.statLabel}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4 transition-all duration-500 group-hover:w-14" />
                <h3 className="font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#626a67]">{p.desc}</p>
                <Link href={p.href} className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition hover:gap-4">
                  Explore Program <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <div className="mx-auto max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#0a1a10]/60">Support Our Work</span>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,56px)] font-semibold text-[#0a1a10]">Every program runs<br />because someone gave.</h2>
          <p className="mt-6 text-lg leading-8 text-[#0a1a10]/70">Your donation directly funds these programs — keeping children in school, fed, healthy, and protected.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Donate to a Program</Link>
            <Link href="/donate" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">Sponsor a Child</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
