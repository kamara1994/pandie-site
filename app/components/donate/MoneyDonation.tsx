"use client";

import Link from "next/link";
import { CurrencyCode, FormData, currencyConfig } from "../../donate/types";

type ImpactItem = {
  amount: number | null;
  title: string;
  description: string;
};

type Props = {
  frequency: "one-time" | "monthly";
  currency: CurrencyCode;
  selectedAmount: string;
  formData: FormData;
  error: string;
  isSubmitting: boolean;
  impactItems: ImpactItem[];
  onFrequencyChange: (f: "one-time" | "monthly") => void;
  onCurrencyChange: (c: CurrencyCode) => void;
  onAmountChange: (a: string) => void;
  onInputChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function MoneyDonation({
  frequency,
  currency,
  selectedAmount,
  formData,
  error,
  isSubmitting,
  impactItems,
  onFrequencyChange,
  onCurrencyChange,
  onAmountChange,
  onInputChange,
  onSubmit,
}: Props) {
  const currentCurrency = currencyConfig[currency];

  return (
    <>
      {/* ── Impact cards + Donate form ── */}
      <section className="px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto grid w-full max-w-[1100px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

          {/* Left – Why your donation matters */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
            <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
              Why Your Donation Matters
            </h2>

            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#5f6663]">
              Pandie Foundation supports vulnerable children through school
              assistance, nutrition support, and basic healthcare. Your
              support helps children stay in school, receive care, and live
              with dignity, stability, and hope.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {impactItems.map((item) => {
                const isSelected =
                  item.amount !== null && selectedAmount === String(item.amount);

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      if (item.amount !== null) onAmountChange(String(item.amount));
                    }}
                    className={`rounded-xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] ${
                      isSelected
                        ? "border-[#214c34] bg-[#214c34] text-white"
                        : "border-[#ece6da] bg-[#f8f5ef] text-[#214c34]"
                    }`}
                  >
                    <h3
                      className={`text-2xl font-semibold ${
                        isSelected ? "text-white" : "text-[#214c34]"
                      }`}
                    >
                      {item.amount === null
                        ? "Custom"
                        : `${currentCurrency.symbol}${item.amount}`}
                    </h3>

                    <p
                      className={`mt-3 text-[15px] leading-7 ${
                        isSelected ? "text-white/85" : "text-[#626a67]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
              <h3 className="text-lg font-semibold text-[#214c34]">
                A donation with real purpose
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#626a67]">
                Every contribution helps us serve children with practical
                care. As the foundation grows, this page can be connected to
                a secure payment provider like Stripe, PayPal, or Flutterwave.
              </p>
            </div>
          </div>

          {/* Right – Donate Now form */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
              <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
                Donate Now
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#626a67]">
                Complete the form below to begin your donation journey. This
                structure is ready for a future secure payment integration.
              </p>

              {/* Currency */}
              <div className="mt-8">
                <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="NZD">NZD - New Zealand Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="SEK">SEK - Swedish Krona</option>
                  <option value="NOK">NOK - Norwegian Krone</option>
                  <option value="DKK">DKK - Danish Krone</option>
                  <option value="PLN">PLN - Polish Zloty</option>
                  <option value="TRY">TRY - Turkish Lira</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                  <option value="HKD">HKD - Hong Kong Dollar</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="THB">THB - Thai Baht</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="SLE">SLE - Sierra Leone Leone</option>
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="GHS">GHS - Ghanaian Cedi</option>
                  <option value="ZAR">ZAR - South African Rand</option>
                  <option value="KES">KES - Kenyan Shilling</option>
                </select>
              </div>

              {/* Donation Type toggle */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Donation Type
                </p>
                <div className="grid grid-cols-2 rounded-xl bg-[#f5f1e8] p-1">
                  <button
                    type="button"
                    onClick={() => onFrequencyChange("one-time")}
                    className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
                      frequency === "one-time"
                        ? "bg-[#214c34] text-white"
                        : "text-[#214c34]"
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => onFrequencyChange("monthly")}
                    className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
                      frequency === "monthly"
                        ? "bg-[#214c34] text-white"
                        : "text-[#214c34]"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Preset amounts */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Select Amount
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {currentCurrency.amounts.map((amount) => {
                    const value = String(amount);
                    const isActive = selectedAmount === value;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => onAmountChange(value)}
                        className={`rounded-xl border px-4 py-4 text-base font-bold transition ${
                          isActive
                            ? "border-[#214c34] bg-[#214c34] text-white"
                            : "border-[#ddd6c8] bg-white text-[#214c34] hover:border-[#5a7d5d]"
                        }`}
                      >
                        {currentCurrency.symbol}{amount}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form fields */}
              <form className="mt-8 space-y-5" onSubmit={onSubmit}>
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

                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                    Donation Amount
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6663]">
                      {currentCurrency.symbol}
                    </span>
                    <input
                      type="text"
                      value={selectedAmount}
                      onChange={(e) => onAmountChange(e.target.value)}
                      placeholder={currentCurrency.customPlaceholder}
                      className="w-full rounded-xl border border-[#d6d2c8] bg-white py-4 pl-12 pr-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[#6d746f]">
                    {frequency === "monthly"
                      ? `This amount will be treated as a monthly donation in ${currency}.`
                      : `This amount will be treated as a one-time donation in ${currency}.`}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => onInputChange("message", e.target.value)}
                    placeholder="Write an optional message"
                    rows={5}
                    className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Summary */}
                <div className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-4 text-sm text-[#5f6663]">
                  <p className="font-semibold text-[#214c34]">Donation Summary</p>
                  <div className="mt-3 space-y-2">
                    <p>
                      Type:{" "}
                      <span className="font-medium text-[#214c34]">
                        {frequency === "monthly" ? "Monthly" : "One-Time"}
                      </span>
                    </p>
                    <p>
                      Currency:{" "}
                      <span className="font-medium text-[#214c34]">{currency}</span>
                    </p>
                    <p>
                      Amount:{" "}
                      <span className="font-medium text-[#214c34]">
                        {currentCurrency.symbol}{selectedAmount || "0"}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#d4a017] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Preparing Donation..."
                    : `Continue ${frequency === "monthly" ? "Monthly" : "Donation"}`}
                </button>
              </form>

              <div className="mt-5 grid gap-3 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-4 text-sm text-[#5f6663]">
                <p>• Donation-focused design built for clarity and trust</p>
                <p>• Future-ready for Stripe, PayPal, or Flutterwave integration</p>
                <p>• Supporting vulnerable children in Sierra Leone</p>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#6d746f]">
                Final payment currency availability may depend on the payment
                provider used at checkout.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-[#214c34] transition hover:text-[#d4a017]"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact banner ── */}
      <section className="px-5 pb-12 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl bg-[#214c34] p-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                What Your Gift Can Do
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Every donation becomes practical help
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/85">
                Your generosity supports real needs and creates meaningful
                change in the lives of vulnerable children.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {impactItems.slice(0, 3).map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-[#f0c857]">
                    {currentCurrency.symbol}{item.amount}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}