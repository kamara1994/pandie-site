import Link from "next/link";

// Slim doorway into the Potential in Motion scroll story. Deliberately quiet:
// it must never compete with the Donate CTAs around it.
export default function JourneyBanner() {
  return (
    <section className="relative overflow-hidden border-y border-[#c9962a]/25 bg-[#0d2015]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9962a]/60 to-transparent" />
      <Link
        href="/potential-in-motion"
        className="group mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-8"
      >
        <div className="flex items-center gap-4">
          {/* the traveling football, at rest */}
          <svg viewBox="0 0 200 200" className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
            <circle cx="100" cy="100" r="62" fill="#f4f1ea" stroke="#1a2e1f" strokeWidth="6" />
            <polygon points="100,72 126,91 116,122 84,122 74,91" fill="#1a2e1f" />
          </svg>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b]">Potential in Motion</p>
            <p className="mt-1 text-[14px] text-white/70">See how one opportunity can become many futures.</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#c9962a] transition group-hover:text-[#e8b84b]">
          Follow the Journey <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </section>
  );
}
