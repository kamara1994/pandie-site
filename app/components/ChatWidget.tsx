"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type View = "chat" | "handoff" | "handoff-done";

const SUGGESTIONS = [
  "How can I donate?",
  "Tell me about your programs",
  "How do I sponsor a child?",
  "How can I volunteer?",
];

const GREETING = "Hi! I'm Pamela 👋 I'm here to help you learn about Pandie Foundation and how you can change a child's life in Sierra Leone. What would you like to know?";

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [view, setView]           = useState<View>("chat");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasGreeted, setHasGreeted]   = useState(false);

  // Handoff form state
  const [hName, setHName]     = useState("");
  const [hEmail, setHEmail]   = useState("");
  const [hSending, setHSending] = useState(false);
  const [hError, setHError]   = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Show tooltip after 6 s if chat never opened
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setShowTooltip(true); }, 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showTooltip) {
      const t = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showTooltip]);

  // Greet on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setShowTooltip(false);
      setStreaming(true);
      let i = 0;
      setMessages([{ role: "assistant", content: "" }]);
      const iv = setInterval(() => {
        i++;
        setMessages([{ role: "assistant", content: GREETING.slice(0, i) }]);
        if (i >= GREETING.length) { clearInterval(iv); setStreaming(false); }
      }, 18);
      return () => clearInterval(iv);
    }
  }, [open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open && view === "chat") setTimeout(() => inputRef.current?.focus(), 300); }, [open, view]);

  // Send message to AI
  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");

    const userMsg: Message = { role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);
    setStreaming(true);
    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...history, assistantMsg]);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: full }]);
      }
    } catch {
      setMessages([...history, {
        role: "assistant",
        content: "Sorry, I had trouble with that. You can also reach us at info@pandiefoundation.org 💛",
      }]);
    } finally {
      setStreaming(false);
    }
  };

  // Submit human handoff
  const submitHandoff = async () => {
    if (!hName.trim() || !hEmail.trim()) { setHError("Please fill in your name and email."); return; }
    if (!hEmail.includes("@")) { setHError("Please enter a valid email address."); return; }
    setHError("");
    setHSending(true);
    try {
      await fetch("/api/chatbot/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: hName.trim(),
          email: hEmail.trim(),
          summary: `Visitor requested human support after ${messages.length} messages.`,
          messages,
        }),
      });
      setView("handoff-done");
    } catch {
      setHError("Something went wrong. Please email info@pandiefoundation.org directly.");
    } finally {
      setHSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Tooltip bubble ── */}
      {showTooltip && !open && (
        <div className="fixed bottom-24 right-5 z-[99] max-w-[200px] animate-bounce-soft">
          <div className="relative rounded-2xl rounded-br-sm bg-[#0a1a10] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9962a]/60 to-transparent rounded-t-2xl" />
            <p className="text-[13px] font-semibold text-white">Got questions? 👋</p>
            <p className="mt-0.5 text-[11px] text-white/55">I can help you right now!</p>
            <div className="absolute -bottom-2 right-4 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#0a1a10]" />
          </div>
        </div>
      )}

      {/* ── Floating avatar button ── */}
      <button type="button" onClick={() => { setOpen(p => !p); setShowTooltip(false); }}
        aria-label="Chat with Pamela" className="fixed bottom-5 right-5 z-[100] group">
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#c9962a]/20 animate-ping" style={{ animationDuration: "2.2s" }} />
            <span className="absolute -inset-2 rounded-full border border-[#c9962a]/25 animate-ping" style={{ animationDuration: "2.8s", animationDelay: "0.4s" }} />
          </>
        )}
        <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          open
            ? "border-[#c9962a] shadow-[0_0_0_4px_rgba(201,150,42,0.15),0_8px_28px_rgba(0,0,0,0.4)]"
            : "border-[#c9962a]/70 shadow-[0_0_0_3px_rgba(201,150,42,0.18),0_8px_28px_rgba(201,150,42,0.35)] group-hover:shadow-[0_0_0_5px_rgba(201,150,42,0.25),0_12px_36px_rgba(201,150,42,0.5)] group-hover:scale-105"
        }`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c9962a]/30 via-transparent to-[#e8b84b]/20" />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0a1a10]">
            <Image src="/logo.png" alt="Pamela — Pandie Foundation AI" fill className="object-cover" />
          </div>
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
        </div>
        {!open && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0a1a10] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#c9962a] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Chat with Pamela
          </div>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div className={`fixed bottom-[88px] right-5 z-[100] w-[92vw] max-w-[380px] transition-all duration-400 ${
        open ? "pointer-events-auto translate-y-0 opacity-100 scale-100" : "pointer-events-none translate-y-6 opacity-0 scale-95"
      }`}>
        <div className="rounded-2xl p-px" style={{
          background: "linear-gradient(135deg, rgba(201,150,42,0.7) 0%, rgba(201,150,42,0.15) 40%, rgba(201,150,42,0.5) 100%)",
        }}>
          <div className="flex flex-col overflow-hidden rounded-[15px] bg-[#060f0a]" style={{ height: "520px" }}>

            {/* Header */}
            <div className="relative shrink-0 overflow-hidden bg-[#0a1a10]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />
              <div className="relative flex items-center gap-3.5 px-4 py-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#c9962a]/60 shadow-[0_0_14px_rgba(201,150,42,0.4)]">
                  <Image src="/logo.png" alt="Pamela" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-white leading-none">Pamela</p>
                  <p className="mt-1 text-[11px] text-white/50">Pandie Foundation · AI Assistant</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
                  <span className="text-[10px] font-semibold text-[#4ade80]">Online</span>
                </div>
                {/* Talk to human toggle */}
                {view === "chat" && (
                  <button onClick={() => setView("handoff")}
                    className="ml-1 shrink-0 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/40 transition hover:border-[#c9962a]/50 hover:text-[#c9962a]"
                    title="Talk to a real person">
                    👤 Human
                  </button>
                )}
                {view !== "chat" && (
                  <button onClick={() => setView("chat")}
                    className="ml-1 shrink-0 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/40 transition hover:border-white/30 hover:text-white">
                    ← Back
                  </button>
                )}
                <button onClick={() => setOpen(false)}
                  className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/40 transition hover:bg-white/10 hover:text-white">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* ── CHAT VIEW ── */}
            {view === "chat" && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {m.role === "assistant" && (
                        <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#c9962a]/40 mt-1">
                          <Image src="/logo.png" alt="Pamela" fill className="object-cover" />
                        </div>
                      )}
                      <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-[14px] leading-[1.55] ${
                        m.role === "user"
                          ? "rounded-tr-sm bg-[#c9962a] text-[#0a1a10] font-medium"
                          : "rounded-tl-sm bg-[#0f2418] text-white/90"
                      }`}>
                        {m.content}
                        {streaming && i === messages.length - 1 && m.role === "assistant" && (
                          <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#c9962a] align-middle" />
                        )}
                      </div>
                    </div>
                  ))}

                  {streaming && messages.length === 0 && (
                    <div className="flex gap-2.5">
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#c9962a]/40 mt-1">
                        <Image src="/logo.png" alt="Pamela" fill className="object-cover" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#0f2418] px-4 py-3.5">
                        {[0,1,2].map(d => (
                          <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#c9962a]/70 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Suggestion chips */}
                {messages.filter(m => m.role === "user").length === 0 && !streaming && (
                  <div className="shrink-0 px-4 pb-2 flex flex-wrap gap-2">
                    {SUGGESTIONS.map(s => (
                      <button key={s} onClick={() => send(s)}
                        className="rounded-full border border-[#c9962a]/35 bg-[#c9962a]/8 px-3 py-1.5 text-[11px] font-semibold text-[#c9962a] transition hover:border-[#c9962a]/70 hover:bg-[#c9962a]/15">
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input bar */}
                <div className="shrink-0 border-t border-white/[0.06] bg-[#0a1a10] px-3 py-3">
                  {/* Human CTA inside chat */}
                  <button onClick={() => setView("handoff")}
                    className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/8 py-2 text-[11px] font-semibold text-white/35 transition hover:border-[#c9962a]/35 hover:text-[#c9962a]">
                    <span>👤</span> Prefer to talk to a real person?
                  </button>
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 transition focus-within:border-[#c9962a]/50">
                    <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                      onKeyDown={onKey} disabled={streaming}
                      placeholder="Ask Pamela anything…"
                      className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/25 disabled:opacity-50" />
                    <button onClick={() => send()} disabled={!input.trim() || streaming}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c9962a] text-[#0a1a10] transition hover:bg-[#e8b84b] disabled:opacity-35 disabled:cursor-not-allowed">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.5 10L17.5 2.5L10 17.5L8.75 11.25L2.5 10Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-white/20">Powered by Claude AI · Pandie Foundation</p>
                </div>
              </>
            )}

            {/* ── HANDOFF FORM VIEW ── */}
            {view === "handoff" && (
              <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6" style={{ scrollbarWidth: "none" }}>
                <div className="mb-5 rounded-xl bg-[#0f2418] p-4">
                  <p className="text-[13px] font-bold text-white">Talk to our team 👤</p>
                  <p className="mt-1.5 text-[13px] leading-5 text-white/55">
                    Leave your details and we&apos;ll get back to you personally — usually within a few hours during business hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Your Name</label>
                    <input value={hName} onChange={e => setHName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none transition focus:border-[#c9962a]/60" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Email Address</label>
                    <input value={hEmail} onChange={e => setHEmail(e.target.value)}
                      type="email" placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none transition focus:border-[#c9962a]/60" />
                  </div>

                  {/* Show summary of conversation if any */}
                  {messages.filter(m => m.role === "user").length > 0 && (
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-1">Your conversation will be included</p>
                      <p className="text-[12px] text-white/40 line-clamp-2">
                        {messages.filter(m => m.role === "user").slice(-1)[0]?.content}
                      </p>
                    </div>
                  )}

                  {hError && (
                    <p className="rounded-xl bg-red-900/20 border border-red-500/20 px-4 py-3 text-[13px] text-white/70">{hError}</p>
                  )}

                  <button onClick={submitHandoff} disabled={hSending}
                    className="gold-cta w-full rounded-xl bg-[#c9962a] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:shadow-[0_6px_22px_rgba(201,150,42,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {hSending ? "Sending…" : "Connect with Our Team →"}
                  </button>

                  <p className="text-center text-[11px] text-white/30">
                    Or email us directly at{" "}
                    <a href="mailto:info@pandiefoundation.org" className="text-[#c9962a] hover:underline">
                      info@pandiefoundation.org
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* ── HANDOFF SUCCESS VIEW ── */}
            {view === "handoff-done" && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0f2418] text-3xl shadow-[0_0_28px_rgba(74,222,128,0.2)]">
                  ✅
                </div>
                <h3 className="mt-5 font-heading text-[1.3rem] font-semibold text-white">We got your message!</h3>
                <p className="mt-3 text-[14px] leading-6 text-white/55">
                  Our team has been notified and will reach out to <span className="text-[#c9962a]">{hEmail}</span> within a few hours.
                </p>
                <div className="mt-6 rounded-xl bg-[#0f2418] px-5 py-4 text-left w-full">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c9962a]">While you wait</p>
                  <p className="mt-2 text-[13px] leading-5 text-white/55">
                    Pamela can still answer most questions instantly. Or explore our programs at{" "}
                    <a href="/programs" className="text-[#c9962a] hover:underline">pandiefoundation.org/programs</a>.
                  </p>
                </div>
                <button onClick={() => setView("chat")}
                  className="mt-5 text-[12px] font-semibold text-white/35 hover:text-white transition">
                  ← Back to Pamela
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-soft {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}
        }
        .animate-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}
