"use client";

import Link from "next/link";
import { CurrencyCode, FormData, currencyConfig } from "../../donate/types";
import PayPalDonation from "./PayPalDonation";

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
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
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
              Give Hope. Change a Child&apos;s Future.
            </h2>

            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#5f6663]">
              Pandie Foundation supports vulnerable children in Sierra Leone through
              education, nutrition, and basic medical care. Your donation directly
              helps children stay in school, receive proper meals, access healthcare,
              and live with dignity and hope.
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
                Secure &amp; Trusted Giving
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#626a67]">
                All card payments are processed securely by Stripe. Apple Pay and
                Google Pay are available at checkout. PayPal and Venmo are also
                accepted. Your card details are never stored by Pandie Foundation.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayPal", "Venmo"].map(
                  (m) => (
                    <span
                      key={m}
                      className="rounded border border-[#e0d9cc] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7a8078]"
                    >
                      {m}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Right – Donate Now */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
              <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
                Donate Now
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-[#626a67]">
                Your donation supports Pandie Foundation&apos;s mission to help vulnerable
                children in Sierra Leone.
              </p>

              {/* Currency */}
              <div className="mt-8">
                <label
                  htmlFor="currency-select"
                  className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                >
                  Currency
                </label>
                <select
                  id="currency-select"
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

              {/* Frequency */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Donation Type
                </p>
                <div className="grid grid-cols-2 rounded-xl bg-[#f5f1e8] p-1">
                  {(["one-time", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => onFrequencyChange(f)}
                      className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
                        frequency === f
                          ? "bg-[#214c34] text-white"
                          : "text-[#214c34]"
                      }`}
                    >
                      {f === "one-time" ? "One-Time" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset amounts */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Select Amount
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {currentCurrency.amounts.map((amt) => {
                    const value = String(amt);
                    const isActive = selectedAmount === value;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => onAmountChange(value)}
                        className={`rounded-xl border px-4 py-4 text-base font-bold transition ${
                          isActive
                            ? "border-[#214c34] bg-[#214c34] text-white"
                            : "border-[#ddd6c8] bg-white text-[#214c34] hover:border-[#5a7d5d]"
                        }`}
                      >
                        {currentCurrency.symbol}{amt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Donor details + Stripe submit */}
              <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
                {/* Full name */}
                <div>
                  <label
                    htmlFor="donor-name"
                    className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                  >
                    Full Name
                  </label>
                  <input
                    id="donor-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => onInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="donor-email"
                    className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                  >
                    Email Address <span className="text-[#214c34]/60 normal-case font-normal">— required for receipt</span>
                  </label>
                  <input
                    id="donor-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                  />
                </div>

                {/* Phone (optional) */}
                <div>
                  <label
                    htmlFor="donor-phone"
                    className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                  >
                    Phone <span className="text-[#214c34]/60 normal-case font-normal">— optional</span>
                  </label>
                  <input
                    id="donor-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onInputChange("phone", e.target.value)}
                    placeholder="e.g. +1 555 000 0000"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                  />
                </div>

                {/* Donation amount (custom) */}
                <div>
                  <label
                    htmlFor="donor-amount"
                    className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                  >
                    Donation Amount
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6663]">
                      {currentCurrency.symbol}
                    </span>
                    <input
                      id="donor-amount"
                      type="text"
                      inputMode="decimal"
                      value={selectedAmount}
                      onChange={(e) => onAmountChange(e.target.value)}
                      placeholder={currentCurrency.customPlaceholder}
                      className="w-full rounded-xl border border-[#d6d2c8] bg-white py-4 pl-12 pr-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[#6d746f]">
                    {frequency === "monthly"
                      ? `Charged monthly in ${currency}. Cancel anytime.`
                      : `One-time donation in ${currency}.`}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="donor-message"
                    className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]"
                  >
                    Message <span className="text-[#214c34]/60 normal-case font-normal">— optional</span>
                  </label>
                  <textarea
                    id="donor-message"
                    value={formData.message}
                    onChange={(e) => onInputChange("message", e.target.value)}
                    placeholder="Leave an optional message of support"
                    rows={3}
                    className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => onInputChange("anonymous", e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#d6d2c8] accent-[#214c34]"
                    />
                    <span className="text-sm leading-6 text-[#5f6663]">
                      Make my donation anonymous (your name will not be shared)
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.emailUpdates}
                      onChange={(e) => onInputChange("emailUpdates", e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#d6d2c8] accent-[#214c34]"
                    />
                    <span className="text-sm leading-6 text-[#5f6663]">
                      Keep me updated on Pandie Foundation&apos;s impact and programs
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Summary */}
                <div className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-4 text-sm text-[#5f6663]">
                  <p className="font-semibold text-[#214c34]">Donation Summary</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <span className="font-medium text-[#214c34]">
                        {frequency === "monthly" ? "Monthly" : "One-Time"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Currency</span>
                      <span className="font-medium text-[#214c34]">{currency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Amount</span>
                      <span className="font-medium text-[#214c34]">
                        {currentCurrency.symbol}{selectedAmount || "0"}
                        {frequency === "monthly" ? "/mo" : ""}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-[#9a9490]">
                    Your donation supports Pandie Foundation&apos;s mission to help vulnerable children
                    in Sierra Leone.
                  </p>
                </div>

                {/* Stripe CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#214c34] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#1a3d29] disabled:cursor-not-allowed disabled:opacity-70"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                      </svg>
                      Preparing Secure Checkout…
                    </>
                  ) : (
                    <>
                      {frequency === "monthly" ? "Start Monthly Giving" : "Donate with Card"}
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#9a9490]">
                  🔒 Secured by Stripe · Apple Pay &amp; Google Pay available at checkout
                </p>
              </form>

              {/* PayPal / Venmo section */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#e7dfd0]" />
                  <span className="text-sm font-medium text-[#9a9490]">or pay with</span>
                  <div className="h-px flex-1 bg-[#e7dfd0]" />
                </div>

                <div className="mt-5">
                  <PayPalDonation
                    amount={selectedAmount}
                    currency={currency}
                    frequency={frequency}
                    donorName={formData.anonymous ? "Anonymous" : formData.fullName}
                    donorEmail={formData.email}
                    phone={formData.phone}
                    message={formData.message}
                    anonymous={formData.anonymous}
                  />
                </div>
              </div>

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
