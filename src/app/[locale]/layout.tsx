import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ParallaxStars } from "@/components/parallax-stars";
import { ScrollBackground } from "@/components/scroll-background";
import { ThemeProvider } from "@/components/theme-provider";
import { UfoGuide } from "@/components/ufo-guide";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localeMap: Record<string, string> = {
  en: "en_US",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = await getTranslations();

  const title = `${t("page.home.title")} — ${t("page.home.subtitle")}`;
  const description = t("section.intro.summary");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: localeMap[locale] ?? "en_US",
      url: `/${locale}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <ScrollBackground />
        <ParallaxStars density={10} shootingStarFrequency={[500, 1000]} />
        <UfoGuide />
        <main>{children}</main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
