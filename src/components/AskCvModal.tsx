import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import Dialog from "./ui/Dialog";
import { track } from "../lib/track";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";
import {
  streamAskCv,
  parseAskAnswer,
  stripMeta,
  type AskCvMode,
} from "../lib/askCv";

const EASE = [0.22, 1, 0.36, 1] as const;

const OPEN_EVENT = "ask-cv:open";

/** Opens the assistant from anywhere (ProfileCard button, command palette). */
export const openAskCv = () => window.dispatchEvent(new CustomEvent(OPEN_EVENT));

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  followups?: string[];
  streaming?: boolean;
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

const InterviewIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M9 18h6M10 22h4' />
    <path d='M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z' />
  </svg>
);

const errorKey = (code: string): TranslationKey => {
  if (code === "rate_limited") return "askCv.errorRate";
  if (code === "not_configured") return "askCv.errorConfig";
  return "askCv.error";
};

const AskCvModal = () => {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const close = () => setOpen(false);

  // Opened from anywhere via the custom event; Escape/scroll-lock/focus are
  // handled by <Dialog>.
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      track("askcv_open");
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Keep the transcript scrolled to the newest message / streamed token.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const patch = (id: number, next: Partial<Message>) =>
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, ...next } : x)));

  const send = async ({
    mode,
    question,
    userLabel,
  }: {
    mode: AskCvMode;
    question?: string;
    userLabel: string;
  }) => {
    if (loading) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text: userLabel };
    const assistantId = idRef.current++;
    setMessages((m) => [
      ...m,
      userMsg,
      { id: assistantId, role: "assistant", text: "", streaming: true },
    ]);
    setInput("");
    setLoading(true);

    try {
      const raw = await streamAskCv({
        mode,
        question,
        lang,
        onToken: (full) =>
          patch(assistantId, { text: mode === "ask" ? stripMeta(full) : full }),
      });

      if (mode === "ask") {
        const { answer, sources, followups } = parseAskAnswer(raw);
        patch(assistantId, {
          text: answer || raw.trim(),
          sources,
          followups,
          streaming: false,
        });
      } else {
        patch(assistantId, { text: raw.trim(), streaming: false });
      }
    } catch (err) {
      const code = err instanceof Error ? err.message : "error";
      patch(assistantId, {
        text: t(errorKey(code)),
        error: true,
        streaming: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    send({ mode: "ask", question: q, userLabel: q });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const startInterview = () =>
    send({ mode: "interview", userLabel: t("askCv.interviewLabel") });

  const last = messages[messages.length - 1];
  const waiting = loading && last?.role === "assistant" && last.text === "";

  const panelMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.22, ease: EASE },
      }
    : {
        initial: { opacity: 0, scale: 0.97, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: 12 },
        transition: { duration: 0.22, ease: EASE },
      };

  return (
    <Dialog
      open={open}
      onClose={close}
      ariaLabel={t("askCv.title")}
      initialFocusRef={inputRef}
      containerClassName='fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4'
      backdropClassName='absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60'
      panelClassName='relative z-10 flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:h-[70vh] sm:max-h-[640px] sm:rounded-3xl'
      panelMotion={panelMotion}>
      {/* Header */}
      <div className='flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800'>
        <div className='flex items-center gap-3'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand dark:bg-blue-500/10 dark:text-blue-400'>
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

      {/* Transcript. role=log + aria-live announces each new answer to
          screen readers as it streams in, without re-reading the history. */}
      <div
        ref={scrollRef}
        role='log'
        aria-live='polite'
        aria-relevant='additions'
        className='flex-1 space-y-4 overflow-y-auto px-5 py-4'>
        {messages.length === 0 && (
          <div className='pt-2'>
            {/* Interview-prep mode: one tap generates a grounded question set. */}
            <button
              type='button'
              onClick={startInterview}
              className='group flex w-full items-center gap-3 rounded-2xl border border-brand/25 bg-blue-50/60 px-4 py-3 text-left transition-colors hover:border-brand/50 hover:bg-blue-50 dark:border-blue-400/20 dark:bg-blue-500/10 dark:hover:border-blue-400/40 dark:hover:bg-blue-500/15'>
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_20px_-8px_theme(colors.brand.DEFAULT/70%)]'>
                <InterviewIcon className='h-[18px] w-[18px]' />
              </span>
              <span className='min-w-0'>
                <span className='block text-sm font-semibold text-slate-800 dark:text-slate-100'>
                  {t("askCv.interview")}
                </span>
                <span className='mt-0.5 block text-[12px] leading-snug text-slate-500 dark:text-slate-400'>
                  {t("askCv.interviewHint")}
                </span>
              </span>
            </button>

            <p className='mt-5 text-sm text-slate-500 dark:text-slate-400'>
              {t("askCv.hint")}
            </p>
            <div className='mt-3 flex flex-col gap-2'>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type='button'
                  onClick={() => ask(t(ex))}
                  className='rounded-xl border border-slate-200 px-3.5 py-2.5 text-left text-sm text-slate-700 transition-colors hover:border-brand hover:bg-blue-50/50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/5'>
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
            followupsLabel={t("askCv.followups")}
            onFollowup={ask}
            disabled={loading}
          />
        ))}

        {waiting && (
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
            className='min-w-0 flex-1 rounded-xl bg-slate-100 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'
          />
          <button
            type='submit'
            disabled={!input.trim() || loading}
            aria-label={t("askCv.send")}
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40'>
            <SendIcon className='h-[18px] w-[18px]' />
          </button>
        </div>
        <p className='mt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500'>
          {t("askCv.disclaimer")}
        </p>
      </form>
    </Dialog>
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
  followupsLabel,
  onFollowup,
  disabled,
}: {
  msg: Message;
  sourcesLabel: string;
  followupsLabel: string;
  onFollowup: (q: string) => void;
  disabled: boolean;
}): ReactNode => {
  if (msg.role === "user") {
    return (
      <div className='flex justify-end'>
        <div className='max-w-[85%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-sm text-white'>
          {msg.text}
        </div>
      </div>
    );
  }

  // Nothing to show until the first token lands — the "Thinking…" loader
  // already covers the wait, so skip the empty bubble the caret used to sit in.
  if (!msg.text) return null;

  return (
    <div className='flex justify-start'>
      <div className='max-w-[90%]'>
        <div
          className={`whitespace-pre-wrap break-words rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed ${
            msg.error
              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          }`}>
          {msg.text}
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div className='mt-2 flex flex-wrap items-center gap-1.5'>
            <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500'>
              {sourcesLabel}
            </span>
            {msg.sources.map((src, i) => (
              <span
                key={i}
                className='rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-brand ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20'>
                {src}
              </span>
            ))}
          </div>
        )}

        {!msg.streaming && msg.followups && msg.followups.length > 0 && (
          <div className='mt-3'>
            <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500'>
              {followupsLabel}
            </span>
            <div className='mt-1.5 flex flex-col gap-1.5'>
              {msg.followups.map((fu, i) => (
                <button
                  key={i}
                  type='button'
                  disabled={disabled}
                  onClick={() => onFollowup(fu)}
                  className='group flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-left text-[13px] text-slate-600 transition-colors hover:border-brand hover:bg-blue-50/50 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/5 dark:hover:text-blue-400'>
                  <span className='text-slate-300 transition-colors group-hover:text-brand dark:text-slate-600'>
                    ↳
                  </span>
                  {fu}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskCvModal;
