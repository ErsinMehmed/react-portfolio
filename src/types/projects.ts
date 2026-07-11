import type { TranslationKey, TranslatableText } from "../i18n/translations";

export type ProjectType = "professional" | "personal";

export interface Project {
  name: TranslationKey;
  /**
   * Either a translation key (e.g. "company.freelance") or a raw company
   * name (e.g. "MyPOS") that isn't in the dictionary and is displayed as-is.
   * Professional-only; personal projects have no employer to credit.
   */
  company?: TranslatableText;
  live?: string;
  github?: string;
  /** Raw technology names, rendered as chips — never translated. */
  technologies: string[];
  description: TranslationKey;
}

export interface ProjectsData {
  professional: Project[];
  personal: Project[];
}

/** The project currently open in ProjectModal, plus enough context (its
 * sibling list and index) to support prev/next keyboard navigation. */
export interface SelectedProject {
  project: Project;
  type: ProjectType;
  items: Project[];
  index: number;
}
