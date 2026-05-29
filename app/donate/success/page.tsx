import Link from "next/link";
import Stripe from "stripe";

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
    } catch {
      // Session fetch failed — show generic success
    }
  }

  const isMonthly = stripeSession?.metadata?.frequency === "monthly";
  const donorEmail =
    stripeSession?.customer_email ||
    stripeSession?.metadata?.donorEmail ||
    "";
  const formattedAmount = stripeSession
    ? formatAmount(stripeSession.amount_total, stripeSession.currency ?? "USD")
    : "";

  // payment_status is the authoritative Stripe field — webhook is the real verification.
  // "paid"             → payment captured (cards, wallets)
  // "no_payment_required" → free / coupon
  // "unpaid"           → async method still pending
  const stripePaymentStatus = stripeSession?.payment_status ?? null;
  const stripePaid = stripePaymentStatus === "paid" || stripePaymentStatus === "no_payment_required";

  // Build a safe, short donation reference
  const rawRef = session_id ?? donation_id ?? txn_id;
  const donationRef = rawRef
    ? `PF-${rawRef.replace(/[^A-Za-z0-9]/g, "").slice(-10).toUpperCase()}`
    : "PF-CONFIRMED";

  const provider = session_id ? "stripe" : "paypal";

  // PayPal success: capture already verified server-side in /api/paypal/capture-order
  const paypalVerified = Boolean(donation_id || txn_id) && !session_id;

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1a10] py-28 text-white lg:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          {/* Checkmark icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c9962a]/40 bg-[#c9962a]/10">
            <svg
              className="h-10 w-10 text-[#c9962a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">
            Donation Received
          </p>

          <h1 className="font-heading text-[clamp(36px,5vw,62px)] font-semibold leading-tight">
            Thank You for Your{" "}
            <em className="italic text-[#e8b84b]">Generosity</em>
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Your donation supports vulnerable children in Sierra Leone through
            education, nutrition, and medical care. Every gift makes a real difference.
          </p>

          {formattedAmount && (
            <div className="mt-10 inline-flex flex-col items-center gap-1 rounded-2xl border border-[#c9962a]/20 bg-[#c9962a]/10 px-10 py-6">
              <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#c9962a]">
                {isMonthly ? "Monthly Donation" : "One-Time Donation"}
              </span>
              <span className="font-heading text-4xl font-semibold text-white">
                {formattedAmount}
              </span>
              {isMonthly && (
                <span className="text-sm text-white/50">per month · you may cancel anytime</span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Details card */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10">
            <h2 className="text-2xl font-semibold text-[#214c34]">
              {stripePaid || paypalVerified ? "Donation Received" : "Donation Submitted"}
            </h2>

            <div className="mt-6 space-y-4 text-sm text-[#5f6663]">
              <div className="flex items-center justify-between border-b border-[#ece6da] pb-4">
                <span>Donation Reference</span>
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
                  <span>Confirmation email</span>
                  <span className="font-semibold text-[#214c34]">{donorEmail}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Payment Status</span>
                {stripePaid || paypalVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Payment Received
                  </span>
                ) : stripePaymentStatus === "unpaid" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Processing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f1e8] px-3 py-1 text-xs font-bold text-[#214c34]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#214c34]" />
                    Submitted
                  </span>
                )}
              </div>
            </div>

            {/* Honest note: server-side webhook is the real confirmation source */}
            {(stripePaid || paypalVerified) && donorEmail && (
              <div className="mt-4 rounded-lg border border-[#e7dfd0] bg-[#fcfaf6] px-4 py-3 text-sm text-[#5f6663]">
                A confirmation email will be sent to <strong>{donorEmail}</strong> by your payment
                provider. Pandie Foundation will also follow up once your donation is recorded.
              </div>
            )}

            <div className="mt-8 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-5 text-sm leading-7 text-[#5f6663]">
              <p className="font-semibold text-[#214c34]">Your donation supports Pandie Foundation&apos;s mission</p>
              <p className="mt-2">
                to help vulnerable children in Sierra Leone access education, nutrition, and medical
                care. Thank you for choosing to make a difference.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="flex-1 rounded-xl border border-[#214c34] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#214c34] transition hover:bg-[#214c34] hover:text-white"
              >
                Give Again
              </Link>
              <Link
                href="/"
                className="flex-1 rounded-xl bg-[#d4a017] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#173325] transition hover:opacity-90"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
