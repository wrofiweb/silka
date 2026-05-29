"use client";

import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";

/* ─── Typy ────────────────────────────────────────────────────────────────── */
type Plan = {
  name:        string;
  price:       string;
  period:      string;
  description: string;
  features:    string[];
  cta:         string;
  isVip:       boolean;
};

/* ─── Dane ────────────────────────────────────────────────────────────────── */
const PLANS: Plan[] = [
  {
    name:        "Wejście Dzienne",
    price:       "29",
    period:      "/ dzień",
    description: "Idealne na jednorazowy trening lub wypróbowanie siłowni.",
    features: [
      "Dostęp do całej siłowni",
      "Szatnia i prysznice",
      "Parking",
      "Ręcznik gratis",
    ],
    cta:   "Kup wejście",
    isVip: false,
  },
  {
    name:        "VIP",
    price:       "159",
    period:      "/ miesiąc",
    description: "Najpopularniejszy wybór dla regularnie trenujących.",
    features: [
      "Nieograniczony dostęp 24/7",
      "Zajęcia grupowe gratis",
      "Konsultacja z trenerem",
      "Strefa sauna i SPA",
      "Aplikacja mobilna premium",
      "Zamrożenie karnetu",
    ],
    cta:   "Zostań VIP",
    isVip: true,
  },
  {
    name:        "All Inclusive",
    price:       "299",
    period:      "/ miesiąc",
    description: "Kompleksowy pakiet dla tych, którzy chcą wszystkiego.",
    features: [
      "Wszystko z pakietu VIP",
      "4× trening personalny",
      "Indywidualny plan żywieniowy",
      "Analiza składu ciała",
      "Priorytetowa obsługa",
    ],
    cta:   "Wybierz pakiet",
    isVip: false,
  },
];

/* ─── Sub-komponenty ──────────────────────────────────────────────────────── */
function FeatureRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
        <Check size={11} strokeWidth={3} />
      </div>
      <span className="text-sm text-neutral-300">{text}</span>
    </li>
  );
}

function RegularCard({ plan }: { plan: Plan }) {
  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
        {plan.name}
      </p>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-black text-white">{plan.price}</span>
        <span className="mb-1.5 text-sm text-neutral-500">zł{plan.period}</span>
      </div>
      <p className="mt-3 text-sm text-neutral-500">{plan.description}</p>

      <ul className="mt-8 space-y-3.5">
        {plan.features.map((f) => (
          <FeatureRow key={f} text={f} />
        ))}
      </ul>

      <a
        href="#"
        className="mt-8 block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-center text-sm font-bold text-white transition-all duration-200 hover:border-orange-500/30 hover:bg-orange-500/10"
      >
        {plan.cta}
      </a>
    </div>
  );
}

function VipCard({ plan }: { plan: Plan }) {
  return (
    /* Pulsująca poświata zewnętrzna */
    <motion.div
      animate={{
        boxShadow: [
          "0 0 30px -8px rgba(255,107,0,0.25)",
          "0 0 60px -8px rgba(255,107,0,0.55)",
          "0 0 30px -8px rgba(255,107,0,0.25)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* ── Obracający się gradient – efekt neonowej ramki ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          /* Większy niż rodzic, wycentrowany – overflow:hidden rodzica przycina */
          width:      "200%",
          height:     "200%",
          top:        "-50%",
          left:       "-50%",
          background:
            "conic-gradient(from 0deg, transparent 0%, #ff6b00 15%, #ff4444 35%, transparent 55%, transparent 80%, #ff8c00 95%, transparent 100%)",
          zIndex: 0,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Treść karty (1.5 px gap = szerokość "ramki") ── */}
      <div className="relative z-10 m-[1.5px] rounded-[14px] bg-zinc-900 p-8">

        {/* Nagłówek z badge */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
            {plan.name}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-400 ring-1 ring-orange-500/25">
            <Crown size={11} />
            Polecamy
          </span>
        </div>

        <div className="flex items-end gap-1">
          <span className="text-5xl font-black text-white">{plan.price}</span>
          <span className="mb-1.5 text-sm text-orange-400/70">zł{plan.period}</span>
        </div>
        <p className="mt-3 text-sm text-neutral-400">{plan.description}</p>

        <ul className="mt-8 space-y-3.5">
          {plan.features.map((f) => (
            <FeatureRow key={f} text={f} />
          ))}
        </ul>

        {/* CTA z efektem połysku */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-8 block w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 text-center text-sm font-bold text-white shadow-[0_0_28px_-4px_rgba(255,107,0,0.5)]"
        >
          <span className="relative z-10">{plan.cta}</span>
          {/* Szybki połysk przy hover */}
          <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ─── Sekcja główna ───────────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-zinc-950 py-32">

      {/* Delikatna poświata centralna */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.05), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            Cennik
          </span>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Karnety i{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Ceny
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            Elastyczne pakiety dopasowane do Twoich potrzeb i budżetu.
            Bez ukrytych opłat.
          </p>
        </motion.div>

        {/* Karty cenowe – VIP wyżej o 32 px na desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={plan.isVip ? "md:-mt-8" : ""}
            >
              {plan.isVip ? <VipCard plan={plan} /> : <RegularCard plan={plan} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
