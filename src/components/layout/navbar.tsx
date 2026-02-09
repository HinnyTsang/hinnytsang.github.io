"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { careerItems } from "@/lib/data";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();
  const [open, setOpen] = useState(false);

  const sectionLinks = [
    { key: "education", href: "#education" },
    ...careerItems.map(({ id }) => ({ key: id, href: `#${id}` })),
  ];

  const navLinks = (
    <>
      {sectionLinks.map(({ key, href }) => (
        <a
          key={key}
          href={href}
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t(`component.nav.${key}`)}
        </a>
      ))}
      <Link
        href="/simulations"
        onClick={() => setOpen(false)}
        className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {t("component.nav.simulations")}
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/20 px-6 py-3 backdrop-blur-md dark:bg-white/5">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Hinny Tsang
      </Link>

      {/* Desktop nav */}
      <div className="hidden items-center gap-1 md:flex">{navLinks}</div>

      <div className="flex items-center gap-1">
        <LocaleSwitcher />
        <ThemeToggle />

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">{navLinks}</div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
