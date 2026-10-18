/**
 * js/projects.js
 * Projects Renderer — Dynamic Card Injection & Case Study Modal Controller
 */

import { fetchJson } from './utils.js';
import { bindHoverTargets } from './cursor.js';

const FALLBACK = [
  {
    id: 'modal-kaamkaagaz', number: '01 / 04', title: 'KaamKaagaz — Civic Tech & Admissions Platform',
    accentGradient: 'linear-gradient(90deg,#c8561b,#f59e0b)',
    tech: ['Next.js 15','React 19','TypeScript','Tailwind CSS'],
    description: 'A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.',
    github: 'https://github.com/chillingbing648-sketch/KaamKaagaz.git',
    live: 'https://chillingbing648-sketch.github.io/KaamKaagaz/',
    award: null,
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#1c0e08,#2a140a,#0d1520)',
      story:'Government paperwork and university admissions in India are rarely difficult because the forms themselves are complex — the real friction is deciphering scattered requirements across outdated portals. Having managed university admissions logistics firsthand as an IT Specialist at University of Mumbai, I saw hundreds of students overwhelmed by contradictory requirements. I built KaamKaagaz to turn that anxiety into a clean, transparent roadmap from question to official submission.',
      problem:'Critical guidance for essential documents and higher-education admissions is fragmented across disconnected portals, laden with bureaucratic jargon, and inaccessible in regional languages.',
      architecture:'Architected with Next.js 15 (App Router), React 19, and TypeScript as a static-exported, zero-dependency civic engine. Features a deterministic, privacy-first client-side conversational search engine that normalizes Hinglish/Hindi queries without remote API latency or data tracking.',
      stack:['Next.js 15','React 19','TypeScript 5.6','Tailwind CSS 4','Static Export','localStorage','GitHub Actions'],
      challenges:'Structuring complex, multi-stage bureaucratic workflows into unambiguous state machines while ensuring 100% data privacy by keeping checklist data strictly in local storage.',
      impact:'Empowered students and citizens with self-serve clarity across essential government documentation and higher-education admission portals.',
      lessons:'Civic technology must prioritize trust, transparency, and accessibility over algorithmic obscurity. When you design for clarity, you remove real-world friction for thousands.'
    }
  },
  {
    id: 'modal-attendify', number: '02 / 04', title: 'Attendify — Attendance Platform',
    accentGradient: 'linear-gradient(90deg,#3b82f6,#8b5cf6)',
    tech: ['C++','Node.js','JSON'],
    description: 'A highly organized web-based platform for structured attendance data tracking. Engineered with a clean UI to manage real-time attendance logistics seamlessly.',
    github: 'https://github.com/chillingbing648-sketch/Attendify.git',
    live: 'https://chillingbing648-sketch.github.io/Attendify/',
    award: null,
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#06103a,#120d3a,#0d1530)',
      story:'A problem experienced firsthand every semester — no clean, fast way to track attendance across multiple subjects with different thresholds.',
      problem:'Students need to maintain minimum attendance percentages across 5–8 subjects simultaneously. No lightweight tool existed to project future attendance and alert when thresholds were at risk.',
      architecture:'Built with C++ core logic for attendance calculations, wrapped with a Node.js API layer and a clean JSON data store.',
      stack:['C++','Node.js','JSON Data Store','REST API','HTML/CSS/JS'],
      challenges:'Integrating C++ core processing with Node.js async API handling. Keeping user state synced across browser restarts without authentication friction.',
      impact:'Eliminated spreadsheet dependency for attendance tracking. Real-time projections give students clear visibility of their academic standing.',
      lessons:'The simplest ideas often create the most value. Bridging compiled languages with web UIs is powerful.'
    }
  },
  {
    id: 'modal-sustainable', number: '03 / 04', title: 'Continuity - Financial Sustainability Vault',
    accentGradient: 'linear-gradient(90deg,#10b981,#06b6d4)',
    tech: ['AI Integration','React','Data Analysis'],
    description: 'Continuity is a secure digital legacy platform that brings wills, investments, assets, estates, and important documents into one trusted place — with controlled access for the people who matter most.',
    github: 'https://github.com/chillingbing648-sketch/Continuity.git',
    live: 'https://chillingbing648-sketch.github.io/Continuity/',
    award: null,
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#001a0e,#001520,#0a1a0a)',
      story:'A secure digital legacy platform designed to bring wills, investments, assets, estates, and important documents together in one trusted place. Continuity focuses on making personal legacies organized, accessible, and securely shareable with the people who matter most.',
      problem:'Important financial and legacy information is often scattered across documents, accounts, institutions, and personal records. Families may struggle to know what exists, where it is, or how to access it when it matters most.',
      architecture:'Built a centralized digital platform that enables users to organize assets, investments, wills, estates, and critical documents, while providing secure, role-based access and family notifications for controlled information sharing.',
      stack:['Full-Stack','Secure Data Management','Access Control','Responsive Design'],
      challenges:'Designing a system that balances accessibility with privacy and security. Creating a simple experience for managing complex financial and legacy information while ensuring that sensitive data is shared only with the right people.',
      impact:'Created a unified digital space for managing personal legacy and financial information, helping individuals stay organized while giving trusted family members the right access when needed.',
      lessons:'The best digital systems simplify complexity without compromising trust. Continuity was built around the idea that preserving a legacy is not just about storing information, but ensuring it reaches the right people at the right time.'
    }
  },
  {
    id: 'modal-chatbot', number: '04 / 04', title: 'WALL-E — Mental Health AI Companion App',
    accentGradient: 'linear-gradient(90deg,#ec4899,#8b5cf6)',
    tech: ['AI Integration','Mood Tracking','Guided Journaling'],
    description: 'A supportive AI companion for mood check-ins, guided journaling, and reflective conversations — designed to encourage healthier daily habits with clear, user-first boundaries.',
    github: 'https://github.com/chillingbing648-sketch/WALL-E.git',
    live: 'https://chillingbing648-sketch.github.io/WALL-E/',
    award: null,
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#1a0520,#0d0530,#200520)',
      story:'WALL-E began with a simple idea: create a calm, private space where a person can pause, reflect, and build a more consistent emotional check-in habit.',
      problem:'Daily stress is easy to overlook until it compounds. People need a low-friction way to capture how they feel, reflect on patterns, and find supportive prompts without replacing professional care.',
      architecture:'A responsive AI companion experience with guided check-ins, journal prompts, mood history, and contextual conversation flows. Personal reflection stays at the center, with support resources easy to access when needed.',
      stack:['JavaScript','AI Integration','Local Storage','Responsive Design'],
      challenges:'Designing language that feels supportive without making clinical claims, protecting personal reflections, and making the experience clear about its limits.',
      impact:'Created a gentler daily reflection experience that helps users notice patterns and make space for intentional self-care.',
      lessons:'Empathy must shape every interaction. Mental-health-related tools need clear boundaries, privacy-first decisions, and easy access to professional support.'
    }
  }
];

