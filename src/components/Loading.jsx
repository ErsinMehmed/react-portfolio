import { useLocation } from "react-router-dom";

// Route-level Suspense fallback. Instead of one generic spinner/skeleton, the
// skeleton mirrors the real Layout shell (sticky ProfileCard on the left, the
// page's own sections on the right) so the loading state matches whatever page
// is being fetched.

const Bar = ({ className = "" }) => (
  <div className={`rounded-md bg-slate-200/70 ${className}`} />
);

const Pill = ({ className = "" }) => (
  <div className={`rounded-full bg-slate-200/70 ${className}`} />
);

// Mirrors ProfileCard: avatar, name, job title, social row, info rows, button.
const ProfileSkeleton = () => (
  <div className='rounded-[28px] bg-white px-7 pb-7 pt-8 shadow-[0_24px_70px_-30px_rgba(27,74,120,0.45)] ring-1 ring-slate-900/[0.04]'>
    <div className='mx-auto h-48 w-48 rounded-[22px] bg-slate-200/70' />
    <Bar className='mx-auto mt-6 h-6 w-44' />
    <Bar className='mx-auto mt-3 h-4 w-32' />

    <div className='mt-4 flex justify-center gap-2.5'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='h-10 w-10 rounded-xl bg-slate-200/70'
        />
      ))}
    </div>

    <div className='mt-5 space-y-3 rounded-2xl bg-[#f7f9fb] px-5 py-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='flex items-center gap-3.5'>
          <div className='h-[18px] w-[18px] shrink-0 rounded bg-slate-200/70' />
          <div className='flex-1'>
            <Bar className='h-2.5 w-20' />
            <Bar className='mt-1.5 h-3.5 w-36' />
          </div>
        </div>
      ))}
    </div>

    <Bar className='mt-5 h-12 w-full rounded-2xl' />
  </div>
);

// A section header: colored tick + title + count, matching Projects/Certifications.
const SectionHeader = () => (
  <div className='mb-6 flex items-center gap-3'>
    <span className='h-5 w-1.5 rounded-full bg-slate-200/70' />
    <Bar className='h-6 w-40' />
    <Bar className='h-4 w-5' />
  </div>
);

// Mirrors ProjectCard / CertificationCard.
const CardSkeleton = () => (
  <div className='rounded-2xl border border-slate-200/70 p-5'>
    <Pill className='h-5 w-20' />
    <Bar className='mt-4 h-5 w-3/4' />
    <Bar className='mt-3 h-3 w-full' />
    <Bar className='mt-2 h-3 w-5/6' />
    <div className='mt-4 flex gap-1.5'>
      <Pill className='h-6 w-14' />
      <Pill className='h-6 w-14' />
      <Pill className='h-6 w-10' />
    </div>
    <div className='mt-4 border-t border-slate-100 pt-3'>
      <Bar className='h-3.5 w-24' />
    </div>
  </div>
);

const CardGrid = ({ count }) => (
  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

const HomeBody = () => (
  <>
    <div className='space-y-3 pt-6'>
      <Bar className='h-5 w-full' />
      <Bar className='h-5 w-11/12' />
      <Bar className='mt-4 h-4 w-full' />
      <Bar className='h-4 w-4/5' />
    </div>

    <div className='mt-8 grid grid-cols-2 gap-6 border-y border-slate-200/70 py-6 sm:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Bar className='h-8 w-16' />
          <Bar className='mt-2 h-3 w-20' />
        </div>
      ))}
    </div>

    <Bar className='mb-6 mt-14 h-8 w-64' />

    <div className='border-t border-slate-200/70'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='grid grid-cols-[2rem_1fr] gap-x-4 border-b border-slate-200/70 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6'>
          <Bar className='mt-1 h-4 w-6' />
          <div>
            <div className='flex items-center gap-2.5'>
              <div className='h-5 w-5 rounded bg-slate-200/70' />
              <Bar className='h-5 w-48' />
            </div>
            <Bar className='mt-3 h-3.5 w-full' />
            <Bar className='mt-2 h-3.5 w-11/12' />
          </div>
        </div>
      ))}
    </div>
  </>
);

