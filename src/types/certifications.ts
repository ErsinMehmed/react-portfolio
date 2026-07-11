import type { TranslationKey } from "../i18n/translations";

export type CertificationKind =
  | "Award"
  | "Certificate"
  | "Course"
  | "Scientific publication"
  | "Sport achievements";

export interface Certification {
  /** Most entries set `kind`; a few (courses, the publication) set `kindEn`
   * instead — both are read via the same `normalizeKind()` fallback chain
   * in Certification.tsx and CertificationCard.tsx. */
  kind?: CertificationKind;
  kindEn?: CertificationKind;
  description: TranslationKey;
  link?: string;
}
