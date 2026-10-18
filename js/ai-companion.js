/**
 * js/ai-companion.js
 * Aether — Portfolio Companion (Interactive Assistant)
 *
 * Implements:
 * - Dynamic data hydration from verified canonical JSON datasets with inline fallbacks
 * - Strict factual accuracy (zero hallucinated stats/roles/metrics)
 * - Robust intent matching with synonym expansion and typo/fuzzy tolerance
 * - Multi-turn conversational context tracking & dynamic contextual chips
 * - 100% safe DOM rendering (no raw innerHTML or script execution)
 * - Safe internal anchor navigation (#projects, #contact, #skills) & external links
 * - Textarea with Enter-to-send and Shift+Enter for newlines (300-char max cap)
 * - Double-submission prevention during simulated thinking cycle
 * - Focus management (trap while open, restore on close, Esc to close)
 * - Smart auto-scroll that never interrupts manual history reading
 * - Working conversation reset (↺)
 * - Expressive animated eye tracking preserving the Aether universe identity
 */

import { fetchJson } from './utils.js';

/* ==========================================================================
   CANONICAL DATASETS & INLINE VERIFIED FALLBACKS
   ========================================================================== */

const PORTFOLIO_META = Object.freeze({
    name: 'Harsh Dubey',
    location: 'Mumbai, India',
    email: 'harshdubey.works@gmail.com',
    phone: '+91 9321521258',
    github: 'https://github.com/chillingbing648-sketch',
    linkedin: 'https://www.linkedin.com/in/harsh-dubey-640a68389/',
    resumePdf: 'Harsh_Resume.pdf',
    cgpa: '9.50',
    college: 'Thakur Specialised Degree College',
    degree: 'BSc Information Technology',
    about: "Harsh Dubey is a developer and student in Mumbai driven by curiosity, analytical precision, and engineering discipline. He bridges creative frontends (WebGL, custom GLSL shaders, GSAP motion) with practical full-stack and AI systems (REST APIs, C++, Node.js, prompt engineering, LLM integrations)."
});

// Fallback datasets mirroring canonical data/*.json files
const FALLBACK_PROJECTS = [
    {
        id: 'modal-kaamkaagaz',
        title: 'KaamKaagaz — Civic Tech & Admissions Platform',
        tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
        description: 'A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.',
        github: 'https://github.com/chillingbing648-sketch/KaamKaagaz.git',
        live: 'https://chillingbing648-sketch.github.io/KaamKaagaz/',
        caseStudy: {
            problem: 'Critical guidance for essential documents and higher-education admissions is fragmented across disconnected portals and bureaucratic jargon.',
            architecture: 'Next.js 15 App Router static export with deterministic client-side search across English, Hindi, and Marathi, plus persistent local browser checklists.',
            impact: 'Self-serve roadmaps, fee/timeline disclosures, and zero-tracking privacy for students and citizens.'
        }
    },
    {
        id: 'modal-attendify',
        title: 'Attendify — Attendance Platform',
        tech: ['C++', 'Node.js', 'JSON'],
        description: 'A highly organized web-based platform for structured attendance data tracking with real-time analytics and predictive threshold forecasting.',
        github: 'https://github.com/chillingbing648-sketch/Attendify.git',
        live: 'https://chillingbing648-sketch.github.io/Attendify/',
        caseStudy: {
            problem: 'Students need to maintain attendance thresholds across 5-8 subjects simultaneously without brittle spreadsheets.',
            architecture: 'C++ core logic wrapped in a Node.js API layer with real-time dashboard analytics and "safe to skip" forecasting calculations.',
            impact: 'Eliminated manual spreadsheet tracking and provided immediate visibility into academic standing.'
        }
    },
    {
        id: 'modal-sustainable',
        title: 'Continuity — Financial Sustainability Vault',
        tech: ['AI Integration', 'React', 'Data Analysis'],
        description: 'A secure digital legacy platform bringing wills, investments, assets, estates, and important documents into one trusted place with controlled access.',
        github: 'https://github.com/chillingbing648-sketch/Continuity.git',
        live: 'https://chillingbing648-sketch.github.io/Continuity/',
        caseStudy: {
            problem: 'Critical financial and legacy records are scattered across institutions, making them difficult for families to locate when needed.',
            architecture: 'Centralized platform for asset tracking with role-based access control and designated family notifications.',
            impact: 'Organized personal legacy management with privacy-first boundaries.'
        }
    },
    {
        id: 'modal-chatbot',
        title: 'WALL-E — Mental Health AI Companion App',
        tech: ['JavaScript', 'AI Integration', 'Local Storage', 'Responsive Design'],
        description: 'A supportive AI companion for mood check-ins, guided journaling, and reflective conversations designed for daily wellness habits with clear boundaries.',
        github: 'https://github.com/chillingbing648-sketch/WALL-E.git',
        live: 'https://chillingbing648-sketch.github.io/WALL-E/',
        caseStudy: {
            problem: 'Low-friction reflection is needed to manage compounding daily stress without pretending to replace professional medical care.',
            architecture: 'Responsive client-side companion with mood check-ins, guided prompts, and local storage privacy.',
            impact: 'Gentle, private emotional reflection tool with clear boundary guidelines.'
        }
    }
];