const ResumeBody = () => (
  <div className='mt-8'>
    {/* Education + Experience */}
    {Array.from({ length: 2 }).map((_, s) => (
      <div
        key={s}
        className={s === 0 ? "" : "mt-12"}>
        <div className='mb-6 flex items-center gap-2.5'>
          <div className='h-5 w-5 rounded bg-slate-200/70' />
          <Bar className='h-6 w-40' />
        </div>
        <div className='space-y-6'>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className='flex gap-4'>
              <div className='h-3 w-3 shrink-0 rounded-full bg-slate-200/70' />
              <div className='flex-1'>
                <Bar className='h-4 w-1/2' />
                <Bar className='mt-2 h-3 w-1/3' />
                <Bar className='mt-3 h-3 w-full' />
                <Bar className='mt-2 h-3 w-5/6' />
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}

    {/* Skills: heading, hint, filter chips, grid */}
    <div className='mt-14'>
      <Bar className='h-6 w-52' />
      <Bar className='mt-2 h-3.5 w-80' />

      <div className='mt-5 flex flex-wrap gap-2'>
        {["w-16", "w-20", "w-20", "w-24", "w-12", "w-16"].map((w, i) => (
          <Pill
            key={i}
            className={`h-8 ${w}`}
          />
        ))}
      </div>

      <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className='rounded-xl border border-slate-200/70 px-3.5 py-3'>
            <div className='flex items-center gap-2.5'>
              <div className='h-8 w-8 rounded-lg bg-slate-200/70' />
              <Bar className='h-4 w-20' />
            </div>
            <Bar className='mt-3 h-1 w-full' />
            <Bar className='mt-2 h-3 w-24' />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SectionsBody = ({ groups }) => (
  <div className='mt-8 space-y-12'>
    {groups.map((count, i) => (
      <div key={i}>
        <SectionHeader />
        <CardGrid count={count} />
      </div>
    ))}
  </div>
);

const bodyFor = (pathname) => {
  if (pathname.startsWith("/resume")) return <ResumeBody />;
  if (pathname.startsWith("/projects")) return <SectionsBody groups={[2, 4]} />;
  if (pathname.startsWith("/certifications"))
    return <SectionsBody groups={[2, 4, 2]} />;
  if (pathname === "/") return <HomeBody />;
  return (
    <div className='space-y-3 pt-6'>
      <Bar className='h-5 w-2/3' />
      <Bar className='h-4 w-1/2' />
    </div>
  );
};

const Loading = () => {
  const { pathname } = useLocation();

  return (
    <div
      className='w-full min-h-screen pb-12 lg:pb-8 bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100'
      role='status'
      aria-busy='true'
      aria-label='Loading'>
      <div className='h-full w-full min-h-screen max-w-[2000px] mx-auto'>
        <div className='relative h-full animate-pulse lg:px-4 xl:px-32 2xl:px-40 lg:flex 2xl:justify-center gap-10 pt-0.5 lg:pt-[158px]'>
          <span className='hidden w-fit lg:block lg:w-[350px] lg:shrink-0 xl:w-[400px]'>
            <div className='lg:sticky lg:top-[158px]'>
              <ProfileSkeleton />
            </div>
          </span>

          <div className='w-full 2xl:max-w-[820px]'>
            <div className='rounded-2xl bg-white px-6 py-8 shadow md:px-10 lg:px-14 lg:py-10'>
              <div className='flex items-center'>
                <Bar className='h-9 w-48 sm:w-56' />
                <div className='ml-8 mt-1.5 h-0.5 w-32 rounded bg-slate-200/70 sm:w-44' />
              </div>

              {bodyFor(pathname)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
