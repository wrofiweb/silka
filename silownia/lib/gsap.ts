/**
 * lib/gsap.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralny punkt inicjalizacji GSAP + pluginów.
 *
 * Użycie w komponentach klienta:
 *   import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";
 *
 * Pluginy są rejestrowane JEDEN raz (Node.js module cache = idempotentne).
 *
 * ⚠️  Importuj TYLKO w plikach "use client" — GSAP wymaga window/document.
 */

import gsap             from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP }       from "@gsap/react";

// useGSAP musi być zarejestrowany jako plugin, żeby GSAP mógł prawidłowo
// zarządzać cyklem życia animacji i czyszczeniem w React
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export { gsap as default, ScrollTrigger, ScrollToPlugin, useGSAP };
