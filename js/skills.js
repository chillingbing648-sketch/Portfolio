/**
 * Skills & Dynamic Taxonomy Renderer
 */

import { fetchJson } from './utils.js';
import { bindHoverTargets } from './cursor.js';

const FALLBACK_SKILLS = [
  {
    "category": "Frontend",
    "icon": "🎨",
    "items": [
      {"name": "HTML5", "icon": "⚡"},
      {"name": "CSS3", "icon": "🎨"},
      {"name": "JavaScript ES6+", "icon": "🟡"},
      {"name": "TypeScript", "icon": "🔷"},
      {"name": "React", "icon": "⚛️"},
      {"name": "Next.js", "icon": "▲"},
      {"name": "TailwindCSS", "icon": "💨"},
      {"name": "Three.js", "icon": "🌐"},
      {"name": "WebGL", "icon": "🖼️"},
      {"name": "Responsive Design", "icon": "📱"},
      {"name": "Accessibility", "icon": "♿"}
    ]
  },
  {
    "category": "Backend & Databases",
    "icon": "⚙️",
    "items": [
      {"name": "Node.js", "icon": "🟩"},
      {"name": "Java", "icon": "☕"},
      {"name": "Express.js", "icon": "🚀"},
      {"name": "REST APIs", "icon": "🔗"},
      {"name": "Data Structures", "icon": "🧩"},
      {"name": "MySQL", "icon": "🗄️"},
      {"name": "MongoDB", "icon": "🍃"},
      {"name": "Firebase", "icon": "🔥"},
      {"name": "Supabase", "icon": "⚡"}
    ]
  },
  {
    "category": "AI & Intelligence",
    "icon": "🤖",
    "items": [
      {"name": "Prompt Engineering", "icon": "💬"},
      {"name": "OpenAI APIs", "icon": "🧠"},
      {"name": "Claude APIs", "icon": "✦"},
      {"name": "AI Agents", "icon": "🤖"}
    ]
  },
  {
    "category": "DevOps & Architecture",
    "icon": "🛠️",
    "items": [
      {"name": "Git & GitHub", "icon": "🐙"},
      {"name": "Vercel", "icon": "▲"},
      {"name": "Netlify", "icon": "🌐"},
      {"name": "CI/CD", "icon": "🔧"}
    ]
  },
  {
    "category": "Soft Skills",
    "icon": "🧠",
    "items": [
      {"name": "Leadership", "icon": "👑"},
      {"name": "Public Speaking", "icon": "🎙️"},
      {"name": "Teamwork", "icon": "🤝"},
      {"name": "Critical Thinking", "icon": "💡"},
      {"name": "Decision Making", "icon": "🎯"},
      {"name": "Strategic Thinking", "icon": "📈"},
      {"name": "Adaptability", "icon": "🔄"},
      {"name": "Time Management", "icon": "⏱️"}
    ]
  }
];

export async function initSkills() {
    const container = document.getElementById('skills-wrapper') || document.getElementById('skills-container');
    if (!container) return;

    const data = await fetchJson('data/skills.json', FALLBACK_SKILLS);
    renderSkills(container, data);
    initMagneticCapsules();
    bindHoverTargets();
}

function renderSkills(container, data) {
    container.innerHTML = data.map(cat => `
        <div class="skill-category">
            <div class="skill-category-header">
                <span class="skill-category-icon" aria-hidden="true">${cat.icon}</span>
                <h4>${cat.category}</h4>
                <div class="skill-cat-line" aria-hidden="true"></div>
            </div>
            <div class="skill-tags" role="list" aria-label="${cat.category} skills">
                ${cat.items.map(item => `
                    <div class="skill-capsule" role="listitem" tabindex="0" data-skill="${item.name.toLowerCase()}" title="${item.name} · Core Stack Capability" aria-label="${item.name}">
                        <span class="skill-icon" aria-hidden="true">${item.icon}</span>${item.name}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function initMagneticCapsules() {
    if (typeof gsap === 'undefined') return;
    const isTouch = window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches;
    if (isTouch) return;

    document.querySelectorAll('.skill-capsule').forEach(cap => {
        let capRect = null;
        cap.addEventListener('mouseenter', () => { capRect = cap.getBoundingClientRect(); }, { passive: true });
        cap.addEventListener('mousemove', e => {
            const rect = capRect || cap.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            gsap.to(cap, { x, y, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }, { passive: true });
        cap.addEventListener('mouseleave', () => {
            capRect = null;
            gsap.to(cap, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)', overwrite: 'auto' });
        }, { passive: true });
    });
}
