import { notFound } from 'next/navigation';

/** Any unmatched localized path renders the localized 404. */
export default function CatchAll() {
  notFound();
}
