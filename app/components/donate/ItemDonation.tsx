"use client";

import {
  ItemDonationFormData,
  itemCategories,
  itemConditions,
  deliveryMethods,
} from "../../donate/types";

type Props = {
  formData: ItemDonationFormData;
  error: string;
  onInputChange: (field: keyof ItemDonationFormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export default function ItemDonation({
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
            Donate Essential Items
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Give More Than Money
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-[#5f6663]">
            Support children and families by donating practical items that
            can be distributed through education, nutrition, and care
            programs in Sierra Leone.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {itemCategories.map((category) => (
              <div
                key={category}
                className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] px-4 py-4 text-sm font-medium text-[#214c34]"
              >
                {category}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
            <h3 className="text-lg font-semibold text-[#214c34]">
              Example items donors can give
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#626a67]">
              <li>• School bags, notebooks, pens, uniforms, textbooks</li>
              <li>• Rice, beans, canned food, baby food, cooking oil</li>
              <li>• Clothes, shoes, blankets, hygiene kits, diapers</li>
              <li>• Gloves, masks, first-aid items, basic medical supplies</li>
            </ul>
          </div>
        </div>

        {/* Right – form */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Item Donation Form
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-[#626a67]">
            Tell us what you would like to donate, and our team can review
            the request and coordinate drop-off, pickup, or shipping.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => onInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

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
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => onInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => onInputChange("country", e.target.value)}
                  placeholder="Enter your country"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => onInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Donation Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => onInputChange("category", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select a category</option>
                  {itemCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Item Name
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => onInputChange("itemName", e.target.value)}
                  placeholder="Example: notebooks, shoes, rice"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Quantity
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => onInputChange("quantity", e.target.value)}
                  placeholder="Example: 10 boxes, 4 bags, 25 pieces"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => onInputChange("condition", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select condition</option>
                  {itemConditions.map((condition) => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Delivery Method
                </label>
                <select
                  value={formData.deliveryMethod}
                  onChange={(e) => onInputChange("deliveryMethod", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select delivery method</option>
                  {deliveryMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => onInputChange("preferredDate", e.target.value)}
                className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onInputChange("description", e.target.value)}
                placeholder="Add any extra details about the items, packaging, delivery, or special notes"
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
              <p className="font-semibold text-[#214c34]">How item donations work</p>
              <div className="mt-3 space-y-2">
                <p>1. Submit the item donation form</p>
                <p>2. Our team reviews your donation details</p>
                <p>3. We contact you to coordinate delivery or pickup</p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#d4a017] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
            >
              Submit Item Donation
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