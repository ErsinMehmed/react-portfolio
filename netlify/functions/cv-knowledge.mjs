// Grounding context for the "Ask my CV" assistant. Plain, self-contained
// English text (no imports from src/, which pulls in React/JSX). Each block is
// tagged with a short, comma-free [Source: ...] label so the model can cite
// exactly where an answer came from and the labels survive comma-splitting on
// the client. Keep this in sync with src/Data.ts + the translations when the
// real CV changes.

export const cvContext = `
[Source: Profile]
Name: Ersin Hyusein (also written Ерсин Хюсеин in Bulgarian; git/GitHub handle ErsinMehmed). Role: Senior Full Stack Web Developer. Based in Varna, Bulgaria. Born 13 July 1999 (Bulgarian nationality). Over 6 years of programming experience, more than 4 of them professional. Core strength is web development across the full stack, with a strong backend focus. Currently a backend web developer at MyPOS Technologies (fintech/payments).

[Source: Contact]
Email: ersin99mehmed@gmail.com. Phone: +359 899 626273. Location: Varna, Bulgaria. A downloadable CV/resume (PDF) is available on the portfolio site in both English and Bulgarian. Best first contact is email or LinkedIn.

[Source: Online Profiles]
GitHub: https://github.com/ErsinMehmed (personal projects and open-source code live here).
LinkedIn: https://www.linkedin.com/in/ersin-hyusein-72a184241/.
Facebook: https://www.facebook.com/ersin.mehmed/. Instagram: https://www.instagram.com/ersogram.

[Source: Languages Spoken]
Bulgarian (native), English (professional working proficiency — this portfolio and its content are authored in both English and Bulgarian), and Turkish. Comfortable working in English-speaking / international teams.

[Source: Backend Developer at MyPOS]
Backend web developer at MyPOS Technologies (a fintech / payments company) in Varna, from July 2023 to present. Works on payment-related web systems and partner-facing platforms.

[Source: Full Stack Developer at James IT]
Full stack web developer at James IT Services (Varna) from October 2022 to June 2023. Built web platforms with Vue.js, Inertia.js, Laravel and MySQL.

[Source: IT Support at ENERGO PRO]
IT support and consultant at ENERGO PRO (Varna) from April 2022 to September 2022.

[Source: Manager at Briella]
Manager in a small company (Briella Ltd, Varna) from April 2021 to October 2021.

[Source: Currency Cashier at Edives]
Currency cashier at Edives Ltd (Golden Sands) from April 2019 to September 2019.

[Source: Tourism role]
Tourism role (Golden Sands) from April 2018 to September 2018.

[Source: Payments System (MyPOS)]
A web-based system for managing business processes related to payments, built at MyPOS. Two parts: a public website and a user account system. Users manage everything tied to payments received from their POS terminals, create online stores with products, issue invoices to their clients through an innovative interface, and track all incoming funds in their account. Tech: HTML, Twig, CSS, Bootstrap, JavaScript, TypeScript, jQuery, AJAX, React.js, Mobx, PHP, Symfony, MySQL, Redis, Jira, CI/CD, Claude Code. This is direct experience building payment systems.

[Source: MyPOS Partner Portal]
A partner portal for companies building payment solutions on MyPOS. Partners create and monitor integrations, manage connected merchants, online stores and POS devices across multiple countries, and explore analytics on transaction trends and multi-currency volumes, alongside a sandbox environment and API documentation. Tech: JavaScript, TypeScript, AJAX, React.js, Next.js, Shadcn UI, MongoDB, Redis, Jira, CI/CD. Direct experience with payments and financial transaction data.

[Source: Soko Beauty store]
A freelance e-commerce store for Soko Beauty, selling authentic Korean skincare and cosmetics. Customers browse curated products, manage a cart, and check out securely with Stripe, paying by card or cash on delivery. So this includes hands-on payment integration (Stripe). Tech: JavaScript, TypeScript, React.js, Next.js, Tailwind, Shadcn UI, MongoDB, Redis, Stripe.

[Source: Car Marketplace]
A web-based platform for buying and selling cars: users browse listings, post vehicles for sale, and conduct secure transactions through the platform. Built at James IT Services. Tech: HTML, CSS, Tailwind, JavaScript, TypeScript, AJAX, Vue.js, Inertia.js, PHP, Laravel, MySQL.

[Source: Property Valuation]
A marketplace where property owners request an appraisal and licensed appraisers bid for the job anonymously through a dynamic interface. Once an appraiser is selected and paid, the platform handles all further communication automatically, with the full history visible to both sides. Built multi-language from the ground up. Built at James IT Services. Tech: HTML, CSS, Tailwind, JavaScript, AJAX, Vue.js, Inertia.js, PHP, Laravel, MySQL.

[Source: Management System]
A personal web-based management system: place orders, monitor product availability, manage inventory, define per-product properties (images, prices, etc.), record sales, and track statistics (sales, turnovers, profits, expenses, inventory) via dashboards and diagrams. Tech: HTML, CSS, Tailwind, Framer Motion, React.js, Mobx, Next.js, MongoDB.

[Source: Job Portal]
A personal platform connecting employers with job seekers: browse listings filtered by location, salary and industry, apply with a CV and cover letter; employers post openings and review applications. Built-in messaging and a rating system. Tech: HTML, CSS, Tailwind, Framer Motion, React.js, Mobx, Next.js, MongoDB.

[Source: Appointment System]
A personal web app for scheduling and managing appointments and meetings, with filtering by various criteria. Tech: HTML, CSS, Bootstrap, React.js, Mobx, PHP, Symfony, MySQL.

[Source: Laravel Blog]
A personal blog with full CRUD for posts and user profiles. Tech: HTML, CSS, Bootstrap, PHP, Laravel, MySQL.

[Source: Workflow System]
A personal workflow system where users request a service, an admin processes the order and creates a task for a specific team, and team members access tasks from a mobile device (tablet). Tech: HTML, CSS, Tailwind, JavaScript, jQuery, AJAX, PHP, MySQL.

[Source: Price Comparison]
A personal platform for comparing prices and products across various sites, helping consumers choose when buying. Tech: HTML, CSS, JavaScript, jQuery, AJAX, PHP, MySQL.

[Source: Work Process Management]
A personal desktop system for work process management: add products and employees, view/edit them, export data. Tech: C#, SQL.

[Source: Pizzeria Management]
A personal system for managing a pizzeria's work process: add products by criteria, view and filter products, enter stock, report used products. Tech: Java, SQL, SQLite.

[Source: Frontend Skills]
HTML (6 years), CSS (6), Tailwind (4), Bootstrap (4), JavaScript (6), TypeScript (3), Vue.js (2), Inertia.js (2), React.js (4, primary library), Mobx (4, preferred state manager), jQuery (2), AJAX (5).

[Source: Backend Skills]
PHP (5, primary backend language), Symfony (3), Laravel (2), Next.js (3), Node.js (1). Builds REST APIs, CRUD logic, authentication, queues.

[Source: Database Skills]
MySQL (5), SQL (5), MongoDB (1), PostgreSQL (1). Schema design, queries, optimization, aggregation pipelines.

[Source: AI Skills]
Claude Code (primary agentic coding partner: custom AI agents, reusable AI skills, MCP servers, automated multi-step workflows) and OpenAI Codex (feature generation, refactoring/debugging, rapid prototyping). Uses AI to automate real developer workflows.

[Source: Delivery and Tooling]
GitHub (5 years), Jira (4), Testing (3: unit, integration, end-to-end), CI/CD (1). Works in Agile teams with sprint planning, standups and continuous delivery; cares about clean, testable code.

[Source: MyPOS AutoPilot AI Award]
First place among 24 company-wide submissions in MyPOS's internal AI innovation contest in 2026, for AutoPilot: an end-to-end automation of developers' day-to-day workflow, built with Claude Code.

[Source: CRAICT Award]
Recipient of the CRAICT Award at the University of Economics - Varna in 2023, honored as a Laureate for talent and achievements, from a fund supporting talented students.

[Source: Student Activity Award]
First place in 2022 in the "Review of student activities" at the Department of Informatics, with the price-comparison platform.

[Source: Courses and Publication]
Completed Microsoft Azure Cloud (fundamentals: Databricks, Data Factory, Key Vault, Containers) and Scaled Agile (SAFe methodology) courses. Part of IT Master Class 9 and 10. Author of a report in the "Student Scientific Conference" collection on "Development of web platforms" (UE Varna, 2022). Holds a Computer Literacy certificate (MS Office, internet).

[Source: Sport Achievements]
Sportsman of the year at the Varna sports school in 2017, five-time team of the year, 3rd place at a European handball championship, plus many individual medals from state finals.

[Source: Education]
Master's in Mobile and Web Technologies, University of Economics - Varna (Feb 2023 - Jun 2024). Bachelor's in Business Information Systems, University of Economics - Varna (Sep 2018 - Jun 2022). High School: Sport Coach, Sport School "Georgi Benkovski", Varna.

[Source: This Portfolio Site]
This portfolio website is itself a work sample built by Ersin. Stack: React 18 + TypeScript, Tailwind CSS, Vite, React Router, Framer Motion. It is fully bilingual (English/Bulgarian) with a custom i18n layer, has light and dark themes with no flash of the wrong theme, a command palette (Ctrl/Cmd+K) for keyboard navigation, subtle 3D tilt interactions on cards, route-aware skeleton loading screens, self-hosted fonts for performance, and this very "Ask about me" assistant (a Netlify serverless function calling an LLM, grounded in his CV, with the API key kept server-side). It is covered by unit/component tests (Vitest + React Testing Library) and a CI pipeline (GitHub Actions running typecheck, lint, tests, build and a Lighthouse budget). In short: the site demonstrates the senior front-end, TypeScript, accessibility, performance and AI-integration skills it describes.

[Source: Summary and Strengths]
Ersin is a senior full-stack web developer whose core strength is the backend (PHP with Symfony and Laravel, REST APIs, MySQL/MongoDB) paired with modern, polished React/TypeScript front-ends. He has real fintech/payments experience (MyPOS payment systems and partner portal, Stripe integration) and hands-on AI experience (Claude Code, OpenAI Codex, and a first-place internal AI-automation award). He leads technical and architectural decisions, mentors junior and mid-level developers, runs code reviews, and works in Agile teams with CI/CD, testing (unit/integration/e2e) and continuous delivery. He cares about clean, testable code, good architecture and attention to detail.

[Source: Common Questions]
Total experience: 6+ years programming, 4+ professional. Seniority: Senior. Strongest area: backend + full-stack web. Primary languages/frameworks: JavaScript/TypeScript, React (main), PHP (main backend), Symfony, Laravel, Next.js, Vue.js. Databases: MySQL and SQL (strongest), plus MongoDB and PostgreSQL. Payments/fintech: yes — direct experience at MyPOS and with Stripe. AI: yes — uses AI agents/tools daily and won an internal AI innovation contest. Leadership: yes — architecture decisions, mentoring, code reviews. Testing & delivery: unit/integration/e2e testing, CI/CD, Agile. Education: Master's + Bachelor's from the University of Economics - Varna. Location: Varna, Bulgaria; comfortable working in English.
`.trim();
