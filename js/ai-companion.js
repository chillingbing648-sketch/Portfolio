/**
 * js/ai-companion.js
 * Aether — Portfolio AI Companion (Chat Interface)
 *
 * Self-contained conversational assistant with:
 * - Conversation persistence across close/reopen
 * - Smart auto-scroll (only scrolls when user is near bottom)
 * - Natural typing delay & "Aether is thinking..." status
 * - Context-aware follow-ups ("tell me more", "more details", "elaborate")
 * - Double-sending / loading protection
 * - Quick-prompt state fading
 * - Clear conversation control (↺ button)
 * - Mobile keyboard visibility handling
 * - Strictly factual portfolio data (no hallucination)
 */

/* ==========================================================================
   PORTFOLIO KNOWLEDGE BASE
   ========================================================================== */

const PORTFOLIO = {
    owner: 'Harsh Dubey',
    location: 'Mumbai, India',
    email: 'harshdubey.works@gmail.com',
    phone: '+91 9321521258',
    github: 'https://github.com/chillingbing648-sketch',
    linkedin: 'https://www.linkedin.com/in/harsh-dubey-640a68389/',
    tagline: 'AI-Powered Developer & Creative Engineer',
    cgpa: '9.5',

    about: `Harsh Dubey is a student driven by curiosity, discipline, and a relentless desire to create meaningful impact. He doesn't just write code — he engineers solutions, leads teams, and transforms complex problems into elegant digital experiences. Curiosity is his default state. Every unfamiliar technology, every ambiguous brief, every difficult conversation becomes an opportunity to understand something more deeply. He adapts at speed, navigating unfamiliar stacks, tight deadlines, and complex stakeholder landscapes with calm, analytical precision. He's a natural collaborator who leads when needed and supports when required — from managing 2,000+ attendee events to winning debate competitions.`,

    skills: {
        'Frontend': ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Three.js', 'WebGL', 'Responsive Design', 'Accessibility'],
        'Backend & Databases': ['Node.js', 'Java', 'Express.js', 'REST APIs', 'Data Structures', 'MySQL', 'MongoDB', 'Firebase', 'Supabase'],
        'AI & Intelligence': ['Prompt Engineering', 'OpenAI APIs', 'Claude APIs', 'AI Agents'],
        'DevOps & Architecture': ['Git & GitHub', 'Vercel', 'Netlify', 'CI/CD'],
        'Soft Skills': ['Leadership', 'Public Speaking', 'Teamwork', 'Critical Thinking', 'Decision Making', 'Strategic Thinking', 'Adaptability', 'Time Management']
    },

    projects: [
        {
            name: 'KaamKaagaz',
            description: 'A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.',
            tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Static Export'],
            highlights: ['Multilingual civic-tech guidance (English, Hindi, Marathi)', 'University admissions hub & portal wayfinding', 'Privacy-first client-side persistent checklists'],
            details: 'Engineered with Next.js 15 App Router, React 19, and TypeScript to demystify complex government bureaucracy and higher-education admissions. Features deterministic client-side conversational search and zero-tracking local checklists.',
            github: 'https://github.com/chillingbing648-sketch/KaamKaagaz.git',
            live: 'https://chillingbing648-sketch.github.io/KaamKaagaz/'
        },
        {
            name: 'Attendify',
            description: 'A highly organized web-based platform for structured attendance data tracking. Engineered with a clean UI to manage real-time attendance logistics seamlessly.',
            tech: ['C++', 'Node.js', 'JSON', 'REST API', 'HTML/CSS/JS'],
            highlights: ['Real-time attendance tracking', 'Subject-wise percentage projections', '"Safe to skip" calculations'],
            details: 'Eliminated manual spreadsheet tracking across 5-8 subjects simultaneously. Uses C++ core logic wrapped in a Node.js API with real-time percentage alerts.',
            github: 'https://github.com/chillingbing648-sketch/Attendify.git',
            live: 'https://preview--vivid-web-transform.lovable.app/'
        },
        {
            name: 'Continuity',
            description: 'A secure digital legacy platform that brings wills, investments, assets, estates, and important documents into one trusted place — with controlled access for the people who matter most.',
            tech: ['AI Integration', 'React', 'Data Analysis', 'Secure Data Management'],
            highlights: ['Digital legacy management', 'Role-based access control', 'Family notification system'],
            details: 'Organizes scattered financial assets, estates, and wills into a single secure vault with role-based access for designated family members.',
            github: 'https://github.com/chillingbing648-sketch/Continuity.git',
            live: 'https://chillingbing648-sketch.github.io/Continuity/'
        },
        {
            name: 'WALL-E',
            description: 'A supportive AI companion for mood check-ins, guided journaling, and reflective conversations — designed to encourage healthier daily habits with clear, user-first boundaries.',
            tech: ['JavaScript', 'AI Integration', 'Local Storage', 'Responsive Design'],
            highlights: ['Mood tracking & check-ins', 'Guided journaling prompts', 'Privacy-first emotional support'],
            details: 'A privacy-first reflection tool that provides gentle daily check-ins, mood trend visualization, and guided journaling without making clinical claims.',
            github: 'https://github.com/chillingbing648-sketch/WALL-E.git',
            live: 'https://chillingbing648-sketch.github.io/WALL-E/'
        }
    ],

    experience: [
        {
            role: 'IT Specialist',
            org: 'University of Mumbai',
            description: 'Managing end-to-end technical operations, university admission digital logistics, and system administration for large-scale academic workflows. Responsible for maintaining data integrity across institutional systems.',
            responsibilities: ['Technical Support', 'System Administration', 'Computer Systems', 'Admission Operations', 'Process Optimization', 'Troubleshooting']
        },
        {
            role: 'Public Relations Head',
            org: 'Thakur Specialised Degree College',
            description: 'Spearheaded student leadership initiatives, public policy coordination, event leadership, and student advocacy. Led PR strategy for an intercollegiate fest attracting 2,000+ attendees and 1,000+ registrations.',
            responsibilities: ['Leadership', 'Student Representation', 'Public Administration', 'Event Leadership', 'Team Management', 'Public Speaking', 'Decision Making']
        },
        {
            role: 'Chief Minister',
            org: 'Student Parliament Initiative — Career Katta, Government of Maharashtra & MITSC',
            description: 'Served as Chief Minister of the Student Parliament initiative, leading student representatives, coordinating leadership activities, and driving initiatives focused on student development, civic engagement, and collaborative decision-making.',
            responsibilities: ['Student Leadership', 'Civic Engagement', 'Team Coordination', 'Strategic Planning', 'Public Speaking', 'Student Development', 'Decision Making']
        }
    ],

    achievements: [
        'IntraCollegiate Debate Winner — Won 1st place presenting well-researched arguments under pressure',
        'PR Head — InterCollegiate Fest — Led efforts attracting 2,000+ attendees and 1,000+ registrations',
        'Academic Excellence — CGPA 9.5 with active involvement in fests, NSS Unit, and student leadership'
    ],

    education: [
        'BSc Information Technology (Currently Pursuing) — Thakur Specialised Degree College · CGPA 9.5',
        '12th Grade Computer Science (2024–2025) — Sardar Vallabhai Patel College',
        '10th Grade (2022–2023) — St. Xavier\'s High School · Maharashtra Board'
    ],

    services: [
        'AI Integration — LLMs, Claude API, OpenAI APIs, prompt engineering, AI agents',
        'Cinematic Web — Three.js, WebGL, GSAP, modern CSS, motion design',
        'Full-Stack Engineering — System design to deployment, REST APIs, scalable solutions',
        'Technical Leadership — Cross-functional team management, decision making',
        'Performance Engineering — 60-120 FPS, Lighthouse 90+, GPU acceleration',
        'Product Thinking — User needs, MVP definition, rapid iteration, shipping'
    ]
};


