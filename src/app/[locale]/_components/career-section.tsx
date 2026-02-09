import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { CareerItem } from "@/lib/data";
import { SectionPanel } from "./section-panel";

type CareerSectionProps = {
  item: CareerItem;
};

export function CareerSection({ item }: CareerSectionProps) {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();
  const { id, emoji, direction } = item;

  return (
    <SectionPanel
      id={id}
      direction={direction}
      visual={
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="text-6xl">{emoji}</span>
          <h2 className="text-3xl font-bold">{t(`section.${id}.org`)}</h2>
        </div>
      }
    >
      <h3 className="text-2xl font-semibold">{t(`section.${id}.title`)}</h3>
      <Badge variant="outline" className="w-fit text-xs">
        {t(`section.${id}.period`)}
      </Badge>
      <Separator />
      <p className="leading-relaxed text-muted-foreground">{t(`section.${id}.desc`)}</p>
    </SectionPanel>
  );
}