const FALLBACK_SKILLS = [
    {
        category: 'Frontend',
        items: [
            { name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript ES6+' },
            { name: 'TypeScript' }, { name: 'React' }, { name: 'Next.js' },
            { name: 'TailwindCSS' }, { name: 'Three.js' }, { name: 'WebGL' },
            { name: 'Responsive Design' }, { name: 'Accessibility' }
        ]
    },
    {
        category: 'Backend & Databases',
        items: [
            { name: 'Node.js' }, { name: 'Java' }, { name: 'Express.js' },
            { name: 'REST APIs' }, { name: 'Data Structures' }, { name: 'MySQL' },
            { name: 'MongoDB' }, { name: 'Firebase' }, { name: 'Supabase' }
        ]
    },
    {
        category: 'AI & Intelligence',
        items: [
            { name: 'Prompt Engineering' }, { name: 'OpenAI APIs' },
            { name: 'Claude APIs' }, { name: 'AI Agents' }
        ]
    },
    {
        category: 'DevOps & Architecture',
        items: [
            { name: 'Git & GitHub' }, { name: 'Vercel' }, { name: 'Netlify' }, { name: 'CI/CD' }
        ]
    },
    {
        category: 'Soft Skills',
        items: [
            { name: 'Leadership' }, { name: 'Public Speaking' }, { name: 'Teamwork' },
            { name: 'Critical Thinking' }, { name: 'Decision Making' }, { name: 'Adaptability' }
        ]
    }
];

const FALLBACK_EXPERIENCE = [
    {
        title: 'IT Specialist',
        organization: 'University of Mumbai',
        description: 'Managing end-to-end technical operations, university admission digital logistics, and system administration for large-scale academic workflows. Maintaining data integrity across institutional systems.',
        chips: ['Technical Support', 'System Administration', 'Admission Operations', 'Process Optimization']
    },
    {
        title: 'Public Relations Head',
        organization: 'Thakur Specialized Degree College',
        description: 'Spearheaded student leadership initiatives, public policy coordination, event leadership, and student advocacy. Led PR strategy for an intercollegiate fest attracting 2,000+ attendees and 1,000+ registrations.',
        chips: ['Leadership', 'Event Leadership', 'Team Management', 'Public Speaking']
    },
    {
        title: 'Chief Minister',
        organization: 'Student Parliament Initiative — Career Katta, Government of Maharashtra & MITSC',
        description: 'Served as Chief Minister of the Student Parliament initiative, leading student representatives and driving programs focused on student development, civic engagement, and collaborative decision-making.',
        chips: ['Student Leadership', 'Civic Engagement', 'Strategic Planning']
    }
];

const FALLBACK_ACHIEVEMENTS = [
    {
        title: 'Intra-Collegiate Debate Winner',
        badge: '1st Place Gold',
        description: 'Won first place through rigorous research, persuasive arguments, and decisive cross-examination under pressure.'
    },
    {
        title: 'Public Relations Head — InterCollegiate Fest',
        badge: 'Leadership & Outreach',
        description: 'Led festival outreach across 40+ colleges in Mumbai, achieving 2,000+ footfall and 1,000+ registrations.'
    },
    {
        title: 'Academic Excellence & Leadership',
        badge: 'Academic Distinction',
        description: 'Maintained a 9.50 CGPA in BSc IT while actively driving student leadership initiatives and events.'
    }
];

const FALLBACK_TIMELINE = [
    {
        date: 'Currently Pursuing',
        title: 'BSc Information Technology',
        subtitle: 'Thakur Specialised Degree College · CGPA 9.5'
    },
    {
        date: '2024 — 2025',
        title: '12th Grade (Computer Science)',
        subtitle: 'Sardar Vallabhai Patel College'
    },
    {
        date: '2022 — 2023',
        title: '10th Grade',
        subtitle: 'St. Xavier\'s High School · Maharashtra Board'
    }
];

// Runtime store hydrated on initialization
const KnowledgeBase = {
    projects: FALLBACK_PROJECTS,
    skills: FALLBACK_SKILLS,
    experience: FALLBACK_EXPERIENCE,
    achievements: FALLBACK_ACHIEVEMENTS,
    timeline: FALLBACK_TIMELINE,
    meta: PORTFOLIO_META,
    isHydrated: false
};

async function hydrateKnowledgeBase() {
    if (KnowledgeBase.isHydrated) return;
    try {
        const [proj, skl, exp, ach, tml] = await Promise.allSettled([
            fetchJson('data/projects.json', FALLBACK_PROJECTS),
            fetchJson('data/skills.json', FALLBACK_SKILLS),
            fetchJson('data/experience.json', FALLBACK_EXPERIENCE),
            fetchJson('data/achievements.json', FALLBACK_ACHIEVEMENTS),
            fetchJson('data/timeline.json', FALLBACK_TIMELINE)
        ]);

        if (proj.status === 'fulfilled' && Array.isArray(proj.value) && proj.value.length) {
            KnowledgeBase.projects = proj.value;
        }
        if (skl.status === 'fulfilled' && Array.isArray(skl.value) && skl.value.length) {
            KnowledgeBase.skills = skl.value;
        }
        if (exp.status === 'fulfilled' && Array.isArray(exp.value) && exp.value.length) {
            KnowledgeBase.experience = exp.value;
        }
        if (ach.status === 'fulfilled' && Array.isArray(ach.value) && ach.value.length) {
            KnowledgeBase.achievements = ach.value;
        }
        if (tml.status === 'fulfilled' && Array.isArray(tml.value) && tml.value.length) {
            KnowledgeBase.timeline = tml.value;
        }
        KnowledgeBase.isHydrated = true;
    } catch (e) {
        // Fallback dataset remains active
        KnowledgeBase.isHydrated = true;
    }
}

/* ==========================================================================
   SAFE DOM RENDERING (STRICTLY NO RAW INNERHTML)
   ========================================================================== */

/**
 * Builds safe DOM tree from formatted markdown-like string.
 * Supports: **bold**, _italic_, [label](url), and \n line breaks.
 * Enforces safe URI protocols (https:, mailto:, tel:, #).
 */
function renderSafeFormattedMessage(container, text, onInternalLinkClick) {
    container.textContent = '';
    if (!text) return;

    const lines = text.split('\n');
    lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) {
            container.appendChild(document.createElement('br'));
        }

        // Tokenizer: captures [label](url) or **bold** or _italic_
        const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|_([^_]+)_)/g;
        let lastIndex = 0;
        let match;

        while ((match = tokenRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                container.appendChild(document.createTextNode(line.slice(lastIndex, match.index)));
            }

            if (match[2] && match[3]) {
                // Link token: [label](url)
                const label = match[2];
                const rawUrl = match[3].trim();
                const anchor = document.createElement('a');
                anchor.textContent = label;

                // Validate URL protocol strictly
                if (/^(https?:\/\/|mailto:|tel:|#|\.\/|\/)/i.test(rawUrl)) {
                    anchor.href = rawUrl;
                    if (rawUrl.startsWith('http')) {
                        anchor.target = '_blank';
                        anchor.rel = 'noopener noreferrer';
                    } else if (rawUrl.startsWith('#') && typeof onInternalLinkClick === 'function') {
                        anchor.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            onInternalLinkClick(rawUrl);
                        });
                    }
                } else {
                    anchor.href = '#';
                }
                container.appendChild(anchor);
            } else if (match[4]) {
                // Bold token: **text**
                const strong = document.createElement('strong');
                strong.textContent = match[4];
                container.appendChild(strong);
            } else if (match[5]) {
                // Italic token: _text_
                const em = document.createElement('em');
                em.textContent = match[5];
                container.appendChild(em);
            }

            lastIndex = tokenRegex.lastIndex;
        }

        if (lastIndex < line.length) {
            container.appendChild(document.createTextNode(line.slice(lastIndex)));
        }
    });
}

