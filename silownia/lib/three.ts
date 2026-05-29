/**
 * lib/three.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Wspólne stałe, typy i helpery dla scen Three.js / React Three Fiber.
 *
 * ⚠️  Importuj TYLKO w plikach "use client" – Three.js wymaga WebGL (przeglądarka).
 */

import type { Vector3Tuple, ColorRepresentation } from "three";

/* ─── Kolory projektu jako stałe Three.js ─────────────────────────────────── */
export const COLORS = {
  accent:      "#ff6b00" as ColorRepresentation,
  accentLight: "#ff8c00" as ColorRepresentation,
  accentRed:   "#ff3344" as ColorRepresentation,
  dark:        "#0a0a0b" as ColorRepresentation,
  darkMid:     "#1a1a1f" as ColorRepresentation,
  white:       "#f5f5f7" as ColorRepresentation,
} as const;

/* ─── Pomocnicze typy ─────────────────────────────────────────────────────── */
export type Vec3 = Vector3Tuple;  // [x, y, z]

/* ─── Stałe sceny ─────────────────────────────────────────────────────────── */
export const CAMERA_FOV   = 60;
export const CAMERA_NEAR  = 0.1;
export const CAMERA_FAR   = 1000;

/* ─── Utility: mapowanie wartości między zakresami (jak map() w p5.js) ───── */
export function mapRange(
  value:  number,
  inMin:  number,
  inMax:  number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/* ─── Utility: clamp ────────────────────────────────────────────────────── */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
