import { Link, useLocation } from "react-router-dom";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const MobileMenu = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className='lg:hidden fixed z-50 w-full h-14 max-w-sm sm:max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-3.5 left-1/2'>
      <div className='grid h-full max-w-lg grid-cols-4 mx-auto'>
        {headerLinks.map((item, index) => (
          <Link
            key={item.href}
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              location.pathname === item.href
                ? "bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] text-white"
                : "hover:text-[#ffafbd] text-slate-500"
            }  ${
              index === 0 ? "rounded-l-full" : index === 3 ? "rounded-r-full" : ""
            }`}
            to={item.href}>
            <item.icon />
            <span className='sr-only'>{t(item.title)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
