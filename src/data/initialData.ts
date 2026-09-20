import { MasterStoreData } from '../types';

export const initialMasterData: MasterStoreData = {
  siteSettings: {
    name: 'Sohel Rana',
    role: 'Full-Stack Web Developer',
    headline: 'SOHEL RANA',
    subtitle: 'Full-Stack Web Developer',
    shortDescription:
      'I build modern, responsive and high-performance digital experiences for ambitious brands, startups, and businesses worldwide.',
    statusText: 'AVAILABLE FOR FREELANCE PROJECTS',
    isAvailableForHire: true,
    location: 'Global / Remote',
    profilePhoto: '',
    seoTitle: 'Sohel Rana – Full-Stack Web Developer & Software Engineer',
    seoDescription:
      'Official portfolio and coding academy of Sohel Rana. Professional full-stack web development, modern software systems, and industry-level coding courses.',
    footerTagline: 'Built with passion & code.',
    footerCopyright: '© 2026 Sohel Rana. All Rights Reserved.',
  },

  about: {
    experienceYears: '',
    philosophy:
      'I believe in clean architecture, performance optimization, and intuitive user experiences. Every line of code is written with scalability, maintainability, and security in mind.',
    bioParagraphs: [
      'Hello! I am Sohel Rana, a Full-Stack Web Developer focused on building modern, responsive, and maintainable digital experiences.',
      'My development work focuses on semantic HTML, responsive interfaces, organized application architecture, API integration, and maintainable code.',
      'I also study ethical cybersecurity, web defense principles, and OWASP guidance so security considerations can be included throughout the development process.',
    ],
    focusAreas: [
      {
        title: 'Web Development',
        description: 'Responsive, mobile-first, and ultra-fast web interfaces built to convert.',
        icon: 'Globe',
      },
      {
        title: 'Software Development',
        description: 'Clean, maintainable software architectures adhering to strict design patterns.',
        icon: 'Code2',
      },
      {
        title: 'UI/UX Design',
        description: 'Modern, high-contrast, and futuristic interfaces designed with micro-interactions.',
        icon: 'Palette',
      },
      {
        title: 'Backend Development',
        description: 'Scalable server runtimes, microservices, and high-throughput application logic.',
        icon: 'Server',
      },
      {
        title: 'API Integration',
        description: 'RESTful architectures, third-party payment gateways, and data pipelines.',
        icon: 'Workflow',
      },
      {
        title: 'Database Systems',
        description: 'Structured schemas, indexing, caching, and document storage with SQL & NoSQL.',
        icon: 'Database',
      },
      {
        title: 'Ethical Cybersecurity Knowledge',
        description: 'Web vulnerability mitigation, safe authentication flows, and OWASP compliance.',
        icon: 'ShieldCheck',
      },
    ],
  },

  heroTechBadges: [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Kotlin',
    'SQL',
    'MongoDB',
    'Git',
    'GitHub',
  ],

  skills: [
    // Frontend
    {
      id: 'skill-html5',
      name: 'HTML5',
      category: 'frontend',
      description: 'Semantic markup, accessibility standards, and clean DOM hierarchy.',
      iconName: 'Code',
      level: 'Advanced',
    },
    {
      id: 'skill-css3',
      name: 'CSS3',
      category: 'frontend',
      description: 'Modern responsive layouts, Flexbox, CSS Grid, and custom animations.',
      iconName: 'Layout',
      level: 'Advanced',
    },
    {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'frontend',
      description: 'Modern ES6+ syntax, asynchronous programming, DOM APIs, and state management.',
      iconName: 'FileCode',
      level: 'Advanced',
    },
    {
      id: 'skill-react',
      name: 'React.js',
      category: 'frontend',
      description: 'Component lifecycles, custom hooks, virtual DOM optimization, and SPA architectures.',
      iconName: 'Atom',
      level: 'Advanced',
    },

    // Backend
    {
      id: 'skill-node',
      name: 'Node.js',
      category: 'backend',
      description: 'Event-driven server runtime, stream processing, and high-concurrency APIs.',
      iconName: 'Server',
      level: 'Advanced',
    },
    {
      id: 'skill-express',
      name: 'Express.js',
      category: 'backend',
      description: 'Fast, unopinionated routing middleware for building secure REST services.',
      iconName: 'Cpu',
      level: 'Advanced',
    },
    {
      id: 'skill-python-be',
      name: 'Python',
      category: 'backend',
      description: 'Backend scripting, automation workflows, and scalable service backbones.',
      iconName: 'Terminal',
      level: 'Advanced',
    },
    {
      id: 'skill-django',
      name: 'Django',
      category: 'backend',
      description: 'High-level Python web framework encouraging clean design and rapid prototyping.',
      iconName: 'Layers',
      level: 'Intermediate',
    },
    {
      id: 'skill-rest-api',
      name: 'REST API',
      category: 'backend',
      description: 'Stateless endpoints, JWT/Bearer authentication, rate-limiting, and error handling.',
      iconName: 'Workflow',
      level: 'Advanced',
    },

    // Database
    {
      id: 'skill-mongodb',
      name: 'MongoDB',
      category: 'database',
      description: 'Document-oriented NoSQL database with flexible aggregation pipelines.',
      iconName: 'Database',
      level: 'Advanced',
    },
    {
      id: 'skill-mysql',
      name: 'MySQL',
      category: 'database',
      description: 'Relational data modeling, table constraints, transaction management, and indexing.',
      iconName: 'Database',
      level: 'Advanced',
    },
    {
      id: 'skill-postgres',
      name: 'PostgreSQL',
      category: 'database',
      description: 'Advanced open-source relational database with ACID compliance and complex queries.',
      iconName: 'Database',
      level: 'Intermediate',
    },
    {
      id: 'skill-firebase',
      name: 'Firebase',
      category: 'database',
      description: 'Real-time database, cloud Firestore collections, and cloud functions.',
      iconName: 'Flame',
      level: 'Intermediate',
    },

    // Programming
    {
      id: 'skill-java',
      name: 'Java',
      category: 'programming',
      description: 'Object-oriented programming, data structures, and enterprise application basics.',
      iconName: 'Coffee',
      level: 'Intermediate',
    },
    {
      id: 'skill-kotlin',
      name: 'Kotlin',
      category: 'programming',
      description: 'Modern concise language for Android mobile engineering and null-safety.',
      iconName: 'Smartphone',
      level: 'Intermediate',
    },
    {
      id: 'skill-android',
      name: 'Android',
      category: 'programming',
      description: 'Android application development concepts, mobile UI, platform tooling, and app architecture.',
      iconName: 'Smartphone',
      level: 'Intermediate',
    },
    {
      id: 'skill-py-prog',
      name: 'Python',
      category: 'programming',
      description: 'Clean OOP scripting, algorithmic problem-solving, and automation scripts.',
      iconName: 'Terminal',
      level: 'Advanced',
    },
    {
      id: 'skill-js-prog',
      name: 'JavaScript',
      category: 'programming',
      description: 'Full-stack language versatility across browser runtimes and server engines.',
      iconName: 'FileCode',
      level: 'Advanced',
    },

    // Tools
    {
      id: 'skill-git',
      name: 'Git',
      category: 'tools',
      description: 'Distributed version control, branching strategies, rebasing, and merge resolution.',
      iconName: 'GitBranch',
      level: 'Advanced',
    },
    {
      id: 'skill-github',
      name: 'GitHub',
      category: 'tools',
      description: 'Collaborative code hosting, pull requests, project tracking, and CI/CD actions.',
      iconName: 'Github',
      level: 'Advanced',
    },
    {
      id: 'skill-vscode',
      name: 'VS Code',
      category: 'tools',
      description: 'Custom developer workspace setup, debugging setups, and productive extensions.',
      iconName: 'Monitor',
      level: 'Advanced',
    },
    {
      id: 'skill-figma',
      name: 'Figma',
      category: 'tools',
      description: 'UI/UX prototyping, design token handoff, wireframing, and responsive specs.',
      iconName: 'Figma',
      level: 'Intermediate',
    },

    // Cybersecurity
    {
      id: 'skill-ethical-hacking',
      name: 'Ethical Hacking',
      category: 'cybersecurity',
      description: 'Authorized penetration testing methodology and proactive vulnerability discovery.',
      iconName: 'Shield',
      level: 'Intermediate',
    },
    {
      id: 'skill-web-security',
      name: 'Web Security',
      category: 'cybersecurity',
      description: 'Content Security Policy (CSP), CORS protection, secure cookies, and HTTPS hardening.',
      iconName: 'Lock',
      level: 'Advanced',
    },
    {
      id: 'skill-owasp',
      name: 'OWASP',
      category: 'cybersecurity',
      description: 'Defensive engineering against Injection, XSS, Broken Auth, and CSRF attacks.',
      iconName: 'ShieldCheck',
      level: 'Advanced',
    },
    {
      id: 'skill-security-testing',
      name: 'Security Testing',
      category: 'cybersecurity',
      description: 'Defensive code auditing, input sanitation validation, and endpoint stress testing.',
      iconName: 'CheckCircle',
      level: 'Intermediate',
    },
  ],

  courses: [
    {
      id: 'course-full-stack',
      slug: 'full-stack',
      packageNumber: 'COURSE 01',
      title: 'FULL STACK WEB DEVELOPMENT',
      price: 149,
      regularPrice: 220,
      description:
        'Learn end-to-end web development from frontend interfaces with React through backend APIs with Node.js and MongoDB.',
      technologies: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'REST API',
        'Git',
        'GitHub',
      ],
      whatYouLearn: [
        'Deep semantic HTML5 & modern responsive CSS3 layout systems',
        'JavaScript ES6+ fundamentals, DOM manipulation, and asynchronous promises',
        'React.js component lifecycles, state management, and custom hooks',
        'Node.js & Express.js backend server architecture from scratch',
        'MongoDB schema design, indexing, and Mongoose ORM integration',
        'Building and testing secure RESTful APIs with JWT authentication',
        'Deploying full-stack web applications to cloud servers with Git & GitHub',
      ],
      modules: [
        {
          title: 'Module 1: Modern Frontend Foundations',
          topics: ['Semantic HTML5', 'Responsive CSS3 & Flexbox/Grid', 'Modern JavaScript ES6+'],
        },
        {
          title: 'Module 2: React.js Component Architecture',
          topics: ['JSX & Virtual DOM', 'State & Props Management', 'Custom Hooks & Context API'],
        },
        {
          title: 'Module 3: Server & Backend Engineering',
          topics: ['Node.js Runtime Basics', 'Express.js Routing Middleware', 'RESTful API Design'],
        },
        {
          title: 'Module 4: Database & Production Deployment',
          topics: ['MongoDB Database Setup', 'JWT Authentication & Security', 'Cloud Deployment & Git'],
        },
      ],
      requirements: [
        'A computer (Windows, Mac, or Linux) with internet connection',
        'No prior advanced programming experience required; basics will be covered from the ground up',
        'Eagerness to write code and build real hands-on projects',
      ],
      benefits: [
        'Complete source code access to all course projects',
        'Direct project review and feedback from Sohel Rana',
        'Lifetime access to updated course materials and video lessons',
        'Certificate of Completion to showcase on LinkedIn & Portfolio',
      ],
      faq: [
        {
          question: 'Is this course suitable for beginners?',
          answer:
            'Yes! We start with foundational web concepts and progressively build towards complex full-stack web applications.',
        },
        {
          question: 'How do I access the course after paying with USDT?',
          answer:
            'After submitting a payment request, the request remains Pending until it is independently reviewed. This portfolio does not currently provide automated course-access delivery.',
        },
      ],
      badge: 'MOST POPULAR',
      accent: 'cyan',
      enabled: true,
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'course-python',
      slug: 'python',
      packageNumber: 'COURSE 02',
      title: 'PYTHON DEVELOPMENT',
      price: 230,
      regularPrice: 320,
      description:
        'Learn professional Python development and architect powerful backend applications, APIs, and database engines with Django and PostgreSQL.',
      technologies: [
        'Python',
        'OOP',
        'Django',
        'Django REST Framework',
        'SQL',
        'PostgreSQL',
        'REST API',
        'Git',
        'GitHub',
      ],
      whatYouLearn: [
        'Core Python syntax, data structures, generators, and exception handling',
        'Object-Oriented Programming (OOP), inheritance, and design patterns in Python',
        'Building scalable web applications using the Django MTV framework',
        'Designing professional RESTful endpoints with Django REST Framework (DRF)',
        'Relational database architecture, queries, and migrations using PostgreSQL',
        'Authentication, permissions, token-based authorization, and middleware',
      ],
      modules: [
        {
          title: 'Module 1: Python Core & Object-Oriented Mastery',
          topics: ['Syntax & Data Structures', 'OOP Classes, Inheritance & Dunder Methods', 'File Handling & Automation'],
        },
        {
          title: 'Module 2: Relational Databases & SQL',
          topics: ['SQL Queries & Joins', 'PostgreSQL Setup & Connection', 'Data Modeling & Integrity'],
        },
        {
          title: 'Module 3: Django Web Architecture',
          topics: ['Django Project Structure', 'Models, Views, & Templates', 'Admin Customization & ORM'],
        },
        {
          title: 'Module 4: Django REST Framework & APIs',
          topics: ['Serializers & ViewSets', 'Token Authentication & Permissions', 'Production Deployment'],
        },
      ],
      requirements: [
        'Basic familiarity with computer operations and terminal commands',
        'Python 3.x installed on your workstation',
      ],
      benefits: [
        'Comprehensive Django REST API codebase templates',
        'Direct mentor support from Sohel Rana for backend debugging',
        'Career advice for backend developer roles',
      ],
      faq: [
        {
          question: 'Do we build real-world APIs in this course?',
          answer:
            'Yes. The curriculum covers RESTful APIs, authentication concepts, token handling, and database schema design.',
        },
      ],
      badge: 'BACKEND SPECIALIZATION',
      accent: 'blue',
      enabled: true,
      image:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'course-app-dev',
      slug: 'app-development',
      packageNumber: 'COURSE 03',
      title: 'APP DEVELOPMENT',
      price: 299,
      regularPrice: 420,
      description:
        'Learn modern Android development using Kotlin and Java, including application architecture, Firebase integration, and RESTful API concepts.',
      technologies: [
        'Java',
        'Kotlin',
        'Android',
        'Firebase',
        'REST API',
        'Git',
        'GitHub',
      ],
      whatYouLearn: [
        'Core Java fundamentals & modern Kotlin syntax for Android development',
        'Android Studio workstation setup, emulators, and device debugging',
        'Building responsive UI with Android XML and Jetpack Compose basics',
        'Activities, Fragments, ViewModels, and LiveData lifecycle handling',
        'Integrating Firebase Auth, Firestore, and Cloud Messaging',
        'Consuming REST APIs using Retrofit and asynchronous coroutines',
      ],
      modules: [
        {
          title: 'Module 1: Kotlin & Java for Android',
          topics: ['Kotlin Language Essentials', 'OOP Principles in Java/Kotlin', 'Android Studio Tooling'],
        },
        {
          title: 'Module 2: UI & Navigation Architecture',
          topics: ['Layouts & Views', 'Navigation Component & Fragments', 'RecyclerViews & Adapters'],
        },
        {
          title: 'Module 3: Cloud & Network Integration',
          topics: ['Retrofit REST Client', 'Coroutines & Background Tasks', 'Firebase Authentication & Firestore'],
        },
        {
          title: 'Module 4: APK Signing & Play Store Readiness',
          topics: ['Local Storage & Room DB', 'Release Building & Proguard', 'Publishing Best Practices'],
        },
      ],
      requirements: [
        'A computer with at least 8GB RAM (16GB recommended for Android Studio)',
        'Basic programming aptitude is helpful but not strictly required',
      ],
      benefits: [
        'Structured Android application projects and exercises',
        'Step-by-step guidance on Play Store publication standards',
        'Course exercises and code examples',
      ],
      faq: [
        {
          question: 'Can I follow along on Windows or Mac?',
          answer:
            'Yes, Android Studio and Kotlin run identically on Windows, macOS, and Linux.',
        },
      ],
      badge: 'MOBILE ENGINEERING',
      accent: 'purple',
      enabled: true,
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  bundle: {
    title: 'COMPLETE DEVELOPER BUNDLE',
    regularTotal: 678,
    discount: '30%',
    finalPrice: 475,
    savings: '$203',
    description:
      'A combined learning package covering full-stack web development, Python development, and Android app development.',
    ctaText: 'View Bundle',
    features: [
      'Course 01: Full Stack Web Development ($149 value)',
      'Course 02: Python Development ($230 value)',
      'Course 03: Android App Development ($299 value)',
      'All Hands-On Starter Templates & Repository Access',
      'Direct Mentorship & Code Reviews by Sohel Rana',
      'Lifetime Access with All Future Updates Included',
    ],
    modules: [
      {
        title: 'Track 1: Full-Stack Web Engineering',
        topics: ['HTML5, CSS3, JavaScript, React.js, Node.js, Express, MongoDB'],
      },
      {
        title: 'Track 2: Python Backend & Django Architecture',
        topics: ['Python OOP, Django, DRF, PostgreSQL, RESTful Systems'],
      },
      {
        title: 'Track 3: Native Android Development',
        topics: ['Java, Kotlin, Firebase, SQLite/Room, Cloud APIs'],
      },
      {
        title: 'Track 4: Defensive Web Security Fundamentals',
        topics: ['OWASP Top 10 mitigation, secure authentication, header hardening'],
      },
    ],
    faq: [
      {
        question: 'How do I enroll in the Complete Developer Bundle?',
        answer:
          'Click Buy Course on the bundle page, choose USDT TRC20 or BEP20, and submit your transaction details. You will receive invites to all three course repos and portals simultaneously.',
      },
    ],
  },

  services: [
    {
      id: 'srv-portfolio',
      slug: 'portfolio',
      title: 'PORTFOLIO WEBSITE',
      subtitle: 'High-Impact Personal & Professional Portfolios',
      description:
        'Modern personal and professional portfolio websites designed to present work, skills, and contact information clearly.',
      fiverrGigUrl: '',
      tiers: [
        {
          name: 'STARTER',
          price: 80,
          summary: 'Clean, responsive single-page developer or personal portfolio website.',
          features: [
            'Clean responsive single-page layout',
            'Modern dark or custom theme',
            'Mobile & tablet optimization',
            'Smooth scroll navigation',
            'Contact form hook & social links',
            'Professional development & clean code',
          ],
          idealFor: 'Developers, freelancers, and professionals needing a sleek presence.',
          deliveryHighlights: 'Fully responsive, zero bloat, lightning fast.',
        },
        {
          name: 'PROFESSIONAL',
          price: 120,
          popular: true,
          summary: 'Multi-section portfolio with interactive RGB neon accents and project showcase.',
          features: [
            'Multi-section complete portfolio',
            'Interactive RGB neon micro-interactions',
            'Dynamic project gallery & filter showcase',
            'Resume/CV integration & download link',
            'Optimized performance & asset loading',
            'SEO tags & OpenGraph social card setup',
          ],
          idealFor: 'Engineers, designers, and agencies ready for a top-tier visual showcase.',
          deliveryHighlights: 'Glassmorphic effects, subtle animations, search optimization.',
        },
        {
          name: 'PREMIUM',
          price: 200,
          summary: 'Ultra-premium custom developer workstation UI with advanced effects and CMS data.',
          features: [
            'High-end custom developer workstation UI',
            'Full interactive 3D/glassmorphism accents',
            'Custom animation & scroll reveal effects',
            'Centralized editable data architecture',
            'Comprehensive cross-browser QA testing',
            'Priority revisions & deployment assistance',
          ],
          idealFor: 'Senior engineers, high-end consultants, and tech founders.',
          deliveryHighlights: 'Workstation HUD styling, modular code, complete handover.',
        },
      ],
    },
    {
      id: 'srv-custom-web',
      slug: 'custom-web',
      title: 'CUSTOM WEBSITE',
      subtitle: 'Tailored Web Applications & Digital Platforms',
      description:
        'Tailored web applications, landing platforms, and bespoke digital solutions built to your exact technical specifications with full-stack capability.',
      fiverrGigUrl: '',
      tiers: [
        {
          name: 'STARTER',
          price: 90,
          summary: 'Custom responsive business landing page tailored to your brand identity.',
          features: [
            'Custom responsive business landing page',
            'Tailored brand identity alignment',
            'Mobile-first responsive architecture',
            'Interactive CTA buttons & form hooks',
            'Clean, maintainable source code',
            'Cross-device compatibility testing',
          ],
          idealFor: 'Startups and small businesses launching a new digital product.',
          deliveryHighlights: 'Clean semantic structure, conversion-focused layout.',
        },
        {
          name: 'PROFESSIONAL',
          price: 180,
          popular: true,
          summary: 'Multi-page web application with dynamic state and REST API integrations.',
          features: [
            'Multi-page or complex single-page web app',
            'Custom interactive components & state management',
            'REST API integration & dynamic data feeds',
            'Database connectivity (MongoDB / SQL / Firebase)',
            'Speed-optimized bundle & modern asset compression',
            'Enhanced mobile touch interactions',
          ],
          idealFor: 'Growing platforms requiring dynamic data and API connectivity.',
          deliveryHighlights: 'Robust API handling, state persistence, cross-device testing.',
        },
        {
          name: 'PREMIUM',
          price: 300,
          summary: 'Enterprise-tier custom web application with full-stack authentication and security.',
          features: [
            'Enterprise-tier custom web application',
            'Full-stack architecture (frontend + backend APIs)',
            'Secure authentication & authorization flows',
            'Robust database schema design & indexing',
            'Complete cybersecurity best practices (OWASP)',
            'Full deployment setup & comprehensive handover',
          ],
          idealFor: 'SaaS platforms, client portals, and bespoke business systems.',
          deliveryHighlights: 'Full source code ownership, security-hardened, production ready.',
        },
      ],
    },
  ],

  projects: [
    {
      id: 'proj-1',
      slug: 'quantumflow',
      title: 'QuantumFlow Cloud Dashboard',
      description:
        'A futuristic high-throughput analytics and telemetry workstation featuring real-time data streaming, dark cyberpunk theme, and sub-millisecond chart rendering.',
      longDescription:
        'QuantumFlow was engineered to process and visualize real-time cloud infrastructure metrics with ultra-low latency. It features customized WebSocket communication pipelines, dark workstation HUD graphics, and modular telemetry charts.',
      category: 'Full-Stack',
      techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST API'],
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      liveUrl: '',
      githubUrl: 'https://github.com/sohelrana-dev/quantumflow',
      published: true,
      featured: true,
    },
    {
      id: 'proj-2',
      slug: 'cybershield',
      title: 'CyberShield Security Scanner',
      description:
        'A defensive security inspection console that checks HTTP headers, CORS configurations, and flags OWASP top 10 security oversights in client applications.',
      longDescription:
        'Designed as an automated defensive audit platform, CyberShield inspects web targets for missing security headers (CSP, HSTS, X-Frame-Options), checks for vulnerable dependencies, and outputs structured remediation reports.',
      category: 'Cybersecurity',
      techStack: ['Python', 'Django', 'REST API', 'Web Security', 'OWASP'],
      image:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      liveUrl: '',
      githubUrl: 'https://github.com/sohelrana-dev/cybershield-scanner',
      published: true,
      featured: true,
    },
    {
      id: 'proj-3',
      slug: 'omnistore',
      title: 'OmniStore Full-Stack Commerce',
      description:
        'A responsive modern e-commerce platform with product catalogs, shopping cart state, order management, and secure payment webhook integration.',
      longDescription:
        'A complete multi-vendor capable online storefront featuring responsive product grids, instant live search filtering, atomic shopping cart state management, and webhooks for payment processing.',
      category: 'Full-Stack',
      techStack: ['React.js', 'Node.js', 'PostgreSQL', 'Express', 'Responsive Design'],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      liveUrl: '',
      githubUrl: 'https://github.com/sohelrana-dev/omnistore-platform',
      published: true,
      featured: true,
    },
    {
      id: 'proj-4',
      slug: 'novatask',
      title: 'Nova Mobile Task & Habit Tracker',
      description:
        'A high-performance Android companion application utilizing modern Material You principles, offline SQLite caching, and Firebase cloud synchronization.',
      longDescription:
        'Nova is a native Android application built with Kotlin and Jetpack architecture components. It provides sub-millisecond local caching via Room DB and syncs seamlessly with Firebase when internet connectivity is re-established.',
      category: 'Android',
      techStack: ['Kotlin', 'Java', 'Android SDK', 'Firebase', 'REST API'],
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      liveUrl: '',
      githubUrl: 'https://github.com/sohelrana-dev/nova-android-app',
      published: true,
      featured: false,
    },
  ],

  walletSettings: {
    usdtTrc20Address: 'TH9rhUmnZoCfv7wFB7aG8xt9J7rZrrT9EK',
    usdtBep20Address: '0xa6c1c397df155614cfe1b16d7b1efefe681fa5c2',
    binancePayId: '',
    instructions:
      'Only send USDT using the selected network. Sending funds through the wrong network may result in permanent loss. After transferring the exact USDT amount for your course, copy your Transaction Hash (TXID), take a screenshot of your confirmation, and submit the verification form below.',
  },

  socialLinks: {
    github: 'https://github.com/sohelrana-dev',
    linkedin: 'https://linkedin.com/in/sohelrana-dev',
    fiverr: '',
    facebook: 'https://facebook.com',
    telegram: 'https://t.me/sohelrana_dev',
    email: 'contact@sohelrana.dev',
  },

  orders: [],

  messages: [],
};
