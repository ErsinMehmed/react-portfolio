import React, { createContext, useContext, useEffect, useState } from "react";
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

  // The English text is the key; falls back to English when no translation.
  const t = (text) => (lang === "bg" ? bg[text] ?? text : text);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
