"use client";

import {
  PartnerFormData,
  partnershipTypes,
  contributionTypes,
} from "../../donate/types";

type Props = {
  formData: PartnerFormData;
  error: string;
  onInputChange: (field: keyof PartnerFormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export default function PartnerForm({
  formData,
  error,
  onInputChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <section className="px-5 py-16 lg:px-8 xl:px-12">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1fr]">

        {/* Left – info panel */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
            Partner With Us
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Build Long-Term Impact Together
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-[#5f6663]">
            We welcome partnerships with businesses, schools, churches,
            nonprofits, medical teams, and community groups that want to help
            vulnerable children in Sierra Leone.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {partnershipTypes.map((type) => (
              <div
                key={type}
                className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] px-4 py-4 text-sm font-medium text-[#214c34]"
              >
                {type}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
            <h3 className="text-lg font-semibold text-[#214c34]">
              Partnership opportunities can include
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#626a67]">
              <li>• Sponsorships and scholarship funding</li>
              <li>• Food drives, clothing drives, and supply support</li>
              <li>• Medical missions and care partnerships</li>
              <li>• Technology, logistics, and volunteer team support</li>
            </ul>
          </div>
        </div>

        {/* Right – form */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Partnership Inquiry Form
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-[#626a67]">
            Tell us about your organization and the kind of support you want
            to offer, and we will reach out to discuss next steps.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => onInputChange("organizationName", e.target.value)}
                  placeholder="Enter organization name"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => onInputChange("contactPerson", e.target.value)}
                  placeholder="Enter contact person"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => onInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => onInputChange("country", e.target.value)}
                  placeholder="Enter country"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Partnership Type
                </label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => onInputChange("partnershipType", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select partnership type</option>
                  {partnershipTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Contribution Type
                </label>
                <select
                  value={formData.contributionType}
                  onChange={(e) => onInputChange("contributionType", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select contribution type</option>
                  {contributionTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Estimated Support
                </label>
                <input
                  type="text"
                  value={formData.estimatedSupport}
                  onChange={(e) => onInputChange("estimatedSupport", e.target.value)}
                  placeholder="Example: 500 meals, $5,000, 200 school kits"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => onInputChange("message", e.target.value)}
                placeholder="Tell us more about how your organization would like to partner with Pandie Foundation"
                rows={5}
                className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-4 text-sm text-[#5f6663]">
              <p className="font-semibold text-[#214c34]">How partnerships work</p>
              <div className="mt-3 space-y-2">
                <p>1. Submit your partnership inquiry</p>
                <p>2. Our team reviews your organization's interest</p>
                <p>3. We schedule the right next conversation with you</p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#d4a017] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
            >
              Submit Partnership Inquiry
            </button>
          </form>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-[#214c34] transition hover:text-[#d4a017]"
          >
            ← Back to Donate Money
          </button>
        </div>
      </div>
    </section>
  );
}