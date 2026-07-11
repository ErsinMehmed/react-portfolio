import { useLanguage, type Lang } from "../i18n/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

const LANGS: Lang[] = ["en", "bg"];

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 ${className}`}>
      {LANGS.map((code) => (
        <button
          key={code}
          type='button'
          onClick={() => setLang(code)}
          aria-label={`Switch language to ${code.toUpperCase()}`}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b74e4] ${
            lang === code
              ? "bg-[#1b74e4] text-white"
              : "text-slate-500 hover:text-slate-700"
          }`}>
          {code}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
