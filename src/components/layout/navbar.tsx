"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { careerItems } from "@/lib/data";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();

  const sectionLinks = [
    { key: "education", href: "#education" },
    ...careerItems.map(({ id }) => ({ key: id, href: `#${id}` })),
  ];

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border/40 bg-background/80 px-6 py-3 backdrop-blur-md">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Hinny Tsang
      </Link>

      <div className="hidden items-center gap-1 md:flex">
        {sectionLinks.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t(`component.nav.${key}`)}
          </a>
        ))}
        <Link
          href="/simulations"
          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("component.nav.simulations")}
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
