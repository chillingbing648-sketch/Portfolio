/**
 * js/projects.js
 * Projects Renderer — Dynamic Card Injection & Case Study Modal Controller
 */

import { fetchJson } from './utils.js';
import { bindHoverTargets } from './cursor.js';

const FALLBACK = [
  {
    id: 'modal-psych', number: '01 / 04', title: 'Psychology Study Platform',
    accentGradient: 'linear-gradient(90deg,#8b5cf6,#06b6d4)',
    tech: ['HTML/CSS/JS','Claude AI API','Prompt Engineering'],
    description: 'An AI-powered learning system with dynamic flashcards, intelligent quizzes, and smart study guide generation — designed for deep cognitive retention.',
    github: 'https://github.com/chillingbing648-sketch/Psych-Study.git',
    live: 'https://chillingbing648-sketch.github.io/Psych-Study/',
    award: null,
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#1a0533,#0a1a40,#021520)',
      story:'Built during late-night study sessions fueled by one question: What if studying psychology wasn\'t painful? Most digital study tools were static, repetitive, and cognitively flat.',
      problem:'Traditional flashcards don\'t adapt to a student\'s current knowledge state. Students review what they already know, wasting time and losing retention.',
      architecture:'Integrated Claude AI API as an intelligent tutor layer. The system dynamically generates contextual flashcards, creates adaptive quizzes, and produces personalized study guides.',
      stack:['HTML5 / CSS3 / JS','Claude AI API','Prompt Engineering','Local Storage','Fetch API'],
      challenges:'Optimizing API call latency while maintaining smooth UX. Designing prompts that consistently produced structured, educationally valid output.',
      impact:'Transformed passive study into active AI-guided learning. Demonstrated that a single developer with AI tools can build what traditionally requires a full product team.',
      lessons:'AI can transform passive consumption into active engagement. Prompt design is as critical as code design.'
    }
  },
  {
    id: 'modal-attendify', number: '02 / 04', title: 'Attendify — Attendance Platform',
    accentGradient: 'linear-gradient(90deg,#3b82f6,#8b5cf6)',
    tech: ['C++','Node.js','JSON'],
    description: 'A highly organized web-based platform for structured attendance data tracking. Engineered with a clean UI to manage real-time attendance logistics seamlessly.',
    github: 'https://github.com/chillingbing648-sketch/Attendify.git',
    live: 'https://preview--vivid-web-transform.lovable.app/',
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
    id: 'modal-sustainable', number: '03 / 04', title: 'Sustainable Shopping Assistant',
    accentGradient: 'linear-gradient(90deg,#10b981,#06b6d4)',
    tech: ['AI Integration','Full-Stack','Data Analysis'],
    description: 'An intelligent assistant driving eco-friendly purchasing decisions through real-time data analysis. Awarded First Prize in a renowned Tech Hackathon.',
    github: null, live: 'https://chillingbing648-sketch.github.io/MENSWARE/',
    award: '🏆 First Prize — Tech Hackathon',
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#001a0e,#001520,#0a1a0a)',
      story:'A hackathon brief: solve a real-world problem in 24 hours. Most teams built dashboards. We built an intelligence layer.',
      problem:'Consumer purchasing decisions are made with minimal environmental context. The gap between intention and action is massive.',
      architecture:'AI-powered shopping assistant that analyzes products in real time, surfaces sustainability metrics, and recommends eco-friendly alternatives.',
      stack:['AI Integration','Full-Stack','Data Analysis','Responsive Design'],
      challenges:'Building a production-quality AI product in 24 hours. Sourcing and normalizing sustainability data in real time.',
      impact:'🏆 First Prize out of all competing teams. Validated the concept that AI can bridge the intention-action gap in sustainable consumer behavior.',
      lessons:'Pressure is a filter — it reveals true engineering capability. UX clarity often matters more than technical complexity.'
    }
  },
  {
    id: 'modal-chatbot', number: '04 / 04', title: 'Real-Time Chatbot',
    accentGradient: 'linear-gradient(90deg,#ec4899,#8b5cf6)',
    tech: ['Machine Learning','WebSockets','Real-Time'],
    description: 'A low-latency, scalable communication platform integrating ML features. Built under strict time constraints, ranking in the top 5% of 500 competitors.',
    github: null, live: null,
    award: '⭐ Top 5% — 500 Competitors',
    caseStudy: {
      heroGradient:'linear-gradient(135deg,#1a0520,#0d0530,#200520)',
      story:'500 developers. One brief. A strict time limit. I didn\'t approach this as a student competing — I approached it as an engineer solving a real infrastructure problem.',
      problem:'Real-time communication systems are deceptively complex. Maintaining low latency at scale, handling connection drops, and integrating ML features — all simultaneously, under pressure.',
      architecture:'WebSocket-based scalable chatbot with ML response generation, intent classification, and connection-resilient architecture with message queue buffering.',
      stack:['WebSockets','Machine Learning','Real-Time Architecture','Node.js'],
      challenges:'Optimizing socket payload sizes for maximum throughput. Preventing thread starvation during real-time ML inference.',
      impact:'Top 5% ranking among 500 developers. Engineering discipline, not just technical knowledge, separates good solutions from great ones.',
      lessons:'Architecture decisions made in the first 10 minutes define your ceiling. Calm, structured thinking beats reactive coding every time.'
    }
  }
];

let currentModal = null;

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
        <div class="project-card reveal-item" data-modal="${p.id}">
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
                    ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">GitHub ↗</a>` : ''}
                    ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">Live Demo ↗</a>` : ''}
                    <button class="project-case-btn" data-modal="${p.id}">Case Study</button>
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
    // Card spotlight effect
    document.querySelectorAll('.project-card-inner').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--spotlight-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
            card.style.setProperty('--spotlight-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
        });
    });

    // Card & button click → open modal
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            const id = trigger.dataset.modal;
            openModal(id);
        });
    });
}

export function openModal(id) {
    const overlay = document.getElementById(id + '-overlay');
    if (!overlay) return;
    currentModal = overlay;
    document.body.style.overflow = 'hidden';
    overlay.classList.add('open');
    overlay.querySelector('.case-modal')?.focus?.();
}

function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentModal = null;
}
