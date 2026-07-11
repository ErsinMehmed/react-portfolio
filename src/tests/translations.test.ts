import { translations, type TranslationEntry } from "../i18n/translations";

// `translations` is a literal-per-key union (see LanguageContext for why);
// every entry conforms to TranslationEntry by construction (`satisfies`
// checked it at declaration), so this cast is safe and gives uniform access.
const entries = Object.entries(translations) as [string, TranslationEntry][];

test("the dictionary is not empty", () => {
  expect(entries.length).toBeGreaterThan(0);
});

test("every key provides a non-empty English base string", () => {
  // English is the base/fallback: t() renders entry.en when a bg value is
  // absent, so a missing or empty en would surface a raw key on the page.
  const missingEn = entries.filter(
    ([, value]) => typeof value?.en !== "string" || value.en.trim().length === 0
  );

  // Name the offending keys so a failure points straight at what to fix.
  expect(missingEn.map(([key]) => key)).toEqual([]);
});

test("a defined Bulgarian value is never blank", () => {
  // Brand/proper-noun keys (company names, the "AI" filter) intentionally omit
  // bg and fall back to English, which is fine. But a present-yet-empty bg is
  // always a typo, so catch bg: "" without forcing every key to be translated.
  const blankBg = entries.filter(
    ([, value]) => "bg" in (value || {}) && String(value.bg).trim().length === 0
  );

  expect(blankBg.map(([key]) => key)).toEqual([]);
});

test("English and Bulgarian are actually different for real sentences", () => {
  // Short tokens (URLs, brand names, symbols) can legitimately be identical
  // across languages; anything longer being identical usually means a
  // Bulgarian translation was forgotten and the English was pasted in.
  const suspicious = entries.filter(([, value]) => {
    if (typeof value?.en !== "string" || typeof value?.bg !== "string") {
      return false;
    }
    return value.en.length > 25 && value.en === value.bg;
  });

  expect(suspicious.map(([key]) => key)).toEqual([]);
});
