import { useTranslations } from 'next-intl';

/** Compact, native-disclosure FAQ — scannable, no JS, answers buyer questions. */
export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  return (
    <section className="section pt-0">
      <div className="container-page">
        <h2 className="label mb-8">{t('title')}</h2>
        <div className="max-w-text border-t border-hairline">
          {items.map((it, i) => (
            <details key={i} className="group border-b border-hairline py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                {it.q}
                <span
                  aria-hidden
                  className="text-ink-60 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-60">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
