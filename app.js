// Application State
let state = {
    currentRole: "Frontend Developer",
    targetRole: "Fullstack Architect",
    skills: {}, // Loaded dynamically based on template
    activeView: "onboarding-view",
    quiz: {
        activeSkill: null,
        currentQuestionIndex: 0,
        score: 0,
        selectedOptionIndex: null,
        answers: [], // user selections
        questions: []
    },
    chatHistory: [
        { sender: 'bot', text: "Hello there! I'm Aria, your AI career mentor. I have analyzed your active profile gaps. How can I help you accelerate your journey or prepare for interviews? You can type any questions or click a suggestion on the left." }
    ]
};

// Career Templates Definition
const templates = {
    "fe-to-fs": {
        currentRole: "Frontend Developer",
        targetRole: "Fullstack Architect",
        description: "Transition from HTML/CSS/JS base into Node.js, System Design, Databases, DevOps, and Advanced State Management.",
        skills: {
            "JavaScript": { current: 3, target: 5, category: "Frontend" },
            "React/Vite": { current: 3, target: 5, category: "Frontend" },
            "Node.js/Express": { current: 1, target: 4, category: "Backend" },
            "Databases (SQL/NoSQL)": { current: 1, target: 4, category: "Backend" },
            "System Design": { current: 0, target: 4, category: "Architecture" },
            "DevOps & Cloud": { current: 1, target: 3, category: "DevOps" }
        }
    },
    "da-to-ds": {
        currentRole: "Data Analyst",
        targetRole: "Data Scientist",
        description: "Upgrade statistical profiling and dashboard creation into machine learning modelling, big data systems, and neural networks.",
        skills: {
            "SQL & Excel": { current: 4, target: 5, category: "Data" },
            "Python Programming": { current: 2, target: 5, category: "Programming" },
            "Statistical Analysis": { current: 3, target: 5, category: "Math" },
            "Machine Learning": { current: 1, target: 5, category: "ML" },
            "Deep Learning & NLP": { current: 0, target: 4, category: "ML" },
            "Big Data (Spark/Hadoop)": { current: 0, target: 3, category: "Data Engineering" }
        }
    },
    "pm-to-spm": {
        currentRole: "Product Manager",
        targetRole: "Director of Product",
        description: "Scale from execution and backlog management to portfolio strategy, P&L management, and organizational leadership.",
        skills: {
            "Product Execution": { current: 4, target: 5, category: "Product" },
            "Product Strategy": { current: 2, target: 5, category: "Strategy" },
            "Analytics & Growth": { current: 3, target: 5, category: "Analytics" },
            "Stakeholder Management": { current: 3, target: 5, category: "Leadership" },
            "Financial Modeling": { current: 1, target: 4, category: "Business" },
            "Technical Fundamentals": { current: 2, target: 4, category: "Technical" }
        }
    },
    "qa-to-sdet": {
        currentRole: "QA Engineer",
        targetRole: "SDET (Software Dev Engineer in Test)",
        description: "Transition from manual and semi-automated tests to building robust automation frameworks, CI/CD integrations, and performance suites.",
        skills: {
            "Manual Testing": { current: 5, target: 5, category: "Testing" },
            "Python/Java": { current: 1, target: 4, category: "Programming" },
            "Selenium/Playwright": { current: 2, target: 5, category: "Automation" },
            "CI/CD Pipelines": { current: 1, target: 4, category: "DevOps" },
            "API Testing": { current: 3, target: 5, category: "Automation" },
            "Performance Testing": { current: 0, target: 3, category: "Testing" }
        }
    },
    "des-to-ux": {
        currentRole: "UI Designer",
        targetRole: "UX Design Lead",
        description: "Shift focus from visual aesthetics and mockups to user research, cognitive psychology, product strategy, and accessibility standards.",
        skills: {
            "UI & Visual Design": { current: 4, target: 5, category: "Design" },
            "Figma Mastery": { current: 4, target: 5, category: "Design" },
            "User Research": { current: 2, target: 5, category: "UX Research" },
            "Information Architecture": { current: 2, target: 4, category: "UX Strategy" },
            "Interactive Prototyping": { current: 3, target: 5, category: "Design" },
            "Accessibility (WCAG)": { current: 1, target: 4, category: "UX Strategy" }
        }
    },
    "custom": {
        currentRole: "",
        targetRole: "",
        description: "Configure a custom path. Add your own skills and model gaps manually.",
        skills: {
            "Problem Solving": { current: 2, target: 4, category: "General" },
            "Communication": { current: 3, target: 5, category: "General" }
        }
    }
};

