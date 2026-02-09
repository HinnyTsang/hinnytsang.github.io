import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { unflatten } from "@/lib/unflatten";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // JSON files use flat keys for readability (e.g. "section.intro.greeting").
  // next-intl requires nested objects, so we unflatten on load.
  const flat: Record<string, string> = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages: unflatten(flat),
  };
});
