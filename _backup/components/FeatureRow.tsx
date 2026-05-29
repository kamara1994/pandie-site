import Image from "next/image";
import Link from "next/link";

export default function FeatureRow() {
  return (
    <section className="bg-[#f3f1eb] py-24">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 lg:grid-cols-3 xl:px-10 2xl:px-16">
        <article className="grid gap-7">
          <div className="relative h-72 w-full overflow-hidden bg-gray-200">
            <Image
              src="/feature-story.jpg"
              alt="Child success story"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-4xl font-semibold leading-tight text-[#214c34]">
              A Child Back in School
            </h3>
            <p className="mt-5 text-[17px] leading-8 text-[#626a67]">
              Through support, encouragement, and basic school materials, a
              vulnerable child was able to return to class with confidence and
              renewed hope.
            </p>

            <Link
              href="#"
              className="mt-7 inline-block rounded-sm bg-[#efc75a] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#214c34] transition hover:opacity-90"
            >
              Success Stories
            </Link>
          </div>
        </article>

        <article className="grid gap-7">
          <div className="relative h-72 w-full overflow-hidden bg-gray-200">
            <Image
              src="/feature-program.jpg"
              alt="Nutrition and care support"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-4xl font-semibold leading-tight text-[#214c34]">
              Acts of Kindness
            </h3>
            <p className="mt-5 text-[17px] leading-8 text-[#626a67]">
              From meals and medical help to school support, every act of care
              restores dignity and protects the future of vulnerable children.
            </p>

            <Link
              href="#"
              className="mt-7 inline-block rounded-sm bg-[#efc75a] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#214c34] transition hover:opacity-90"
            >
              More Good News
            </Link>
          </div>
        </article>

        <article className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6d716f]">
            Featured Program
          </p>

          <h3 className="mt-3 text-5xl font-semibold leading-tight text-[#214c34]">
            Pandie Child Support Program
          </h3>

          <p className="mt-6 text-[17px] leading-8 text-[#626a67]">
            Our flagship program supports the most vulnerable children in Sierra
            Leone with education assistance, nutrition support, and access to
            basic medical care.
          </p>

          <Link
            href="#"
            className="mt-8 inline-block w-fit rounded-sm bg-[#efc75a] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#214c34] transition hover:opacity-90"
          >
            View Program
          </Link>
        </article>
      </div>
    </section>
  );
}