// Learning Resources and Recommendations Data mapping to skills
const learningPaths = {
    "JavaScript": {
        course: "Advanced JavaScript Concepts (Just JavaScript, You Don't Know JS)",
        book: "Eloquent JavaScript by Marijn Haverbeke",
        project: "Create an event-driven terminal CLI game engine or a custom reactive rendering script without any framework.",
        difficulty: "Medium",
        time: "12h"
    },
    "React/Vite": {
        course: "Epic React by Kent C. Dodds / React.dev Documentation",
        book: "React Key Concepts by Maximilian Schwarzmüller",
        project: "Create a glassmorphic personal dashboard including drag-and-drop widget customization and offline localStorage sync.",
        difficulty: "Medium",
        time: "15h"
    },
    "Node.js/Express": {
        course: "Node.js Developer Course (Andrew Mead) / Node.js Design Patterns",
        book: "Node.js Design Patterns by Mario Casciaro",
        project: "Build a scalable microservice REST API with JWT Auth, rate-limiter middleware, and structured logging using Winston.",
        difficulty: "Hard",
        time: "20h"
    },
    "Databases (SQL/NoSQL)": {
        course: "Intro to Relational Databases / MongoDB University Courses",
        book: "Database Internals by Alex Petrov",
        project: "Design a database schema for an e-commerce platform including complex query joins, indexing strategies, and ACID transaction tests.",
        difficulty: "Medium",
        time: "18h"
    },
    "System Design": {
        course: "ByteByteGo (Alex Xu) / Grokking the System Design Interview",
        book: "Designing Data-Intensive Applications by Martin Kleppmann",
        project: "Draft a system architecture design document (RFC) for a live video streaming service showing CDN, caching layers, and database sharding.",
        difficulty: "Hard",
        time: "35h"
    },
    "DevOps & Cloud": {
        course: "Docker & Kubernetes Complete Guide / AWS Certified Solutions Architect",
        book: "The DevOps Handbook by Gene Kim",
        project: "Dockerize a multi-container application and set up an automated deployment pipeline via GitHub Actions to a cloud provider.",
        difficulty: "Hard",
        time: "25h"
    },
    "SQL & Excel": {
        course: "SQL for Data Science / Advanced Excel Techniques",
        book: "SQL Queries for Mere Mortals by John L. Viescas",
        project: "Build an interactive financial data analysis workbook combined with window functions database queries extracting complex KPIs.",
        difficulty: "Easy",
        time: "8h"
    },
    "Python Programming": {
        course: "Python for Everybody / Fluent Python",
        book: "Fluent Python by Luciano Ramalho",
        project: "Write a high-performance concurrent web scraper using asyncio and HTTPX to extract structured datasets.",
        difficulty: "Medium",
        time: "14h"
    },
    "Statistical Analysis": {
        course: "Introduction to Mathematical Statistics / Bayesian Statistics",
        book: "Practical Statistics for Data Scientists by Peter Bruce",
        project: "Run a full A/B testing diagnostic on mock user conversion logs and draft a statistical significance report using SciPy.",
        difficulty: "Hard",
        time: "20h"
    },
    "Machine Learning": {
        course: "Machine Learning Zoomcamp / Coursera ML Specialization",
        book: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        project: "Train and tune an ensemble model (XGBoost) to predict customer churn, deploying it via a Flask/FastAPI endpoint.",
        difficulty: "Hard",
        time: "28h"
    },
    "Deep Learning & NLP": {
        course: "DeepLearning.AI Specialization / Hugging Face NLP Course",
        book: "Deep Learning with Python by François Chollet",
        project: "Fine-tune a BERT-based transformer model for multi-class sentiment classification on customer feedback data.",
        difficulty: "Hard",
        time: "35h"
    },
    "Big Data (Spark/Hadoop)": {
        course: "Apache Spark & PySpark Specialization",
        book: "Spark: The Definitive Guide by Bill Chambers",
        project: "Construct a PySpark batch processing pipeline on Databricks to clean and aggregate 10GB+ event stream data logs.",
        difficulty: "Hard",
        time: "22h"
    },
    "Product Execution": {
        course: "Product Management Boot Camp / Scrum Master Certification",
        book: "Inspired: How to Create Tech Products Customers Love by Marty Cagan",
        project: "Compose a complete PRD (Product Requirement Document) for a high-priority feature, detailing wireframes, metrics, and risks.",
        difficulty: "Medium",
        time: "10h"
    },
    "Product Strategy": {
        course: "Advanced Product Strategy (Reforge / Product Management)",
        book: "Escaping the Build Trap by Melissa Perri",
        project: "Draft a 12-month product roadmap aligning executive goals to key OKRs for a SaaS subscription expansion.",
        difficulty: "Hard",
        time: "18h"
    },
    "Analytics & Growth": {
        course: "Growth Series (Reforge) / Amplitude Analytics Academy",
        book: "Lean Analytics by Alistair Croll",
        project: "Implement custom user funnel analytics mapping drop-offs, identifying critical retention drivers and growth experiment loops.",
        difficulty: "Medium",
        time: "12h"
    },
    "Stakeholder Management": {
        course: "Leadership & Influencing Without Authority",
        book: "Crucial Conversations by Joseph Grenny",
        project: "Prepare an executive slide deck negotiating resource relocation for a cross-departmental product delay case study.",
        difficulty: "Medium",
        time: "8h"
    },
    "Financial Modeling": {
        course: "Corporate Finance Foundations / Product P&L Management",
        book: "Financial Modeling by Simon Benninga",
        project: "Develop a unit-economics model spreadsheet projecting ROI, CAC payback periods, and LTV metrics for a new pricing model.",
        difficulty: "Hard",
        time: "16h"
    },
    "Technical Fundamentals": {
        course: "CS50: Introduction to Computer Science / Tech for PMs",
        book: "System Design Interview by Alex Xu",
        project: "Write a high-level technical architectural breakdown of how APIs, webhooks, and caching communicate in microservices.",
        difficulty: "Medium",
        time: "15h"
    },
    "Manual Testing": {
        course: "Software Testing Foundations / ISTQB Certified Tester",
        book: "Foundations of Software Testing by Rex Black",
        project: "Write a detailed, structured test plan containing edge-case matrices, bug reports, and regression scenarios for a check-out flow.",
        difficulty: "Easy",
        time: "6h"
    },
    "Python/Java": {
        course: "Object Oriented Programming Basics",
        book: "Head First Java / Fluent Python",
        project: "Develop a modular command-line application using OOP design principles, unit testing all core classes.",
        difficulty: "Medium",
        time: "18h"
    },
    "Selenium/Playwright": {
        course: "Automated Web Testing with Playwright & JS",
        book: "Test Automation Patterns by Dorothy Graham",
        project: "Build a page-object-model (POM) automated E2E test suite in Playwright for an e-commerce store with actions reporting.",
        difficulty: "Hard",
        time: "24h"
    },
    "CI/CD Pipelines": {
        course: "Gitlab CI & GitHub Actions Bootcamp",
        book: "Continuous Delivery by Jez Humble",
        project: "Configure a CI pipeline that lint-checks, builds, runs test suites, and blocks pull requests upon automation failures.",
        difficulty: "Medium",
        time: "12h"
    },
    "API Testing": {
        course: "Testing REST APIs using Postman & Newman",
        book: "Rest API Design Rulebook by Mark Masse",
        project: "Construct a test collection in Postman incorporating scripting to assert response headers, schemas, and token chaining.",
        difficulty: "Medium",
        time: "10h"
    },
    "Performance Testing": {
        course: "Load Testing with k6 / Apache JMeter Basics",
        book: "Systems Performance by Brendan Gregg",
        project: "Write a k6 performance script simulating 500 concurrent users hitting endpoints, diagnosing database lock-up thresholds.",
        difficulty: "Hard",
        time: "14h"
    },
    "UI & Visual Design": {
        course: "Visual Design Foundations / Typography Rules",
        book: "The Design of Everyday Things by Don Norman",
        project: "Design a visually cohesive landing page style guide outlining color theory layouts, typography hierarchies, and component grids.",
        difficulty: "Medium",
        time: "10h"
    },
    "Figma Mastery": {
        course: "Advanced Figma (Auto Layout, Component Properties)",
        book: "Designing in Figma by dynamic tutorials",
        project: "Construct a responsive design system inside Figma utilizing dynamic auto-layout components, variants, and dark theme support.",
        difficulty: "Medium",
        time: "12h"
    },
    "User Research": {
        course: "User Research Methods / Qualitative UX Interviews",
        book: "Just Enough Research by Erika Hall",
        project: "Conduct user research interviews with 5 mock participants, mapping results into affinity diagrams and key user personas.",
        difficulty: "Medium",
        time: "14h"
    },
    "Information Architecture": {
        course: "Information Architecture & Card Sorting",
        book: "Information Architecture for the Web by Louis Rosenfeld",
        project: "Analyze and restructure the navigation taxonomy of an enterprise content site, executing a closed card sorting test.",
        difficulty: "Hard",
        time: "16h"
    },
    "Interactive Prototyping": {
        course: "Advanced Prototyping in Figma & Principle",
        book: "Microinteractions by Dan Saffer",
        project: "Build a high-fidelity interactive mobile checkout app prototype incorporating micro-animations and page logic conditions.",
        difficulty: "Medium",
        time: "12h"
    },
    "Accessibility (WCAG)": {
        course: "Introduction to Web Accessibility / WCAG 2.2 Standards",
        book: "A Web for Everyone by Sarah Horton",
        project: "Audit a web interface using screen readers and keyboard controls, modifying DOM structures to pass WCAG AAA standards.",
        difficulty: "Hard",
        time: "15h"
    },
    "Problem Solving": {
        course: "Data Structures & Algorithms Basics",
        book: "Cracking the Coding Interview by Gayle Laakmann McDowell",
        project: "Resolve 30 intermediate algorithm exercises focusing on dynamic arrays, binary search trees, and sorting optimizations.",
        difficulty: "Medium",
        time: "20h"
    },
    "Communication": {
        course: "Effective Presentation & Technical Writing Skills",
        book: "The Pyramid Principle by Barbara Minto",
        project: "Draft a clean, structured project update report summarizing core achievements, blockers, and timelines in a professional format.",
        difficulty: "Easy",
        time: "5h"
    }
};

