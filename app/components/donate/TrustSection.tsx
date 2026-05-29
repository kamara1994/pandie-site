export default function TrustSection() {
  return (
    <section className="bg-[#0a1a10] px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Why You Can Trust Us</span>
          <h2 className="mt-4 font-heading text-[clamp(34px,4vw,54px)] font-semibold text-white">
            Your Trust Is<br /><em className="italic text-[#e8b84b]">Everything to Us</em>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[16px] leading-8 text-white/55">
            Pandie Foundation is committed to using every dollar responsibly, transparently, and with the children always at the center.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🛡️", title: "Responsible Use", desc: "Every donation is directed to the programs that need it most — education, nutrition, medical care, and protection." },
            { icon: "📊", title: "Full Transparency", desc: "We are building a foundation rooted in accountability. Our impact is measured and reported honestly." },
            { icon: "🔒", title: "Secure Giving", desc: "Payments are processed through trusted, industry-standard providers. Your data is always protected." },
            { icon: "💯", title: "100% to Children", desc: "Administrative costs are minimized so your gift goes directly to the children who need it most." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="border border-white/10 p-7 transition-all duration-300 hover:border-[#c9962a]/40">
              <span className="text-3xl mb-5 block">{icon}</span>
              <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
              <h3 className="font-heading text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-[14px] leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </div>

        {/* Payment methods note */}
        <div className="mt-12 border-t border-white/10 pt-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/30 mb-4">Secure Payment Processing</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Visa", "Mastercard", "American Express", "Apple Pay", "Google Pay"].map(method => (
              <span key={method} className="border border-white/10 px-4 py-2 text-[12px] font-semibold text-white/40">{method}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
