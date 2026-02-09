import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { profile, socialLinks } from "@/lib/data";

export function CtaSection() {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys (ICU params)
  const t: any = useTranslations();
  const year = new Date().getFullYear();

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{t("section.cta.title")}</h2>
      <p className="max-w-md text-muted-foreground">{t("section.cta.subtitle")}</p>

      <Button asChild size="lg" className="gap-2">
        <a href={`mailto:${profile.email}`}>
          <Mail className="h-4 w-4" />
          {t("section.cta.email")}
        </a>
      </Button>

      <div className="mt-4 flex gap-4">
        {socialLinks.map(({ platform, url }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {platform}
          </a>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        {t("component.footer.copyright", { year })}
      </p>
    </section>
  );
}
