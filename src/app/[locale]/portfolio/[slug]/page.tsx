import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata, localeUrl } from '@/lib/seo';
import { t } from '@/lib/format';
import { getUniverseBySlug, universes } from '@/data/portfolio';
import { whatsappLink } from '@/lib/site';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/components/Arrow';
import { Media } from '@/components/Media';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, universeJsonLd } from '@/lib/jsonld';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    universes.map((u) => ({ locale, slug: u.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const universe = getUniverseBySlug(slug);
  if (!universe) return {};
  const ts = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({
    locale,
    path: `/portfolio/${universe.slug}`,
    title: `${t(universe.title, locale)} — ${ts('universeSuffix')}`,
    description: t(universe.excerpt, locale),
    ogImage: `/og/${universe.slug}.jpg`,
    type: 'article',
  });
}

export default async function UniversePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const universe = getUniverseBySlug(slug);
  if (!universe) notFound();

  const tp = await getTranslations({ locale, namespace: 'portfolio' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const title = t(universe.title, locale);
  const url = localeUrl(locale, `/portfolio/${universe.slug}`);
  const sections = {
    brief: tp('sections.brief'),
    direction: tp('sections.direction'),
    system: tp('sections.system'),
    pieces: tp('sections.pieces'),
    feeling: tp('sections.feeling'),
    gallery: tp('sections.gallery'),
  };

  return (
    <>
      <JsonLd
        data={[
          universeJsonLd(universe, locale, url),
          breadcrumbJsonLd(locale, [
            { name: 'Home', path: '/' },
            { name: tn('portfolio'), path: '/portfolio' },
            { name: title, path: `/portfolio/${universe.slug}` },
          ]),
        ]}
      />

      {/* Full-bleed hero — the one per page. */}
      <section className="relative flex h-[68vh] min-h-[480px] w-full items-end overflow-hidden">
        <Image
          src={universe.hero.src}
          alt={t(universe.hero.alt, locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
        <div className="container-page relative z-10 pb-12 md:pb-16">
          <p className="label text-paper/80">{t(universe.subtitle, locale)}</p>
          <h1 className="mt-3 text-h1-sm text-paper md:text-h1">{title}</h1>
        </div>
      </section>

      <article className="section">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { name: tn('portfolio'), href: '/portfolio' },
              { name: title },
            ]}
          />

          {/* The Brief */}
          <Section label={sections.brief}>
            <p className="text-xl leading-relaxed md:text-2xl">{t(universe.brief, locale)}</p>
          </Section>

          {/* The Direction — the "vision, not paper" beat */}
          <Section label={sections.direction}>
            <p className="text-lg leading-relaxed text-ink">{t(universe.direction, locale)}</p>
          </Section>

          {/* The System */}
          <Section label={sections.system}>
            <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {universe.system.map((entry) => (
                <div key={entry.label.en} className="border-t border-hairline pt-4">
                  <dt className="label">{t(entry.label, locale)}</dt>
                  <dd className="mt-2 font-display text-xl">{t(entry.value, locale)}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* The Pieces */}
          <Section label={sections.pieces}>
            <p className="text-lg leading-relaxed text-ink">{t(universe.pieces, locale)}</p>
          </Section>

          {/* The Feeling */}
          <Section label={sections.feeling}>
            <p className="measure font-display text-h3 leading-snug">{t(universe.feeling, locale)}</p>
          </Section>
        </div>

        {/* Gallery — capped at 6 */}
        <div className="container-page mt-16">
          <p className="label mb-8">{sections.gallery}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {universe.gallery.slice(0, 6).map((img, i) => (
              <Media
                key={img.src}
                src={img.src}
                alt={t(img.alt, locale)}
                ratio={i === 0 ? 'aspect-[4/5] sm:col-span-2 sm:aspect-[16/10]' : 'aspect-[4/5]'}
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container-page mt-20 text-center">
          <h2 className="mx-auto max-w-[18ch] text-h2-sm md:text-h2">{tp('cta')}</h2>
          <p className="measure mx-auto mt-4 text-ink-60">{tp('ctaBody')}</p>
          <a
            href={whatsappLink(tp('waMessage', { title }))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
            data-track="whatsapp_click"
            data-context="universe"
          >
            {tc('begin')}
          </a>
          <div className="mt-8">
            <Link href="/portfolio" className="link-quiet justify-center">
              {tp('backToPortfolio')}
              <Arrow />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 grid gap-6 border-t border-hairline pt-10 md:grid-cols-12">
      <p className="label md:col-span-3">{label}</p>
      <div className="md:col-span-9 md:max-w-3xl">{children}</div>
    </section>
  );
}
