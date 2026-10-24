/**
 * Lenis Smooth Scroll Engine & Speed Tracker
 *
 * Performance optimized:
 * - Lenis is driven by ONE animation loop only.
 * - Uses GSAP ticker when GSAP + ScrollTrigger are available.
 * - Falls back to requestAnimationFrame otherwise.
 * - Avoids creating a timeout on every scroll event.
 */

let scrollSpeed = 0;
let scrollSpeedDecay = 0;

export function getScrollSpeed() {
    return scrollSpeed;
}

export function initScroll() {
    if (typeof Lenis === 'undefined') {
        return null;
    }

    const lenis = new Lenis({
        duration: 1.05,
        easing: t => 1 - Math.pow(2, -10 * t),
        direction: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
    });

    window.lenis = lenis;

    /*
     * ---------------------------------------------------------
     * SINGLE LENIS ANIMATION LOOP
     * ---------------------------------------------------------
     */

    let usingGsapTicker = false;

    if (
        typeof gsap !== 'undefined' &&
        typeof ScrollTrigger !== 'undefined'
    ) {
        gsap.registerPlugin(ScrollTrigger);

        usingGsapTicker = true;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(500, 33);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    /*
     * ---------------------------------------------------------
     * SCROLL SPEED TRACKING & COMPOSITED PROGRESS BAR
     * ---------------------------------------------------------
     */

    let lastScrollY = 0;
    let maxScroll = 1;

    const progressBar = document.getElementById(
        'scroll-progress-bar'
    );

    const updateMaxScroll = () => {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll, { passive: true });

    let decayFrame = null;

    function decayScrollSpeed() {
        if (scrollSpeed > 0.01) {
            scrollSpeed *= 0.92;
            decayFrame = requestAnimationFrame(decayScrollSpeed);
        } else {
            scrollSpeed = 0;
            decayFrame = null;
        }
    }

    lenis.on('scroll', ({ scroll }) => {
        const delta = Math.abs(scroll - lastScrollY);

        scrollSpeed = Math.min(
            delta * 0.02,
            3
        );

        scrollSpeedDecay = 1;
        lastScrollY = scroll;

        if (progressBar) {
            const progress = Math.min(1, Math.max(0, scroll / maxScroll));
            progressBar.style.transform = `scaleX(${progress})`;
        }

        if (!decayFrame && scrollSpeed > 0.01) {
            decayFrame = requestAnimationFrame(decayScrollSpeed);
        }
    });

    /*
     * ---------------------------------------------------------
     * RETURN TO ORIGIN
     * ---------------------------------------------------------
     */

    const returnBtn =
        document.getElementById(
            'returnToOrigin'
        );

    if (returnBtn) {
        let returnButtonVisible = false;

        const updateReturnButton = () => {
            const shouldShow =
                lenis.scroll >
                window.innerHeight * 0.8;

            if (
                shouldShow !==
                returnButtonVisible
            ) {
                returnButtonVisible =
                    shouldShow;

                returnBtn.classList.toggle(
                    'visible',
                    shouldShow
                );
            }
        };

        lenis.on(
            'scroll',
            updateReturnButton
        );

        returnBtn.addEventListener(
            'click',
            () => {
                if (
                    typeof gsap !== 'undefined' &&
                    typeof ScrollToPlugin !== 'undefined'
                ) {
                    gsap.registerPlugin(
                        ScrollToPlugin
                    );

                    gsap.to(
                        returnBtn,
                        {
                            scale: 1.4,
                            duration: 0.2,
                            ease: 'power2.out',
                            yoyo: true,
                            repeat: 1
                        }
                    );

                    gsap.to(
                        window,
                        {
                            scrollTo: {
                                y: 0,
                                autoKill: false
                            },
                            duration: 1.4,
                            ease: 'power4.inOut'
                        }
                    );
                } else {
                    lenis.scrollTo(
                        0,
                        {
                            duration: 1.2
                        }
                    );
                }
            }
        );
    }

    /*
     * ---------------------------------------------------------
     * CLEANUP
     * ---------------------------------------------------------
     */

    lenis._portfolioCleanup = () => {
        if (
            decayFrame !== null
        ) {
            cancelAnimationFrame(
                decayFrame
            );

            decayFrame = null;
        }

        if (
            usingGsapTicker &&
            typeof gsap !== 'undefined'
        ) {
            gsap.ticker.remove(
                lenis.raf
            );
        }

        lenis.destroy();
    };

    return lenis;
}