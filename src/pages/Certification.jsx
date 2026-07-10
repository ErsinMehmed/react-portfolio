import React from "react";
import Layout from "../components/Layout";
import InViewAnimation from "../components/InViewAnimation";
import CertificationCard from "../components/Certifications/CertificationCard";
import { certifications } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const normalizeKind = (item) => item.kind || item.kindEn || "Certificate";

const categoryOrder = [
  { kind: "Award", title: "cert.categoryAwards" },
  { kind: "Certificate", title: "cert.categoryCertificates" },
  { kind: "Course", title: "cert.categoryCourses" },
  { kind: "Scientific publication", title: "cert.categoryPublications" },
  { kind: "Sport achievements", title: "cert.categorySportAchievements" },
];

const Certification = () => {
  const { t } = useLanguage();
  const groups = categoryOrder
    .map((category) => ({
      ...category,
      items: certifications.filter(
        (item) => normalizeKind(item) === category.kind
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='nav.certifications'>
      <div className='mt-8 space-y-12'>
        {groups.map((group) => (
          <InViewAnimation key={group.kind}>
            <div className='mb-6 flex items-center gap-3'>
              <span className='h-5 w-1.5 rounded-full bg-[#1b74e4]' />
              <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 sm:text-2xl'>
                {t(group.title)}
              </h3>
              <span className='text-sm font-semibold text-slate-500'>
                {group.items.length}
              </span>
            </div>

            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              {group.items.map((item, index) => (
                <CertificationCard
                  key={index}
                  item={item}
                />
              ))}
            </div>
          </InViewAnimation>
        ))}
      </div>
    </Layout>
  );
};

export default Certification;
