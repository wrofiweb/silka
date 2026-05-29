"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

type Coach = {
  initials: string;
  name: string;
  specialty: string;
  years: number;
  tags: string[];
  accent: string;
};

const COACHES: Coach[] = [
  {
    initials: "MK",
    name: "Marek Kowalski",
    specialty: "Powerlifting & Siła",
    years: 8,
    tags: ["Squat", "Deadlift", "Bench"],
    accent: "#ff6b00",
  },
  {
    initials: "AW",
    name: "Anna Wiśniewska",
    specialty: "Cardio & Wellness",
    years: 6,
    tags: ["HIIT", "Stretching", "Pilates"],
    accent: "#00d4ff",
  },
  {
    initials: "PZ",
    name: "Piotr Zając",
    specialty: "MMA & Sztuki Walki",
    years: 10,
    tags: ["Boks", "BJJ", "Muay Thai"],
    accent: "#ff3366",
  },
];

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { initials, name, specialty, years, tags, accent } = coach;

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
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center backdrop-blur-xl"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${accent}0d, transparent)` }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="relative z-10 mb-6 flex justify-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-black text-white transition-shadow duration-300 group-hover:shadow-[0_0_32px_-4px_var(--coach-accent)]"
          style={{
            background: `linear-gradient(135deg, ${accent}40, ${accent}20)`,
            border: `2px solid ${accent}40`,
            // @ts-expect-error CSS custom property
            "--coach-accent": accent,
          }}
        >
          {initials}
        </div>
      </div>

      <h3 className="relative z-10 text-lg font-black uppercase tracking-tight text-white">
        {name}
      </h3>
      <p className="relative z-10 mt-1 text-sm font-medium" style={{ color: accent }}>
        {specialty}
      </p>
      <p className="relative z-10 mt-2 text-xs text-zinc-600">
        {years} lat doświadczenia
      </p>

      <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
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

export default function CoachesShowcase() {
  return (
    <section id="trenerzy" className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,107,0,0.05), transparent)" }}
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
            Eksperci
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Nasi{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Trenerzy
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400">
            Każdy z nich przeszedł przez setki godzin szkoleń i wie jak wycisnąć z Ciebie maksimum.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COACHES.map((coach, i) => (
            <CoachCard key={coach.name} coach={coach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
