/**
 * Lightweight, vendor-neutral event tracking. Pushes to `dataLayer` (GTM) and
 * calls `gtag` (GA4) when present. No-ops safely when neither exists or before
 * consent, so the site works with zero analytics configured.
 */
type Params = Record<string, unknown>;

interface AnalyticsWindow {
  dataLayer?: Params[];
  gtag?: (...args: unknown[]) => void;
}

export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as AnalyticsWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  if (typeof w.gtag === 'function') w.gtag('event', event, params);
}
