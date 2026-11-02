/**
 * AETHER Loading Reveal
 * Completes after the page's component injection and app modules are initialized.
 */
export function initLoadingScreen() {
    const screen = document.querySelector('[data-loading-screen]');
    if (!screen) return () => {};

    const startedAt = performance.now();
    const minimumDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 650;
    let completed = false;

    const removeScreen = () => {
        if (completed) return;
        completed = true;
        const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));

        window.setTimeout(() => {
            screen.classList.add('is-leaving');
            window.setTimeout(() => screen.remove(), 820);
        }, remaining);
    };

    // A failed or unusually slow optional module must never trap the visitor.
    const failsafe = window.setTimeout(removeScreen, 9000);
    return () => {
        window.clearTimeout(failsafe);
        removeScreen();
    };
}