// Quiz Database
const quizBank = {
    "JavaScript": [
        {
            question: "Which of the following correctly describes closures in JavaScript?",
            options: [
                "A closure is a built-in method to close browser tabs dynamically.",
                "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
                "A closure refers only to async functions scheduled by setTimeout.",
                "A closure is a design pattern that prevents variables from being accessed outside class scopes."
            ],
            answer: 1
        },
        {
            question: "What is the primary difference between double equals (==) and triple equals (===) in JS?",
            options: [
                "== checks for memory reference identity, while === checks value.",
                "== performs implicit type coercion before comparison, whereas === requires both type and value equivalence.",
                "== works only on numbers, while === is used exclusively for strings and objects.",
                "There is no functional difference; === was introduced in ES6 for aesthetics."
            ],
            answer: 1
        },
        {
            question: "What is the output of 'console.log(typeof NaN)'?",
            options: [
                "\"nan\"",
                "\"null\"",
                "\"number\"",
                "\"undefined\""
            ],
            answer: 2
        },
        {
            question: "How does the 'this' keyword behave in arrow functions?",
            options: [
                "It references the element that triggered the DOM event.",
                "It creates a new global scope context for execution.",
                "It retains the 'this' value of the enclosing lexical context; arrow functions do not have their own 'this'.",
                "It is always undefined unless explicitly bound using .bind() or .call()."
            ],
            answer: 2
        },
        {
            question: "What is the purpose of Promise.all() in asynchronous JavaScript?",
            options: [
                "It triggers multiple promises sequentially, waiting for each to finish before executing the next.",
                "It runs multiple promises in parallel and resolves when all resolve, or rejects immediately if any reject.",
                "It executes promises only if the client has active internet connectivity.",
                "It compiles multiple promises into a single synchronous callback function."
            ],
            answer: 1
        }
    ],
    "Node.js/Express": [
        {
            question: "What is the Node.js Event Loop?",
            options: [
                "A multi-threaded engine that processes intensive math operations on separate cores.",
                "A mechanism that allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel when possible.",
                "A recursive loop designed to check client websocket heartbeats continuously.",
                "A hardware utility module built into processors to speed up JS execution."
            ],
            answer: 1
        },
        {
            question: "What does the Express middleware signature (req, res, next) represent?",
            options: [
                "Parameters for connecting SQL databases: requests, result sets, next query.",
                "Access objects to the Request, Response, and the callback pointer to trigger the next middleware function in line.",
                "Three distinct servers: Request router, Response compiler, Next gateway.",
                "Legacy syntax from jQuery adapted for server-side Express apps."
            ],
            answer: 1
        },
        {
            question: "Which of the following describes why Node.js is considered single-threaded?",
            options: [
                "It can only run on machines with single-core processors.",
                "Its main execution thread runs Javascript code, processing events in a loop, though libuv executes I/O operations asynchronously on helper threads.",
                "It translates all JS code into single lines of bytecode before starting.",
                "It does not support importing more than one file module at a time."
            ],
            answer: 1
        },
        {
            question: "In Node.js, what is the core difference between require() and import?",
            options: [
                "require() loads code asynchronously, while import loads synchronously.",
                "require() is the CommonJS syntax (evaluated at runtime), while import is ES Modules syntax (statically analyzed at compile time).",
                "require() can only load JSON data, while import loads JS scripts.",
                "There is no difference; they are interchangeable aliases."
            ],
            answer: 1
        },
        {
            question: "What is the utility of cluster module in Node.js?",
            options: [
                "To join databases together into high-availability clusters.",
                "To spawn child processes (worker threads) that share the same server ports, exploiting multi-core systems.",
                "To group static asset files into automated bundles.",
                "To combine client micro-frontends into a unified dashboard."
            ],
            answer: 1
        }
    ],
    "Databases (SQL/NoSQL)": [
        {
            question: "What is a primary benefit of using database indexes?",
            options: [
                "They compress data structures, reducing storage disk costs.",
                "They dramatically speed up data retrieval (SELECT queries) at the cost of slower insertions (INSERT/UPDATE).",
                "They automatically encrypt database tables for secure transfer.",
                "They convert relational SQL schemas into flexible JSON structures automatically."
            ],
            answer: 1
        },
        {
            question: "What does the ACID acronym stand for in database management systems?",
            options: [
                "Authentication, Connection, Integrity, Distribution",
                "Atomicity, Consistency, Isolation, Durability",
                "Algorithm, Calculation, Indexed, Denormalized",
                "Asymmetric, Clustered, Integrated, Dynamic"
            ],
            answer: 1
        },
        {
            question: "What represents a fundamental difference between SQL and NoSQL databases?",
            options: [
                "SQL databases are stored in RAM, NoSQL databases are always on disk.",
                "SQL databases use structured, relational schemas with predefined schemas; NoSQL databases are non-relational with dynamic schemas (document, key-value, graph).",
                "SQL databases only run on Windows, while NoSQL is strictly for Unix/Linux systems.",
                "SQL databases can only run single queries, while NoSQL runs unlimited parallel requests."
            ],
            answer: 1
        },
        {
            question: "What is the purpose of a FOREIGN KEY constraint in SQL?",
            options: [
                "To permit database access only to external IPs or foreign servers.",
                "To link records in one table to records in another, maintaining referential integrity.",
                "To create a copy of the database in a foreign datacenter zone.",
                "To automatically translate table headers to multiple languages."
            ],
            answer: 1
        },
        {
            question: "What does a JOIN operation do in SQL?",
            options: [
                "It combines rows from two or more tables based on a related column between them.",
                "It concatenates multiple string inputs together within a single row cell.",
                "It allows multiple programmers to connect to the database command line simultaneously.",
                "It triggers security rules to merge overlapping roles."
            ],
            answer: 0
        }
    ],
    "System Design": [
        {
            question: "What is the difference between horizontal and vertical scaling?",
            options: [
                "Horizontal scaling updates CSS code; vertical scaling changes server cabinet heights.",
                "Horizontal scaling means adding more machines (nodes) to the resource pool; vertical scaling means adding more power (CPU, RAM) to an existing machine.",
                "Horizontal scaling handles images; vertical scaling handles database queries.",
                "Horizontal scaling has no cost, whereas vertical scaling is always free."
            ],
            answer: 1
        },
        {
            question: "What is a Load Balancer's role in system architecture?",
            options: [
                "It measures electrical currents in hosting servers to prevent fires.",
                "It distributes incoming network traffic across a group of backend servers to prevent overload and ensure high availability.",
                "It balances data weight ratios between hard drives.",
                "It minifies code assets automatically before sending them to users."
            ],
            answer: 1
        },
        {
            question: "What is the CAP Theorem in distributed systems?",
            options: [
                "Caching, Authorization, and Privacy are the three pillars of SaaS.",
                "A distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance.",
                "Computing Power, RAM Capacity, and Port Speeds scale in exact ratios.",
                "Clients, Application Servers, and Protocols must agree on serialization."
            ],
            answer: 1
        },
        {
            question: "What is CDN (Content Delivery Network) primarily used for?",
            options: [
                "To compile source code into machine code closer to the database.",
                "To serve cached static assets (images, stylesheets, videos) from servers located physically closer to the end user, reducing latency.",
                "To scan server repositories for malware.",
                "To manage payment integrations and credit card transaction loops."
            ],
            answer: 1
        },
        {
            question: "What is the purpose of database replication?",
            options: [
                "To make exact copies of code files to prevent losing source files.",
                "To copy data across multiple database servers to improve data availability, query load balancing, and disaster recovery.",
                "To convert Relational tables into Graph queries dynamically.",
                "To simulate database load tests during offline debug audits."
            ],
            answer: 1
        }
    ]
};

// Default fallback quiz questions for unconfigured skills
const defaultQuizQuestions = [
    {
        question: "What is the primary objective of incorporating testing/evaluation methodologies in engineering pipelines?",
        options: [
            "To slow down deployments so developers can take breaks.",
            "To validate functional correctness, ensure quality, and catch regressions before production delivery.",
            "To replace human engineers with automated shell scripts entirely.",
            "To compile development code structures into lighter formats."
        ],
        answer: 1
    },
    {
        question: "In technical projects, what does 'refactoring' mean?",
        options: [
            "Deleting all files and writing them from scratch.",
            "Restructuring existing code without changing its external behavior to improve readability, complexity, or maintainability.",
            "Moving hosting deployment from AWS into local servers.",
            "Changing user requirements mid-project to match existing code structures."
        ],
        answer: 1
    },
    {
        question: "What does 'API' stand for?",
        options: [
            "Application Programming Interface",
            "Alternative Private Internet",
            "Automated Program Integrator",
            "Applicable Protocol Index"
        ],
        answer: 0
    },
    {
        question: "Why is version control (like Git) crucial in development?",
        options: [
            "It automatically writes documentation for all files.",
            "It tracks changes, enables parallel collaboration, and allows reverting codebases to historical states easily.",
            "It compiles code into binary structures for release.",
            "It locks code files so only one user can read them at a time."
        ],
        answer: 1
    },
    {
        question: "What is the best way to handle secret keys or credentials in a project?",
        options: [
            "Hardcode them directly into public repository code files.",
            "Store them in environment variables loaded at runtime, excluding them from source control (e.g., .gitignore).",
            "Save them in text documents stored on the desktop.",
            "Send them in emails to the entire team."
        ],
        answer: 1
    }
];

