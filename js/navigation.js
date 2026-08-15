/**
 * Navbar & Navigation Logic
 */

export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (navbar) {
        // Defensive reset: ensure navbar is visible even if GSAP failed
        navbar.style.transform = '';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 60;
            navbar.classList.toggle('scrolled', scrolled);
            navbar.classList.toggle('navbar--scrolled', scrolled);
        }, { passive: true });
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.textContent = isOpen ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navA = document.querySelectorAll('.nav-links a');
    if (sections.length && navA.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 200) current = s.id;
            });
            navA.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + current);
            });
        }, { passive: true });
    }
}
