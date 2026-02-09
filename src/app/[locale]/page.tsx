import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { careerItems } from "@/lib/data";
import { CareerSection } from "./_components/career-section";
import { CtaSection } from "./_components/cta-section";
import { EducationSection } from "./_components/education-section";
import { IntroSection } from "./_components/intro-section";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <IntroSection />
      <EducationSection />
      {careerItems.map((item) => (
        <CareerSection key={item.id} item={item} />
      ))}
      <CtaSection />
    </>
  );
}
