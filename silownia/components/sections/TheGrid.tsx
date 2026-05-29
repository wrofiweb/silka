"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Shield, type LucideIcon } from "lucide-react";

type Zone = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  accent: string;
};

const ZONES: Zone[] = [
  {
    icon: Dumbbell,
    title: "Strefa Wolnych Ciężarów",
    desc: "Ponad 200 rodzajów sztang, hantli i maszyn. Idealne warunki do treningu siłowego dla każdego poziomu zaawansowania.",
    tags: ["Benchpress", "Deadlift", "Squat Rack"],
    accent: "#ff6b00",
  },
  {
    icon: HeartPulse,
    title: "Cardio Matrix",
    desc: "Najnowszy sprzęt cardio z ekranami dotykowymi, śledzeniem tętna i spersonalizowanymi programami treningowymi.",
    tags: ["Bieżnie 4K", "Rowery", "Eliptyczne"],
    accent: "#00d4ff",
  },
  {
    icon: Shield,
    title: "Klatka MMA",
    desc: "Profesjonalna klatka do walk, worki bokserskie, maty i wszystko, czego potrzebujesz do sportów walki.",
    tags: ["Boks", "BJJ", "Kickboxing"],
    accent: "#ff3366",
  },
];

function ZoneCard({ zone }: { zone: Zone }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { icon: Icon, title, desc, tags, accent } = zone;

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative cursor-default overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 90% 60% at 50% 110%, ${accent}10, transparent)` }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div
        className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>

      <h3 className="relative z-10 mb-3 text-xl font-black uppercase tracking-tight text-white">
        {title}
      </h3>
      <p className="relative z-10 mb-6 text-sm leading-relaxed text-zinc-400">
        {desc}
      </p>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}22` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function TheGrid() {
  return (
    <section id="strefy" className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 35% at 50% 0%, rgba(255,107,0,0.06), transparent)" }}
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
            Infrastruktura
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Nasze{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Strefy
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400">
            Każda strefa zaprojektowana z myślą o maksymalnej efektywności i komforcie Twojego treningu.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ZONES.map((zone) => (
            <ZoneCard key={zone.title} zone={zone} />
          ))}
        </div>
      </div>
    </section>
  );
}
