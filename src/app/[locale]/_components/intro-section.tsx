import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function IntroSection() {
  const t = useTranslations();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-lg text-muted-foreground">{t("section.intro.greeting")}</p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">{t("section.intro.name")}</h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        {t("section.intro.headline")}
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground/80">
        {t("section.intro.summary")}
      </p>

      <a
        href="#education"
        className="mt-24 flex flex-col items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {t("section.intro.cta")}
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
