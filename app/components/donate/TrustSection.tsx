export default function TrustSection() {
  return (
    <section className="px-5 pb-20 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-[900px] rounded-2xl bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
          Your Trust Matters
        </h2>

        <p className="mt-6 text-lg leading-8 text-[#5f6663]">
          Pandie Foundation is committed to using every donation responsibly
          and transparently to support vulnerable children in Sierra Leone.
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-[#214c34]">
              Responsible Use
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#626a67]">
              Donations support education, nutrition programs, and essential
              medical care for children in need.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#214c34]">
              Transparency
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#626a67]">
              We are building a foundation rooted in accountability,
              integrity, and measurable impact.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#214c34]">
              Secure Giving
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#626a67]">
              Future integrations will use trusted payment providers such as
              Stripe, PayPal, or Flutterwave.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-[#6d746f]">
          Thank you for helping us bring hope, dignity, and opportunity to
          children who need it most.
        </p>
      </div>
    </section>
  );
}