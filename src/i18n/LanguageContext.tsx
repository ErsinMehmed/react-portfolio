import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { translations, type TranslatableText, type TranslationEntry } from "./translations";

export type Lang = "en" | "bg";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslatableText) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (text) => text,
});

// A returning visitor's saved choice wins; a first-time visitor gets Bulgarian
// only if their browser is set to it, otherwise English.
const getInitialLang = (): Lang => {
  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "bg") return saved;

  const browser = (
    navigator.language ||
    (navigator.languages && navigator.languages[0]) ||
    ""
  ).toLowerCase();
  return browser.startsWith("bg") ? "bg" : "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((newLang: Lang) => {
    setLang(newLang);
  }, []);

  const t = useCallback(
    (key: TranslatableText): string => {
      // `translations` is a giant literal-per-key union (each entry keeps its
      // own exact `{ en, bg? }` shape for strict key inference elsewhere), so
      // a dynamic lookup by a widened key needs one cast back to the shared
      // `TranslationEntry` shape before uniform `en`/`bg` access works.
      const entry = translations[key as keyof typeof translations] as
        | TranslationEntry
        | undefined;
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  const contextValue = useMemo<LanguageContextValue>(
    () => ({ lang, setLang: setLanguage, t }),
    [lang, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
