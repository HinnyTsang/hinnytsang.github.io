"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { educationItems } from "@/lib/data";
import { SectionPanel } from "./section-panel";
import { Starfield } from "./visuals/starfield";

export function EducationSection() {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();

  return (
    <SectionPanel
      id="education"
      direction="left"
      visual={
        <div className="flex w-full flex-col items-center gap-4">
          <Starfield />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold">{t("section.education.title")}</h2>
        {educationItems.map(({ id }) => (
          <div key={id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{t(`section.education.${id}.title`)}</h3>
              <Badge variant="outline" className="text-xs">
                {t(`section.education.${id}.period`)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{t(`section.education.${id}.org`)}</p>
            <p className="text-sm text-muted-foreground/80">{t(`section.education.${id}.desc`)}</p>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
