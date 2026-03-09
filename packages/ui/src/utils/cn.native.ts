import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names for React Native (via uniwind).
 * Same API as the web cn() — just clsx without tailwind-merge
 * since uniwind handles deduplication at build time.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
