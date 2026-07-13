import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

const OPEN_EVENT = "ask-cv:open";
const ENDPOINT = "/.netlify/functions/ask-cv";

/** Opens the assistant from anywhere (ProfileCard button, command palette). */
export const openAskCv = () => window.dispatchEvent(new CustomEvent(OPEN_EVENT));

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  error?: boolean;
}

const EXAMPLES: TranslationKey[] = ["askCv.ex1", "askCv.ex2", "askCv.ex3"];

const SparkIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm7 12l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z' />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' />
  </svg>
);

const errorKey = (code: string): TranslationKey => {
  if (code === "rate_limited") return "askCv.errorRate";
  if (code === "not_configured") return "askCv.errorConfig";
  return "askCv.error";
};

const AskCvModal = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const idRef = useRef(0);

  const close = () => setOpen(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    triggerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open]);

  // Keep the transcript scrolled to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(String(data?.error ?? "error"));
      }

      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "assistant",
          text: String(data?.answer ?? ""),
          sources: Array.isArray(data?.sources) ? data.sources : [],
        },
      ]);
    } catch (err) {
      const code = err instanceof Error ? err.message : "error";
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "assistant",
          text: t(errorKey(code)),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}>
          <div
            className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60'
            onClick={close}
          />

          <motion.div
            role='dialog'
            aria-modal='true'
            aria-label={t("askCv.title")}
            className='relative z-10 flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:h-[70vh] sm:max-h-[640px] sm:rounded-3xl'
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            {/* Header */}
            <div className='flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800'>
              <div className='flex items-center gap-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1b74e4] dark:bg-blue-500/10 dark:text-blue-400'>
                  <SparkIcon className='h-5 w-5' />
                </span>
                <div>
                  <h2 className='font-display text-base font-bold leading-tight text-slate-800 dark:text-slate-100'>
                    {t("askCv.title")}
                  </h2>
                  <p className='mt-0.5 text-[12px] leading-snug text-slate-500 dark:text-slate-400'>
                    {t("askCv.subtitle")}
                  </p>
                </div>
              </div>
              <button
                type='button'
                onClick={close}
                aria-label='Close'
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200'>
                <svg
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-5 w-5'>
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                </svg>
              </button>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className='flex-1 space-y-4 overflow-y-auto px-5 py-4'>
              {messages.length === 0 && (
                <div className='pt-2'>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    {t("askCv.hint")}
                  </p>
                  <div className='mt-3 flex flex-col gap-2'>
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex}
                        type='button'
                        onClick={() => ask(t(ex))}
                        className='rounded-xl border border-slate-200 px-3.5 py-2.5 text-left text-sm text-slate-700 transition-colors hover:border-[#1b74e4] hover:bg-blue-50/50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/5'>
                        {t(ex)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  sourcesLabel={t("askCv.sources")}
                />
              ))}

              {loading && (
                <div className='flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500'>
                  <span className='flex gap-1'>
                    <Dot delay='0ms' />
                    <Dot delay='150ms' />
                    <Dot delay='300ms' />
                  </span>
                  {t("askCv.thinking")}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className='border-t border-slate-100 px-3 py-3 dark:border-slate-800'>
              <div className='flex items-center gap-2'>
                <input
                  ref={inputRef}
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("askCv.placeholder")}
                  maxLength={500}
                  className='min-w-0 flex-1 rounded-xl bg-slate-100 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b74e4] dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'
                />
                <button
                  type='submit'
                  disabled={!input.trim() || loading}
                  aria-label={t("askCv.send")}
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1b74e4] text-white transition-colors hover:bg-[#1667cf] disabled:cursor-not-allowed disabled:opacity-40'>
                  <SendIcon className='h-[18px] w-[18px]' />
                </button>
              </div>
              <p className='mt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500'>
                {t("askCv.disclaimer")}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dot = ({ delay }: { delay: string }) => (
  <span
    className='h-1.5 w-1.5 animate-bounce rounded-full bg-current'
    style={{ animationDelay: delay }}
  />
);

const MessageBubble = ({
  msg,
  sourcesLabel,
}: {
  msg: Message;
  sourcesLabel: string;
}): ReactNode => {
  if (msg.role === "user") {
    return (
      <div className='flex justify-end'>
        <div className='max-w-[85%] rounded-2xl rounded-br-md bg-[#1b74e4] px-3.5 py-2.5 text-sm text-white'>
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-start'>
      <div className='max-w-[90%]'>
        <div
          className={`rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed ${
            msg.error
              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          }`}>
          {msg.text}
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div className='mt-2 flex flex-wrap items-center gap-1.5'>
            <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
              {sourcesLabel}
            </span>
            {msg.sources.map((src, i) => (
              <span
                key={i}
                className='rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-[#1b74e4] ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20'>
                {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AskCvModal;
