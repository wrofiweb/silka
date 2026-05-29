"use client";

import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Shield, type LucideIcon } from "lucide-react";

/* ─── Dane sekcji ─────────────────────────────────────────────────────────── */
type Zone = {
  icon:  LucideIcon;
  title: string;
  desc:  string;
  tags:  string[];
  accent: string;
  glow:   string;
};

const ZONES: Zone[] = [
  {
    icon:   Dumbbell,
    title:  "Strefa Wolnych Ciężarów",
    desc:   "Ponad 200 rodzajów sztang, hantli i maszyn. Idealne warunki do treningu siłowego dla każdego poziomu zaawansowania.",
    tags:   ["Benchpress", "Deadlift", "Squat Rack"],
    accent: "#ff6b00",
    glow:   "rgba(255,107,0,0.14)",
  },
  {
    icon:   HeartPulse,
    title:  "Cardio Matrix",
    desc:   "Najnowszy sprzęt cardio z ekranami dotykowymi, śledzeniem tętna i spersonalizowanymi programami treningowymi.",
    tags:   ["Bieżnie 4K", "Rowery", "Eliptyczne"],
    accent: "#00d4ff",
    glow:   "rgba(0,212,255,0.12)",
  },
  {
    icon:   Shield,
    title:  "Klatka MMA",
    desc:   "Profesjonalna klatka do walk, worki bokserskie, maty i wszystko, czego potrzebujesz do sportów walki.",
    tags:   ["Boks", "BJJ", "Kickboxing"],
    accent: "#ff3366",
    glow:   "rgba(255,51,102,0.14)",
  },
];

/* ─── Warianty ────────────────────────────────────────────────────────────── */
const sectionVariant = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6 } },
} as const;

/* ─── Komponent ───────────────────────────────────────────────────────────── */
export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-black py-32">

      {/* Subtelna poświata od góry sekcji */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 35% at 50% 0%, rgba(255,107,0,0.07), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Nagłówek sekcji */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            Infrastruktura
          </span>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Nasze{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Strefy
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            Każda strefa zaprojektowana z myślą o maksymalnej efektywności
            i komforcie Twojego treningu.
          </p>
        </motion.div>

        {/* Siatka kart */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ZONES.map(({ icon: Icon, title, desc, tags, accent, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-md"
            >
              {/* Gradient hover w tle */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 90% 60% at 50% 110%, ${glow}, transparent)`,
                }}
              />

              {/* Neonowa linia top przy hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                }}
              />

              {/* Ikona */}
              <div
                className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_24px_-4px_var(--a)]"
                style={{
                  background: `${accent}18`,
                  border:     `1px solid ${accent}30`,
                  // @ts-expect-error – CSS custom property
                  "--a": accent,
                }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              {/* Treść */}
              <h3 className="relative z-10 mb-3 text-xl font-bold text-white">
                {title}
              </h3>
              <p className="relative z-10 mb-6 text-sm leading-relaxed text-neutral-400">
                {desc}
              </p>

              {/* Tagi */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `${accent}12`,
                      color:      accent,
                      border:     `1px solid ${accent}22`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
