"use client";

import { useRef } from "react";
import gsap, { useGSAP } from "@/lib/gsap";

const ITEMS = [
  "NO PAIN NO GAIN",
  "LIMITLESS",
  "PUSH YOUR LIMITS",
  "BE RELENTLESS",
  "FORGE YOUR BODY",
  "ELITE MINDSET",
  "ZERO EXCUSES",
];

export default function MarqueeStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: wrapRef },
  );

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden border-y border-zinc-800/60 bg-zinc-950 py-5"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="whitespace-nowrap px-10 text-xs font-black uppercase tracking-[0.35em] text-zinc-600">
              {item}
            </span>
            <span
              className="font-black text-xs"
              style={{ color: "#ff6b00" }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
