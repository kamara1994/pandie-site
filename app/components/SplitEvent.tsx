import Image from "next/image";
import Link from "next/link";

export default function SplitEvent() {
  return (
    <section className="grid min-h-[460px] lg:grid-cols-2">
      <div className="flex items-center bg-[#b5332f] px-6 py-16 text-white lg:px-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Upcoming Campaign
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
            Back to School & Child Wellness Drive
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/90">
            Join us as we provide school materials, nutrition support, and basic
            health assistance for vulnerable children in Sierra Leone. Together,
            we can help children return to school healthier, safer, and full of
            hope.
          </p>

          <Link
            href="#"
            className="mt-8 inline-block rounded-md border border-white px-6 py-4 font-semibold text-white transition hover:bg-white hover:text-[#b5332f]"
          >
            View Event
          </Link>
        </div>
      </div>

      <div className="relative min-h-[460px] bg-gray-200">
        <Image
          src="/event.jpg"
          alt="Pandie Foundation event support"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}