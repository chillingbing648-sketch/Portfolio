/**
 * AETHER ARCHIVE — CENTRALIZED PROJECT REGISTRY
 * Verified Project Data Source for all 17 public repositories of chillingbing648-sketch
 *
 * Schema:
 * - id: unique slug
 * - name: exact GitHub repository name
 * - title: polished display title
 * - description: concise, one-sentence verified purpose
 * - technologies: verified technology stack
 * - sourceUrl: verified GitHub repository URL
 * - liveUrl: verified HTTP 200 live deployment URL (or null if none)
 * - previewImage: artwork key / identifier
 * - readmeUrl: direct GitHub raw README URL
 * - featured: featured in 3D Spatial Carousel
 * - category: domain taxonomy ('civic' | 'ai' | 'web' | 'creative')
 * - categoryLabel: human-readable category name
 * - language: primary code language from GitHub
 * - theme: dynamic atmosphere color tokens
 * - caseStudy: structured narrative for expanded project view
 */

export const PROJECTS_DATA = [
  {
    id: 'kaamkaagaz',
    name: 'KaamKaagaz',
    title: 'KaamKaagaz — Civic Tech & Admissions Platform',
    description: 'A multilingual civic-tech platform transforming Indian government paperwork and college admissions into structured step-by-step guidance.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'localStorage'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/KaamKaagaz',
    liveUrl: 'https://chillingbing648-sketch.github.io/KaamKaagaz/',
    previewImage: 'kaamkaagaz',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/KaamKaagaz/main/README.md',
    featured: true,
    carouselIndex: 0,
    category: 'civic',
    categoryLabel: 'Civic & Education',
    language: 'TypeScript',
    sizeKb: 2257,
    updatedAt: '2026-10-15T05:47:55Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#ea580c',
      secondary: '#fbbf24',
      deep: '#0e0a05',
      glow: 'rgba(234, 88, 12, 0.4)'
    },
    artworkKey: 'kaamkaagaz',
    caseStudy: {
      story: 'Government paperwork and university admissions in India are fraught with friction from contradictory requirements across outdated portals. Having managed university admissions logistics firsthand as an IT Specialist at University of Mumbai, I saw hundreds of students overwhelmed by confusing procedures. I built KaamKaagaz to turn that anxiety into a clean, transparent roadmap from question to official submission.',
      problem: 'Critical guidance for essential documents (income certificates, domicile, caste validity, PAN) and admissions (FYJC, CET Cell/CAP, Mumbai University Samarth) is fragmented, laden with bureaucratic jargon, and inaccessible in regional languages.',
      architecture: 'Architected with Next.js 15 (App Router), React 19, and TypeScript as a static-exported civic engine deployed via GitHub Actions. Features a deterministic, privacy-first client-side search engine normalizing natural Hinglish queries without remote API latency or user tracking. Includes localized schemas across English, हिन्दी, and मराठी.',
      challenges: 'Structuring complex multi-stage bureaucratic workflows into unambiguous state machines. Designing an instant conversational search matcher handling Hinglish and regional terminology deterministically on client side.',
      impact: 'Empowered students and citizens with self-serve clarity across essential government documentation and higher-education admission portals.',
      lessons: 'Civic technology must prioritize trust, transparency, and accessibility over algorithmic obscurity. Simple client-side architecture often serves citizens far better than fragile microservices.'
    }
  },
  {
    id: 'walle',
    name: 'WALL-E',
    title: 'WALL-E — Mental Health AI Companion App',
    description: 'A gentle, client-side AI wellness companion for mood check-ins, guided reflection, and habit tracking with zero cloud data storage.',
    technologies: ['JavaScript', 'AI Integration', 'Mood Analytics', 'Web Audio', 'localStorage'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/WALL-E',
    liveUrl: 'https://chillingbing648-sketch.github.io/WALL-E/',
    previewImage: 'walle',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/WALL-E/main/README.md',
    featured: true,
    carouselIndex: 1,
    category: 'ai',
    categoryLabel: 'AI & Intelligence',
    language: 'JavaScript',
    sizeKb: 156272,
    updatedAt: '2026-10-10T19:43:23Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      deep: '#0b0412',
      glow: 'rgba(236, 72, 153, 0.4)'
    },
    artworkKey: 'walle',
    caseStudy: {
      story: 'WALL-E began with a simple idea: create a calm, private space where a person can pause, reflect, and build a more consistent emotional check-in habit without the anxiety of clinical interfaces.',
      problem: 'Daily stress is easy to overlook until it compounds. People need a low-friction way to capture how they feel, reflect on patterns, and find supportive prompts without replacing professional care.',
      architecture: 'Built as a responsive AI companion experience with guided check-ins, journal prompts, mood history, and contextual conversation flows. The product keeps personal reflection at the center and ensures all diary data remains completely private to the user\'s browser.',
      challenges: 'Designing language that feels empathetic and supportive without making clinical claims. Protecting user privacy through strict client-side persistence.',
      impact: 'Created a gentle daily reflection experience that helps users notice emotional patterns and make space for intentional self-care.',
      lessons: 'Empathy must shape every interaction. Mental-health-related tools require clear ethical boundaries, privacy-first storage, and instant accessibility.'
    }
  },
  {
    id: 'continuity',
    name: 'Continuity',
    title: 'Continuity — Financial Legacy Vault',
    description: 'A personal financial continuity vault for organizing, safeguarding, and securely delegating family assets, wills, and estate records.',
    technologies: ['React', 'JavaScript', 'Access Control', 'Data Security', 'Responsive UI'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Continuity',
    liveUrl: 'https://continuity-react.vercel.app/',
    previewImage: 'continuity',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Continuity/main/README.md',
    featured: true,
    carouselIndex: 2,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'JavaScript',
    sizeKb: 11858,
    updatedAt: '2026-09-25T14:30:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#10b981',
      secondary: '#059669',
      deep: '#020e0a',
      glow: 'rgba(16, 185, 129, 0.4)'
    },
    artworkKey: 'continuity',
    caseStudy: {
      story: 'A secure digital legacy platform designed to bring wills, investments, assets, estates, and critical family records together in one trusted place. Continuity focuses on making personal legacies organized and securely shareable.',
      problem: 'Financial and legacy information is scattered across banks, brokerages, and filing cabinets. Families often struggle to know what exists or how to access it when unexpected emergencies occur.',
      architecture: 'Built a centralized digital vault enabling users to catalog assets, policy numbers, and estate documents with role-based access control and conditional beneficiary release triggers.',
      challenges: 'Balancing ease-of-use with enterprise-grade privacy and zero-knowledge data structuring. Designing intuitive family notification workflows.',
      impact: 'Created a unified digital repository for organizing lifelong estates, giving families peace of mind and structured access.',
      lessons: 'The best digital systems simplify complexity without compromising trust. Preserving a legacy is about ensuring information reaches the right people at the right time.'
    }
  },
  {
    id: 'attendify',
    name: 'Attendify',
    title: 'Attendify — Attendance Analytics Platform',
    description: 'An offline-first attendance administration platform for batch tracking, threshold forecasting, and academic lecture analytics.',
    technologies: ['JavaScript', 'Node.js', 'C++', 'Analytics', 'JSON Storage'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Attendify',
    liveUrl: 'https://sy-it.netlify.app/',
    previewImage: 'attendify',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Attendify/main/README.md',
    featured: true,
    carouselIndex: 3,
    category: 'civic',
    categoryLabel: 'Civic & Education',
    language: 'JavaScript',
    sizeKb: 233,
    updatedAt: '2026-10-01T20:04:09Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#3b82f6',
      secondary: '#06b6d4',
      deep: '#040914',
      glow: 'rgba(59, 130, 246, 0.4)'
    },
    artworkKey: 'attendify',
    caseStudy: {
      story: 'A problem I experienced firsthand in university — no fast, dependable tool to track attendance across multiple subjects with varying minimum thresholds. Spreadsheets were fragile, and existing apps were bloated with ads.',
      problem: 'Students must maintain minimum attendance percentages (75%) across multiple disciplines simultaneously, needing to know exactly how many lectures they can safely miss or need to attend.',
      architecture: 'Engineered with C++ core calculation algorithms for fast projections, wrapped with a Node.js REST API layer and dynamic client-side dashboard with live forecast visualizers.',
      challenges: 'Bridging compiled C++ computational logic with asynchronous web services and syncing user state reliably without high authentication friction.',
      impact: 'Eliminated spreadsheet dependency for student attendance records with instantaneous safe-to-skip forecasts.',
      lessons: 'Build the tool you need directly. Combining compiled speed with responsive web frontends delivers unmatched user satisfaction.'
    }
  },
  {
    id: 'saviorai',
    name: 'SaviorAI',
    title: 'SaviorAI — Intelligent Safety Platform',
    description: 'An emergency safety intelligence application featuring AI injury assessment, deterministic safety gates, and rapid triage escalation.',
    technologies: ['React', 'TypeScript', 'Vite', 'Gemini AI', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/SaviorAI',
    liveUrl: 'https://chillingbing648-sketch.github.io/SaviorAI/',
    previewImage: 'saviorai',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/SaviorAI/main/README.md',
    featured: true,
    carouselIndex: 4,
    category: 'ai',
    categoryLabel: 'AI & Intelligence',
    language: 'TypeScript',
    sizeKb: 792,
    updatedAt: '2026-09-22T10:00:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#a855f7',
      secondary: '#c084fc',
      deep: '#0c0418',
      glow: 'rgba(168, 85, 247, 0.4)'
    },
    artworkKey: 'saviorai',
    caseStudy: {
      story: 'Built to provide immediate, reliable guidance during critical home and workplace physical injury incidents when every second counts.',
      problem: 'In emergency or injury situations, panicked individuals often turn to generic search engines, receiving conflicting, unvetted, or dangerous advice.',
      architecture: 'Engineered with React and TypeScript using structured safety gate heuristics, deterministic local triage protocols, and integrated Gemini AI models for multi-turn conversational guidance.',
      challenges: 'Enforcing strict safety guardrails around medical terminology and ensuring offline fallback capability during connectivity loss.',
      impact: 'Provided a calm, accessible first-response interface delivering verified triage steps and emergency contact routing.',
      lessons: 'Safety applications must put deterministic boundaries first before delegating to probabilistic generative models.'
    }
  },
  {
    id: 'psych-study',
    name: 'Psych-Study',
    title: 'Psych-Study — AI Psychology Study Companion',
    description: 'An AI-powered psychology study companion offering adaptive recall quizzes, structured flashcards, and exam preparation workflows.',
    technologies: ['JavaScript', 'Adaptive Learning', 'Active Recall', 'HTML5', 'CSS3'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Psych-Study',
    liveUrl: 'https://chillingbing648-sketch.github.io/Psych-Study/',
    previewImage: 'psychstudy',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Psych-Study/main/README.md',
    featured: true,
    carouselIndex: 5,
    category: 'ai',
    categoryLabel: 'AI & Intelligence',
    language: 'JavaScript',
    sizeKb: 210,
    updatedAt: '2026-09-04T12:00:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#f43f5e',
      secondary: '#fb923c',
      deep: '#120409',
      glow: 'rgba(244, 63, 94, 0.4)'
    },
    artworkKey: 'psychstudy',
    caseStudy: {
      story: 'Conceived during intensive psychology coursework to decompose dense psychological models, diagnostic criteria, and theories into active recall quizzes and spaced repetition flashcards.',
      problem: 'Psychology syllabi involve vast conceptual taxonomies that passive reading fails to consolidate effectively for exams.',
      architecture: 'Client-side study engine that ingests structured study units, auto-generating interactive multiple-choice recall challenges, self-test flashcards, and retention trackers.',
      challenges: 'Parsing educational notes into structured question-answer pairs and providing instant diagnostic feedback.',
      impact: 'Streamlined exam preparation with automated recall tools and concise concept summaries.',
      lessons: 'Active retrieval practice drastically outperforms passive rereading in complex behavioral science subjects.'
    }
  },
  {
    id: 'aerion',
    name: 'Aerion',
    title: 'Aerion — Spatial Interface & Matter Lab',
    description: 'A real-time spatial web interface where gesture interactions shape an interactive physical field of light, particles, and kinetic motion.',
    technologies: ['TypeScript', 'WebGL', 'Spatial Computing', 'Vite', 'Canvas API'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Aerion',
    liveUrl: 'https://chillingbing648-sketch.github.io/Aerion/',
    previewImage: 'aerion',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Aerion/main/README.md',
    featured: true,
    carouselIndex: 6,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'TypeScript',
    sizeKb: 72,
    updatedAt: '2026-10-10T18:22:54Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#38bdf8',
      secondary: '#818cf8',
      deep: '#030712',
      glow: 'rgba(56, 189, 248, 0.4)'
    },
    artworkKey: 'aerion',
    caseStudy: {
      story: 'Aerion explores the boundary between code, light, and physical gesture, transforming flat screen surfaces into a responsive, living digital fabric.',
      problem: 'Modern web interfaces are predominantly flat, rectangular, and static, rarely taking advantage of fluid spatial physics or organic gesture inputs.',
      architecture: 'Built in strict TypeScript with high-performance Canvas and WebGL shaders, calculating multi-point physics grids and kinetic light deformation at 60 FPS.',
      challenges: 'Maintaining consistent 60 FPS particle simulation across mobile GPUs while processing high-frequency pointer and touch coordinates.',
      impact: 'Pioneered an experimental spatial design playground demonstrating tactile, organic digital interactions.',
      lessons: 'Code is a creative expressive canvas. Math and physics algorithms create digital experiences that feel truly organic.'
    }
  },
  {
    id: 'as-you-wish',
    name: 'As-you-wish',
    title: 'As You Wish — Local-First Creative Notebook',
    description: 'A playful, local-first digital notebook and infinite creative canvas for freely arranging thoughts, notes, and visual fragments.',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'Local-First Storage'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/As-you-wish',
    liveUrl: 'https://chillingbing648-sketch.github.io/As-you-wish/',
    previewImage: 'asyouwish',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/As-you-wish/main/README.md',
    featured: true,
    carouselIndex: 7,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'TypeScript',
    sizeKb: 372,
    updatedAt: '2026-09-09T08:00:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#f472b6',
      secondary: '#c084fc',
      deep: '#100412',
      glow: 'rgba(244, 114, 182, 0.4)'
    },
    artworkKey: 'asyouwish',
    caseStudy: {
      story: 'Conceived as an antidote to rigid, hyper-structured note-taking tools, As You Wish gives users an infinite, delightful canvas to think visually.',
      problem: 'Traditional document processors force thoughts into linear columns, discouraging spontaneous connections, visual doodles, and organic clustering.',
      architecture: 'Engineered with React 19, TypeScript, and Zustand for snappy state management, featuring infinite pan-zoom canvas coordinates and instantaneous local persistence.',
      challenges: 'Implementing smooth infinite canvas transformations with zero layout thrashing on touch and trackpad pinch gestures.',
      impact: 'Created a personal thinking space where creative ideas, tasks, and media fragments coexist with effortless delight.',
      lessons: 'Local-first architecture guarantees instant responsiveness and permanent user ownership of their thoughts.'
    }
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    title: 'Aether — The Digital Universe Portfolio',
    description: 'The flagship personal digital universe engineered with a custom WebGL 2 particle engine, GLSL shaders, terminal shell, and zero layout shift.',
    technologies: ['JavaScript', 'WebGL 2', 'GLSL Shaders', 'GSAP', 'Lenis Scroll', 'Vite'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Portfolio',
    liveUrl: 'https://harshportfolio404.netlify.app/',
    previewImage: 'portfolio',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Portfolio/main/README.md',
    featured: true,
    carouselIndex: 8,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'JavaScript',
    sizeKb: 14727,
    updatedAt: '2026-10-15T20:30:25Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#6366f1',
      secondary: '#06b6d4',
      deep: '#03030c',
      glow: 'rgba(99, 102, 241, 0.4)'
    },
    artworkKey: 'portfolio',
    caseStudy: {
      story: 'Engineered from the ground up to redefine what an engineer\'s portfolio can be — an immersive, living universe that tells a cohesive story of creativity, artificial intelligence, and software craftsmanship.',
      problem: 'Most developer portfolios are static templates or boilerplate card grids that fail to convey authentic technical depth and creative vision.',
      architecture: 'Custom raw WebGL 2 particle canvas engine written in pure GLSL shader code without Three.js overhead. Orchestrated with Lenis smooth scroll, GSAP reveals, and an in-browser Unix-like terminal shell.',
      challenges: 'Achieving flawless 60–120 FPS graphics while strictly preserving zero-layout-shift (CLS = 0) and high Core Web Vitals across low-powered mobile devices.',
      impact: 'Delivers an unforgettable first impression to recruiters, collaborators, and tech leaders worldwide.',
      lessons: 'True engineering excellence lies in balancing artistic wonder with uncompromising performance, reliability, and accessibility.'
    }
  },
  {
    id: 'invite',
    name: 'Invite',
    title: 'Invite — Cinematic Digital Invitation',
    description: 'A cinematic scroll-driven digital invitation experience featuring botanical animations, venue guidance, and real-time RSVP capture.',
    technologies: ['JavaScript', 'Vercel', 'Scroll Animations', 'RSVP Engine', 'CSS3'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Invite',
    liveUrl: 'https://invite-six-liard.vercel.app',
    previewImage: 'invite',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Invite/main/README.md',
    featured: true,
    carouselIndex: 9,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'JavaScript',
    sizeKb: 1208,
    updatedAt: '2026-09-16T15:00:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#f59e0b',
      secondary: '#f97316',
      deep: '#140a02',
      glow: 'rgba(245, 158, 11, 0.4)'
    },
    artworkKey: 'invite',
    caseStudy: {
      story: 'Designed to replace clumsy static invitations with a living, scroll-driven digital experience combining traditional cultural art with modern web motion.',
      problem: 'Traditional invites lack interactivity, real-time RSVP feedback, venue mapping, and dynamic itinerary countdowns.',
      architecture: 'Hosted on Vercel Edge with instantaneous load times, responsive interactive countdown, map integration, and digital RSVP confirmation.',
      challenges: 'Ensuring zero-layout shift on mobile cellular networks during guest arrivals while delivering rich visual ambiance.',
      impact: 'Streamlined event coordination with live attendee confirmations and elegant design.',
      lessons: 'Event software must be bulletproof on mobile screens and load in under 1 second.'
    }
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    title: 'Pomodoro — Deep Work Productivity Timer',
    description: 'A distraction-free productivity workspace combining custom Pomodoro intervals, Spotify study streams, task checklists, and ambient soundscapes.',
    technologies: ['JavaScript', 'Web Audio API', 'Spotify Embed', 'localStorage', 'CSS Grid'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Pomodoro',
    liveUrl: 'https://chillingbing648-sketch.github.io/Pomodoro/',
    previewImage: 'pomodoro',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Pomodoro/main/README.md',
    featured: true,
    carouselIndex: 10,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'JavaScript',
    sizeKb: 204,
    updatedAt: '2026-09-27T10:00:00Z',
    stars: 0,
    forks: 0,
    theme: {
      primary: '#ef4444',
      secondary: '#f87171',
      deep: '#120404',
      glow: 'rgba(239, 68, 68, 0.4)'
    },
    artworkKey: 'pomodoro',
    caseStudy: {
      story: 'Built to overcome productivity friction during intense coding marathons, combining visual rhythm with acoustic milestone signals and ambient study sounds.',
      problem: 'Generic timer apps often distract with complex configuration menus, intrusive ads, and clunky interfaces.',
      architecture: 'Precision JavaScript interval engine with tab title time synchronizer, background sound cues, and persistent session counters.',
      challenges: 'Handling background tab timer drift caused by browser power-saving interval throttling.',
      impact: 'Used daily as a personal productivity companion during university software development cycles.',
      lessons: 'A single, well-executed utility beats complex, feature-heavy alternatives every time.'
    }
  },
  {
    id: 'my-little-universe',
    name: 'My-Little-Universe',
    title: 'My-Little-Universe — Pure CSS Planetary Mechanics',
    description: 'A private cinematic interactive solar system and memory keepsake crafted entirely with pure CSS 3D transforms and keyframe mechanics.',
    technologies: ['CSS3 3D Transforms', 'Keyframe Animations', 'HTML5', 'Audio Integration'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/My-Little-Universe',
    liveUrl: 'https://chillingbing648-sketch.github.io/My-Little-Universe/',
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/My-Little-Universe/main/README.md',
    featured: false,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'CSS',
    sizeKb: 15882,
    updatedAt: '2026-09-23T11:00:00Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'A creative coding experiment pushing the absolute limits of CSS3 3D transforms, nested coordinate systems, and astronomical orbit math.',
      problem: 'Rendering multi-tier orbital mechanics typically requires Canvas or WebGL libraries that introduce heavy script runtimes.',
      architecture: 'Engineered using zero JavaScript for animation; utilizes pure CSS transform-style: preserve-3d, nested orbital rings, and parametric timing functions.',
      challenges: 'Achieving accurate rotational velocity scaling across concentric planetary spheres purely through CSS keyframes.',
      impact: 'Demonstrated creative CSS mastery, achieving high-performance 60fps stellar motion on low-powered hardware.',
      lessons: 'The native capabilities of modern CSS can achieve breathtaking visual art without executing a single line of JavaScript.'
    }
  },
  {
    id: 'only-for-her',
    name: 'Only-For-Her',
    title: 'Only-For-Her — Romantic Interactive Journey',
    description: 'An intimate interactive web keepsake and anniversary narrative weaving together photographs, personal reflections, and custom music.',
    technologies: ['React', 'CSS3', 'Interactive Storytelling', 'Audio Elements'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Only-For-Her',
    liveUrl: 'https://chillingbing648-sketch.github.io/Only-For-Her/',
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Only-For-Her/main/README.md',
    featured: false,
    category: 'creative',
    categoryLabel: 'Creative & Systems',
    language: 'CSS',
    sizeKb: 79986,
    updatedAt: '2026-10-14T05:17:08Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'Crafted as a custom digital anniversary celebration, weaving together photographs, reflections, and milestones into an interactive timeline.',
      problem: 'Standard social media tributes lack privacy, permanence, and bespoke creative engineering.',
      architecture: 'Built with smooth chapter reveals, atmospheric particle drift, and interactive keepsake elements.',
      challenges: 'Crafting heartfelt micro-interactions that feel warm and respectful without visual clutter.',
      impact: 'A cherished personal digital creation exemplifying code as a medium for emotional expression.',
      lessons: 'Software engineering is at its most powerful when it touches human hearts and commemorates meaningful milestones.'
    }
  },
  {
    id: 'rcgsc',
    name: 'RCGSC',
    title: 'RCGSC — Community Services Platform',
    description: 'A community engagement web platform built for Rotaract Club of Ghanshyamdas Saraf College featuring event registries and youth service directories.',
    technologies: ['React', 'JavaScript', 'Responsive UI', 'Component Architecture'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/RCGSC',
    liveUrl: 'https://chillingbing648-sketch.github.io/RCGSC/',
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/RCGSC/main/README.md',
    featured: false,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'JavaScript',
    sizeKb: 18814,
    updatedAt: '2026-10-06T17:32:49Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'Developed to bridge community organizations with their constituents, providing a central digital noticeboard and services catalog.',
      problem: 'Important updates, schedules, and service directories are frequently lost in cluttered messaging groups.',
      architecture: 'Engineered with client-side resource filters, structured directories, and accessible navigation schemes.',
      challenges: 'Organizing deep category hierarchies into an intuitive mobile-friendly layout.',
      impact: 'Centralized community notices, reducing redundant administrative inquiries.',
      lessons: 'Clear visual hierarchy and robust search capabilities are essential for community portals.'
    }
  },
  {
    id: 'benchwarmers',
    name: 'BenchWarmers',
    title: 'BenchWarmers — Football Training Hub',
    description: 'A modern football training web application helping players learn tactics, follow structured drills, and track individual development.',
    technologies: ['JavaScript', 'Sports Analytics', 'Interactive UI', 'HTML5'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/BenchWarmers',
    liveUrl: null, // Note: Previous Vercel link 404s; strictly verified
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/BenchWarmers/main/README.md',
    featured: false,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'JavaScript',
    sizeKb: 164,
    updatedAt: '2026-03-15T18:00:00Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'Created as a training hub for amateur and developing football players to practice tactical drills, review positions, and record skill progress.',
      problem: 'Grassroots football players frequently lack access to structured drill libraries and tactical boards to develop game understanding.',
      architecture: 'Engineered using clean vanilla JavaScript components, dynamic drills filtering, and interactive tactical pitch layouts.',
      challenges: 'Designing responsive sports tactical diagrams that remain crisp on mobile devices during pitch-side training.',
      impact: 'Delivered an accessible training companion for grassroots football enthusiasts.',
      lessons: 'Lightweight web applications provide immense utility when tailored to specific athletic training routines.'
    }
  },
  {
    id: 'mensware',
    name: 'MENSWARE',
    title: 'MENSWARE — Men\'s Accessories Storefront & API',
    description: 'A full-stack men\'s accessories e-commerce platform with an Express and MongoDB commerce API, customer authentication, and cart workflows.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/MENSWARE',
    liveUrl: null, // Full-stack backend repository; no live deployment
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/MENSWARE/main/README.md',
    featured: false,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'JavaScript',
    sizeKb: 8443,
    updatedAt: '2026-10-03T21:14:47Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'An exploration into production-oriented e-commerce backend engineering, featuring authenticated sessions, inventory management, and checkout flows.',
      problem: 'Building robust commerce backends requires handling concurrent shopping carts, stock levels, order validation, and secure authentication.',
      architecture: 'Developed with Node.js, Express, and MongoDB, providing a RESTful API layer for customer management, product querying, and order processing.',
      challenges: 'Structuring MongoDB data schemas for scalable product variations and secure token-based user authentication.',
      impact: 'Showcased full-stack commercial backend architecture and database modeling for retail systems.',
      lessons: 'E-commerce dependability hinges on rigorous schema validation and idempotent transaction processing.'
    }
  },
  {
    id: 'pawfect-care',
    name: 'Pawfect-care',
    title: 'Pawfect-care — Pet Welfare & Adoption Portal',
    description: 'A responsive pet welfare and community adoption portal connecting rescue animals with prospective adoptive families.',
    technologies: ['HTML5', 'CSS3', 'Responsive Layout', 'Semantic Web'],
    sourceUrl: 'https://github.com/chillingbing648-sketch/Pawfect-care',
    liveUrl: null, // Static web project; no live deployment
    previewImage: 'generic',
    readmeUrl: 'https://raw.githubusercontent.com/chillingbing648-sketch/Pawfect-care/main/README.md',
    featured: false,
    category: 'web',
    categoryLabel: 'Web Platforms',
    language: 'HTML',
    sizeKb: 4100,
    updatedAt: '2026-04-07T12:00:00Z',
    stars: 0,
    forks: 0,
    caseStudy: {
      story: 'One of my foundational web engineering projects, built to explore semantic layout construction and accessible design for pet rescue organizations.',
      problem: 'Animal shelters often struggle to communicate adoption prerequisites and pet profiles clearly to prospective pet parents.',
      architecture: 'Structured semantic HTML5 documents, card-based pet profiles, and mobile-friendly intake request forms.',
      challenges: 'Implementing accessible responsive grids before modern CSS grid became widely ubiquitous in mobile browsers.',
      impact: 'Served as a foundational stepping stone in mastering core web accessibility and semantic markup.',
      lessons: 'Never forget where you started. Foundational mastery of HTML semantics is the bedrock of world-class web development.'
    }
  }
];
