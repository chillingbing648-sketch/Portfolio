/**
 * js/timeline.js
 * Timeline & Achievements Renderer — Animated Progress Line + Milestone Cards
 */

import { fetchJson } from './utils.js';

const FB_TIMELINE = [
  { date:'Currently Pursuing', title:'BSc Information Technology', subtitle:'Thakur Specialised Degree College · GPA 9.1', position:'left' },
  { date:'2024 — 2025', title:'12th Grade (Computer Science)', subtitle:'Sardar Vallabhai Patel College', position:'right' },
  { date:'2022 — 2023', title:'10th Grade', subtitle:'St. Xavier\'s High School · Maharashtra Board', position:'left' }
];

const FB_ACHIEVEMENTS = [
  { icon:'🏆', title:'IntraCollegiate Debate Winner', description:'Won 1st place presenting well-researched arguments under pressure across diverse complex topics.' },
  { icon:'📊', title:'PR Head — InterCollegiate Fest', description:'Led PR efforts attracting 2,000+ attendees and generating 1,000+ registrations through strategic outreach.' },
  { icon:'🎓', title:'Academic Excellence', description:'Recognized for maintaining GPA 9.1 with active involvement in Fests, NSS Unit, and student leadership.' }
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

function renderAchievements(grid, data) {
    grid.innerHTML = data.map((a, i) => `
        <div class="achievement-card glass-panel reveal-item" style="--delay:${i * 0.12}s">
            <div class="achievement-icon">${a.icon}</div>
            <div>
                <h4 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem">${a.title}</h4>
                <p style="color:var(--text-muted);font-size:0.92rem;line-height:1.7">${a.description}</p>
            </div>
        </div>
    `).join('');
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
