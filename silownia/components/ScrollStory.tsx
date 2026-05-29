"use client";

import { useRef }    from "react";
import { Canvas }    from "@react-three/fiber";
import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";
import HeroScene     from "@/components/scene/HeroScene";

export const scrollState: { tl: gsap.core.Timeline | null } = { tl: null };

const STAGES = [
  { line1: "PRZEKROCZ",  line2: "SWOJE LIMITY" },
  { line1: "EKSPLODUJ",  line2: "GRANICE"       },
  { line1: "NOWA",       line2: "FORMA"          },
  { line1: "TWOJA",      line2: "PRZEMIANA"      },
] as const;

const TXT_DUR = 0.055;

type TLEntry = { revealA: number; revealB: number; exitA: number | null; exitB: number | null };

const TIMELINE: TLEntry[] = [
  { revealA: 0.02, revealB: 0.05, exitA: 0.16, exitB: 0.19 },
  { revealA: 0.24, revealB: 0.27, exitA: 0.48, exitB: 0.51 },
  { revealA: 0.59, revealB: 0.62, exitA: 0.83, exitB: 0.86 },
  { revealA: 0.90, revealB: 0.93, exitA: null,  exitB: null  },
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const line1Refs    = useRef<Array<HTMLDivElement | null>>([]);
  const line2Refs    = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      gsap.set([line1Refs.current, line2Refs.current], { yPercent: 110 });

      const tl = gsap.timeline({ paused: true });

      tl.to(bgRef.current, { backgroundColor: "#1e0200", duration: 0.15, ease: "none" }, 0)
        .to(bgRef.current, { backgroundColor: "#300a00", duration: 0.30, ease: "none" })
        .to(bgRef.current, { backgroundColor: "#1e0500", duration: 0.30, ease: "none" })
        .to(bgRef.current, { backgroundColor: "#0a0a0b", duration: 0.25, ease: "none" });

      TIMELINE.forEach(({ revealA, revealB, exitA, exitB }, i) => {
        const l1 = line1Refs.current[i];
        const l2 = line2Refs.current[i];
        if (!l1 || !l2) return;

        tl.to(l1, { yPercent: 0, ease: "power2.out", duration: TXT_DUR }, revealA)
          .to(l2, { yPercent: 0, ease: "power2.out", duration: TXT_DUR }, revealB);

        if (exitA !== null && exitB !== null) {
          tl.to(l1, { yPercent: -110, ease: "power2.in", duration: TXT_DUR }, exitA)
            .to(l2, { yPercent: -110, ease: "power2.in", duration: TXT_DUR }, exitB);
        }
      });

      tl.to({}, {}, 1);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start:   "top top",
        end:     "+=600%",
        pin:     true,
        scrub:   1.5,
        onUpdate(self) {
          tl.progress(self.progress);
        },
      });

      scrollState.tl = tl;
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh" }}
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#0a0a0b" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)" }}
      />

      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 7] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="absolute inset-0 z-[2]"
        style={{ background: "transparent" }}
      >
        <HeroScene />
      </Canvas>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center"
      >
        {STAGES.map(({ line1, line2 }, i) => (
          <div key={i} className="absolute text-center select-none px-4">
            <div style={{ overflow: "hidden", lineHeight: 1 }}>
              <div
                ref={(el) => { line1Refs.current[i] = el; }}
                style={{ willChange: "transform" }}
                className="text-[clamp(2.8rem,9.5vw,8.5rem)] font-black tracking-[-0.03em] text-white"
              >
                {line1}
              </div>
            </div>
            <div style={{ overflow: "hidden", lineHeight: 1, marginTop: "0.05em" }}>
              <div
                ref={(el) => { line2Refs.current[i] = el; }}
                style={{
                  willChange: "transform",
                  background: "linear-gradient(90deg, #ff8c00 0%, #ff2200 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="text-[clamp(2.8rem,9.5vw,8.5rem)] font-black tracking-[-0.03em]"
              >
                {line2}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
          Przewiń
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
}
