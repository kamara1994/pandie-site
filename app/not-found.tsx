import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a1a10] px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

      <div className="relative z-10 max-w-2xl">
        <div className="relative mx-auto mb-8 h-20 w-20 overflow-hidden rounded-full border-2 border-[#c9962a]/40">
          <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover opacity-80" />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c9962a]">Page Not Found</p>

        <h1 className="mt-4 font-heading text-[clamp(80px,15vw,180px)] font-semibold leading-none text-white/10">404</h1>

        <h2 className="mt-2 font-heading text-[clamp(28px,4vw,48px)] font-semibold text-white">
          This page doesn&apos;t exist —<br />
          <em className="italic text-[#e8b84b]">but the children do</em>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-[16px] leading-8 text-white/55">
          The page you&apos;re looking for has moved or never existed. But our mission is very real — let&apos;s get you back to it.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
            Go Home
          </Link>
          <Link href="/donate" className="border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white">
            Donate Now
          </Link>
          <Link href="/programs" className="border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white">
            Our Programs
          </Link>
        </div>

        <p className="mt-16 text-[10px] uppercase tracking-[0.24em] text-white/20">Pandie Foundation — The Mother of All</p>
      </div>
    </main>
  );
}
