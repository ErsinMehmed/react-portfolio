/**
 * Translation dictionary keyed by short, stable identifiers.
 * Each key maps to { en, bg } so a rewording never silently breaks a lookup
 * (the old design used the raw English sentence as the key itself).
 *
 * `bg` is optional: a handful of proper nouns (company names, the "AI"
 * filter label) are identical in both languages and simply fall back to
 * `en` at lookup time — see `t()` in LanguageContext.
 */
export interface TranslationEntry {
  en: string;
  bg?: string;
}

export const translations = {
  // --- Navigation / page headers ---
  "nav.about": { en: "About", bg: "За мен" },
  "nav.resume": { en: "Resume", bg: "Резюме" },
  "nav.projects": { en: "Projects", bg: "Проекти" },
  "nav.certifications": { en: "Certifications", bg: "Сертификати" },
  "nav.menu": { en: "Primary", bg: "Основна навигация" },
  "page.aboutMe": { en: "About Me", bg: "За мен" },
  loading: { en: "Loading ...", bg: "Зареждане ..." },

  // --- 404 page ---
  "notFound.title": { en: "Page not found", bg: "Страницата не е намерена" },
  "notFound.message": {
    en: "The page you're looking for doesn't exist or may have been moved.",
    bg: "Търсената страница не съществува или е била преместена.",
  },
  "notFound.backHome": { en: "Back to home", bg: "Обратно към началото" },

  // --- Console signature (DevTools easter egg) ---
  "console.signature": {
    en: "You're one of the people who open the console - nice.",
    bg: "Ти си от хората, които отварят конзолата - браво.",
  },

  // --- Error boundary (root render crash) ---
  "error.title": { en: "Something went wrong", bg: "Нещо се обърка" },
  "error.message": {
    en: "This part of the site ran into an unexpected error. Reloading usually clears it.",
    bg: "Тази част от сайта срещна неочаквана грешка. Презареждането обикновено помага.",
  },
  "error.console": { en: "unexpected error", bg: "неочаквана грешка" },
  "error.reload": { en: "Reload page", bg: "Презареди страницата" },

  // --- Command palette ---
  "cmd.placeholder": {
    en: "Search pages and actions…",
    bg: "Търси страници и действия…",
  },
  "cmd.pages": { en: "Pages", bg: "Страници" },
  "cmd.actions": { en: "Actions", bg: "Действия" },
  "cmd.empty": { en: "No results", bg: "Няма резултати" },
  "cmd.open": { en: "Open command palette", bg: "Отвори командния панел" },
  "cmd.theme.toDark": { en: "Switch to dark theme", bg: "Тъмна тема" },
  "cmd.theme.toLight": { en: "Switch to light theme", bg: "Светла тема" },
  "cmd.lang.toBg": { en: "Switch to Bulgarian", bg: "Смени на български" },
  "cmd.lang.toEn": { en: "Switch to English", bg: "Смени на английски" },

  // --- Ask my CV (AI) ---
  "askCv.open": { en: "Ask about me", bg: "Питай за мен" },
  "askCv.title": { en: "Ask about me", bg: "Питай за мен" },
  "askCv.subtitle": {
    en: "AI answers, grounded only in my real CV.",
    bg: "AI отговори, само от истинското ми CV.",
  },
  "askCv.placeholder": {
    en: "e.g. Has he worked with payment systems?",
    bg: "напр. Работил ли е с платежни системи?",
  },
  "askCv.send": { en: "Ask", bg: "Питай" },
  "askCv.sources": { en: "Sources", bg: "Източници" },
  "askCv.thinking": { en: "Thinking…", bg: "Мисля…" },
  "askCv.hint": {
    en: "Try one of these:",
    bg: "Пробвай някой от тези:",
  },
  "askCv.disclaimer": {
    en: "Answers are AI-generated from my CV and may be imperfect.",
    bg: "Отговорите са AI-генерирани от CV-то ми и може да не са перфектни.",
  },
  "askCv.ex1": {
    en: "Has he worked with payment systems?",
    bg: "Работил ли е с платежни системи?",
  },
  "askCv.ex2": {
    en: "What's his backend experience?",
    bg: "Какъв е backend опитът му?",
  },
  "askCv.ex3": {
    en: "Does he have AI experience?",
    bg: "Има ли опит с AI?",
  },
  "askCv.error": {
    en: "Something went wrong. Please try again in a moment.",
    bg: "Нещо се обърка. Опитай пак след малко.",
  },
  "askCv.errorRate": {
    en: "Too many questions right now — give it a few seconds.",
    bg: "Твърде много въпроси в момента — изчакай няколко секунди.",
  },
  "askCv.errorConfig": {
    en: "The assistant isn't configured on this deployment yet.",
    bg: "Асистентът още не е конфигуриран на този сайт.",
  },
  "askCv.followups": { en: "Ask next", bg: "Продължи с" },
  "askCv.interview": {
    en: "Prepare interview questions",
    bg: "Подготви въпроси за интервю",
  },
  "askCv.interviewLabel": {
    en: "Prepare interview questions about me",
    bg: "Подготви въпроси за интервю с мен",
  },
  "askCv.interviewHint": {
    en: "Tailored questions with grounded sample answers, for a recruiter.",
    bg: "Подбрани въпроси с примерни отговори по CV-то, за рекрутер.",
  },

  // --- Profile card ---
  "profile.name": { en: "Ersin Hyusein", bg: "Ерсин Хюсеин" },
  "profile.jobTitle": {
    en: "Senior Full Stack Web Developer",
    bg: "Синиър Уеб Разработчик",
  },
  "profile.age": { en: "Age", bg: "Възраст" },
  "profile.location": { en: "Location", bg: "Локация" },
  "profile.phone": { en: "Phone", bg: "Телефон" },
  "profile.email": { en: "Email", bg: "Имейл" },
  "profile.languages": { en: "Languages", bg: "Езици" },
  "profile.locationValue": { en: "Varna, Bulgaria", bg: "Варна, България" },
  "profile.languagesValue": {
    en: "Bulgarian, English, Turkish",
    bg: "Български, Английски, Турски",
  },
  "profile.downloadCv": { en: "Download CV", bg: "Свали CV" },
  "profile.copyEmail": { en: "Copy email address", bg: "Копирай имейл адреса" },
  "profile.emailCopied": {
    en: "Email copied to clipboard",
    bg: "Имейлът е копиран в клипборда",
  },

  // --- QR Code Modal ---
  "qr.scanPrompt": {
    en: "Scan the QR code with your phone to call",
    bg: "Сканирайте QR кода с телефона си, за да се обадите",
  },
  "qr.copy": { en: "Copy", bg: "Копирай" },
  "qr.copied": { en: "Copied!", bg: "Копирано!" },
  "qr.openCamera": {
    en: "Open camera app and scan the QR code",
    bg: "Отворете камерата и сканирайте QR кода",
  },
  "qr.close": { en: "Close", bg: "Затвори" },

  // --- Footer ---
  "footer.copyright": {
    en: "All Rights Reserved by Ersin Hyusein",
    bg: "Всички права запазени, Ерсин Хюсеин",
  },

  // --- About page intro ---
  "about.intro1": {
    en: "Hi, I'm Ersin, a software developer. I've been programming for over 6 years, more than 4 of them in professional software development. I've worked on a range of projects, building solutions both in a team and on my own. For me, code quality, good architecture, and attention to detail come first on every project.",
    bg: "Здравейте, казвам се Ерсин и съм софтуерен разработчик. Занимавам се с програмиране от над 6 години, като повече от 4 от тях са свързани с професионална разработка на софтуер. Работил съм по различни проекти, изграждайки решения както в екипна среда, така и самостоятелно. За мен качеството на кода, добрата архитектура и вниманието към детайла са основни при всеки проект.",
  },
  "about.intro2": {
    en: "I develop both back-end and front-end applications, with web development as my main focus. I'm always sharpening my skills and keeping up with new technologies. On this site you can browse some of my projects and the technologies I work with.",
    bg: "Разработвам както back-end, така и front-end приложения, като основният ми фокус е уеб разработката. Постоянно усъвършенствам уменията си и следя новите технологии. На този сайт можете да разгледате част от проектите ми и технологиите, с които работя.",
  },

  // --- Stats ---
  "stats.yearsOfExperience": { en: "Years of experience", bg: "Години опит" },
  "stats.projectsBuilt": { en: "Projects built", bg: "Изградени проекти" },
  "stats.technologies": { en: "Technologies", bg: "Технологии" },

  // --- What I do ---
  "whatIDo.heading": { en: "What I do", bg: "Какво правя" },
  "skills.fullstack.title": {
    en: "Full-Stack Web Development",
    bg: "Full-Stack уеб разработка",
  },
  "skills.fullstack.text": {
    en: "I build complete web applications - from database design and back-end logic to the user interface - with an emphasis on scalability, performance and code quality.",
    bg: "Изграждам цялостни уеб приложения - от проектирането на базата данни и back-end логиката до разработката на потребителския интерфейс, като поставям акцент върху мащабируемостта, производителността и качеството на кода.",
  },
  "skills.backend.title": {
    en: "Backend Development & APIs",
    bg: "Back-end разработка и API",
  },
  "skills.backend.text": {
    en: "I have extensive experience building back-end systems with PHP (Symfony and Laravel), designing RESTful APIs, working with MySQL and MongoDB, and integrating external services - aiming for secure, stable and maintainable solutions.",
    bg: "Имам богат опит в разработката на back-end системи с PHP (Symfony и Laravel), изграждането на RESTful API, работата с MySQL и MongoDB и интеграцията на външни услуги, като се стремя към сигурни, стабилни и лесни за поддръжка решения.",
  },
  "skills.frontend.title": {
    en: "Frontend Development",
    bg: "Front-end разработка",
  },
  "skills.frontend.text": {
    en: "I build responsive user interfaces with React, Vue.js, Node.js and Next.js, following best practices for clean code, accessibility, consistent design and high performance.",
    bg: "Създавам responsive потребителски интерфейси с React, Vue.js, Node.js и Next.js, като следвам добри практики за чист код, достъпност, консистентен дизайн и висока производителност.",
  },
  "skills.ai.title": {
    en: "AI Development & Automation",
    bg: "AI разработка и автоматизация",
  },
  "skills.ai.text": {
    en: "I use AI to automate processes and streamline day-to-day work. My end-to-end automation project won first place among 24 entries in an internal AI innovation contest.",
    bg: "Използвам AI за автоматизиране на процеси и оптимизиране на ежедневната работа. Разработеният от мен проект за end-to-end автоматизация спечели първо място сред 24 проекта във вътрешен конкурс за AI иновации.",
  },
  "skills.leadership.title": {
    en: "Technical Leadership",
    bg: "Техническо лидерство",
  },
  "skills.leadership.text": {
    en: "I take part in the technical and architectural decisions on projects, support the growth of junior and mid-level developers, and perform code reviews - promoting good practices and knowledge sharing within the team.",
    bg: "Участвам в техническите и архитектурните решения на проектите, подпомагам развитието на junior и mid-level разработчици и извършвам code review, като насърчавам добрите практики и споделянето на знания в екипа.",
  },
  "skills.quality.title": { en: "Quality & Deployment", bg: "Качество и внедряване" },
  "skills.quality.text": {
    en: "I care about clean, testable code. I back features with unit and integration tests, ship through CI/CD pipelines, and work in Agile teams with sprint planning, standups and continuous delivery.",
    bg: "Държа на чист и тестваем код. Подсигурявам функционалностите с unit и интеграционни тестове, доставям през CI/CD pipeline-и и работя в Agile екипи със sprint planning и standup-и.",
  },

  // --- Resume sections ---
  "resume.education": { en: "Education", bg: "Образование" },
  "resume.experience": { en: "Experience", bg: "Опит" },
  "resume.professionalSkills": {
    en: "Professional Skills",
    bg: "Професионални умения",
  },
  "resume.hoverHint": {
    en: "Each skill shows years of hands-on experience and projects shipped. Hover over a skill to see how I've used it.",
    bg: "Всяко умение показва години практически опит и брой проекти. Задръжте върху умение, за да видите как съм го използвал.",
  },
  "skill.projects": { en: "projects", bg: "проекта" },

  // --- Filters ---
  "filter.all": { en: "All", bg: "Всички" },
  "filter.frontend": { en: "Frontend" },
  "filter.backend": { en: "Backend" },
  "filter.database": { en: "Database", bg: "Бази данни" },
  "filter.ai": { en: "AI" },
  "filter.other": { en: "Other", bg: "Други" },

  // --- Duration units ---
  "duration.yr": { en: "yr", bg: "г." },
  "duration.mo": { en: "mo", bg: "мес." },
  "duration.present": { en: "Present", bg: "Досега" },

  // --- Education content ---
  "education.master.title": { en: "Master", bg: "Магистър" },
  "education.master.degree": {
    en: "Mobile and Web Technologies",
    bg: "Мобилни и уеб технологии",
  },
  "education.uniVarna": {
    en: "University of Economics - Varna",
    bg: "Икономически университет - Варна",
  },
  "education.bachelor.title": { en: "Bachelor", bg: "Бакалавър" },
  "education.bachelor.degree": {
    en: "Business Information System",
    bg: "Бизнес информационни системи",
  },
  "education.highSchool.title": { en: "High School", bg: "Гимназия" },
  "education.highSchool.degree": { en: "Sport Coach", bg: "Спортен треньор" },
  "education.sportSchool": {
    en: `Sport School "Georgi Benkovski" - Varna`,
    bg: 'Спортно училище "Георги Бенковски" - Варна',
  },

  // --- Experience content ---
  "experience.backendDev.title": {
    en: "Backend web developer",
    bg: "Backend уеб разработчик",
  },
  "location.varna": { en: "Varna", bg: "Варна" },
  "experience.fullstackDev.title": {
    en: "Full stack web developer",
    bg: "Full stack уеб разработчик",
  },
  "experience.itSupport.title": {
    en: "IT support & consultant",
    bg: "IT съпорт и консултант",
  },
  "experience.managerSmallCompany.title": {
    en: "Manager in a small company",
    bg: "Мениджър в малка компания",
  },
  "experience.currencyCashier.title": {
    en: "Currency cashier",
    bg: "Валутен касиер",
  },
  "location.goldenSands": { en: "Golden Sands", bg: "Златни пясъци" },
  "experience.tourism.title": { en: "Tourism", bg: "Туризъм" },
  "company.tourism": { en: "Tourism", bg: "Туризъм" },
  "company.mypos": { en: "MyPOS Technologies" },
  "company.jamesIt": { en: "James IT Services" },
  "company.energoPro": { en: "ENERGO PRO" },
  "company.briella": { en: "Briella Ltd", bg: "Briella ООД" },
  "company.edives": { en: "Edives Ltd", bg: "Edives ООД" },

  // --- Skill descriptions ---
  "skillDesc.html": {
    en: "Semantic, accessible markup is second nature to me and forms the backbone of every interface I build.",
    bg: "Семантичният, достъпен markup ми е втора природа и е гръбнакът на всеки интерфейс, който изграждам.",
  },
  "skillDesc.css": {
    en: "Comfortable crafting responsive layouts with grid and flexbox, along with smooth animations and polished micro-interactions.",
    bg: "Уверено създавам адаптивни оформления с grid и flexbox, заедно с плавни анимации и изгладени микро-взаимодействия.",
  },
  "skillDesc.tailwind": {
    en: "My go-to for styling, letting me ship clean, consistent interfaces fast with utility classes and shared design tokens.",
    bg: "Предпочитаният ми инструмент за стилизиране, който ми позволява бързо да създавам чисти, консистентни интерфейси с utility класове и споделени design токени.",
  },
  "skillDesc.bootstrap": {
    en: "Applied across several projects for quick, responsive layouts built on reliable prebuilt components.",
    bg: "Използван в няколко проекта за бързи, адаптивни оформления, изградени с надеждни готови компоненти.",
  },
  "skillDesc.javascript": {
    en: "The core of my front-end work: dynamic UI logic, form validation, async requests, and rich DOM interactions.",
    bg: "Ядрото на front-end работата ми: динамична UI логика, валидация на форми, асинхронни заявки и богати DOM взаимодействия.",
  },
  "skillDesc.typescript": {
    en: "I use TypeScript to add static typing that improves the quality and maintainability of JavaScript applications - safer changes, a clear code structure, and fewer runtime errors across React and Node.js projects.",
    bg: "Прилагам статична типизация чрез TypeScript за подобряване на качеството и поддръжката на JavaScript приложенията, осигурявайки по-сигурни промени, ясна структура на кода и по-малко runtime грешки в React и Node.js проекти.",
  },
  "skillDesc.vue": {
    en: "I build front-end applications with Vue.js, using a component-based approach and reactivity to create clean, maintainable solutions.",
    bg: "Изграждам front-end приложения с Vue.js, като използвам компонентен подход и реактивност за създаване на чисти и поддържаеми решения.",
  },
  "skillDesc.inertia": {
    en: "Used to connect a Laravel back-end with a modern SPA front-end without maintaining a separate API layer.",
    bg: "Използван за свързване на Laravel back-end със модерен SPA front-end без поддържане на отделен API слой.",
  },
  "skillDesc.react": {
    en: "My main library for building scalable, component-driven interfaces.",
    bg: "Основната ми библиотека за изграждане на мащабируеми, компонентно-ориентирани интерфейси.",
  },
  "skillDesc.mobx": {
    en: "My preferred state manager in React, keeping complex application state predictable and reactive.",
    bg: "Предпочитаният ми state мениджър в React, който поддържа сложното състояние на приложението предвидимо и реактивно.",
  },
  "skillDesc.jquery": {
    en: "Handled DOM manipulation, events, and AJAX-driven interactions across legacy and hybrid projects.",
    bg: "Работил съм с DOM манипулация, събития и AJAX взаимодействия в legacy и хибридни проекти.",
  },
  "skillDesc.ajax": {
    en: "Used throughout my projects to fetch and save data asynchronously without full page reloads.",
    bg: "Използван в проектите ми за асинхронно извличане и запазване на данни без пълно презареждане на страницата.",
  },
  "skillDesc.php": {
    en: "My primary back-end language for building APIs, CRUD logic, and server-side application features.",
    bg: "Основният ми back-end език за изграждане на API-та, CRUD логика и сървърни функционалности.",
  },
  "skillDesc.symfony": {
    en: "Build structured, maintainable back-ends with Symfony's services, components, and Doctrine ORM.",
    bg: "Изграждам структурирани, лесни за поддръжка back-end системи със services, компоненти на Symfony и Doctrine ORM.",
  },
  "skillDesc.laravel": {
    en: "Used professionally for scalable back-ends: routing, Eloquent models, queues, and authentication.",
    bg: "Използван професионално за мащабируеми back-end системи: routing, Eloquent модели, опашки и автентикация.",
  },
  "skillDesc.nextjs": {
    en: "Build modern React applications with server-side rendering, file-based routing, and API routes.",
    bg: "Изграждам модерни React приложения със server-side rendering, file-based routing и API routes.",
  },
  "skillDesc.nodejs": {
    en: "Used Node.js to build lightweight back-end services, tooling, and JavaScript-based APIs.",
    bg: "Използвал съм Node.js за изграждане на леки back-end услуги, инструменти и API-та на JavaScript.",
  },
  "skillDesc.mysql": {
    en: "Comfortable designing schemas, writing CRUD queries, and tuning them for better performance.",
    bg: "Уверено проектирам схеми, пиша CRUD заявки и ги оптимизирам за по-добра производителност.",
  },
  "skillDesc.sql": {
    en: "Solid with relational queries, joins, and aggregations for everyday data operations and reporting.",
    bg: "Стабилен с релационни заявки, joins и агрегации за ежедневни операции с данни и справки.",
  },
  "skillDesc.mongodb": {
    en: "Used for flexible, document-based storage and aggregation pipelines over dynamic data.",
    bg: "Използван за гъвкаво, документно съхранение и aggregation pipelines върху динамични данни.",
  },
  "skillDesc.postgresql": {
    en: "I work confidently with PostgreSQL, from schema design to writing and optimizing complex relational queries.",
    bg: "Работя уверено с PostgreSQL, от проектиране на схеми до писане и оптимизиране на сложни релационни заявки.",
  },
  "skillDesc.github": {
    en: "My daily tool for version control, pull requests, and collaborating smoothly across a team.",
    bg: "Ежедневният ми инструмент за контрол на версиите, pull requests и безпроблемна работа в екип.",
  },
  "skillDesc.jira": {
    en: "Run agile workflows in Jira, from sprint planning and issue tracking to managing boards.",
    bg: "Управлявам agile процеси в Jira, от планиране на спринтове и проследяване на задачи до управление на дъски.",
  },

  // --- Skill cards with lists ---
  "skillDesc.claudeCode": {
    en: "My primary agentic coding partner in the terminal and IDE. I've used it to build:",
    bg: "Основният ми agentic партньор за програмиране в терминала и IDE. Използвал съм го, за да изградя:",
  },
  "skillItem.customAiAgents": { en: "Custom AI agents", bg: "Персонализирани AI агенти" },
  "skillItem.reusableAiSkills": {
    en: "Reusable AI skills",
    bg: "Преизползваеми AI умения",
  },
  "skillItem.mcpServers": { en: "MCP servers", bg: "MCP сървъри" },
  "skillItem.automatedWorkflows": {
    en: "Automated multi-step workflows",
    bg: "Автоматизирани многостъпкови процеси",
  },
  "skillDesc.codex": {
    en: "OpenAI Codex is part of my daily workflow. I've used it for:",
    bg: "OpenAI Codex е част от ежедневната ми работа. Използвал съм го за:",
  },
  "skillItem.generatingFeatures": {
    en: "Generating features and boilerplate",
    bg: "Генериране на функционалности и boilerplate",
  },
  "skillItem.refactoringDebugging": {
    en: "Refactoring and debugging code",
    bg: "Рефакториране и дебъгване на код",
  },
  "skillItem.rapidPrototyping": {
    en: "Rapid prototyping of ideas",
    bg: "Бързо прототипиране на идеи",
  },
  "skillDesc.testing": {
    en: "Cover the full testing spectrum to keep code reliable and catch regressions early:",
    bg: "Покривам целия спектър на тестване, за да поддържам кода надежден и да улавям регресии рано:",
  },
  "skillItem.unitTests": { en: "Unit tests", bg: "Unit тестове" },
  "skillItem.integrationTests": {
    en: "Integration tests",
    bg: "Интеграционни тестове",
  },
  "skillItem.e2eTests": {
    en: "End-to-end (E2E) tests",
    bg: "End-to-end (E2E) тестове",
  },
  "skillDesc.cicd": {
    en: "Set up and maintain CI/CD pipelines that automate builds, tests, and deployments for faster, safer releases.",
    bg: "Настройвам и поддържам CI/CD pipelines, които автоматизират билдове, тестове и деплойменти за по-бързи и по-сигурни релийзи.",
  },

  // --- Projects ---
  "projects.professional": { en: "Professional", bg: "Професионални" },
  "projects.personal": { en: "Personal", bg: "Лични" },
  "projects.viewDetails": { en: "View details", bg: "Виж детайли" },
  "projects.personalProject": { en: "Personal project", bg: "Личен проект" },
  "projects.techStack": { en: "Tech stack", bg: "Технологии" },
  "projects.liveDemo": { en: "Live demo", bg: "Демо на живо" },
  "projects.viewCode": { en: "View code", bg: "Виж кода" },
  "projects.prevProject": { en: "Previous project", bg: "Предишен проект" },
  "projects.nextProject": { en: "Next project", bg: "Следващ проект" },
  "projects.proprietaryNotice": {
    en: "Proprietary company project, source code is not publicly available.",
    bg: "Фирмен проект, изходният код не е публично достъпен.",
  },
  "projects.readCaseStudy": { en: "Read case study", bg: "Виж инфо за проекта" },
  "projects.caseStudyBadge": { en: "Case study", bg: "Инфо за проекта" },

  // --- Case study pages ---
  "breadcrumb.home": { en: "Home", bg: "Начало" },
  "cs.viewLive": { en: "View live", bg: "Виж на живо" },
  "cs.role": { en: "Role", bg: "Роля" },
  "cs.timeline": { en: "Timeline", bg: "Период" },
  "cs.nav.overview": { en: "Overview", bg: "Обзор" },
  "cs.nav.problem": { en: "Problem", bg: "Проблем" },
  "cs.nav.architecture": { en: "Architecture", bg: "Архитектура" },
  "cs.nav.decisions": { en: "Decisions", bg: "Решения" },
  "cs.nav.results": { en: "Results", bg: "Резултат" },
  "cs.nav.stack": { en: "Stack", bg: "Стек" },
  "cs.section.problem": { en: "The problem", bg: "Проблемът" },
  "cs.section.constraints": { en: "Constraints", bg: "Ограничения" },
  "cs.section.architecture": { en: "Architecture", bg: "Архитектура" },
  "cs.section.decisions": { en: "Key technical decisions", bg: "Ключови технически решения" },
  "cs.section.results": { en: "Outcome", bg: "Резултат" },
  "cs.section.stack": { en: "Stack", bg: "Технологичен стек" },
  "cs.decision.problem": { en: "Problem", bg: "Проблем" },
  "cs.decision.choice": { en: "Approach", bg: "Подход" },
  "cs.decision.why": { en: "Why", bg: "Защо" },
  "cs.decision.impact": { en: "Result", bg: "Резултат" },
  "cs.decision.askAi": {
    en: "Why did I choose this approach?",
    bg: "Защо избрах този подход?",
  },
  "cs.decision.aiTag": { en: "AI analysis", bg: "AI анализ" },
  "cs.decision.aiDisclaimer": {
    en: "AI-generated reasoning about the trade-offs, grounded in this decision.",
    bg: "AI обосновка на компромисите, стъпъла на това решение.",
  },
  "cs.decision.aiError": {
    en: "Couldn't generate that right now. Try again in a moment.",
    bg: "В момента не може да се генерира. Опитай пак след малко.",
  },
  "cs.cta.title": { en: "See the rest of the work", bg: "Виж останалата работа" },
  "cs.cta.subtitle": {
    en: "Every project on the list, from production platforms to side experiments.",
    bg: "Всички проекти в списъка, от продукционни платформи до странични експерименти.",
  },
  "cs.cta.allProjects": { en: "All projects", bg: "Всички проекти" },
  "cs.cta.next": { en: "Next case study", bg: "Следващ проект" },

  "company.freelance": { en: "Freelance", bg: "Фрийланс" },

  "project.myposPartnerPortal.name": {
    en: "MyPOS Partner Portal",
    bg: "MyPOS Партньорски портал",
  },
  "project.myposPartnerPortal.description": {
    en: "A partner portal for companies building payment solutions on MyPOS. Partners can create and monitor integrations, manage connected merchants, online stores, and POS devices across multiple countries, and explore analytics on transaction trends and multi-currency volumes, alongside a sandbox environment and API documentation.",
    bg: "Партньорски портал за компании, изграждащи платежни решения върху MyPOS. Партньорите могат да създават и наблюдават интеграции, да управляват свързани търговци, онлайн магазини и POS устройства в множество държави, както и да разглеждат анализи за тенденции на транзакциите и обеми в различни валути, заедно със sandbox среда и API документация.",
  },

  "project.sokoBeauty.name": {
    en: "Soko Beauty online store",
    bg: "Онлайн магазин Soko Beauty",
  },
  "project.sokoBeauty.description": {
    en: "A e-commerce store for cosmetics - Soko Beauty, a shop specialising in authentic Korean skincare and cosmetics. Customers browse curated products, manage a cart, and check out securely with Stripe, using card or cash-on-delivery payment.",
    bg: "Онлайн магазин за козметика - Soko Beauty, специализиран в автентична корейска козметика и грижа за кожата. Клиентите разглеждат подбрани продукти, управляват количка и плащат сигурно чрез Stripe, с карта или наложен платеж.",
  },

  "project.paymentsSystem.name": {
    en: "MyPOS Merchant Platform",
    bg: "MyPOS Търговска платформа",
  },
  "project.paymentsSystem.description": {
    en: "The project has two parts: a public website and a user account area. From their account, users manage everything around the payments they receive through their terminals - they can set up online stores with products, issue invoices to their clients, and track all incoming funds in one place.",
    bg: "Проектът има две части: публичен уебсайт и потребителски акаунт. От акаунта си потребителите управляват всичко около плащанията, които получават през терминалите си - могат да създават онлайн магазини с продукти, да издават фактури на клиентите си и да следят всички входящи средства на едно място.",
  },

  "project.carMarketplace.name": {
    en: "Web-based system for buying and selling cars.",
    bg: "Уеб система за купуване и продаване на автомобили.",
  },
  "project.carMarketplace.description": {
    en: "A platform for buying and selling cars. Users browse listings, post their own vehicles for sale, and complete transactions securely through the site.",
    bg: "Платформа за купуване и продаване на автомобили. Потребителите разглеждат обяви, публикуват собствените си коли за продажба и извършват сигурни сделки през сайта.",
  },

  "project.propertyValuation.name": {
    en: "Web based system for property valuation",
    bg: "Уеб система за оценка на имоти",
  },
  "project.propertyValuation.description": {
    en: "A marketplace where property owners request an appraisal and licensed appraisers bid for the job anonymously through a dynamic interface. Once an appraiser is selected and paid, the platform handles all further communication automatically, with the full history visible to both sides. Built with multi-language support from the ground up.",
    bg: "Платформа, на която собственици на имоти заявяват оценка, а лицензирани оценители наддават за задачата анонимно чрез динамичен интерфейс. След като оценителят е избран и платен, платформата поема цялата по-нататъшна комуникация автоматично, а пълната история е видима и за двете страни. Изградена с поддръжка на множество езици от самото начало.",
  },

  "project.managementSystem.name": {
    en: "Web based management system",
    bg: "Уеб система за управление",
  },
  "project.managementSystem.description": {
    en: "A management system for placing orders, tracking product availability, and handling inventory. Each product can have its own details like images and prices. The system also records sales and includes a dashboard that shows statistics on sales, turnover, profit, expenses, and stock through clear charts.",
    bg: "Система за управление, с която можеш да правиш поръчки, да следиш наличността на продуктите и да управляваш склада. Всеки продукт може да има собствени данни като изображения и цени. Системата записва и продажби и включва дашборд със статистики за продажби, оборот, печалба, разходи и наличности, представени с ясни диаграми.",
  },

  "project.jobPortal.name": {
    en: "System for job searching and offering - Job Portal",
    bg: "Система за търсене и предлагане на работа - Job Portal",
  },
  "project.jobPortal.description": {
    en: "A platform connecting employers with job seekers. Job seekers browse listings filtered by location, salary, and industry, and apply directly with a CV and cover letter. Employers post openings and review incoming applications. Built-in messaging and a rating system let both sides communicate and share feedback after the process.",
    bg: "Платформа, която свързва работодатели с търсещи работа. Търсещите разглеждат обяви, филтрирани по локация, заплата и индустрия, и кандидатстват директно с CV и мотивационно писмо. Работодателите публикуват позиции и преглеждат постъпилите кандидатури. Вградени съобщения и система за оценки позволяват на двете страни да общуват и да оставят обратна връзка след процеса.",
  },

  "project.appointmentSystem.name": {
    en: "Appointment system",
    bg: "Система за записване на часове",
  },
  "project.appointmentSystem.description": {
    en: "A web app for scheduling and managing appointments and meetings. Users add appointments and filter them by different criteria, which keeps schedules organized for individuals and teams alike.",
    bg: "Уеб приложение за записване и управление на часове и срещи. Потребителите добавят записвания и ги филтрират по различни критерии, което помага графиците да останат подредени - за отделни хора и за екипи.",
  },

  "project.laravelBlog.name": { en: "Laravel Blog", bg: "Laravel блог" },
  "project.laravelBlog.description": {
    en: "A blog application built with HTML, CSS, Bootstrap, PHP, Laravel, and MySQL. It covers full CRUD for posts - create, edit, read, and delete - and supports user profiles, so each person manages their own account and content. Writing, editing, and publishing posts all happen through a simple interface backed by Laravel.",
    bg: "Блог приложение, изградено с HTML, CSS, Bootstrap, PHP, Laravel и MySQL. Поддържа пълен CRUD за публикациите - създаване, редактиране, четене и изтриване - както и потребителски профили, така че всеки да управлява собствения си акаунт и съдържание. Писането, редактирането и публикуването минават през прост интерфейс с Laravel отзад.",
  },

  "project.workflowSystem.name": {
    en: "Work flow management system",
    bg: "Система за управление на работния поток",
  },
  "project.workflowSystem.description": {
    en: "A web-based workflow management system. Any user can submit a request or order for a type of service. An administrator processes it from an admin panel, which creates a task for a specific team, and the team's employees pick up those tasks from a mobile device (tablet).",
    bg: "Уеб система за управление на работния поток. Всеки потребител може да подаде заявка или поръчка за определен тип услуга. Администратор я обработва през админ панел, което създава задача за конкретен екип, а служителите от екипа поемат задачите от мобилно устройство (таблет).",
  },

  "project.priceComparison.name": {
    en: "Web platform for price comparing and products",
    bg: "Уеб платформа за сравнение на цени и продукти",
  },
  "project.priceComparison.description": {
    en: "A platform for comparing prices and products across different sites. As online shopping grows, there's more information than anyone can sort through, so a tool like this helps consumers compare products and services and pick what's right for them.",
    bg: "Платформа за сравнение на цени и продукти от различни сайтове. С разрастването на онлайн търговията информацията става твърде много, за да се обхване, затова такъв инструмент помага на потребителите да сравняват продукти и услуги и по-лесно да избират най-подходящото за тях.",
  },

  "project.workProcessManagement.name": {
    en: "System for work process management",
    bg: "Система за управление на работния процес",
  },
  "project.workProcessManagement.description": {
    en: "After logging in, users get a set of tools for managing products and employees: adding new products and staff, viewing them on dedicated screens, editing their details, and exporting data from the system.",
    bg: "След вход потребителите получават набор от инструменти за управление на продукти и служители: добавяне на нови продукти и служители, преглед на отделни екрани, редактиране на данните им и експортиране на данни от системата.",
  },

  "project.pizzeriaManagement.name": {
    en: "System for work process management in a pizzeria",
    bg: "Система за управление на работния процес в пицария",
  },
  "project.pizzeriaManagement.description": {
    en: "After logging in, users get a set of tools for running a pizzeria: adding new products by different criteria, browsing and filtering products, entering stock, and reporting used products.",
    bg: "След вход потребителите получават набор от инструменти за управление на пицария: добавяне на нови продукти по различни критерии, преглед и филтриране на продукти, въвеждане на наличности и отчитане на използвани продукти.",
  },

  // --- Certifications category titles ---
  "cert.categoryCertificates": { en: "Certificates", bg: "Сертификати" },
  "cert.categoryCourses": { en: "Courses", bg: "Курсове" },
  "cert.categoryAwards": { en: "Awards", bg: "Награди" },
  "cert.categoryPublications": { en: "Publications", bg: "Публикации" },
  "cert.categorySportAchievements": {
    en: "Sport achievements",
    bg: "Спортни постижения",
  },

  // --- Certification titles --- (scannable headline; the long-form
  // description below it is what actually needs reading)
  "cert.myposAutopilotAward.title": {
    en: "1st Place – MyPOS AI Innovation Contest",
    bg: "1-во място – конкурс за AI иновации в MyPOS",
  },
  "cert.craictAward.title": {
    en: "CRAICT Award, UE-Varna 2023",
    bg: "Награда CRAICT, ИУ-Варна 2023",
  },
  "cert.studentActivityAward.title": {
    en: "1st Place – Student Activity Review 2022",
    bg: "1-во място – Преглед на студентската дейност 2022",
  },
  "cert.computerLiteracy.title": {
    en: "Computer Literacy Certificate",
    bg: "Сертификат за компютърна грамотност",
  },
  "cert.sportAchievements.title": {
    en: "Sportsman of the Year – Varna Sports School",
    bg: "Спортист на годината – Спортно училище Варна",
  },
  "cert.itMasterClass9.title": { en: "IT Master Class 9", bg: "IT Master Class 9" },
  "cert.itMasterClass10.title": { en: "IT Master Class 10", bg: "IT Master Class 10" },
  "cert.scientificPublication.title": {
    en: "Scientific Publication – Web Platforms",
    bg: "Научна публикация – уеб платформи",
  },
  "cert.azureCourse.title": {
    en: "Microsoft Azure Cloud Fundamentals",
    bg: "Microsoft Azure Cloud – основи",
  },
  "cert.safeCourse.title": {
    en: "Scaled Agile (SAFe) Certificate",
    bg: "Сертификат по Scaled Agile (SAFe)",
  },

  // --- Certification descriptions ---
  "cert.myposAutopilotAward.description": {
    en: "First place among 24 company-wide submissions in MyPOS's internal AI innovation contest in 2026, for AutoPilot: an end-to-end automation of developers' day-to-day workflow, built with Claude Code.",
    bg: "Първо място сред 24 проекта на вътрешния конкурс за AI иновации в MyPOS през 2026 г. с AutoPilot - end-to-end автоматизация на ежедневната работа на разработчиците, изградена с Claude Code.",
  },
  "cert.craictAward.description": {
    en: "Recipient of the CRAICT Award at the University of Economics - Varna for 2023. The award is part of the programme supporting talented students and is granted for high academic achievement and professional development.",
    bg: "Носител на наградата CRAICT на Икономически университет – Варна за 2023 г. Отличието е част от програмата за подкрепа на талантливи студенти и се присъжда за високи академични постижения и професионално развитие.",
  },
  "cert.studentActivityAward.description": {
    en: `Certificate for first place in 2022, "Review of student activities" at the Department of Informatics with development (Platform for comparison of prices and products from various websites).`,
    bg: 'Сертификат за първо място през 2022 г., "Преглед на студентската дейност" в катедра Информатика с разработка (Платформа за сравнение на цени и продукти от различни сайтове).',
  },
  "cert.computerLiteracy.description": {
    en: "Computer Literacy Certificate. Released in 2018. The certificate covers an MS Office suite and work with the Internet and applications.",
    bg: "Сертификат за компютърна грамотност. Издаден през 2018 г. Обхваща пакета MS Office и работа с интернет и приложения.",
  },
  "cert.sportAchievements.description": {
    en: "One time sportsman of the year at Varna sports school 2017. 5 times team of the year. 3rd place at the European handball championship. Many individual awards and medals from state finals.",
    bg: "Веднъж спортист на годината в спортното училище във Варна през 2017 г. 5 пъти отбор на годината. 3-то място на Европейското първенство по хандбал. Много индивидуални награди и медали от държавни финали.",
  },
  "cert.itMasterClass9.description": {
    en: "Part of IT Master Class 9, a university programme that connects students with IT companies to get a taste of their day-to-day work and experience.",
    bg: "Част от IT Master Class 9 - университетска програма, която среща студентите с IT компании, за да усетят ежедневната им работа и да натрупат опит.",
  },
  "cert.itMasterClass10.description": {
    en: "Part of IT Master Class 10, a university programme that connects students with IT companies to get a taste of their day-to-day work and experience.",
    bg: "Част от IT Master Class 10 - университетска програма, която среща студентите с IT компании, за да усетят ежедневната им работа и да натрупат опит.",
  },
  "cert.scientificPublication.description": {
    en: `Report in the collection "STUDENT SCIENTIFIC CONFERENCE" on the topic "Development of web platforms", Publishing House "Science and Economics" University of Economics - Varna 2022.`,
    bg: 'Доклад в сборника "СТУДЕНТСКА НАУЧНА КОНФЕРЕНЦИЯ" на тема "Разработка на уеб платформи", издателство "Наука и икономика", Икономически университет - Варна 2022.',
  },
  "cert.azureCourse.description": {
    en: "Certificate of successfully completed course on Microsoft Azure Cloud (fundamental). The course includes working with Databricks, Data Factory, Key Vault, Containers.",
    bg: "Сертификат за успешно завършен курс по Microsoft Azure Cloud (основи). Курсът включва работа с Databricks, Data Factory, Key Vault, Containers.",
  },
  "cert.safeCourse.description": {
    en: "Certificate of successfully completed course on Scaled Agile (SAFe methodology). The course topics includes Benefits of SAFe, SAFe Principles, SAFe and Agile, Why SAFe.",
    bg: "Сертификат за успешно завършен курс по Scaled Agile (SAFe методология). Темите включват ползите от SAFe, принципите на SAFe, SAFe и Agile, защо SAFe.",
  },
} as const satisfies Record<string, TranslationEntry>;

/** Every valid lookup key in the dictionary — used to type-check `t()` calls. */
export type TranslationKey = keyof typeof translations;

/**
 * `t()` also accepts raw literal strings that are *not* dictionary keys
 * (e.g. a company name pulled straight from Data.ts, like "MyPOS") and
 * simply echoes them back unresolved. `TranslationKey | (string & {})`
 * keeps autocomplete/type-checking for real keys while still allowing any
 * string — the `string & {}` trick prevents TS from widening the union
 * down to plain `string` and losing the key suggestions.
 */
export type TranslatableText = TranslationKey | (string & {});
