import type { CaseStudy } from "../types";

/**
 * Full case-study content, keyed by slug. Numbers in `metrics` and any
 * quantified `results` are representative placeholders to be swapped for the
 * real figures; everything else is grounded in the project itself.
 *
 * The `bg` strings are written directly in Bulgarian (not translated from the
 * English), so the two languages read naturally rather than mirroring each
 * other sentence for sentence.
 */
const myposPartnerPortal: CaseStudy = {
  slug: "mypos-partner-portal",
  name: "project.myposPartnerPortal.name",
  // Matched to the real Partner Portal brand accent (partners.mypos.com #0071f3).
  accent: {
    base: "#0071f3",
    ink: "#0a5fcc",
    onDark: "#6ea8ff",
    soft: "#e8f1fe",
    glow: "rgba(0, 113, 243, 0.18)",
  },
  eyebrow: {
    en: "myPOS · Payments platform",
    bg: "myPOS · Платформа за плащания",
  },
  tagline: {
    en: "A partner portal that turns myPOS from a payments product into a platform others build on.",
    bg: "Партньорски портал за компании, които интегрират услугите на myPOS в собствените си продукти и управляват всичко от едно място.",
  },
  summary: {
    en: "Companies building payment solutions on myPOS get one place to create and monitor integrations, manage their merchants, online stores and POS devices across countries, read analytics on transaction trends and multi-currency volumes, and test everything in a sandbox against real API docs.",
    bg: "Порталът дава възможност на партньорите сами да създават интеграции, да управляват търговци, магазини и POS устройства, да следят транзакциите си и да разработват срещу sandbox среда с пълна API документация.",
  },
  role: {
    en: "Full-stack developer",
    bg: "Full-stack разработчик",
  },
  timeline: "02.2025 - 06.2025",
  liveUrl: "https://partners.mypos.com/en",
  metrics: [
    {
      value: 30,
      suffix: "+",
      label: { en: "Markets served", bg: "Обслужвани пазари" },
      detail: {
        en: "Multi-currency, multi-language from day one",
        bg: "Различни валути и езици още от старта",
      },
    },
    {
      value: 60,
      suffix: "%",
      label: { en: "Higher performance", bg: "По-висока производителност" },
      detail: {
        en: "Redis caching for faster data access",
        bg: "Redis кеширане за по-бърз достъп до данните",
      },
    },
    {
      value: 40,
      suffix: "%",
      label: { en: "Fewer support tickets", bg: "По-малко запитвания към съпорта" },
      detail: {
        en: "Partners self-serve onboarding and the sandbox",
        bg: "Партньорите се справят сами благодарение на sandbox средата",
      },
    },
    {
      value: 10,
      suffix: " min",
      label: { en: "To first sandbox call", bg: "До първа sandbox заявка" },
      detail: {
        en: "From sign-up to a working integration",
        bg: "От регистрация до работеща интеграция",
      },
    },
  ],
  problem: {
    body: [
      {
        en: "myPOS could process payments, but partners, the PSPs, ISVs and marketplaces building on top of it, had no home. Onboarding a new integration meant emails, manual setup and support tickets. There was no self-serve way to spin up an integration, connect merchants, provision POS devices, or see how transactions were performing across countries and currencies.",
        bg: "Партньорите на myPOS (PSP-та, ISV-та и маркетплейси) нямаха централизирано място, от което сами да управляват интеграциите и търговците си. Повечето дейности около новите интеграции изискваха комуникация със съпорт екипа, ръчни настройки и допълнителни заявки. Липсваше възможност партньорите сами да създават и управляват интеграциите си, да свързват търговци, да заявяват POS устройства или да виждат как вървят транзакциите им по държави и валути.",
      },
      {
        en: "The brief was to build that home: one portal where a partner signs up, creates an integration, manages the merchants, stores and devices under it, watches analytics on transaction trends and multi-currency volumes, and tests against a sandbox with live API documentation, without a human in the loop.",
        bg: "Целта беше да се изгради self-service портал, чрез който партньорите да могат сами да извършват всички основни операции без намеса от вътрешните екипи. Идеята беше повечето ежедневни операции да могат да се извършват без намесата на съпорт или технически екип.",
      },
    ],
    constraints: [
      {
        en: "Regulated fintech: correctness and security are not optional, a wrong data shape is money and compliance.",
        bg: "Регулиран финтех: точността и сигурността са задължителни, грешка в данните означава пари и регулаторен риск.",
      },
      {
        en: "Multi-country and multi-currency: every screen has to localise content, formats and money.",
        bg: "Много държави и валути: всеки екран трябва да съобразява език, формати и суми.",
      },
      {
        en: "Data-dense: large tables and heavy analytics that still have to feel instant.",
        bg: "Голям обем данни: големи таблици и сериозна аналитика, които трябваше да останат бързи дори при голямо натоварване.",
      },
      {
        en: "Self-serve by design: the portal has to replace support, not add to it.",
        bg: "Self-service модел: порталът трябва да замести съпорта, а не да му създава още работа.",
      },
    ],
  },
  architecture: {
    intro: {
      en: "A Next.js front end talks to a thin backend-for-frontend that authenticates, validates and aggregates before fanning out to the domain services. Reads that are expensive and repeated get cached; writes flow through to myPOS core and the device fleet.",
      bg: "Next.js приложението използва backend-for-frontend слой, който валидира заявките, управлява автентикацията и агрегира данните от отделните услуги. Често използваните заявки се кешират, а операциите по запис се изпращат към основните услуги на myPOS.",
    },
    layers: [
      {
        title: { en: "Client", bg: "Клиент" },
        role: {
          en: "Partner dashboards, API docs and sandbox UI. Server-rendered shell, hydrated islands.",
          bg: "Партньорски табла, API документация и sandbox интерфейс. Рендерира се на сървъра, интерактивните части се хидратират отделно.",
        },
        nodes: ["Next.js", "React", "TypeScript", "Shadcn UI"],
      },
      {
        title: { en: "Backend for frontend", bg: "Backend за фронтенда" },
        role: {
          en: "Session and token auth, request validation, rate limiting, response aggregation.",
          bg: "Сесии и токени, валидация на заявките, rate limiting, агрегиране на отговорите.",
        },
        nodes: ["API routes", "Auth", "Validation", "Rate limiting"],
      },
      {
        title: { en: "Domain services", bg: "Доменни услуги" },
        role: {
          en: "The portal's capabilities, each owning its slice of the partner world.",
          bg: "Основната функционалност, разделена по домейни: всяка услуга отговаря за своята част.",
        },
        nodes: ["Integrations", "Merchants", "Devices", "Analytics", "Sandbox"],
      },
      {
        title: { en: "Data & cache", bg: "Данни и кеш" },
        role: {
          en: "Partner and merchant records; Redis for cached aggregates, sessions and rate limits.",
          bg: "Данни за партньори и търговци; Redis за кеширани агрегати, сесии и rate limits.",
        },
        nodes: ["MongoDB", "Redis"],
      },
      {
        title: { en: "myPOS core", bg: "myPOS ядро" },
        role: {
          en: "Real transactions, multi-country processors and physical POS device provisioning.",
          bg: "Истинските транзакции, процесорите по държави и физическите POS устройства.",
        },
        nodes: ["Payment rails", "POS fleet", "Processors"],
      },
    ],
    note: {
      en: "The sandbox mirrors this whole path with isolated data and keys, so a partner can integrate end to end before a single real transaction.",
      bg: "Sandbox средата повтаря целия този път с отделни данни и ключове: партньорът може да мине през цялата интеграция докрай, преди да е минала и една истинска транзакция.",
    },
  },
  decisions: [
    {
      title: {
        en: "Server-render the heavy surfaces",
        bg: "Server rendering за тежките страници",
      },
      problem: {
        en: "Dashboards and API docs are data-heavy. A pure SPA meant a slow first paint and weak documentation SEO.",
        bg: "Таблата и API документацията са пълни с данни. SPA подходът водеше до бавно първо зареждане и слабо SEO за документацията.",
      },
      choice: {
        en: "Next.js App Router: server components for the data and docs shell, client islands only where interaction actually lives.",
        bg: "Next.js App Router: server компоненти за данните и документацията, клиентски компоненти само там, където има реална интеракция.",
      },
      why: {
        en: "Fast time-to-first-byte and streamed content on large tables, real HTML for docs, and far less JavaScript shipped to the browser.",
        bg: "Бързо първо зареждане и стрийминг при големите таблици, истински HTML за документацията и много по-малко JavaScript към браузъра.",
      },
      impact: {
        en: "Data-dense pages paint fast; only the interactive widgets pay the hydration cost.",
        bg: "Тежките страници зареждат бързо, а JavaScript се изпраща само за интерактивните компоненти.",
      },
      tags: ["Next.js", "React Server Components", "TypeScript"],
    },
    {
      title: {
        en: "Cache the analytics read path",
        bg: "Кеширане на аналитиката",
      },
      problem: {
        en: "Transaction-trend and multi-currency-volume queries are expensive, and partners read them far more often than the data changes.",
        bg: "Заявките за тенденции и обеми по валути са скъпи, а партньорите ги гледат много по-често, отколкото данните реално се променят.",
      },
      choice: {
        en: "Aggregate once, cache the result in Redis, invalidate on write.",
        bg: "Данните се агрегират предварително, пазим резултата в Redis и го инвалидираме при запис.",
      },
      why: {
        en: "Partners reload dashboards constantly; recomputing every aggregate per request would not scale with transaction volume.",
        bg: "Партньорите презареждат таблата постоянно. Преизчисляването на всяка заявка просто не мащабира.",
      },
      impact: {
        en: "Dashboards load sub-second even across large date ranges.",
        bg: "Таблата зареждат под секунда дори за големи периоди.",
      },
      tags: ["Redis", "MongoDB"],
    },
    {
      title: {
        en: "Own the component layer",
        bg: "Собствен компонентен слой",
      },
      problem: {
        en: "Complex tables, multi-step forms and dialogs run through the whole portal. A black-box UI kit would fight us on accessibility and theming.",
        bg: "Из целия портал има сложни таблици, многостъпкови форми и диалози. Използването на готова UI библиотека би ограничило възможностите за персонализация.",
      },
      choice: {
        en: "Shadcn UI: copy the primitives into the codebase and build the portal's own system on top.",
        bg: "Shadcn UI: компонентите се добавят директно в кодовата база и върху тях градим собствената система на портала.",
      },
      why: {
        en: "Full control of the markup for accessibility and dark mode, no runtime lock-in, one consistent set of primitives.",
        bg: "Пълен контрол върху markup-а, тъмна тема и достъпност без ограниченията на външна библиотека.",
      },
      impact: {
        en: "Complex forms and tables shipped fast, with keyboard and screen-reader support baked in.",
        bg: "Формите и таблиците излизаха бързо, с клавиатурна навигация и поддръжка за екранни четци по подразбиране.",
      },
      tags: ["Shadcn UI", "Radix", "Tailwind"],
    },
    {
      title: {
        en: "Type-safe from database to button",
        bg: "TypeScript от базата до бутона",
      },
      problem: {
        en: "It is payments. A wrong data shape is not a cosmetic bug; it is money and compliance.",
        bg: "Проектът обработва чувствителни финансови данни. Грешна структура на данните не е козметичен бъг, а пари и регулации.",
      },
      choice: {
        en: "TypeScript end to end, with domain types shared across client and server.",
        bg: "TypeScript навсякъде, с общи доменни типове между клиента и сървъра.",
      },
      why: {
        en: "Catch mismatches at compile time and make large refactors safe in a regulated domain.",
        bg: "Несъответствията се хващат още при компилация, а големите рефакторинги минават спокойно дори в регулиран домейн.",
      },
      impact: {
        en: "Fewer runtime surprises and confident, sweeping refactors.",
        bg: "По-малко грешки в продукционна среда и рефакторинги без страх.",
      },
      tags: ["TypeScript"],
    },
    {
      title: {
        en: "A sandbox that cannot touch production",
        bg: "Изолирана sandbox среда",
      },
      problem: {
        en: "Partners must test full integrations without risking real merchants or real money.",
        bg: "Партньорите трябва да тестват цели интеграции, без риск за истински търговци и истински пари.",
      },
      choice: {
        en: "An isolated sandbox with its own data and keys, mirroring the production API surface.",
        bg: "Изолирана sandbox среда със собствени данни и ключове, огледало на продукционния API.",
      },
      why: {
        en: "Safe self-serve onboarding: partners build and verify with confidence before going live.",
        bg: "Това позволява интеграциите да бъдат тествани изцяло преди преминаване към продукционна среда.",
      },
      impact: {
        en: "Partners integrate end to end before a single real transaction.",
        bg: "Цялата интеграция се минава докрай още преди първата реална транзакция.",
      },
      tags: ["Sandbox", "API design"],
    },
  ],
  results: {
    body: [
      {
        en: "The portal turned myPOS into a platform partners build on: they create and monitor integrations, manage merchants, online stores and POS devices across countries, and read analytics on transaction trends and volumes, all self-serve.",
        bg: "С проекта myPOS получи централизирано решение за управление на партньори и техните интеграции: партньорите сами си създават и следят интеграции, управляват търговци, магазини и POS устройства по държави и гледат анализи за транзакциите си, без необходимост от съдействие от вътрешните екипи.",
      },
      {
        en: "Onboarding that used to lean on support now runs through the sandbox and API docs, and the data-heavy dashboards stay fast because the expensive reads are cached.",
        bg: "Голяма част от процеса по онбординг вече се извършва през sandbox средата и API документацията. Аналитичните табла остават бързи благодарение на кеширане на често използваните агрегирани данни.",
      },
    ],
    points: [
      {
        en: "Self-serve partner onboarding, from sign-up to first sandbox call",
        bg: "Self-serve онбординг: от регистрация до първа sandbox заявка",
      },
      {
        en: "Multi-country, multi-currency merchant and device management",
        bg: "Управление на търговци и устройства по държави и валути",
      },
      {
        en: "Analytics on transaction trends and volumes, cached for sub-second loads",
        bg: "Аналитика за транзакциите, кеширана и зареждаща под секунда",
      },
      {
        en: "An accessible, themeable UI system reused across the whole portal",
        bg: "Достъпна UI система с теми, преизползвана из целия портал",
      },
    ],
  },
  stack: [
    {
      group: { en: "Frontend", bg: "Frontend" },
      items: ["React", "Next.js", "TypeScript", "Shadcn UI", "AJAX"],
    },
    {
      group: { en: "Data & cache", bg: "Данни и кеш" },
      items: ["MongoDB", "Redis"],
    },
    {
      group: { en: "Delivery", bg: "Работен процес" },
      items: ["CI/CD", "Jira"],
    },
  ],
};

