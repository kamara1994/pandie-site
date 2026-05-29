import Image from "next/image";
import Link from "next/link";

export default function SplitEvent() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative overflow-hidden bg-[#0a1a10] px-8 py-20 sm:px-14 lg:px-16 xl:px-20">
        <div className="pointer-events-none absolute right-[-60px] top-[-40px] h-64 w-64 rounded-full bg-[#c9962a]/10 blur-3xl" />
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 bg-[#c9962a]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#c9962a]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9962a]" />Upcoming Campaign
          </span>
          <h2 className="mt-6 font-heading text-[clamp(32px,3.5vw,52px)] font-semibold leading-tight text-white">
            Back to School &amp;<br /><em className="italic text-[#e8b84b]">Child Wellness Drive</em>
          </h2>
          <p className="mt-6 text-[16px] leading-8 text-white/65">
            Join us as we provide school materials, nutrition support, and basic health assistance for vulnerable children in Sierra Leone.
          </p>
          <div className="mt-10 space-y-4 border-t border-white/10 pt-10">
            {[
              ["📍","Location","Freetown, Sierra Leone"],
              ["📅","Date","August — September 2025"],
              ["🎯","Goal","500 children supported"],
            ].map(([icon, label, value]) => (
              <div key={label as string} className="flex items-center gap-4">
                <span className="text-xl">{icon}</span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</span>
                  <p className="text-[14px] font-semibold text-white/80">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/events" className="inline-flex items-center gap-3 bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b]">View Full Event →</Link>
            <Link href="/donate" className="inline-flex items-center border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white">Support This Drive</Link>
          </div>
        </div>
      </div>
      <div className="relative min-h-[520px]">
        <Image src="/event.jpg" alt="Pandie Foundation event" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/60 via-transparent to-transparent lg:hidden" />
        <div className="absolute bottom-8 right-8 bg-[#0a1a10]/90 p-6 backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9962a]">Every $10 donated</p>
          <p className="mt-2 font-heading text-2xl font-semibold text-white">Feeds a child<br />for one week</p>
          <Link href="/donate" className="mt-4 inline-block bg-[#c9962a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">Donate $10 →</Link>
        </div>
      </div>
    </section>
  );
}
