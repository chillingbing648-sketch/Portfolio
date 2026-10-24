/**
 * Hero Section — Typewriter & 3D Tilt Portrait
 */

export function initHero() {
    initCinematicReveal();
    initTypewriter();
    init3DTilt();
}

function initCinematicReveal() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.getElementById('navbar');
    const statusPill = hero.querySelector('.hero-status-pill');
    const signature = hero.querySelector('.hero-subtitle');
    const heading = hero.querySelector('.hero-title');
    const description = [
        hero.querySelector('.typing-container'),
        hero.querySelector('.hero-desc')
    ].filter(Boolean);
    const ctas = Array.from(hero.querySelectorAll('.hero-btns .btn'));
    const stats = Array.from(hero.querySelectorAll('.hero-stat'));
    const portrait = hero.querySelector('.hero-portrait-wrapper');
    const badges = Array.from(hero.querySelectorAll('.holo-badge'));
    const assistantButton = document.getElementById('ai-assistant-btn');

    if (reduceMotion || typeof gsap === 'undefined') {
        hero.classList.add('hero-cinematic-revealed');
        if (signature) {
            const dotCore = signature.querySelector('.hero-sig-dot-core');
            if (dotCore) dotCore.classList.add('is-pulsing');
        }
        return;
    }

    // Establish the next scene beneath the terminal overlay, then reveal it in
    // a measured editorial sequence after boot completion.
    gsap.set(navbar, { autoAlpha: 0, y: -60 });
    if (statusPill) gsap.set(statusPill, { autoAlpha: 0, y: 16 });
    gsap.set(heading, { autoAlpha: 0, y: 35, filter: 'blur(10px)' });
    gsap.set(description, { autoAlpha: 0, y: 22 });
    gsap.set(ctas, { autoAlpha: 0, y: 16, scale: 0.9 });
    gsap.set(stats, { autoAlpha: 0, y: 20 });
    gsap.set(portrait, { autoAlpha: 0, scale: 0.82, rotateY: -15, transformPerspective: 1200 });
    gsap.set(badges, { autoAlpha: 0, scale: 0.5 });
    gsap.set(assistantButton, { autoAlpha: 0, scale: 0 });

    const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => hero.classList.add('hero-cinematic-revealed')
    });

    timeline
        .to(navbar, { autoAlpha: 1, y: 0, duration: 1, ease: 'power4.out' }, 0);

    if (statusPill) {
        timeline.to(statusPill, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.35);
    }

    // Signature Choreography: Precision entrance, character reveals, light sweep, motion accent
    animateHeroSignature(signature, timeline, 0.45);

    timeline
        .to(heading, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' }, 0.72)
        .to(description, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 }, 1.0)
        .to(ctas, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, 1.35)
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.7)
        .to(portrait, { autoAlpha: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'power4.out' }, 1.6)
        .to(badges, { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(2)' }, 2.2)
        .to(assistantButton, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 2.8);
}

/**
 * Expertly choreographed entrance for the HARSH DUBEY hero signature.
 * Precision anchor calibration, timed character reveals, specular directional light sweep,
 * and an understated hairline motion accent that resolves without layout shifts.
 */
function animateHeroSignature(signature, timeline, startTime = 0.45) {
    if (!signature) return;

    const dot = signature.querySelector('.hero-sig-dot');
    const dotCore = signature.querySelector('.hero-sig-dot-core');
    const dotRing = signature.querySelector('.hero-sig-dot-ring');
    const chars = signature.querySelectorAll('.hero-sig-char');
    const sheen = signature.querySelector('.hero-sig-sheen');
    const sheenText = signature.querySelector('.hero-sig-sheen-text');
    const accentLine = signature.querySelector('.hero-sig-accent-line');

    // Signature root visibility
    gsap.set(signature, { autoAlpha: 1 });

    // Initial state sets
    if (dot) gsap.set(dot, { scale: 0, autoAlpha: 0, transformOrigin: 'center center' });
    if (dotRing) gsap.set(dotRing, { scale: 0.8, autoAlpha: 0, transformOrigin: 'center center' });
    if (accentLine) gsap.set(accentLine, { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' });
    if (sheen) gsap.set(sheen, { autoAlpha: 0 });
    if (sheenText) gsap.set(sheenText, { backgroundPosition: '140% 0' });

    if (chars.length) {
        gsap.set(chars, {
            autoAlpha: 0,
            y: 4,
            scale: 0.95,
            filter: 'blur(3px)'
        });
    }

    // 1. Anchor Dot Entrance: Crisp calibration scale + optical ring ping
    if (dot) {
        timeline.to(dot, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power3.out'
        }, startTime);
    }

    if (dotRing) {
        timeline.fromTo(dotRing,
            { scale: 0.8, autoAlpha: 0.85 },
            { scale: 2.2, autoAlpha: 0, duration: 0.45, ease: 'power2.out' },
            startTime + 0.04
        );
    }

    // 2. Precision Motion Accent: Hairline guide expands along the baseline
    if (accentLine) {
        timeline.to(accentLine, {
            autoAlpha: 0.85,
            scaleX: 1,
            duration: 0.36,
            ease: 'power3.out'
        }, startTime + 0.08);
    }

    // 3. Precision-Timed Character Reveals: Staggered micro-timing with optical de-blur
    if (chars.length) {
        timeline.to(chars, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.3,
            stagger: 0.026,
            ease: 'power3.out',
            clearProps: 'transform,filter'
        }, startTime + 0.1);
    }

    // 4. Subtle Directional Light Sweep: Specular highlight glides across glyphs
    if (sheen && sheenText) {
        timeline.to(sheen, {
            autoAlpha: 1,
            duration: 0.08,
            ease: 'none'
        }, startTime + 0.3);

        timeline.to(sheenText, {
            backgroundPosition: '-40% 0',
            duration: 0.65,
            ease: 'power2.inOut'
        }, startTime + 0.3);

        timeline.to(sheen, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.out',
            clearProps: 'all'
        }, startTime + 0.85);
    }

    // 5. Elegant Motion Accent Settle: Hairline guide dissolves and contracts
    if (accentLine) {
        timeline.to(accentLine, {
            autoAlpha: 0,
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 0.32,
            ease: 'power2.inOut'
        }, startTime + 0.68);
    }

    // 6. Dot ambient respiration begins seamlessly
    timeline.add(() => {
        if (dotCore) dotCore.classList.add('is-pulsing');
    }, startTime + 0.75);
}