// List of standard keywords for JD analysis
const jdKeywords = [
    { skill: "JavaScript", terms: ["javascript", "js", "es6", "frontend developer", "web development"] },
    { skill: "React/Vite", terms: ["react", "react.js", "next.js", "vite", "redux", "state management", "vue", "angular"] },
    { skill: "Node.js/Express", terms: ["node", "node.js", "express", "backend", "express.js", "npm", "runtime"] },
    { skill: "Databases (SQL/NoSQL)", terms: ["database", "sql", "postgresql", "mysql", "mongodb", "nosql", "query", "schema", "redis"] },
    { skill: "System Design", terms: ["system design", "architecture", "microservices", "scalable", "load balance", "sharding", "distributed", "caching"] },
    { skill: "DevOps & Cloud", terms: ["devops", "docker", "kubernetes", "aws", "cloud", "ci/cd", "deployment", "github actions", "pipeline"] },
    { skill: "SQL & Excel", terms: ["excel", "sql", "queries", "spreadsheets", "pivot", "dashboards"] },
    { skill: "Python Programming", terms: ["python", "scripting", "numpy", "pandas", "fastapi"] },
    { skill: "Statistical Analysis", terms: ["statistics", "probability", "hypothesis", "a/b testing", "data modeling"] },
    { skill: "Machine Learning", terms: ["machine learning", "scikit-learn", "xgboost", "classification", "regression", "ml models"] },
    { skill: "Deep Learning & NLP", terms: ["deep learning", "nlp", "transformers", "pytorch", "tensorflow", "bert", "gpt", "neural networks"] },
    { skill: "Big Data (Spark/Hadoop)", terms: ["spark", "pyspark", "hadoop", "big data", "databricks"] },
    { skill: "Product Execution", terms: ["prd", "scrum", "agile", "product roadmap", "backlog", "user stories"] },
    { skill: "Product Strategy", terms: ["product strategy", "vision", "portfolio", "growth strategy", "competitor analysis"] },
    { skill: "Analytics & Growth", terms: ["analytics", "amplitude", "mixpanel", "retention", "conversion", "metrics", "kpi"] },
    { skill: "Stakeholder Management", terms: ["stakeholder", "cross-functional", "alignment", "communication", "negotiate", "leadership"] },
    { skill: "Financial Modeling", terms: ["financial model", "cac", "ltv", "p&l", "budgeting", "pricing model"] },
    { skill: "Technical Fundamentals", terms: ["technical product", "apis", "software concepts", "sdlc"] },
    { skill: "Manual Testing", terms: ["manual test", "test cases", "qa", "bug report", "regression", "defect"] },
    { skill: "Python/Java", terms: ["python", "java", "oop", "object oriented", "programming"] },
    { skill: "Selenium/Playwright", terms: ["selenium", "playwright", "test automation", "e2e testing", "cypress"] },
    { skill: "CI/CD Pipelines", terms: ["jenkins", "gitlab ci", "github actions", "ci/cd", "automation pipeline"] },
    { skill: "API Testing", terms: ["postman", "api testing", "newman", "rest client", "rest api"] },
    { skill: "Performance Testing", terms: ["jmeter", "k6", "load testing", "performance analysis", "stress test"] },
    { skill: "UI & Visual Design", terms: ["ui design", "visual design", "color theory", "typography", "layout", "wireframes"] },
    { skill: "Figma Mastery", terms: ["figma", "auto layout", "design system", "components", "prototyping"] },
    { skill: "User Research", terms: ["user research", "interviews", "personas", "surveys", "usability test"] },
    { skill: "Information Architecture", terms: ["information architecture", "card sorting", "sitemaps", "navigation"] },
    { skill: "Interactive Prototyping", terms: ["prototype", "high-fidelity", "interactive design", "microinteractions"] },
    { skill: "Accessibility (WCAG)", terms: ["accessibility", "wcag", "screen reader", "aria", "a11y"] }
];

// Initialize Application
let chartMode = 'radar'; // 'radar' or 'bar'

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupOnboarding();
    setupDashboard();
    setupJDMatcher();
    setupQuiz();
    setupChat();
    setupChartToggle();
    
    // Load initial default template (FE to FS)
    loadTemplate("fe-to-fs");
    
    // Start particle animation
    initParticles();
    
    // Auto-navigate to dashboard on first load after brief delay
    setTimeout(() => {
        switchView('dashboard-view');
    }, 200);
});

// Navigation logic
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-links li");
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = item.getAttribute("data-target");
            
            // Allow navigation only if profile is initialized or we are navigating to onboarding
            if (state.activeView === "onboarding-view" && targetView !== "onboarding-view") {
                // If initializing with empty fields, force onboarding input or load defaults
                initializeFromOnboarding();
            }
            
            switchView(targetView);
        });
    });

    document.getElementById("nav-logo").addEventListener("click", () => {
        switchView("onboarding-view");
    });

    document.getElementById("reset-profile-btn").addEventListener("click", () => {
        if (confirm("Reset current profile configurations? This will wipe your skill changes and custom skills.")) {
            switchView("onboarding-view");
            document.getElementById("input-current-role").value = "";
            document.getElementById("input-target-role").value = "";
            loadTemplate("fe-to-fs");
        }
    });
}

function switchView(viewId) {
    // UI states update
    document.querySelectorAll(".app-view").forEach(view => {
        view.classList.remove("active");
    });
    
    const targetEl = document.getElementById(viewId);
    if (targetEl) {
        targetEl.classList.add("active");
        state.activeView = viewId;
    }

    // Update nav active classes
    document.querySelectorAll(".nav-links li").forEach(item => {
        if (item.getAttribute("data-target") === viewId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Handle view-specific renders
    if (viewId === "dashboard-view") {
        renderDashboard();
    } else if (viewId === "quiz-view") {
        renderQuizSelector();
    }
}

// Onboarding and role templates logic
function setupOnboarding() {
    const templateButtons = document.querySelectorAll(".template-btn");
    templateButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            templateButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const pathKey = btn.getAttribute("data-path");
            loadTemplate(pathKey);
        });
    });

    document.getElementById("btn-start-analysis").addEventListener("click", () => {
        initializeFromOnboarding();
    });
}

function loadTemplate(pathKey) {
    const template = templates[pathKey];
    if (!template) return;

    state.currentRole = template.currentRole;
    state.targetRole = template.targetRole;
    
    // Fill textboxes
    document.getElementById("input-current-role").value = template.currentRole;
    document.getElementById("input-target-role").value = template.targetRole;
    
    // Set preview description
    const previewDesc = document.getElementById("path-preview-desc");
    if (previewDesc) {
        previewDesc.textContent = template.description;
    }

    // Set skills copy (deep copy)
    state.skills = JSON.parse(JSON.stringify(template.skills));
}

function initializeFromOnboarding() {
    const currInput = document.getElementById("input-current-role").value.trim();
    const targInput = document.getElementById("input-target-role").value.trim();

    state.currentRole = currInput || "Developer";
    state.targetRole = targInput || "Architect";

    // If custom path is chosen or text inputs differ from templates, keep current skills setup
    // Else, templates load automatic profiles
    switchView("dashboard-view");
}

// Dashboard rendering and Skill editing
function setupDashboard() {
    document.getElementById("btn-reconfigure").addEventListener("click", () => {
        switchView("onboarding-view");
    });

    // Add Custom Skill
    document.getElementById("btn-add-skill").addEventListener("click", () => {
        const input = document.getElementById("input-add-skill");
        const skillName = input.value.trim();
        if (!skillName) {
            showToast('Please enter a skill name.', 'error');
            return;
        }
        if (state.skills[skillName]) {
            showToast(`"${skillName}" is already in your profile.`, 'info');
            return;
        }
        state.skills[skillName] = { current: 1, target: 4, category: "Custom" };
        input.value = "";
        renderDashboard();
        showToast(`"${skillName}" added to your skill profile!`, 'success');
        appendBotMessage(`I've added your custom skill <strong>"${skillName}"</strong> to your roadmap. You can adjust your proficiency in the modeler!`);
    });

    // Allow press enter to add skill
    document.getElementById("input-add-skill").addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            document.getElementById("btn-add-skill").click();
        }
    });
}

function setupChartToggle() {
    document.getElementById('btn-chart-radar').addEventListener('click', () => {
        chartMode = 'radar';
        document.getElementById('btn-chart-radar').classList.add('active');
        document.getElementById('btn-chart-bar').classList.remove('active');
        renderChart();
    });
    document.getElementById('btn-chart-bar').addEventListener('click', () => {
        chartMode = 'bar';
        document.getElementById('btn-chart-bar').classList.add('active');
        document.getElementById('btn-chart-radar').classList.remove('active');
        renderChart();
    });
}

function renderChart() {
    if (chartMode === 'radar') {
        drawRadarChart();
    } else {
        drawBarChart();
    }
}

