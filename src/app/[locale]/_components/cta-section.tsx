import { useTranslations } from "next-intl";

/**
 * Footer spacer + copyright.
 * The CTA (Get in touch) is handled by the UFO landing animation.
 * This section provides scroll space for the UFO to land and shows the copyright.
 */
export function FooterSection() {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys (ICU params)
  const t: any = useTranslations();
  const year = new Date().getFullYear();

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-end px-6 pb-8">
      <p className="text-xs text-muted-foreground">{t("component.footer.copyright", { year })}</p>
    </section>
  );
}
