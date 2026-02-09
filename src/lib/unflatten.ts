/**
 * Convert a flat-key object into a nested object.
 *
 * ```
 * unflatten({ "a.b.c": "hello" })
 * // => { a: { b: { c: "hello" } } }
 * ```
 *
 * JSON files use flat keys for readability (`section.intro.greeting`).
 * next-intl requires nested objects at runtime, so we unflatten on load.
 */
export function unflatten(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current: Record<string, unknown> = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in current) || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }

    current[parts[parts.length - 1]] = value;
  }

  return result;
}
