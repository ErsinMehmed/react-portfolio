import type { Lang } from "../i18n/LanguageContext";
import { translations } from "../i18n/translations";
import { BRAND } from "../theme/colors";

const MONOGRAM = [
  "█████  █   █",
  "█      █   █",
  "████   █████",
  "█      █   █",
  "█████  █   █",
].join("\n");

const GITHUB_URL = "https://github.com/ErsinMehmed";

let logged = false;

/** DevTools easter egg: printed once at boot for whoever opens the console. */
export const logConsoleSignature = (lang: Lang): void => {
  if (logged) return;
  logged = true;

  const message = translations["console.signature"][lang] ?? translations["console.signature"].en;

  console.log(
    `%c${MONOGRAM}\n\n%c${message}\n%c${GITHUB_URL}`,
    `color:${BRAND};font-family:monospace;white-space:pre;line-height:1.2;`,
    "font:13px/1.4 sans-serif;color:inherit;",
    `color:${BRAND};font-weight:600;`
  );
};
