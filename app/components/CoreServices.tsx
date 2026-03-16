import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Education Support",
    description:
      "Helping vulnerable children stay in school through supplies, learning materials, encouragement, and practical academic support.",
    image: "/service-education.jpg",
    button: "Explore Program",
    href: "#",
  },
  {
    title: "Nutrition Support",
    description:
      "Providing food assistance and child-centered nutrition support for children facing hunger and malnutrition.",
    image: "/service-nutrition.jpg",
    button: "Explore Program",
    href: "#",
  },
  {
    title: "Medical Assistance",
    description:
      "Helping children access basic medical care, treatment, and urgent health support when families cannot afford it.",
    image: "/service-medical.jpg",
    button: "Explore Program",
    href: "#",
  },
  {
    title: "Child Protection",
    description:
      "Standing with vulnerable children through care, advocacy, and support that restores dignity, safety, and hope.",
    image: "/service-protection.jpg",
    button: "Explore Program",
    href: "#",
  },
];

export default function CoreServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] py-24 sm:py-28 xl:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-16 h-72 w-72 rounded-full bg-[#214c34]/[0.04] blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#c79a2b]/[0.07] blur-3xl" />
      </div>

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.38em] text-[#c79a2b]">
            Pandie Foundation
          </span>

          <h2 className="mt-5 text-5xl font-semibold leading-[1.05] text-[#214c34] sm:text-6xl xl:text-7xl">
            Our Programs
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6663] sm:text-xl">
            We serve vulnerable children in Sierra Leone through education,
            nutrition, medical care, and compassionate protection designed to
            restore dignity and build lasting hope.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-[22px] border border-[#e8e1d3] bg-white/95 shadow-[0_14px_40px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]"
            >
              <div className="relative h-72 overflow-hidden bg-[#d9dde3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2418]/50 via-[#0f2418]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              </div>

              <div className="flex min-h-[320px] flex-col p-7">
                <div className="h-[3px] w-14 rounded-full bg-[#c79a2b] transition-all duration-500 group-hover:w-20" />

                <h3 className="mt-5 text-[2rem] font-semibold leading-tight text-[#214c34]">
                  {service.title}
                </h3>

                <p className="mt-4 text-[15.5px] leading-8 text-[#626a67]">
                  {service.description}
                </p>

                <div className="mt-8">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-3 rounded-full bg-[#214c34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#183826]"
                  >
                    {service.button}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#c79a2b] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}