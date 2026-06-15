import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';
import { Media } from '@/components/Media';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.studio' });
  return buildMetadata({
    locale,
    path: '/studio',
    title: ts('title'),
    description: ts('description'),
  });
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'studio' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: 'Home', path: '/' },
            { name: tn('studio'), path: '/studio' },
          ]),
        ]}
      />

      <section className="section">
        <div className="container-page">
          <div className="max-w-text">
            <p className="label">{t('eyebrow')}</p>
            <h1 className="mt-4 text-h1-sm md:text-h1">{t('title')}</h1>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              {/* Portrait slot — owner-provided photo of Sacha drops in here. */}
              <Media
                alt={t('role')}
                ratio="aspect-[4/5]"
                sizes="(min-width: 768px) 40vw, 100vw"
                mark="S"
              />
              <p className="mt-4 text-caption text-ink-60">{t('role')}</p>
            </div>

            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed text-ink">{t('body')}</p>
              <blockquote className="mt-10 border-t border-hairline pt-10 font-display text-h3 leading-snug">
                “{t('pullQuote')}”
              </blockquote>
              <a
                href={whatsappLink(t('waMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-10"
                data-track="whatsapp_click"
                data-context="studio"
              >
                {t('cta')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