/* ==========================================================================
   INTENT MATCHING & TYPO TOLERANCE
   ========================================================================== */

function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function wordMatches(word, target, maxDist = 1) {
    if (word === target) return true;
    if (Math.abs(word.length - target.length) > maxDist) return false;
    return levenshteinDistance(word, target) <= maxDist;
}

function matchIntent(input, lastTopic) {
    const raw = (input || '').toLowerCase().trim();
    // Normalize punctuation
    const text = raw.replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ');
    const tokens = text.split(' ').filter(Boolean);

    // 1. Follow-up / Context queries
    if (/^(more|tell me more|details|elaborate|explain more|go on|continue|what else|expand)\b/.test(text)) {
        return { type: 'followUp', topic: lastTopic };
    }

    // 2. Greetings
    if (/^(hi|hello|hey|howdy|greetings|yo|sup|what'?s up|good (morning|afternoon|evening))\b/.test(text)) {
        return { type: 'greeting' };
    }

    // 3. Specific Projects (exact names, partials, or typos)
    if (tokens.some(t => wordMatches(t, 'kaamkaagaz', 2) || wordMatches(t, 'kaamkagaz', 2)) ||
        text.includes('kaamkaagaz') || text.includes('civic tech') || text.includes('admission')) {
        return { type: 'projectDetail', name: 'KaamKaagaz' };
    }
    if (tokens.some(t => wordMatches(t, 'attendify', 2)) || text.includes('attendance') || text.includes('attendify')) {
        return { type: 'projectDetail', name: 'Attendify' };
    }
    if (tokens.some(t => wordMatches(t, 'continuity', 2)) || text.includes('legacy') || text.includes('continuity') || text.includes('vault') || text.includes('wills')) {
        return { type: 'projectDetail', name: 'Continuity' };
    }
    if (tokens.some(t => wordMatches(t, 'walle', 1) || wordMatches(t, 'wall-e', 1)) || text.includes('wall-e') || text.includes('mental health') || text.includes('journaling')) {
        return { type: 'projectDetail', name: 'WALL-E' };
    }

    // 4. Aether Archive
    if (text.includes('archive') || text.includes('aether archive') || text.includes('spatial') || text.includes('carousel') || text.includes('all repositories')) {
        return { type: 'archive' };
    }

    // 5. Resume / CV
    if (tokens.some(t => wordMatches(t, 'resume', 1) || wordMatches(t, 'cv', 0)) || text.includes('curriculum vitae') || text.includes('download resume')) {
        return { type: 'resume' };
    }

    // 6. Contact & Hiring
    const contactKeywords = ['contact', 'email', 'phone', 'reach', 'hire', 'hiring', 'freelance', 'collaborate', 'linkedin', 'github', 'location', 'call', 'message', 'touch'];
    if (tokens.some(t => contactKeywords.some(k => wordMatches(t, k, 1))) || text.includes('get in touch') || text.includes('how to reach')) {
        return { type: 'contact' };
    }

    // 7. General Projects
    const projectKeywords = ['project', 'projects', 'work', 'portfolio', 'built', 'shipped', 'made', 'created', 'developed', 'apps', 'code'];
    if (tokens.some(t => projectKeywords.some(k => wordMatches(t, k, 1)))) {
        return { type: 'projects' };
    }

    // 8. Specific Skill Domains
    if (text.includes('frontend') || text.includes('html') || text.includes('css') || text.includes('react') || text.includes('next.js') || text.includes('webgl') || text.includes('three.js')) {
        return { type: 'skillDomain', domain: 'Frontend' };
    }
    if (text.includes('backend') || text.includes('node') || text.includes('java') || text.includes('sql') || text.includes('database') || text.includes('mongo') || text.includes('firebase') || text.includes('api')) {
        return { type: 'skillDomain', domain: 'Backend & Databases' };
    }
    if (text.includes('ai') || text.includes('intelligence') || text.includes('claude') || text.includes('openai') || text.includes('prompt') || text.includes('agent') || text.includes('llm')) {
        return { type: 'skillDomain', domain: 'AI & Intelligence' };
    }

    // 9. General Skills & Tech Stack
    const skillKeywords = ['skill', 'skills', 'tech', 'stack', 'technology', 'technologies', 'language', 'languages', 'framework', 'frameworks', 'tools', 'expertise', 'proficient'];
    if (tokens.some(t => skillKeywords.some(k => wordMatches(t, k, 1)))) {
        return { type: 'skills' };
    }

    // 10. Experience & Career
    const experienceKeywords = ['experience', 'job', 'jobs', 'position', 'role', 'roles', 'career', 'intern', 'internship', 'profession', 'employed', 'workplace'];
    if (tokens.some(t => experienceKeywords.some(k => wordMatches(t, k, 1))) || text.includes('university of mumbai') || text.includes('pr head') || text.includes('student parliament')) {
        return { type: 'experience' };
    }

    // 11. Education & Academics
    const educationKeywords = ['education', 'college', 'university', 'degree', 'study', 'studies', 'student', 'cgpa', 'gpa', 'grades', 'academic', 'academics', 'school'];
    if (tokens.some(t => educationKeywords.some(k => wordMatches(t, k, 1)))) {
        return { type: 'education' };
    }

    // 12. Achievements & Honors
    const achievementKeywords = ['achievement', 'achievements', 'award', 'awards', 'prize', 'prizes', 'debate', 'winner', 'recognition', 'milestone', 'hackathon'];
    if (tokens.some(t => achievementKeywords.some(k => wordMatches(t, k, 1)))) {
        return { type: 'achievements' };
    }

    // 13. About / Bio
    const aboutKeywords = ['about', 'who', 'introduce', 'background', 'story', 'bio', 'himself', 'person', 'profile'];
    if (tokens.some(t => aboutKeywords.some(k => wordMatches(t, k, 1)))) {
        return { type: 'about' };
    }

    return { type: 'fallback' };
}

/* ==========================================================================
   DYNAMIC CONTEXTUAL CHIPS CONFIGURATION
   ========================================================================== */

const INITIAL_CHIPS = [
    { label: 'Projects', query: 'Tell me about projects' },
    { label: 'Skills', query: 'What skills does he have?' },
    { label: 'Experience', query: 'Tell me about his experience' },
    { label: 'Contact', query: 'How to contact Harsh?' },
    { label: 'About', query: 'Tell me about Harsh' }
];

function getChipsForTopic(topic, meta) {
    if (!topic) return INITIAL_CHIPS;

    switch (topic) {
        case 'projects':
            return [
                { label: 'KaamKaagaz', query: 'Tell me about KaamKaagaz' },
                { label: 'Attendify', query: 'Tell me about Attendify' },
                { label: 'Continuity', query: 'Tell me about Continuity' },
                { label: 'WALL-E', query: 'Tell me about WALL-E' },
                { label: 'Aether Archive ↗', query: 'What is Aether Archive?' }
            ];
        case 'project_KaamKaagaz':
        case 'project_Attendify':
        case 'project_Continuity':
        case 'project_WALL-E': {
            const name = topic.replace('project_', '');
            return [
                { label: 'Architecture & Impact', query: `Tell me more about ${name}` },
                { label: 'Other Projects', query: 'Show other projects' },
                { label: 'Tech Stack', query: 'What skills does he have?' },
                { label: 'Contact', query: 'How to contact Harsh?' }
            ];
        }
        case 'skills':
            return [
                { label: 'Frontend & 3D', query: 'Tell me about frontend skills' },
                { label: 'Backend & DB', query: 'Tell me about backend skills' },
                { label: 'AI & Intelligence', query: 'Tell me about AI skills' },
                { label: 'Projects', query: 'Tell me about projects' }
            ];
        case 'experience':
            return [
                { label: 'University of Mumbai', query: 'Tell me about IT Specialist role' },
                { label: 'PR Head Fest', query: 'Tell me about PR Head role' },
                { label: 'Student Parliament', query: 'Tell me about Student Parliament' },
                { label: 'Education', query: 'Tell me about his education' }
            ];
        case 'contact':
            return [
                { label: 'Email Harsh', query: 'What is his email?' },
                { label: 'Download Resume', query: 'How to download resume?' },
                { label: 'LinkedIn', query: 'Show LinkedIn profile' },
                { label: 'Projects', query: 'Tell me about projects' }
            ];
        case 'education':
        case 'achievements':
            return [
                { label: 'Projects', query: 'Tell me about projects' },
                { label: 'Experience', query: 'Tell me about his experience' },
                { label: 'Skills', query: 'What skills does he have?' },
                { label: 'Contact', query: 'How to contact Harsh?' }
            ];
        default:
            return INITIAL_CHIPS;
    }
}

/* ==========================================================================
   RESPONSE GENERATOR (FACTUAL ONLY)
   ========================================================================== */

function generateResponse(intent) {
    const { meta, projects, skills, experience, achievements, timeline } = KnowledgeBase;

    switch (intent.type) {
        case 'greeting':
            return {
                topic: 'greeting',
                text: `Welcome! I'm **Aether**, Harsh Dubey's portfolio companion. I'm connected directly to his verified project catalog, technical skills, and career history. What would you like to explore?`
            };

        case 'projects': {
            const list = projects.map(p => `• **${p.title.split('—')[0].trim()}** — ${p.description}`).join('\n');
            return {
                topic: 'projects',
                text: `Harsh has engineered **${projects.length} featured flagship architectures**:\n\n${list}\n\nExplore them in the [Projects Section](#projects) or ask me about any specific project (e.g. "Tell me about KaamKaagaz")!`
            };
        }

        case 'projectDetail': {
            const p = projects.find(proj => proj.title.toLowerCase().includes(intent.name.toLowerCase()));
            if (!p) {
                return generateResponse({ type: 'projects' });
            }
            const techList = p.tech.join(', ');
            const caseStudy = p.caseStudy;
            let body = `**${p.title}**\n${p.description}\n\n**Tech Stack:** ${techList}`;
            if (caseStudy?.architecture) {
                body += `\n\n**Architecture:** ${caseStudy.architecture}`;
            }
            if (caseStudy?.impact) {
                body += `\n\n**Impact:** ${caseStudy.impact}`;
            }
            body += `\n\n[Live Project](${p.live}) · [GitHub Repository](${p.github}) · [View in Portfolio](#projects)`;
            return {
                topic: `project_${intent.name}`,
                text: body
            };
        }

        case 'archive':
            return {
                topic: 'archive',
                text: `Harsh's **Aether Archive** is a standalone spatial universe featuring a 3D project carousel, interactive atmosphere engine, and a verified directory of **16 public repositories**.\n\nYou can explore it directly at the [Aether Archive](/projects/) page!`
            };

        case 'skills': {
            const categories = skills.map(s => {
                const names = s.items.map(i => i.name).join(', ');
                return `• **${s.category}:** ${names}`;
            }).join('\n');
            return {
                topic: 'skills',
                text: `Harsh's verified technical domains:\n\n${categories}\n\nReview visual breakdowns in the [Skills Section](#skills)!`
            };
        }

        case 'skillDomain': {
            const cat = skills.find(s => s.category.toLowerCase().includes(intent.domain.toLowerCase()));
            if (!cat) return generateResponse({ type: 'skills' });
            const items = cat.items.map(i => i.name).join(', ');
            return {
                topic: 'skills',
                text: `**${cat.category} Competencies:**\n\n${items}\n\nSee how these are applied across his work in the [Projects Section](#projects).`
            };
        }

        case 'experience': {
            const list = experience.map(e =>
                `• **${e.title}** at **${e.organization}**\n  ${e.description}`
            ).join('\n\n');
            return {
                topic: 'experience',
                text: `Harsh's verified career and leadership roles:\n\n${list}\n\nSee the full timeline in the [Experience Section](#experience).`
            };
        }

        case 'education': {
            const list = timeline.map(t => `• **${t.title}** (${t.date}) — ${t.subtitle}`).join('\n');
            return {
                topic: 'education',
                text: `**Academic Background:**\n\n${list}\n\nHarsh currently maintains a **${meta.cgpa} CGPA** in ${meta.degree} at ${meta.college}.`
            };
        }

        case 'achievements': {
            const list = achievements.map(a => `• **${a.title}** [${a.badge}]: ${a.description}`).join('\n');
            return {
                topic: 'achievements',
                text: `**Verified Achievements & Distinctions:**\n\n${list}`
            };
        }

        case 'resume':
            return {
                topic: 'contact',
                text: `Harsh's official curriculum vitae is available for download:\n\n• **Download Resume:** [${meta.resumePdf}](${meta.resumePdf})\n\nYou can also explore his credentials in the [Experience Section](#experience) and [About Section](#about).`
            };

        case 'contact':
            return {
                topic: 'contact',
                text: `You can connect with Harsh Dubey directly:\n\n• **Email:** [${meta.email}](mailto:${meta.email})\n• **Phone:** [${meta.phone}](tel:${meta.phone.replace(/\s+/g, '')})\n• **LinkedIn:** [harsh-dubey-640a68389](${meta.linkedin})\n• **GitHub:** [chillingbing648-sketch](${meta.github})\n• **Location:** ${meta.location}\n\nHe is open to software engineering opportunities, internships, and collaborations. You can also send a direct transmission via the [Contact Section](#contact)!`
            };

        case 'about':
            return {
                topic: 'about',
                text: `${meta.about}\n\n• **Current Degree:** ${meta.degree} (${meta.college})\n• **Academic Standing:** ${meta.cgpa} CGPA\n• **Location:** ${meta.location}\n\nLearn more in the [About Section](#about)!`
            };

        case 'followUp': {
            const topic = intent.topic;
            if (topic && topic.startsWith('project_')) {
                const name = topic.replace('project_', '');
                const p = projects.find(proj => proj.title.toLowerCase().includes(name.toLowerCase()));
                if (p && p.caseStudy) {
                    return {
                        topic,
                        text: `**Deep Dive into ${p.title.split('—')[0].trim()}:**\n\n**The Problem:** ${p.caseStudy.problem}\n\n**Engineering Approach:** ${p.caseStudy.architecture}\n\n**Verified Impact:** ${p.caseStudy.impact}\n\n[Explore Live Demo](${p.live}) · [Source Code](${p.github})`
                    };
                }
            }
            if (topic === 'skills') {
                return {
                    topic: 'skills',
                    text: `Harsh specializes in bridging **interactive WebGL 3D engineering** (GLSL shaders, GSAP motion, responsive layouts) with **solid backend engineering** (Node.js, C++, REST APIs) and **AI integrations** (Claude API, OpenAI, prompt engineering).`
                };
            }
            if (topic === 'experience') {
                return {
                    topic: 'experience',
                    text: `During his tenure as **IT Specialist** at University of Mumbai, Harsh streamlined academic admissions logistics and system integrity. As **Public Relations Head**, he coordinated an intercollegiate festival reaching 2,000+ attendees and 1,000+ registrations across 40+ colleges.`
                };
            }
            return {
                topic: 'projects',
                text: `Harsh has built products in civic-tech (**KaamKaagaz**), performance logistics (**Attendify**), digital legacy security (**Continuity**), and wellness companions (**WALL-E**). Which area would you like to review?`
            };
        }

        default:
            return {
                topic: 'fallback',
                text: `I focus exclusively on Harsh Dubey's verified portfolio data (projects, skills, experience, achievements, and contact details). If you have an inquiry outside these areas, you can reach Harsh directly through the [Contact Section](#contact) or via email at [${meta.email}](mailto:${meta.email}).`
            };
    }
}

/* ==========================================================================
   AETHER CONTROLLER (UI & EVENT MANAGEMENT)
   ========================================================================== */

let _aetherInitialized = false;

export function initAICompanion() {
    if (_aetherInitialized) return;

    const launcher = document.getElementById('ai-assistant-btn');
    const panel    = document.getElementById('ai-assistant-panel');

    if (!launcher || !panel) return;

    _aetherInitialized = true;

    // Cache DOM refs
    const closeBtn   = panel.querySelector('.assistant-close-btn');
    const clearBtn   = panel.querySelector('.assistant-clear-btn');
    const messages   = panel.querySelector('.assistant-messages');
    const inputEl    = panel.querySelector('#assistant-input');
    const sendBtn    = panel.querySelector('#assistant-send');
    const chipsWrap  = panel.querySelector('.assistant-chips');
    const statusText = panel.querySelector('.assistant-status');

    // State
    let isOpen = false;
    let isThinking = false;
    let lastTopic = null;
    let lastFocusedElement = null;
    const conversation = [];

    // Trigger async background knowledge base hydration
    hydrateKnowledgeBase();

    /* ------------------------------------------------------------------
       CHIP MANAGEMENT
    ------------------------------------------------------------------ */

    function renderChips(chipsList) {
        if (!chipsWrap) return;
        chipsWrap.textContent = '';
        chipsList.forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'assist-chip';
            btn.textContent = item.label;
            btn.setAttribute('data-prompt', item.query);
            btn.setAttribute('aria-label', `Ask: ${item.label}`);
            chipsWrap.appendChild(btn);
        });
        chipsWrap.classList.remove('faded');
    }

    function updateChipsForTopic(topic) {
        const nextChips = getChipsForTopic(topic, KnowledgeBase.meta);
        renderChips(nextChips);
    }

    /* ------------------------------------------------------------------
       OPEN / CLOSE / FOCUS TRAP
    ------------------------------------------------------------------ */

    function openPanel() {
        if (isOpen) return;
        isOpen = true;
        lastFocusedElement = document.activeElement;

        panel.classList.add('open');
        launcher.classList.add('open');
        launcher.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');

        // Initial welcome message if conversation is clean
        if (conversation.length === 0) {
            const greeting = generateResponse({ type: 'greeting' });
            addAssistantMessage(greeting.text);
            renderChips(INITIAL_CHIPS);
        }

        setTimeout(() => {
            if (inputEl) {
                inputEl.focus();
            }
        }, 150);
    }

    function closePanel() {
        if (!isOpen) return;
        isOpen = false;
        panel.classList.remove('open');
        launcher.classList.remove('open');
        launcher.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        } else {
            launcher.focus();
        }
    }

    function togglePanel() {
        isOpen ? closePanel() : openPanel();
    }

    function clearChat() {
        if (isThinking) return;
        conversation.length = 0;
        lastTopic = null;
        if (messages) messages.textContent = '';

        const greeting = generateResponse({ type: 'greeting' });
        addAssistantMessage(greeting.text);
        renderChips(INITIAL_CHIPS);

        if (inputEl) {
            inputEl.value = '';
            inputEl.style.height = '38px';
            inputEl.focus();
        }
    }

    /* ------------------------------------------------------------------
       MESSAGE RENDERING & UNOBTRUSIVE SMART SCROLL
    ------------------------------------------------------------------ */

    function handleInternalLink(hash) {
        closePanel();
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'msg user';
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text; // 100% safe textContent
        msg.appendChild(bubble);
        messages.appendChild(msg);
        conversation.push({ role: 'user', content: text });
        smartScroll(true);
    }

    function addAssistantMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'msg ai';
        msg.setAttribute('role', 'status');
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';

        // Safe DOM tree construction
        renderSafeFormattedMessage(bubble, text, handleInternalLink);

        msg.appendChild(bubble);
        messages.appendChild(msg);
        conversation.push({ role: 'assistant', content: text });
        smartScroll(false);
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'msg ai typing-msg';
        indicator.id = 'aether-typing';
        indicator.setAttribute('aria-label', 'Aether is typing');

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';

        const wrapper = document.createElement('div');
        wrapper.className = 'typing-indicator';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-dot';
            wrapper.appendChild(dot);
        }
        bubble.appendChild(wrapper);
        indicator.appendChild(bubble);
        messages.appendChild(indicator);
        smartScroll(true);
        return indicator;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('aether-typing');
        if (el) el.remove();
    }

    /**
     * Smart Auto-Scroll:
     * Only scrolls if user is near bottom (<= 90px threshold) or if forceScroll is true.
     * Respects user intent when reading past messages.
     */
    function smartScroll(forceScroll = false) {
        requestAnimationFrame(() => {
            if (!messages) return;
            const threshold = 90;
            const distanceToBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight;
            const isNearBottom = distanceToBottom <= threshold;

            if (forceScroll || isNearBottom) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                messages.scrollTo({
                    top: messages.scrollHeight,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    }

    function updateStatus(text, thinking = false) {
        if (!statusText) return;
        statusText.textContent = '';
        const dot = document.createElement('span');
        dot.className = 'status-dot';
        dot.setAttribute('aria-hidden', 'true');
        statusText.appendChild(dot);
        statusText.appendChild(document.createTextNode(text));
    }

    /* ------------------------------------------------------------------
       SEND MESSAGE & SAFE CYCLE
    ------------------------------------------------------------------ */

    async function sendMessage(rawText) {
        if (isThinking) return;

        const trimmed = (rawText || '').slice(0, 300).trim();
        if (!trimmed) return;

        // Ensure canonical data is loaded
        if (!KnowledgeBase.isHydrated) {
            await hydrateKnowledgeBase();
        }

        isThinking = true;

        // Loading locks
        if (sendBtn) sendBtn.disabled = true;
        if (inputEl) {
            inputEl.value = '';
            inputEl.style.height = '38px';
            inputEl.disabled = true;
        }

        // Display user message
        addUserMessage(trimmed);

        // Update status & typing indicator
        updateStatus("Aether is thinking...", true);
        _eyeState = 'thinking';
        showTypingIndicator();

        // Natural responsive cadence (350ms - 700ms)
        const delay = 350 + Math.random() * 350;

        setTimeout(() => {
            removeTypingIndicator();
            try {
                const matched = matchIntent(trimmed, lastTopic);
                const reply = generateResponse(matched);
                lastTopic = reply.topic;

                addAssistantMessage(reply.text);
                updateChipsForTopic(reply.topic);
            } catch (err) {
                addAssistantMessage("I encountered an issue processing that query. You can ask about projects, skills, experience, or contact Harsh directly!");
            } finally {
                isThinking = false;
                _eyeState = 'idle';
                if (sendBtn) sendBtn.disabled = false;
                if (inputEl) {
                    inputEl.disabled = false;
                    if (isOpen) inputEl.focus();
                }
                updateStatus("Portfolio Companion", false);
            }
        }, delay);
    }

    function handleSend() {
        if (inputEl) {
            sendMessage(inputEl.value);
        }
    }

    /* ------------------------------------------------------------------
       INPUT TEXTAREA SIZING & EVENTS
    ------------------------------------------------------------------ */

    if (inputEl) {
        // Auto-growing textarea
        inputEl.addEventListener('input', () => {
            inputEl.style.height = '38px';
            const newHeight = Math.min(inputEl.scrollHeight, 84);
            inputEl.style.height = `${newHeight}px`;
            if (_eyeState !== 'thinking') _eyeState = 'typing';
        });

        // Enter to send, Shift+Enter for newline
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }
        });

        inputEl.addEventListener('focus', () => {
            if (!_eyeState || _eyeState === 'idle') _eyeState = 'typing';
            setTimeout(() => smartScroll(true), 250);
        });

        inputEl.addEventListener('blur', () => {
            if (_eyeState === 'typing') _eyeState = 'idle';
        });
    }

    // Launcher & control buttons
    launcher.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (clearBtn) clearBtn.addEventListener('click', clearChat);
    if (sendBtn) sendBtn.addEventListener('click', handleSend);

    // Chips delegation
    if (chipsWrap) {
        chipsWrap.addEventListener('click', (e) => {
            const chip = e.target.closest('.assist-chip');
            if (!chip) return;
            const prompt = chip.getAttribute('data-prompt') || chip.textContent;
            sendMessage(prompt);
        });
    }

    // Global keyboard management (Escape & Focus Trap)
    document.addEventListener('keydown', (e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            closePanel();
            return;
        }

        // Focus trap
        if (e.key === 'Tab') {
            const focusable = panel.querySelectorAll('button:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]');
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });

    /* ------------------------------------------------------------------
       EXPRESSIVE ANIMATED EYE TRACKING & STATES (PRESERVED)
    ------------------------------------------------------------------ */
    let _eyeState = 'idle'; // 'idle', 'typing', 'thinking'

    function initEyeTracking() {
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isTouchDevice || prefersReducedMotion) return;

        const pupils = Array.from(document.querySelectorAll('.aether-pupil'));
        const eyeSockets = Array.from(document.querySelectorAll('.aether-eye'));
        if (!pupils.length) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let targetX = mouseX;
        let targetY = mouseY;
        let isAnimating = true;

        let saccadeX = 0;
        let saccadeY = 0;

        window.addEventListener('mousemove', (e) => {
            if (_eyeState === 'idle') {
                targetX = e.clientX;
                targetY = e.clientY;
            }
        }, { passive: true });

        function scheduleBlink() {
            const delay = 2500 + Math.random() * 3000;
            setTimeout(() => {
                if (isAnimating) {
                    eyeSockets.forEach(eye => eye.classList.add('is-blinking'));
                    setTimeout(() => {
                        eyeSockets.forEach(eye => eye.classList.remove('is-blinking'));
                    }, 180);
                }
                scheduleBlink();
            }, delay);
        }
        scheduleBlink();

        setInterval(() => {
            saccadeX = (Math.random() - 0.5) * 0.7;
            saccadeY = (Math.random() - 0.5) * 0.7;
        }, 1800);

        document.addEventListener('visibilitychange', () => {
            isAnimating = !document.hidden;
            if (isAnimating) animate();
        });

        function animate() {
            if (!isAnimating) return;

            if (_eyeState === 'thinking') {
                targetX = window.innerWidth / 2 + 30;
                targetY = window.innerHeight / 2 - 140;
            } else if (_eyeState === 'typing' && inputEl) {
                const inputRect = inputEl.getBoundingClientRect();
                targetX = inputRect.left + inputRect.width / 2;
                targetY = inputRect.top + inputRect.height / 2;
            }

            mouseX += (targetX - mouseX) * 0.12;
            mouseY += (targetY - mouseY) * 0.12;

            pupils.forEach((pupil) => {
                const socket = pupil.parentElement;
                if (!socket) return;

                const rect = socket.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const angle = Math.atan2(dy, dx);
                const distance = Math.hypot(dx, dy);

                const maxOffset = 3.2;
                const offset = Math.min(distance * 0.045, maxOffset);

                const offsetX = Math.cos(angle) * offset + saccadeX;
                const offsetY = Math.sin(angle) * offset + saccadeY;

                pupil.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    initEyeTracking();
}
