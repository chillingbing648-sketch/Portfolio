/**
 * AETHER ARCHIVE — THE COMPLETE PROJECTS UNIVERSE
 * Standalone Client Module
 *
 * Capabilities:
 * - Curated canonical registry of all 17 chillingbing648-sketch repositories
 * - Live GitHub API synchronization with graceful offline/rate-limit fallback
 * - Instant debounced full-text search across titles, descriptions, and stacks
 * - Multi-category faceted filtering & dynamic metrics recalculation
 * - Multi-criteria sorting (Curated, Recently Updated, Alphabetical, Size)
 * - Dual view modes: Interactive Grid Matrix & Data-Dense Ledger Table
 * - Deep Case Study / Project Detail Modal with accessibility & focus trapping
 */

const GITHUB_USERNAME = 'chillingbing648-sketch';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

// Language color mapping
const LANG_COLORS = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'C++': '#f34b7d',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Default': '#8b5cf6'
};

// Canonical curated registry of all 17 public repositories
const CURATED_PROJECTS = [
    {
        id: 'kaamkaagaz',
        repoName: 'KaamKaagaz',
        title: 'KaamKaagaz — Civic Tech & Admissions Platform',
        category: 'civic',
        categoryLabel: 'Civic & Education',
        featured: true,
        featuredNumber: '01 / 04',
        accentGradient: 'radial-gradient(circle at 100% 0%, rgba(200, 86, 27, 0.22), transparent 70%)',
        language: 'TypeScript',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Static Export', 'localStorage'],
        description: 'A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.',
        github: 'https://github.com/chillingbing648-sketch/KaamKaagaz',
        live: 'https://chillingbing648-sketch.github.io/KaamKaagaz/',
        sizeKb: 2257,
        updatedAt: '2026-10-15T05:47:55Z',
        stars: 0,
        caseStudy: {
            story: "Government paperwork and university admissions in India are fraught with friction from contradictory requirements across outdated portals. Having managed university admissions logistics firsthand as an IT Specialist at University of Mumbai, I saw hundreds of students overwhelmed. I built KaamKaagaz to turn that anxiety into a clean, transparent roadmap from question to official submission.",
            problem: "Critical guidance for essential documents (income certificates, domicile, caste validity, PAN) and admissions (FYJC, CET Cell/CAP, Mumbai University Samarth) is fragmented, laden with bureaucratic jargon, and inaccessible in regional languages.",
            architecture: "Architected with Next.js 15 (App Router), React 19, and TypeScript as a static-exported civic engine deployed via GitHub Actions. Features a deterministic, privacy-first client-side search engine normalizing natural Hinglish queries without remote API latency or user tracking. Includes localized schemas across English, हिन्दी, and मराठी.",
            challenges: "Structuring complex multi-stage bureaucratic workflows into unambiguous state machines. Designing an instant conversational search matcher handling Hinglish and regional terminology deterministically on client side.",
            impact: "Empowered thousands of students and citizens with self-serve clarity across essential government documentation and higher-education admission portals.",
            lessons: "Civic technology must prioritize trust, transparency, and accessibility over algorithmic obscurity. Simple client-side architecture often serves citizens far better than fragile microservices."
        }
    },
    {
        id: 'walle',
        repoName: 'WALL-E',
        title: 'WALL-E — Mental Health AI Companion App',
        category: 'ai',
        categoryLabel: 'AI & Intelligence',
        featured: true,
        featuredNumber: '02 / 04',
        accentGradient: 'radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.22), transparent 70%)',
        language: 'JavaScript',
        techStack: ['JavaScript', 'AI Integration', 'Mood Analytics', 'Local Storage', 'Responsive Design'],
        description: 'A supportive AI companion for mood check-ins, guided journaling, and reflective conversations — designed to encourage healthier daily habits with clear, user-first boundaries.',
        github: 'https://github.com/chillingbing648-sketch/WALL-E',
        live: 'https://chillingbing648-sketch.github.io/WALL-E/',
        sizeKb: 156272,
        updatedAt: '2026-10-10T19:43:23Z',
        stars: 0,
        caseStudy: {
            story: "WALL-E began with a simple idea: create a calm, private space where a person can pause, reflect, and build a more consistent emotional check-in habit without the anxiety of clinical interfaces.",
            problem: "Daily stress is easy to overlook until it compounds. People need a low-friction way to capture how they feel, reflect on patterns, and find supportive prompts without replacing professional care.",
            architecture: "Built as a responsive AI companion experience with guided check-ins, journal prompts, mood history, and contextual conversation flows. The product keeps personal reflection at the center and ensures all diary data remains completely private to the user's browser.",
            challenges: "Designing language that feels empathetic and supportive without making clinical claims. Protecting user privacy through strict client-side persistence.",
            impact: "Created a gentle daily reflection experience that helps users notice emotional patterns and make space for intentional self-care.",
            lessons: "Empathy must shape every interaction. Mental-health-related tools require clear ethical boundaries, privacy-first storage, and instant accessibility."
        }
    },
    {
        id: 'continuity',
        repoName: 'Continuity',
        title: 'Continuity — Financial Legacy Vault',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: true,
        featuredNumber: '03 / 04',
        accentGradient: 'radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.22), transparent 70%)',
        language: 'JavaScript',
        techStack: ['React', 'Secure Data Management', 'Access Control', 'REST API', 'Responsive UI'],
        description: 'A secure digital legacy platform bringing wills, investments, assets, estates, and important documents into one trusted place with controlled access for designated beneficiaries.',
        github: 'https://github.com/chillingbing648-sketch/Continuity',
        live: 'https://continuity-react.vercel.app/',
        sizeKb: 11858,
        updatedAt: '2026-09-25T14:30:00Z',
        stars: 0,
        caseStudy: {
            story: "A secure digital legacy platform designed to bring wills, investments, assets, estates, and critical family records together in one trusted place. Continuity focuses on making personal legacies organized and securely shareable.",
            problem: "Financial and legacy information is scattered across banks, brokerages, and filing cabinets. Families often struggle to know what exists or how to access it when unexpected emergencies occur.",
            architecture: "Built a centralized digital vault enabling users to catalog assets, policy numbers, and estate documents with role-based access control and conditional beneficiary release triggers.",
            challenges: "Balancing ease-of-use with enterprise-grade privacy and zero-knowledge data structuring. Designing intuitive family notification workflows.",
            impact: "Created a unified digital repository for organizing lifelong estates, giving families peace of mind and structured access.",
            lessons: "The best digital systems simplify complexity without compromising trust. Preserving a legacy is about ensuring information reaches the right people at the right time."
        }
    },
    {
        id: 'attendify',
        repoName: 'Attendify',
        title: 'Attendify — Attendance Analytics Platform',
        category: 'civic',
        categoryLabel: 'Civic & Education',
        featured: true,
        featuredNumber: '04 / 04',
        accentGradient: 'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.22), transparent 70%)',
        language: 'JavaScript',
        techStack: ['C++', 'Node.js', 'REST API', 'JSON Storage', 'Analytical Forecasting'],
        description: 'A structured attendance analytics and tracking platform engineered with C++ core calculation logic, Node.js API, and real-time threshold forecasting.',
        github: 'https://github.com/chillingbing648-sketch/Attendify',
        live: 'https://preview--vivid-web-transform.lovable.app/',
        sizeKb: 233,
        updatedAt: '2026-10-01T20:04:09Z',
        stars: 0,
        caseStudy: {
            story: "A problem I experienced firsthand in university — no fast, dependable tool to track attendance across 6–8 subjects with varying minimum thresholds. Spreadsheets were fragile, and existing apps were bloated with ads.",
            problem: "Students must maintain minimum attendance percentages (75%) across multiple disciplines simultaneously, needing to know exactly how many lectures they can safely miss or need to attend.",
            architecture: "Engineered with C++ core calculation algorithms for fast projections, wrapped with a Node.js REST API layer and dynamic client-side dashboard with live forecast visualizers.",
            challenges: "Bridging compiled C++ computational logic with asynchronous web services and syncing user state reliably without high authentication friction.",
            impact: "Eliminated spreadsheet dependency for hundreds of student attendance records with instantaneous safe-to-skip forecasts.",
            lessons: "Build the tool you need directly. Combining compiled speed with responsive web frontends delivers unmatched user satisfaction."
        }
    },
    {
        id: 'psych-study',
        repoName: 'Psych-Study',
        title: 'Psych-Study — AI Psychology Study Companion',
        category: 'ai',
        categoryLabel: 'AI & Intelligence',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'AI Quizzes', 'Flashcards', 'Adaptive Learning'],
        description: 'AI-powered psychology study companion that turns confusing textbook notes into interactive quizzes, structured flashcards, and low-stress exam prep workflows.',
        github: 'https://github.com/chillingbing648-sketch/Psych-Study',
        live: null,
        sizeKb: 210,
        updatedAt: '2026-09-04T12:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Conceived during intensive psychology coursework to decompose dense psychological models, diagnostic criteria, and theories into active recall quizzes and spaced repetition flashcards.",
            problem: "Psychology syllabi involve vast conceptual taxonomies that passive reading fails to consolidate effectively for exams.",
            architecture: "Client-side study engine that ingests structured study units, auto-generating interactive multiple-choice recall challenges, self-test flashcards, and retention trackers.",
            challenges: "Parsing educational notes into structured question-answer pairs and providing instant diagnostic feedback.",
            impact: "Streamlined exam preparation with automated recall tools and concise concept summaries.",
            lessons: "Active retrieval practice drastically outperforms passive rereading in complex behavioral science subjects."
        }
    },
    {
        id: 'saviorai',
        repoName: 'SaviorAI',
        title: 'SaviorAI — Intelligent AI Operations Platform',
        category: 'ai',
        categoryLabel: 'AI & Intelligence',
        featured: false,
        language: 'TypeScript',
        techStack: ['TypeScript', 'AI Workflows', 'Prompt Engine', 'Modern Web'],
        description: 'A modular TypeScript platform engineered for orchestrating smart conversational workflows, multi-step prompts, and intelligent task assistance.',
        github: 'https://github.com/chillingbing648-sketch/SaviorAI',
        live: null,
        sizeKb: 792,
        updatedAt: '2026-09-22T10:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Built to experiment with agentic task dispatching and multi-turn prompt pipelines that assist users in structuring complex everyday technical operations.",
            problem: "Generic chatbots lack task-specific operational boundaries, often giving unfocused or unstructured responses for specialized engineering workflows.",
            architecture: "TypeScript architecture utilizing typed context trees, prompt template validation, and responsive interactive feedback states.",
            challenges: "Handling asynchronous token streaming and managing prompt state machines across branched dialogue paths.",
            impact: "Established a reusable foundation for intelligent operational assistants with strictly bounded scopes.",
            lessons: "Strong typing with TypeScript is essential when managing dynamic LLM prompt pipelines and unpredictable payloads."
        }
    },
    {
        id: 'invite',
        repoName: 'Invite',
        title: 'Invite — Dynamic Event & RSVP Platform',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'Vercel', 'RSVP System', 'Responsive UI'],
        description: 'An interactive modern digital invitation platform featuring real-time RSVP capture, venue location guidance, and guest personalization.',
        github: 'https://github.com/chillingbing648-sketch/Invite',
        live: 'https://invite-six-liard.vercel.app',
        sizeKb: 1208,
        updatedAt: '2026-09-16T15:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Designed to replace clumsy static paper wedding/event invites with a fluid, digital-first experience accessible on all mobile devices.",
            problem: "Event organizers struggle with unconfirmed headcounts and guests asking repetitive questions about locations, itineraries, and parking.",
            architecture: "Hosted on Vercel Edge with instantaneous load times, responsive interactive countdown, map integration, and digital RSVP confirmation.",
            challenges: "Ensuring zero-layout shift on slow mobile cellular networks during guest arrivals.",
            impact: "Streamlined event coordination with live attendee confirmations and elegant design.",
            lessons: "Event software must be bulletproof on mobile screens and load in under 1 second."
        }
    },
    {
        id: 'benchwarmers',
        repoName: 'BenchWarmers',
        title: 'BenchWarmers — Sports Community & Analytics Hub',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'Vercel', 'Sports Data', 'UI Components'],
        description: 'A vibrant sports hub and community application engineered for tracking match schedules, squad lineups, and game metrics.',
        github: 'https://github.com/chillingbing648-sketch/BenchWarmers',
        live: 'https://bench-warmers.vercel.app',
        sizeKb: 164,
        updatedAt: '2026-03-15T18:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Created as a lively space for sports enthusiasts to track match calendars, review roster statistics, and stay engaged with friendly tournaments.",
            problem: "Amateur and local sports leagues rarely have sleek, modern web dashboards to display standings and team details.",
            architecture: "Built with modular vanilla JavaScript components, dynamic state handling, and fast deployment on Vercel.",
            challenges: "Rendering reactive scoreboard components with high visual polish on low bandwidth.",
            impact: "Delivered a clean digital presence for sports enthusiasts and friendly league competitions.",
            lessons: "Lightweight architectures deliver incredible speed and smooth 60fps animations without heavy frameworks."
        }
    },
    {
        id: 'rcgsc',
        repoName: 'RCGSC',
        title: 'RCGSC — Community Services Platform',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'Community Portal', 'Interactive Catalog', 'CSS Grid'],
        description: 'A comprehensive digital portal and catalog system developed for community members to access services, notices, and resource schedules.',
        github: 'https://github.com/chillingbing648-sketch/RCGSC',
        live: null,
        sizeKb: 18814,
        updatedAt: '2026-10-06T17:32:49Z',
        stars: 0,
        caseStudy: {
            story: "Developed to bridge community organizations with their constituents, providing a central digital noticeboard and services catalog.",
            problem: "Important updates, schedules, and service directories are frequently lost in cluttered messaging groups.",
            architecture: "Engineered with client-side resource filters, structured directories, and accessible navigation schemes.",
            challenges: "Organizing deep category hierarchies into an intuitive mobile-friendly layout.",
            impact: "Centralized community notices, reducing redundant administrative inquiries.",
            lessons: "Clear visual hierarchy and robust search capabilities are essential for community portals."
        }
    },
    {
        id: 'mensware',
        repoName: 'MENSWARE',
        title: 'MENSWARE — Modern E-Commerce Catalog',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'E-Commerce', 'Cart Engine', 'Responsive CSS'],
        description: 'An aesthetic contemporary apparel shopping showcase featuring dynamic product filtering, interactive cart state, and sleek modern typography.',
        github: 'https://github.com/chillingbing648-sketch/MENSWARE',
        live: null,
        sizeKb: 8443,
        updatedAt: '2026-10-03T21:14:47Z',
        stars: 0,
        caseStudy: {
            story: "An exploration into editorial e-commerce design, emphasizing minimalist photography layouts, smooth product filtering, and instant shopping cart math.",
            problem: "Many retail web templates feel cluttered and sluggish, detracting from the garments and lifestyle presentation.",
            architecture: "Fast client-side product catalog with dynamic attribute filtering (size, collection, price) and persistent local cart memory.",
            challenges: "Optimizing image display and fluid responsiveness across standard and high-density retina displays.",
            impact: "Showcased high-end commercial design principles applied to retail web development.",
            lessons: "E-commerce conversion hinges on whitespace, effortless typography, and lightning-fast cart state changes."
        }
    },
    {
        id: 'aerion',
        repoName: 'Aerion',
        title: 'Aerion — Modular TypeScript System Core',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'TypeScript',
        techStack: ['TypeScript', 'Architecture', 'Clean Code', 'Modular Pattern'],
        description: 'An architectural exploration of clean modular design patterns, strict TypeScript boundaries, and decoupled event handling.',
        github: 'https://github.com/chillingbing648-sketch/Aerion',
        live: null,
        sizeKb: 72,
        updatedAt: '2026-10-10T18:22:54Z',
        stars: 0,
        caseStudy: {
            story: "Created as an architectural playground to test decoupled publish-subscribe patterns and modular TypeScript abstractions.",
            problem: "Frontend application logic frequently becomes tangled when state management is coupled directly with DOM mutations.",
            architecture: "Strictly typed core abstractions isolating data mutation from presentation layers.",
            challenges: "Maintaining zero runtime dependencies while enforcing compile-time type safety.",
            impact: "Established reusable architectural blueprints later applied across larger web applications.",
            lessons: "Investing in architectural discipline early prevents exponential refactoring costs down the road."
        }
    },
    {
        id: 'pomodoro',
        repoName: 'Pomodoro',
        title: 'Pomodoro — Deep Work Productivity Timer',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'HTML5 Audio', 'Local State', 'Productivity'],
        description: 'A focused, distraction-free Pomodoro timer designed for sustained deep work sprints, interval tracking, and custom work-rest cycles.',
        github: 'https://github.com/chillingbing648-sketch/Pomodoro',
        live: null,
        sizeKb: 204,
        updatedAt: '2026-09-27T10:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Built to overcome productivity friction during intense coding marathons, combining visual rhythm with acoustic milestone signals.",
            problem: "Generic timer apps often distract with complex configuration menus and intrusive alerts.",
            architecture: "Precision JavaScript interval engine with tab title time synchronizer, background sound cues, and persistent session counters.",
            challenges: "Handling background tab timer drift caused by browser power-saving interval throttling.",
            impact: "Used daily as a personal productivity companion during university software development cycles.",
            lessons: "A single, well-executed utility beats complex, feature-heavy alternatives every time."
        }
    },
    {
        id: 'my-little-universe',
        repoName: 'My-Little-Universe',
        title: 'My-Little-Universe — Pure CSS Planetary Mechanics',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'CSS',
        techStack: ['CSS3', '3D Transforms', 'Keyframes', 'Creative Coding'],
        description: 'A poetic interactive solar system rendered entirely in pure CSS keyframes, 3D transform layers, and procedural glowing stellar textures.',
        github: 'https://github.com/chillingbing648-sketch/My-Little-Universe',
        live: null,
        sizeKb: 15882,
        updatedAt: '2026-09-23T11:00:00Z',
        stars: 0,
        caseStudy: {
            story: "A creative coding experiment pushing the absolute limits of CSS3 3D transforms, nested coordinate systems, and astronomical orbit math.",
            problem: "Rendering multi-tier orbital mechanics typically requires Canvas or WebGL libraries that introduce heavy script runtimes.",
            architecture: "Engineered using zero JavaScript for animation; utilizes pure CSS `transform-style: preserve-3d`, nested orbital rings, and parametric timing functions.",
            challenges: "Achieving accurate rotational velocity scaling across concentric planetary spheres purely through CSS keyframes.",
            impact: "Demonstrated creative CSS mastery, achieving high-performance 60fps stellar motion on low-powered hardware.",
            lessons: "The native capabilities of modern CSS can achieve breathtaking visual art without executing a single line of JavaScript."
        }
    },
    {
        id: 'as-you-wish',
        repoName: 'As-you-wish',
        title: 'As-you-wish — Interactive Experience Tool',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'TypeScript',
        techStack: ['TypeScript', 'Interactive UI', 'State Flow', 'Animations'],
        description: 'An interactive generative greeting and wish dispatch tool engineered with reactive TypeScript animations and customizable themes.',
        github: 'https://github.com/chillingbing648-sketch/As-you-wish',
        live: null,
        sizeKb: 372,
        updatedAt: '2026-09-09T08:00:00Z',
        stars: 0,
        caseStudy: {
            story: "Created as an interactive personal utility allowing users to generate customized interactive celebratory experiences.",
            problem: "Digital cards and wishes are static and impersonal, offering limited delight or engagement.",
            architecture: "Dynamic UI with interactive particle bursts, thematic color transitions, and URL-encoded customized payload sharing.",
            challenges: "Encoding rich personalized messages into URL hash strings without requiring database backends.",
            impact: "Brought delight to friends and family with zero hosting or server maintenance overhead.",
            lessons: "Zero-backend, URL-state architectures offer virtually unlimited scalability and zero hosting costs."
        }
    },
    {
        id: 'only-for-her',
        repoName: 'Only-For-Her',
        title: 'Only-For-Her — Romantic Interactive Journey',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'CSS',
        techStack: ['CSS3', 'Keyframe Narratives', 'Audio Elements', 'Micro-Interactions'],
        description: 'A deeply personal digital keepsake crafted with interactive narrative chapters, animated memories, and gentle acoustic ambiance.',
        github: 'https://github.com/chillingbing648-sketch/Only-For-Her',
        live: null,
        sizeKb: 79986,
        updatedAt: '2026-10-14T05:17:08Z',
        stars: 0,
        caseStudy: {
            story: "Crafted as a custom digital anniversary celebration, weaving together photographs, reflections, and milestones into an interactive timeline.",
            problem: "Standard social media tributes lack privacy, permanence, and bespoke creative engineering.",
            architecture: "Built with smooth chapter reveals, atmospheric particle drift, and interactive keepsake elements.",
            challenges: "Crafting heartfelt micro-interactions that feel warm and respectful without visual clutter.",
            impact: "A cherished personal digital creation exemplifying code as a medium for emotional expression.",
            lessons: "Software engineering is at its most powerful when it touches human hearts and commemorates meaningful milestones."
        }
    },
    {
        id: 'pawfect-care',
        repoName: 'Pawfect-care',
        title: 'Pawfect-care — Pet Welfare & Adoption Portal',
        category: 'web',
        categoryLabel: 'Web Platforms',
        featured: false,
        language: 'HTML',
        techStack: ['HTML5', 'CSS3', 'Responsive Layout', 'Pet Directory'],
        description: 'A friendly community adoption portal designed to connect rescue pets with caring adoptive families through clear care guidance.',
        github: 'https://github.com/chillingbing648-sketch/Pawfect-care',
        live: null,
        sizeKb: 4100,
        updatedAt: '2026-04-07T12:00:00Z',
        stars: 0,
        caseStudy: {
            story: "One of my foundational early web engineering projects, built to explore responsive layout construction for pet rescue initiatives.",
            problem: "Animal shelters often struggle to communicate adoption prerequisites and pet profiles clearly to prospective pet parents.",
            architecture: "Structured semantic HTML5 documents, card-based pet profiles, and mobile-friendly intake request forms.",
            challenges: "Implementing accessible responsive grids before modern CSS grid became widely ubiquitous in mobile browsers.",
            impact: "Served as a foundational stepping stone in mastering core web accessibility and semantic markup.",
            lessons: "Never forget where you started. Foundational mastery of HTML semantics is the bedrock of world-class web development."
        }
    },
    {
        id: 'portfolio',
        repoName: 'Portfolio',
        title: 'Aether — The Digital Universe Portfolio',
        category: 'creative',
        categoryLabel: 'Creative & Systems',
        featured: false,
        language: 'JavaScript',
        techStack: ['JavaScript', 'WebGL 2', 'GLSL Shaders', 'Lenis Scroll', 'GSAP', 'Vite'],
        description: 'The official flagship personal portfolio and digital universe of Harsh Dubey, featuring a custom WebGL 2 particle engine, OS terminal, and accessible design system.',
        github: 'https://github.com/chillingbing648-sketch/Portfolio',
        live: 'https://harshportfolio404.netlify.app/',
        sizeKb: 14660,
        updatedAt: '2026-10-15T20:11:02Z',
        stars: 0,
        caseStudy: {
            story: "Engineered from the ground up to redefine what an engineer's portfolio can be — an immersive, living universe that tells a cohesive story of creativity, artificial intelligence, and software craftsmanship.",
            problem: "Most developer portfolios are static templates or boilerplate card grids that fail to convey authentic technical depth and creative vision.",
            architecture: "Custom raw WebGL 2 particle canvas engine written in pure GLSL shader code without Three.js overhead. Orchestrated with Lenis smooth scroll, GSAP reveals, and an in-browser Unix-like terminal shell.",
            challenges: "Achieving flawless 60–120 FPS graphics while strictly preserving zero-layout-shift (CLS = 0) and high Core Web Vitals across low-powered mobile devices.",
            impact: "Delivers an unforgettable first impression to recruiters, collaborators, and tech leaders worldwide.",
            lessons: "True engineering excellence lies in balancing artistic wonder with uncompromising performance, reliability, and accessibility."
        }
    }
];