const myposPaymentsSystem: CaseStudy = {
  slug: "mypos-payments-system",
  name: "project.paymentsSystem.name",
  // Matched to the real myPOS merchant-site brand green (www.mypos.com #00b67a).
  accent: {
    base: "#00b67a",
    ink: "#047857",
    onDark: "#34d399",
    soft: "#e6f8f1",
    glow: "rgba(0, 182, 122, 0.18)",
  },
  eyebrow: {
    en: "myPOS · Merchant platform",
    bg: "myPOS · Платформа за търговци",
  },
  tagline: {
    en: "The merchant side of myPOS: a public site and an account where businesses run everything around the money their terminals take.",
    bg: "Публичният сайт и търговският акаунт на myPOS, през който бизнес клиентите управляват плащанията, терминалите и финансовите си операции.",
  },
  summary: {
    en: "Two surfaces in one product: a public marketing site, and a deep authenticated account. From their account, merchants set up online stores with products, issue invoices to clients, transfer funds between their accounts, manage their terminal settings, and track every incoming payment in one place, all sitting on a mature Symfony backend with modern React islands.",
    bg: "Системата се състои от две основни части – публичен сайт и потребителски акаунт за търговците. От акаунта си те пускат онлайн магазини с продукти, издават фактури на клиентите си, правят трансфери между сметките си, управляват настройките на терминалите си и следят всички входящи плащания на едно място, плюс още много други функционалности. Основната функционалност е изградена върху Symfony, като новите модули постепенно се разработват с React и TypeScript.",
  },
  role: {
    en: "Full-stack developer",
    bg: "Full-stack разработчик",
  },
  timeline: "07.2023 - 07.2026",
  liveUrl: "https://www.mypos.com",
  metrics: [
    {
      value: 30,
      suffix: "+",
      label: { en: "Markets", bg: "Пазари" },
      detail: {
        en: "Multi-currency merchant funds",
        bg: "Търговски средства в различни валути",
      },
    },
    {
      value: 50,
      suffix: "%",
      label: { en: "Higher performance", bg: "По-висока производителност" },
      detail: {
        en: "Redis caching and session store",
        bg: "Redis кеширане и сесии",
      },
    },
    {
      value: 3,
      suffix: { en: "-in-1", bg: "-в-1" },
      label: { en: "Merchant tools", bg: "Инструменти за търговци" },
      detail: {
        en: "Online store, invoicing, funds tracking",
        bg: "Онлайн магазин, фактури и следене на средствата",
      },
    },
    {
      value: 100,
      suffix: "%",
      label: { en: "Type-safe new layer", bg: "Типизиран нов код" },
      detail: {
        en: "TypeScript across the React islands",
        bg: "TypeScript във всички React части",
      },
    },
  ],
  problem: {
    body: [
      {
        en: "myPOS merchants take card payments through physical terminals, but the business around that money lived in scattered places. They needed one account to see incoming funds, transfer money between their own accounts, manage their terminal settings, plus real tools to sell: build an online store, list products, issue invoices to their clients. And a public site to explain the product and convert new merchants.",
        bg: "Търговците на myPOS приемат картови плащания през физически терминали, но управлението на финансовите операции беше разпределено между различни системи. Трябваше им един акаунт, в който да виждат входящите средства, да правят трансфери между сметките си, да управляват настройките на терминалите си и през който да управляват и онлайн продажбите си. Наред с това беше необходим и публичен сайт за представяне на продуктите и привличане на нови търговци.",
      },
      {
        en: "The catch: this is a large, live product handling real money, built on a mature Symfony and Twig codebase. New features had to land inside it without a risky rewrite, and the two surfaces, a content-led public site and a data-heavy account app, pull in opposite technical directions.",
        bg: "Основното предизвикателство беше, че това е голяма и вече утвърдена система, която обработва реални финансови транзакции и е изградена върху зряла Symfony/Twig кодова база. Новите функционалности трябваше да се интегрират без да се нарушава работата на съществуващата функционалност и без мащабен rewrite. Освен това публичната част на сайта е разработена със Symfony и Twig, докато потребителският акаунт е изграден с React върху Symfony back-end, което изисква различен подход към архитектурата и разработката.",
      },
    ],
    constraints: [
      {
        en: "Real money, regulated: accuracy, security and auditability are the baseline.",
        bg: "Истински пари в регулирана среда: точност, сигурност и одит по подразбиране.",
      },
      {
        en: "Two surfaces: a content and SEO-led public site, and a stateful account app.",
        bg: "Две части: публичен сайт, разчитащ на SEO и съдържание, и акаунт приложение със сериозно състояние.",
      },
      {
        en: "Legacy and modern coexist: Symfony and Twig rendering with React and Mobx action.",
        bg: "Съвместна работа между съществуващия Symfony/Twig код и новите React модули: React, MobX и постепенно въвеждане на TypeScript.",
      },
      {
        en: "Multi-tenant merchants across many countries and currencies.",
        bg: "Много търговци, много държави, много валути.",
      },
    ],
  },
  architecture: {
    intro: {
      en: "The public site is server-rendered from Symfony and Twig; the account app layers React and Mobx on top for the interactive parts. Both talk to the same PHP application, backed by MySQL and Redis, and settle against the myPOS payments core. The ecosystem behind includes third-party payment processors in each country, banking APIs for settlements and multi-currency conversions, tax and compliance systems, and internal microservices for risk, analytics and accounting.",
      bg: "Публичният сайт се рендерира от Symfony и Twig. Потребителският акаунт използва React и MobX, интегрирани в съществуващото Symfony приложение. Данните се съхраняват в MySQL, а Redis се използва за кеширане и управление на сесиите. Сетълментът минава през платежното ядро на myPOS. Системата е интегрирана с множество външни услуги: външни платежни процесори по държави, банкови API-та за сетълмент и валутни конверсии, системи за данъци и съответствие, вътрешни микросървизи за риск, аналитика и счетоводство.",
    },
    layers: [
      {
        title: { en: "Public site", bg: "Публичен сайт" },
        role: {
          en: "Server-rendered marketing and product pages, tuned for SEO and speed.",
          bg: "Server-rendered маркетинг и продуктови страници, направени за SEO и скорост.",
        },
        nodes: ["Twig", "Bootstrap", "CSS", "HTML"],
      },
      {
        title: { en: "Account app", bg: "Акаунт част" },
        role: {
          en: "Interactive islands for stores, products, invoices, funds transfers, terminal settings and more inside the account.",
          bg: "Интерактивните части на акаунта: магазини, продукти, фактури, трансфери между сметки, настройки на терминали и още много други.",
        },
        nodes: ["React", "Mobx", "TypeScript", "jQuery", "AJAX"],
      },
      {
        title: { en: "Application", bg: "Приложен слой" },
        role: {
          en: "Auth, invoicing, store management and business logic on a mature framework.",
          bg: "Автентикация, фактуриране, магазини и бизнес логика върху утвърдена рамка.",
        },
        nodes: ["PHP", "Symfony"],
      },
      {
        title: { en: "Data & cache", bg: "Данни и кеш" },
        role: {
          en: "Merchants, orders, invoices and funds - Redis for cache, sessions and hot reads.",
          bg: "Търговци, поръчки, фактури и средства - Redis за кеш, сесии и честите четения.",
        },
        nodes: ["MySQL", "Redis"],
      },
      {
        title: { en: "Payments core", bg: "Платежно ядро" },
        role: {
          en: "myPOS terminals, transaction settlement and multi-currency funds.",
          bg: "Терминалите на myPOS, сетълмент на транзакциите и средства в различни валути.",
        },
        nodes: ["Terminals", "Settlement", "Multi-currency"],
      },
      {
        title: { en: "External ecosystem", bg: "Външни услуги" },
        role: {
          en: "Payment processors per country, banking APIs, tax/compliance systems, accounting and risk services.",
          bg: "Платежни процесори по държави, банкови API-та, системи за данъци и съответствие, счетоводство и риск.",
        },
        nodes: ["Payment processors", "Banking APIs", "Tax systems", "Compliance", "Accounting", "Risk analytics"],
      },
    ],
    note: {
      en: "New work ships as React and TypeScript inside the existing Symfony app, so the product modernises surface by surface instead of through one risky rewrite.",
      bg: "Новите функционалности се разработват като React/TypeScript в съществуващото Symfony приложение. Така продуктът се модернизира част по част, без необходимост от цялостно пренаписване на приложението.",
    },
  },
  decisions: [
    {
      title: {
        en: "Right renderer per surface",
        bg: "Различен подход за публичния сайт и потребителския акаунт",
      },
      problem: {
        en: "The public site needs SEO and fast static-feeling pages, the account needs rich, stateful interaction. One approach for both would compromise one of them.",
        bg: "Публичният сайт иска SEO и бързи страници, акаунтът иска богата интеракция и състояние. Двата типа приложения имат различни изисквания към производителността и потребителското изживяване.",
      },
      choice: {
        en: "Symfony and Twig server-render the public site - React and Mobx power the interactive account.",
        bg: "Публичният сайт използва Symfony и Twig, а потребителският акаунт е реализиран с React.",
      },
      why: {
        en: "Each surface gets the tool it actually wants, without forcing a single stack onto two very different jobs.",
        bg: "Всяка част използва технологии, които най-добре отговарят на конкретните ѝ изисквания.",
      },
      impact: {
        en: "Fast, indexable public pages and an app-like account, from one product.",
        bg: "Бързи, индексируеми публични страници и акаунт, който се усеща като приложение.",
      },
      tags: ["Symfony", "Twig", "React", "Mobx"],
    },
    {
      title: {
        en: "Mobx for the account's live state",
        bg: "Mobx за състоянието на акаунта",
      },
      problem: {
        en: "Stores, products, invoices and funds are interdependent; a single change ripples across the account UI.",
        bg: "Магазини, продукти, фактури и средства са свързани помежду си, голяма част от интерфейса използва общо състояние.",
      },
      choice: {
        en: "Observable Mobx stores as the single source of data, with the UI reacting to derived state.",
        bg: "Observable Mobx stores като единствен източник на данни, компонентите автоматично се обновяват при промяна на състоянието.",
      },
      why: {
        en: "Complex, cross-cutting state stays consistent without prop-drilling or manual syncing.",
        bg: "Сложното споделено състояние остава консистентно без предаване на пропсове и ръчно синхронизиране.",
      },
      impact: {
        en: "A reactive account UI that never drifts out of sync with its data.",
        bg: "По-консистентно управление на състоянието в приложението.",
      },
      tags: ["Mobx", "React", "TypeScript"],
    },
    {
      title: {
        en: "Migrate incrementally, never rewrite",
        bg: "Постепенна миграция вместо rewrite",
      },
      problem: {
        en: "A big-bang rewrite of a live, money-handling product is how you break payments and lose trust.",
        bg: "Цялостното пренаписване на система от този мащаб би довело до висок риск и значителни разходи.",
      },
      choice: {
        en: "Ship new features as React and TypeScript inside the existing Symfony app, modernising one surface at a time.",
        bg: "Новите функции излизат като React/TypeScript в съществуващото Symfony приложение, една част след друга.",
      },
      why: {
        en: "Keep shipping value while lowering the risk that a rewrite would concentrate into one release.",
        bg: "Разработката продължава без прекъсване на работата по съществуващите функционалности, а рискът не се трупа в един голям релийз.",
      },
      impact: {
        en: "The product keeps evolving without a freeze or a risky cutover.",
        bg: "Постепенна модернизация с минимален риск.",
      },
      tags: ["Incremental migration", "Symfony", "React"],
    },
    {
      title: {
        en: "Type-safe the new code",
        bg: "TypeScript в новия код",
      },
      problem: {
        en: "On a real-money product, a wrong data shape is a broken invoice or a mis-tracked payment.",
        bg: "Финансовите операции изискват висока надеждност. Грешна структура на данните е счупена фактура или сбъркано плащане.",
      },
      choice: {
        en: "TypeScript across the React and store layer, with typed boundaries to the PHP backend.",
        bg: "TypeScript в React и store слоя, с типизирани граници към PHP бекенда.",
      },
      why: {
        en: "Catch shape mismatches at compile time instead of in production, on the money path.",
        bg: "Грешките в структурата се откриват още по време на компилация, а не в продукция, точно по пътя на парите.",
      },
      impact: {
        en: "Safer changes on the surfaces that touch invoices and funds.",
        bg: "По-сигурни рефакторинги и по-малко грешки.",
      },
      tags: ["TypeScript"],
    },
    {
      title: {
        en: "Redis for sessions, cache and hot reads",
        bg: "Redis за сесии и кеш",
      },
      problem: {
        en: "Merchants reload funds and dashboards constantly, sessions and hot reads have to scale.",
        bg: "Търговците презареждат таблата постоянно, сесиите и честите четения трябва да издържат натоварването.",
      },
      choice: {
        en: "Redis as the session store and cache in front of MySQL for the frequently-read data.",
        bg: "Redis за сесиите и като кеш пред MySQL за най-четените данни.",
      },
      why: {
        en: "Keep the account responsive under load without hammering the primary database.",
        bg: "Акаунтът остава бърз под натоварване, без излишно натоварване на MySQL.",
      },
      impact: {
        en: "A responsive account app even when many merchants are active at once.",
        bg: "По-добра производителност при голям брой едновременни потребители.",
      },
      tags: ["Redis", "MySQL"],
    },
  ],
  results: {
    body: [
      {
        en: "Merchants got one account to run the money side of their business: track incoming funds, sell through an online store, and issue invoices to clients. The public site explains and converts; the account app keeps up under real load.",
        bg: "Системата обединява управлението на плащания, онлайн магазини, фактуриране и финансови операции в един потребителски акаунт. Публичният сайт представя продуктите и подпомага привличането на нови клиенти. Акаунтът издържа реалното натоварване.",
      },
      {
        en: "New features land as React and TypeScript inside the mature Symfony core, so the product modernises steadily instead of betting everything on a rewrite.",
        bg: "Новите функционалности се добавят постепенно към съществуващата Symfony кодова база.",
      },
    ],
    points: [
      {
        en: "One account for funds, online stores and invoicing",
        bg: "Един акаунт за средства, онлайн магазини и фактуриране",
      },
      {
        en: "A content-led public site plus a deep authenticated app",
        bg: "Публичен сайт плюс дълбоко акаунт приложение",
      },
      {
        en: "React and Mobx inside a mature Symfony and Twig codebase",
        bg: "React и Mobx  в зряла Symfony/Twig кодова база",
      },
      {
        en: "Type-safe new code on a live, real-money product",
        bg: "Типизиран нов код върху жив продукт с истински пари",
      },
    ],
  },
  stack: [
    {
      group: { en: "Frontend", bg: "Frontend" },
      items: ["React", "Mobx", "TypeScript", "JavaScript", "jQuery", "AJAX", "Twig", "Bootstrap"],
    },
    {
      group: { en: "Backend", bg: "Backend" },
      items: ["PHP", "Symfony"],
    },
    {
      group: { en: "Data & cache", bg: "Данни и кеш" },
      items: ["MySQL", "Redis"],
    },
    {
      group: { en: "Delivery", bg: "Работен процес" },
      items: ["CI/CD", "Jira", "Claude Code"],
    },
  ],
};

