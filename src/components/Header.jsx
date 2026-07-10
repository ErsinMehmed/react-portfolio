import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const currentRoute = headerLinks.find(
      (item) => item.href === location.pathname
    );

    document.title = `${t("profile.name")}${
      currentRoute.title !== "nav.about" ? " | " + t(currentRoute.title) : ""
    }`;
  });

  return (
    <div className='mb-8 hidden lg:flex lg:flex-col lg:items-end'>
      <LanguageToggle className='mb-3 shadow-sm' />

      <header className='h-fit w-fit rounded-2xl bg-white p-4 shadow'>
        <nav>
          <ul className='flex'>
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${
                    location.pathname === item.href
                      ? "text-white bg-[#1b74e4]"
                      : "text-slate-700 hover:text-white hover:bg-[#1b74e4] transition-all bg-[#f3f6f6]"
                  } w-[85px] h-[85px] flex items-center justify-center mx-2.5 rounded-lg text-[13px] font-semibold shadow`}
                  to={item.href}>
                  <div className='text-center'>
                    <item.icon outline='false' />
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
