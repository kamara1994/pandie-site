"use client";

type Tab = "money" | "items" | "sponsor" | "volunteer" | "partner";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "money",     label: "Donate Money",    desc: "Financial gift",   icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { id: "items",     label: "Donate Items",    desc: "Goods & supplies", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { id: "sponsor",   label: "Sponsor a Child", desc: "1:1 commitment",   icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "volunteer", label: "Volunteer",       desc: "Time & skills",    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
  { id: "partner",   label: "Partner With Us", desc: "Organizations",    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function WaysToGive({ activeTab, onTabChange }: Props) {
  return (
    <section className="bg-[#f4f1ea] px-6 py-14 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7 text-center sm:mb-10">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />
            Choose Your Way to Help
            <span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-4 font-heading text-[clamp(28px,3.5vw,44px)] font-semibold text-[#1a2e1f]">
            How Would You Like to Give?
          </h2>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group relative flex flex-col items-center gap-2.5 overflow-hidden p-4 text-center transition-all duration-300 sm:gap-3 sm:p-6 ${tab.id === "money" ? "col-span-2 sm:col-span-1" : ""} ${
                  active
                    ? "-translate-y-1 bg-[#0a1a10] shadow-[0_14px_44px_rgba(0,0,0,0.22)]"
                    : "bg-white hover:-translate-y-1 hover:bg-[#0a1a10] hover:shadow-[0_14px_44px_rgba(0,0,0,0.14)]"
                }`}
              >
                {/* Subtle grid texture on active */}
                {active && (
                  <div className="pointer-events-none absolute inset-0 opacity-[0.055]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
                )}

                <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${active ? "bg-[#c9962a]" : "bg-[#0a1a10] group-hover:bg-[#c9962a]"}`}>
                  <svg className={`h-5 w-5 transition-colors duration-300 ${active ? "text-[#0a1a10]" : "text-[#e8b84b] group-hover:text-[#0a1a10]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                </span>

                <div className="relative z-10">
                  <p className={`text-[13px] font-bold leading-tight transition-colors duration-300 ${active ? "text-white" : "text-[#1a2e1f] group-hover:text-white"}`}>
                    {tab.label}
                  </p>
                  <p className={`mt-1 text-[11px] transition-colors duration-300 ${active ? "text-[#c9962a]" : "text-[#626a67] group-hover:text-[#c9962a]"}`}>
                    {tab.desc}
                  </p>
                </div>

                {/* Gold accent line — grows on active */}
                <div className={`relative z-10 h-[2px] rounded-full bg-[#c9962a] transition-all duration-300 ${active ? "w-12" : "w-0 group-hover:w-8 group-hover:bg-[#c9962a]/50"}`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
