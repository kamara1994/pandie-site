// Signature ornament: a gold diamond on a tapering thread.
// Part of the site's graphic language (top bar hairlines, footer bookends).
export default function GoldThread({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-2.5 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9962a]/60" />
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c9962a] shadow-[0_0_8px_rgba(201,150,42,0.55)]" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9962a]/60" />
    </span>
  );
}
