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

        gsap.ticker.lagSmoothing(0, 0);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    /*
     * ---------------------------------------------------------
     * SCROLL SPEED TRACKING
     * ---------------------------------------------------------
     */

    let lastScrollY = 0;

    const progressBar = document.getElementById(
        'scroll-progress-bar'
    );

    lenis.on('scroll', ({ scroll }) => {
        const delta = Math.abs(scroll - lastScrollY);

        scrollSpeed = Math.min(
            delta * 0.02,
            3
        );

        scrollSpeedDecay = 1;

        lastScrollY = scroll;

        /*
         * Update progress bar.
         */
        if (progressBar) {
            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (maxScroll > 0) {
                const percentage =
                    (scroll / maxScroll) * 100;

                progressBar.style.width =
                    Math.min(
                        100,
                        Math.max(0, percentage)
                    ) + '%';
            }
        }
    });

    /*
     * ---------------------------------------------------------
     * LIGHTWEIGHT SPEED DECAY
     *
     * Instead of creating setTimeout() for every scroll event,
     * decay the value using the browser's frame loop.
     * ---------------------------------------------------------
     */

    let decayFrame = null;

    function decayScrollSpeed() {
        if (scrollSpeed > 0.01) {
            scrollSpeed *= 0.92;
        } else {
            scrollSpeed = 0;
        }

        decayFrame = requestAnimationFrame(
            decayScrollSpeed
        );
    }

    decayFrame = requestAnimationFrame(
        decayScrollSpeed
    );

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