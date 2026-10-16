/**
 * js/timeline.js
 * Timeline & Achievements Renderer — Living Credentials Motion System
 */

import { fetchJson } from './utils.js';

const FB_TIMELINE = [
  { date:'Currently Pursuing', title:'BSc Information Technology', subtitle:'Thakur Specialised Degree College · CGPA 9.5', position:'left' },
  { date:'2024 — 2025', title:'12th Grade (Computer Science)', subtitle:'Sardar Vallabhai Patel College', position:'right' },
  { date:'2022 — 2023', title:'10th Grade', subtitle:'St. Xavier\'s High School · Maharashtra Board', position:'left' }
];

const FB_ACHIEVEMENTS = [
  {
    id: 'debate',
    badge: '1st Place Gold',
    category: 'Oratory & Dialectic',
    title: 'IntraCollegiate Debate Winner',
    proof: 'Unanimous Jury Decision',
    description: 'Won first place for rigorous arguments, research, and persuasive cross-examination.',
    skills: ['Critical Thinking', 'Rhetorical Synthesis', 'Cross-Examination', 'Decisive Articulation']
  },
  {
    id: 'pr-head',
    badge: 'Leadership & Outreach',
    category: 'InterCollegiate Fest',
    title: 'Public Relations Head',
    proof: '2,000+ Footfall · 1,000+ Registrations · 40+ Colleges',
    description: 'Led festival outreach and campaigns, connecting students and colleges across Mumbai.',
    metrics: [
      { val: '2,000+', label: 'Footfall' },
      { val: '1,000+', label: 'Registrations' },
      { val: '40+', label: 'Colleges' }
    ],
    skills: ['Omni-channel Outreach', 'Stakeholder Diplomacy', 'Team Leadership', 'Crisis Logistics']
  },
  {
    id: 'academic',
    badge: 'Academic Distinction',
    category: 'BSc Information Technology',
    title: 'Academic Excellence',
    proof: '9.50 CGPA · Top 1% Merit',
    description: 'Maintained a 9.50 CGPA while contributing to student leadership and campus initiatives.',
    skills: ['Computer Science Rigor', 'Data Structures', 'Discipline & Synthesis', 'Civic Leadership']
  }
];

export async function initTimeline() {
    const wrapper = document.getElementById('timeline-items-wrapper');
    const achievementsGrid = document.getElementById('achievements-grid');

    const [timelineData, achievementsData] = await Promise.all([
        fetchJson('data/timeline.json', FB_TIMELINE),
        fetchJson('data/achievements.json', FB_ACHIEVEMENTS)
    ]);

    if (wrapper) renderTimeline(wrapper, timelineData);
    if (achievementsGrid) renderAchievements(achievementsGrid, achievementsData);
    initTimelineProgress();
}

function renderTimeline(wrapper, data) {
    wrapper.innerHTML = data.map((item, i) => `
        <div class="timeline-item ${item.position} reveal-item" style="--delay:${i * 0.15}s">
            <div class="timeline-card glass-panel">
                <div class="timeline-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p style="color:var(--text-muted);font-size:0.92rem;margin-top:0.4rem">${item.subtitle}</p>
            </div>
        </div>
    `).join('');
}

function getAchievementIcon(id) {
    if (id === 'debate') {
        return `
            <svg class="achievement-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/>
                <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/>
            </svg>
        `;
    }
    if (id === 'pr-head') {
        return `
            <svg class="achievement-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        `;
    }
    return `
        <svg class="achievement-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
    `;
}