/* ==========================================================================
   RESPONSE ENGINE & CONTEXT TRACKING
   ========================================================================== */

let _lastTopic = null;

const RESPONSES = {
    greeting: [
        `Hey! I'm Aether, Harsh's portfolio companion. Ask me about his projects, skills, experience, or anything else! 🚀`,
        `Welcome! I'm Aether — here to help you learn about Harsh Dubey's work. What would you like to know?`,
        `Hi there! I can tell you about Harsh's projects, skills, experience, and more. What interests you?`
    ],

    projects: () => {
        _lastTopic = 'projects';
        const list = PORTFOLIO.projects.map(p =>
            `• **${p.name}** — ${p.description}`
        ).join('\n');
        return `Here are Harsh's key projects:\n\n${list}\n\nAsk about any specific project (e.g. "Tell me about Attendify" or "tell me more")!`;
    },

    projectDetail: (name) => {
        const p = PORTFOLIO.projects.find(proj =>
            proj.name.toLowerCase().includes(name.toLowerCase())
        );
        if (!p) return null;
        _lastTopic = `project_${p.name}`;
        return `**${p.name}**\n${p.description}\n\n**Tech Stack:** ${p.tech.join(', ')}\n\n**Highlights:**\n${p.highlights.map(h => `• ${h}`).join('\n')}\n\n[Live Demo](${p.live}) · [GitHub](${p.github})`;
    },

    skills: () => {
        _lastTopic = 'skills';
        const sections = Object.entries(PORTFOLIO.skills).map(([cat, items]) =>
            `**${cat}:** ${items.join(', ')}`
        ).join('\n\n');
        return `Harsh has expertise across multiple domains:\n\n${sections}`;
    },

    experience: () => {
        _lastTopic = 'experience';
        const list = PORTFOLIO.experience.map(e =>
            `**${e.role}** at ${e.org}\n${e.description}\n_Key areas: ${e.responsibilities.join(', ')}_`
        ).join('\n\n');
        return `Here's Harsh's professional experience:\n\n${list}`;
    },

    contact: () => {
        _lastTopic = 'contact';
        return `You can reach Harsh through:\n\n• **Email:** ${PORTFOLIO.email}\n• **Phone:** ${PORTFOLIO.phone}\n• **GitHub:** github.com/chillingbing648-sketch\n• **LinkedIn:** linkedin.com/in/harsh-dubey-640a68389\n• **Location:** ${PORTFOLIO.location}\n\nHe's actively open for freelance projects, internships, and global opportunities!`;
    },

    about: () => {
        _lastTopic = 'about';
        return `${PORTFOLIO.about}\n\nHe's a natural collaborator who leads when needed and supports when required — from managing 2,000+ attendee events to winning debate competitions.`;
    },

    achievements: () => {
        _lastTopic = 'achievements';
        const list = PORTFOLIO.achievements.map(a => `• ${a}`).join('\n');
        return `Harsh's key achievements:\n\n${list}\n\nEvery project carries a signature: curiosity, innovation, and the discipline to finish what he starts.`;
    },

    education: () => {
        _lastTopic = 'education';
        const list = PORTFOLIO.education.map(e => `• ${e}`).join('\n');
        return `**Harsh's Educational Background:**\n\n${list}`;
    },

    services: () => {
        _lastTopic = 'services';
        const list = PORTFOLIO.services.map(s => `• ${s}`).join('\n');
        return `Harsh offers expertise in:\n\n${list}`;
    },

    followUp: () => {
        if (!_lastTopic) {
            return `Harsh is an AI-Powered Developer & Creative Engineer based in Mumbai (CGPA 9.5). Ask me about his **projects**, **skills**, or **experience** for details!`;
        }
        if (_lastTopic.startsWith('project_')) {
            const projName = _lastTopic.replace('project_', '');
            const p = PORTFOLIO.projects.find(proj => proj.name === projName);
            if (p) {
                return `**More about ${p.name}:**\n\n${p.details}\n\n**Built with:** ${p.tech.join(', ')}. You can view the live project at ${p.live}`;
            }
        }
        switch (_lastTopic) {
            case 'projects':
                return `Harsh has shipped 4+ key projects including **KaamKaagaz** (Civic Tech & Admissions), **Attendify** (C++/Node logistics), **Continuity** (Legacy Vault), and **WALL-E** (Mental Health Companion). Which one would you like to explore further?`;
            case 'skills':
                return `Harsh's core strength is bridging creative web development (Three.js, WebGL, GSAP) with AI integration (Claude API, OpenAI APIs, Prompt Engineering) and solid full-stack engineering (Node.js, Express, Java).`;
            case 'experience':
                return `Harsh served as **IT Specialist** at University of Mumbai, **PR Head** for an intercollegiate fest with 2,000+ attendees, and **Chief Minister** of the Student Parliament initiative (Government of Maharashtra).`;
            case 'about':
                return `Harsh maintains a **9.5 CGPA** while leading major events and building full-stack products. Curiosity is his compass and calculated risk-taking drives his continuous growth.`;
            case 'contact':
                return `Direct email: **${PORTFOLIO.email}** | Phone: **${PORTFOLIO.phone}** | Location: **Mumbai, India**. Downloads for his full resume are also available on the portfolio!`;
            default:
                return `Feel free to ask specific questions about Harsh's **projects**, **skills**, **tech stack**, or **work experience**!`;
        }
    },

    fallback: [
        `I'm trained strictly on Harsh's real portfolio data. I can tell you about his **projects**, **skills**, **experience**, **achievements**, or **contact** info. What would you like to know?`,
        `I don't have information on that outside of Harsh's portfolio. Try asking about his **projects**, **skills**, **experience**, or how to **contact** him!`,
        `I focus exclusively on Harsh Dubey's portfolio! Ask me about his **work**, **tech stack**, **background**, or **achievements**.`
    ]
};


