import Layout from "../components/Layout";
import InViewAnimation from "../components/InViewAnimation";
import { mainSkills } from "../Data";

const Home = () => {
  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='About Me'>
      <InViewAnimation>
        <div className='space-y-4 pt-6'>
          <p className='text-lg leading-8 text-slate-600'>
            Hi, my name is Ersin, and I am a software developer and sports
            coach. I have been programming for 5 years, combining my passion for
            technology with professional experience. Over the years, I’ve honed
            my skills by working on various projects, both at work and in my
            spare time, constantly striving to deliver high-quality solutions.
          </p>

          <p className='leading-7 text-slate-500'>
            I have both theoretical and practical expertise in back-end and
            front-end programming, with a strong focus on web development. Web
            programming is my greatest strength, and I continuously work on
            refining my skills in this area. On this site, you can explore more
            details about my work, including the developments and projects I am
            currently involved in.
          </p>
        </div>
      </InViewAnimation>

      <InViewAnimation>
        <h3 className='mb-1 mt-14 font-display text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
          What I do
        </h3>
      </InViewAnimation>

      <div className='mt-6 border-t border-slate-200/70'>
        {mainSkills.map((item, index) => (
          <InViewAnimation
            key={index}
            delay={index * 0.12}>
            <div className='group grid grid-cols-[2rem_1fr] gap-x-4 border-b border-slate-200/70 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6'>
              <span className='pt-1 font-display text-sm font-bold tabular-nums text-[#1b74e4]'>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className='flex items-center gap-2.5 font-display text-lg font-semibold text-slate-800 sm:text-xl'>
                  <item.icon className='h-5 w-5 shrink-0' />
                  {item.title}
                </h4>

                <p className='mt-2 leading-7 text-slate-500'>{item.text}</p>
              </div>
            </div>
          </InViewAnimation>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
