import Image from "next/image";
import Link from "next/link";

export default function FeatureRow() {
  return (
    <section className="bg-[#f4f1ea] py-20 px-6 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_420px] items-start">

          {/* Story 1 — A Child Back in School */}
          <article className="group">
            <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/feature-story.jpg"
                alt="A child back in school"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-heading text-[clamp(24px,2.5vw,32px)] font-semibold text-[#214c34] leading-tight mb-4">
              A Child Back in School
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-6">
              Through support, encouragement, and basic school materials, a vulnerable child was able to return to class with confidence and renewed hope.
            </p>
            <Link
              href="/stories"
              className="inline-block bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]"
            >
              Success Stories
            </Link>
          </article>

          {/* Story 2 — Acts of Kindness */}
          <article className="group">
            <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/feature-program.jpg"
                alt="Acts of kindness"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-heading text-[clamp(24px,2.5vw,32px)] font-semibold text-[#214c34] leading-tight mb-4">
              Acts of Kindness
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-6">
              From meals and medical help to school support, every act of care restores dignity and protects the future of vulnerable children.
            </p>
            <Link
              href="/stories"
              className="inline-block bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]"
            >
              More Good News
            </Link>
          </article>

          {/* Featured Program sidebar */}
          <aside className="lg:pl-8 lg:border-l border-[#1a2e1f]/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#626a67] mb-4">
              Featured Program
            </p>
            <h3 className="font-heading text-[clamp(28px,3vw,42px)] font-semibold text-[#214c34] leading-tight mb-5">
              Pandie Child Support Program
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-8">
              Our flagship program supports the most vulnerable children in Sierra Leone with education assistance, nutrition support, and access to basic medical care.
            </p>
            <Link
              href="/programs"
              className="inline-block bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]"
            >
              View Program
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
