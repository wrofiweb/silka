"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Dumbbell, Flame, Zap } from "lucide-react";
import { useRef } from "react";

/* ─── Typy ─────────────────────────────────────────────────────────────────── */
// Cubic bezier jako krotka – wymagane przez framer-motion 12 TypeScript
type Bezier = [number, number, number, number];
const SPRING: Bezier = [0.16, 1, 0.3, 1];

/* ─── Dane statyczne ──────────────────────────────────────────────────────── */
const STATS = [
  { value: "12+",    label: "lat doświadczenia" },
  { value: "3 000+", label: "aktywnych członków" },
  { value: "50+",    label: "zajęć tygodniowo" },
  { value: "98%",    label: "zadowolonych klientów" },
];

const BADGES = [
  { icon: Flame,    text: "Cardio & HIIT" },
  { icon: Dumbbell, text: "Siłownia" },
  { icon: Zap,      text: "Treningi personalne" },
];

/* ─── Warianty animacji ───────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: SPRING },
  },
};

const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const lineVariant: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: SPRING, delay: 0.3 },
  },
};

/* ─── Komponent główny ────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* Efekt paralaksy dla tła */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0b]"
    >
      {/* ── Tło z gradientem i siatką ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        {/* Siatka perspektywiczna */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,0,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,0,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 100%, black 40%, transparent 100%)",
          }}
        />

        {/* Poświata centralna */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, #ff6b00 0%, #e85d00 40%, transparent 70%)",
          }}
        />

        {/* Poświata lewa górna */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-600/10 blur-[100px]" />
      </motion.div>

      {/* ── Treść ── */}
      <motion.div
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        {/* Górny badge z pulsującym wskaźnikiem */}
        <motion.div variants={fadeUpVariant} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Otwarte zapisy – dołącz już dziś
          </span>
        </motion.div>

        {/* Nagłówek główny */}
        <motion.div variants={fadeUpVariant} className="relative mb-4">
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
            PRZEKROCZ
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                SWOJE LIMITY
              </span>
              {/* Linia podkreślenia akcentu */}
              <motion.span
                variants={lineVariant}
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-orange-400 to-transparent"
              />
            </span>
          </h1>
        </motion.div>

        {/* Podtytuł */}
        <motion.p
          variants={fadeUpVariant}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Profesjonalny sprzęt, wykwalifikowani trenerzy i społeczność, która
          napędza Cię do działania. Twoja transformacja zaczyna się tutaj.
        </motion.p>

        {/* Przyciski CTA */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#membership"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(255,107,0,0.55)] transition-shadow hover:shadow-[0_0_36px_-4px_rgba(255,107,0,0.75)]"
          >
            <span className="relative z-10">Zacznij teraz</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            {/* Efekt połysku */}
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
          </motion.a>

          <motion.a
            href="#offer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
          >
            Zobacz ofertę
          </motion.a>
        </motion.div>

        {/* Badges kategorii */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-neutral-400"
            >
              <Icon size={13} className="text-orange-500" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* Separator */}
        <motion.div
          variants={fadeInVariant}
          className="my-14 mx-auto h-px w-64 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {/* Statystyki */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUpVariant}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-orange-500/25 hover:bg-white/[0.06]"
            >
              <span className="text-3xl font-black text-white sm:text-4xl">
                {value}
              </span>
              <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-400 transition-colors">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
          Przewiń
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
