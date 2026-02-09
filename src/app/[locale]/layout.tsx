import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
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
        <ParallaxStars />
        <UfoGuide />
        <Navbar />
        <main className="pt-14">{children}</main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
