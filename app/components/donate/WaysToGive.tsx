"use client";

type Tab = "money" | "items" | "sponsor" | "volunteer" | "partner";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "money", label: "Donate Money", icon: "💛", desc: "Financial gift" },
  { id: "items", label: "Donate Items", icon: "📦", desc: "Goods & supplies" },
  { id: "sponsor", label: "Sponsor a Child", icon: "👶", desc: "1:1 commitment" },
  { id: "volunteer", label: "Volunteer", icon: "🙋", desc: "Time & skills" },
  { id: "partner", label: "Partner With Us", icon: "🤝", desc: "Organizations" },
];

export default function WaysToGive({ activeTab, onTabChange }: Props) {
  return (
    <section className="bg-[#f4f1ea] px-6 py-14 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Choose Your Way to Help</span>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[#1a2e1f] lg:text-4xl">How Would You Like to Give?</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group flex flex-col items-center gap-3 p-6 text-center transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#0a1a10] text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                  : "bg-white text-[#1a2e1f] hover:bg-[#0a1a10]/5"
              }`}
            >
              <span className="text-3xl">{tab.icon}</span>
              <div>
                <p className={`text-[13px] font-bold leading-tight ${activeTab === tab.id ? "text-white" : "text-[#1a2e1f]"}`}>{tab.label}</p>
                <p className={`mt-1 text-[11px] ${activeTab === tab.id ? "text-[#c9962a]" : "text-[#626a67]"}`}>{tab.desc}</p>
              </div>
              <div className={`h-[2px] w-8 transition-all duration-300 ${activeTab === tab.id ? "bg-[#c9962a]" : "bg-transparent group-hover:bg-[#c9962a]/30"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
