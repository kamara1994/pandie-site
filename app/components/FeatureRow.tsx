"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function FeatureRow() {
  const { ref, inView } = useInView();

  const reveal = (delay: number, axis: "Y" | "X" = "Y", dir: 1 | -1 = 1): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate(0,0)" : axis === "Y" ? `translateY(${dir * 28}px)` : `translateX(${dir * 28}px)`,
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  });

  return (
    <section className="bg-[#f4f1ea] py-20 px-6 lg:px-20 xl:px-28">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_420px] items-start">

          {/* Story 1 */}
          <article className="group" style={reveal(0)}>
            <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <Image src="/feature-story.jpg" alt="A child back in school" fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACQQAAIBBAICAwEAAAAAAAAAAAECAwQREiExBRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmqmvI7bVR215ijAOpHWJvhY790WD4qFbQtdPLbyWkE1uSZjKpJI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <h3 className="font-heading text-[clamp(24px,2.5vw,32px)] font-semibold text-[#214c34] leading-tight mb-4">
              A Child Back in School
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-6">
              Through support, encouragement, and basic school materials, a vulnerable child was able to return to class with confidence and renewed hope.
            </p>
            <Link href="/stories"
              className="group relative inline-block overflow-hidden bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]">
              <span className="relative z-10">Success Stories</span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
          </article>

          {/* Story 2 */}
          <article className="group" style={reveal(140)}>
            <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <Image src="/feature-program.jpg" alt="Acts of kindness" fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACQQAAIBBAICAwEAAAAAAAAAAAECAwQREiExBRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmqmvI7bVR215ijAOpHWJvhY790WD4qFbQtdPLbyWkE1uSZjKpJI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <h3 className="font-heading text-[clamp(24px,2.5vw,32px)] font-semibold text-[#214c34] leading-tight mb-4">
              Acts of Kindness
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-6">
              From meals and medical help to school support, every act of care restores dignity and protects the future of vulnerable children.
            </p>
            <Link href="/stories"
              className="group relative inline-block overflow-hidden bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]">
              <span className="relative z-10">More Good News</span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
          </article>

          {/* Featured Program sidebar */}
          <aside className="lg:pl-8 lg:border-l border-[#1a2e1f]/10" style={reveal(280, "X", 1)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#626a67] mb-4">
              Featured Program
            </p>
            <h3 className="font-heading text-[clamp(28px,3vw,42px)] font-semibold text-[#214c34] leading-tight mb-5">
              Pandie Child Support Program
            </h3>
            <p className="text-[15px] leading-7 text-[#626a67] mb-8">
              Our flagship program supports the most vulnerable children in Sierra Leone with education assistance, nutrition support, and access to basic medical care.
            </p>
            <Link href="/programs"
              className="group relative inline-block overflow-hidden bg-[#c9962a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]">
              <span className="relative z-10">View Program</span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
