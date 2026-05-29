export default function Impact() {
  const stats = [
    {
      number: "500+",
      label: "Children Reached Through Support Programs",
    },
    {
      number: "300+",
      label: "Children Assisted with Education Needs",
    },
    {
      number: "200+",
      label: "Children Supported with Nutrition and Care",
    },
  ];

  return (
    <section className="bg-[#f8f6f1] py-20">
      <div className="mx-auto max-w-[1600px] px-6 text-center xl:px-10 2xl:px-16">
        <h2 className="text-5xl font-bold text-[#214c34]">Our Impact</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[#5f6663]">
          Every number represents a child whose life can change through care,
          opportunity, and consistent support.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.number}
              className="mx-auto flex h-72 w-72 flex-col items-center justify-center rounded-full border-[6px] border-[#5c7a61] bg-[#214c34] px-8 text-center text-white shadow-sm"
            >
              <p className="text-6xl font-bold text-[#efc75a]">
                {stat.number}
              </p>
              <p className="mt-4 text-base leading-7 text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}