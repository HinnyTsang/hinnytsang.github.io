"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  "zh-hk": "中",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSwitch} aria-label="Switch language">
      {localeLabels[nextLocale]}
    </Button>
  );
}