function renderCardMotionProof(a) {
    if (a.id === 'debate') {
        return `
            <div class="card-motion-area debate-motion" aria-label="Proof highlight">
                <div class="proof-callout debate-proof">
                    <span class="proof-accent-icon" aria-hidden="true">✦</span>
                    <span class="proof-text">${a.proof || 'Unanimous Jury Decision'}</span>
                </div>
                <div class="debate-blade-line" aria-hidden="true">
                    <span class="debate-blade-light"></span>
                </div>
            </div>
        `;
    }

    if (a.id === 'pr-head') {
        return `
            <div class="card-motion-area pr-motion" aria-label="Verified reach metrics">
                <div class="pr-metrics-sequence">
                    <span class="pr-metric-chip" style="--stagger: 0ms">
                        <strong class="pr-val">2,000+</strong>
                        <span class="pr-lbl">Footfall</span>
                    </span>
                    <span class="pr-sep" aria-hidden="true">·</span>
                    <span class="pr-metric-chip" style="--stagger: 75ms">
                        <strong class="pr-val">1,000+</strong>
                        <span class="pr-lbl">Registrations</span>
                    </span>
                    <span class="pr-sep" aria-hidden="true">·</span>
                    <span class="pr-metric-chip" style="--stagger: 150ms">
                        <strong class="pr-val">40+</strong>
                        <span class="pr-lbl">Colleges</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Default: Academic
    return `
        <div class="card-motion-area academic-motion" aria-label="Scholastic achievement">
            <div class="academic-proof-headline">
                <span class="academic-proof-val">9.50 CGPA</span>
                <span class="academic-proof-sep" aria-hidden="true">·</span>
                <span class="academic-proof-val">Top 1% Merit Standing</span>
            </div>
            <div class="academic-progress-track" aria-hidden="true">
                <div class="academic-progress-bar"></div>
            </div>
        </div>
    `;
}

function renderAchievements(grid, data) {
    grid.innerHTML = data.map((a, i) => {
        const motionProofHtml = renderCardMotionProof(a);

        const skillsHtml = Array.isArray(a.skills) ? `
            <div class="drawer-competencies">
                <span class="drawer-heading">Competencies Demonstrated</span>
                <div class="drawer-pills">
                    ${a.skills.map(skill => `<span class="competency-pill">${skill}</span>`).join('')}
                </div>
            </div>
        ` : '';

        return `
            <article class="achievement-card reveal-item"
                     data-id="${a.id || i}"
                     tabindex="0"
                     role="region"
                     aria-label="${a.title}"
                     style="--delay:${i * 0.12}s">

                <!-- Header: Minimal Icon + Category Badge -->
                <div class="achievement-top-row">
                    <div class="achievement-icon-frame" aria-hidden="true">
                        ${getAchievementIcon(a.id)}
                    </div>
                    <span class="achievement-badge">${a.badge || 'Distinction'}</span>
                </div>

                <!-- Academic/Domain Hierarchy -->
                <div class="achievement-category">${a.category || 'Achievement'}</div>
                <h3 class="achievement-title">${a.title}</h3>

                <!-- Distinct Motion Signature Proof Area -->
                ${motionProofHtml}

                <!-- Concise Narrative Description -->
                <p class="achievement-description">${a.description}</p>

                <!-- Credential Inspection Action -->
                <div class="achievement-footer-action">
                    <button type="button"
                            class="achievement-credential-trigger"
                            aria-expanded="false"
                            aria-controls="cred-drawer-${a.id || i}">
                        <span class="credential-btn-text">Verification &amp; Details</span>
                        <svg class="credential-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </button>
                </div>

                <!-- Expandable Credential Drawer -->
                <div class="achievement-credential-drawer" id="cred-drawer-${a.id || i}" aria-hidden="true">
                    ${skillsHtml}
                    <div class="achievement-verification-note">
                        <svg class="verification-check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span>Verified Institutional Record</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    initAchievementInteractions(grid);
}

function initAchievementInteractions(grid) {
    const cards = grid.querySelectorAll('.achievement-card');

    cards.forEach(card => {
        // Soft localized pointer response & subtle capped micro-tilt (max ±3.5 degrees)
        const handlePointerMove = (e) => {
            if (e.pointerType === 'touch') return;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = ((0.5 - y) * 6).toFixed(2);
            const tiltY = ((x - 0.5) * 6).toFixed(2);
            const mouseX = (x * 100).toFixed(1);
            const mouseY = (y * 100).toFixed(1);

            card.style.setProperty('--tilt-x', `${tiltX}deg`);
            card.style.setProperty('--tilt-y', `${tiltY}deg`);
            card.style.setProperty('--mouse-x', `${mouseX}%`);
            card.style.setProperty('--mouse-y', `${mouseY}%`);
            card.style.setProperty('--spotlight-opacity', '1');
        };

        const handlePointerLeave = () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
            card.style.setProperty('--spotlight-opacity', '0');
        };

        card.addEventListener('pointermove', handlePointerMove, { passive: true });
        card.addEventListener('pointerleave', handlePointerLeave, { passive: true });

        // Click & keyboard toggle handler
        const trigger = card.querySelector('.achievement-credential-trigger');
        const drawer = card.querySelector('.achievement-credential-drawer');
        const btnText = trigger?.querySelector('.credential-btn-text');

        if (trigger && drawer) {
            const toggleDrawer = () => {
                const isExpanded = card.classList.toggle('is-expanded');
                trigger.setAttribute('aria-expanded', isExpanded);
                drawer.setAttribute('aria-hidden', !isExpanded);
                if (btnText) {
                    btnText.textContent = isExpanded ? 'Collapse Details' : 'Verification & Details';
                }
            };

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDrawer();
            });

            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;
                toggleDrawer();
            });

            // Keyboard accessibility: Enter or Space on card container toggles drawer
            card.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
                    e.preventDefault();
                    toggleDrawer();
                }
            });
        }
    });
}

function initTimelineProgress() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const progressLine = document.getElementById('timelineProgress');
    const container = document.getElementById('timeline-container');
    if (!progressLine || !container) return;

    ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.6,
        onUpdate: self => {
            const totalLen = progressLine.getTotalLength?.() || 1000;
            const offset = totalLen * (1 - self.progress);
            progressLine.style.strokeDashoffset = offset;
        }
    });
}
