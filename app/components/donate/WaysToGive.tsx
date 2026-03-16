import { DonationTab, givingOptions } from "../../donate/types";

type Props = {
  activeTab: DonationTab;
  onTabChange: (tab: DonationTab) => void;
};

export default function WaysToGive({ activeTab, onTabChange }: Props) {
  return (
    <section className="px-5 py-12 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
            Ways To Give
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Choose How You Want to Help
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-[#5f6663]">
            Support Pandie Foundation by giving money, donating essential
            items, sponsoring an individual child, volunteering your time,
            or partnering with us to serve vulnerable children in Sierra Leone.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {givingOptions.map((option) => {
            const isActive = activeTab === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onTabChange(option.id)}
                className={`rounded-2xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] ${
                  isActive
                    ? "border-[#214c34] bg-[#214c34] text-white"
                    : "border-[#e7dfd0] bg-[#fcfaf6] text-[#214c34]"
                }`}
              >
                <h3
                  className={`text-xl font-semibold ${
                    isActive ? "text-white" : "text-[#214c34]"
                  }`}
                >
                  {option.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-7 ${
                    isActive ? "text-white/85" : "text-[#626a67]"
                  }`}
                >
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}