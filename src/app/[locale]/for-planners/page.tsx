import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site, whatsappLink } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.forPlanners' });
  return buildMetadata({
    locale,
    path: '/for-planners',
    title: ts('title'),
    description: ts('description'),
  });
}

export default async function ForPlannersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'forPlanners' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const provide = t.raw('provide') as string[];
  const emailHref = `mailto:${site.plannerEmail}?subject=${encodeURIComponent('Paperly — planner enquiry')}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Home', path: '/' },
          { name: t('eyebrow'), path: '/for-planners' },
        ])}
      />

      <section className="section pb-0">
        <div className="container-page max-w-text">
          <p className="label">{t('eyebrow')}</p>
          <h1 className="mt-4 text-h1-sm md:text-h1">{t('title')}</h1>
          <p className="mt-5 text-lg text-ink-60">{t('intro')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed text-ink">{t('body')}</p>
          </div>
          <div className="md:col-span-5">
            <h2 className="label">{t('provideTitle')}</h2>
            <ul className="mt-5 space-y-4">
              {provide.map((item) => (
                <li key={item} className="flex gap-3 border-t border-hairline pt-4 text-ink">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-beige-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="border border-hairline p-10 md:p-14">
            <h2 className="text-h2-sm md:text-h2">{t('contactTitle')}</h2>
            <p className="mt-4 max-w-text text-ink-60">{t('contactBody')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={emailHref} className="btn-primary">
                {t('emailCta')}
              </a>
              <a
                href={whatsappLink(t('waMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {t('waCta')}
              </a>
            </div>
            {/* Email shown discreetly, per brief. */}
            <p className="mt-6 text-caption text-ink-60" dir="ltr">
              {site.plannerEmail}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
