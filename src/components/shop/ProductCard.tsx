import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/data/types';
import type { Locale } from '@/i18n/routing';
import { formatPrice, t } from '@/lib/format';
import { productPath } from '@/data/catalog';
import { Media } from '@/components/Media';
import { AddToCartButton } from './AddToCartButton';

interface Props {
  product: Product;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
}

/**
 * Product card — 4:5, no shadow, price is the boldest text.
 * "Add to cart" adds the smallest variant (the minimum order).
 */
export function ProductCard({ product, locale, priority, sizes }: Props) {
  const tc = useTranslations('product');
  const href = productPath(product);
  const defaultVariant = product.variants[0];

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block" aria-label={t(product.name, locale)}>
        {product.favourite && (
          <span className="absolute start-3 top-3 z-10 bg-paper px-2.5 py-1 text-label text-ink">
            {tc('favourite')}
          </span>
        )}
        <Media
          src={product.images[0]}
          alt={t(product.imageAlt, locale)}
          ratio="aspect-card"
          sizes={sizes ?? '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
          priority={priority}
          mark={t(product.name, locale).charAt(0)}
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={href}>
          <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-ink-60">
            {t(product.name, locale)}
          </h3>
        </Link>
        <p className="mt-1 text-caption text-ink-60">{t(product.tagline, locale)}</p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-body text-lg font-semibold text-ink">
            {formatPrice(defaultVariant.price)}
          </span>
        </div>

        <div className="mt-4">
          <AddToCartButton
            productSlug={product.slug}
            variantId={defaultVariant.id}
            className="btn-block text-[13px] px-5 py-3"
          />
        </div>
      </div>
    </article>
  );
}
