import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import type { IconProps } from "../types/icon";

const SunIcon = ({ className }: IconProps) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <circle
      cx='12'
      cy='12'
      r='4'
    />
    <path d='M12 3v1.5M12 19.5V21M4.9 4.9l1.06 1.06M18.04 18.04l1.06 1.06M3 12h1.5M19.5 12H21M4.9 19.1l1.06-1.06M18.04 5.96l1.06-1.06' />
  </svg>
);

const MoonIcon = ({ className }: IconProps) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M20.5 14.5a8.5 8.5 0 11-9-11 6.7 6.7 0 009 11z' />
  </svg>
);

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b74e4] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${className}`}>
      <AnimatePresence
        mode='wait'
        initial={false}>
        <motion.span
          key={theme}
          className='absolute inset-0 flex items-center justify-center'
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          {isDark ? (
            <MoonIcon className='h-4 w-4' />
          ) : (
            <SunIcon className='h-4 w-4' />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