let currentModal = null;
let lastFocusedTrigger = null;

export async function initProjects() {
    const grid = document.getElementById('projects-grid');
    const modalsContainer = document.getElementById('project-modals-container');
    if (!grid) return;

    const data = await fetchJson('data/projects.json', FALLBACK);
    renderProjectCards(grid, data);
    renderModals(modalsContainer || document.body, data);
    initCardInteractivity();
    bindHoverTargets();
}

function renderProjectCards(grid, data) {
    grid.innerHTML = data.map(p => `
        <div class="project-card" data-modal="${p.id}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open case study for ${p.title}">
            <div class="project-card-inner">
                <div class="project-accent" style="background:${p.accentGradient}"></div>
                ${p.award ? `<div class="award-badge">${p.award}</div>` : ''}
                <div class="project-number">${p.number}</div>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()" aria-label="View source code on GitHub for ${p.title}">GitHub ↗</a>` : ''}
                    ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()" aria-label="View live deployment for ${p.title}">Live Demo ↗</a>` : ''}
                    <button class="project-case-btn" data-modal="${p.id}" type="button" aria-label="Read case study for ${p.title}">Case Study</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderModals(container, data) {
    const existingModals = container.querySelectorAll('.case-modal-overlay');
    existingModals.forEach(m => m.remove());

    data.forEach(p => {
        const cs = p.caseStudy;
        const el = document.createElement('div');
        el.className = 'case-modal-overlay';
        el.id = p.id + '-overlay';
        el.setAttribute('role','dialog');
        el.setAttribute('aria-modal','true');
        el.setAttribute('aria-label',`Case study: ${p.title}`);
        el.innerHTML = `
            <div class="case-modal">
                <div class="case-modal-hero">
                    <div class="case-modal-hero-bg" style="background:${cs.heroGradient}"></div>
                    <div class="case-modal-hero-overlay"></div>
                    <button class="case-modal-close" aria-label="Close case study">✕</button>
                    <div style="position:relative;z-index:2">
                        <div class="case-section-label" style="margin-bottom:0.4rem">${p.number}</div>
                        <h2 style="font-size:1.9rem;font-weight:800;letter-spacing:-0.02em">${p.title}</h2>
                        ${p.award ? `<div class="award-badge" style="margin-top:0.8rem">${p.award}</div>` : ''}
                    </div>
                </div>
                <div class="case-modal-body">
                    <div class="case-section">
                        <div class="case-section-label">Origin Story</div>
                        <div class="case-section-content">${cs.story}</div>
                    </div>
                    <div class="case-grid-2">
                        <div class="case-section">
                            <div class="case-section-label">The Problem</div>
                            <div class="case-section-content">${cs.problem}</div>
                        </div>
                        <div class="case-section">
                            <div class="case-section-label">Architecture</div>
                            <div class="case-section-content">${cs.architecture}</div>
                        </div>
                    </div>
                    <div class="case-section">
                        <div class="case-section-label">Tech Stack</div>
                        <div class="case-tech-grid">
                            ${cs.stack.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="case-grid-2">
                        <div class="case-impact-box case-section">
                            <div class="case-section-label">Impact</div>
                            <div class="case-section-content">${cs.impact}</div>
                        </div>
                        <div class="case-lesson-box case-section">
                            <div class="case-section-label">Lessons Learned</div>
                            <div class="case-section-content">${cs.lessons}</div>
                        </div>
                    </div>
                    <div class="case-section">
                        <div class="case-section-label">Key Challenges</div>
                        <div class="case-section-content">${cs.challenges}</div>
                    </div>
                    <div class="case-links">
                        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size:0.88rem;padding:0.75rem 1.6rem">GitHub ↗</a>` : ''}
                        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:0.88rem;padding:0.75rem 1.6rem">View Live ↗</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(el);

        // Close button
        el.querySelector('.case-modal-close').addEventListener('click', () => closeModal(el));
        el.addEventListener('click', e => { if (e.target === el) closeModal(el); });
    });

    // ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && currentModal) closeModal(currentModal);
    });
}