/* ==========================================================================
   INTENT MATCHER
   ========================================================================== */

function matchIntent(input) {
    const text = input.toLowerCase().trim();

    // Context-aware follow-up queries
    if (/^(tell me more|more|more details|elaborate|explain more|detail|details|go on|continue)\b/.test(text)) {
        return { type: 'followUp' };
    }

    // Greeting patterns
    if (/^(hi|hello|hey|howdy|greetings|sup|yo|what'?s up)\b/.test(text)) {
        return { type: 'greeting' };
    }

    // Specific project queries
    for (const project of PORTFOLIO.projects) {
        if (text.includes(project.name.toLowerCase())) {
            return { type: 'projectDetail', name: project.name };
        }
    }

    // General projects
    if (/project|work|portfolio|built|shipped|made|created|developed/.test(text)) {
        return { type: 'projects' };
    }

    // Skills
    if (/skill|tech|stack|language|framework|tool|know|proficien|expertise|capable|technolog/.test(text)) {
        return { type: 'skills' };
    }

    // Experience
    if (/experience|job|position|role|career|work.*at|employ|intern|profession|where.*work/.test(text)) {
        return { type: 'experience' };
    }

    // Contact
    if (/contact|email|phone|reach|connect|hire|linkedin|github|social|get in touch|message/.test(text)) {
        return { type: 'contact' };
    }

    // About
    if (/about|who|tell me|introduce|background|story|himself|person|bio|descrip/.test(text)) {
        return { type: 'about' };
    }

    // Education
    if (/educat|college|university|degree|study|student|cgpa|gpa|school|academic/.test(text)) {
        return { type: 'education' };
    }

    // Achievements
    if (/achieve|award|prize|accomplish|recognition|hackathon|win|won|milestone|certif/.test(text)) {
        return { type: 'achievements' };
    }

    // Services / what does he do
    if (/service|offer|do.*for|what.*do|capabilit|specializ|what can|help with/.test(text)) {
        return { type: 'services' };
    }

    return { type: 'fallback' };
}


function generateResponse(input) {
    const intent = matchIntent(input);

    switch (intent.type) {
        case 'greeting':
            return pick(RESPONSES.greeting);
        case 'projects':
            return RESPONSES.projects();
        case 'projectDetail':
            return RESPONSES.projectDetail(intent.name) || RESPONSES.projects();
        case 'skills':
            return RESPONSES.skills();
        case 'experience':
            return RESPONSES.experience();
        case 'contact':
            return RESPONSES.contact();
        case 'about':
            return RESPONSES.about();
        case 'education':
            return RESPONSES.education();
        case 'achievements':
            return RESPONSES.achievements();
        case 'services':
            return RESPONSES.services();
        case 'followUp':
            return RESPONSES.followUp();
        default:
            return pick(RESPONSES.fallback);
    }
}


function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


/* ==========================================================================
   SAFE DOM HELPERS
   ========================================================================== */

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


/**
 * Convert simple markdown-like formatting to safe HTML.
 * Supports: [label](url), **bold**, _italic_, \n line breaks
 */
function formatResponse(text) {
    return escapeHTML(text)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}


/* ==========================================================================
   AETHER CONTROLLER
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
    const conversation = [];

    /* ------------------------------------------------------------------
       OPEN / CLOSE / TOGGLE
    ------------------------------------------------------------------ */

    function openPanel() {
        if (isOpen) return;
        isOpen = true;
        panel.classList.add('open');
        launcher.classList.add('open');
        launcher.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');

        // Show welcome message ONCE if conversation is empty
        if (conversation.length === 0) {
            addAssistantMessage(pick(RESPONSES.greeting));
        }

        setTimeout(() => {
            inputEl?.focus();
        }, 200);
    }

    function closePanel() {
        if (!isOpen) return;
        isOpen = false;
        panel.classList.remove('open');
        launcher.classList.remove('open');
        launcher.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        launcher.focus();
    }

    function togglePanel() {
        isOpen ? closePanel() : openPanel();
    }

    function clearChat() {
        if (isThinking) return;
        conversation.length = 0;
        _lastTopic = null;
        if (messages) messages.innerHTML = '';
        if (chipsWrap) chipsWrap.classList.remove('faded');
        addAssistantMessage(pick(RESPONSES.greeting));
    }


    /* ------------------------------------------------------------------
       MESSAGE RENDERING & SMART SCROLL
    ------------------------------------------------------------------ */

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'msg user';
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text;
        msg.appendChild(bubble);
        messages.appendChild(msg);
        conversation.push({ role: 'user', content: text });
        smartScroll();
    }

    function addAssistantMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'msg ai';
        msg.setAttribute('role', 'status');
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.innerHTML = formatResponse(text);
        msg.appendChild(bubble);
        messages.appendChild(msg);
        conversation.push({ role: 'assistant', content: text });
        smartScroll();
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'msg ai typing-msg';
        indicator.id = 'aether-typing';
        indicator.innerHTML = `
            <div class="msg-bubble">
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>`;
        messages.appendChild(indicator);
        smartScroll();
        return indicator;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('aether-typing');
        if (el) el.remove();
    }

    /**
     * Smart Auto-Scroll: only scroll if the user is already near bottom
     * or if forceScroll is true.
     */
    function smartScroll(forceScroll = true) {
        requestAnimationFrame(() => {
            if (!messages) return;
            const isNearBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 140;
            if (forceScroll || isNearBottom) {
                messages.scrollTop = messages.scrollHeight;
            }
        });
    }

    function updateStatus(text, thinking = false) {
        if (!statusText) return;
        statusText.innerHTML = `<span class="status-dot" aria-hidden="true"></span>${escapeHTML(text)}`;
    }


    /* ------------------------------------------------------------------
       SEND MESSAGE & LOADING PROTECTION
    ------------------------------------------------------------------ */

    function sendMessage(text) {
        if (isThinking) return; // Prevent double sending

        const trimmed = (text || '').slice(0, 300).trim(); // Character limit 300
        if (!trimmed) return;

        isThinking = true;

        // Set UI loading protection
        if (sendBtn) sendBtn.disabled = true;
        if (inputEl) {
            inputEl.value = '';
            inputEl.disabled = true;
        }

        // Fade quick prompts after first interaction
        if (chipsWrap && !chipsWrap.classList.contains('faded')) {
            chipsWrap.classList.add('faded');
        }

        // Show user message
        addUserMessage(trimmed);

        // Update status & typing indicator
        updateStatus("Aether is thinking...", true);
        _eyeState = 'thinking'; // Curious upward glance during thinking
        showTypingIndicator();

        // Realistic typing delay
        const delay = 450 + Math.random() * 550;
        setTimeout(() => {
            removeTypingIndicator();
            try {
                const response = generateResponse(trimmed);
                addAssistantMessage(response);
            } catch (err) {
                addAssistantMessage("I encountered an issue processing that. Try asking about projects, skills, or experience!");
                console.warn('[Aether] Response error:', err);
            } finally {
                isThinking = false;
                _eyeState = 'idle'; // Return attention to user
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
       EVENT LISTENERS
    ------------------------------------------------------------------ */

    // Launcher toggle
    launcher.addEventListener('click', togglePanel);

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearChat);
    }

    // Send button
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }

    // Enter to send
    if (inputEl) {
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });

        // Mobile keyboard handling & eye state focus
        inputEl.addEventListener('focus', () => {
            if (!_eyeState || _eyeState === 'idle') _eyeState = 'typing';
            setTimeout(() => {
                smartScroll(true);
            }, 300);
        });

        inputEl.addEventListener('blur', () => {
            if (_eyeState === 'typing') _eyeState = 'idle';
        });

        inputEl.addEventListener('input', () => {
            if (_eyeState !== 'thinking') _eyeState = 'typing';
        });
    }

    // Quick prompts
    if (chipsWrap) {
        chipsWrap.addEventListener('click', (e) => {
            const chip = e.target.closest('.assist-chip');
            if (!chip) return;
            const prompt = chip.dataset.prompt || chip.textContent;
            sendMessage(prompt);
        });
    }

    // Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closePanel();
        }
    });

    /* ------------------------------------------------------------------
       EXPRESSIVE ANIMATED EYE TRACKING & STATES
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

        // Micro-saccades offset
        let saccadeX = 0;
        let saccadeY = 0;

        window.addEventListener('mousemove', (e) => {
            if (_eyeState === 'idle') {
                targetX = e.clientX;
                targetY = e.clientY;
            }
        }, { passive: true });

        // Natural blinking at varied intervals (2.5s - 5.5s)
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

        // Tiny pupil micro-saccades every 1.8s
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

            // Effective target coordinates based on eye state
            if (_eyeState === 'thinking') {
                targetX = window.innerWidth / 2 + 30;
                targetY = window.innerHeight / 2 - 140; // Curious upward glance
            } else if (_eyeState === 'typing' && inputEl) {
                const inputRect = inputEl.getBoundingClientRect();
                targetX = inputRect.left + inputRect.width / 2;
                targetY = inputRect.top + inputRect.height / 2;
            }

            // Smooth spring / lerp interpolation
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

                // Constrain pupil inside eye socket (3.2px max offset)
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

    // Initialize Eye Tracking
    initEyeTracking();
}
