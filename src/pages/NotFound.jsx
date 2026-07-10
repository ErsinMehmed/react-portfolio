import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useLanguage } from "../i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='notFound.title'>
      <div className='mt-8 flex flex-col items-center gap-3 py-12 text-center'>
        <p className='font-display text-6xl font-bold text-[#1b74e4]'>404</p>
        <p className='max-w-[45ch] text-slate-500'>{t("notFound.message")}</p>
        <Link
          to='/'
          className='mt-4 inline-flex items-center justify-center rounded-2xl bg-[#1b74e4] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1667cf]'>
          {t("notFound.backHome")}
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
