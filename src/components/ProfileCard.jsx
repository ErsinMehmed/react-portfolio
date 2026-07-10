import IconDownload from "../icons/Download";
import { socialLinks, personalInfo } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect } from "react";
import { Modal, ModalBody, Button } from "flowbite-react";
import { QRCodeSVG } from "qrcode.react";

const ProfileCard = () => {
  const { t, lang } = useLanguage();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = () => {
    const file =
      lang === "bg"
        ? "files/Ersin_Hyusein_CV_BG.pdf"
        : "files/Ersin_Hyusein_CV_EN.pdf";
    window.open(file, "_blank");
  };

  const handlePhoneClick = (e) => {
    if (isMobile) {
      window.location.href = "tel:+359899626273";
    } else {
      e.preventDefault();
      setIsQrModalOpen(true);
    }
  };

  const phoneNumber = "+359899626273";
  const telLink = `tel:${phoneNumber}`;

  return (
    <>
      <div className='lg:sticky top-[158px]'>
        <div className='relative mx-auto mb-6 mt-32 w-full bg-white px-7 pb-6 text-center shadow-[0_24px_70px_-30px_rgba(27,74,120,0.45)] ring-1 ring-slate-900/[0.04] sm:mt-36 md:mt-40 lg:mb-0 lg:mt-0 lg:rounded-[28px]'>
          <img
            src={"images/profile.png"}
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
                    aria-label='Social link'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#1b74e4] hover:bg-[#1b74e4] hover:text-white'>
                      <IconComponent className='h-[18px] w-[18px]' />
                    </span>
                  </a>
                );
              })}
            </div>

            <dl className='mt-5 divide-y divide-slate-200/50 rounded-2xl bg-[#f7f9fb] px-5 text-left'>
              {personalInfo.map((item, index) => {
                const isPhone = index === 2;
                const isEmail = index === 3;

                return (
                  <div
                    key={index}
                    className='flex items-center gap-3.5 py-2.5'>
                    <item.icon className='h-[18px] w-[18px] shrink-0 text-slate-400' />

                    <div className='min-w-0 flex-1'>
                      <dt className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
                        {t(item.title)}
                      </dt>

                      <dd className='text-[15px] font-semibold text-slate-700'>
                        {isPhone ? (
                          <a
                            className='transition-colors hover:text-[#1b74e4] cursor-pointer'
                            onClick={handlePhoneClick}
                            href={isMobile ? telLink : undefined}
                          >
                            {item.text}
                          </a>
                        ) : isEmail ? (
                          <a
                            className='transition-colors hover:text-[#1b74e4]'
                            href="mailto:ersin99mehmed@gmail.com"
                          >
                            {item.text}
                          </a>
                        ) : (
                          t(item.text)
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

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

      <Modal 
        show={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)}
        size="lg"
        dismissible={true}
      >
        
        <ModalBody>
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {t("qr.scanPrompt")}
            </p>
            
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <QRCodeSVG
                  value={telLink}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#1b74e4"
                />
              </div>
            </div>

            {/* Телефонен номер като линк за звънене */}
            <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300">
              <a
                href={telLink}
                className="text-base font-semibold text-[#1b74e4] hover:text-[#1667cf] hover:underline transition-colors"
              >
                {phoneNumber}
              </a>
              <Button 
                size="xs" 
                color="light" 
                onClick={() => navigator.clipboard?.writeText(phoneNumber)}
                className="!text-[#1b74e4] hover:!text-[#1667cf]"
              >
                {t("qr.copy")}
              </Button>
            </div>

            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              {t("qr.openCamera")}
            </p>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="mt-6 px-6 py-2.5 bg-[#1b74e4] hover:bg-[#1667cf] text-white text-sm font-semibold rounded-xl transition-colors shadow-[0_8px_20px_-8px_rgba(27,116,228,0.5)]"
            >
              {t("qr.close")}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProfileCard;