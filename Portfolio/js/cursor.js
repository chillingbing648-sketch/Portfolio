/**
 * Custom Cursor & Ambient Glow Engine
 */

export function initCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOrb = document.getElementById('cursorOrb');
    const ambientGlow = document.getElementById('ambientGlow');

    if (!cursorDot || !cursorOrb) return;

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let ox = cx, oy = cy;

    window.addEventListener('mousemove', e => {
        cx = e.clientX; cy = e.clientY;
        cursorDot.style.transform = `translate(${cx}px, ${cy}px)`;
        if (ambientGlow) ambientGlow.style.transform = `translate(${cx}px, ${cy}px)`;
    }, { passive: true });

    function renderCursor() {
        ox += (cx - ox) * 0.12;
        oy += (cy - oy) * 0.12;
        cursorOrb.style.transform = `translate(${ox}px, ${oy}px)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    bindHoverTargets();
}

export function bindHoverTargets() {
    const cursorOrb = document.getElementById('cursorOrb');
    if (!cursorOrb) return;

    const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-panel, .skill-capsule, .contact-card-interactive, .social-card-item, .project-card, .constellation-node');
    hoverTargets.forEach(t => {
        t.removeEventListener('mouseenter', onMouseEnter);
        t.removeEventListener('mouseleave', onMouseLeave);
        t.addEventListener('mouseenter', onMouseEnter);
        t.addEventListener('mouseleave', onMouseLeave);
    });

    function onMouseEnter(e) {
        const t = e.currentTarget;
        if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.classList.contains('btn')) {
            cursorOrb.classList.add('hover-active');
        } else {
            cursorOrb.classList.add('hover-link');
        }
    }

    function onMouseLeave() {
        cursorOrb.classList.remove('hover-active', 'hover-link');
    }

    // Ripple physics for buttons
    document.querySelectorAll('.btn, .contact-card-interactive, .social-card-item').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const r = document.createElement('span');
            r.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
            this.appendChild(r);
            setTimeout(() => r.remove(), 600);
        });
    });
}
