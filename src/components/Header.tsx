import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const currentRoute = headerLinks.find(
      (item) => item.href === location.pathname
    );

    document.title = currentRoute
      ? `${t("profile.name")}${
          currentRoute.title !== "nav.about" ? " | " + t(currentRoute.title) : ""
        }`
      : `${t("profile.name")} | ${t("notFound.title")}`;
  });

  return (
    <div className='mb-8 hidden lg:flex lg:flex-col lg:items-end'>
      <div className='mb-3 flex items-center gap-2'>
        <LanguageToggle className='shadow-sm' />
        <ThemeToggle className='shadow-sm' />
      </div>

      <header className='h-fit w-fit rounded-2xl bg-white p-4 shadow dark:bg-slate-900'>
        <nav>
          <ul className='flex'>
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${
                    location.pathname === item.href
                      ? "text-white bg-[#1b74e4]"
                      : "text-slate-700 hover:text-white hover:bg-[#1b74e4] transition-all bg-[#f3f6f6] dark:text-slate-300 dark:bg-slate-800"
                  } w-[89px] h-[89px] flex items-center justify-center mx-2.5 rounded-lg text-[13px] font-semibold shadow`}
                  to={item.href}>
                  <div className='text-center'>
                    <item.icon outline />
                    {t(item.title)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
