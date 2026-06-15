import { Link } from '@/i18n/navigation';

/**
 * Brand wordmark. Per the brief the logo is NEVER mirrored — it stays the
 * Latin "Paperly" in both locales. (A real logo asset drops into this slot.)
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Paperly — home"
      className={`font-display text-2xl font-medium tracking-tight text-ink ${className}`}
      dir="ltr"
    >
      Paperly
    </Link>
  );
}
