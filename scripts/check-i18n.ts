/**
 * Validates that all locale message files have the same keys.
 * Usage: npx tsx scripts/check-i18n.ts
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "../src/messages");
const files = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

if (files.length < 2) {
	console.log("Only one locale file found, skipping key comparison.");
	process.exit(0);
}

const locales: Record<string, Set<string>> = {};

for (const file of files) {
	const locale = file.replace(".json", "");
	const content = JSON.parse(readFileSync(join(messagesDir, file), "utf-8"));
	locales[locale] = new Set(Object.keys(content));
}

const localeNames = Object.keys(locales);
const reference = localeNames[0];
const referenceKeys = locales[reference];
let hasErrors = false;

for (const locale of localeNames.slice(1)) {
	const keys = locales[locale];

	for (const key of referenceKeys) {
		if (!keys.has(key)) {
			console.error(`Missing in ${locale}: "${key}"`);
			hasErrors = true;
		}
	}

	for (const key of keys) {
		if (!referenceKeys.has(key)) {
			console.error(`Extra in ${locale} (not in ${reference}): "${key}"`);
			hasErrors = true;
		}
	}
}

if (hasErrors) {
	console.error("\ni18n key mismatch found.");
	process.exit(1);
} else {
	console.log(`All ${localeNames.length} locale files have matching keys.`);
}
