"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  elite?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "STARTER",
    price: "99",
    period: "/ mc",
    features: [
      "Dostęp do siłowni 6:00–22:00",
      "Szatnia i sauna",
      "Podstawowy plan treningowy",
      "Aplikacja fitness",
    ],
    cta: "Zacznij teraz",
  },
  {
    id: "pro",
    name: "PRO",
    price: "179",
    period: "/ mc",
    features: [
      "Wszystko z Starter",
      "Nieograniczone treningi grupowe",
      "Dedykowany trener (2×/mc)",
      "Plan żywieniowy",
      "Priorytetowy dostęp",
    ],
    cta: "Wybierz Pro",
  },
  {
    id: "elite",
    name: "ELITE",
    price: "299",
    period: "/ mc",
    features: [
      "Wszystko z Pro",
      "Trener personalny bez limitu",
      "Indywidualna dieta i suplementacja",
      "Strefa VIP 24/7",
      "Analiza składu ciała (co miesiąc)",
      "Dostęp do sesji z mistrzami",
    ],
    cta: "Dołącz do elity",
    elite: true,
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    glowRef.current.style.left = `${e.clientX - rect.left}px`;
    glowRef.current.style.top  = `${e.clientY - rect.top}px`;
    glowRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  if (plan.elite) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-2xl p-[1.5px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute -inset-[200%]"
            style={{
              background: "conic-gradient(from 0deg, transparent 40%, #ff6b00 55%, #ff3300 65%, transparent 80%)",
            }}
          />
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-[14px] bg-zinc-900/90 p-8 backdrop-blur-xl"
          >
            <div
              ref={glowRef}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-0 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)" }}
            />
            <EliteContent plan={plan} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)" }}
      />
      <StandardContent plan={plan} />
    </motion.div>
  );
}

function PriceHeader({ plan }: { plan: Plan }) {
  return (
    <>
      <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
        {plan.name}
      </span>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-black text-white">{plan.price}</span>
        <span className="mb-1 text-lg font-bold text-zinc-500">PLN</span>
        <span className="mb-1 ml-1 text-sm text-zinc-600">{plan.period}</span>
      </div>
      <div className="my-6 h-px bg-zinc-800" />
    </>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mb-8 space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
          <Check size={15} className="mt-0.5 shrink-0 text-orange-500" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function StandardContent({ plan }: { plan: Plan }) {
  return (
    <>
      <PriceHeader plan={plan} />
      <FeatureList features={plan.features} />
      <button className="relative z-10 w-full rounded-xl border border-zinc-700 bg-transparent py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400">
        {plan.cta}
      </button>
    </>
  );
}

function EliteContent({ plan }: { plan: Plan }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,0,0.06), transparent)" }}
      />
      <div className="relative z-10">
        <PriceHeader plan={plan} />
        <FeatureList features={plan.features} />
        <button
          className="w-full rounded-xl py-3 text-sm font-black uppercase tracking-wider text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #ff6b00, #ff2200)",
            boxShadow: "0 0 24px -4px rgba(255,107,0,0.5)",
          }}
        >
          {plan.cta}
        </button>
      </div>
    </>
  );
}

export default function PricingMatrix() {
  return (
    <section id="cennik" className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255,107,0,0.05), transparent)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Karnety
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Wybierz{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400">
            Elastyczne plany dopasowane do każdego poziomu zaawansowania i ambicji.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
