import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { instagramUrl, whatsappLink } from '@/lib/site';
import { InstagramFeed } from '@/components/InstagramFeed';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.contact' });
  return buildMetadata({
    locale,
    path: '/contact',
    title: ts('title'),
    description: ts('description'),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: 'Home', path: '/' },
            { name: tn('contact'), path: '/contact' },
          ]),
        ]}
      />

      <section className="section pb-0">
        <div className="container-page max-w-text">
          <p className="label">{t('eyebrow')}</p>
          <h1 className="mt-4 text-h1-sm md:text-h1">{t('title')}</h1>
          <p className="mt-5 text-lg text-ink-60">{t('body')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between border border-hairline p-10">
            <div>
              <h2 className="text-h3 font-display">{t('whatsappTitle')}</h2>
              <p className="mt-3 text-ink-60">{t('whatsappBody')}</p>
            </div>
            <a
              href={whatsappLink(t('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 self-start"
            >
              {t('whatsappCta')}
            </a>
          </div>

          <div className="flex flex-col justify-between bg-beige-soft p-10">
            <div>
              <h2 className="text-h3 font-display">{t('instagramTitle')}</h2>
              <p className="mt-3 text-ink-60">{t('instagramBody')}</p>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 self-start"
              dir="ltr"
            >
              {t('instagramCta')}
            </a>
          </div>
        </div>

        <div className="container-page mt-8">
          <p className="measure text-ink-60">{t('responseNote')}</p>
        </div>
      </section>

      <InstagramFeed />
    </>
  );
}
