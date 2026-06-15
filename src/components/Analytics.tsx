'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';
import { ConsentBanner } from './ConsentBanner';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Vendor-neutral analytics. Always delegates `[data-track]` clicks (e.g. every
 * WhatsApp / Instagram link) to the dataLayer. Loads GA4 with Consent Mode v2
 * (default denied) only when NEXT_PUBLIC_GA_ID is set — so with placeholder env
 * nothing loads and no consent banner appears.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      track(el.dataset.track || 'click', { context: el.dataset.context });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',wait_for_update:500});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <ConsentBanner />
    </>
  );
}
