import type { TranslationKey, TranslatableText } from "../i18n/translations";
import type { IconComponent } from "./icon";

export interface SocialLink {
  href: string;
  icon: IconComponent;
  /** Plain aria-label — never routed through `t()`. */
  label: string;
}

export interface PersonalInfoItem {
  title: TranslationKey;
  /**
   * Either a translation key (e.g. "profile.locationValue") or a raw literal
   * value (age, phone number, email) that's displayed as-is.
   */
  text: TranslatableText;
  icon: IconComponent;
}
