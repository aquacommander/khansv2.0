/**
 * Lightweight analytics shim. Emits GA4 events when gtag/dataLayer exist,
 * and is a silent no-op otherwise — so the funnel works with or without
 * analytics wired up.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    /* analytics must never break the funnel */
  }
}
