import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { CartProvider } from '@/components/cart/CartProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    metadataBase: new URL(site.url),
    ...buildMetadata({
      locale,
      path: '',
      title: t('home.title'),
      description: t('home.description'),
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
            >
              {messages.common && (messages.common as Record<string, string>).skipToContent}
            </a>
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
