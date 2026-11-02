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
    const categories = data.filter(category => Array.isArray(category.items) && category.items.length);
    if (!categories.length) return;

    container.innerHTML = \`
        <section class="skills-carousel" aria-label="Technical and professional skills">
            <div class="skills-carousel-topline">
                <span class="skills-carousel-eyebrow">THE TOOLKIT</span>
                <span class="skills-carousel-count" data-skill-count>01 <i>/ \${String(categories.length).padStart(2, '0')}</i></span>
            </div>
            <div class="skills-carousel-nav" role="tablist" aria-label="Skill categories">
                \${categories.map((cat, index) => \`
                    <button class="skills-category-tab\${index === 0 ? ' is-active' : ''}"
                            type="button" role="tab" aria-selected="\${index === 0}"
                            aria-controls="skills-panel-\${index}" id="skills-tab-\${index}"
                            data-skill-tab="\${index}">\${cat.category}</button>
                \`).join('')}
            </div>
            <div class="skills-carousel-viewport" data-skill-viewport>
                <div class="skills-carousel-track" data-skill-track>
                    \${categories.map((cat, index) => \`
                        <section class="skills-slide" id="skills-panel-\${index}" role="tabpanel"
                                 aria-labelledby="skills-tab-\${index}" aria-hidden="\${index !== 0}"
                                 \${index !== 0 ? 'inert' : ''} data-skill-slide="\${index}">
                            <div class="skills-slide-heading">
                                <span class="skills-slide-icon" aria-hidden="true">\${cat.icon || '✳'}</span>
                                <div>
                                    <span class="skills-slide-index">DISCIPLINE / \${String(index + 1).padStart(2, '0')}</span>
                                    <h3>\${cat.category}</h3>
                                </div>
                            </div>
                            <div class="skill-tags" role="list" aria-label="\${cat.category} skills">
                                \${cat.items.map(item => \`
                                    <div class="skill-capsule" role="listitem" tabindex="\${index === 0 ? '0' : '-1'}"
                                         data-skill="\${item.name.toLowerCase()}" title="\${item.name}"
                                         aria-label="\${item.name}">
                                        <span class="skill-icon" aria-hidden="true">\${item.icon || '✦'}</span>\${item.name}
                                    </div>
                                \`).join('')}
                            </div>
                            <span class="skills-slide-total">\${String(cat.items.length).padStart(2, '0')} CAPABILITIES</span>
                        </section>
                    \`).join('')}
                </div>
            </div>
            <div class="skills-carousel-controls">
                <div class="skills-carousel-progress" aria-hidden="true"><span data-skill-progress></span></div>
                <div class="skills-carousel-actions">
                    <span class="skills-carousel-hint">EXPLORE THE STACK <span aria-hidden="true">↔</span></span>
                    <div class="skills-carousel-arrows">
                        <button type="button" class="skills-carousel-arrow" data-skill-prev aria-label="Previous skill category" disabled>←</button>
                        <button type="button" class="skills-carousel-arrow" data-skill-next aria-label="Next skill category">→</button>
                    </div>
                </div>
            </div>
        </section>
    \`;

    initSkillCarousel(container, categories.length);
}

function initSkillCarousel(container, total) {
    const track = container.querySelector('[data-skill-track]');
    const viewport = container.querySelector('[data-skill-viewport]');
    const tabs = Array.from(container.querySelectorAll('[data-skill-tab]'));
    const slides = Array.from(container.querySelectorAll('[data-skill-slide]'));
    const previous = container.querySelector('[data-skill-prev]');
    const next = container.querySelector('[data-skill-next]');
    const count = container.querySelector('[data-skill-count]');
    const progress = container.querySelector('[data-skill-progress]');
    if (!track || !viewport || !slides.length) return;

    let activeIndex = 0;
    let pointerStart = null;
    let pointerDelta = 0;
    let isDragging = false;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const setActive = (nextIndex, animate = true) => {
        activeIndex = Math.max(0, Math.min(total - 1, nextIndex));
        const width = viewport.getBoundingClientRect().width;

        if (typeof gsap !== 'undefined') {
            gsap.to(track, {
                x: -activeIndex * width,
                duration: animate && !reducedMotion ? 0.85 : 0,
                ease: 'power4.inOut',
                overwrite: 'auto'
            });
        } else {
            track.style.transform = 'translate3d(' + (-activeIndex * width) + 'px,0,0)';
        }

        slides.forEach((slide, index) => {
            const active = index === activeIndex;
            slide.setAttribute('aria-hidden', String(!active));
            slide.inert = !active;
            slide.querySelectorAll('.skill-capsule').forEach(item => {
                item.tabIndex = active ? 0 : -1;
            });
        });

        tabs.forEach((tab, index) => {
            const active = index === activeIndex;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
        });

        if (count) count.innerHTML = String(activeIndex + 1).padStart(2, '0') + ' <i>/ ' + String(total).padStart(2, '0') + '</i>';
        if (progress) progress.style.transform = 'scaleX(' + ((activeIndex + 1) / total) + ')';
        if (previous) previous.disabled = activeIndex === 0;
        if (next) next.disabled = activeIndex === total - 1;
    };

    tabs.forEach((tab, index) => tab.addEventListener('click', () => setActive(index)));
    previous?.addEventListener('click', () => setActive(activeIndex - 1));
    next?.addEventListener('click', () => setActive(activeIndex + 1));

    container.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            setActive(activeIndex + 1);
            tabs[activeIndex]?.focus();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            setActive(activeIndex - 1);
            tabs[activeIndex]?.focus();
        }
    });

    viewport.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        pointerStart = event.clientX;
        pointerDelta = 0;
        isDragging = true;
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture?.(event.pointerId);
    });
    viewport.addEventListener('pointermove', event => {
        if (!isDragging || pointerStart === null) return;
        pointerDelta = event.clientX - pointerStart;
    });
    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove('is-dragging');
        if (Math.abs(pointerDelta) > 45) setActive(activeIndex + (pointerDelta < 0 ? 1 : -1));
        pointerStart = null;
        pointerDelta = 0;
    };
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('lostpointercapture', endDrag);

    let resizeFrame = 0;
    window.addEventListener('resize', () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => setActive(activeIndex, false));
    }, { passive: true });

    setActive(0, false);

    if (typeof gsap !== 'undefined' && !reducedMotion) {
        gsap.fromTo(container.querySelectorAll('.skills-carousel-eyebrow, .skills-carousel-count, .skills-category-tab, .skills-slide-heading, .skill-capsule, .skills-carousel-controls'),
            { opacity: 0, y: 18 },
            {
                opacity: 1, y: 0, duration: 0.75, stagger: 0.035, ease: 'power3.out',
                scrollTrigger: { trigger: container, start: 'top 78%', once: true }
            }
        );
    }
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
