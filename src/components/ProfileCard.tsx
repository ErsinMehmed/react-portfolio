import IconDownload from "../icons/Download";
import { socialLinks, personalInfo } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect, lazy, Suspense, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconProps } from "../types/icon";

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

  // Lock body scroll and close on Escape while the QR modal is open.
  useEffect(() => {
    if (!isQrModalOpen) return undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsQrModalOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isQrModalOpen]);

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
        <div className='relative mx-auto mb-6 mt-32 w-full bg-white px-7 pb-6 text-center shadow-[0_24px_70px_-30px_rgba(27,74,120,0.45)] ring-1 ring-slate-900/[0.04] sm:mt-36 md:mt-40 lg:mb-0 lg:mt-0 lg:rounded-[28px]'>
          <img
            src={"/images/profile.webp"}
            className='absolute left-1/2 -mt-[120px] h-52 w-52 -translate-x-1/2 rounded-[22px] object-cover shadow-[0_18px_40px_-16px_rgba(27,74,120,0.55)] ring-4 ring-white lg:h-48 lg:w-48 xl:h-52 xl:w-52'
            alt='Ersin Hyusein, web developer'
          />

          <div className='pt-[104px]'>
            <h2 className='font-display text-[24px] font-bold tracking-tight text-slate-800'>
              {t("profile.name")}
            </h2>

            <p className='mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-500'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#1b74e4]' />
              {t("profile.jobTitle")}
            </p>

            <div className='mt-4 flex justify-center gap-2.5'>
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;

                return (
                  <a
                    key={index}
                    href={link.href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={link.label}>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#1b74e4] hover:bg-[#1b74e4] hover:text-white'>
                      <IconComponent className='h-[18px] w-[18px]' />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className='mt-5 divide-y divide-slate-200/50 rounded-2xl bg-[#f7f9fb] px-5 text-left'>
              {personalInfo.map((item, index) => {
                const isPhone = index === 2;
                const isEmail = index === 3;

                return (
                  <div
                    key={index}
                    className='flex items-center gap-3.5 py-2.5'>
                    <item.icon className='h-[18px] w-[18px] shrink-0 text-slate-500' />

                    <dl className='min-w-0 flex-1'>
                      <dt className='text-[11px] font-semibold uppercase tracking-wider text-slate-500'>
                        {t(item.title)}
                      </dt>

                      <dd className='text-[15px] font-semibold text-slate-700'>
                        {isPhone ? (
                          <a
                            className='transition-colors hover:text-[#1b74e4] cursor-pointer'
                            onClick={handlePhoneClick}
                            href={telLink}>
                            {item.text}
                          </a>
                        ) : isEmail ? (
                          <a
                            className='transition-colors hover:text-[#1b74e4]'
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

            <button
              type='button'
              className='group mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1b74e4] px-8 py-3 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgba(27,116,228,0.7)] transition-all duration-200 ease-out hover:bg-[#1667cf] active:scale-[0.98]'
              onClick={handleDownload}>
              <IconDownload className='h-5 w-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5' />
              {t("profile.downloadCv")}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isQrModalOpen && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <div
              className='absolute inset-0 bg-slate-900/50 backdrop-blur-sm'
              onClick={() => setIsQrModalOpen(false)}
            />

            <motion.div
              role='dialog'
              aria-modal='true'
              className='relative z-10 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8'
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
              <p className='mb-4 text-sm text-slate-500'>{t("qr.scanPrompt")}</p>

              <div className='mb-4 flex justify-center'>
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
                      fgColor='#1b74e4'
                    />
                  </Suspense>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3'>
                <a
                  href={telLink}
                  className='text-base font-semibold text-[#1b74e4] transition-colors hover:text-[#1667cf] hover:underline'>
                  {phoneNumber}
                </a>

                <div className='relative'>
                  <button
                    type='button'
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                      isCopied
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border-slate-200 text-[#1b74e4] hover:border-slate-300 hover:bg-slate-50"
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

              <p className='mt-3 text-xs text-slate-400'>{t("qr.openCamera")}</p>

              <button
                type='button'
                onClick={() => setIsQrModalOpen(false)}
                className='mt-6 rounded-xl bg-[#1b74e4] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(27,116,228,0.5)] transition-colors hover:bg-[#1667cf]'>
                {t("qr.close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileCard;
