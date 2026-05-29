import Image from "next/image";
import Link from "next/link";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute inset-0"><Image src="/service-education.jpg" alt="" fill className="object-cover opacity-15" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/98 via-[#0a1a10]/85 to-[#0a1a10]/50" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">
            ← All Programs
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Program 01</span>
          </div>
          <h1 className="font-heading text-[clamp(48px,6vw,86px)] font-semibold leading-[1.02] text-white">
            Education<br /><em className="italic text-[#e8b84b]">Support</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">Every child deserves a seat in a classroom. We make sure poverty is never the reason they lose it.</p>
          <div className="mt-12 flex flex-wrap gap-10 border-t border-white/10 pt-10">
            {[["300+","Children in school"],["6","Days a week supported"],["100%","Of donations reach children"]].map(([n,l])=>(
              <div key={l}><p className="font-heading text-4xl font-semibold text-[#c9962a]">{n}</p><p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">The Problem</span>
            <h2 className="mt-4 font-heading text-[clamp(32px,4vw,52px)] font-semibold leading-tight text-[#1a2e1f]">Education Is a Right —<br /><em className="italic text-[#214c34]">Not a Privilege</em></h2>
            <p className="mt-6 text-[16px] leading-8 text-[#626a67]">In Sierra Leone, thousands of children are forced to drop out of school not because they lack the desire to learn — but because their families cannot afford fees, uniforms, or basic supplies. Some walk miles on empty stomachs. Others sit in classrooms with no books.</p>
            <div className="mt-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">What We Provide</span>
              <div className="mt-5 space-y-3">
                {["School fees and tuition assistance","Textbooks, notebooks, and learning materials","School uniforms and shoes","Backpacks and stationery supplies","Academic encouragement and mentorship","Support for girls at risk of dropping out"].map(item=>(
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
              <p className="mt-4 text-[16px] leading-8 text-white/70">When a child receives education, everything changes. They gain tools to build a future, contribute to their community, and break cycles of poverty that have held their families back for generations. Education is not just a program — it is a pathway to freedom.</p>
            </div>
            <div className="bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">A Child's Story</span>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">She Almost Gave Up.<br /><em className="italic text-[#214c34]">We Helped Her Stay.</em></h3>
              <p className="mt-4 text-[15px] leading-7 text-[#626a67]">At 10 years old, Aminata was about to leave school forever. Her family could not afford her fees or uniform. With support from Pandie Foundation, she received everything she needed to walk back through those school gates with her head held high. Today, she wants to become a doctor.</p>
            </div>
            <div className="border-l-2 border-[#c9962a] pl-6 py-2">
              <p className="font-heading text-xl font-light italic text-[#1a2e1f]/70">"To ensure that no child in Sierra Leone is denied an education because of poverty."</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a]">— Our Goal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#0a1a10]/60">Support Education</span>
        <h2 className="mt-4 font-heading text-[clamp(36px,4vw,58px)] font-semibold text-[#0a1a10]">Help a child<br />stay in school today</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[#0a1a10]/70">Your donation covers fees, books, and uniforms — giving a child the chance to learn, grow, and build a future.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Donate Now</Link>
          <Link href="/programs" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">All Programs</Link>
        </div>
      </section>
    </main>
  );
}
