import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { bg } from "./translations";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (text) => text,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((newLang) => {
    setLang(newLang);
  }, []);

  const t = useCallback(
    (text) => (lang === "bg" ? bg[text] ?? text : text),
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