// Active State
let allProjects = [...CURATED_PROJECTS];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'curated';
let currentView = 'grid';

// DOM Elements
const featuredCardsContainer = document.getElementById('featuredCardsContainer');
const projectsGridContainer = document.getElementById('projectsGridContainer');
const projectsTableContainer = document.getElementById('projectsTableContainer');
const projectsTableBody = document.getElementById('projectsTableBody');
const archiveEmptyState = document.getElementById('archiveEmptyState');
const directoryResultsCount = document.getElementById('directoryResultsCount');
const archiveSearchInput = document.getElementById('archiveSearchInput');
const archiveSearchClear = document.getElementById('archiveSearchClear');
const archiveSortSelect = document.getElementById('archiveSortSelect');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const filterChips = document.querySelectorAll('.filter-chip');
const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
const syncStatusPill = document.getElementById('syncStatusPill');
const syncDot = document.getElementById('syncDot');
const syncText = document.getElementById('syncText');

// Modal Elements
const projectModal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCategory = document.getElementById('modalCategory');
const modalStatus = document.getElementById('modalStatus');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalProjectDesc = document.getElementById('modalProjectDesc');
const modalProjectContent = document.getElementById('modalProjectContent');
const modalProjectActions = document.getElementById('modalProjectActions');

/**
 * Format relative time
 */
