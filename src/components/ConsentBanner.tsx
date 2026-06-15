'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const KEY = 'paperly.consent.v1';

interface ConsentWindow {
  gtag?: (...args: unknown[]) => void;
}

/** Minimal consent banner (Consent Mode v2). Shown only when analytics is configured. */
export function ConsentBanner() {
  const t = useTranslations('consent');
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? 'granted' : 'denied');
    } catch {
      /* ignore */
    }
    const w = window as unknown as ConsentWindow;
    w.gtag?.('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
    });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-ink-60">{t('message')}</p>
        <div className="flex gap-2">
          <button onClick={() => decide(false)} className="btn-secondary px-5 py-2.5 text-[13px]">
            {t('decline')}
          </button>
          <button onClick={() => decide(true)} className="btn-primary px-5 py-2.5 text-[13px]">
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
