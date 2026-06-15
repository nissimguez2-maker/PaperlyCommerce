import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { instagramUrl, whatsappLink } from '@/lib/site';
import { Media } from '@/components/Media';
import { Arrow } from '@/components/Arrow';
import { ProductCard } from '@/components/shop/ProductCard';
import { getProductBySlug } from '@/data/catalog';
import { universes } from '@/data/portfolio';
import { t as tx } from '@/lib/format';

/* 2. Two-door chooser — Bespoke vs The Collection. */
export function TwoDoors() {
  const t = useTranslations('home.doors');
  return (
    <section className="section pt-0">
      <div className="container-page">
        <p className="label mb-8 text-center">{t('eyebrow')}</p>
        <div className="grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-2">
          <Door
            label={t('bespoke.label')}
            title={t('bespoke.title')}
            body={t('bespoke.body')}
            cta={t('bespoke.cta')}
            href="/portfolio"
            tone="paper"
          />
          <Door
            label={t('collection.label')}
            title={t('collection.title')}
            body={t('collection.body')}
            cta={t('collection.cta')}
            href="/collection"
            tone="beige"
          />
        </div>
      </div>
    </section>
  );
}

function Door({
  label,
  title,
  body,
  cta,
  href,
  tone,
}: {
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  tone: 'paper' | 'beige';
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between gap-10 p-10 transition-colors md:p-14 ${
        tone === 'beige' ? 'bg-beige-soft hover:bg-beige-soft/70' : 'bg-paper hover:bg-paper/60'
      }`}
    >
      <div>
        <p className="label">{label}</p>
        <h3 className="mt-4 text-h3 md:text-[2.6rem] md:leading-tight">{title}</h3>
        <p className="mt-4 max-w-text text-ink-60">{body}</p>
      </div>
      <span className="link-quiet">
        {cta}
        <Arrow />
      </span>
    </Link>
  );
}

/* 4. Shoppable module — the highest-impact element. */
export function ShoppableModule({ locale }: { locale: Locale }) {
  const t = useTranslations('home.shop');
  const slugs = ['the-full-universe', 'menu', 'the-table', 'place-card'];
  const featured = slugs.map(getProductBySlug).filter(Boolean);

  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">{t('eyebrow')}</p>
            <h2 className="mt-3 text-h2-sm md:text-h2">{t('title')}</h2>
            <p className="mt-2 text-ink-60">{t('subtitle')}</p>
          </div>
          <Link href="/collection" className="link-quiet">
            {t('viewAll')}
            <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard
              key={product!.slug}
              product={product!}
              locale={locale}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. Value / USP strip — no photo. */
export function UspStrip() {
  const t = useTranslations('home.usp');
  const items = t.raw('items') as string[];
  return (
    <section className="border-y border-hairline bg-beige-soft/40">
      <div className="container-page">
        <ul className="grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((item) => (
            <li key={item} className="py-8 text-center text-button uppercase sm:py-10">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 6. Contained bespoke teaser — 3-image strip → Portfolio. */
export function BespokeTeaser({ locale }: { locale: Locale }) {
  const t = useTranslations('home.bespokeTeaser');
  const universe = universes[0];
  return (
    <section className="section">
      <div className="container-page">
        <div className="mb-10 max-w-text">
          <p className="label">{t('eyebrow')}</p>
          <h2 className="mt-3 text-h2-sm md:text-h2">{t('title')}</h2>
          <p className="mt-4 text-ink-60">{t('body')}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {universe.gallery.slice(0, 3).map((img) => (
            <Media
              key={img.src}
              src={img.src}
              alt={tx(img.alt, locale)}
              ratio="aspect-[3/4]"
              sizes="(min-width: 768px) 33vw, 33vw"
            />
          ))}
        </div>
        <div className="mt-8">
          <Link href={`/portfolio/${universe.slug}`} className="btn-secondary">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 7. Studio band — one concise credibility beat + the bespoke action. */
export function StudioBand() {
  const a = useTranslations('home.authority');
  const p = useTranslations('home.proof');
  const c = useTranslations('common');
  return (
    <section className="section bg-beige-soft/50">
      <div className="container-page max-w-text text-center mx-auto">
        <p className="label">{a('eyebrow')}</p>
        <p className="mt-4 font-display text-h3 leading-snug">{a('body')}</p>
        <p className="mt-5 text-caption text-ink-60">{p('signature')}</p>
        <a
          href={whatsappLink(a('waMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
          data-track="whatsapp_click"
          data-context="home-studio"
        >
          {c('begin')}
        </a>
      </div>
    </section>
  );
}

/* 8. Contact band — WhatsApp + Instagram. */
export function ContactBand() {
  const t = useTranslations('home.contactBand');
  return (
    <section className="section">
      <div className="container-page text-center">
        <p className="label">{t('eyebrow')}</p>
        <h2 className="mx-auto mt-3 max-w-[18ch] text-h2-sm md:text-h2">{t('title')}</h2>
        <p className="measure mx-auto mt-4 text-ink-60">{t('body')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(t('waMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-track="whatsapp_click"
            data-context="home-contact"
          >
            {t('whatsapp')}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-track="instagram_click"
            data-context="home-contact"
          >
            {t('instagram')}
          </a>
        </div>
      </div>
    </section>
  );
}