function formatTimeAgo(isoDate) {
    if (!isoDate) return 'Recently';
    const date = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mo ago`;
    return `${Math.floor(diffDays / 365)} yr ago`;
}

/**
 * Fetch and merge GitHub API repository data
 */
async function syncGitHubData() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const repos = await response.json();

        // Update live counts
        const repoMap = new Map();
        repos.forEach(repo => {
            repoMap.set(repo.name.toLowerCase(), repo);
        });

        // Augment curated records with live GitHub fields
        allProjects = allProjects.map(proj => {
            const liveRepo = repoMap.get(proj.repoName.toLowerCase());
            if (liveRepo) {
                return {
                    ...proj,
                    stars: liveRepo.stargazers_count ?? proj.stars,
                    forks: liveRepo.forks_count ?? 0,
                    sizeKb: liveRepo.size || proj.sizeKb,
                    updatedAt: liveRepo.updated_at || proj.updatedAt,
                    live: liveRepo.homepage || proj.live
                };
            }
            return proj;
        });

        // Update sync status indicator
        syncDot.className = 'sync-dot synced';
        syncText.textContent = 'Live GitHub Sync';
        syncStatusPill.title = `Synced with GitHub API (${repos.length} public repos verified)`;
    } catch (err) {
        // Graceful fallback to verified curated archive
        console.info('Aether Archive: Using verified local registry (GitHub API offline or rate-limited).', err.message);
        syncDot.className = 'sync-dot offline';
        syncText.textContent = 'Verified Registry';
        syncStatusPill.title = 'Serving verified curated local registry';
    }

    renderAll();
}

/**
 * Render Flagship Featured Cards
 */
function renderFeaturedCards() {
    const featuredProjects = allProjects.filter(p => p.featured);
    featuredCardsContainer.innerHTML = featuredProjects.map(p => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const liveBadge = p.live
            ? `<span class="featured-live-badge"><span class="live-pulse" aria-hidden="true"></span> Live Demo</span>`
            : '';

        const extLinks = [];
        if (p.live) {
            extLinks.push(`<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="ext-icon-link" aria-label="Visit live website for ${p.title}"><span>Live</span> <span aria-hidden="true">↗</span></a>`);
        }
        extLinks.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="ext-icon-link" aria-label="View ${p.title} repository on GitHub"><span>GitHub</span> <span aria-hidden="true">↗</span></a>`);

        return `
            <article class="featured-card" style="--card-accent: ${p.accentGradient}" data-project-id="${p.id}">
                <div class="featured-card-body">
                    <div class="featured-top">
                        <span class="featured-num">${p.featuredNumber}</span>
                        ${liveBadge}
                    </div>
                    <h3 class="featured-title">${p.title}</h3>
                    <p class="featured-desc">${p.description}</p>
                    <div class="featured-tech-wrap" aria-label="Technologies used">
                        ${p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                <div class="featured-actions">
                    <button type="button" class="case-study-btn" data-modal-trigger="${p.id}">
                        <span>Inspect Case Study</span>
                        <span aria-hidden="true">→</span>
                    </button>
                    <div class="featured-ext-links">
                        ${extLinks.join('')}
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Filter and sort projects
 */
function getFilteredAndSortedProjects() {
    return allProjects.filter(p => {
        // Category filter
        if (currentCategory === 'featured' && !p.featured) return false;
        if (currentCategory !== 'all' && currentCategory !== 'featured' && p.category !== currentCategory) return false;

        // Search query filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchTitle = p.title.toLowerCase().includes(q);
            const matchDesc = p.description.toLowerCase().includes(q);
            const matchStack = p.techStack.some(t => t.toLowerCase().includes(q));
            const matchLang = p.language.toLowerCase().includes(q);
            if (!matchTitle && !matchDesc && !matchStack && !matchLang) return false;
        }

        return true;
    }).sort((a, b) => {
        if (currentSort === 'recent') {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        if (currentSort === 'name') {
            return a.title.localeCompare(b.title);
        }
        if (currentSort === 'size') {
            return b.sizeKb - a.sizeKb;
        }
        // Curated default (featured first, then alphabetical)
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        return a.title.localeCompare(b.title);
    });
}

/**
 * Render Grid Cards View
 */
function renderGridView(projects) {
    if (!projects.length) {
        projectsGridContainer.innerHTML = '';
        return;
    }

    projectsGridContainer.innerHTML = projects.map(p => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const liveLink = p.live
            ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="card-link-btn" aria-label="Live Demo for ${p.title}"><span>Demo</span> <span aria-hidden="true">↗</span></a>`
            : '';

        return `
            <article class="project-card" data-project-id="${p.id}">
                <div class="card-header-row">
                    <span class="card-category">${p.categoryLabel}</span>
                    <span class="card-stars">
                        <span aria-hidden="true">★</span>
                        <span>${p.stars || 0}</span>
                    </span>
                </div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.description}</p>
                <div class="card-tech-row" aria-label="Tech tags">
                    ${p.techStack.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    ${p.techStack.length > 3 ? `<span class="tech-tag">+${p.techStack.length - 3}</span>` : ''}
                </div>
                <div class="card-footer-row">
                    <span class="card-lang">
                        <span class="lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                        <span>${p.language}</span>
                    </span>
                    <div class="card-links">
                        ${liveLink}
                        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-link-btn" aria-label="GitHub for ${p.title}"><span>Code</span> <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Render Ledger Table View
 */
function renderTableView(projects) {
    if (!projects.length) {
        projectsTableBody.innerHTML = '';
        return;
    }

    projectsTableBody.innerHTML = projects.map(p => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const liveBtn = p.live
            ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="ext-icon-link">Demo ↗</a>`
            : '';

        return `
            <tr data-project-id="${p.id}">
                <td>
                    <div class="table-project-cell">
                        <span class="table-title" data-modal-trigger="${p.id}">${p.title}</span>
                        <span class="table-desc">${p.description}</span>
                    </div>
                </td>
                <td><span class="modal-status-badge">${p.categoryLabel}</span></td>
                <td>
                    <div class="card-tech-row">
                        ${p.techStack.slice(0, 2).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <span class="card-lang">
                        <span class="lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                        <span>${p.language}</span>
                    </span>
                </td>
                <td style="font-family:'JetBrains Mono',monospace;font-size:0.8rem">
                    ${formatTimeAgo(p.updatedAt)}
                </td>
                <td class="table-actions-col">
                    <div class="table-links-wrap">
                        ${liveBtn}
                        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="ext-icon-link">Code ↗</a>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Update Metric Counts
 */
function updateCounts() {
    const countAll = allProjects.length;
    const countFeatured = allProjects.filter(p => p.featured).length;
    const countAi = allProjects.filter(p => p.category === 'ai').length;
    const countWeb = allProjects.filter(p => p.category === 'web').length;
    const countCivic = allProjects.filter(p => p.category === 'civic').length;
    const countCreative = allProjects.filter(p => p.category === 'creative').length;
    const liveDeployments = allProjects.filter(p => p.live).length;

    const elCountAll = document.getElementById('countAll');
    const elCountFeatured = document.getElementById('countFeatured');
    const elCountAi = document.getElementById('countAi');
    const elCountWeb = document.getElementById('countWeb');
    const elCountCivic = document.getElementById('countCivic');
    const elCountCreative = document.getElementById('countCreative');
    const elStatTotalRepos = document.getElementById('statTotalRepos');
    const elStatLiveDemos = document.getElementById('statLiveDemos');

    if (elCountAll) elCountAll.textContent = countAll;
    if (elCountFeatured) elCountFeatured.textContent = countFeatured;
    if (elCountAi) elCountAi.textContent = countAi;
    if (elCountWeb) elCountWeb.textContent = countWeb;
    if (elCountCivic) elCountCivic.textContent = countCivic;
    if (elCountCreative) elCountCreative.textContent = countCreative;
    if (elStatTotalRepos) elStatTotalRepos.textContent = countAll;
    if (elStatLiveDemos) elStatLiveDemos.textContent = liveDeployments;
}

/**
 * Render Complete UI
 */
function renderAll() {
    updateCounts();
    renderFeaturedCards();

    const filtered = getFilteredAndSortedProjects();

    directoryResultsCount.textContent = `Showing ${filtered.length} of ${allProjects.length} repositories`;

    if (filtered.length === 0) {
        archiveEmptyState.hidden = false;
        projectsGridContainer.hidden = true;
        projectsTableContainer.hidden = true;
    } else {
        archiveEmptyState.hidden = true;
        if (currentView === 'grid') {
            projectsGridContainer.hidden = false;
            projectsTableContainer.hidden = true;
            renderGridView(filtered);
        } else {
            projectsGridContainer.hidden = true;
            projectsTableContainer.hidden = false;
            renderTableView(filtered);
        }
    }
}

/**
 * Open Project Case Study Modal
 */
function openProjectModal(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

    modalCategory.textContent = project.categoryLabel;
    modalStatus.textContent = project.featured ? 'Flagship Artifact' : 'Standard Repository';
    modalProjectTitle.textContent = project.title;
    modalProjectDesc.textContent = project.description;

    const cs = project.caseStudy || {};

    let contentHtml = '';

    if (cs.story) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">The Vision & Context</h4>
                <p class="modal-section-p">${cs.story}</p>
            </div>
        `;
    }

    if (cs.problem) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Problem Statement</h4>
                <p class="modal-section-p">${cs.problem}</p>
            </div>
        `;
    }

    if (cs.architecture) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">System Architecture</h4>
                <p class="modal-section-p">${cs.architecture}</p>
            </div>
        `;
    }

    if (cs.challenges) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Key Engineering Challenges</h4>
                <p class="modal-section-p">${cs.challenges}</p>
            </div>
        `;
    }

    if (cs.impact) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Impact & Outcome</h4>
                <p class="modal-section-p">${cs.impact}</p>
            </div>
        `;
    }

    // Stack tags
    contentHtml += `
        <div class="modal-section">
            <h4 class="modal-section-title">Complete Technology Ecosystem</h4>
            <div class="modal-stack-tags">
                ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;

    modalProjectContent.innerHTML = contentHtml;

    // Action buttons
    const actions = [];
    if (project.live) {
        actions.push(`<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span>Launch Live Demo</span> <span aria-hidden="true">↗</span></a>`);
    }
    actions.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span>View GitHub Source</span> <span aria-hidden="true">↗</span></a>`);

    modalProjectActions.innerHTML = actions.join('');

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
}