function renderDashboard() {
    // 1. Titles
    document.getElementById("dashboard-roles-title").innerHTML = `${state.currentRole} <span style="font-size:1.3rem; color:var(--text-muted); padding:0 0.5rem;">➔</span> ${state.targetRole}`;

    // 2. Modeler Sliders List with star ratings and delete button
    const sliderContainer = document.getElementById("skills-slider-list");
    sliderContainer.innerHTML = "";

    const skillKeys = Object.keys(state.skills);
    skillKeys.forEach(key => {
        const skillObj = state.skills[key];
        const item = document.createElement("div");
        item.className = "skill-edit-item";
        item.style.gridTemplateColumns = '1fr auto auto';
        
        // Build star display
        const starsHtml = [...Array(5)].map((_, i) =>
            `<span class="star ${i < skillObj.current ? 'filled' : 'empty'}">★</span>`
        ).join('');
        
        item.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${key}</span>
                <div class="star-display">${starsHtml}</div>
                <div class="skill-level-badges" style="margin-top:0.2rem;">
                    <span class="badge">Curr: ${skillObj.current}/5</span>
                    <span class="badge badge-target">Targ: ${skillObj.target}/5</span>
                </div>
            </div>
            <div class="skill-slider-container">
                <input type="range" class="range-slider" min="0" max="5" step="1" value="${skillObj.current}" data-skill="${key}">
                <span class="level-value" id="val-${key.replace(/[^a-zA-Z0-9]/g, '-')}">${skillObj.current}</span>
            </div>
            <button class="skill-delete-btn" data-skill-del="${key}" title="Remove skill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14H6L5 6"></path>
                    <path d="M10 11v6M14 11v6"></path>
                </svg>
            </button>
        `;
        
        sliderContainer.appendChild(item);
    });

    // Attach slider event listeners
    document.querySelectorAll(".range-slider").forEach(slider => {
        slider.addEventListener("input", () => {
            const skillName = slider.getAttribute("data-skill");
            const val = parseInt(slider.value);
            state.skills[skillName].current = val;
            
            const labelEl = document.getElementById(`val-${skillName.replace(/[^a-zA-Z0-9]/g, '-')}`);
            if (labelEl) labelEl.textContent = val;

            // Update stars live
            const starEls = slider.closest('.skill-edit-item').querySelectorAll('.star');
            starEls.forEach((s, i) => {
                s.classList.toggle('filled', i < val);
                s.classList.toggle('empty', i >= val);
            });

            recalculateMetrics();
            renderChart();
            populateGapsGrid();
        });
    });

    // Attach delete button listeners
    document.querySelectorAll(".skill-delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const skillName = btn.getAttribute("data-skill-del");
            delete state.skills[skillName];
            renderDashboard();
            showToast(`"${skillName}" removed from your profile.`, 'info');
        });
    });

    // 3. Render Dashboard Graphics & Lists
    recalculateMetrics();
    renderChart();
    populateGapsGrid();
    renderRoadmap();
    updateStatBar();
}

function updateStatBar() {
    const keys = Object.keys(state.skills);
    const critical = keys.filter(k => (state.skills[k].target - state.skills[k].current) >= 2).length;
    const matched = keys.filter(k => state.skills[k].current >= state.skills[k].target).length;
    
    // Estimated hours from learning paths
    let totalHours = 0;
    keys.forEach(k => {
        const gap = state.skills[k].target - state.skills[k].current;
        if (gap > 0 && learningPaths[k]) {
            const hrs = parseInt(learningPaths[k].time) || 10;
            totalHours += hrs;
        }
    });

    document.getElementById('stat-total-skills').textContent = keys.length;
    document.getElementById('stat-critical-count').textContent = critical;
    document.getElementById('stat-matched-count').textContent = matched;
    document.getElementById('stat-est-hours').textContent = totalHours + 'h';
}

function recalculateMetrics() {
    const keys = Object.keys(state.skills);
    if (keys.length === 0) {
        updateGauge(0);
        return;
    }

    let totalCurrent = 0;
    let totalTarget = 0;

    keys.forEach(k => {
        totalCurrent += state.skills[k].current;
        totalTarget += state.skills[k].target;
    });

    // Calculate overall percent match
    let matchPct = Math.round((totalCurrent / totalTarget) * 100);
    if (matchPct > 100) matchPct = 100;
    if (isNaN(matchPct)) matchPct = 0;

    updateGauge(matchPct);

    // Dynamic verdict text based on Match Pct
    const verdictEl = document.getElementById("dashboard-match-verdict");
    if (matchPct < 40) {
        verdictEl.textContent = "Significant gaps exist. Start with the 'Easy' level project tasks on your timeline roadmap.";
    } else if (matchPct < 70) {
        verdictEl.textContent = "You're making solid progress! Close critical backend or strategy gaps to pass 75%.";
    } else if (matchPct < 90) {
        verdictEl.textContent = "Excellent alignment! Take some targeted skill assessments to prove your senior mastery.";
    } else {
        verdictEl.textContent = "Outstanding match! You are fully prepared to apply for your target role.";
    }

    // Keep stat bar in sync on every recalculation
    if (document.getElementById('stat-total-skills')) updateStatBar();
}

function updateGauge(pct) {
    const circle = document.getElementById("dashboard-gauge-fill");
    const text = document.getElementById("dashboard-match-percentage");
    
    // Circle circumference is 2 * PI * r = 2 * 3.14159 * 70 = 439.8
    const circumference = 440;
    const offset = circumference - (pct / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    text.textContent = `${pct}%`;
}

function populateGapsGrid() {
    const criticalList = document.getElementById("list-critical-gaps");
    const moderateList = document.getElementById("list-moderate-gaps");
    const matchedList = document.getElementById("list-matched-skills");

    criticalList.innerHTML = "";
    moderateList.innerHTML = "";
    matchedList.innerHTML = "";

    Object.keys(state.skills).forEach(key => {
        const skill = state.skills[key];
        const gap = skill.target - skill.current;

        const li = document.createElement("li");
        li.className = "gap-item";
        
        if (gap >= 2) {
            li.innerHTML = `
                <span>${key}</span>
                <span class="gap-value critical">Gap: -${gap}</span>
            `;
            criticalList.appendChild(li);
        } else if (gap === 1) {
            li.innerHTML = `
                <span>${key}</span>
                <span class="gap-value moderate">Gap: -1</span>
            `;
            moderateList.appendChild(li);
        } else {
            li.innerHTML = `
                <span>${key}</span>
                <span class="gap-value matched">Aligned</span>
            `;
            matchedList.appendChild(li);
        }
    });

    // Empty list placeholders
    if (criticalList.children.length === 0) {
        criticalList.innerHTML = `<li class="gap-item" style="color:var(--text-muted); font-style:italic;">No critical gaps identified. Awesome!</li>`;
    }
    if (moderateList.children.length === 0) {
        moderateList.innerHTML = `<li class="gap-item" style="color:var(--text-muted); font-style:italic;">No minor gaps detected.</li>`;
    }
    if (matchedList.children.length === 0) {
        matchedList.innerHTML = `<li class="gap-item" style="color:var(--text-muted); font-style:italic;">No aligned skills yet. Keep studying.</li>`;
    }
}

// Draw dynamic SVG Radar Chart
function drawRadarChart() {
    const wrapper = document.getElementById("chart-wrapper");
    wrapper.innerHTML = "";

    const skills = Object.keys(state.skills);
    const count = skills.length;
    
    if (count < 3) {
        wrapper.innerHTML = `<p style="color:var(--text-muted); font-style:italic; text-align:center;">Add at least 3 skills to display the radar chart representation.</p>`;
        return;
    }

    const size = 380;
    const center = size / 2;
    const rMax = 125; // outer ring radius
    const levels = 5; // 1 to 5 grid stars

    // Create SVG Element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.setAttribute("class", "chart-container-svg");

    // Defs for gradients and shadow filters
    svg.innerHTML = `
        <defs>
            <filter id="glow-primary" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
    `;

    // 1. Draw Grid Rings
    for (let l = 1; l <= levels; l++) {
        const r = (rMax / levels) * l;
        const ringPoints = [];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            ringPoints.push(`${x},${y}`);
        }
        
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", ringPoints.join(" "));
        polygon.setAttribute("class", "chart-grid-ring");
        svg.appendChild(polygon);
    }

    // 2. Draw Spokes and Axis Labels
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
        
        // Spoke line
        const xOuter = center + rMax * Math.cos(angle);
        const yOuter = center + rMax * Math.sin(angle);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", center);
        line.setAttribute("y1", center);
        line.setAttribute("x2", xOuter);
        line.setAttribute("y2", yOuter);
        line.setAttribute("class", "chart-axis");
        svg.appendChild(line);

        // Labels
        const labelRadius = rMax + 24;
        const xLabel = center + labelRadius * Math.cos(angle);
        const yLabel = center + labelRadius * Math.sin(angle);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", xLabel);
        text.setAttribute("y", yLabel + 4); // vertically center text slightly
        text.setAttribute("class", "chart-label-text");
        
        // Adjust alignment depending on horizontal positioning
        if (Math.cos(angle) > 0.1) {
            text.setAttribute("text-anchor", "start");
        } else if (Math.cos(angle) < -0.1) {
            text.setAttribute("text-anchor", "end");
        } else {
            text.setAttribute("text-anchor", "middle");
        }
        
        // Truncate name if too long
        let skillName = skills[i];
        if (skillName.length > 15) skillName = skillName.substring(0, 13) + "...";
        text.textContent = skillName;
        svg.appendChild(text);
    }

    // 3. Draw Target Levels Area
    const targetPoints = [];
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
        const skill = state.skills[skills[i]];
        const val = skill.target;
        const r = (rMax / levels) * val;
        
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        targetPoints.push(`${x},${y}`);
    }
    const targetPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    targetPoly.setAttribute("points", targetPoints.join(" "));
    targetPoly.setAttribute("class", "chart-poly-target");
    svg.appendChild(targetPoly);

    // 4. Draw Current Levels Area
    const currentPoints = [];
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
        const skill = state.skills[skills[i]];
        const val = skill.current;
        const r = (rMax / levels) * val;
        
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        currentPoints.push(`${x},${y}`);
    }
    const currentPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    currentPoly.setAttribute("points", currentPoints.join(" "));
    currentPoly.setAttribute("class", "chart-poly-current");
    svg.appendChild(currentPoly);

    // 5. Draw Individual Dots for accuracy
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
        const skill = state.skills[skills[i]];
        
        // Target Dot (Teal)
        const rT = (rMax / levels) * skill.target;
        const xT = center + rT * Math.cos(angle);
        const yT = center + rT * Math.sin(angle);
        const circleT = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleT.setAttribute("cx", xT);
        circleT.setAttribute("cy", yT);
        circleT.setAttribute("r", 3.5);
        circleT.setAttribute("class", "chart-point-targ");
        svg.appendChild(circleT);

        // Current Dot (Violet)
        const rC = (rMax / levels) * skill.current;
        const xC = center + rC * Math.cos(angle);
        const yC = center + rC * Math.sin(angle);
        const circleC = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleC.setAttribute("cx", xC);
        circleC.setAttribute("cy", yC);
        circleC.setAttribute("r", 4.5);
        circleC.setAttribute("class", "chart-point-curr");
        svg.appendChild(circleC);
    }

    wrapper.appendChild(svg);
}

// Draw Bar Chart as alternative
function drawBarChart() {
    const wrapper = document.getElementById("chart-wrapper");
    wrapper.innerHTML = "";
    wrapper.style.alignItems = 'stretch';
    wrapper.style.padding = '0.5rem 0';

    const skills = Object.keys(state.skills);
    if (skills.length === 0) {
        wrapper.innerHTML = `<p style="color:var(--text-muted); text-align:center;">No skills found.</p>`;
        return;
    }

    const container = document.createElement('div');
    container.className = 'bar-chart-container';
    container.style.width = '100%';

    skills.forEach(skillName => {
        const skill = state.skills[skillName];
        const currentPct = (skill.current / 5) * 100;
        const targetPct = (skill.target / 5) * 100;

        const row = document.createElement('div');
        row.className = 'bar-chart-row';

        const label = document.createElement('div');
        label.className = 'bar-chart-label';
        label.textContent = skillName.length > 18 ? skillName.substring(0, 16) + '…' : skillName;
        label.title = skillName;

        const track = document.createElement('div');
        track.className = 'bar-track';

        const fillTarget = document.createElement('div');
        fillTarget.className = 'bar-fill-target';
        fillTarget.style.width = `${targetPct}%`;

        const fillCurrent = document.createElement('div');
        fillCurrent.className = 'bar-fill-current';
        fillCurrent.style.width = `${currentPct}%`;

        track.appendChild(fillTarget);
        track.appendChild(fillCurrent);

        const values = document.createElement('div');
        values.className = 'bar-chart-values';
        values.innerHTML = `<span style="color:var(--color-primary);">${skill.current}</span><span style="color:rgba(255,255,255,0.2);"> / </span><span style="color:var(--color-secondary);">${skill.target}</span>`;

        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(values);
        container.appendChild(row);
    });

    wrapper.appendChild(container);
    wrapper.style.minHeight = 'auto';
}

// Generate Personalized Pathway Tasks
function renderRoadmap() {
    const grid = document.getElementById("roadmap-items-grid");
    grid.innerHTML = "";

    const skills = Object.keys(state.skills);
    let cardsRendered = 0;

    skills.forEach(skillName => {
        const skill = state.skills[skillName];
        const gap = skill.target - skill.current;

        // Render cards only for skills containing gaps
        if (gap > 0) {
            const data = learningPaths[skillName] || {
                course: `Search online tutorial courses related to ${skillName}`,
                book: `Read top recommended literature on ${skillName}`,
                project: `Build a starter system utilizing ${skillName} capabilities.`,
                difficulty: "Medium",
                time: "10h"
            };

            const card = document.createElement("div");
            card.className = "glass-panel roadmap-card";
            
            // Highlight styling if critical gap
            if (gap >= 2) {
                card.style.borderColor = "rgba(244, 63, 94, 0.25)";
            }

            card.innerHTML = `
                <div>
                    <div class="roadmap-tag">${skillName} • Priority: ${gap >= 2 ? 'High' : 'Medium'}</div>
                    <h3 class="roadmap-title">${data.course}</h3>
                    <p class="roadmap-description">
                        <strong>Recommended Reading:</strong> ${data.book}<br><br>
                        <strong>Closing Project blueprint:</strong> ${data.project}
                    </p>
                </div>
                <div class="roadmap-footer">
                    <span>Est: <strong style="color:var(--text-main);">${data.time}</strong></span>
                    <span class="difficulty ${data.difficulty.toLowerCase()}">${data.difficulty}</span>
                </div>
            `;
            
            grid.appendChild(card);
            cardsRendered++;
        }
    });

    if (cardsRendered === 0) {
        grid.innerHTML = `
            <div class="glass-panel" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; border-color: var(--color-success);">
                <h3 style="color:var(--color-success); margin-bottom: 0.5rem;">Congratulations! You have closed all gaps!</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">All your active skill ratings are aligned with or exceed the target standards of a ${state.targetRole}. You are job-market ready!</p>
            </div>
        `;
    }
}

// Job Description keyword parsing analyzer
function setupJDMatcher() {
    document.getElementById("btn-clear-jd").addEventListener("click", () => {
        document.getElementById("textarea-jd-input").value = "";
        document.getElementById("jd-results-panel").style.display = "none";
    });

    document.getElementById("btn-analyze-jd").addEventListener("click", () => {
        const text = document.getElementById("textarea-jd-input").value.trim().toLowerCase();
        if (!text) {
            showToast('Please paste job description content before analyzing.', 'error');
            return;
        }

        // Animate button
        const btn = document.getElementById('btn-analyze-jd');
        btn.textContent = '⏳ Analyzing...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg> Analyze Job Match`;
            btn.disabled = false;
        }, 900);

        // Run Mock Parsing Engine
        let strengths = [];
        let gaps = [];

        jdKeywords.forEach(item => {
            // Check if any search term is mentioned in the job description text
            const isMentioned = item.terms.some(term => text.includes(term));
            
            if (isMentioned) {
                // If it is already in our profile, compare levels
                if (state.skills[item.skill]) {
                    const skill = state.skills[item.skill];
                    if (skill.current >= skill.target) {
                        strengths.push(item.skill);
                    } else {
                        gaps.push(item.skill);
                    }
                } else {
                    // Skill mentioned in JD but missing in user profile completely!
                    gaps.push(item.skill);
                }
            }
        });

        // Safety fallback: if no keywords found, generate randomized mock findings based on target role
        if (strengths.length === 0 && gaps.length === 0) {
            const keys = Object.keys(state.skills);
            keys.forEach((k, idx) => {
                if (idx % 2 === 0) strengths.push(k);
                else gaps.push(k);
            });
        }

        // Render Results Panel
        const score = Math.round((strengths.length / (strengths.length + gaps.length)) * 100) || 0;
        document.getElementById("jd-match-rate").textContent = `${score}%`;
        
        // Show feedback paragraph
        const feedbackEl = document.getElementById("jd-match-feedback");
        if (score < 40) {
            feedbackEl.textContent = `High risk alert. The requirements for this posting contain significant technologies you haven't mastered yet. Consider focusing on: ${gaps.slice(0,3).join(", ")}.`;
        } else if (score < 80) {
            feedbackEl.textContent = `Good alignment detected. Your current background is compatible, but mastering ${gaps.slice(0,2).join(" and ")} would elevate your profile significantly.`;
        } else {
            feedbackEl.textContent = "Excellent matching candidate profile! You are highly qualified. Only minor skills overlaps remain.";
        }

        // Strengths Pills
        const strengthsPills = document.getElementById("jd-strengths-pills");
        strengthsPills.innerHTML = "";
        strengths.forEach(s => {
            strengthsPills.innerHTML += `<span class="badge badge-matched" style="padding:0.4rem 0.8rem; font-size:0.8rem;">${s}</span>`;
        });
        if (strengths.length === 0) strengthsPills.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">None matching</span>`;

        // Gaps Pills
        const gapsPills = document.getElementById("jd-gaps-pills");
        gapsPills.innerHTML = "";
        gaps.forEach(g => {
            gapsPills.innerHTML += `<span class="badge badge-critical" style="padding:0.4rem 0.8rem; font-size:0.8rem;">${g}</span>`;
        });
        if (gaps.length === 0) gapsPills.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">None detected</span>`;

        // Save gaps to temp storage inside button context
        const mergeBtn = document.getElementById("btn-merge-jd-skills");
        mergeBtn.dataset.gaps = JSON.stringify(gaps);

        // Display results block
        document.getElementById("jd-results-panel").style.display = "block";
        
        // Scroll to results dynamically
        document.getElementById("jd-results-panel").scrollIntoView({ behavior: 'smooth' });
    });

    // Merge Gaps Button Action
    document.getElementById("btn-merge-jd-skills").addEventListener("click", (e) => {
        const gapsStr = e.currentTarget.dataset.gaps;
        if (!gapsStr) return;

        const gapsList = JSON.parse(gapsStr);
        let countMerged = 0;

        gapsList.forEach(skillName => {
            if (!state.skills[skillName]) {
                state.skills[skillName] = { current: 1, target: 4, category: "JD Matcher" };
                countMerged++;
            } else if (state.skills[skillName].current >= state.skills[skillName].target) {
                state.skills[skillName].target = Math.min(5, state.skills[skillName].current + 1);
                countMerged++;
            }
        });

        showToast(`Integrated ${countMerged} gap skill(s) into your active dashboard!`, 'success');
        switchView("dashboard-view");
    });
}

