"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Floating widgets are not needed for first paint. Deferring them until the
// browser is idle keeps the critical path lean on slow connections — their
// chunks download after the page is already readable.
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });
const DonatePrompt = dynamic(() => import("./DonatePrompt"), { ssr: false });
const JourneyBall = dynamic(() => import("./JourneyBall"), { ssr: false });

export default function LazyWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      <ChatWidget />
      <DonatePrompt />
      <JourneyBall />
    </>
  );
}
