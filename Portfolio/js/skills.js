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
      {"name": "GSAP", "icon": "🟢"},
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
      {"name": "Express.js", "icon": "🚀"},
      {"name": "REST APIs", "icon": "🔗"},
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
      {"name": "AI Agents", "icon": "🤖"},
      {"name": "LLMs", "icon": "📚"},
      {"name": "RAG", "icon": "🔍"},
      {"name": "Automation", "icon": "🔄"}
    ]
  },
  {
    "category": "DevOps & Architecture",
    "icon": "🛠️",
    "items": [
      {"name": "Git & GitHub", "icon": "🐙"},
      {"name": "Docker", "icon": "🐳"},
      {"name": "Vercel", "icon": "▲"},
      {"name": "Netlify", "icon": "🌐"},
      {"name": "CI/CD", "icon": "🔧"},
      {"name": "System Design", "icon": "🏗️"},
      {"name": "MVC", "icon": "📊"}
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
                <span class="skill-category-icon">${cat.icon}</span>
                <h4>${cat.category}</h4>
                <div class="skill-cat-line"></div>
            </div>
            <div class="skill-tags">
                ${cat.items.map(item => `
                    <div class="skill-capsule" data-skill="${item.name.toLowerCase()}">
                        <span class="skill-icon">${item.icon}</span>${item.name}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function initMagneticCapsules() {
    if (typeof gsap === 'undefined') return;

    document.querySelectorAll('.skill-capsule').forEach(cap => {
        cap.addEventListener('mousemove', e => {
            const rect = cap.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            gsap.to(cap, { x, y, duration: 0.3, ease: 'power2.out' });
        });
        cap.addEventListener('mouseleave', () => {
            gsap.to(cap, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        });
    });
}
