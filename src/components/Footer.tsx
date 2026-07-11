import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className='text-center pt-8 font-semibold text-sm sm:text-base text-slate-500 dark:text-slate-400'>
        &copy; {new Date().getFullYear()} {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
