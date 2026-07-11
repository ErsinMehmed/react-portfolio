import type { TranslationKey } from "../i18n/translations";
import type { DualIconComponent } from "./icon";

export interface HeaderLink {
  title: TranslationKey;
  href: string;
  icon: DualIconComponent;
}
