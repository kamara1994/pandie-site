"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/chat-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a017] text-[#0f1f17] shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition duration-300 hover:scale-105 hover:bg-[#e0b020]"
        aria-label="Open chat"
      >
        <span className="text-2xl">{open ? "×" : "💬"}</span>
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-5 z-[100] w-[92vw] max-w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1f17] text-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="border-b border-white/10 bg-[#173325] px-5 py-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f0c857]">
            Need Help?
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            Message Pandie Foundation
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Ask about donations, sponsorship, volunteering, or partnership.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#d4a017]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#d4a017]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#d4a017]"
            />
          </div>

          {status === "success" && (
            <p className="rounded-lg bg-[#214c34] px-4 py-3 text-sm text-white">
              Your message was sent successfully.
            </p>
          )}

          {status === "error" && (
            <p className="rounded-lg bg-red-900/40 px-4 py-3 text-sm text-white">
              Please fill in all fields and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#d4a017] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#0f1f17] transition hover:bg-[#e0b020] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
}