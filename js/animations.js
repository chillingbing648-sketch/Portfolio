/**
 * js/animations.js
 * Global GSAP Motion System — Premium Scroll Reveals & Micro-interactions
 */

export function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    initRevealItems();
    initSectionAnimations();
    initMagneticButtons();
    initExperienceCards();
    initObservatorySignature();
}

// ── Reveal Items ─────────────────────────────────────────────────────────────
function initRevealItems() {
    gsap.utils.toArray('.reveal-item').forEach((el, i) => {
        const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
        gsap.fromTo(el,
            { opacity: 0, y: 50, filter: 'blur(8px)' },
            {
                opacity: 1, y: 0, filter: 'blur(0px)',
                duration: 1, ease: 'power4.out',
                delay,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ── Section-Level Animations ─────────────────────────────────────────────────
function initSectionAnimations() {
    // Services section
    gsap.fromTo('.service-card',
        { opacity: 0, y: 60, scale: 0.94 },
        {
            opacity: 1, y: 0, scale: 1,
            stagger: { each: 0.12, from: 'start' },
            ease: 'expo.out', duration: 1,
            scrollTrigger: { trigger: '#services', start: 'top 75%' }
        }
    );

    // About text paragraphs
    gsap.fromTo('#about .about-text p',
        { opacity: 0, x: -30 },
        {
            opacity: 1, x: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '#about', start: 'top 70%' }
        }
    );

    // Value chips cascade
    gsap.fromTo('.value-chip',
        { opacity: 0, scale: 0.7, y: 15 },
        {
            opacity: 1, scale: 1, y: 0,
            stagger: 0.06, duration: 0.6, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: '.about-values', start: 'top 85%' }
        }
    );

    // Projects — clip-path reveal
    gsap.fromTo('.project-card',
        { opacity: 0, clipPath: 'inset(0 100% 0 0)', scale: 0.97 },
        {
            opacity: 1, clipPath: 'inset(0 0% 0 0)', scale: 1,
            stagger: { each: 0.15, from: 'start' },
            ease: 'power4.inOut', duration: 1,
            scrollTrigger: { trigger: '#projects', start: 'top 75%' }
        }
    );

    // Section titles — morphing blur reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30, filter: 'blur(12px)' },
            {
                opacity: 1, y: 0, filter: 'blur(0px)',
                duration: 1.2, ease: 'power4.out',
                scrollTrigger: { trigger: title, start: 'top 88%' }
            }
        );
    });

    // Section subtitles
    gsap.utils.toArray('.section-subtitle').forEach(sub => {
        gsap.fromTo(sub,
            { opacity: 0, letterSpacing: '8px' },
            {
                opacity: 1, letterSpacing: '3px',
                duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: sub, start: 'top 90%' }
            }
        );
    });

    // Skills categories stagger
    gsap.fromTo('.skill-category',
        { opacity: 0, x: -40 },
        {
            opacity: 1, x: 0,
            stagger: 0.14, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: '#about .skills-wrapper', start: 'top 75%' }
        }
    );

    // Observatory content
    gsap.fromTo('.obs-headline',
        { opacity: 0, scale: 0.9, filter: 'blur(16px)' },
        {
            opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 1.4, ease: 'power4.out',
            scrollTrigger: { trigger: '#observatory', start: 'top 70%' }
        }
    );

    gsap.fromTo('.obs-cta-glass',
        { opacity: 0, y: 50, scale: 0.95 },
        {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2, ease: 'expo.out', delay: 0.3,
            scrollTrigger: { trigger: '#observatory', start: 'top 60%' }
        }
    );

    gsap.fromTo('.constellation-node',
        { opacity: 0, scale: 0, y: 20 },
        {
            opacity: 1, scale: 1, y: 0,
            stagger: 0.1, duration: 0.8, ease: 'back.out(2)',
            scrollTrigger: { trigger: '.social-constellation', start: 'top 85%' }
        }
    );
}

// ── Magnetic Buttons ─────────────────────────────────────────────────────────
export function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            gsap.to(btn, { x, y, duration: 0.4, ease: 'power3.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

// ── Experience Cards ─────────────────────────────────────────────────────────
function initExperienceCards() {
    gsap.fromTo('.exp-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.18, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: '#work', start: 'top 75%' }
        }
    );

    gsap.fromTo('.achievement-card',
        { opacity: 0, x: 40 },
        {
            opacity: 1, x: 0,
            stagger: 0.14, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: '.achievements-grid', start: 'top 80%' }
        }
    );
}

// ── Observatory SVG Signature ─────────────────────────────────────────────────
function initObservatorySignature() {
    ScrollTrigger.create({
        trigger: '#observatory',
        start: 'top 60%',
        onEnter: () => {
            document.querySelectorAll('.sig-path').forEach(path => {
                path.classList.add('drawn');
            });
        }
    });
}

// ── Neural Background Canvas (2D fallback) ────────────────────────────────────
export function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const nodes = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });

        nodes.forEach((a, i) => {
            nodes.slice(i + 1).forEach(b => {
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(139,92,246,${0.3 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            });

            ctx.beginPath();
            ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139,92,246,0.5)';
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
    }, { passive: true });
}

// ── Observatory Star Field (Canvas) ─────────────────────────────────────────
export function initObservatoryCanvas() {
    const canvas = document.getElementById('observatory-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2
    }));

    const nebulae = Array.from({ length: 5 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 200 + 80,
        color: `hsla(${Math.random() * 60 + 240}, 70%, 60%, 0.04)`
    }));

    let t = 0;
    function drawObservatory() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Nebulae
        nebulae.forEach(n => {
            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
            grad.addColorStop(0, n.color);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Stars
        stars.forEach(s => {
            const alpha = 0.3 + 0.7 * (Math.sin(t * s.speed + s.phase) * 0.5 + 0.5);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha * s.opacity})`;
            ctx.fill();
        });

        t++;
        requestAnimationFrame(drawObservatory);
    }
    drawObservatory();
}
