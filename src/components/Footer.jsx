import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className='text-center pt-8 font-semibold text-sm sm:text-base text-slate-500'>
        {t("© 2026 All Rights Reserved by Ersin Hyusein")}
      </div>
    </footer>
  );
};

export default Footer;
