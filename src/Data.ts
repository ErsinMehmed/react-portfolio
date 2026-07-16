import IconFacebook from "./icons/Facebook";
import IconLinkedIn from "./icons/LinkedIn";
import IconInstagram from "./icons/Instagram";
import IconGitHub from "./icons/GitHub";
import IconUser from "./icons/User";
import IconLocation from "./icons/Location";
import IconPhone from "./icons/Phone";
import IconEmail from "./icons/Email";
import IconSpeaker from "./icons/Speaker";
import IconRocket from "./icons/Rocket";
import IconStar from "./icons/Star";
import IconDocument from "./icons/Document";
import IconUIdesign from "./icons/UIdesign";
import IconManagement from "./icons/Management";
import IconWebDev from "./icons/WebDev";
import IconBackend from "./icons/Backend";
import IconAI from "./icons/AI";
import IconQuality from "./icons/Quality";
import { routes } from "./routes";
import type {
  HeaderLink,
  SocialLink,
  PersonalInfoItem,
  Education,
  Experience,
  Recommendation,
  MainSkill,
  TechSkill,
  ProjectsData,
  Certification,
} from "./types";

const headerLinks: HeaderLink[] = [
  {
    title: "nav.about",
    href: routes.home,
    icon: IconUser,
  },
  {
    title: "nav.resume",
    href: routes.resume,
    icon: IconDocument,
  },
  {
    title: "nav.projects",
    href: routes.projects,
    icon: IconRocket,
  },
  {
    title: "nav.certifications",
    href: routes.certifications,
    icon: IconStar,
  },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/ersin.mehmed/",
    icon: IconFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/ersogram",
    icon: IconInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/ersin-hyusein-72a184241/",
    icon: IconLinkedIn,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/ErsinMehmed",
    icon: IconGitHub,
    label: "GitHub",
  },
];

