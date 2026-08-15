/**
 * js/contact.js
 * Contact Interactions — Copy Email Clipboard Morph & Form Validation
 */

export function initContactInteractions() {
    const copyBtns = document.querySelectorAll('.btn-copy-email');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const email = btn.dataset.email || 'harshitd585@gmail.com';

            navigator.clipboard.writeText(email).then(() => {
                const originalText = btn.innerHTML;
                btn.classList.add('copied');
                btn.innerHTML = '<span>Copied to Clipboard! ✓</span>';

                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(btn, { scale: 0.95 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' });
                }

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalText;
                }, 2400);
            }).catch(err => {
                console.warn('Clipboard write failed:', err);
                window.location.href = `mailto:${email}`;
            });
        });
    });
}
