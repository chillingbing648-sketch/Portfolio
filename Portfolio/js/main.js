/**
 * js/main.js
 * Application Bootstrapper — Orchestrates all modules
 */

import { initEnvironmentTheme } from './theme.js';
import { initBootLoader } from './loader.js';
import { initCursor, bindHoverTargets } from './cursor.js';
import { initScroll } from './scroll.js';
import { initNavigation } from './navigation.js';
import { initParticles, getScrollSpeed } from './particles.js';
import { initHero } from './hero.js';
import { initSkills } from './skills.js';
import { initProjects } from './projects.js';
import { initTimeline } from './timeline.js';
import { initAnimations, initNeuralCanvas, initObservatoryCanvas } from './animations.js';
import { initTerminal } from './terminal.js';
import { initSearch } from './search.js';

async function boot() {
    // Phase 0 — Environment theme based on time of day
    initEnvironmentTheme();

    // Phase 1 — Boot Loader (blocks render until complete)
    document.body.classList.add('loading');
    initBootLoader();

    // Phase 2 — Core UI Systems (non-blocking)
    initCursor();
    initNavigation();
    initScroll();
    initParticles(() => 0); // scroll speed getter (passive)

    // Phase 3 — Section Content (data-driven, async)
    await Promise.all([
        initSkills(),
        initProjects(),
        initTimeline()
    ]);

    // Phase 4 — Animations (after DOM is populated)
    initAnimations();
    initNeuralCanvas();
    initObservatoryCanvas();

    // Phase 5 — Interactive Systems
    initHero();
    initTerminal();
    initSearch();

    // Phase 6 — Re-bind cursor targets after dynamic content
    bindHoverTargets();

    // Phase 7 — AI Assistant (light panel widget)
    initAssistant();

    // Phase 8 — Observatory music toggle
    initMusicToggle();

    // Phase 9 — Observer for scroll velocity feedback to particles
    initScrollVelocityFeedback();
}

// ── AI Assistant Widget ────────────────────────────────────────────────────
function initAssistant() {
    const btn = document.getElementById('ai-assistant-btn');
    const panel = document.getElementById('ai-assistant-panel');
    const closeBtn = panel?.querySelector('.assistant-close-btn');
    const sendBtn = document.getElementById('assistant-send');
    const inputEl = document.getElementById('assistant-input');
    const messagesEl = panel?.querySelector('.assistant-messages');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
        const isOpen = panel.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
    });

    closeBtn?.addEventListener('click', () => {
        panel.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    });

    const responses = {
        default: [
            "I'm Harsh's AI companion. Ask me about projects, skills, or how to contact him!",
            "Harsh is a student engineer specialising in AI-powered web experiences. What would you like to know?",
            "Looking for collaboration? Harsh is open to internships and freelance projects — reach out!",
        ],
        project: "Harsh has shipped 4 projects including an AI Psychology Study Platform, Attendify (attendance tracker), a Hackathon-winning Sustainable Shopping AI, and a Top-5% Real-Time Chatbot.",
        skill: "Harsh's stack includes HTML/CSS/JS, React, Node.js, Three.js, GSAP, Claude AI API, WebGL, and more. He specialises in AI integration and cinematic web experiences.",
        contact: "You can reach Harsh at harshitd585@gmail.com or +91 9321521258. He's based in Mumbai, India and actively open to opportunities.",
        experience: "Harsh serves as an IT Specialist at the University of Mumbai and as PR Head at his college, having attracted 2,000+ attendees to an intercollege festival.",
    };

    function addMessage(text, from = 'ai') {
        const div = document.createElement('div');
        div.className = `msg ${from}`;
        div.innerHTML = `<div class="msg-bubble">${text}</div>`;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function respond(userMsg) {
        const q = userMsg.toLowerCase();
        let reply = responses.default[Math.floor(Math.random() * responses.default.length)];
        if (q.includes('project') || q.includes('work') || q.includes('built')) reply = responses.project;
        else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) reply = responses.skill;
        else if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email')) reply = responses.contact;
        else if (q.includes('experience') || q.includes('job') || q.includes('work')) reply = responses.experience;

        // Show typing indicator
        const typing = document.createElement('div');
        typing.className = 'msg ai';
        typing.innerHTML = '<div class="msg-bubble"><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>';
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            typing.remove();
            addMessage(reply, 'ai');
        }, 1200 + Math.random() * 600);
    }

    function send() {
        const msg = inputEl?.value?.trim();
        if (!msg) return;
        addMessage(msg, 'user');
        inputEl.value = '';
        respond(msg);
    }

    sendBtn?.addEventListener('click', send);
    inputEl?.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

    // Suggestion chips
    panel?.querySelectorAll('.assist-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (inputEl) inputEl.value = chip.textContent;
            send();
        });
    });
}

// ── Ambient Music Toggle ───────────────────────────────────────────────────
function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    const label = document.getElementById('music-label');
    if (!btn) return;

    let ctx = null, gainNode = null, oscillators = [];
    let playing = false;

    function startAmbient() {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);
        gainNode.connect(ctx.destination);

        [60, 64, 67, 71].forEach((semitone, i) => {
            const osc = ctx.createOscillator();
            const freq = 220 * Math.pow(2, semitone / 12);
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.type = 'sine';
            osc.connect(gainNode);
            osc.start(ctx.currentTime + i * 0.5);
            oscillators.push(osc);
        });
    }

    function stopAmbient() {
        if (gainNode) gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { oscillators.forEach(o => o.stop()); oscillators = []; ctx?.close(); ctx = null; }, 1600);
    }

    btn.addEventListener('click', () => {
        playing = !playing;
        btn.querySelector('.music-icon').textContent = playing ? '🔊' : '🔇';
        if (label) label.textContent = playing ? 'Ambient On' : 'Ambient Sound';
        btn.setAttribute('aria-pressed', String(playing));
        playing ? startAmbient() : stopAmbient();
    });
}

// ── Scroll Velocity Feedback ───────────────────────────────────────────────
function initScrollVelocityFeedback() {
    // lightweight — actual velocity tracking is in scroll.js
    // This just injects the scroll speed reference into particles
    import('./scroll.js').then(({ getScrollSpeed }) => {
        window._aetherScrollSpeed = getScrollSpeed;
    }).catch(() => {});
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
