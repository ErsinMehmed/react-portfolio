import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { translations } from "./translations";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (text) => text,
});

// A returning visitor's saved choice wins; a first-time visitor gets Bulgarian
// only if their browser is set to it, otherwise English.
const getInitialLang = () => {
  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "bg") return saved;

  const browser = (
    navigator.language ||
    (navigator.languages && navigator.languages[0]) ||
    ""
  ).toLowerCase();
  return browser.startsWith("bg") ? "bg" : "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((newLang) => {
    setLang(newLang);
  }, []);

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  const contextValue = useMemo(
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