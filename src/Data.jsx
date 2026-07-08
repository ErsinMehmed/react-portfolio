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
import IconAppDev from "./icons/AppDev";
import IconManagement from "./icons/Management";
import IconWebDev from "./icons/WebDev";

const headerLinks = [
  {
    title: "About",
    href: "/",
    icon: IconUser,
  },
  {
    title: "Resume",
    href: "/resume",
    icon: IconDocument,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: IconRocket,
  },
  {
    title: "Certifications",
    href: "/certifications",
    icon: IconStar,
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/ersin.mehmed/",
    icon: IconFacebook,
  },
  {
    href: "https://github.com/ErsinMehmed",
    icon: IconInstagram,
  },
  {
    href: "https://www.linkedin.com/in/ersin-hyusein-72a184241/",
    icon: IconLinkedIn,
  },
  {
    href: "https://github.com/ErsinMehmed",
    icon: IconGitHub,
  },
];

const calculateAge = (day, month, year) => {
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

const personalInfo = [
  {
    title: "Age",
    text: String(calculateAge(13, 7, 1999)),
    icon: IconUser,
    iconColor: "text-red-400",
  },
  {
    title: "Location",
    text: "Varna, Bulgaria",
    icon: IconLocation,
    iconColor: "text-pink-400",
  },
  {
    title: "Phone",
    text: "+359 899 626273",
    icon: IconPhone,
    iconColor: "text-emerald-400",
  },
  {
    title: "Email",
    text: "ersin99mehmed@abv.bg",
    icon: IconEmail,
    iconColor: "text-blue-400",
  },
  {
    title: "Languages",
    text: "Bulgarian, English, Turkish",
    icon: IconSpeaker,
    iconColor: "text-purple-400",
  },
];

const educations = [
  {
    title: "Master",
    period: "02.2023 - 06.2024",
    degree: "Mobile and Web Technologies",
    institution: "University of Economics - Varna",
    color: "bg-[#fff4f4]",
  },
  {
    title: "Bachelor",
    period: "09.2018 - 06.2022",
    degree: "Business Information System",
    institution: "University of Economics - Varna",
    color: "bg-[#eef5fa]",
  },
  {
    title: "High School",
    period: "09.2013 - 05.2018",
    degree: "Sport Coach",
    institution: `Sport School "Georgi Benkovski" - Varna`,
    color: "bg-[#eef5fa]",
  },
];

const experiences = [
  {
    title: "Backend web developer",
    period: "07.2023 - 07.2026",
    location: "Varna",
    company: "MyPOS Technologies",
    color: "bg-[#fff4f4]",
  },
  {
    title: "Full stack web developer",
    period: "10.2022 - 06.2023",
    location: "Varna",
    company: "James IT Services",
    color: "bg-[#eef5fa]",
  },
  {
    title: "IT support & consultant",
    period: "04.2022 - 09.2022",
    location: "Varna",
    company: "ENERGO PRO",
    color: "bg-[#eef5fa]",
  },
  {
    title: "Manager in a small company",
    period: "04.2021 - 10.2021",
    location: "Varna",
    company: "Briella Ltd",
    color: "bg-[#fff4f4]",
  },
  {
    title: "Currency cashier",
    period: "04.2019 - 09.2019",
    location: "Golden Sands",
    company: "Edives Ltd",
    color: "bg-[#fff4f4]",
  },
  {
    title: "Tourism",
    period: "04.2018 - 09.2018",
    location: "Golden Sands",
    company: "Tourism",
    color: "bg-[#eef5fa]",
  },
];

const mainSkills = [
  {
    title: "Design",
    text: "I specialize in creating visually captivating and user-friendly designs that leave a lasting impression. Each design is meticulously crafted to align with every brand identity and meet specific goals.",
    icon: IconUIdesign,
    color: "bg-[#fff4f4]",
  },
  {
    title: "App Development",
    text: "With a passion for innovation and a keen eye for every detail, I specialize in creating exceptional applications that captivate. Through a collaborative and client-focused approach.",
    icon: IconAppDev,
    color: "bg-[#eef5fa]",
  },
  {
    title: "Management",
    text: "As an innovator, I bring a strategic mindset and hands-on approach to every project. I have experience leading small initiatives, ensuring seamless coordination and alignment with organizational goals.",
    icon: IconManagement,
    color: "bg-[#eef5fa]",
  },
  {
    title: "Web Development",
    text: "In today's, a strong online presence is essential businesses. As a developer, I specialize in creating user-centric web apps/systems/websites that not only attract attention but also deliver exceptional functionality.",
    icon: IconWebDev,
    color: "bg-[#fff4f4]",
  },
];

const techSkills = [
  {
    title: "HTML",
    percentage: "100",
    kind: "Frontend",
    description:
      "Semantic, accessible markup is second nature to me and forms the backbone of every interface I build.",
    color: "bg-red-400",
  },
  {
    title: "CSS",
    kind: "Frontend",
    description:
      "Comfortable crafting responsive layouts with grid and flexbox, along with smooth animations and polished micro-interactions.",
    percentage: "90",
    color: "bg-rose-400",
  },
  {
    title: "Tailwind",
    kind: "Frontend",
    description:
      "My go-to for styling, letting me ship clean, consistent interfaces fast with utility classes and shared design tokens.",
    percentage: "90",
    color: "bg-pink-400",
  },
  {
    title: "Bootstrap",
    kind: "Frontend",
    description:
      "Applied across several projects for quick, responsive layouts built on reliable prebuilt components.",
    percentage: "70",
    color: "bg-fuchsia-400",
  },
  {
    title: "JavaScript",
    kind: "Frontend",
    description:
      "The core of my front-end work: dynamic UI logic, form validation, async requests, and rich DOM interactions.",
    percentage: "90",
    color: "bg-purple-400",
  },
  {
    title: "Vue.js",
    kind: "Frontend",
    percentage: "70",
    description:
      "Built production front-ends with Vue, using its reactivity and component model to keep code clean and maintainable.",
    color: "bg-violet-400",
  },
  {
    title: "Inertia.js",
    kind: "Frontend",
    percentage: "50",
    description:
      "Used to connect a Laravel back-end with a modern SPA front-end without maintaining a separate API layer.",
    color: "bg-indigo-400",
  },
  {
    title: "React.js",
    kind: "Frontend",
    percentage: "90",
    description:
      "My main library for building scalable, component-driven interfaces with hooks and reusable state.",
    color: "bg-blue-400",
  },
  {
    title: "Mobx",
    kind: "Frontend",
    percentage: "90",
    description:
      "My preferred state manager in React, keeping complex application state predictable and reactive.",
    color: "bg-sky-400",
  },
  {
    title: "jQuery",
    kind: "Frontend",
    percentage: "80",
    description:
      "Handled DOM manipulation, events, and AJAX-driven interactions across legacy and hybrid projects.",
    color: "bg-cyan-400",
  },
  {
    title: "AJAX",
    kind: "Frontend",
    percentage: "85",
    description:
      "Used throughout my projects to fetch and save data asynchronously without full page reloads.",
    color: "bg-teal-400",
  },
  {
    title: "PHP",
    kind: "Backend",
    percentage: "85",
    description:
      "My primary back-end language for building APIs, CRUD logic, and server-side application features.",
    color: "bg-emerald-400",
  },
  {
    title: "Symfony",
    kind: "Backend",
    percentage: "80",
    description:
      "Build structured, maintainable back-ends with Symfony's services, components, and Doctrine ORM.",
    color: "bg-green-400",
  },
  {
    title: "Laravel",
    kind: "Backend",
    percentage: "70",
    description:
      "Used professionally for scalable back-ends: routing, Eloquent models, queues, and authentication.",
    color: "bg-lime-400",
  },
  {
    title: "Next.js",
    kind: "Backend",
    percentage: "80",
    description:
      "Build modern React applications with server-side rendering, file-based routing, and API routes.",
    color: "bg-lime-300",
  },
  {
    title: "Node.js",
    kind: "Backend",
    percentage: "50",
    description:
      "Used Node.js to build lightweight back-end services, tooling, and JavaScript-based APIs.",
    color: "bg-green-400",
  },
  {
    title: "MySQL",
    kind: "Database",
    percentage: "80",
    description:
      "Comfortable designing schemas, writing CRUD queries, and tuning them for better performance.",
    color: "bg-red-400",
  },
  {
    title: "SQL",
    kind: "Database",
    percentage: "75",
    description:
      "Solid with relational queries, joins, and aggregations for everyday data operations and reporting.",
    color: "bg-pink-400",
  },
  {
    title: "MongoDB",
    kind: "Database",
    percentage: "70",
    description:
      "Used for flexible, document-based storage and aggregation pipelines over dynamic data.",
    color: "bg-pink-400",
  },
  {
    title: "PostgreSQL",
    kind: "Database",
    percentage: "75",
    description:
      "I work confidently with PostgreSQL, from schema design to writing and optimizing complex relational queries.",
    color: "bg-sky-400",
  },
  {
    title: "Claude Code",
    kind: "AI",
    percentage: "90",
    description:
      "My primary agentic coding partner in the terminal and IDE. I've used it to build:",
    items: [
      "Custom AI agents",
      "Reusable AI skills",
      "MCP servers",
      "Automated multi-step workflows",
    ],
    color: "bg-orange-400",
  },
  {
    title: "Codex",
    kind: "AI",
    percentage: "75",
    description: "OpenAI Codex is part of my daily workflow. I've used it for:",
    items: [
      "Generating features and boilerplate",
      "Refactoring and debugging code",
      "Rapid prototyping of ideas",
    ],
    color: "bg-emerald-400",
  },
  {
    title: "GitHub",
    kind: "Other",
    percentage: "100",
    description:
      "My daily tool for version control, pull requests, and collaborating smoothly across a team.",
    color: "bg-rose-400",
  },
  {
    title: "Jira",
    kind: "Other",
    percentage: "90",
    description:
      "Run agile workflows in Jira, from sprint planning and issue tracking to managing boards.",
    color: "bg-rose-400",
  },
  {
    title: "Testing",
    kind: "Other",
    percentage: "80",
    description:
      "Cover the full testing spectrum to keep code reliable and catch regressions early:",
    items: ["Unit tests", "Integration tests", "End-to-end (E2E) tests"],
    color: "bg-amber-400",
  },
  {
    title: "CI/CD",
    kind: "Other",
    percentage: "75",
    description:
      "Set up and maintain CI/CD pipelines that automate builds, tests, and deployments for faster, safer releases.",
    color: "bg-indigo-400",
  },
];

const projects = {
  professional: [
     {
      name: "Soko Beauty online store",
      company: "Freelance",
      live: "https://sokobeauty.bg",
      technologies: [
        "JavaScript",
        "React.js",
        "Next.js",
        "Tailwind",
        "Shadcn UI",
        "MongoDB",
        "Redis",
        "Stripe",
      ],
      description:
        "A freelance e-commerce store for Soko Beauty, a shop specialising in authentic Korean skincare and cosmetics. Customers browse curated products, manage a cart, and check out securely with Stripe, using card or cash-on-delivery payment.",
    },
    {
      name: "myPOS Partner Portal",
      company: "myPOS",
      live: "https://partners.mypos.com/en",
      technologies: [
        "JavaScript",
        "AJAX",
        "React.js",
        "Next.js",
        "Shadcn UI",
        "MongoDB",
        "Redis",
        "Jira",
        "CI/CD",
      ],
      description:
        "A partner portal for companies building payment solutions on myPOS. Partners can create and monitor integrations, manage connected merchants, online stores, and POS devices across multiple countries, and explore analytics on transaction trends and multi-currency volumes, alongside a sandbox environment and API documentation.",
    },
    {
      name: "Web-based system for managing business processes related to payments.",
      company: "myPOS",
      live: "https://www.mypos.com",
      technologies: [
        "HTML",
        "Twig",
        "CSS",
        "Bootstrap",
        "JavaScript",
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
      description:
        "This project consists of two components: a website and a user account system. Users can manage all processes related to payments received from their terminals through the account section, along with additional functionalities such as creating online stores with various products, issuing invoices to their clients through an innovative interface, and tracking all incoming funds in their account.",
    },
    {
      name: "Web-based system for buying and selling cars.",
      company: "James IT Services",
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
      description:
        "web-based platform designed to facilitate the process of buying and selling cars. It allows users to browse listings, post their vehicles for sale, and conduct secure transactions through the platform.",
    },
    {
      name: "Web based system for property valuation",
      company: "James IT Services",
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
      description:
        "The purpose of the trial is to allow residents to create appraisals that will be predicted by all interested parties and select the most appropriate appraiser to perform the task on the property. The selection of an evaluator is done anonymously, through a dynamic interface. The appraisal process begins with creating an appraisal, linking interested pages, inserting property data, and displaying appraisers through the interface. Once the appraiser is selected and the appraisals paid for, the process is complete. All communication about the process is done automatically through the platform, and the communication is visible to users. The platform supports multiple languages.",
    },
  ],
  personal: [
    {
      name: "Web based management system",
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
      description:
        "The Web-based management system is a comprehensive platform that allows users to place orders, monitor product availability, and manage their inventory effectively. Users can specify unique properties for each product, such as images, prices and etc. Additionally, the system includes features for adding sales and provides an innovative dashboard for tracking various statistics related to sales, turnovers, profits, expenses, and product inventory through insightful diagrams.",
    },
    {
      name: "System for job searching and offering - Job Portal",
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
      description:
        "The platform designed to connect employers with job seekers, providing functionalities for job searching and offering. Users can create accounts, distinguishing between employers and job seekers, to access the platform's features. Job seekers can browse through job listings, filtering by criteria such as location, salary, and industry, while employers can post job openings, specifying requirements and offered salary. The platform facilitates online job applications, allowing job seekers to submit their CVs and cover letters directly. Additionally, it may incorporate messaging features for communication between employers and job seekers and include a rating and review system for users to evaluate each other's experiences.",
    },
    {
      name: "Appointment system",
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
      description:
        "The Appointment System is a web-based application designed to facilitate the scheduling and management of appointments and meetings. Users can effortlessly add appointments, while also being able to filter through the data based on various criteria. With its intuitive interface and robust backend, the system ensures efficient organization and coordination of schedules for individuals or teams.",
    },
    {
      name: "Laravel Blog",
      github: "https://github.com/ErsinMehmed/laravel-blog",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "Laravel", "MySQL"],
      description:
        "The Laravel Blog project is a dynamic web application built using HTML, CSS, Bootstrap, PHP, Laravel, and MySQL. It serves as a versatile platform for creating, updating, reading, and deleting (CRUD) blog posts, providing users with the ability to manage their content seamlessly. Additionally, the system supports user profiles, allowing individuals to create and personalize their accounts. Through its intuitive interface and robust backend powered by Laravel, users can easily compose, edit, and publish blog posts while maintaining full control over their profiles. With features for both content creation and user management, the blog offers a comprehensive solution for blogging enthusiasts and content creators alike.",
    },
    {
      name: "Work flow management system",
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
      description:
        "Web-based workflow management system. I have envisioned a site from where every user will be able to make a request/order for the type of service. An administrator will then process their order, via an admin panel/window where a task will begin for a specific team. Employees from the team will access the tasks from a mobile device (tablet).",
    },
    {
      name: "Web platform for price comparing and products",
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
      description:
        "Web platform for comparing prices and products from various sites. With the development of e-commerce, the online space is crowded with a lot of information. There comes the need for such platforms for comparing products and services. The idea is for consumers to easily make their choice when purchasing a product. ",
    },
    {
      name: "System for work process management",
      github: "https://github.com/ErsinMehmed/management-system",
      technologies: ["C#", "SQL"],
      description:
        "The system allows users after logging into the system and many functional options. The main functionalities are: adding new products and employees, screen with employees and products, editing employees and products, exporting data from the system.",
    },
    {
      name: "System for work process management in a pizzeria",
      github: "https://github.com/ErsinMehmed/managament-system",
      technologies: ["Java", "SQL", "SQLite"],
      description:
        "The system allows users, after logging into the system, many functional options. The main functionalities are: adding new products according to different criteria, viewing products and filtering according to different criteria, entering stocks, reporting used products.",
    },
  ],
};

const certifications = [
  {
    kind: "Award",
    image: "uni_logo.png",
    description:
      "The recipient of the CRAICT Award at UE Varna in 2023, honored as a Laureate, signifies an individual recognized for talent and achievements. This award, part of a fund supporting talented students, highlights their outstanding contributions and dedication to their field of study or area of expertise within the university community.",
  },
  {
    kind: "Certificatе",
    image: "uni_logo.png",
    description: `Certificate for first place in 2022, "Review of student activities" at the Department of Informatics with development (Platform for comparison of prices and products from various websites).`,
  },
  {
    kind: "Certificatе",
    image: "mon-logo.png",
    description:
      "Computer Literacy Certificate. Released in 2018. The certificate covers an MS Office suite and work with the Internet and applications.",
  },
  {
    kind: "Sport achievements",
    image: "handball.png",
    description:
      "One time sportsman of the year at Varna sports school 2017. 5 times team of the year. 3rd place at the European handball championship. Many individual awards and medals from state finals.",
  },
  {
    kindEn: "Course",
    image: "uni_logo.png",
    description:
      "Part of the IT Master Class 9. The university provides us to become a part of the companies in the IT field and gain some of their experience. ",
  },
  {
    kindEn: "Course",
    image: "uni_logo.png",
    description:
      "Part of the IT Master Class 10. The university provides us to become a part of the companies in the IT field and gain some of their experience. ",
  },
  {
    kindEn: "Scientific publication",
    image: "uni_logo.png",
    description: `Report in the collection "STUDENT SCIENTIFIC CONFERENCE" on the topic "Development of web platforms", Publishing House "Science and Economics" University of Economics - Varna 2022.`,
  },
  {
    kind: "Certificatе",
    image: "Microsoft_Azure.svg.png",
    description:
      "Certificate of successfully completed course on Microsoft Azure Cloud (fundamental). The course includes working with Databricks, Data Factory, Key Vault, Containers.",
  },
  {
    kind: "Certificatе",
    image: "SAFe-cert.png",
    description:
      "Certificate of successfully completed course on Scaled Agile (SAFe methodology). The course topics includes Benefits of SAFe, SAFe Principles, SAFe and Agile, Why SAFe.",
  },
];

export {
  headerLinks,
  socialLinks,
  personalInfo,
  educations,
  experiences,
  mainSkills,
  techSkills,
  projects,
  certifications,
};
