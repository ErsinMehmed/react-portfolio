import { useLanguage, type Lang } from "../i18n/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

const LANGS: Lang[] = ["en", "bg"];

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      {LANGS.map((code) => (
        <button
          key={code}
          type='button'
          onClick={() => setLang(code)}
          aria-label={`Switch language to ${code.toUpperCase()}`}
          className={`relative cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors duration-200 after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            lang === code
              ? "bg-brand text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          }`}>
          {code}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
