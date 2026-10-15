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
        const closeMenu = () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        };

        const openMenu = () => {
            navLinks.classList.add('active');
            menuBtn.textContent = '✕';
            menuBtn.setAttribute('aria-expanded', 'true');
            navLinks.querySelector('a')?.focus();
        };

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });

        // Close when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navbar.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
                menuBtn.focus();
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHref = link.getAttribute('href');
                if (targetHref && targetHref.startsWith('#')) {
                    const targetEl = document.querySelector(targetHref);
                    if (targetEl) {
                        e.preventDefault();
                        closeMenu();
                        if (window.lenis) {
                            window.lenis.scrollTo(targetEl, { offset: -80 });
                        } else {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        try { history.pushState(null, '', targetHref); } catch (_) {}
                    }
                } else {
                    closeMenu();
                }
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
