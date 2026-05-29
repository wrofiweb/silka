"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap, { useGSAP } from "@/lib/gsap";

const PLANS_OPTIONS = ["STARTER – 99 PLN/mc", "PRO – 179 PLN/mc", "ELITE – 299 PLN/mc"];

function RadarDisplay() {
  const sweepRef = useRef<SVGLineElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!sweepRef.current) return;
      gsap.to(sweepRef.current, {
        rotate: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
        transformOrigin: "100 100",
      });
    },
    { scope: svgRef },
  );

  const rings = [80, 60, 40, 20];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      className="h-full w-full"
      aria-hidden
    >
      {rings.map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,107,0,0.12)"
          strokeWidth="1"
        />
      ))}
      <line x1="100" y1="100" x2="20" y2="100" stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="100" y1="100" x2="180" y2="100" stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="3 4" />

      <defs>
        <radialGradient id="sweep-gradient" cx="100%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
        </radialGradient>
      </defs>

      <line
        ref={sweepRef}
        x1="100"
        y1="100"
        x2="180"
        y2="100"
        stroke="url(#sweep-gradient)"
        strokeWidth="2"
      />

      {[
        { cx: 130, cy: 75 },
        { cx: 70,  cy: 120 },
        { cx: 150, cy: 130 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2.5"
          fill="#ff6b00"
          opacity="0.6"
        />
      ))}

      <circle cx="100" cy="100" r="3" fill="#ff6b00" opacity="0.8" />
    </svg>
  );
}

export default function SignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  }

  return (
    <section id="zapisz-sie" className="relative overflow-hidden bg-zinc-950 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(255,107,0,0.05), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Dołącz teraz
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Zacznij swoją{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Przemianę
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                  style={{
                    background: "rgba(255,107,0,0.15)",
                    border: "1px solid rgba(255,107,0,0.3)",
                  }}
                >
                  ✓
                </div>
                <h3 className="text-2xl font-black uppercase text-white">Gotowe!</h3>
                <p className="text-sm text-zinc-400">
                  Twoje zgłoszenie zostało wysłane. Skontaktujemy się z Tobą w ciągu 24 godzin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Imię i Nazwisko
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jan Kowalski"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jan@example.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+48 123 456 789"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Wybrany Plan
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  >
                    <option value="" className="bg-zinc-900">Wybierz plan...</option>
                    {PLANS_OPTIONS.map((p) => (
                      <option key={p} value={p} className="bg-zinc-900">{p}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 disabled:opacity-70"
                  style={{
                    background: "linear-gradient(135deg, #ff6b00, #ff2200)",
                    boxShadow: loading ? "none" : "0 0 28px -4px rgba(255,107,0,0.55)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Przetwarzanie…
                    </span>
                  ) : (
                    "Zapisuję się"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col items-center gap-8"
          >
            <div className="h-72 w-72">
              <RadarDisplay />
            </div>
            <div className="space-y-3 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600">
                Aktualnie śledzonych członków
              </p>
              <p className="text-6xl font-black text-white">
                1<span className="text-orange-500">.</span>240
              </p>
              <p className="text-xs text-zinc-600">i ciągle rośniemy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
