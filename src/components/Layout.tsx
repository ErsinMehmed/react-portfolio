import { useState, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import ProfileCard from "./ProfileCard";
import ChevronUp from "../icons/ChevronUp";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface LayoutProps {
  header: TranslationKey;
  classes?: string;
  contentClasses?: string;
  children: ReactNode;
}

const Layout = ({ header, classes = "", contentClasses = "", children }: LayoutProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className='w-full min-h-screen pb-12 lg:pb-8 bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='fixed right-4 top-4 z-40 flex items-center gap-2 lg:hidden'>
        <LanguageToggle className='shadow-sm' />
        <ThemeToggle className='shadow-sm' />
      </div>

      <div className='h-full w-full min-h-screen max-w-[2000px] mx-auto'>
        <div className='relative h-full lg:px-4 xl:px-32 2xl:px-40 lg:flex 2xl:justify-center gap-10 pt-0.5 lg:pt-[158px]'>
          <span className='w-fit lg:w-[350px] xl:w-[400px] lg:block lg:shrink-0'>
            <ProfileCard />
          </span>

          <div className={`w-full ${contentClasses}`}>
            <div className='flex justify-end'>
              <Header />
              <MobileMenu />
            </div>

            <div
              className={`lg:rounded-2xl bg-white py-8 lg:py-10 ${classes} shadow dark:bg-slate-900`}>
              <main>
                <motion.h2
                  className='font-display font-bold tracking-tight text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 flex items-center'
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}>
                  {t(header)}
                  <div className='h-0.5 w-32 sm:w-44 ml-8 bg-brand mt-1.5 rounded' />
                </motion.h2>

                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>

        {showScrollButton && (
          <button
            className='hidden lg:flex w-10 h-10 fixed z-20 right-4 bottom-4 bg-brand hover:opacity-80 rounded-full justify-center items-center transition-all text-white'
            onClick={scrollToTop}>
            <ChevronUp className='w-7 h-7' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Layout;
