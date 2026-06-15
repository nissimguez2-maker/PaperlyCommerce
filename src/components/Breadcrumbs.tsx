import { Link } from '@/i18n/navigation';

export interface Crumb {
  name: string;
  href?: string;
}

/** Editorial breadcrumb trail. Separators flip naturally under RTL. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-ink-60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-hairline">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
