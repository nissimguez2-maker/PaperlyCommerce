import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';
import { Link } from '@/i18n/navigation';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.howItWorks' });
  return buildMetadata({
    locale,
    path: '/how-it-works',
    title: ts('title'),
    description: ts('description'),
  });
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'howItWorks' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tf = await getTranslations({ locale, namespace: 'faq' });
  const bespokeSteps = t.raw('bespoke.steps') as string[];
  const collectionSteps = t.raw('collection.steps') as string[];
  const faqItems = tf.raw('items') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: 'Home', path: '/' },
            { name: tn('howItWorks'), path: '/how-it-works' },
          ]),
          faqJsonLd(faqItems),
        ]}
      />

      <section className="section pb-0">
        <div className="container-page max-w-text">
          <p className="label">{t('eyebrow')}</p>
          <h1 className="mt-4 text-h1-sm md:text-h1">{t('title')}</h1>
          <p className="mt-5 text-lg text-ink-60">{t('intro')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-2">
          <Path
            label={t('bespoke.label')}
            title={t('bespoke.title')}
            steps={bespokeSteps}
            tone="paper"
            cta={t('bespoke.cta')}
            href={whatsappLink(t('intro'))}
            external
          />
          <Path
            label={t('collection.label')}
            title={t('collection.title')}
            steps={collectionSteps}
            tone="beige"
            cta={t('collection.cta')}
            href="/collection"
          />
        </div>
      </section>

      {/* Price-as-filter */}
      <section className="section pt-0">
        <div className="container-page">
          <div className="border-t border-hairline pt-12 md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="label">{t('priceFilter.eyebrow')}</p>
              <h2 className="mt-3 text-h2-sm md:text-h2">{t('priceFilter.title')}</h2>
            </div>
            <div className="mt-6 md:col-span-8 md:mt-0">
              <p className="text-lg leading-relaxed text-ink">{t('priceFilter.body')}</p>
              <a
                href={whatsappLink(t('priceFilter.body'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-8"
              >
                {t('priceFilter.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}

function Path({
  label,
  title,
  steps,
  tone,
  cta,
  href,
  external = false,
}: {
  label: string;
  title: string;
  steps: string[];
  tone: 'paper' | 'beige';
  cta: string;
  href: string;
  external?: boolean;
}) {
  const cls = `flex flex-col p-10 md:p-14 ${tone === 'beige' ? 'bg-beige-soft' : 'bg-paper'}`;
  return (
    <div className={cls}>
      <p className="label">{label}</p>
      <h3 className="mt-3 text-h3">{title}</h3>
      <ol className="mt-8 flex-1 space-y-5">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="font-display text-xl leading-none text-ink-60">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-ink">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {cta}
          </a>
        ) : (
          <Link href={href} className="btn-primary">
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}
