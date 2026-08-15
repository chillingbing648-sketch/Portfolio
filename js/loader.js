/**
 * js/loader.js
 * AI Boot Loader Engine — Zero External Dependencies
 * 
 * Works with the existing HTML markup in Index.html:
 *   - .boot-line elements with data-msg and data-progress attributes
 *   - .boot-text span inside each line for typing
 *   - .boot-cursor span for blinking cursor
 *   - #loaderProgressFill for progress beam
 * 
 * Exposes: initLoader(), finishLoader(), forceExitLoader()
 */

const LOADER_TIMEOUT = 8000; // 8-second hard ceiling
let _loaderDone = false;
let _timeoutId = null;

export function initLoader() {
    if (_loaderDone) return;

    // HARD CEILING — set immediately, cleared in finishLoader/forceExitLoader
    _timeoutId = setTimeout(() => forceExitLoader('timeout'), LOADER_TIMEOUT);

    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const loader = document.getElementById('cinematic-loader');
    if (!loader) {
        // No loader element in the DOM — skip straight to reveal
        finishLoader();
        return;
    }

    // Gather boot lines from existing HTML (data-msg attribute has the message text)
    const bootLines = loader.querySelectorAll('.boot-line');
    const progressFill = document.getElementById('loaderProgressFill');

    if (!bootLines.length) {
        finishLoader();
        return;
    }

    let lineIdx = 0;

    function typeNextLine() {
        if (_loaderDone || lineIdx >= bootLines.length) return;

        const lineEl = bootLines[lineIdx];
        const textEl = lineEl.querySelector('.boot-text');
        const cursorEl = lineEl.querySelector('.boot-cursor');
        const message = lineEl.dataset.msg || '';
        const progress = parseInt(lineEl.dataset.progress, 10) || 0;
        const isWelcome = lineEl.classList.contains('welcome');

        // Show the line
        lineEl.classList.add('visible');

        // Show cursor on current line
        if (cursorEl) cursorEl.style.display = 'inline-block';

        // Update progress beam
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }

        // Type character by character
        let charIdx = 0;
        const charInterval = setInterval(() => {
            if (_loaderDone) {
                clearInterval(charInterval);
                return;
            }

            charIdx++;
            if (textEl) textEl.textContent = message.substring(0, charIdx);

            if (charIdx >= message.length) {
                clearInterval(charInterval);

                // Hide cursor on completed lines (except the last "welcome" line)
                if (cursorEl && !isWelcome) {
                    cursorEl.style.display = 'none';
                }

                if (isWelcome || lineIdx === bootLines.length - 1) {
                    // Final line completed — pause then finish
                    setTimeout(() => finishLoader(), 800);
                } else {
                    lineIdx++;
                    setTimeout(typeNextLine, 150);
                }
            }
        }, 22); // ~45 chars/second — fast but readable
    }

    // Small initial delay so the loader UI renders before typing starts
    setTimeout(typeNextLine, 200);
}

export function finishLoader() {
    if (_loaderDone) return;
    _loaderDone = true;
    if (_timeoutId) { clearTimeout(_timeoutId); _timeoutId = null; }

    releaseBody();

    // Start the hero reveal while the terminal fades out. This gives the next
    // scene time to establish its entrance state beneath the loader instead of
    // flashing the finished hero before its animation can begin.
    document.dispatchEvent(new CustomEvent('loader:complete'));
    runLoaderExit();
}

export function forceExitLoader(reason) {
    if (_loaderDone) return;
    _loaderDone = true;
    if (_timeoutId) { clearTimeout(_timeoutId); _timeoutId = null; }

    // Immediate hide — skip cinematic exit
    const loader = document.getElementById('cinematic-loader');
    if (loader) {
        loader.style.transition = 'opacity 0.3s ease';
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 350);
    }

    releaseBody();
    document.dispatchEvent(new CustomEvent('loader:complete'));
}

function releaseBody() {
    document.body.classList.remove('loading', 'loader-active', 'no-scroll');
    document.documentElement.classList.remove('loading');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function runLoaderExit() {
    const loaderEl = document.getElementById('cinematic-loader');
    if (!loaderEl) {
        return;
    }

    if (typeof gsap !== 'undefined') {
        gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                loaderEl.style.display = 'none';
            }
        });
    } else {
        // CSS fallback — no GSAP required
        loaderEl.style.transition = 'opacity 0.5s ease';
        loaderEl.style.opacity = '0';
        setTimeout(() => {
            loaderEl.style.display = 'none';
        }, 550);
    }
}

// Aliases for backward compatibility
export const initBootLoader = initLoader;
