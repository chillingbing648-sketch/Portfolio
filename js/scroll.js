/**
 * Lenis + GSAP scroll engine.
 * One clock drives both Lenis and ScrollTrigger to keep scroll-linked motion in sync.
 */

let scrollSpeed = 0;

export function getScrollSpeed() {
    return scrollSpeed;
}

export function initScroll() {
    if (typeof Lenis === 'undefined') return null;
    if (window.lenis) return window.lenis;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const lenis = new Lenis({
        duration: prefersReducedMotion ? 0.01 : 1.15,
        easing: t => 1 - Math.pow(1 - t, 4),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: prefersReducedMotion ? 1 : 0.82,
        touchMultiplier: prefersReducedMotion ? 1 : 1.35,
        syncTouch: false,
        autoRaf: false
    });

    window.lenis = lenis;

    let tickerCallback = null;
    let usingGsapTicker = false;
    let rafActive = true;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });
        usingGsapTicker = true;
        lenis.on('scroll', ScrollTrigger.update);
        tickerCallback = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        // Prevent GSAP's default lag smoothing from fighting Lenis' time-based interpolation.
        gsap.ticker.lagSmoothing(0);
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
        if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    } else {
        const raf = (time) => {
            lenis.raf(time);
            if (rafActive) requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }

    let lastScrollY = 0;
    let maxScroll = 1;
    const progressBar = document.getElementById('scroll-progress-bar');
    const updateMaxScroll = () => {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll, { passive: true });

    lenis.on('scroll', ({ scroll }) => {
        scrollSpeed = Math.min(Math.abs(scroll - lastScrollY) * 0.02, 3);
        lastScrollY = scroll;
        if (progressBar) {
            const progress = Math.min(1, Math.max(0, scroll / maxScroll));
            progressBar.style.transform = 'scaleX(' + progress + ')';
        }
    });

    const returnBtn = document.getElementById('returnToOrigin');
    if (returnBtn) {
        let returnButtonVisible = false;
        const updateReturnButton = () => {
            const shouldShow = lenis.scroll > window.innerHeight * 0.8;
            if (shouldShow !== returnButtonVisible) {
                returnButtonVisible = shouldShow;
                returnBtn.classList.toggle('visible', shouldShow);
            }
        };
        lenis.on('scroll', updateReturnButton);
        returnBtn.addEventListener('click', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                gsap.registerPlugin(ScrollToPlugin);
                gsap.to(returnBtn, { scale: 1.12, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: 'auto' });
            }
            lenis.scrollTo(0, { duration: 1.35, easing: t => 1 - Math.pow(1 - t, 4) });
        });
    }

    lenis._portfolioCleanup = () => {
        rafActive = false;
        window.removeEventListener('resize', updateMaxScroll);
        if (usingGsapTicker && tickerCallback && typeof gsap !== 'undefined') gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        if (window.lenis === lenis) delete window.lenis;
    };

    return lenis;
}
