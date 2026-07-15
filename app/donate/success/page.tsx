import Link from "next/link";
import Stripe from "stripe";
import ConfettiEffect from "@/app/components/ConfettiEffect";

const ZERO_DECIMAL = new Set([
  "BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA",
  "PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF",
]);

function formatAmount(amountTotal: number | null, currency: string): string {
  if (!amountTotal || !currency) return "";
  const display = ZERO_DECIMAL.has(currency.toUpperCase()) ? amountTotal : amountTotal / 100;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(display);
  } catch {
    return `${currency.toUpperCase()} ${display}`;
  }
}

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; donation_id?: string; txn_id?: string }>;
}) {
  const params = await searchParams;
  const { session_id, donation_id, txn_id } = params;

  let stripeSession: Stripe.Checkout.Session | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    } catch { /* Show generic success */ }
  }

  const isMonthly   = stripeSession?.metadata?.frequency === "monthly";
  const donorEmail  = stripeSession?.customer_email ?? stripeSession?.metadata?.donorEmail ?? "";
  const donorName   = (stripeSession?.metadata as Record<string,string> | null)?.donorName ?? "";
  const formattedAmount = stripeSession
    ? formatAmount(stripeSession.amount_total, stripeSession.currency ?? "USD") : "";

  const stripePaymentStatus = stripeSession?.payment_status ?? null;
  const stripePaid = stripePaymentStatus === "paid" || stripePaymentStatus === "no_payment_required";

  const rawRef      = session_id ?? donation_id ?? txn_id;
  const donationRef = rawRef
    ? `PF-${rawRef.replace(/[^A-Za-z0-9]/g, "").slice(-10).toUpperCase()}` : "PF-CONFIRMED";

  const provider     = session_id ? "stripe" : "paypal";
  const paypalVerified = Boolean(donation_id || txn_id) && !session_id;

  const shareText = encodeURIComponent(
    `I just donated to Pandie Foundation — helping vulnerable children in Sierra Leone access education, nutrition, and medical care. Join me: pandiefoundation.org/donate`
  );
  const shareUrl = encodeURIComponent("https://pandiefoundation.org/donate");

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      <ConfettiEffect />

      {/* ── Celebration Hero ── */}
      <section className="relative overflow-hidden bg-[#0a1a10] py-28 text-white lg:py-36">
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Aurora glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9962a]/[0.07] blur-[120px]" />
          <div className="absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#6aab7e]/[0.06] blur-[100px]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">

          {/* Pulsing checkmark */}
          <div className="relative mx-auto mb-8 w-fit">
            <div className="absolute inset-0 rounded-full bg-[#c9962a]/15 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-3 rounded-full border border-[#c9962a]/20 animate-ping" style={{ animationDuration: "2.6s", animationDelay: "0.3s" }} />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#c9962a]/50 bg-[#c9962a]/12 shadow-[0_0_40px_rgba(201,150,42,0.3)]">
              <svg className="h-11 w-11 text-[#c9962a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c9962a]">
            Donation Confirmed ✦
          </p>

          <h1 className="font-heading text-[clamp(38px,5vw,66px)] font-semibold leading-tight">
            {donorName ? `Thank You, ${donorName.split(" ")[0]}` : "Thank You"}{" "}
            <br /><em className="italic text-[#e8b84b]">for Changing a Life</em>
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/65">
            {isMonthly
              ? "Your monthly gift means a child in Sierra Leone will have consistent support — every single month."
              : "Your generosity today will directly reach a child in Sierra Leone who needs education, food, or medical care."}
          </p>

          {/* Amount display */}
          {formattedAmount && (
            <div className="mt-10 inline-flex flex-col items-center gap-1.5 rounded-2xl border border-[#c9962a]/25 bg-[#c9962a]/10 px-12 py-7 shadow-[0_0_40px_rgba(201,150,42,0.12)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#c9962a]">
                {isMonthly ? "Monthly Gift" : "One-Time Gift"}
              </span>
              <span className="font-heading text-5xl font-semibold text-white">
                {formattedAmount}
              </span>
              {isMonthly && (
                <span className="text-[13px] text-white/45">per month · cancel anytime</span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Impact cards ── */}
      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.32em] text-[#c9962a]">
            Here&apos;s what your gift makes possible
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: "📚", label: "School supplies for a child" },
              { emoji: "🍽️", label: "A week of meals" },
              { emoji: "💊", label: "Basic medical care" },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-[#e7dfd0] bg-white px-3 py-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <span className="text-3xl">{emoji}</span>
                <p className="text-[12px] leading-4 text-[#5f6663]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation details card ── */}
      <section className="px-5 pb-10 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-[#214c34]">
              {stripePaid || paypalVerified ? "Donation Confirmed" : "Donation Submitted"}
            </h2>

            <div className="mt-6 space-y-4 text-sm text-[#5f6663]">
              <div className="flex items-center justify-between border-b border-[#ece6da] pb-4">
                <span>Reference</span>
                <span className="font-mono text-xs font-semibold text-[#214c34]">{donationRef}</span>
              </div>
              {provider && (
                <div className="flex items-center justify-between border-b border-[#ece6da] pb-4">
                  <span>Processed via</span>
                  <span className="font-semibold capitalize text-[#214c34]">
                    {provider === "stripe" ? "Stripe (Card / Wallet)" : "PayPal"}
                  </span>
                </div>
              )}
              {donorEmail && (
                <div className="flex items-center justify-between border-b border-[#ece6da] pb-4">
                  <span>Confirmation sent to</span>
                  <span className="font-semibold text-[#214c34]">{donorEmail}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Status</span>
                {stripePaid || paypalVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />Payment Received
                  </span>
                ) : stripePaymentStatus === "unpaid" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Processing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f1e8] px-3 py-1 text-xs font-bold text-[#214c34]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#214c34]" />Submitted
                  </span>
                )}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/donate"
                className="gold-cta flex-1 rounded-xl bg-[#c9962a] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]">
                Give Again
              </Link>
              <Link href="/"
                className="flex-1 rounded-xl border border-[#214c34] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#214c34] transition hover:bg-[#214c34] hover:text-white">
                Return Home
              </Link>
            </div>
          </div>

          {/* Share section */}
          <div className="mt-8 rounded-2xl border border-[#e7dfd0] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <p className="text-center text-[12px] font-bold uppercase tracking-[0.24em] text-[#214c34]">
              Spread the word — your share saves more children
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={`https://twitter.com/intent/tweet?text=${shareText}`}
                target="_blank" rel="noopener noreferrer"
                className="gold-cta inline-flex items-center gap-2 rounded-lg bg-[#c9962a] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5">
                Share on X
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#214c34] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#214c34] transition hover:bg-[#214c34] hover:text-white">
                Share on Facebook
              </a>
              <a href={`https://wa.me/?text=${shareText}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#214c34]/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#214c34]/70 transition hover:border-[#214c34] hover:text-[#214c34]">
                WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-[15px] leading-8 text-[#5f6663]">
            🌟 You planted hope today. Thank you for seeing these children and choosing to act.
          </p>
        </div>
      </section>
    </div>
  );
}
