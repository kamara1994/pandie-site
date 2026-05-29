import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Education Support", description: "School fees, uniforms, books, and supplies — removing every barrier between a child and their right to learn and grow.", image: "/service-education.jpg", href: "/programs/education", num: "01", stat: "300+", statLabel: "Children in school" },
  { title: "Nutrition & Feeding", description: "Nutritious daily meals so that no child sits in a classroom too hungry to concentrate, dream, or believe in themselves.", image: "/service-nutrition.jpg", href: "/programs/nutrition", num: "02", stat: "200+", statLabel: "Children fed daily" },
  { title: "Medical Assistance", description: "Access to healthcare, treatment, and prevention for children who would otherwise suffer in silence from preventable illness.", image: "/service-medical.jpg", href: "/programs/medical", num: "03", stat: "150+", statLabel: "Medical cases supported" },
  { title: "Child Protection", description: "Safe spaces, advocacy, and emergency support for vulnerable children facing neglect, hardship, and uncertain futures.", image: "/service-protection.jpg", href: "/programs/protection", num: "04", stat: "100%", statLabel: "Commitment to dignity" },
];

export default function CoreServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] py-28 xl:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#214c34]/[0.03] blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#c9962a]/[0.05] blur-3xl" />
      </div>
      <div className="relative w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />What We Do<span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-6 font-heading text-[clamp(40px,5vw,68px)] font-semibold leading-[1.05] text-[#1a2e1f]">
            Six Pillars of<br /><em className="italic text-[#214c34]">Transformative Change</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f6663]">
            We serve vulnerable children in Sierra Leone through carefully designed programs that address the root causes of suffering and open pathways to lasting dignity.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="group relative flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative h-64 overflow-hidden bg-[#d4d8da]">
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2418]/60 via-transparent to-transparent" />
                <div className="absolute right-5 top-5 font-heading text-5xl font-semibold leading-none text-white/20">{service.num}</div>
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex flex-col bg-[#c9962a] px-3 py-2">
                    <span className="text-lg font-bold leading-none text-[#0a1a10]">{service.stat}</span>
                    <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0a1a10]/70">{service.statLabel}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="h-[2px] w-10 bg-[#c9962a] transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-5 font-heading text-[1.6rem] font-semibold leading-tight text-[#1a2e1f]">{service.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-[#626a67]">{service.description}</p>
                <Link href={service.href} className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition-all duration-300 hover:gap-4">
                  Explore Program <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            { title: "Child Sponsorship", desc: "Connect directly with a child — your monthly commitment transforms one life and inspires a community.", href: "/programs/sponsorship", icon: "👶" },
            { title: "Community Outreach", desc: "Partnering with local families and leaders to ensure our impact runs deep and lasts for generations.", href: "/programs/outreach", icon: "🤝" },
          ].map((p) => (
            <Link key={p.title} href={p.href} className="group flex items-center gap-6 bg-[#0f2418] px-8 py-7 transition-all duration-300 hover:bg-[#1a3826]">
              <span className="text-4xl">{p.icon}</span>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-[14px] leading-6 text-white/55">{p.desc}</p>
              </div>
              <span className="text-xl text-[#c9962a] transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
