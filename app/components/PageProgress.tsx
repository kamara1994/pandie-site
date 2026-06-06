"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageProgress() {
  const pathname = usePathname();
  const [width, setWidth]     = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setWidth(0);
    const t1 = setTimeout(() => setWidth(35),  40);
    const t2 = setTimeout(() => setWidth(68),  220);
    const t3 = setTimeout(() => setWidth(85),  450);
    const t4 = setTimeout(() => setWidth(100), 700);
    const t5 = setTimeout(() => setVisible(false), 950);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 99999,
        height: "2.5px",
        width: `${width}%`,
        background: "linear-gradient(to right, #c9962a, #e8b84b, #f5d070, #e8b84b)",
        boxShadow: "0 0 10px rgba(201,150,42,0.7), 0 0 22px rgba(201,150,42,0.3)",
        transition: width === 100
          ? "width 0.25s ease, opacity 0.25s ease"
          : "width 0.45s cubic-bezier(0.4,0,0.2,1)",
        opacity: width === 100 ? 0 : 1,
        pointerEvents: "none",
      }}
    />
  );
}
