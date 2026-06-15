import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessJsonLd } from '@/lib/jsonld';
import { Hero } from '@/components/home/Hero';
import {
  LeadBand,
  TwoDoors,
  ShoppableModule,
  UspStrip,
  BespokeTeaser,
  StudioBand,
  ContactBand,
} from '@/components/home/sections';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(locale)} />
      <Hero />
      <LeadBand />
      <TwoDoors />
      <ShoppableModule locale={locale} />
      <UspStrip />
      <BespokeTeaser locale={locale} />
      <StudioBand />
      <ContactBand />
    </>
  );
}
