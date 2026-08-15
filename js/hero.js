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
    const eyebrow = [
        hero.querySelector('.hero-status-pill'),
        hero.querySelector('.hero-subtitle')
    ].filter(Boolean);
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
        return;
    }

    // Establish the next scene beneath the terminal overlay, then reveal it in
    // a measured editorial sequence after boot completion.
    gsap.set(navbar, { autoAlpha: 0, y: -60 });
    gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
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
        .to(navbar, { autoAlpha: 1, y: 0, duration: 1, ease: 'power4.out' }, 0)
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.4)
        .to(heading, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' }, 0.6)
        .to(description, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.9)
        .to(ctas, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, 1.25)
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.6)
        .to(portrait, { autoAlpha: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'power4.out' }, 1.5)
        .to(badges, { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(2)' }, 2.1)
        .to(assistantButton, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 2.7);
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
    const portraitWrapper = document.querySelector('.hero-portrait-wrapper');
    const portraitContainer = document.getElementById('heroPortrait');
    const rimLight = document.querySelector('.portrait-rim-light');

    if (!portraitWrapper || !portraitContainer) return;

    portraitWrapper.addEventListener('mousemove', e => {
        const rect = portraitWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -14;
        const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14;
        portraitContainer.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        if (rimLight) {
            rimLight.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            rimLight.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }
    });

    portraitWrapper.addEventListener('mouseleave', () => {
        portraitContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
}