const calculateAge = (day: number, month: number, year: number): number => {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

const personalInfo: PersonalInfoItem[] = [
  {
    title: "profile.age",
    text: String(calculateAge(13, 7, 1999)),
    icon: IconUser,
  },
  {
    title: "profile.location",
    text: "profile.locationValue",
    icon: IconLocation,
  },
  {
    title: "profile.phone",
    text: "+359 899 626273",
    icon: IconPhone,
  },
  {
    title: "profile.email",
    text: "ersin99mehmed@gmail.com",
    icon: IconEmail,
  },
  {
    title: "profile.languages",
    text: "profile.languagesValue",
    icon: IconSpeaker,
  },
];

const educations: Education[] = [
  {
    title: "education.master.title",
    period: "02.2023 - 06.2024",
    degree: "education.master.degree",
    institution: "education.uniVarna",
  },
  {
    title: "education.bachelor.title",
    period: "09.2018 - 06.2022",
    degree: "education.bachelor.degree",
    institution: "education.uniVarna",
  },
  {
    title: "education.highSchool.title",
    period: "09.2013 - 05.2018",
    degree: "education.highSchool.degree",
    institution: "education.sportSchool",
  },
];

const experiences: Experience[] = [
  {
    title: "experience.backendDev.title",
    period: "07.2023 - 07.2026",
    location: "location.varna",
    company: "company.mypos",
  },
  {
    title: "experience.fullstackDev.title",
    period: "10.2022 - 06.2023",
    location: "location.varna",
    company: "company.jamesIt",
  },
  {
    title: "experience.itSupport.title",
    period: "04.2022 - 09.2022",
    location: "location.varna",
    company: "company.energoPro",
  },
  {
    title: "experience.managerSmallCompany.title",
    period: "04.2021 - 10.2021",
    location: "location.varna",
    company: "company.briella",
  },
  {
    title: "experience.currencyCashier.title",
    period: "04.2019 - 09.2019",
    location: "location.goldenSands",
    company: "company.edives",
  },
  {
    title: "experience.tourism.title",
    period: "04.2018 - 09.2018",
    location: "location.goldenSands",
    company: "company.tourism",
  },
];

// Real reference letters (scanned, hosted off-site). Only the referrer's role
// and company are shown, plus a link to the letter — no invented quote text.
const recommendations: Recommendation[] = [
  {
    company: "company.jamesIt",
    role: "reco.role.directManager",
    url: "https://drive.google.com/file/d/1cB7LH5g-zI6RVLqu14TKRKh7gTIGIkW3/view?usp=sharing",
  },
  {
    company: "company.energoPro",
    role: "reco.role.manager",
    url: "https://drive.google.com/file/d/1NCR6BU7uCGl0rN_QdlK7MsQSJYTWAAz8/view?usp=sharing",
  },
];

const mainSkills: MainSkill[] = [
  {
    title: "skills.fullstack.title",
    text: "skills.fullstack.text",
    icon: IconWebDev,
  },
  {
    title: "skills.backend.title",
    text: "skills.backend.text",
    icon: IconBackend,
  },
  {
    title: "skills.frontend.title",
    text: "skills.frontend.text",
    icon: IconUIdesign,
  },
  {
    title: "skills.ai.title",
    text: "skills.ai.text",
    icon: IconAI,
  },
  {
    title: "skills.leadership.title",
    text: "skills.leadership.text",
    icon: IconManagement,
  },
  {
    title: "skills.quality.title",
    text: "skills.quality.text",
    icon: IconQuality,
  },
];

// Each skill carries years of hands-on experience and the number of projects
// it has shipped in, instead of an arbitrary "proficiency %". Adjust the
// years/projects values to match reality as it changes.
const techSkills: TechSkill[] = [
  {
    title: "HTML",
    kind: "Frontend",
    description: "skillDesc.html",
    years: 6,
    projects: 10,
    color: "bg-red-400",
  },
  {
    title: "CSS",
    kind: "Frontend",
    description: "skillDesc.css",
    years: 6,
    projects: 10,
    color: "bg-rose-400",
  },
  {
    title: "Tailwind",
    kind: "Frontend",
    description: "skillDesc.tailwind",
    years: 4,
    projects: 8,
    color: "bg-pink-400",
  },
  {
    title: "Bootstrap",
    kind: "Frontend",
    description: "skillDesc.bootstrap",
    years: 4,
    projects: 3,
    color: "bg-fuchsia-400",
  },
  {
    title: "JavaScript",
    kind: "Frontend",
    description: "skillDesc.javascript",
    years: 6,
    projects: 10,
    color: "bg-purple-400",
  },
  {
    title: "TypeScript",
    kind: "Frontend",
    description: "skillDesc.typescript",
    years: 3,
    projects: 4,
    color: "bg-blue-500",
  },
  {
    title: "Vue.js",
    kind: "Frontend",
    description: "skillDesc.vue",
    years: 2,
    projects: 3,
    color: "bg-violet-400",
  },
  {
    title: "Inertia.js",
    kind: "Frontend",
    description: "skillDesc.inertia",
    years: 2,
    projects: 2,
    color: "bg-indigo-400",
  },
  {
    title: "React.js",
    kind: "Frontend",
    description: "skillDesc.react",
    years: 4,
    projects: 10,
    color: "bg-blue-400",
  },
  {
    title: "Mobx",
    kind: "Frontend",
    description: "skillDesc.mobx",
    years: 4,
    projects: 7,
    color: "bg-sky-400",
  },
  {
    title: "jQuery",
    kind: "Frontend",
    description: "skillDesc.jquery",
    years: 2,
    projects: 6,
    color: "bg-cyan-400",
  },
  {
    title: "AJAX",
    kind: "Frontend",
    description: "skillDesc.ajax",
    years: 5,
    projects: 11,
    color: "bg-teal-400",
  },
  {
    title: "PHP",
    kind: "Backend",
    description: "skillDesc.php",
    years: 5,
    projects: 8,
    color: "bg-emerald-400",
  },
  {
    title: "Symfony",
    kind: "Backend",
    description: "skillDesc.symfony",
    years: 3,
    projects: 3,
    color: "bg-green-400",
  },
  {
    title: "Laravel",
    kind: "Backend",
    description: "skillDesc.laravel",
    years: 2,
    projects: 3,
    color: "bg-lime-400",
  },
  {
    title: "Next.js",
    kind: "Backend",
    description: "skillDesc.nextjs",
    years: 3,
    projects: 4,
    color: "bg-lime-300",
  },
  {
    title: "Node.js",
    kind: "Backend",
    description: "skillDesc.nodejs",
    years: 1,
    projects: 1,
    color: "bg-green-400",
  },
  {
    title: "MySQL",
    kind: "Database",
    description: "skillDesc.mysql",
    years: 5,
    projects: 5,
    color: "bg-red-400",
  },
  {
    title: "SQL",
    kind: "Database",
    description: "skillDesc.sql",
    years: 5,
    projects: 10,
    color: "bg-pink-400",
  },
  {
    title: "MongoDB",
    kind: "Database",
    description: "skillDesc.mongodb",
    years: 1,
    projects: 2,
    color: "bg-pink-400",
  },
  {
    title: "PostgreSQL",
    kind: "Database",
    description: "skillDesc.postgresql",
    years: 1,
    projects: 1,
    color: "bg-sky-400",
  },
  {
    title: "Claude Code",
    kind: "AI",
    description: "skillDesc.claudeCode",
    years: 1,
    projects: 5,
    items: [
      "skillItem.customAiAgents",
      "skillItem.reusableAiSkills",
      "skillItem.mcpServers",
      "skillItem.automatedWorkflows",
    ],
    color: "bg-orange-400",
  },
  {
    title: "Codex",
    kind: "AI",
    description: "skillDesc.codex",
    years: 1,
    projects: 3,
    items: [
      "skillItem.generatingFeatures",
      "skillItem.refactoringDebugging",
      "skillItem.rapidPrototyping",
    ],
    color: "bg-emerald-400",
  },
  {
    title: "GitHub",
    kind: "Other",
    description: "skillDesc.github",
    years: 5,
    projects: 14,
    color: "bg-rose-400",
  },
  {
    title: "Jira",
    kind: "Other",
    description: "skillDesc.jira",
    years: 4,
    projects: 4,
    color: "bg-rose-400",
  },
  {
    title: "Testing",
    kind: "Other",
    description: "skillDesc.testing",
    years: 3,
    projects: 6,
    items: ["skillItem.unitTests", "skillItem.integrationTests", "skillItem.e2eTests"],
    color: "bg-amber-400",
  },
  {
    title: "CI/CD",
    kind: "Other",
    description: "skillDesc.cicd",
    years: 1,
    projects: 3,
    color: "bg-indigo-400",
  },
];

const projects: ProjectsData = {
  professional: [
    {
      name: "project.sokoBeauty.name",
      company: "company.freelance",
      caseStudySlug: "soko-beauty",
      live: "https://sokobeauty.bg",
      technologies: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Tailwind",
        "Shadcn UI",
        "PostgreSQL",
        "Redis",
        "Stripe",
      ],
      description: "project.sokoBeauty.description",
    },
    {
      name: "project.myposPartnerPortal.name",
      company: "MyPOS",
      caseStudySlug: "mypos-partner-portal",
      live: "https://partners.mypos.com/en",
      technologies: [
        "JavaScript",
        "TypeScript",
        "AJAX",
        "React.js",
        "Next.js",
        "Shadcn UI",
        "MongoDB",
        "Redis",
        "Jira",
        "CI/CD",
      ],
      description: "project.myposPartnerPortal.description",
    },
    {
      name: "project.paymentsSystem.name",
      company: "MyPOS",
      caseStudySlug: "mypos-payments-system",
      live: "https://www.mypos.com",
      technologies: [
        "HTML",
        "Twig",
        "CSS",
        "Bootstrap",
        "JavaScript",
        "TypeScript",
        "jQuery",
        "AJAX",
        "React.js",
        "Mobx",
        "PHP",
        "Symfony",
        "MySQL",
        "Redis",
        "Jira",
        "CI/CD",
        "Claude Code",
      ],
      description: "project.paymentsSystem.description",
    },
    {
      name: "project.carMarketplace.name",
      company: "company.jamesIt",
      technologies: [
        "HTML",
        "CSS",
        "Tailwind",
        "JavaScript",
        "TypeScript",
        "AJAX",
        "Vue.js",
        "Inertia.js",
        "PHP",
        "Laravel",
        "MySQL",
      ],
      description: "project.carMarketplace.description",
    },
    {
      name: "project.propertyValuation.name",
      company: "company.jamesIt",
      technologies: [
        "HTML",
        "CSS",
        "Tailwind",
        "JavaScript",
        "AJAX",
        "Vue.js",
        "Inertia.js",
        "PHP",
        "Laravel",
        "MySQL",
      ],
      description: "project.propertyValuation.description",
    },
  ],
  personal: [
    {
      name: "project.managementSystem.name",
      github: "https://github.com/ErsinMehmed/management-system-next",
      technologies: [
        "HTML",
        "CSS",
        "Tailwind",
        "Framer Motion",
        "React.js",
        "Mobx",
        "Next.js",
        "MongoDB",
      ],
      description: "project.managementSystem.description",
    },
    {
      name: "project.jobPortal.name",
      github: "https://github.com/ErsinMehmed/job-portal",
      technologies: [
        "HTML",
        "CSS",
        "Tailwind",
        "Framer Motion",
        "React.js",
        "Mobx",
        "Next.js",
        "MongoDB",
      ],
      description: "project.jobPortal.description",
    },
    {
      name: "project.appointmentSystem.name",
      github: "https://github.com/ErsinMehmed/appointmet-system",
      technologies: [
        "HTML",
        "CSS",
        "Bootstrap",
        "React.js",
        "Mobx",
        "PHP",
        "Symfony",
        "MySQL",
      ],
      description: "project.appointmentSystem.description",
    },
    {
      name: "project.laravelBlog.name",
      github: "https://github.com/ErsinMehmed/laravel-blog",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "Laravel", "MySQL"],
      description: "project.laravelBlog.description",
    },
    {
      name: "project.workflowSystem.name",
      github: "https://github.com/ErsinMehmed/workflow-system",
      technologies: [
        "HTML",
        "CSS",
        "Tailwind",
        "JavaScript",
        "jQuery",
        "AJAX",
        "PHP",
        "MySQL",
      ],
      description: "project.workflowSystem.description",
    },
    {
      name: "project.priceComparison.name",
      github: "https://github.com/ErsinMehmed/price-comparing-platform",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "AJAX",
        "PHP",
        "MySQL",
      ],
      description: "project.priceComparison.description",
    },
    {
      name: "project.workProcessManagement.name",
      github: "https://github.com/ErsinMehmed/management-system",
      technologies: ["C#", "SQL"],
      description: "project.workProcessManagement.description",
    },
    {
      name: "project.pizzeriaManagement.name",
      github: "https://github.com/ErsinMehmed/managament-system",
      technologies: ["Java", "SQL", "SQLite"],
      description: "project.pizzeriaManagement.description",
    },
  ],
};

