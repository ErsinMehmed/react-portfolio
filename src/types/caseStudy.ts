import type { TranslationKey } from "../i18n/translations";

/**
 * Case-study content lives outside the shared `translations` dictionary: each
 * study carries long-form bilingual prose that would bloat the flat `t()` map
 * (and drown the translation-parity test in one-off keys). So the narrative
 * fields are inline `{ en, bg }` pairs, resolved against the active `lang`.
 * Short, reused labels (section titles, buttons) still go through `t()`.
 */
export interface Bilingual {
  en: string;
  bg: string;
}

/**
 * Per-study accent. The site keeps one brand blue everywhere else; a case
 * study is allowed its own hue so the three studies read as distinct chapters
 * (myPOS blue, AutoPilot violet, Soko Beauty rose) without forking the design
 * system. Values are wired up as CSS custom properties on the page root.
 */
export interface CaseStudyAccent {
  /** Solid fill for buttons, the spine, active markers. */
  base: string;
  /** Accent text on light surfaces, darkened to clear AA on white. */
  ink: string;
  /** Accent text on dark surfaces, lightened to clear AA on slate-950. */
  onDark: string;
  /** Faint tint for accent backgrounds in light mode. */
  soft: string;
  /** Ambient glow (hero backdrop, hovers), already alpha-baked. */
  glow: string;
}

/** One headline number in the "at a glance" band. */
export interface CaseStudyMetric {
  value: number;
  prefix?: string;
  /** Plain when language-neutral ("%", "+"); Bilingual when it needs translating ("-in-1"). */
  suffix?: string | Bilingual;
  label: Bilingual;
  /** One-line context under the number. */
  detail?: Bilingual;
}

/** A key technical decision, told as problem then choice then why then result. */
export interface CaseStudyDecision {
  /** Short verb-led title, e.g. "Cache the analytics read path". */
  title: Bilingual;
  problem: Bilingual;
  choice: Bilingual;
  why: Bilingual;
  impact?: Bilingual;
  /** Raw tech tags for this decision, rendered as chips. Never translated. */
  tags?: string[];
}

/** One horizontal layer of the architecture diagram, top to bottom. */
export interface ArchLayer {
  /** Layer name, e.g. "Client", "Domain services", "Data". */
  title: Bilingual;
  /** One-line role of the layer. */
  role: Bilingual;
  /** Node chips inside the layer. Names are raw tech, kept verbatim. */
  nodes: string[];
}

export interface CaseStudyStackGroup {
  group: Bilingual;
  items: string[];
}

export interface CaseStudy {
  /** URL segment: /projects/:slug */
  slug: string;
  /** Reuses the project's existing name key so the title stays in one place. */
  name: TranslationKey;
  accent: CaseStudyAccent;
  /** Small over-line above the hero title, e.g. "myPOS · Payments platform". */
  eyebrow: Bilingual;
  /** One committed sentence: the whole project in a breath. */
  tagline: Bilingual;
  /** Hero paragraph, a touch longer than the tagline. */
  summary: Bilingual;
  role: Bilingual;
  timeline: string;
  liveUrl?: string;
  metrics: CaseStudyMetric[];
  problem: {
    body: Bilingual[];
    constraints: Bilingual[];
  };
  architecture: {
    intro: Bilingual;
    layers: ArchLayer[];
    note?: Bilingual;
  };
  decisions: CaseStudyDecision[];
  results: {
    body: Bilingual[];
    points: Bilingual[];
  };
  stack: CaseStudyStackGroup[];
}
