import React from "react";

const kinds = {
  Award: {
    chip: "bg-amber-50 text-amber-600",
    path: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
  },
  Certificate: {
    chip: "bg-blue-50 text-[#1b74e4]",
    path: "M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V22l4-2 4 2v-7.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
  },
  Course: {
    chip: "bg-indigo-50 text-indigo-600",
    path: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  },
  "Sport achievements": {
    chip: "bg-emerald-50 text-emerald-600",
    path: "M17 10.43V2H7v8.43c0 .35.18.68.49.86l4.18 2.51-.99 2.34-3.41.29 2.59 2.24L9.07 22 12 20.23 14.93 22l-.78-3.33 2.59-2.24-3.41-.29-.99-2.34 4.18-2.51c.3-.18.49-.51.49-.86zM13 12.23l-1 .6-1-.6V3h2v9.23z",
  },
  "Scientific publication": {
    chip: "bg-violet-50 text-violet-600",
    path: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  },
};

const CertificationCard = ({ item }) => {
  const raw = item.kind || item.kindEn || "Certificate";
  const kind = raw.startsWith("Certificat") ? "Certificate" : raw;
  const cfg = kinds[kind] || kinds.Certificate;

  return (
    <div className='flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm'>
      <span
        className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cfg.chip}`}>
        <svg
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-[22px] w-[22px]'>
          <path d={cfg.path} />
        </svg>
      </span>

      <p className='text-[13.5px] leading-relaxed text-slate-500'>
        {item.description}
      </p>
    </div>
  );
};

export default CertificationCard;