/**
 * Close Modal
 */
function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/**
 * Attach Event Listeners
 */
function attachEvents() {
    // Filter chip click
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
            currentCategory = chip.dataset.category;
            renderAll();
        });
    });

    // View toggle
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderAll();
        });
    });

    // Search input with debounce
    let debounceTimer;
    archiveSearchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value.trim();
        archiveSearchClear.hidden = searchQuery.length === 0;
        debounceTimer = setTimeout(() => {
            renderAll();
        }, 150);
    });

    // Clear search button
    archiveSearchClear.addEventListener('click', () => {
        archiveSearchInput.value = '';
        searchQuery = '';
        archiveSearchClear.hidden = true;
        renderAll();
        archiveSearchInput.focus();
    });

    // Reset filters
    resetFiltersBtn.addEventListener('click', () => {
        searchQuery = '';
        archiveSearchInput.value = '';
        archiveSearchClear.hidden = true;
        currentCategory = 'all';
        filterChips.forEach(c => {
            const isAll = c.dataset.category === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        currentSort = 'curated';
        archiveSortSelect.value = 'curated';
        renderAll();
    });

    // Sort select
    archiveSortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderAll();
    });

    // Modal click triggers (delegated on containers)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-trigger]');
        if (trigger) {
            e.preventDefault();
            const projId = trigger.dataset.modalTrigger;
            openProjectModal(projId);
            return;
        }

        const card = e.target.closest('.project-card');
        if (card && !e.target.closest('a')) {
            const projId = card.dataset.projectId;
            openProjectModal(projId);
        }
    });

    // Close modal on backdrop or close button
    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalBackdrop.addEventListener('click', closeProjectModal);

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape closes modal
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }

        // '/' focuses search bar when not typing in an input
        if (e.key === '/' && document.activeElement !== archiveSearchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            archiveSearchInput.focus();
        }
    });
}

/**
 * Initialize Aether Archive
 */
function initArchive() {
    renderAll();
    attachEvents();
    syncGitHubData();
}

// Boot on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArchive);
} else {
    initArchive();
}
