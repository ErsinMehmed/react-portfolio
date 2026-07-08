import React from "react";

const EducationBox = (props) => {
  const { item, isLast } = props;

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5'>
      <div className='flex flex-col items-center'>
        <span className='mt-1.5 h-3 w-3 shrink-0 rounded-full border-[2.5px] border-[#1b74e4] bg-white' />
        {!isLast && <span className='mt-1 w-px flex-1 bg-slate-200' />}
      </div>

      <div className={isLast ? "pb-0" : "pb-7"}>
        <span className='inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#1b74e4]'>
          {item.period}
        </span>

        <h3 className='mt-2 font-display text-lg font-semibold text-slate-800'>
          {item.title}
          <span className='font-medium text-slate-500'> · {item.degree}</span>
        </h3>

        <p className='mt-0.5 text-sm text-slate-500'>{item.institution}</p>
      </div>
    </div>
  );
};

export default EducationBox;
