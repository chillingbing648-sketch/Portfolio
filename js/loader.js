/**
 * AI Consciousness Boot Loader Engine
 */

export function initBootLoader() {
    const bootLines = document.querySelectorAll('.boot-line');
    const progressFill = document.getElementById('loaderProgressFill');
    const cinematicLoader = document.getElementById('cinematic-loader');

    if (!cinematicLoader || !bootLines.length) return;

    function typeBootLine(lineEl, msg, callback) {
        const textEl = lineEl.querySelector('.boot-text');
        lineEl.classList.add('visible');
        let i = 0;
        const timer = setInterval(() => {
            if (textEl) textEl.textContent = msg.substring(0, i + 1);
            i++;
            if (i >= msg.length) {
                clearInterval(timer);
                if (callback) setTimeout(callback, 120);
            }
        }, 28);
    }

    function runBootSequence() {
        let idx = 0;
        function next() {
            if (idx >= bootLines.length) {
                setTimeout(triggerHeroEntrance, 600);
                return;
            }
            const line = bootLines[idx];
            const msg = line.dataset.msg;
            const progress = parseInt(line.dataset.progress || '100');
            if (progressFill) progressFill.style.width = progress + '%';
            typeBootLine(line, msg, () => {
                idx++;
                const delay = line.classList.contains('welcome') ? 300 : 80;
                setTimeout(next, delay);
            });
        }
        setTimeout(next, 400);
    }

    function triggerHeroEntrance() {
        if (typeof gsap === 'undefined') {
            document.body.classList.remove('loading');
            cinematicLoader.style.display = 'none';
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('loading');
                cinematicLoader.style.display = 'none';
            }
        });

        tl.to('#cinematic-loader .loader-content', { opacity: 0, scale: 0.85, duration: 0.5, ease: 'power3.in' })
          .to('#cinematic-loader', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power4.inOut' })
          .from('#navbar', { y: -60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.3')
          .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.6')
          .from('.hero-title', { opacity: 0, y: 35, filter: 'blur(10px)', duration: 1, ease: 'power4.out' }, '-=0.5')
          .from('.typing-container, .hero-desc', { opacity: 0, y: 22, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.7')
          .from('.hero-btns .btn', { opacity: 0, scale: 0.9, y: 16, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.6')
          .from('.hero-stats .hero-stat', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
          .from('.hero-portrait-wrapper', { opacity: 0, scale: 0.82, rotateY: -15, duration: 1.2, ease: 'power4.out' }, '-=1.0')
          .from('.holo-badge', { opacity: 0, scale: 0.5, duration: 0.8, stagger: 0.2, ease: 'back.out(2)' }, '-=0.6')
          .from('#ai-assistant-btn', { opacity: 0, scale: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.4');
    }

    runBootSequence();
}
