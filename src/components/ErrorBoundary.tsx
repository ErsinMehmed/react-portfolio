import { Component, type ErrorInfo, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./ui/Button";
import { useLanguage } from "../i18n/LanguageContext";
import { routes } from "../routes";

const REVEAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The screen a visitor sees if a render throws. Full-bleed with the site's own
// background so it reads as part of the app, and it borrows 404's shell-line
// language so both fault states feel authored by the same hand. Recovery is a
// hard reload (`window.location`/anchor), not a router transition, because the
// boundary can't reset its own error state on a client-side navigation.
export const ErrorFallback = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <div className='flex min-h-screen w-full items-center justify-center px-5 py-10 bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: REVEAL_EASE }}
        className='relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 bg-white px-7 py-10 text-center shadow-[0_24px_60px_-24px_rgba(27,74,120,0.35)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]'>
        {/* Same faded engineering grid as the 404, for a shared fault-state look */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 [background-image:radial-gradient(theme(colors.brand.DEFAULT/10%)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:[background-image:radial-gradient(rgba(96,165,250,0.14)_1px,transparent_1px)]'
        />

        <div className='relative flex flex-col items-center'>
          <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-brand ring-1 ring-slate-100 dark:bg-slate-800 dark:text-blue-400 dark:ring-slate-700'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
              className='h-7 w-7'>
              <path
                d='M10.3 3.86 2.52 17.36a1.96 1.96 0 0 0 1.7 2.94h15.56a1.96 1.96 0 0 0 1.7-2.94L13.7 3.86a1.96 1.96 0 0 0-3.4 0Z'
                stroke='currentColor'
                strokeWidth='1.7'
                strokeLinejoin='round'
              />
              <path
                d='M12 9.25v3.5'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <circle
                cx='12'
                cy='16.4'
                r='1.15'
                fill='currentColor'
              />
            </svg>
          </span>

          <h1 className='mt-6 font-display text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
            {t("error.title")}
          </h1>

          <p className='mt-3 max-w-[42ch] text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
            {t("error.message")}
          </p>

          {/* Shell line echoing the 404, so the two states share a visual grammar */}
          <div className='mt-6 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-1.5 font-mono text-[12.5px] dark:border-slate-700 dark:bg-slate-800/60'>
            <span className='h-2 w-2 shrink-0 rounded-full bg-brand' />
            <span className='shrink-0 text-slate-400 dark:text-slate-500'>~</span>
            <span className='truncate text-slate-600 dark:text-slate-300'>{t("error.console")}</span>
            <span
              aria-hidden='true'
              className='ml-0.5 inline-block h-[1.05em] w-[2px] shrink-0 translate-y-[1px] bg-brand animate-caret dark:bg-blue-400'
            />
          </div>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <Button
              size='lg'
              onClick={() => window.location.reload()}>
              {t("error.reload")}
            </Button>
            <Button
              href={routes.home}
              variant='secondary'
              size='lg'>
              {t("notFound.backHome")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// React error boundaries have to be class components — this is the one class in
// the app. It catches render/lifecycle throws from the whole route tree so a
// single bad render shows the fallback above instead of a blank white page.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No error-reporting backend on a portfolio; the console is the sink.
    console.error("Uncaught render error:", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}

export default ErrorBoundary;