// Assessment Quiz Panel logic
function setupQuiz() {
    document.getElementById("btn-quiz-quit").addEventListener("click", () => {
        showToast('Assessment exited. No changes saved.', 'info');
        setTimeout(() => switchView("dashboard-view"), 300);
    });

    document.getElementById("btn-quiz-submit").addEventListener("click", () => {
        submitQuizAnswer();
    });

    document.getElementById("btn-quiz-retry").addEventListener("click", () => {
        renderQuizSelector();
    });
}

function renderQuizSelector() {
    document.getElementById("quiz-select-skill-panel").style.display = "block";
    document.getElementById("quiz-active-panel").style.display = "none";
    document.getElementById("quiz-result-panel").style.display = "none";

    const buttonsGrid = document.getElementById("quiz-skill-buttons");
    buttonsGrid.innerHTML = "";

    const skills = Object.keys(state.skills);
    let testsAvailable = 0;

    skills.forEach(skillName => {
        // Offer quiz for skills that have gaps
        if (state.skills[skillName].current < state.skills[skillName].target) {
            const btn = document.createElement("button");
            btn.className = "btn btn-secondary";
            btn.style.padding = "1.25rem";
            btn.style.flexDirection = "column";
            btn.style.alignItems = "center";
            btn.style.gap = "0.25rem";
            
            btn.innerHTML = `
                <span style="font-weight:700; color:var(--text-main);">${skillName}</span>
                <span style="font-size:0.75rem; color:var(--color-primary);">Current Level: ${state.skills[skillName].current}/5</span>
            `;
            
            btn.addEventListener("click", () => {
                startQuizForSkill(skillName);
            });

            buttonsGrid.appendChild(btn);
            testsAvailable++;
        }
    });

    if (testsAvailable === 0) {
        buttonsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 2rem; color:var(--text-muted);">
                <p>No active skill gaps remaining. You don't need any assessments right now!</p>
            </div>
        `;
    }
}

function startQuizForSkill(skillName) {
    state.quiz.activeSkill = skillName;
    state.quiz.currentQuestionIndex = 0;
    state.quiz.score = 0;
    state.quiz.selectedOptionIndex = null;
    state.quiz.answers = [];

    // Fetch quiz questions. If no dedicated bank, load standard defaults
    const questionsList = quizBank[skillName] || defaultQuizQuestions;
    
    // Scramble / load questions (copy)
    state.quiz.questions = JSON.parse(JSON.stringify(questionsList));

    // Show active panel
    document.getElementById("quiz-select-skill-panel").style.display = "none";
    document.getElementById("quiz-active-panel").style.display = "block";
    
    // Set title
    document.getElementById("quiz-skill-title").textContent = skillName.toUpperCase();

    loadQuizQuestion();
}

function loadQuizQuestion() {
    const quizState = state.quiz;
    const qIndex = quizState.currentQuestionIndex;
    const q = quizState.questions[qIndex];

    // Reset selection
    quizState.selectedOptionIndex = null;
    document.getElementById("btn-quiz-submit").disabled = true;

    // Header info
    document.getElementById("quiz-question-number").textContent = `Question ${qIndex + 1} of ${quizState.questions.length}`;
    
    // Progress bar
    const progressPct = ((qIndex) / quizState.questions.length) * 100;
    document.getElementById("quiz-progress-inner").style.width = `${progressPct}%`;

    // Question body
    document.getElementById("quiz-question-text").textContent = q.question;

    // Options list
    const optionsUl = document.getElementById("quiz-options-list");
    optionsUl.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const li = document.createElement("li");
        li.className = "option-item";
        li.dataset.index = idx;
        
        li.innerHTML = `
            <div class="option-circle"></div>
            <span>${opt}</span>
        `;

        li.addEventListener("click", () => {
            // Toggle selection class
            document.querySelectorAll(".option-item").forEach(item => {
                item.classList.remove("selected");
            });
            li.classList.add("selected");
            
            // Enable submit button
            quizState.selectedOptionIndex = idx;
            document.getElementById("btn-quiz-submit").disabled = false;
        });

        optionsUl.appendChild(li);
    });
}

function submitQuizAnswer() {
    const quizState = state.quiz;
    const qIndex = quizState.currentQuestionIndex;
    const q = quizState.questions[qIndex];
    const selectedIdx = quizState.selectedOptionIndex;
    const isCorrect = selectedIdx === q.answer;

    if (isCorrect) {
        quizState.score++;
    }

    // Visual feedback on correct/wrong options before moving on
    const options = document.querySelectorAll('.option-item');
    options.forEach((opt, idx) => {
        if (idx === q.answer) opt.classList.add('correct');
        else if (idx === selectedIdx && !isCorrect) opt.classList.add('wrong');
        opt.style.pointerEvents = 'none';
    });

    const submitBtn = document.getElementById('btn-quiz-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    submitBtn.style.background = isCorrect ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f43f5e, #be123c)';

    setTimeout(() => {
        submitBtn.textContent = 'Submit Answer';
        submitBtn.style.background = '';
        quizState.answers.push(selectedIdx);
        quizState.currentQuestionIndex++;

        if (quizState.currentQuestionIndex < quizState.questions.length) {
            loadQuizQuestion();
        } else {
            finishQuiz();
        }
    }, 900);
}

function finishQuiz() {
    document.getElementById("quiz-active-panel").style.display = "none";
    document.getElementById("quiz-result-panel").style.display = "block";

    const quizState = state.quiz;
    const finalScore = quizState.score;
    const totalQ = quizState.questions.length;
    const skillName = quizState.activeSkill;
    const pct = Math.round((finalScore / totalQ) * 100);

    document.getElementById("quiz-result-score").textContent = `${finalScore} / ${totalQ}`;
    document.getElementById("quiz-result-emoji").textContent = pct >= 80 ? '🎓' : pct >= 60 ? '📈' : '📚';
    
    // Animate score bar
    setTimeout(() => {
        document.getElementById('quiz-score-bar').style.width = `${pct}%`;
    }, 100);

    const passThreshold = 3;
    const upgradeIndicator = document.getElementById("quiz-upgrade-indicator");

    if (finalScore >= passThreshold) {
        const oldLevel = state.skills[skillName].current;
        const targetLevel = state.skills[skillName].target;
        const newLevel = Math.min(targetLevel, oldLevel + 2);
        state.skills[skillName].current = newLevel;

        upgradeIndicator.style.background = 'rgba(16, 185, 129, 0.08)';
        upgradeIndicator.style.border = '1px solid rgba(16, 185, 129, 0.25)';
        upgradeIndicator.innerHTML = `
            <span style="color:var(--color-success); font-weight:700; font-family:var(--font-title); font-size:1.1rem; display:block;">Assessment Passed! 🎓</span>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">
                <strong>${skillName}</strong> upgraded from <strong>Level ${oldLevel}</strong> → <strong>Level ${newLevel}</strong>.
            </p>
        `;
        document.getElementById("quiz-result-message").textContent = `Excellent work! You demonstrated professional understanding of ${skillName}.`;
        showToast(`${skillName} skill upgraded to Level ${newLevel}!`, 'success');
        appendBotMessage(`Congratulations on passing the <strong>${skillName}</strong> assessment (${finalScore}/${totalQ})! Your rating has been updated on your dashboard.`);
    } else {
        upgradeIndicator.style.background = 'rgba(244, 63, 94, 0.08)';
        upgradeIndicator.style.border = '1px solid rgba(244, 63, 94, 0.25)';
        upgradeIndicator.innerHTML = `
            <span style="color:var(--color-accent); font-weight:700; font-family:var(--font-title); font-size:1.1rem; display:block;">Almost There 📚</span>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">
                You scored ${finalScore}/${totalQ}. Review the roadmap materials and try again.
            </p>
        `;
        document.getElementById("quiz-result-message").textContent = `Keep studying ${skillName} with the recommended materials in your roadmap.`;
        showToast(`Score: ${finalScore}/${totalQ}. Review materials and retry!`, 'info');
    }
    
    recalculateMetrics();
    updateStatBar();
}

// AI Career Mentor Chatbot logic
function setupChat() {
    const sendBtn = document.getElementById("btn-chat-send");
    const chatInput = document.getElementById("chat-user-input");

    sendBtn.addEventListener("click", () => {
        handleUserChatMessage();
    });

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            handleUserChatMessage();
        }
    });

    // Handle suggestion pills click
    document.querySelectorAll(".prompt-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            const promptText = pill.textContent;
            sendUserMessage(promptText);
            generateMentorResponse(promptText);
        });
    });
}

function handleUserChatMessage() {
    const chatInput = document.getElementById("chat-user-input");
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    sendUserMessage(text);
    
    // Show typing indicator while "thinking"
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        generateMentorResponse(text);
    }, 1000 + Math.random() * 600);
}

function sendUserMessage(text) {
    const chatContainer = document.getElementById("chat-messages-container");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble user";
    bubble.textContent = text;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    state.chatHistory.push({ sender: 'user', text: text });
}

function showTypingIndicator() {
    const chatContainer = document.getElementById("chat-messages-container");
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "typing-indicator";
    indicator.innerHTML = `
        <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.75rem;flex-shrink:0;">A</div>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
        <span style="font-size:0.8rem;color:var(--text-muted);">Aria is thinking...</span>
    `;
    chatContainer.appendChild(indicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
}

function appendBotMessage(htmlContent) {
    const chatContainer = document.getElementById("chat-messages-container");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot";
    bubble.style.display = 'flex';
    bubble.style.gap = '0.75rem';
    bubble.style.alignItems = 'flex-start';
    bubble.style.padding = '1rem 1.25rem';

    const avatarDiv = document.createElement('div');
    avatarDiv.style.cssText = 'width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.75rem;flex-shrink:0;';
    avatarDiv.textContent = 'A';

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = htmlContent;

    bubble.appendChild(avatarDiv);
    bubble.appendChild(contentDiv);
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    state.chatHistory.push({ sender: 'bot', text: htmlContent });
}

// Toast notification system
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span style="font-size:1rem;font-weight:700;flex-shrink:0;">${icons[type] || 'ℹ'}</span>
        <span>${message}</span>
    `;
    
    toast.addEventListener('click', () => dismissToast(toast));
    container.appendChild(toast);

    setTimeout(() => dismissToast(toast), duration);
}

function dismissToast(toast) {
    if (!toast.parentNode) return;
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
}

// Particle canvas animation for onboarding page
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 60;
    const colors = ['rgba(139,92,246,', 'rgba(6,182,212,', 'rgba(244,63,94,'];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    let animId;
    function animate() {
        // Only animate when onboarding is visible
        const onboarding = document.getElementById('onboarding-view');
        if (!onboarding || !onboarding.classList.contains('active')) {
            animId = requestAnimationFrame(animate);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.opacity + ')';
            ctx.fill();
        });
        // Draw faint connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animId = requestAnimationFrame(animate);
    }
    animate();
}