const sokoBeauty: CaseStudy = {
  slug: "soko-beauty",
  name: "project.sokoBeauty.name",
  // Matched to the real Soko Beauty brand rose (sokobeauty.bg --color-rose #c97a7e).
  accent: {
    base: "#c97a7e",
    ink: "#a85458",
    onDark: "#dc9a9b",
    soft: "#faeeeb",
    glow: "rgba(201, 122, 126, 0.20)",
  },
  eyebrow: {
    en: "Freelance · E-commerce",
    bg: "Фрийланс · Онлайн магазин",
  },
  tagline: {
    en: "A boutique storefront for authentic Korean skincare, from browse to Stripe checkout.",
    bg: "Онлайн магазин за автентична корейска козметика с фокус върху бързо пазаруване, сигурни плащания и добро потребителско изживяване.",
  },
  summary: {
    en: "Soko Beauty specialises in authentic Korean skincare and cosmetics. Customers browse a curated catalogue, manage a cart, check out by card through Stripe or cash on delivery, and from their account track orders, invite friends through a referral program, manage saved payment methods and refunds, and spend Soko points that convert into real money off future orders. Behind it, an admin dashboard runs campaigns, products and categories, email marketing, accounts, orders and refund promotions.",
    bg: "Soko Beauty е онлайн магазин за автентична корейска козметика и продукти за грижа за кожата. Клиентите могат да разглеждат каталога, да правят поръчки с карта или наложен платеж, да следят историята на поръчките си, да използват реферална програма и да събират Soko точки за бъдещи покупки. Магазинът включва и административен панел за управление на продукти, категории, кампании, поръчки, клиенти и маркетинг.",
  },
  role: {
    en: "Full-stack developer",
    bg: "Full-stack разработчик",
  },
  timeline: "05.2026 - Present",
  liveUrl: "https://sokobeauty.bg",
  metrics: [
    {
      value: 2,
      suffix: "",
      label: { en: "Payment methods", bg: "Метода на плащане" },
      detail: {
        en: "Stripe card and cash on delivery",
        bg: "Карта през Stripe и наложен платеж",
      },
    },
    {
      value: 90,
      suffix: "+",
      label: { en: "Performance score", bg: "Оценка за скорост" },
      detail: {
        en: "SSR storefront, Redis-cached catalogue",
        bg: "SSR магазин с Redis кеш на каталога",
      },
    },
    {
      value: 100,
      suffix: "%",
      label: { en: "Built solo", bg: "Самостоятелна разработка" },
      detail: {
        en: "Design, frontend, backend, payments",
        bg: "Дизайн, frontend, backend, плащания",
      },
    },
    {
      value: 24,
      suffix: "/7",
      label: { en: "Self-serve orders", bg: "Поръчки по всяко време" },
      detail: {
        en: "Cart to checkout without a human",
        bg: "От количката до плащането, без човек по веригата",
      },
    },
  ],
  problem: {
    body: [
      {
        en: "A cosmetics brand specialising in authentic Korean skincare needed a real online store, not a marketplace stall: a curated catalogue, a smooth cart, and a checkout that matches how people actually pay here, card and cash on delivery.",
        bg: "Целта беше изграждането на собствен онлайн магазин, който да позволява пълен контрол върху продуктите, поръчките и клиентското изживяване: подбран каталог, удобна количка и плащане, което отговаря на навиците у нас, с карта и с наложен платеж.",
      },
      {
        en: "It was a solo build, end to end: design, storefront, backend, payments and deploy. For a consumer store, speed and search visibility are not polish, they are the difference between a sale and an abandoned cart.",
        bg: "Проектът беше реализиран изцяло самостоятелно – дизайн, frontend, backend, база данни, плащания и deployment. При онлайн магазин производителността и SEO оптимизацията са ключови за доброто потребителско изживяване и органичния трафик.",
      },
    ],
    constraints: [
      {
        en: "Solo, end to end: design, frontend, backend, payments and deploy.",
        bg: "Соло разработка: дизайн, frontend, backend, плащания и деплой.",
      },
      {
        en: "Consumer store: speed and SEO drive sales; slow pages lose carts.",
        bg: "Потребителски магазин: скоростта и SEO-то движат продажбите, бавните страници губят колички.",
      },
      {
        en: "Local habits: card via Stripe and cash on delivery, both first-class.",
        bg: "Местни навици: карта през Stripe и наложен платеж, и двете напълно поддържани.",
      },
      {
        en: "Real orders and money: checkout has to be reliable, every time.",
        bg: "Реални плащания и поръчки: процесът по плащане трябваше да бъде надежден и защитен.",
      },
    ],
  },
  architecture: {
    intro: {
      en: "A Next.js storefront server-renders the catalogue and product pages for speed and SEO, with a client cart on top. Checkout runs through Next.js API routes into Stripe, with a cash-on-delivery path alongside. An admin dashboard and a customer account sit on the same API, PostgreSQL stores products, orders and the points ledger, and Redis keeps the store snappy.",
      bg: "Next.js магазинът рендерира каталога и продуктовите страници на сървъра заради скоростта и SEO-то, а състоянието на количката се управлява от клиента. Плащането минава през Next.js API routes към Stripe, с отделен път за наложен платеж. Администраторският панел и клиентският акаунт използват едни и същи API endpoints, PostgreSQL пази продуктите, поръчките и баланса на точките, Redis кешира често използваните данни и подобрява производителността.",
    },
    layers: [
      {
        title: { en: "Storefront", bg: "Магазин" },
        role: {
          en: "Server-rendered catalogue and product pages, with a client-side cart.",
          bg: "Server-rendered каталог и продуктови страници, количка при клиента.",
        },
        nodes: ["Next.js", "React", "TypeScript", "Tailwind", "Shadcn UI"],
      },
      {
        title: { en: "Cart & checkout", bg: "Количка и плащане" },
        role: {
          en: "Client cart, server-verified checkout, and a cash-on-delivery flow.",
          bg: "Клиентска количка, сървърна проверка на плащането и поток за наложен платеж.",
        },
        nodes: ["Checkout sessions", "Webhooks", "Cash on delivery"],
      },
      {
        title: { en: "Admin dashboard", bg: "Администраторски панел" },
        role: {
          en: "Internal tools for running the store: campaigns, products and categories, email campaigns, accounts, orders and refund promotions.",
          bg: "Вътрешни инструменти за управление на магазина: кампании, продукти и категории, имейл кампании, акаунти, поръчки и рефънд промоции.",
        },
        nodes: ["Campaigns", "Products & categories", "Email campaigns", "Orders", "Refunds"],
      },
      {
        title: { en: "Customer account", bg: "Клиентски акаунт" },
        role: {
          en: "Order history, a referral program, saved payment methods and refunds, plus Soko points that convert into real money off future orders.",
          bg: "История на поръчките, реферална програма, запазени платежни методи и рефънди, плюс Soko точки, които се превръщат в реални пари за бъдещи поръчки.",
        },
        nodes: ["Order history", "Referral program", "Payment methods", "Soko points"],
      },
      {
        title: { en: "API", bg: "API" },
        role: {
          en: "Next.js routes for products, orders, accounts and Stripe checkout sessions.",
          bg: "Next.js routes за продукти, поръчки, акаунти и Stripe checkout сесии.",
        },
        nodes: ["Next.js API routes"],
      },
      {
        title: { en: "Data & cache", bg: "Данни и кеш" },
        role: {
          en: "Products, orders and the points ledger in PostgreSQL, Redis for cart, sessions and hot reads.",
          bg: "Продукти, поръчки и баланса на точките в PostgreSQL, Redis за количката, сесиите и честите четения.",
        },
        nodes: ["PostgreSQL", "Redis"],
      },
      {
        title: { en: "Payments", bg: "Плащания" },
        role: {
          en: "Card payments via Stripe, plus cash-on-delivery fulfilment.",
          bg: "Картови плащания през Stripe плюс наложен платеж.",
        },
        nodes: ["Stripe", "Cash on delivery"],
      },
    ],
    note: {
      en: "Stripe checkout sessions are verified server-side and confirmed by webhook, so an order is only real once the payment is.",
      bg: "Поръчката се потвърждава едва след успешно получено webhook известие от Stripe.",
    },
  },
  decisions: [
    {
      title: {
        en: "Server-render the storefront",
        bg: "Server rendering за магазина",
      },
      problem: {
        en: "A consumer store lives or dies on speed and search visibility; a slow, client-only catalogue loses shoppers and rankings.",
        bg: "Онлайн магазинът разчита на висока производителност и добра SEO оптимизация. Бавен, чисто клиентски каталог губи и клиенти, и позиции.",
      },
      choice: {
        en: "Next.js SSR for the catalogue and product pages, with the cart handled on the client.",
        bg: "Next.js SSR за каталога и продуктовите страници, количката остава при клиента.",
      },
      why: {
        en: "Fast first paint and indexable product pages bring shoppers in and keep them moving toward checkout.",
        bg: "Бързо първо зареждане и индексируеми продуктови страници водят хора и ги задържат до плащането.",
      },
      impact: {
        en: "A fast, search-visible store that holds attention through to the cart.",
        bg: "По-бързо първоначално зареждане и по-добра индексация от търсачките.",
      },
      tags: ["Next.js", "SSR", "SEO"],
    },
    {
      title: {
        en: "Card and cash on delivery, both first-class",
        bg: "Поддръжка на карта и наложен платеж",
      },
      problem: {
        en: "Bulgarian shoppers expect cash on delivery, a card-only checkout quietly loses a large share of buyers.",
        bg: "Българските клиенти очакват наложен платеж, магазин, който предлага само картови плащания, често губи част от потенциалните клиенти.",
      },
      choice: {
        en: "Stripe for card, with server-verified checkout sessions and webhooks, and a first-class cash-on-delivery path beside it.",
        bg: "Платежният процес включва Stripe за картови плащания със сървърно валидиране и webhooks, както и пълна поддръжка на наложен платеж.",
      },
      why: {
        en: "Match how people actually buy here instead of forcing one payment culture onto them.",
        bg: "Поддържат се двата най-често използвани начина на плащане на българския пазар.",
      },
      impact: {
        en: "Fewer abandoned checkouts because the expected payment option is always there.",
        bg: "Клиентите могат да изберат предпочитания от тях начин на плащане.",
      },
      tags: ["Stripe", "Webhooks", "Cash on delivery"],
    },
    {
      title: {
        en: "Redis for cart, sessions and hot reads",
        bg: "Redis за количката и честите четения",
      },
      problem: {
        en: "Cart updates and product pages have to feel instant; going to the database for every read would drag.",
        bg: "Количката и продуктовите страници трябва да реагират веднага, а ходенето до базата за всяко четене бави.",
      },
      choice: {
        en: "Redis in front of PostgreSQL for the cart, sessions and frequently-read catalogue data.",
        bg: "Redis пред PostgreSQL за количката, сесиите и най-четените данни от каталога.",
      },
      why: {
        en: "Perceived speed converts; an instant cart and fast pages keep shoppers moving toward checkout.",
        bg: "Кеширането намалява времето за зареждане на каталога и подобрява работата на количката.",
      },
      impact: {
        en: "An instant-feeling cart and a catalogue that never stalls.",
        bg: "По-бързо зареждане на продуктовите страници и по-плавна работа с количката.",
      },
      tags: ["Redis", "PostgreSQL"],
    },
    {
      title: {
        en: "Own the design system with Shadcn UI",
        bg: "Собствена дизайн система с Shadcn UI",
      },
      problem: {
        en: "A boutique store needs a polished, on-brand look, built fast, by one person.",
        bg: "Проектът изискваше собствен дизайн и лесна възможност за персонализиране на компонентите.",
      },
      choice: {
        en: "Shadcn UI primitives copied into the codebase, styled into the store's own look.",
        bg: "Shadcn UI примитиви, копирани в проекта и стилизирани по бранда на магазина.",
      },
      why: {
        en: "Accessible components and full control of the markup, with no runtime lock-in, at solo speed.",
        bg: "Достъпни компоненти и пълен контрол върху markup-а, без runtime зависимости, което улесни разработката и поддръжката на интерфейса.",
      },
      impact: {
        en: "A polished, accessible storefront shipped solo and fast.",
        bg: "Излъскан и достъпен магазин, реализиран бързо от един разработчик.",
      },
      tags: ["Shadcn UI", "Tailwind", "React"],
    },
    {
      title: {
        en: "Type-safe orders and checkout",
        bg: "Типизирани поръчки и плащане",
      },
      problem: {
        en: "A wrong shape at checkout is a lost sale or a bad order landing with the customer.",
        bg: "Некоректни данни при обработката на поръчките могат да доведат до проблеми при плащането.",
      },
      choice: {
        en: "TypeScript across the cart, orders and Stripe integration, from client to API.",
        bg: "TypeScript през количката, поръчките и Stripe интеграцията, от клиента до API-то.",
      },
      why: {
        en: "The checkout path is where correctness matters most, type it so mistakes fail at build time.",
        bg: "Точно при плащането коректността е най-важна, типовете хващат грешките още при билд.",
      },
      impact: {
        en: "A checkout that behaves, order after order.",
        bg: "По-надеждна обработка на поръчките и по-малко грешки при разработката.",
      },
      tags: ["TypeScript", "Stripe"],
    },
    {
      title: {
        en: "Points as a running balance, not one-off coupons",
        bg: "Точки като баланс, а не еднократни купони",
      },
      problem: {
        en: "A points-and-referral program only works if customers trust the balance: every earn, spend and refund has to add up, with no drift.",
        bg: "Бонус точките трябваше да бъдат проследими и коректно изчислявани при всяко начисляване, използване или възстановяване.",
      },
      choice: {
        en: "Soko points as a ledgered balance on the customer account in PostgreSQL, convertible into real money off an order, with every movement (earned, spent, refunded) recorded as its own row.",
        bg: "Soko точките се пазят като баланс към клиентския акаунт в PostgreSQL, конвертируем в реални пари при поръчка, а всяко движение (спечелено, похарчено, рефъндирано) се записва като отделен ред.",
      },
      why: {
        en: "A ledger makes the balance auditable and safe to unwind on a refund, instead of trusting one mutable number.",
        bg: "Всяка промяна в баланса се записва отделно, което позволява лесно проследяване и коректно възстановяване при нужда.",
      },
      impact: {
        en: "Customers earn and spend points with confidence, refunds unwind cleanly, and the referral program feeds the same balance.",
        bg: "Балансът на точките остава консистентен дори при частични рефънди и повторни поръчки.",
      },
      tags: ["PostgreSQL", "Referral program"],
    },
  ],
  results: {
    body: [
      {
        en: "Soko Beauty - got a storefront that looks the part and sells: shoppers browse a curated Korean-skincare catalogue, fill a cart, and check out with card or cash on delivery, then track orders, refer friends and spend Soko points from their account. Behind it, an admin dashboard runs campaigns, products, email marketing, orders and refunds. Built solo, end to end, fast enough to keep carts and reliable enough to take real orders.",
        bg: "В резултат беше изграден цялостен e-commerce проект с клиентска част, административен панел и собствена система за управление на поръчките. Проектът беше разработен самостоятелно – от дизайна и архитектурата до плащанията и deployment-а. Фокусът беше върху производителността, SEO оптимизацията и надеждната обработка на реални поръчки и плащания.",
      },
    ],
    points: [
      {
        en: "Curated catalogue with fast, server-rendered product pages",
        bg: "Подбран каталог с бързи, server-rendered страници",
      },
      {
        en: "Cart to Stripe checkout, plus cash on delivery",
        bg: "От количката до Stripe плащане, плюс наложен платеж",
      },
      {
        en: "Customer account with order history, referrals, saved payment methods and refunds",
        bg: "Клиентски акаунт с история на поръчките, реферали, платежни методи и рефънди",
      },
      {
        en: "Soko points, earned and spent as real money off orders",
        bg: "Soko точки, трупани и харчени като реални пари от поръчките",
      },
      {
        en: "Admin dashboard for campaigns, products, email marketing, orders and refunds",
        bg: "Администраторски панел за кампании, продукти, имейл маркетинг, поръчки и рефънди",
      },
      {
        en: "Redis-cached reads for a store that feels instant",
        bg: "Redis кеш за магазин без забавяне",
      },
      {
        en: "Built solo: design through payments and deploy",
        bg: "Соло проект: от дизайна до плащанията и деплоя",
      },
    ],
  },
  stack: [
    {
      group: { en: "Frontend", bg: "Frontend" },
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "Shadcn UI"],
    },
    {
      group: { en: "Data & cache", bg: "Данни и кеш" },
      items: ["PostgreSQL", "Redis"],
    },
    {
      group: { en: "Payments", bg: "Плащания" },
      items: ["Stripe"],
    },
  ],
};

const registry: Record<string, CaseStudy> = {
  [myposPartnerPortal.slug]: myposPartnerPortal,
  [myposPaymentsSystem.slug]: myposPaymentsSystem,
  [sokoBeauty.slug]: sokoBeauty,
};

export const caseStudies = registry;

export const getCaseStudy = (slug: string | undefined): CaseStudy | undefined =>
  slug ? registry[slug] : undefined;

/** Ordered slugs, for prev/next navigation between studies. */
export const caseStudyOrder: string[] = [
  myposPartnerPortal.slug,
  myposPaymentsSystem.slug,
  sokoBeauty.slug,
];
