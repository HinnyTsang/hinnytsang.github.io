import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { careerItems } from "@/lib/data";
import { CareerSection } from "./_components/career-section";
import { FooterSection } from "./_components/cta-section";
import { EducationSection } from "./_components/education-section";
import { IntroSection } from "./_components/intro-section";
import { CodeEditor } from "./_components/visuals/code-editor";
import { DataDashboard } from "./_components/visuals/data-dashboard";
import { StockChart } from "./_components/visuals/stock-chart";

type Props = {
  params: Promise<{ locale: Locale }>;
};

/** Map career IDs to their visual components */
const careerVisuals: Record<string, React.ReactNode> = {
  oursky: <CodeEditor />,
  smartone: <DataDashboard />,
  pollock: <StockChart />,
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <IntroSection />
      <EducationSection />
      {careerItems.map((item) => (
        <CareerSection key={item.id} item={item} visual={careerVisuals[item.id]} />
      ))}
      <FooterSection />
    </>
  );
}
