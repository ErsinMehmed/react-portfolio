import IconDownload from "../icons/Download";
import { socialLinks, personalInfo } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect, lazy, Suspense, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openAskCv } from "./AskCvModal";
import Dialog from "./ui/Dialog";
import Button from "./ui/Button";
import type { IconProps } from "../types/icon";
import { BRAND } from "../theme/colors";

// Only needed once the QR modal opens, so keep it out of the main bundle
// (this component is pulled into the initial chunk by the Loading skeleton).
const QRCodeSVG = lazy(() =>
  import("qrcode.react").then((m) => ({ default: m.QRCodeSVG }))
);

const CheckIcon = ({ className }: IconProps) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M20 6 9 17l-5-5' />
  </svg>
);

const ProfileCard = () => {
  const { t, lang } = useLanguage();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = () => {
    const file =
      lang === "bg"
        ? "/files/Ersin_Hyusein_CV_BG.pdf"
        : "/files/Ersin_Hyusein_CV_EN.pdf";
    window.open(file, "_blank");
  };

  const handlePhoneClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.preventDefault();
      setIsQrModalOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(phoneNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* clipboard unavailable; leave the number visible to copy manually */
    }
  };

  const phoneNumber = "+359899626273";
  const telLink = `tel:${phoneNumber}`;

  return (
    <>
      <div className='lg:sticky top-[158px]'>
        <div className='relative mx-auto mb-6 mt-28 w-full bg-white px-7 pb-5 text-center shadow-[0_24px_70px_-30px_rgba(27,74,120,0.45)] ring-1 ring-slate-900/[0.04] dark:bg-slate-900 dark:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.6)] dark:ring-white/[0.06] sm:mt-32 md:mt-36 lg:mb-0 lg:mt-0 lg:rounded-[28px]'>
          <img
            src={"/images/profile.webp"}
            className='absolute left-1/2 -mt-[104px] h-48 w-48 -translate-x-1/2 rounded-[22px] object-cover shadow-[0_18px_40px_-16px_rgba(27,74,120,0.55)] ring-4 ring-white dark:ring-slate-900'
            alt='Ersin Hyusein, web developer'
          />

          <div className='pt-[96px]'>
            <h2 className='font-display text-[22px] font-bold tracking-tight text-slate-800 dark:text-slate-100'>
              {t("profile.name")}
            </h2>

            <p className='mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400'>
              <span className='h-1.5 w-1.5 rounded-full bg-brand' />
              {t("profile.jobTitle")}
            </p>

            <div className='mt-3.5 flex justify-center gap-2.5'>
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;

                return (
                  <a
                    key={index}
                    href={link.href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={link.label}>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white dark:border-slate-700 dark:text-slate-400'>
                      <IconComponent className='h-[18px] w-[18px]' />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className='mt-3.5 divide-y divide-slate-200/50 rounded-2xl bg-[#f7f9fb] px-5 text-left dark:divide-slate-700/50 dark:bg-slate-800/60'>
              {personalInfo.map((item, index) => {
                const isPhone = index === 2;
                const isEmail = index === 3;

                return (
                  <div
                    key={index}
                    className='flex items-center gap-3.5 py-2.5'>
                    <item.icon className='h-[18px] w-[18px] shrink-0 text-slate-500 dark:text-slate-400' />

                    <dl className='min-w-0 flex-1'>
                      <dt className='text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                        {t(item.title)}
                      </dt>

                      <dd className='text-[15px] font-semibold text-slate-700 dark:text-slate-200'>
                        {isPhone ? (
                          <a
                            className='transition-colors hover:text-brand cursor-pointer'
                            onClick={handlePhoneClick}
                            href={telLink}>
                            {item.text}
                          </a>
                        ) : isEmail ? (
                          <a
                            className='transition-colors hover:text-brand'
                            href='mailto:ersin99mehmed@gmail.com'>
                            {item.text}
                          </a>
                        ) : (
                          t(item.text)
                        )}
                      </dd>
                    </dl>
                  </div>
                );
              })}
            </div>

            <Button
              type='button'
              onClick={openAskCv}
              variant='secondary'
              size='lg'
              fullWidth
              className='mt-4 hover:border-brand hover:text-brand dark:hover:border-blue-400 dark:hover:text-blue-400'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-4 w-4'>
                <path d='M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm7 12l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z' />
              </svg>
              {t("askCv.open")}
            </Button>

            <Button
              type='button'
              onClick={handleDownload}
              size='lg'
              fullWidth
              className='group mt-2'>
              <IconDownload className='h-5 w-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5' />
              {t("profile.downloadCv")}
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        ariaLabel={t("qr.scanPrompt")}
        backdropClassName='absolute inset-0 bg-slate-900/50 backdrop-blur-sm'
        panelClassName='relative z-10 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-slate-900 sm:p-8'>
        <p className='mb-4 text-sm text-slate-500 dark:text-slate-400'>{t("qr.scanPrompt")}</p>

              <div className='mb-4 flex justify-center'>
                {/* Always white/light, in both themes Ã¢â‚¬â€ a dark QR container
                    would still need a white quiet zone around the code for
                    scanners to reliably lock onto it. */}
                <div className='flex h-[232px] w-[232px] items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-lg'>
                  <Suspense
                    fallback={
                      <div className='h-[200px] w-[200px] animate-pulse rounded bg-slate-100' />
                    }>
                    <QRCodeSVG
                      value={telLink}
                      size={200}
                      level='H'
                      includeMargin={true}
                      bgColor='#ffffff'
                      fgColor={BRAND}
                    />
                  </Suspense>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3'>
                <a
                  href={telLink}
                  className='text-base font-semibold text-brand transition-colors hover:text-brand-dark hover:underline'>
                  {phoneNumber}
                </a>

                <div className='relative'>
                  <button
                    type='button'
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                      isCopied
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "border-slate-200 text-brand hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                    }`}>
                    {isCopied ? t("qr.copied") : t("qr.copy")}
                  </button>

                  <AnimatePresence>
                    {isCopied && (
                      <motion.span
                        className='pointer-events-none absolute bottom-full left-1/2 mb-2 flex items-center gap-1 whitespace-nowrap rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-lg'
                        initial={{ opacity: 0, x: "-50%", y: 4 }}
                        animate={{ opacity: 1, x: "-50%", y: 0 }}
                        exit={{ opacity: 0, x: "-50%", y: 4 }}
                        transition={{ duration: 0.15 }}>
                        <CheckIcon className='h-3.5 w-3.5' />
                        {t("qr.copied")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <p className='mt-3 text-xs text-slate-400 dark:text-slate-500'>{t("qr.openCamera")}</p>

              <Button
                type='button'
                onClick={() => setIsQrModalOpen(false)}
                size='md'
                className='mt-6'>
                {t("qr.close")}
              </Button>
      </Dialog>
    </>
  );
};

export default ProfileCard;
