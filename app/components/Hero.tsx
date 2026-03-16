import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="relative h-[500px] w-full overflow-hidden sm:h-[540px] lg:h-[600px] xl:h-[640px]">
        {/* Main hero image — KEEP ORIGINAL LOOK */}
        <div className="absolute inset-0 scale-[1.8] sm:scale-[1.6] lg:scale-[1.4] xl:scale-[1.3]">
          <Image
            src="/hero04.png"
            alt="Children supported by Pandie Foundation"
            fill
            priority
            className="object-contain object-[25%_center]"
          />
        </div>

        {/* Right content panel */}
        <div className="absolute bottom-0 right-0 top-0 flex w-[320px] flex-col justify-center overflow-hidden sm:w-[370px] lg:w-[420px] xl:w-[460px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/laugingchildren.png"
              alt="Laughing children"
              fill
              className="object-cover object-center opacity-35"
            />
          </div>

          {/* Premium layered overlay */}
          <div className="absolute inset-0 bg-[#476a4f]/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#6f8e72]/28 via-[#4c6d53]/40 to-[#173325]/58" />
          <div className="absolute inset-0 backdrop-blur-[1.5px]" />

          {/* Soft gold glow */}
          <div className="absolute left-[-20px] top-16 h-32 w-32 rounded-full bg-[#d4a017]/10 blur-3xl" />

          {/* Text */}
          <div className="relative z-10 px-7 py-8 sm:px-8 lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f0c857] sm:text-xs">
              Pandie Foundation
            </p>

            <h1 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              The Mother of All
            </h1>

            <div className="mt-5 h-[3px] w-14 rounded-full bg-[#d4a017]" />

            <p className="mt-5 text-sm leading-8 text-white/90 sm:text-base sm:leading-8">
              Supporting vulnerable children in Sierra Leone through
              education, nutrition, and basic medical care so they can grow,
              learn, and live with dignity and hope.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-[#d4a017] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173325] transition duration-300 hover:bg-[#e0b63f]"
              >
                Learn More
              </Link>

              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/8 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition duration-300 hover:bg-white/14"
              >
                Get Involved
              </Link>
            </div>
          </div>

          {/* Left edge highlight */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/15" />
        </div>
      </div>
    </section>
  );
}