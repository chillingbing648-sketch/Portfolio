/**
 * Lenis Smooth Scroll Engine & Speed Tracker
 */

let scrollSpeed = 0;

export function getScrollSpeed() {
    return scrollSpeed;
}

export function initScroll() {
    if (typeof Lenis === 'undefined') return null;

    const lenis = new Lenis({
        duration: 1.25,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0, 0);
    }

    let lastScrollY = 0;
    lenis.on('scroll', ({ scroll }) => {
        scrollSpeed = Math.abs(scroll - lastScrollY) * 0.02;
        scrollSpeed = Math.min(scrollSpeed, 3);
        lastScrollY = scroll;
        setTimeout(() => { scrollSpeed = Math.max(0, scrollSpeed - 0.05); }, 100);
    });

    // Return to origin setup
    const returnBtn = document.getElementById('returnToOrigin');
    let warpMultiplier = 1;

    if (returnBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                returnBtn.classList.add('visible');
            } else {
                returnBtn.classList.remove('visible');
            }
        }, { passive: true });

        returnBtn.addEventListener('click', () => {
            warpMultiplier = 8;
            if (typeof gsap !== 'undefined') {
                gsap.to(returnBtn, { scale: 1.4, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 });
                gsap.to(window, {
                    scrollTo: { y: 0, autoKill: false },
                    duration: 1.6,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        gsap.to({ v: 8 }, { v: 1, duration: 1.2, onUpdate: function() { warpMultiplier = this.targets()[0].v; } });
                    }
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    return lenis;
}
