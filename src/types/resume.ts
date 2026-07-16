import type { TranslationKey } from "../i18n/translations";
import type { IconComponent } from "./icon";

/** A "MM.YYYY - MM.YYYY" or "MM.YYYY - Present" range (see tests/Data.test.ts). */
export type PeriodRange = string;

export interface Education {
  title: TranslationKey;
  period: PeriodRange;
  degree: TranslationKey;
  institution: TranslationKey;
}

export interface Experience {
  title: TranslationKey;
  period: PeriodRange;
  location: TranslationKey;
  company: TranslationKey;
}

/**
 * A real reference/recommendation. `url` links to the scanned letter (kept
 * off-site), `role` is the referrer's position at `company`. `quote` is an
 * optional pull-quote to surface if a short excerpt is later transcribed —
 * left unset rather than inventing one.
 */
export interface Recommendation {
  company: TranslationKey;
  role: TranslationKey;
  url: string;
  quote?: TranslationKey;
}

export interface MainSkill {
  title: TranslationKey;
  text: TranslationKey;
  icon: IconComponent;
}

export type SkillKind = "Frontend" | "Backend" | "Database" | "AI" | "Other";

export interface TechSkill {
  /** Raw technology name (e.g. "React.js") — rendered as-is, never translated. */
  title: string;
  kind: SkillKind;
  description: TranslationKey;
  /** Years of hands-on experience. */
  years: number;
  /** Number of shipped projects that used this technology. */
  projects: number;
  /** Optional bullet list of concrete use cases, shown in the hover card. */
  items?: TranslationKey[];
  /** Tailwind background color class for the fallback dot / gauge fill. */
  color: string;
}
