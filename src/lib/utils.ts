import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian Rupees */
export function formatINR(amount: number, compact = false): string {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} lakh`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Animation easing presets */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;

/** Framer Motion variants used across components */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out, delay },
  }),
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: ease.out, delay },
  }),
} as const;

export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: ease.out, delay },
  }),
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

/** Check if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