const certifications: Certification[] = [
  {
    kind: "Award",
    title: "cert.myposAutopilotAward.title",
    description: "cert.myposAutopilotAward.description",
  },
  {
    kind: "Award",
    title: "cert.craictAward.title",
    description: "cert.craictAward.description",
  },
  {
    kind: "Certificate",
    title: "cert.studentActivityAward.title",
    description: "cert.studentActivityAward.description",
    link: "https://drive.google.com/file/d/1nDOgwq-P4clUqj1Do4z7geZeRlp3ydts/view?usp=drive_link",
  },
  {
    kind: "Sport achievements",
    title: "cert.sportAchievements.title",
    description: "cert.sportAchievements.description",
  },
  {
    kindEn: "Course",
    title: "cert.itMasterClass9.title",
    description: "cert.itMasterClass9.description",
    link: "https://drive.google.com/file/d/17jWjvh_H5fHYULY8PMjKXbe8h5MlxwNa/view?usp=sharing",
  },
  {
    kindEn: "Course",
    title: "cert.itMasterClass10.title",
    description: "cert.itMasterClass10.description",
  },
  {
    kindEn: "Scientific publication",
    title: "cert.scientificPublication.title",
    description: "cert.scientificPublication.description",
    link: "https://ue-varna.bg/uploads/filemanager/303/publishing-complex/2022/Studentska-nauchna-konferencia-2022.pdf#page=100",
  },
  {
    kind: "Certificate",
    title: "cert.azureCourse.title",
    description: "cert.azureCourse.description",
    link: "https://drive.google.com/file/d/1I9w_0YEFwDuOgDsLr3Vpf1MgFiGLaB9v/view?usp=sharing",
  },
  {
    kind: "Certificate",
    title: "cert.safeCourse.title",
    description: "cert.safeCourse.description",
    link: "https://drive.google.com/file/d/1mJdWkQU58tuGvJj2yO5DRz5qD0dlZqnj/view?usp=sharing",
  },
  {
    kind: "Certificate",
    title: "cert.computerLiteracy.title",
    description: "cert.computerLiteracy.description",
  },
];

export {
  headerLinks,
  socialLinks,
  personalInfo,
  educations,
  experiences,
  recommendations,
  mainSkills,
  techSkills,
  projects,
  certifications,
};
