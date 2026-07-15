import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import { useLanguage } from "../i18n/LanguageContext";
import { routes } from "../routes";

const REVEAL_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='notFound.title'>
      <div className='relative mt-8 overflow-hidden rounded-2xl'>
        {/* Dotted engineering grid, faded toward the edges for depth */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 [background-image:radial-gradient(theme(colors.brand.DEFAULT/11%)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] dark:[background-image:radial-gradient(rgba(96,165,250,0.16)_1px,transparent_1px)]'
        />

        <div className='relative flex flex-col items-center py-12 text-center sm:py-16'>
          {/* Outlined 404 with the brand fill rising in on mount */}
          <div className='relative select-none leading-none'>
            <span
              aria-hidden='true'
              className='block font-display text-[6.5rem] font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:2px_theme(colors.brand.DEFAULT/30%)] dark:[-webkit-text-stroke:2px_rgba(96,165,250,0.35)] sm:text-[9.5rem]'>
              404
            </span>
            <motion.span
              aria-hidden='true'
              className='absolute inset-0 block font-display text-[6.5rem] font-extrabold leading-none tracking-tight text-brand sm:text-[9.5rem]'
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.12 }}>
              404
            </motion.span>
          </div>

          {/* The route that missed, as a developer would read it in a shell */}
          <div className='mt-7 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-1.5 font-mono text-[12.5px] dark:border-slate-700 dark:bg-slate-800/60'>
            <span className='h-2 w-2 shrink-0 rounded-full bg-brand' />
            <span className='shrink-0 text-slate-400 dark:text-slate-500'>~</span>
            <span className='truncate text-slate-600 dark:text-slate-300'>{location.pathname}</span>
            <span className='shrink-0 text-slate-300 dark:text-slate-600'>&rarr;</span>
            <span className='shrink-0 font-semibold text-brand dark:text-blue-400'>404</span>
            <span
              aria-hidden='true'
              className='ml-0.5 inline-block h-[1.05em] w-[2px] shrink-0 translate-y-[1px] bg-brand animate-caret dark:bg-blue-400'
            />
          </div>

          <p className='mt-7 max-w-[46ch] leading-relaxed text-slate-500 dark:text-slate-400'>
            {t("notFound.message")}
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <Button
              to={routes.home}
              size='lg'>
              {t("notFound.backHome")}
            </Button>
            <Button
              to={routes.projects}
              variant='secondary'
              size='lg'>
              {t("nav.projects")}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