function initTypewriter() {
    const roles = ['AI-Powered Products', 'Cinematic Experiences', 'Intelligent Systems', 'Things That Matter'];
    let rIdx = 0, cIdx = 0, isDeleting = false;
    const typeEl = document.getElementById('typewriter');

    if (!typeEl) return;

    function typeEffect() {
        const cur = roles[rIdx];
        typeEl.textContent = isDeleting ? cur.substring(0, cIdx - 1) : cur.substring(0, cIdx + 1);
        cIdx += isDeleting ? -1 : 1;
        let speed = isDeleting ? 38 : 85;

        if (!isDeleting && cIdx === cur.length) {
            speed = 2400; isDeleting = true;
        } else if (isDeleting && cIdx === 0) {
            isDeleting = false;
            rIdx = (rIdx + 1) % roles.length;
            speed = 400;
        }
        setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 1200);
}

function init3DTilt() {
    const isTouch = window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches;
    if (isTouch) return;

    const portraitWrapper = document.querySelector('.hero-portrait-wrapper');
    const portraitContainer = document.getElementById('heroPortrait');
    const rimLight = document.querySelector('.portrait-rim-light');

    if (!portraitWrapper || !portraitContainer) return;

    let portraitRect = null;
    const updatePortraitRect = () => { portraitRect = portraitWrapper.getBoundingClientRect(); };
    portraitWrapper.addEventListener('mouseenter', updatePortraitRect, { passive: true });
    window.addEventListener('resize', updatePortraitRect, { passive: true });

    portraitWrapper.addEventListener('mousemove', e => {
        const rect = portraitRect || portraitWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -14;
        const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14;
        portraitContainer.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        if (rimLight) {
            rimLight.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            rimLight.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }
    }, { passive: true });

    portraitWrapper.addEventListener('mouseleave', () => {
        portraitContainer.style.transform = '';
        if (rimLight) {
            rimLight.style.setProperty('--mouse-x', '50%');
            rimLight.style.setProperty('--mouse-y', '50%');
        }
    });
}
