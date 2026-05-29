"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Strefy",    href: "#features" },
  { label: "Cennik",   href: "#pricing"  },
  { label: "Trenerzy", href: "#trainers" },
  { label: "Kontakt",  href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* ── Logo ── */}
        <a href="#" className="group flex flex-shrink-0 items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: -15, scale: 1.12 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_16px_rgba(255,107,0,0.45)]"
          >
            <Dumbbell size={16} className="text-white" />
          </motion.div>
          <span className="text-lg font-black tracking-tight text-white">
            SIŁ<span className="text-orange-500">OWNIA</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="group relative py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {label}
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* ── CTA + hamburger ── */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(255,107,0,0.5)] transition-colors hover:bg-orange-400 md:inline-flex"
          >
            Zapisz się
          </motion.a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            className="rounded-md p-1.5 text-neutral-400 transition-colors hover:text-white md:hidden"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-lg bg-orange-500 py-2.5 text-center text-sm font-bold text-white"
          >
            Zapisz się
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
