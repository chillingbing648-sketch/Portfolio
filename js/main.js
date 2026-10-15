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
import { initAICompanion } from './ai-companion.js';
import { initPitchModal } from './pitch-idea.js';

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

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    try { initEnvironmentTheme(); } catch (e) { log('Theme init skipped: ' + e.message, 'warn'); }

    log('Bootstrap started');

    // STEP 3: Wait for HTML components to inject into DOM completely
    await loadComponents();

    // STEP 4: Register before starting the loader so synchronous completion is handled
    document.addEventListener('loader:complete', () => {
        log('loader:complete received — initializing modules');
        initOptionalModules();
    });

    initLoader();
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
        ['animations',         initAnimations],
        ['neural-canvas',      initNeuralCanvas],
        ['observatory-canvas', initObservatoryCanvas],
        ['terminal',           initTerminal],
        ['search',             initSearch],
        ['ai-companion',       initAICompanion],
        ['pitch-modal',        initPitchModal],
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
        }
    });
}

// ── Ambient Music Toggle (MP3 Audio Player) ────────────────────────────────────
const musicState = {
    audioUrl: new URL('../assets/audio/Interstellar.mp3', import.meta.url).href,
    audioContext: null,
    gainNode: null,
    audioBuffer: null,
    loadingPromise: null,
    sourceNode: null,
    playing: false,
    operation: 0
};

function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    if (!btn) {
        console.error('[AETHER] Button #musicToggle missing from DOM.');
        return;
    }
    if (btn.dataset.musicInitialized === 'true') return;
    btn.dataset.musicInitialized = 'true';
    log('Music toggle initialized');

    btn.addEventListener('click', async () => {
        const operation = ++musicState.operation;
        const iconEl = btn.querySelector('.music-icon');
        const label = document.getElementById('music-label');
        if (musicState.playing || musicState.sourceNode) {
            musicState.playing = false;
            if (musicState.sourceNode) {
                musicState.sourceNode.stop();
                musicState.sourceNode.disconnect();
                musicState.sourceNode = null;
            }
            if (iconEl) iconEl.textContent = '🔇';
            if (label) label.textContent = 'Ambient Sound';
            btn.setAttribute('aria-pressed', 'false');
            console.log('[AETHER] Interstellar Audio: PAUSED');
            return;
        }

        try {
            if (!musicState.audioContext) {
                musicState.audioContext = new AudioContext();
                musicState.gainNode = musicState.audioContext.createGain();
                musicState.gainNode.gain.value = 0.6;
                musicState.gainNode.connect(musicState.audioContext.destination);
            }

            await musicState.audioContext.resume();

            if (!musicState.audioBuffer) {
                if (label) label.textContent = 'Loading audio...';
                musicState.loadingPromise ||= fetch(musicState.audioUrl)
                    .then((response) => {
                        if (!response.ok) throw new Error(`Audio request failed: ${response.status}`);
                        return response.arrayBuffer();
                    })
                    .then((buffer) => musicState.audioContext.decodeAudioData(buffer));
                musicState.audioBuffer = await musicState.loadingPromise;
            }

            if (operation !== musicState.operation) return;

            musicState.sourceNode = musicState.audioContext.createBufferSource();
            musicState.sourceNode.buffer = musicState.audioBuffer;
            musicState.sourceNode.loop = true;
            musicState.sourceNode.connect(musicState.gainNode);
            musicState.sourceNode.start();
            musicState.playing = true;
            if (iconEl) iconEl.textContent = '🔊';
            if (label) label.textContent = 'Ambient On';
            btn.setAttribute('aria-pressed', 'true');
            console.log('[AETHER] Interstellar Audio: PLAYING');
        } catch (err) {
            console.error('[AETHER] Audio play blocked or failed:', err);
            musicState.loadingPromise = null;
            musicState.playing = false;
            musicState.sourceNode = null;
            if (iconEl) iconEl.textContent = '🔇';
            if (label) label.textContent = 'Ambient Sound';
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// ── Entry Point ────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}