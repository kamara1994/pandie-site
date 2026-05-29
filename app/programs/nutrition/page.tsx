import Image from "next/image";
import Link from "next/link";

export default function NutritionPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute inset-0"><Image src="/service-nutrition.jpg" alt="" fill className="object-cover opacity-15" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/98 via-[#0a1a10]/85 to-[#0a1a10]/50" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← All Programs</Link>
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Program 02</span></div>
          <h1 className="font-heading text-[clamp(48px,6vw,86px)] font-semibold leading-[1.02] text-white">Nutrition &amp;<br /><em className="italic text-[#e8b84b]">Feeding</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">No child should sit in a classroom too hungry to learn, dream, or believe in themselves.</p>
          <div className="mt-12 flex flex-wrap gap-10 border-t border-white/10 pt-10">
            {[["200+","Children fed daily"],["$10","Feeds a child one week"],["0","Children left hungry"]].map(([n,l])=>(
              <div key={l}><p className="font-heading text-4xl font-semibold text-[#c9962a]">{n}</p><p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">The Problem</span>
            <h2 className="mt-4 font-heading text-[clamp(32px,4vw,52px)] font-semibold leading-tight text-[#1a2e1f]">Hunger Steals<br /><em className="italic text-[#214c34]">More Than a Meal</em></h2>
            <p className="mt-6 text-[16px] leading-8 text-[#626a67]">In Sierra Leone, children go to school hungry every day. Malnutrition affects their ability to focus, learn, and grow. A child who cannot eat cannot reach their potential — no matter how intelligent or determined they are.</p>
            <div className="mt-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">What We Provide</span>
              <div className="mt-5 space-y-3">
                {["Daily nutritious meals at school","Food packages for families in crisis","Child-centered nutrition support","Emergency food assistance","Malnutrition screening and referrals","Healthy eating education"].map(item=>(
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
              <p className="mt-4 text-[16px] leading-8 text-white/70">Nutrition is the foundation of everything. A child who eats can focus. A child who focuses can learn. A child who learns can build a future. Addressing hunger is not charity — it is an investment in the next generation of Sierra Leone's leaders.</p>
            </div>
            <div className="bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">A Child's Story</span>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">He Could Finally<br /><em className="italic text-[#214c34]">Concentrate in Class</em></h3>
              <p className="mt-4 text-[15px] leading-7 text-[#626a67]">Moussa was falling behind in school. His teacher noticed he was often tired and distracted. The reason was simple — he was going to school hungry every day. After receiving meal support through Pandie Foundation, Moussa's grades improved and his smile came back.</p>
            </div>
            <div className="border-l-2 border-[#c9962a] pl-6 py-2">
              <p className="font-heading text-xl font-light italic text-[#1a2e1f]/70">"No child in Sierra Leone should have to choose between eating and learning."</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a]">— Our Goal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#0a1a10]/60">Support Nutrition</span>
        <h2 className="mt-4 font-heading text-[clamp(36px,4vw,58px)] font-semibold text-[#0a1a10]">Feed a child.<br />Fuel a future.</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[#0a1a10]/70">Just $10 feeds a child for one week. Your donation gives children the energy and focus they need to thrive.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Donate Now</Link>
          <Link href="/programs" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">All Programs</Link>
        </div>
      </section>
    </main>
  );
}
