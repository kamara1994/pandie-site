// Payment-method brand marks (inline SVG/text — no external assets, CSP-safe).
// Standard acceptance marks shown for donor trust near the checkout CTA.
export default function PaymentMarks({ className = "" }: { className?: string }) {
  const badge =
    "flex h-8 items-center justify-center rounded-md bg-white px-2.5 ring-1 ring-black/10";
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`} aria-label="Accepted payment methods">
      {/* Visa */}
      <span className={badge} title="Visa">
        <span className="text-[13px] font-extrabold italic tracking-tight text-[#1A1F71]">VISA</span>
      </span>
      {/* Mastercard */}
      <span className={badge} title="Mastercard">
        <svg width="30" height="19" viewBox="0 0 30 19" aria-hidden="true">
          <circle cx="11.5" cy="9.5" r="8" fill="#EB001B" />
          <circle cx="18.5" cy="9.5" r="8" fill="#F79E1B" fillOpacity="0.9" />
          <path d="M15 3.2a7.98 7.98 0 010 12.6 7.98 7.98 0 010-12.6z" fill="#FF5F00" />
        </svg>
      </span>
      {/* Apple Pay */}
      <span className={badge} title="Apple Pay">
        <svg width="14" height="16" viewBox="0 0 384 512" aria-hidden="true" className="mr-1">
          <path fill="#000" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <span className="text-[13px] font-semibold text-black">Pay</span>
      </span>
      {/* PayPal */}
      <span className={badge} title="PayPal">
        <span className="text-[13px] font-extrabold italic tracking-tight">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#009CDE]">Pal</span>
        </span>
      </span>
      {/* Stripe */}
      <span className={badge} title="Stripe">
        <span className="text-[13px] font-extrabold tracking-tight text-[#635BFF]">stripe</span>
      </span>
    </div>
  );
}
