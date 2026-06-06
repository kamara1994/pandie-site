"use client";

type Tab = "money" | "items" | "sponsor" | "volunteer" | "partner";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "money",     label: "Donate Money",   icon: "💛", desc: "Financial gift"    },
  { id: "items",     label: "Donate Items",   icon: "📦", desc: "Goods & supplies"  },
  { id: "sponsor",   label: "Sponsor a Child",icon: "👶", desc: "1:1 commitment"    },
  { id: "volunteer", label: "Volunteer",      icon: "🙋", desc: "Time & skills"     },
  { id: "partner",   label: "Partner With Us",icon: "🤝", desc: "Organizations"     },
];

export default function WaysToGive({ activeTab, onTabChange }: Props) {
  return (
    <section className="bg-[#f4f1ea] px-6 py-14 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
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
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group relative flex flex-col items-center gap-3 overflow-hidden p-6 text-center transition-all duration-300 ${
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

                <span className="relative z-10 text-3xl">{tab.icon}</span>

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
