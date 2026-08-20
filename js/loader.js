/**
 * js/loader.js
 * AI Boot Loader Engine — Performance Optimized
 *
 * Preserves the existing loader markup and visual sequence while:
 * - Removing per-character setInterval()
 * - Using one controlled animation loop for typing
 * - Preventing overlapping timers
 * - Making loader completion deterministic
 * - Coordinating page reveal through loader:complete
 */

const LOADER_TIMEOUT = 8000;
const INITIAL_DELAY = 200;
const LINE_DELAY = 150;
const FINAL_HOLD = 650;
const CHAR_DELAY = 22;

let _loaderDone = false;
let _timeoutId = null;
let _typingFrame = null;
let _delayTimeout = null;

export function initLoader() {
    if (_loaderDone) return;

    _loaderDone = false;

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const loader = document.getElementById(
        'cinematic-loader'
    );

    if (!loader) {
        finishLoader();
        return;
    }

    const bootLines =
        loader.querySelectorAll('.boot-line');

    const progressFill =
        document.getElementById(
            'loaderProgressFill'
        );

    if (!bootLines.length) {
        finishLoader();
        return;
    }

    /*
     * Hard safety ceiling.
     */
    _timeoutId = setTimeout(() => {
        forceExitLoader('timeout');
    }, LOADER_TIMEOUT);

    let lineIdx = 0;

    /*
     * ---------------------------------------------------------
     * CONTROLLED DELAY
     * ---------------------------------------------------------
     */

    const schedule = (callback, delay) => {
        if (_loaderDone) return;

        _delayTimeout = setTimeout(() => {
            _delayTimeout = null;

            if (!_loaderDone) {
                callback();
            }
        }, delay);
    };

    /*
     * ---------------------------------------------------------
     * CHARACTER TYPING
     *
     * Uses requestAnimationFrame instead of setInterval.
     * This keeps typing synchronized with browser rendering.
     * ---------------------------------------------------------
     */

    function typeLine(lineEl, onComplete) {
        if (_loaderDone) return;

        const textEl =
            lineEl.querySelector('.boot-text');

        const cursorEl =
            lineEl.querySelector('.boot-cursor');

        const message =
            lineEl.dataset.msg || '';

        const progress =
            parseInt(
                lineEl.dataset.progress,
                10
            ) || 0;

        const isWelcome =
            lineEl.classList.contains('welcome');

        lineEl.classList.add('visible');

        if (cursorEl) {
            cursorEl.style.display =
                'inline-block';
        }

        if (progressFill) {
            progressFill.style.width =
                `${progress}%`;
        }

        let charIdx = 0;
        let lastTime = performance.now();

        function tick(now) {
            if (_loaderDone) {
                _typingFrame = null;
                return;
            }

            const elapsed =
                now - lastTime;

            if (
                elapsed >= CHAR_DELAY
            ) {
                const charsToAdd =
                    Math.max(
                        1,
                        Math.floor(
                            elapsed /
                            CHAR_DELAY
                        )
                    );

                charIdx = Math.min(
                    charIdx +
                    charsToAdd,
                    message.length
                );

                if (textEl) {
                    textEl.textContent =
                        message.substring(
                            0,
                            charIdx
                        );
                }

                lastTime = now;

                if (
                    charIdx >=
                    message.length
                ) {
                    _typingFrame = null;

                    if (
                        cursorEl &&
                        !isWelcome
                    ) {
                        cursorEl.style.display =
                            'none';
                    }

                    onComplete(
                        isWelcome
                    );

                    return;
                }
            }

            _typingFrame =
                requestAnimationFrame(
                    tick
                );
        }

        _typingFrame =
            requestAnimationFrame(
                tick
            );
    }

    /*
     * ---------------------------------------------------------
     * LINE SEQUENCER
     * ---------------------------------------------------------
     */

    function typeNextLine() {
        if (
            _loaderDone ||
            lineIdx >= bootLines.length
        ) {
            return;
        }

        const lineEl =
            bootLines[lineIdx];

        typeLine(
            lineEl,
            (isWelcome) => {
                if (_loaderDone) return;

                const isLast =
                    lineIdx >=
                    bootLines.length - 1;

                if (
                    isWelcome ||
                    isLast
                ) {
                    schedule(
                        () => finishLoader(),
                        FINAL_HOLD
                    );

                    return;
                }

                lineIdx++;

                schedule(
                    typeNextLine,
                    LINE_DELAY
                );
            }
        );
    }

    /*
     * Give the browser one frame to paint the
     * loader before starting the sequence.
     */
    schedule(
        typeNextLine,
        INITIAL_DELAY
    );
}

/*
 * -------------------------------------------------------------
 * NORMAL COMPLETION
 * -------------------------------------------------------------
 */

export function finishLoader() {
    if (_loaderDone) return;

    _loaderDone = true;

    clearLoaderTimers();

    releaseBody();

    /*
     * Tell the rest of the application that the
     * loader sequence has completed.
     *
     * The page reveal should listen to this event.
     */
    document.dispatchEvent(
        new CustomEvent('loader:complete')
    );

    runLoaderExit();
}

/*
 * -------------------------------------------------------------
 * EMERGENCY COMPLETION
 * -------------------------------------------------------------
 */

export function forceExitLoader(reason) {
    if (_loaderDone) return;

    _loaderDone = true;

    clearLoaderTimers();

    const loader =
        document.getElementById(
            'cinematic-loader'
        );

    if (loader) {
        loader.style.transition =
            'opacity 0.3s ease';

        loader.style.opacity = '0';

        setTimeout(() => {
            loader.style.display =
                'none';
        }, 350);
    }

    releaseBody();

    document.dispatchEvent(
        new CustomEvent('loader:complete', {
            detail: {
                reason
            }
        })
    );
}

/*
 * -------------------------------------------------------------
 * TIMER CLEANUP
 * -------------------------------------------------------------
 */

function clearLoaderTimers() {
    if (_timeoutId !== null) {
        clearTimeout(_timeoutId);
        _timeoutId = null;
    }

    if (_delayTimeout !== null) {
        clearTimeout(_delayTimeout);
        _delayTimeout = null;
    }

    if (_typingFrame !== null) {
        cancelAnimationFrame(
            _typingFrame
        );

        _typingFrame = null;
    }
}

/*
 * -------------------------------------------------------------
 * BODY RELEASE
 * -------------------------------------------------------------
 */

function releaseBody() {
    document.body.classList.remove(
        'loading',
        'loader-active',
        'no-scroll'
    );

    document.documentElement.classList.remove(
        'loading'
    );

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(
        0,
        0
    );
}

/*
 * -------------------------------------------------------------
 * LOADER EXIT
 * -------------------------------------------------------------
 */

function runLoaderExit() {
    const loaderEl =
        document.getElementById(
            'cinematic-loader'
        );

    if (!loaderEl) {
        return;
    }

    if (
        typeof gsap !== 'undefined'
    ) {
        gsap.to(
            loaderEl,
            {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',

                onComplete: () => {
                    loaderEl.style.display =
                        'none';
                }
            }
        );

        return;
    }

    loaderEl.style.transition =
        'opacity 0.5s ease';

    loaderEl.style.opacity = '0';

    setTimeout(() => {
        loaderEl.style.display =
            'none';
    }, 550);
}

/*
 * Backward compatibility.
 */
export const initBootLoader =
    initLoader;