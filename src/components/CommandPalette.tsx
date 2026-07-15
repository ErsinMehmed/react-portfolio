import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import Dialog from "./ui/Dialog";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import { openAskCv } from "./AskCvModal";
import type { TranslationKey } from "../i18n/translations";

const OPEN_EVENT = "command-palette:open";

/** Fired by the header trigger; the palette (mounted once in App) listens. */
export const openCommandPalette = () =>
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));

const isMac =
  typeof navigator !== "undefined" &&
  /mac/i.test(navigator.platform || navigator.userAgent);

/* ---- Icons ---- */

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <circle
      cx='11'
      cy='11'
      r='7'
    />
    <path d='M21 21l-4.3-4.3' />
  </svg>
);

const ThemeGlyph = ({ className }: { className?: string }) => (
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

const LangGlyph = ({ className }: { className?: string }) => (
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
      r='9'
    />
    <path d='M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18' />
  </svg>
);

const DownloadGlyph = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14' />
  </svg>
);

const SparkGlyph = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm7 12l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z' />
  </svg>
);

/* ---- Items ---- */

type Group = "pages" | "actions";

interface CommandItem {
  id: string;
  group: Group;
  label: TranslationKey;
  keywords: string;
  icon: ReactNode;
  perform: () => void;
}

/* ---- Trigger button (desktop header) ---- */

export const CommandMenuButton = ({ className = "" }: { className?: string }) => {
  const { t } = useLanguage();

  return (
    <button
      type='button'
      onClick={openCommandPalette}
      aria-label={t("cmd.open")}
      className={`inline-flex h-8 items-center gap-2 rounded-full border border-slate-200 bg-white pl-2.5 pr-1.5 text-slate-500 transition-colors duration-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${className}`}>
      <SearchIcon className='h-3.5 w-3.5' />
      <kbd className='rounded bg-slate-100 px-1.5 py-0.5 font-sans text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
        {isMac ? "âŒ˜K" : "Ctrl K"}
      </kbd>
    </button>
  );
};

/* ---- Palette ---- */

const CommandPalette = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  const items = useMemo<CommandItem[]>(() => {
    const pages: CommandItem[] = headerLinks.map((link) => ({
      id: `page:${link.href}`,
      group: "pages",
      label: link.title,
      keywords: t(link.title),
      icon: <link.icon className='h-4 w-4' />,
      perform: () => navigate(link.href),
    }));

    const downloadCv = () => {
      const file =
        lang === "bg"
          ? "/files/Ersin_Hyusein_CV_BG.pdf"
          : "/files/Ersin_Hyusein_CV_EN.pdf";
      window.open(file, "_blank");
    };

    const actions: CommandItem[] = [
      {
        id: "action:ask-cv",
        group: "actions",
        label: "askCv.open",
        keywords: "ai chat ask cv resume question Ð¿Ð¸Ñ‚Ð°Ð¹",
        icon: <SparkGlyph className='h-4 w-4' />,
        perform: openAskCv,
      },
      {
        id: "action:theme",
        group: "actions",
        label: theme === "dark" ? "cmd.theme.toLight" : "cmd.theme.toDark",
        keywords: "theme dark light mode Ñ‚ÐµÐ¼Ð°",
        icon: <ThemeGlyph className='h-4 w-4' />,
        perform: toggleTheme,
      },
      {
        id: "action:lang",
        group: "actions",
        label: lang === "en" ? "cmd.lang.toBg" : "cmd.lang.toEn",
        keywords: "language ÐµÐ·Ð¸Ðº bulgarian english bg en",
        icon: <LangGlyph className='h-4 w-4' />,
        perform: () => setLang(lang === "en" ? "bg" : "en"),
      },
      {
        id: "action:cv",
        group: "actions",
        label: "profile.downloadCv",
        keywords: "cv resume download pdf ÑÐ²Ð°Ð»Ð¸",
        icon: <DownloadGlyph className='h-4 w-4' />,
        perform: downloadCv,
      },
    ];

    return [...pages, ...actions];
  }, [t, lang, setLang, theme, toggleTheme, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        t(item.label).toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [items, query, t]);

  // Toggle on Ctrl/Cmd+K anywhere; also open on the header-trigger event.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Reset the query/selection each time it opens. Scroll-lock, focus and focus
  // restore are handled by <Dialog> (via initialFocusRef).
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
  }, [open]);

  // Keep the active row in view as it moves.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item: CommandItem) => {
    item.perform();
    close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) run(item);
    }
    // Escape is handled by <Dialog>.
  };

  const ease = [0.22, 1, 0.36, 1] as const;
  const panelMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18, ease },
      }
    : {
        initial: { opacity: 0, scale: 0.97, y: -8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: -6 },
        transition: { duration: 0.18, ease },
      };

  return (
    <Dialog
      open={open}
      onClose={close}
      ariaLabel={t("cmd.open")}
      initialFocusRef={inputRef}
      containerClassName='fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]'
      backdropClassName='absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60'
      panelClassName='relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900'
      panelMotion={panelMotion}>
      <div className='flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800'>
              <SearchIcon className='h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500' />
              <input
                ref={inputRef}
                type='text'
                role='combobox'
                aria-expanded='true'
                aria-controls='command-palette-list'
                aria-activedescendant={
                  filtered[active] ? `cmd-opt-${active}` : undefined
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={t("cmd.placeholder")}
                className='w-full bg-transparent py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500'
              />
              <kbd className='hidden shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500 sm:block'>
                Esc
              </kbd>
            </div>

            <div
              ref={listRef}
              id='command-palette-list'
              role='listbox'
              className='max-h-[min(420px,60vh)] overflow-y-auto p-2'>
              {filtered.length === 0 ? (
                <div className='px-4 py-8 text-center text-sm text-slate-400 dark:text-slate-500'>
                  {t("cmd.empty")}
                </div>
              ) : (
                filtered.map((item, i) => {
                  const showHeader =
                    i === 0 || filtered[i - 1].group !== item.group;
                  const isActive = i === active;

                  return (
                    <div key={item.id}>
                      {showHeader && (
                        <div className='px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
                          {t(item.group === "pages" ? "cmd.pages" : "cmd.actions")}
                        </div>
                      )}
                      <div
                        id={`cmd-opt-${i}`}
                        data-index={i}
                        role='option'
                        aria-selected={isActive}
                        onMouseMove={() => {
                          if (active !== i) setActive(i);
                        }}
                        onClick={() => run(item)}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                          isActive
                            ? "bg-brand text-white"
                            : "text-slate-700 dark:text-slate-200"
                        }`}>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 dark:text-slate-500"
                          }`}>
                          {item.icon}
                        </span>
                        <span className='flex-1'>{t(item.label)}</span>
                        {isActive && (
                          <span className='text-[11px] opacity-80'>&#8629;</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
    </Dialog>
  );
};

export default CommandPalette;
