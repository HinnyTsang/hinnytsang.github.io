import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const simulations = [
  { id: "sph", emoji: "💧" },
  { id: "slime", emoji: "🦠" },
] as const;

export default function SimulationsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">{t("page.simulations.title")}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{t("page.simulations.subtitle")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {simulations.map(({ id, emoji }) => (
          <Card key={id} className="relative overflow-hidden opacity-75">
            <CardHeader>
              <div className="mb-2 text-4xl">{emoji}</div>
              <CardTitle>{t(`page.simulations.${id}.title`)}</CardTitle>
              <CardDescription>{t(`page.simulations.${id}.desc`)}</CardDescription>
            </CardHeader>
            <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
              {t("page.simulations.coming-soon")}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
