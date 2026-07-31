/**
 * Hero Section — Typewriter & 3D Tilt Portrait
 */

export function initHero() {
    initTypewriter();
    init3DTilt();
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