function initCardInteractivity() {
    // 3D Tilt & Card spotlight effect
    document.querySelectorAll('.project-card-inner').forEach(card => {
        card.parentElement.style.perspective = '1000px';

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--spotlight-x', (x / rect.width * 100) + '%');
            card.style.setProperty('--spotlight-y', (y / rect.height * 100) + '%');

            // Max 8deg tilt for Apple/Awwwards smooth spring feel
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });

    // Card & button click / keyboard → open modal
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            const id = trigger.dataset.modal;
            openModal(id, trigger);
        });

        trigger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const id = trigger.dataset.modal;
                openModal(id, trigger);
            }
        });
    });
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        if (currentModal) closeModal(currentModal);
        return;
    }
    if (e.key === 'Tab' && currentModal) {
        const focusables = Array.from(currentModal.querySelectorAll('button:not([disabled]), [tabindex="0"], a[href]'))
            .filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
}

export function openModal(id, trigger) {
    const overlay = document.getElementById(id + '-overlay');
    if (!overlay) return;
    lastFocusedTrigger = trigger || document.activeElement;
    currentModal = overlay;
    document.body.style.overflow = 'hidden';
    overlay.classList.add('open');
    window.addEventListener('keydown', handleModalKeydown);
    const closeBtn = overlay.querySelector('.case-modal-close');
    setTimeout(() => {
        if (closeBtn) closeBtn.focus();
        else overlay.querySelector('.case-modal')?.focus();
    }, 100);
}

function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentModal = null;
    window.removeEventListener('keydown', handleModalKeydown);
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
    }
}
