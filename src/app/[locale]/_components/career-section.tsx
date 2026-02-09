"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { CareerItem } from "@/lib/data";
import { SectionPanel } from "./section-panel";

type CareerSectionProps = {
  item: CareerItem;
  visual: ReactNode;
};

export function CareerSection({ item, visual }: CareerSectionProps) {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();
  const { id, direction } = item;

  return (
    <SectionPanel
      id={id}
      direction={direction}
      visual={<div className="flex w-full flex-col items-center gap-4">{visual}</div>}
    >
      <h3 className="text-2xl font-semibold">{t(`section.${id}.title`)}</h3>
      <p className="text-sm text-muted-foreground">{t(`section.${id}.org`)}</p>
      <Badge variant="outline" className="w-fit text-xs">
        {t(`section.${id}.period`)}
      </Badge>
      <Separator />
      <p className="leading-relaxed text-muted-foreground">{t(`section.${id}.desc`)}</p>
    </SectionPanel>
  );
}
