import Image from "next/image";
import Link from "next/link";

export default function MedicalPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute inset-0"><Image src="/service-medical.jpg" alt="" fill className="object-cover opacity-15" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/98 via-[#0a1a10]/85 to-[#0a1a10]/50" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← All Programs</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Program 03</span></div>
          <h1 className="font-heading text-[clamp(48px,6vw,86px)] font-semibold leading-[1.02] text-white">Medical<br /><em className="italic text-[#e8b84b]">Assistance</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">A sick child cannot learn. A child in pain cannot dream. Healthcare is the foundation of everything.</p>
          <div className="mt-12 flex flex-wrap gap-10 border-t border-white/10 pt-10">
            {[["150+","Medical cases supported"],["$50","Covers a full medical visit"],["100%","Preventable conditions treated"]].map(([n,l])=>(
              <div key={l}><p className="font-heading text-4xl font-semibold text-[#c9962a]">{n}</p><p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">The Problem</span>
            <h2 className="mt-4 font-heading text-[clamp(32px,4vw,52px)] font-semibold leading-tight text-[#1a2e1f]">Children Are Suffering<br /><em className="italic text-[#214c34]">From Preventable Illness</em></h2>
            <p className="mt-6 text-[16px] leading-8 text-[#626a67]">In Sierra Leone, children suffer and die from illnesses that are entirely preventable and treatable — malaria, infections, malnutrition-related conditions — simply because their families cannot afford care. A fever that costs $5 to treat can become fatal when left untreated for weeks.</p>
            <div className="mt-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">What We Provide</span>
              <div className="mt-5 space-y-3">
                {["Medical consultations and treatment","Medicine and prescriptions","Emergency health support","Malaria and infection treatment","Preventive care and vaccinations","Health education for families"].map(item=>(
                  <div key={item} className="flex items-center gap-3 bg-white px-5 py-3.5 shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9962a]" />
                    <p className="text-[15px] text-[#1a2e1f]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#0a1a10] p-8 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">Why It Matters</span>
              <p className="mt-4 text-[16px] leading-8 text-white/70">When we provide medical support, we do more than treat illness — we restore the possibility of a normal, healthy childhood. Health is not a luxury. It is the foundation of everything a child needs to grow, learn, and become who they were meant to be.</p>
            </div>
            <div className="bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">A Child's Story</span>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">She Had a Fever for Two Weeks.<br /><em className="italic text-[#214c34]">We Got Her Help.</em></h3>
              <p className="mt-4 text-[15px] leading-7 text-[#626a67]">Fatmata was seven when she fell ill with malaria. Her family had no money for treatment and watched helplessly as her condition worsened. Pandie Foundation stepped in, covered her treatment, and within weeks she was back in school — healthy, happy, and smiling.</p>
            </div>
            <div className="border-l-2 border-[#c9962a] pl-6 py-2">
              <p className="font-heading text-xl font-light italic text-[#1a2e1f]/70">"No child should lose their future to an illness that could have been treated with basic care."</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a]">— Our Goal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#0a1a10]/60">Support Medical Care</span>
        <h2 className="mt-4 font-heading text-[clamp(36px,4vw,58px)] font-semibold text-[#0a1a10]">Give a child<br />the gift of health</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[#0a1a10]/70">$50 covers a full medical visit and treatment. Your gift gives a child the healthy chance at life they deserve.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Donate Now</Link>
          <Link href="/programs" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">All Programs</Link>
        </div>
      </section>
    </main>
  );
}
