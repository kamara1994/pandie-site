import Link from "next/link";

export default function DonateCancelPage() {
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
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/10 bg-white/5">
            <svg
              className="h-10 w-10 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">
            Donation Cancelled
          </p>

          <h1 className="font-heading text-[clamp(36px,5vw,62px)] font-semibold leading-tight">
            No Payment Was <em className="italic text-[#e8b84b]">Processed</em>
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Your donation was cancelled and no charge was made. You are always
            welcome to try again whenever you are ready.
          </p>
        </div>
      </section>

      {/* Card */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10">
            <h2 className="text-2xl font-semibold text-[#214c34]">Payment Not Completed</h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f6663]">
              Your payment was not completed. Nothing has been charged to your card or PayPal account.
              If this was a mistake, you can return to the donation page and try again.
            </p>

            <div className="mt-6 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-5 text-sm leading-7 text-[#5f6663]">
              <p className="font-semibold text-[#214c34]">Still want to help?</p>
              <p className="mt-2">
                Vulnerable children in Sierra Leone depend on people like you.
                Your donation — no matter the size — provides education, meals, and medical
                care to a child who needs it most.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="flex-1 rounded-xl bg-[#d4a017] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#173325] transition hover:opacity-90"
              >
                Try Again
              </Link>
              <Link
                href="/"
                className="flex-1 rounded-xl border border-[#214c34] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#214c34] transition hover:bg-[#214c34] hover:text-white"
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