function generateMentorResponse(userText) {
    const query = userText.toLowerCase();
    
    // Match skill topics in the user message
    let matchedSkill = null;
    const skills = Object.keys(state.skills);
    
    for (let s of skills) {
        if (query.includes(s.toLowerCase()) || query.includes("database" && s.includes("Database"))) {
            matchedSkill = s;
            break;
        }
    }

    let reply = "";

    if (query.includes("roadmap") || query.includes("full-stack") || query.includes("become")) {
        reply = `To become a successful <strong>${state.targetRole}</strong> from your base as a <strong>${state.currentRole}</strong>, you need to focus on bridging these key domains:
        <br><br>
        1. <strong>System Architecture:</strong> Mastering high-level design bottlenecks and data consistency patterns.
        <br>
        2. <strong>Modern Stack integrations:</strong> Node.js and SQL/NoSQL schema relationships.
        <br>
        3. <strong>Cloud Infrastructures:</strong> Automating deployments via CI/CD frameworks.
        <br><br>
        I have laid out your personalized checklist inside the <em>Closing Pathway</em> cards on your main Dashboard!`;
    } 
    else if (matchedSkill) {
        const skillObj = state.skills[matchedSkill];
        const gap = skillObj.target - skillObj.current;
        const detail = learningPaths[matchedSkill] || { course: "specialized tutorials", book: "design documents", project: "a prototype system" };
        
        if (gap <= 0) {
            reply = `You've already mastered <strong>${matchedSkill}</strong>! Your level is aligned with senior targets. You should look into helping others learn it, or apply this directly in your portfolio design projects.`;
        } else {
            reply = `For your gap in <strong>${matchedSkill}</strong> (Current: ${skillObj.current}/5, Target: ${skillObj.target}/5), here is my curated recommendation:
            <br><br>
            📚 <strong>Best Book:</strong> <em>${detail.book}</em>.
            <br>
            🎓 <strong>Suggested Study:</strong> ${detail.course}.
            <br>
            🛠️ <strong>Key Practice Project:</strong> ${detail.project}
            <br><br>
            Would you like me to give you a practice interview question related to ${matchedSkill}?`;
        }
    } 
    else if (query.includes("project") || query.includes("build")) {
        reply = `Building hands-on projects is the best way to close technical gaps. For your active track to a <strong>${state.targetRole}</strong>, I recommend building:
        <br><br>
        • A <strong>highly-available microservices system</strong> deploying Node.js web servers behind a reverse proxy (Nginx).
        <br>
        • Implement real-time communications using WebSockets.
        <br>
        • Connect the backend to a database with transaction indexes.
        <br><br>
        Detailed project descriptions are available on the bottom grid of your Dashboard section!`;
    } 
    else if (query.includes("interview") || query.includes("question")) {
        reply = `Here is a common mock interview question for a <strong>${state.targetRole}</strong> role:
        <br><br>
        <em>"Can you explain the difference between vertical scaling and horizontal scaling? Under what circumstances would you choose database partitioning over cache caching structures?"</em>
        <br><br>
        Think about this question. Let me know your answer or ask me to explain the answer to you!`;
    }
    else if (query.includes("explain") || query.includes("what is")) {
        reply = `That is a great question. In systems engineering, components are usually broken down into modular layers:
        <br><br>
        • <strong>Frontend UI:</strong> The layout and presentation layer rendered on users' devices.
        <br>
        • <strong>Backend Logic:</strong> Processing operations, rules validation, and APIs routing.
        <br>
        • <strong>Persistence:</strong> Storing datasets safely.
        <br><br>
        Let me know which specific component or algorithm you want me to write code snippets or explain in more detail!`;
    }
    else {
        reply = `I understand. Career changes into a <strong>${state.targetRole}</strong> require steady preparation. 
        <br><br>
        I suggest taking the <strong>Skill Assessment</strong> quizzes to test your current levels, or pasting a job posting in the <strong>JD Matcher</strong> to see if you have hidden gaps.
        <br><br>
        What other aspects of the roadmap should we discuss?`;
    }

    appendBotMessage(reply);
}
