/**
 * js/search.js
 * Universal Search & Keyword Highlighter
 */

export function initSearch() {
    // No-op for now — search is invoked by the terminal module
}

/**
 * Highlight all skill capsules matching a query
 * @param {string} query
 * @returns {number} match count
 */
export function searchSkills(query) {
    const q = query.toLowerCase().trim();
    const caps = document.querySelectorAll('.skill-capsule');
    let count = 0;

    caps.forEach(cap => {
        cap.classList.remove('highlight-search');
        if (q && cap.dataset.skill?.includes(q)) {
            cap.classList.add('highlight-search');
            count++;
        }
    });

    if (count > 0) {
        const firstMatch = document.querySelector('.skill-capsule.highlight-search');
        firstMatch?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            document.querySelectorAll('.skill-capsule.highlight-search').forEach(c => c.classList.remove('highlight-search'));
        }, 4000);
    }

    return count;
}

/**
 * Highlight project cards matching a query
 * @param {string} query
 * @returns {number} match count
 */
export function searchProjects(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.project-card-inner');
    let count = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (q && text.includes(q)) {
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(card, { boxShadow: 'none' }, {
                    boxShadow: '0 0 0 2px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.3)',
                    duration: 0.5, yoyo: true, repeat: 3
                });
            }
            count++;
        }
    });

    return count;
}

/**
 * Clear all search highlights
 */
export function clearSearchHighlights() {
    document.querySelectorAll('.skill-capsule.highlight-search').forEach(c => c.classList.remove('highlight-search'));
}
