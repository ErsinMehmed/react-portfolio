// Translation dictionary keyed by short, stable identifiers.
// Each key maps to { en, bg } so a rewording never silently breaks a lookup
// (the old design used the raw English sentence as the key itself).
export const translations = {
  // --- Navigation / page headers ---
  "nav.about": { en: "About", bg: "За мен" },
  "nav.resume": { en: "Resume", bg: "Резюме" },
  "nav.projects": { en: "Projects", bg: "Проекти" },
  "nav.certifications": { en: "Certifications", bg: "Сертификати" },
  "page.aboutMe": { en: "About Me", bg: "За мен" },

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

  // --- QR Code Modal ---
  "qr.scanPrompt": {
    en: "Scan the QR code with your phone to call",
    bg: "Сканирайте QR кода с телефона си, за да се обадите",
  },
  "qr.copy": { en: "Copy", bg: "Копирай" },
  "qr.openCamera": {
    en: "Open camera app and scan the QR code",
    bg: "Отворете камерата и сканирайте QR кода",
  },
  "qr.close": { en: "Close", bg: "Затвори" },

  // --- Footer ---
  "footer.copyright": {
    en: "© 2026 All Rights Reserved by Ersin Hyusein",
    bg: "© 2026 Всички права запазени, Ерсин Хюсеин",
  },

  // --- About page intro ---
  "about.intro1": {
    en: "Hi, my name is Ersin, and I am a software developer. I have over 6 years of experience in programming, including more than 4 years of professional experience, combining my passion for technology with real-world practice. Over the years, I’ve honed my skills by working on various projects, both at work and in my spare time, constantly striving to deliver high-quality solutions.",
    bg: "Здравейте, казвам се Ерсин и съм софтуерен разработчик. Имам над 6 години опит в програмирането, от които над 4 години професионален опит, съчетавайки страстта си към технологиите с практическа работа. През годините усъвършенствах уменията си, работейки по различни проекти, както в работата, така и в свободното си време, като постоянно се стремя да предоставям висококачествени решения.",
  },
  "about.intro2": {
    en: "I have both theoretical and practical expertise in back-end and front-end programming, with a strong focus on web development. Web programming is my greatest strength, and I continuously work on refining my skills in this area. On this site, you can explore more details about my work, including the developments and projects I am currently involved in.",
    bg: "Имам както теоретични, така и практически познания в back-end и front-end програмирането, със силен фокус върху уеб разработката. Уеб програмирането е най-силната ми страна и непрекъснато работя върху усъвършенстването на уменията си в тази област. На този сайт можете да разгледате повече детайли за работата ми, включително разработките и проектите, по които работя в момента.",
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
    en: "I build complete web applications end to end - from the database and business logic to the interface users interact with - focused on scalable, high-performance solutions that hold up in production.",
    bg: "Изграждам цялостни уеб приложения от начало до край - от базата данни и бизнес логиката до интерфейса, с който потребителите взаимодействат - с фокус върху скалируеми и високопроизводителни решения, които издържат в реална среда.",
  },
  "skills.backend.title": {
    en: "Backend Development & APIs",
    bg: "Back-end разработка и API",
  },
  "skills.backend.text": {
    en: "My core strength: designing robust back ends with PHP (Symfony, Laravel), building RESTful APIs, modelling data in MySQL and MongoDB, and integrating third-party services reliably and securely.",
    bg: "Основната ми сила: проектиране на надеждни back-end системи с PHP (Symfony, Laravel), изграждане на RESTful API, моделиране на данни в MySQL и MongoDB и надеждна и сигурна интеграция на услуги на трети страни.",
  },
  "skills.frontend.title": {
    en: "Frontend Development",
    bg: "Front-end разработка",
  },
  "skills.frontend.text": {
    en: "I craft responsive, user-centric interfaces with React, Vue.js and Next.js - clean, accessible and consistent, with attention to the small interactions that make a product feel polished.",
    bg: "Създавам responsive, ориентирани към потребителя интерфейси с React, Vue.js и Next.js - чисти, достъпни и консистентни, с внимание към малките детайли, които правят продукта завършен.",
  },
  "skills.ai.title": {
    en: "AI Development & Automation",
    bg: "AI разработка и автоматизация",
  },
  "skills.ai.text": {
    en: "I use AI to automate real developer workflows and remove repetitive work. My end-to-end automation project won first place among 24 company-wide entries in an internal AI innovation contest.",
    bg: "Използвам AI за автоматизиране на реални работни процеси и премахване на повтарящата се работа. Проектът ми за end-to-end автоматизация спечели първо място сред 24 проекта във вътрешен конкурс за AI иновации.",
  },
  "skills.leadership.title": {
    en: "Technical Leadership",
    bg: "Техническо лидерство",
  },
  "skills.leadership.text": {
    en: "I lead technical and architectural decisions, mentor junior and mid-level developers, and run code reviews that raise the bar - keeping teams aligned, unblocked and moving toward shared goals.",
    bg: "Водя технически и архитектурни решения, менторствам junior и mid-level разработчици и провеждам code review-та, които вдигат нивото - държейки екипите съгласувани, отблокирани и насочени към общи цели.",
  },
  "skills.quality.title": { en: "Quality & Delivery", bg: "Качество и доставка" },
  "skills.quality.text": {
    en: "I care about clean, testable code. I back features with unit and integration tests, ship through CI/CD pipelines, and work in Agile teams with sprint planning, standups and continuous delivery.",
    bg: "Държа на чист и тестваем код. Подсигурявам функционалностите с unit и интеграционни тестове, доставям през CI/CD pipeline-и и работя в Agile екипи със sprint planning, standup-и и непрекъсната доставка.",
  },

  // --- Resume sections ---
  "resume.education": { en: "Education", bg: "Образование" },
  "resume.experience": { en: "Experience", bg: "Опит" },
  "resume.professionalSkills": {
    en: "Professional Skills",
    bg: "Професионални умения",
  },
  "resume.hoverHint": {
    en: "Hover over the name of a language, technology, library or tool for more details.",
    bg: "Задръжте върху името на език, технология, библиотека или инструмент за повече детайли.",
  },

  // --- Filters ---
  "filter.all": { en: "All", bg: "Всички" },
  "filter.frontend": { en: "Frontend" },
  "filter.backend": { en: "Backend" },
  "filter.database": { en: "Database", bg: "Бази данни" },
  "filter.ai": { en: "AI" },
  "filter.other": { en: "Other", bg: "Други" },

  // --- Skill levels ---
  "level.expert": { en: "Expert", bg: "Експерт" },
  "level.advanced": { en: "Advanced", bg: "Напреднал" },
  "level.intermediate": { en: "Intermediate", bg: "Средно ниво" },
  "level.familiar": { en: "Familiar", bg: "Начално ниво" },

  // --- Duration units ---
  "duration.yr": { en: "yr", bg: "г." },
  "duration.mo": { en: "mo", bg: "мес." },

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
  "skillDesc.vue": {
    en: "Built production front-ends with Vue, using its reactivity and component model to keep code clean and maintainable.",
    bg: "Изграждал съм продукшън front-end с Vue, използвайки реактивността и компонентния му модел, за да поддържам кода чист и лесен за поддръжка.",
  },
  "skillDesc.inertia": {
    en: "Used to connect a Laravel back-end with a modern SPA front-end without maintaining a separate API layer.",
    bg: "Използван за свързване на Laravel back-end със модерен SPA front-end без поддържане на отделен API слой.",
  },
  "skillDesc.react": {
    en: "My main library for building scalable, component-driven interfaces with hooks and reusable state.",
    bg: "Основната ми библиотека за изграждане на мащабируеми, компонентно-ориентирани интерфейси с hooks и преизползваемо състояние.",
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
  "projects.proprietaryNotice": {
    en: "Proprietary company project, source code is not publicly available.",
    bg: "Фирмен проект, изходният код не е публично достъпен.",
  },
  "company.freelance": { en: "Freelance", bg: "Фрийланс" },

  "project.myposPartnerPortal.name": {
    en: "myPOS Partner Portal",
    bg: "myPOS Партньорски портал",
  },
  "project.myposPartnerPortal.description": {
    en: "A partner portal for companies building payment solutions on myPOS. Partners can create and monitor integrations, manage connected merchants, online stores, and POS devices across multiple countries, and explore analytics on transaction trends and multi-currency volumes, alongside a sandbox environment and API documentation.",
    bg: "Партньорски портал за компании, изграждащи платежни решения върху myPOS. Партньорите могат да създават и наблюдават интеграции, да управляват свързани търговци, онлайн магазини и POS устройства в множество държави, както и да разглеждат анализи за тенденции на транзакциите и обеми в различни валути, заедно със sandbox среда и API документация.",
  },

  "project.sokoBeauty.name": {
    en: "Soko Beauty online store",
    bg: "Онлайн магазин Soko Beauty",
  },
  "project.sokoBeauty.description": {
    en: "A freelance e-commerce store for Soko Beauty, a shop specialising in authentic Korean skincare and cosmetics. Customers browse curated products, manage a cart, and check out securely with Stripe, using card or cash-on-delivery payment.",
    bg: "Фрийланс онлайн магазин за Soko Beauty, специализиран в автентична корейска козметика и грижа за кожата. Клиентите разглеждат подбрани продукти, управляват количка и плащат сигурно чрез Stripe, с карта или наложен платеж.",
  },

  "project.paymentsSystem.name": {
    en: "Web-based system for managing business processes related to payments.",
    bg: "Уеб система за управление на бизнес процеси, свързани с плащания.",
  },
  "project.paymentsSystem.description": {
    en: "This project consists of two components: a website and a user account system. Users can manage all processes related to payments received from their terminals through the account section, along with additional functionalities such as creating online stores with various products, issuing invoices to their clients through an innovative interface, and tracking all incoming funds in their account.",
    bg: "Проектът се състои от два компонента: уебсайт и система за потребителски акаунти. Потребителите могат да управляват всички процеси, свързани с плащания, получени от техните терминали, чрез секцията за акаунт, заедно с допълнителни функционалности като създаване на онлайн магазини с различни продукти, издаване на фактури към клиентите чрез иновативен интерфейс и проследяване на всички входящи средства в акаунта им.",
  },

  "project.carMarketplace.name": {
    en: "Web-based system for buying and selling cars.",
    bg: "Уеб система за купуване и продаване на автомобили.",
  },
  "project.carMarketplace.description": {
    en: "web-based platform designed to facilitate the process of buying and selling cars. It allows users to browse listings, post their vehicles for sale, and conduct secure transactions through the platform.",
    bg: "Уеб платформа, създадена да улесни процеса на купуване и продаване на автомобили. Позволява на потребителите да разглеждат обяви, да публикуват своите превозни средства за продажба и да извършват сигурни транзакции през платформата.",
  },

  "project.propertyValuation.name": {
    en: "Web based system for property valuation",
    bg: "Уеб система за оценка на имоти",
  },
  "project.propertyValuation.description": {
    en: "The purpose of the trial is to allow residents to create appraisals that will be predicted by all interested parties and select the most appropriate appraiser to perform the task on the property. The selection of an evaluator is done anonymously, through a dynamic interface. The appraisal process begins with creating an appraisal, linking interested pages, inserting property data, and displaying appraisers through the interface. Once the appraiser is selected and the appraisals paid for, the process is complete. All communication about the process is done automatically through the platform, and the communication is visible to users. The platform supports multiple languages.",
    bg: "Целта на системата е да позволи на потребителите да създават оценки, за които всички заинтересовани страни наддават, и да изберат най-подходящия оценител за задачата върху имота. Изборът на оценител се извършва анонимно чрез динамичен интерфейс. Процесът започва със създаване на оценка, свързване на заинтересовани страни, въвеждане на данни за имота и показване на оценителите чрез интерфейса. След като оценителят е избран и оценките са платени, процесът е завършен. Цялата комуникация се извършва автоматично през платформата и е видима за потребителите. Платформата поддържа множество езици.",
  },

  "project.managementSystem.name": {
    en: "Web based management system",
    bg: "Уеб система за управление",
  },
  "project.managementSystem.description": {
    en: "The Web-based management system is a comprehensive platform that allows users to place orders, monitor product availability, and manage their inventory effectively. Users can specify unique properties for each product, such as images, prices and etc. Additionally, the system includes features for adding sales and provides an innovative dashboard for tracking various statistics related to sales, turnovers, profits, expenses, and product inventory through insightful diagrams.",
    bg: "Уеб системата за управление е цялостна платформа, която позволява на потребителите да правят поръчки, да следят наличността на продуктите и да управляват ефективно склада си. Потребителите могат да задават уникални свойства за всеки продукт, като изображения, цени и др. Освен това системата включва функции за добавяне на продажби и предоставя иновативен дашборд за проследяване на различни статистики, свързани с продажби, обороти, печалби, разходи и наличности чрез нагледни диаграми.",
  },

  "project.jobPortal.name": {
    en: "System for job searching and offering - Job Portal",
    bg: "Система за търсене и предлагане на работа - Job Portal",
  },
  "project.jobPortal.description": {
    en: "The platform designed to connect employers with job seekers, providing functionalities for job searching and offering. Users can create accounts, distinguishing between employers and job seekers, to access the platform's features. Job seekers can browse through job listings, filtering by criteria such as location, salary, and industry, while employers can post job openings, specifying requirements and offered salary. The platform facilitates online job applications, allowing job seekers to submit their CVs and cover letters directly. Additionally, it may incorporate messaging features for communication between employers and job seekers and include a rating and review system for users to evaluate each other's experiences.",
    bg: "Платформа, създадена да свързва работодатели с търсещи работа, предоставяйки функционалности за търсене и предлагане на работа. Потребителите могат да създават акаунти, разделени на работодатели и търсещи работа, за достъп до функциите на платформата. Търсещите работа могат да разглеждат обяви, филтрирайки по критерии като локация, заплата и индустрия, докато работодателите могат да публикуват свободни позиции, посочвайки изисквания и предлагана заплата. Платформата улеснява онлайн кандидатстването, като позволява директно подаване на CV и мотивационни писма. Освен това може да включва съобщения за комуникация между страните и система за оценки и отзиви.",
  },

  "project.appointmentSystem.name": {
    en: "Appointment system",
    bg: "Система за записване на часове",
  },
  "project.appointmentSystem.description": {
    en: "The Appointment System is a web-based application designed to facilitate the scheduling and management of appointments and meetings. Users can effortlessly add appointments, while also being able to filter through the data based on various criteria. With its intuitive interface and robust backend, the system ensures efficient organization and coordination of schedules for individuals or teams.",
    bg: "Системата за записване на часове е уеб приложение, създадено да улесни планирането и управлението на часове и срещи. Потребителите могат лесно да добавят записвания, както и да филтрират данните по различни критерии. С интуитивния си интерфейс и стабилен backend, системата осигурява ефективна организация и координация на графици за отделни хора или екипи.",
  },

  "project.laravelBlog.name": { en: "Laravel Blog", bg: "Laravel блог" },
  "project.laravelBlog.description": {
    en: "The Laravel Blog project is a dynamic web application built using HTML, CSS, Bootstrap, PHP, Laravel, and MySQL. It serves as a versatile platform for creating, updating, reading, and deleting (CRUD) blog posts, providing users with the ability to manage their content seamlessly. Additionally, the system supports user profiles, allowing individuals to create and personalize their accounts. Through its intuitive interface and robust backend powered by Laravel, users can easily compose, edit, and publish blog posts while maintaining full control over their profiles. With features for both content creation and user management, the blog offers a comprehensive solution for blogging enthusiasts and content creators alike.",
    bg: "Проектът Laravel блог е динамично уеб приложение, изградено с HTML, CSS, Bootstrap, PHP, Laravel и MySQL. Служи като гъвкава платформа за създаване, редактиране, четене и изтриване (CRUD) на публикации в блог, давайки на потребителите възможност да управляват съдържанието си безпроблемно. Освен това системата поддържа потребителски профили, позволявайки създаване и персонализиране на акаунти. Чрез интуитивния интерфейс и стабилния backend с Laravel, потребителите могат лесно да пишат, редактират и публикуват статии, запазвайки пълен контрол над профилите си.",
  },

  "project.workflowSystem.name": {
    en: "Work flow management system",
    bg: "Система за управление на работния поток",
  },
  "project.workflowSystem.description": {
    en: "Web-based workflow management system. I have envisioned a site from where every user will be able to make a request/order for the type of service. An administrator will then process their order, via an admin panel/window where a task will begin for a specific team. Employees from the team will access the tasks from a mobile device (tablet).",
    bg: "Уеб система за управление на работния поток. Замислих сайт, от който всеки потребител може да направи заявка/поръчка за определен тип услуга. Администратор след това обработва поръчката през админ панел, където се създава задача за конкретен екип. Служителите от екипа достъпват задачите от мобилно устройство (таблет).",
  },

  "project.priceComparison.name": {
    en: "Web platform for price comparing and products",
    bg: "Уеб платформа за сравнение на цени и продукти",
  },
  "project.priceComparison.description": {
    en: "Web platform for comparing prices and products from various sites. With the development of e-commerce, the online space is crowded with a lot of information. There comes the need for such platforms for comparing products and services. The idea is for consumers to easily make their choice when purchasing a product. ",
    bg: "Уеб платформа за сравнение на цени и продукти от различни сайтове. С развитието на електронната търговия онлайн пространството е претоварено с много информация. Оттам идва нуждата от такива платформи за сравнение на продукти и услуги. Идеята е потребителите лесно да направят своя избор при покупка на продукт. ",
  },

  "project.workProcessManagement.name": {
    en: "System for work process management",
    bg: "Система за управление на работния процес",
  },
  "project.workProcessManagement.description": {
    en: "The system allows users after logging into the system and many functional options. The main functionalities are: adding new products and employees, screen with employees and products, editing employees and products, exporting data from the system.",
    bg: "Системата предоставя на потребителите след вход множество функционални опции. Основните функционалности са: добавяне на нови продукти и служители, екран със служители и продукти, редактиране на служители и продукти, експортиране на данни от системата.",
  },

  "project.pizzeriaManagement.name": {
    en: "System for work process management in a pizzeria",
    bg: "Система за управление на работния процес в пицария",
  },
  "project.pizzeriaManagement.description": {
    en: "The system allows users, after logging into the system, many functional options. The main functionalities are: adding new products according to different criteria, viewing products and filtering according to different criteria, entering stocks, reporting used products.",
    bg: "Системата предоставя на потребителите след вход множество функционални опции. Основните функционалности са: добавяне на нови продукти по различни критерии, преглед и филтриране на продукти по различни критерии, въвеждане на наличности, отчитане на използвани продукти.",
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

  // --- Certification descriptions ---
  "cert.craictAward.description": {
    en: "The recipient of the CRAICT Award at UE Varna in 2023, honored as a Laureate, signifies an individual recognized for talent and achievements. This award, part of a fund supporting talented students, highlights their outstanding contributions and dedication to their field of study or area of expertise within the university community.",
    bg: "Носител на наградата CRAICT в ИУ - Варна през 2023 г., отличен като лауреат, което означава човек, признат за талант и постижения. Наградата, част от фонд за подкрепа на талантливи студенти, подчертава изключителния принос и отдаденост към областта на обучение в рамките на университетската общност.",
  },
  "cert.studentActivityAward.description": {
    en: `Certificate for first place in 2022, "Review of student activities" at the Department of Informatics with development (Platform for comparison of prices and products from various websites).`,
    bg: 'Сертификат за първо място през 2022 г., "Преглед на студентската активност" в катедра Информатика с разработка (Платформа за сравнение на цени и продукти от различни сайтове).',
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
    en: "Part of the IT Master Class 9. The university provides us to become a part of the companies in the IT field and gain some of their experience. ",
    bg: "Част от IT Master Class 9. Университетът ни дава възможност да станем част от компании в IT сферата и да придобием част от техния опит. ",
  },
  "cert.itMasterClass10.description": {
    en: "Part of the IT Master Class 10. The university provides us to become a part of the companies in the IT field and gain some of their experience. ",
    bg: "Част от IT Master Class 10. Университетът ни дава възможност да станем част от компании в IT сферата и да придобием част от техния опит. ",
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
};
