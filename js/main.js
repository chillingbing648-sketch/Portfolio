/**
 * js/main.js
 * Application Bootstrapper — Safe Execution Chain
 * 
 * Rule: loader.js depends on NOTHING. Everything else waits for loader:complete.
 * Rule: Promise.allSettled for component loading — one 404 must not break the page.
 * Rule: Every optional module is try/catch wrapped independently.
 */

import { initEnvironmentTheme } from './theme.js';
import { initLoader } from './loader.js';
import { initCursor, bindHoverTargets } from './cursor.js';
import { initScroll } from './scroll.js';
import { initNavigation } from './navigation.js';
import { initParticles } from './particles.js';
import { initHero } from './hero.js';
import { initSkills } from './skills.js';
import { initProjects } from './projects.js';
import { initTimeline } from './timeline.js';
import { initAnimations, initNeuralCanvas, initObservatoryCanvas } from './animations.js';
import { initTerminal } from './terminal.js';
import { initSearch } from './search.js';
import { initLibrary } from './library.js';
import { initContactInteractions } from './contact.js';
import { initAICompanion } from './ai-companion.js';

// ── State ──────────────────────────────────────────────────────────────────────
let _appInitialized = false;
const IS_DEV = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

function log(msg, level = 'log') {
    if (!IS_DEV) return;
    console[level](`[AETHER] ${msg}`);
}

// ── Bootstrap ──────────────────────────────────────────────────────────────────
async function bootstrap() {
    if (_appInitialized) return;
    _appInitialized = true;

    // STEP 0: Disable browser scroll restoration before anything else
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // STEP 1: Environment theme (synchronous, safe)
    try { initEnvironmentTheme(); } catch (e) { log('Theme init skipped: ' + e.message, 'warn'); }

    // STEP 2: Start loader IMMEDIATELY — zero dependencies
    log('Bootstrap started');
    initLoader();

    // STEP 3: Load component HTML (non-blocking, Promise.allSettled — never rejects)
    await loadComponents();

    // STEP 4: Listen for loader:complete before initializing optional modules
    document.addEventListener('loader:complete', () => {
        log('loader:complete received — initializing modules');
        initOptionalModules();
    });
}

// ── Component Loader ───────────────────────────────────────────────────────────
async function loadComponents() {
    const placeholders = document.querySelectorAll('[data-component]');
    if (!placeholders.length) return;

    const results = await Promise.allSettled(
        Array.from(placeholders).map(async (el) => {
            const src = el.dataset.component;
            try {
                const res = await fetch(src);
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${src}`);
                el.innerHTML = await res.text();
                log(`Component loaded: ${src}`);
            } catch (err) {
                log(`Component failed (non-critical): ${src}`, 'warn');
                // Do NOT rethrow — one missing component must not break startup
            }
        })
    );

    return results;
}

// ── Optional Modules ───────────────────────────────────────────────────────────
function initOptionalModules() {
    const optional = [
        ['cursor',             initCursor],
        ['navigation',         initNavigation],
        ['scroll',             initScroll],
        ['particles',          () => initParticles(() => 0)],
        ['hero',               initHero],
        ['skills',             initSkills],
        ['projects',           initProjects],
        ['timeline',           initTimeline],
        ['library',            initLibrary],
        ['contact',            initContactInteractions],
        ['animations',         initAnimations],
        ['neural-canvas',      initNeuralCanvas],
        ['observatory-canvas', initObservatoryCanvas],
        ['terminal',           initTerminal],
        ['search',             initSearch],
        ['ai-companion',       initAICompanion],
        ['hover-targets',      bindHoverTargets],
        ['music-toggle',       initMusicToggle]
    ];

    optional.forEach(([name, fn]) => {
        try {
            if (typeof fn === 'function') {
                fn();
                log(`Module: ${name} ✓`);
            }
        } catch (err) {
            log(`Module: ${name} ✗ — ${err.message}`, 'warn');
            // Portfolio still works without any single module
        }
    });
}

// ── Ambient Music Toggle ───────────────────────────────────────────────────────
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
        setTimeout(() => {
            oscillators.forEach(o => { try { o.stop(); } catch(e) {} });
            oscillators = [];
            ctx?.close();
            ctx = null;
        }, 1600);
    }

    btn.addEventListener('click', () => {
        playing = !playing;
        btn.querySelector('.music-icon').textContent = playing ? '🔊' : '🔇';
        if (label) label.textContent = playing ? 'Ambient On' : 'Ambient Sound';
        btn.setAttribute('aria-pressed', String(playing));
        playing ? startAmbient() : stopAmbient();
    });
}

// ── Entry Point ────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}
