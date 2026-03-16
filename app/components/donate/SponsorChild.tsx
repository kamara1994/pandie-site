"use client";

import { SponsorshipSelection, sponsoredChildren } from "../../donate/types";

type Props = {
  selectedSponsorship: SponsorshipSelection;
  onSelect: (selection: SponsorshipSelection) => void;
  onBack: () => void;
};

export default function SponsorChild({ selectedSponsorship, onSelect, onBack }: Props) {
  const selectedChild =
    selectedSponsorship !== null
      ? sponsoredChildren.find((child) => child.id === selectedSponsorship.childId)
      : null;

  return (
    <section className="px-5 py-16 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
              Sponsor an Individual Child
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
              Support One Child in a More Personal Way
            </h2>

            <p className="mt-5 text-[17px] leading-8 text-[#5f6663]">
              Choose a child profile and decide whether you want to help
              through monthly sponsorship or full sponsorship. These sample
              profiles are designed to protect dignity and privacy while
              helping donors connect with real impact.
            </p>
          </div>

          {/* Child cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sponsoredChildren.map((child) => {
              const isSelected = selectedSponsorship?.childId === child.id;

              return (
                <div
                  key={child.id}
                  className={`rounded-2xl border p-6 transition ${
                    isSelected
                      ? "border-[#214c34] bg-[#214c34] text-white"
                      : "border-[#e7dfd0] bg-[#fcfaf6] text-[#214c34]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-sm font-bold uppercase tracking-[0.16em] ${
                          isSelected ? "text-[#f0c857]" : "text-[#d4a017]"
                        }`}
                      >
                        {child.supportType}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold">
                        {child.name}, Age {child.age}
                      </h3>

                      <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-[#626a67]"}`}>
                        {child.location}
                      </p>
                    </div>
                  </div>

                  <p className={`mt-5 text-sm leading-7 ${isSelected ? "text-white/85" : "text-[#626a67]"}`}>
                    {child.story}
                  </p>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-[#214c34]"}`}>
                      Dream
                    </p>
                    <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-[#626a67]"}`}>
                      {child.dream}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => onSelect({ childId: child.id, type: "monthly" })}
                      className={`rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] transition ${
                        isSelected && selectedSponsorship?.type === "monthly"
                          ? "bg-[#d4a017] text-[#173325]"
                          : "bg-[#214c34] text-white hover:opacity-90"
                      }`}
                    >
                      Monthly Sponsorship
                      <span className="mt-2 block text-xs font-medium normal-case tracking-normal">
                        {child.monthlyAmount}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelect({ childId: child.id, type: "full" })}
                      className={`rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] transition ${
                        isSelected && selectedSponsorship?.type === "full"
                          ? "bg-[#f0c857] text-[#173325]"
                          : "bg-white text-[#214c34] ring-1 ring-[#214c34]/15 hover:bg-[#f8f5ef]"
                      }`}
                    >
                      Full Sponsorship
                      <span className="mt-2 block text-xs font-medium normal-case tracking-normal">
                        {child.fullAmount}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selection confirmation */}
          {selectedSponsorship !== null && selectedChild && (
            <div className="mt-8 rounded-2xl bg-[#214c34] p-6 text-white">
              <h3 className="text-2xl font-semibold">Sponsorship interest captured</h3>
              <p className="mt-3 text-sm leading-7 text-white/85">
                You selected{" "}
                <span className="font-semibold text-[#f0c857]">{selectedChild.name}</span>{" "}
                for{" "}
                <span className="font-semibold text-[#f0c857]">
                  {selectedSponsorship.type === "monthly"
                    ? "Monthly Sponsorship"
                    : "Full Sponsorship"}
                </span>
                . The next best step is to build a sponsorship inquiry form
                or connect this choice to a secure donation flow.
              </p>
            </div>
          )}

          {/* How it works */}
          <div className="mt-10 rounded-2xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
            <h3 className="text-xl font-semibold text-[#214c34]">
              How sponsorship will work
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4a017]">Step 1</p>
                <p className="mt-2 text-sm leading-7 text-[#626a67]">
                  Choose an individual child whose story speaks to your heart.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4a017]">Step 2</p>
                <p className="mt-2 text-sm leading-7 text-[#626a67]">
                  Decide between monthly sponsorship or full sponsorship.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4a017]">Step 3</p>
                <p className="mt-2 text-sm leading-7 text-[#626a67]">
                  Receive future updates through a safe and respectful sponsorship process.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-[#214c34] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90"
          >
            Back to Donate Money
          </button>
        </div>
      </div>
    </section>
  );
}