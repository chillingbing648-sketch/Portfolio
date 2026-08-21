/**
 * js/ai-companion.js
 * AETHER — Grounded Portfolio Intelligence
 *
 * Architecture:
 * ---------------------------------------------------------
 * UI
 *   ↓
 * Intent / Retrieval
 *   ↓
 * Verified JSON
 *   ↓
 * Deterministic Response
 *
 * GUARANTEES:
 * - No external LLM
 * - No API calls to AI providers
 * - No generated portfolio facts
 * - No guessing
 * - No fabricated links
 * - Unknown information is rejected
 * - User input is escaped before rendering
 * - UI is constrained to the viewport
 */

const DATA_SOURCES = {
    projects: 'data/projects.json',
    skills: 'data/skills.json',
    experience: 'data/experience.json',
    achievements: 'data/achievements.json',
    timeline: 'data/timeline.json',
    library: 'data/library.json'
};

const state = {
    open: false,
    sending: false,
    initialized: false,
    data: {}
};

/* =========================================================
   NORMALIZATION / SECURITY
   ========================================================= */

function normalize(value = '') {
    return String(value)
        .toLowerCase()
        .replace(/[^\w\s.-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function escapeHTML(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function containsAny(text, terms = []) {
    return terms.some(term =>
        text.includes(normalize(term))
    );
}

/* =========================================================
   DOM
   ========================================================= */

function getElements() {
    return {
        button: document.getElementById('ai-assistant-btn'),
        panel: document.getElementById('ai-assistant-panel'),
        close: document.querySelector('.assistant-close-btn'),
        messages: document.querySelector('.assistant-messages'),
        input: document.getElementById('assistant-input'),
        send: document.getElementById('assistant-send'),
        chips: document.querySelectorAll('.assist-chip')
    };
}

/* =========================================================
   VIEWPORT SAFETY
   ---------------------------------------------------------
   This is intentionally included here as a defensive layer.
   CSS should still contain the main visual rules.
   ========================================================= */

function applyViewportSafety() {
    const { panel } = getElements();

    if (!panel) return;

    const isMobile = window.innerWidth <= 768;

    const horizontalMargin = isMobile ? 8 : 24;
    const bottomSpace = isMobile ? 76 : 92;

    const availableWidth =
        Math.max(
            280,
            window.innerWidth -
            horizontalMargin * 2
        );

    const availableHeight =
        Math.max(
            280,
            window.innerHeight -
            bottomSpace
        );

    /*
     * These properties prevent the assistant from
     * becoming larger than the viewport.
     */
    panel.style.maxWidth =
        `${availableWidth}px`;

    panel.style.maxHeight =
        `${availableHeight}px`;

    panel.style.width =
        `${Math.min(
            380,
            availableWidth
        )}px`;

    panel.style.height =
        `${Math.min(
            560,
            availableHeight
        )}px`;

    panel.style.boxSizing =
        'border-box';

    panel.style.overflow =
        'hidden';

    panel.style.minWidth =
        '0';

    panel.style.minHeight =
        '0';
}

function clearViewportInlineStyles() {
    const { panel } = getElements();

    if (!panel) return;

    panel.style.maxWidth = '';
    panel.style.maxHeight = '';
    panel.style.width = '';
    panel.style.height = '';
}

function bindViewportEvents() {
    let resizeTimer;

    const handleResize = () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            applyViewportSafety();
        }, 100);
    };

    window.addEventListener(
        'resize',
        handleResize,
        { passive: true }
    );

    window.addEventListener(
        'orientationchange',
        () => {
            setTimeout(
                applyViewportSafety,
                150
            );
        },
        { passive: true }
    );

    /*
     * Handles mobile browser address-bar / keyboard
     * viewport changes when visualViewport exists.
     */
    if (window.visualViewport) {
        window.visualViewport.addEventListener(
            'resize',
            handleResize,
            { passive: true }
        );
    }
}

/* =========================================================
   DATA
   ========================================================= */

async function loadJSON(url) {
    const response = await fetch(url, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status} while loading ${url}`
        );
    }

    return response.json();
}

async function loadPortfolioData() {
    const entries =
        Object.entries(DATA_SOURCES);

    const results =
        await Promise.all(
            entries.map(
                async ([key, url]) => {
                    try {
                        return [
                            key,
                            await loadJSON(url)
                        ];
                    } catch (error) {
                        console.warn(
                            `[AETHER] Could not load ${url}`,
                            error
                        );

                        return [key, null];
                    }
                }
            )
        );

    return Object.fromEntries(results);
}

/* =========================================================
   PROJECT RETRIEVAL
   ========================================================= */

function getProjectSearchText(project) {
    const caseStudy =
        project?.caseStudy || {};

    return normalize([
        project?.id,
        project?.title,
        project?.description,
        ...safeArray(project?.tech),

        caseStudy.story,
        caseStudy.problem,
        caseStudy.architecture,
        caseStudy.impact
    ]
        .filter(Boolean)
        .join(' '));
}

const PROJECT_ALIASES = {
    'wall-e': [
        'wall-e',
        'wall e',
        'wall-e ai',
        'mental health companion',
        'mental health ai companion'
    ],

    attendify: [
        'attendify',
        'attendance calculator',
        'attendance app'
    ],

    psychstudy: [
        'psychstudy',
        'psych study',
        'psychology study'
    ],

    continuity: [
        'continuity',
        'financial sustainability'
    ]
};

function findProject(query, projects) {
    const q = normalize(query);
    const list = safeArray(projects);

    if (!q || !list.length) {
        return null;
    }

    /*
     * 1. Exact title / ID match
     */
    const exact =
        list.find(project => {
            const title =
                normalize(project?.title);

            const id =
                normalize(project?.id);

            return (
                title &&
                (
                    q === title ||
                    q.includes(title)
                )
            ) || (
                id &&
                q.includes(id)
            );
        });

    if (exact) {
        return exact;
    }

    /*
     * 2. Explicit verified aliases
     */
    for (
        const [projectKey, aliases]
        of Object.entries(PROJECT_ALIASES)
    ) {
        const matchedAlias =
            aliases.some(alias =>
                q.includes(normalize(alias))
            );

        if (!matchedAlias) {
            continue;
        }

        const project =
            list.find(item => {
                const id =
                    normalize(item?.id);

                const title =
                    normalize(item?.title);

                return (
                    id === projectKey ||
                    id.includes(projectKey) ||
                    title.includes(
                        normalize(projectKey)
                    )
                );
            });

        if (project) {
            return project;
        }
    }

    /*
     * 3. Conservative token matching
     */
    const tokens =
        q.split(' ')
            .filter(token =>
                token.length >= 4
            );

    if (tokens.length < 2) {
        return null;
    }

    let bestProject = null;
    let bestScore = 0;

    for (const project of list) {
        const searchable =
            getProjectSearchText(project);

        let score = 0;

        for (const token of tokens) {
            if (searchable.includes(token)) {
                score++;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestProject = project;
        }
    }

    /*
     * Require multiple independent matches.
     * This is deliberately conservative.
     */
    return bestScore >= 2
        ? bestProject
        : null;
}

/* =========================================================
   SKILL RETRIEVAL
   ========================================================= */

function findSkill(query, skills) {
    const q = normalize(query);

    for (const category of safeArray(skills)) {
        for (const skill of safeArray(
            category?.items
        )) {
            const name =
                normalize(skill?.name);

            if (
                name &&
                (
                    q === name ||
                    q.includes(name)
                )
            ) {
                return {
                    ...skill,
                    category:
                        category?.category ||
                        'Skills'
                };
            }
        }
    }

    return null;
}

/* =========================================================
   FALLBACK
   ========================================================= */

function unknownAnswer() {
    return `
        <div class="assistant-result">
            <p>
                I don't have verified information about that
                in Harsh's portfolio.
            </p>

            <p>
                I won't guess, infer, or invent an answer.
            </p>

            <p>
                Try asking about
                <strong>projects</strong>,
                <strong>skills</strong>,
                <strong>experience</strong>,
                <strong>education</strong>,
                <strong>achievements</strong>,
                <strong>reading</strong>,
                <strong>resume</strong>, or
                <strong>contact</strong>.
            </p>
        </div>
    `;
}

/* =========================================================
   RESPONSES
   ========================================================= */

function greetingAnswer() {
    return `
        <div class="assistant-result">
            <p>
                Hello. I'm <strong>Aether</strong>. ✦
            </p>

            <p>
                I'm the grounded portfolio assistant
                for Harsh Dubey.
            </p>

            <p>
                I only answer using verified information
                stored in this portfolio.
            </p>
        </div>
    `;
}

function aboutAnswer() {
    return `
        <div class="assistant-result">
            <p>
                I'm <strong>Aether</strong>, the portfolio
                companion for <strong>Harsh Dubey</strong>.
            </p>

            <p>
                Harsh is pursuing BSc Information Technology
                at <strong>Thakur Specialized Degree College</strong>.
            </p>

            <p>
                The portfolio records a CGPA of
                <strong>9.5</strong>.
            </p>

            <p>
                I can provide verified information about
                projects, skills, experience, education,
                achievements, reading and portfolio resources.
            </p>
        </div>
    `;
}

function projectsAnswer(projects) {
    const list = safeArray(projects);

    if (!list.length) {
        return unknownAnswer();
    }

    return `
        <div class="assistant-result">

            <p>
                The portfolio contains
                <strong>${list.length}</strong>
                represented project(s):
            </p>

            ${list.map(project => `
                <div class="assistant-project-item">

                    <strong>
                        ${escapeHTML(
                            project?.title ||
                            'Untitled Project'
                        )}
                    </strong>

                    ${
                        project?.description
                            ? `
                                <p>
                                    ${escapeHTML(
                                        project.description
                                    )}
                                </p>
                            `
                            : ''
                    }

                </div>
            `).join('')}

        </div>
    `;
}

function projectAnswer(project) {
    if (!project) {
        return unknownAnswer();
    }

    const study =
        project.caseStudy || {};

    const tech =
        safeArray(project.tech)
            .map(item => `
                <span>
                    ${escapeHTML(item)}
                </span>
            `)
            .join('');

    const links = [];

    if (project.live) {
        links.push(`
            <a
                href="${escapeHTML(project.live)}"
                target="_blank"
                rel="noopener noreferrer"
                class="assistant-action"
            >
                Live Project ↗
            </a>
        `);
    }

    if (project.github) {
        links.push(`
            <a
                href="${escapeHTML(project.github)}"
                target="_blank"
                rel="noopener noreferrer"
                class="assistant-action"
            >
                GitHub ↗
            </a>
        `);
    }

    return `
        <div class="assistant-result">

            <strong>
                ${escapeHTML(
                    project.title ||
                    'Project'
                )}
            </strong>

            ${
                project.description
                    ? `
                        <p>
                            ${escapeHTML(
                                project.description
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                study.problem
                    ? `
                        <p>
                            <strong>Problem:</strong>
                            ${escapeHTML(
                                study.problem
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                study.architecture
                    ? `
                        <p>
                            <strong>Architecture:</strong>
                            ${escapeHTML(
                                study.architecture
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                study.impact
                    ? `
                        <p>
                            <strong>Impact:</strong>
                            ${escapeHTML(
                                study.impact
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                tech
                    ? `
                        <div class="assistant-tags">
                            ${tech}
                        </div>
                    `
                    : ''
            }

            ${
                links.length
                    ? `
                        <div class="assistant-links">
                            ${links.join('')}
                        </div>
                    `
                    : ''
            }

        </div>
    `;
}

function skillsAnswer(skills) {
    const list = safeArray(skills);

    if (!list.length) {
        return unknownAnswer();
    }

    return `
        <div class="assistant-result">

            <p>
                These are the skill categories
                represented in the portfolio:
            </p>

            ${list.map(category => `
                <div class="assistant-skill-group">

                    <strong>
                        ${escapeHTML(
                            category?.category ||
                            'Skills'
                        )}
                    </strong>

                    <p>
                        ${safeArray(category?.items)
                            .map(item =>
                                escapeHTML(
                                    item?.name || ''
                                )
                            )
                            .filter(Boolean)
                            .join(' · ')}
                    </p>

                </div>
            `).join('')}

        </div>
    `;
}

function skillAnswer(skill) {
    if (!skill) {
        return unknownAnswer();
    }

    return `
        <div class="assistant-result">

            <p>
                <strong>
                    ${escapeHTML(
                        skill.name
                    )}
                </strong>
                is explicitly listed in Harsh's
                portfolio under
                <strong>
                    ${escapeHTML(
                        skill.category
                    )}
                </strong>.
            </p>

        </div>
    `;
}

function experienceAnswer(items) {
    const list = safeArray(items);

    if (!list.length) {
        return unknownAnswer();
    }

    return list.map(item => `
        <div class="assistant-result">

            <strong>
                ${escapeHTML(
                    item?.title || ''
                )}
            </strong>

            ${
                item?.organization
                    ? `
                        <p>
                            ${escapeHTML(
                                item.organization
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                item?.description
                    ? `
                        <p>
                            ${escapeHTML(
                                item.description
                            )}
                        </p>
                    `
                    : ''
            }

        </div>
    `).join('');
}

function achievementsAnswer(items) {
    const list = safeArray(items);

    if (!list.length) {
        return unknownAnswer();
    }

    return list.map(item => `
        <div class="assistant-result">

            <strong>
                ${escapeHTML(
                    item?.icon || '✦'
                )}
                ${escapeHTML(
                    item?.title || ''
                )}
            </strong>

            ${
                item?.description
                    ? `
                        <p>
                            ${escapeHTML(
                                item.description
                            )}
                        </p>
                    `
                    : ''
            }

        </div>
    `).join('');
}

function educationAnswer(items) {
    const list = safeArray(items);

    if (!list.length) {
        return unknownAnswer();
    }

    return list.map(item => `
        <div class="assistant-result">

            <strong>
                ${escapeHTML(
                    item?.title || ''
                )}
            </strong>

            ${
                item?.subtitle
                    ? `
                        <p>
                            ${escapeHTML(
                                item.subtitle
                            )}
                        </p>
                    `
                    : ''
            }

            ${
                item?.date
                    ? `
                        <small>
                            ${escapeHTML(
                                item.date
                            )}
                        </small>
                    `
                    : ''
            }

        </div>
    `).join('');
}

function libraryAnswer(library) {
    const list = safeArray(library);

    if (!list.length) {
        return unknownAnswer();
    }

    const current =
        list.find(
            book => book?.currentlyReading
        );

    if (!current) {
        return `
            <div class="assistant-result">
                <p>
                    The portfolio contains a reading
                    library, but no book is currently
                    marked as being read.
                </p>
            </div>
        `;
    }

    return `
        <div class="assistant-result">

            <p>
                Harsh is currently reading
                <strong>
                    ${escapeHTML(
                        current.title
                    )}
                </strong>
                by
                ${escapeHTML(
                    current.author
                )}.
            </p>

            ${
                current.progress != null
                    ? `
                        <p>
                            Recorded progress:
                            <strong>
                                ${escapeHTML(
                                    current.progress
                                )}%
                            </strong>.
                        </p>
                    `
                    : ''
            }

            ${
                current.notes
                    ? `
                        <p>
                            ${escapeHTML(
                                current.notes
                            )}
                        </p>
                    `
                    : ''
            }

        </div>
    `;
}

function contactAnswer() {
    return `
        <div class="assistant-result">

            <p>
                You can reach Harsh through the
                contact section of this portfolio.
            </p>

            <button
                type="button"
                class="assistant-action"
                data-action="contact"
            >
                Open Contact Section →
            </button>

        </div>
    `;
}

function githubAnswer() {
    return `
        <div class="assistant-result">

            <p>
                GitHub projects are linked directly
                from the portfolio.
            </p>

            <button
                type="button"
                class="assistant-action"
                data-action="github"
            >
                Open GitHub Projects →
            </button>

        </div>
    `;
}

function resumeAnswer() {
    return `
        <div class="assistant-result">

            <p>
                Harsh's resume is available from
                the portfolio.
            </p>

            <a
                class="assistant-action"
                href="Harsh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open Resume →
            </a>

        </div>
    `;
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigateTo(selector) {
    const element =
        document.querySelector(selector);

    if (!element) {
        return false;
    }

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    return true;
}

function handleAction(action) {
    const routes = {
        contact: '#contact',
        github: '#projects',
        projects: '#projects',
        skills: '#about',
        experience: '#timeline'
    };

    const selector =
        routes[action];

    if (selector) {
        navigateTo(selector);
    }
}

/* =========================================================
   INTENT ENGINE
   ========================================================= */

function answerQuery(input, data) {
    const q = normalize(input);

    if (!q) {
        return `
            <div class="assistant-result">
                <p>
                    Ask me something about Harsh's portfolio.
                </p>
            </div>
        `;
    }

    /* -----------------------------------------------------
       GREETING
       ----------------------------------------------------- */

    if (
        ['hi', 'hello', 'hey', 'yo', 'sup']
            .includes(q) ||
        q.includes('hello aether')
    ) {
        return greetingAnswer();
    }

    /* -----------------------------------------------------
       IDENTITY
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'who is harsh',
            'tell me about harsh',
            'about harsh',
            'who are you',
            'who is this'
        ])
    ) {
        return aboutAnswer();
    }

    /* -----------------------------------------------------
       PROJECT-SPECIFIC QUESTIONS
       ----------------------------------------------------- */

    const project =
        findProject(
            q,
            data.projects
        );

    if (project) {
        return projectAnswer(project);
    }

    /* -----------------------------------------------------
       PROJECT LIST
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'projects',
            'project list',
            'what has he built',
            'what did he build',
            'portfolio projects',
            'his work',
            'what projects'
        ])
    ) {
        return projectsAnswer(
            data.projects
        );
    }

    /* -----------------------------------------------------
       SKILLS
       ----------------------------------------------------- */

    const skill =
        findSkill(
            q,
            data.skills
        );

    if (skill) {
        return skillAnswer(skill);
    }

    if (
        containsAny(q, [
            'skills',
            'technologies',
            'technology',
            'tech stack',
            'what can he build',
            'what does he know'
        ])
    ) {
        return skillsAnswer(
            data.skills
        );
    }

    /* -----------------------------------------------------
       EXPERIENCE
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'experience',
            'work experience',
            'roles',
            'organizations',
            'where has he worked'
        ])
    ) {
        return experienceAnswer(
            data.experience
        );
    }

    /* -----------------------------------------------------
       ACHIEVEMENTS
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'achievements',
            'awards',
            'award',
            'accomplishments',
            'hackathon',
            'won'
        ])
    ) {
        return achievementsAnswer(
            data.achievements
        );
    }

    /* -----------------------------------------------------
       EDUCATION
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'education',
            'college',
            'degree',
            'bsc',
            'cgpa',
            'study',
            'studying'
        ])
    ) {
        return educationAnswer(
            data.timeline
        );
    }

    /* -----------------------------------------------------
       LIBRARY
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'reading',
            'book',
            'books',
            'library',
            'currently reading'
        ])
    ) {
        return libraryAnswer(
            data.library
        );
    }

    /* -----------------------------------------------------
       CONTACT
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'contact',
            'email',
            'reach him',
            'get in touch',
            'hire him',
            'hire harsh'
        ])
    ) {
        return contactAnswer();
    }

    /* -----------------------------------------------------
       GITHUB
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'github',
            'source code',
            'repositories',
            'repo'
        ])
    ) {
        return githubAnswer();
    }

    /* -----------------------------------------------------
       RESUME
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'resume',
            'cv',
            'curriculum vitae'
        ])
    ) {
        return resumeAnswer();
    }

    /* -----------------------------------------------------
       NAVIGATION
       ----------------------------------------------------- */

    if (
        containsAny(q, [
            'show projects',
            'open projects',
            'go to projects'
        ])
    ) {
        navigateTo('#projects');

        return `
            <div class="assistant-result">
                <p>
                    Taking you to the
                    <strong>Projects</strong> section.
                </p>
            </div>
        `;
    }

    if (
        containsAny(q, [
            'show skills',
            'open skills',
            'go to skills'
        ])
    ) {
        navigateTo('#about');

        return `
            <div class="assistant-result">
                <p>
                    Taking you to the
                    <strong>Skills</strong> section.
                </p>
            </div>
        `;
    }

    /* -----------------------------------------------------
       HARD FALLBACK
       ----------------------------------------------------- */

    return unknownAnswer();
}

/* =========================================================
   UI
   ========================================================= */

function scrollMessages() {
    const { messages } =
        getElements();

    if (!messages) return;

    requestAnimationFrame(() => {
        messages.scrollTop =
            messages.scrollHeight;
    });
}

function addMessage(
    html,
    type = 'ai'
) {
    const { messages } =
        getElements();

    if (!messages) {
        return null;
    }

    const wrapper =
        document.createElement('div');

    wrapper.className =
        `msg ${type}`;

    const bubble =
        document.createElement('div');

    bubble.className =
        'msg-bubble';

    /*
     * AI HTML is internally generated from
     * escaped portfolio data.
     *
     * User messages are escaped before
     * reaching this function.
     */
    bubble.innerHTML = html;

    wrapper.appendChild(bubble);

    messages.appendChild(wrapper);

    scrollMessages();

    return wrapper;
}

function addTypingIndicator() {
    return addMessage(`
        <span
            class="assistant-typing"
            aria-label="Aether is thinking"
        >
            <span></span>
            <span></span>
            <span></span>
        </span>
    `);
}

/* =========================================================
   OPEN / CLOSE
   ========================================================= */

function setOpen(open) {
    const {
        button,
        panel,
        input
    } = getElements();

    if (!button || !panel) {
        return;
    }

    state.open =
        Boolean(open);

    button.classList.toggle(
        'open',
        state.open
    );

    panel.classList.toggle(
        'open',
        state.open
    );

    button.setAttribute(
        'aria-expanded',
        String(state.open)
    );

    /*
     * Recalculate dimensions whenever
     * the assistant opens.
     */
    if (state.open) {
        applyViewportSafety();

        setTimeout(() => {
            input?.focus();
            scrollMessages();
        }, 120);
    }
}

/* =========================================================
   SEND
   ========================================================= */

function sendQuery(rawInput) {
    if (state.sending) {
        return;
    }

    const input =
        String(rawInput || '')
            .trim();

    if (!input) {
        return;
    }

    state.sending = true;

    const { input: inputElement } =
        getElements();

    if (inputElement) {
        inputElement.value = '';
    }

    /*
     * ALWAYS escape user-controlled content.
     */
    addMessage(
        escapeHTML(input),
        'user'
    );

    const typing =
        addTypingIndicator();

    /*
     * Deterministic response.
     * No random AI generation.
     */
    setTimeout(() => {

        typing?.remove();

        const response =
            answerQuery(
                input,
                state.data
            );

        addMessage(
            response,
            'ai'
        );

        state.sending = false;

        applyViewportSafety();

    }, 180);
}

/* =========================================================
   EVENTS
   ========================================================= */

function bindEvents() {
    if (state.initialized) {
        return;
    }

    const {
        button,
        close,
        input,
        send,
        chips
    } = getElements();

    if (!button || !input) {
        console.warn(
            '[AETHER] Required UI elements not found.'
        );

        return;
    }

    state.initialized = true;

    /* Open */
    button.addEventListener(
        'click',
        () => {
            setOpen(!state.open);
        }
    );

    /* Close */
    close?.addEventListener(
        'click',
        () => {
            setOpen(false);
        }
    );

    /* Send button */
    send?.addEventListener(
        'click',
        () => {
            sendQuery(
                input.value
            );
        }
    );

    /* Keyboard */
    input.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Enter' &&
                !event.shiftKey
            ) {
                event.preventDefault();

                sendQuery(
                    input.value
                );
            }

            if (
                event.key === 'Escape'
            ) {
                setOpen(false);
            }
        }
    );

    /* Quick prompts */
    chips.forEach(chip => {

        chip.addEventListener(
            'click',
            () => {

                const question =
                    chip.textContent.trim();

                if (!question) {
                    return;
                }

                input.value =
                    question;

                sendQuery(
                    question
                );
            }
        );

    });

    /*
     * Delegated action handling.
     */
    document.addEventListener(
        'click',
        event => {

            const actionElement =
                event.target.closest(
                    '[data-action]'
                );

            if (!actionElement) {
                return;
            }

            handleAction(
                actionElement.dataset.action
            );
        }
    );
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

export async function initAICompanion() {

    const {
        button,
        panel
    } = getElements();

    /*
     * Fail silently if the AI section
     * doesn't exist on a page.
     */
    if (!button || !panel) {
        return;
    }

    /*
     * Apply layout protection BEFORE
     * the user can interact with it.
     */
    applyViewportSafety();

    bindViewportEvents();

    bindEvents();

    try {

        state.data =
            await loadPortfolioData();

        /*
         * Normalize missing data sources.
         */
        for (
            const key of Object.keys(
                DATA_SOURCES
            )
        ) {
            if (
                state.data[key] == null
            ) {
                state.data[key] = [];
            }
        }

        console.info(
            '[AETHER] Grounded portfolio assistant initialized.'
        );

    } catch (error) {

        console.error(
            '[AETHER] Initialization failed:',
            error
        );

        state.data = {};
    }
}