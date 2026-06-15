import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** The single full-bleed hero (≤62vh). Dual CTA, light text over candlelight. */
export function Hero() {
  const t = useTranslations('home.hero');
  return (
    <section className="relative flex h-[62vh] min-h-[460px] w-full items-end overflow-hidden">
      <Image
        src="/universes/chloe-albert/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* legibility wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />

      <div className="container-page relative z-10 pb-12 md:pb-16">
        <p className="label text-paper/80">{t('eyebrow')}</p>
        <h1 className="mt-4 max-w-[16ch] text-paper text-h1-sm font-medium leading-[1.08] md:text-h1">
          {t('h1')}
        </h1>
        <p className="mt-5 max-w-text text-lg text-paper/90">{t('sub')}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/portfolio" className="btn-primary">
            {t('ctaBespoke')}
          </Link>
          <Link
            href="/collection"
            className="btn border border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
          >
            {t('ctaShop')}
          </Link>
        </div>
      </div>
    </section>
  );
}
