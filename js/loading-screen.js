/**
 * AETHER Editorial Loading Sequence
 * GSAP handles the entrance choreography and the final page reveal.
 * CSS remains a graceful fallback when GSAP is unavailable.
 */
export function initLoadingScreen() {
    const screen = document.querySelector('[data-loading-screen]');
    if (!screen) return () => {};

    const startedAt = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimumDuration = reducedMotion ? 120 : 1150;
    const state = screen.querySelector('[data-loader-state]');
    const progress = screen.querySelector('[data-loader-progress]');
    let finished = false;
    let entrance;

    if (window.gsap && !reducedMotion) {
        const gsap = window.gsap;
        const markPaths = screen.querySelectorAll('.loader-mark path');
        gsap.set('.loader-masthead, .loader-index, .loader-kicker, .loader-footer, .loader-baseline', {
            autoAlpha: 0, y: 12
        });
        gsap.set('.loader-title > span', { yPercent: 112, rotate: 1.5 });
        gsap.set('.loader-mark', { autoAlpha: 0, scale: .82, rotate: -9 });
        markPaths.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
        entrance
            .to('.loader-masthead', { autoAlpha: 1, y: 0, duration: .55 })
            .to('.loader-index', { autoAlpha: 1, y: 0, duration: .45 }, '-=.22')
            .to('.loader-mark', { autoAlpha: 1, scale: 1, rotate: 0, duration: .7, ease: 'back.out(1.5)' }, '-=.2')
            .to(markPaths, { strokeDashoffset: 0, duration: .8, stagger: .08, ease: 'power2.inOut' }, '-=.55')
            .to('.loader-kicker', { autoAlpha: 1, y: 0, duration: .4 }, '-=.3')
            .to('.loader-title > span', { yPercent: 0, rotate: 0, duration: .9, stagger: .12, ease: 'power4.out' }, '-=.18')
            .to('.loader-footer', { autoAlpha: 1, y: 0, duration: .55 }, '-=.42')
            .to('.loader-baseline', { autoAlpha: 1, y: 0, duration: .5 }, '-=.35')
            .to(progress, { x: '310%', duration: 1.4, repeat: -1, ease: 'power1.inOut' }, '-=.3');
    } else {
        screen.classList.add('loader-static');
    }

    const release = () => {
        if (finished) return;
        finished = true;
        const wait = Math.max(0, minimumDuration - (performance.now() - startedAt));

        window.setTimeout(() => {
            if (state) state.textContent = 'WELCOME';
            if (window.gsap && !reducedMotion) {
                const gsap = window.gsap;
                gsap.killTweensOf(progress);
                gsap.timeline({
                    defaults: { ease: 'power4.inOut' },
                    onComplete: () => screen.remove()
                })
                .to('.loader-composition', { y: -24, autoAlpha: 0, duration: .32, ease: 'power2.in' })
                .to(screen, { yPercent: -100, duration: .9 }, '-=.04');
            } else {
                screen.style.transition = 'transform 700ms cubic-bezier(.76,0,.24,1)';
                screen.style.transform = 'translate3d(0,-100%,0)';
                window.setTimeout(() => screen.remove(), 740);
            }
        }, wait);
    };

    const failsafe = window.setTimeout(release, 9000);
    return () => {
        window.clearTimeout(failsafe);
        release();
    };
}
