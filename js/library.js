/**
 * js/library.js
 * Digital Library System — Tabbed Knowledge Hub & Reading Progress
 */

import { fetchJson } from './utils.js';
import { bindHoverTargets } from './cursor.js';

const FALLBACK_LIBRARY = [
  {
    id: 'book-ddia',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'books',
    status: 'Reading',
    currentlyReading: true,
    progress: 72,
    icon: '📖',
    notes: 'Deep dive into distributed systems, data encoding, replication, and consensus algorithms.'
  },
  {
    id: 'book-clean-code',
    title: 'Clean Code & Refactoring',
    author: 'Robert C. Martin',
    category: 'books',
    status: 'Completed',
    currentlyReading: false,
    progress: 100,
    icon: '📘',
    notes: 'Fundamental principles of software craft, readability, and maintainable architecture.'
  },
  {
    id: 'book-tfas',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'books',
    status: 'Completed',
    currentlyReading: false,
    progress: 100,
    icon: '🧠',
    notes: 'System 1 vs System 2 thinking, cognitive biases, and strategic decision making.'
  },
  }
];

let libraryData = [];
let activeCategory = 'all';

export async function initLibrary() {
    const grid = document.getElementById('library-grid');
    const tabsContainer = document.getElementById('library-tabs');
    if (!grid) return;

    libraryData = await fetchJson('data/library.json', FALLBACK_LIBRARY);

    renderTabs(tabsContainer);
    renderGrid(grid);
    bindHoverTargets();
}

function renderTabs(container) {
    if (!container) return;
    const categories = [
        { id: 'all', label: 'All Resources' },
        { id: 'books', label: '📖 Books' }
    ];

    container.innerHTML = categories.map(cat => `
        <button class="library-tab ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    container.querySelectorAll('.library-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.cat;
            container.querySelectorAll('.library-tab').forEach(b => b.classList.toggle('active', b === btn));
            const grid = document.getElementById('library-grid');
            if (grid) renderGrid(grid);
    });
}

function renderGrid(grid) {
    const filtered = activeCategory === 'all'
        ? libraryData
        : libraryData.filter(item => item.category === activeCategory);

    grid.innerHTML = filtered.map(item => `
        <article class="library-card glass-panel ${item.currentlyReading ? 'currently-reading' : ''}">
            ${item.currentlyReading ? `
                <div class="reading-now-badge">
                    <span class="status-dot-green" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#06b6d4"></span>
                    Reading Now (${item.progress}%)
                </div>
            ` : ''}
            <div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem">
                <div style="font-size:2rem;line-height:1;flex-shrink:0">${item.icon}</div>
                <div>
                    <h4 style="font-size:1.15rem;font-weight:700;margin-bottom:0.2rem">${item.title}</h4>
                    <div style="font-size:0.85rem;color:var(--accent-cyan);font-weight:600">${item.author}</div>
                </div>
            </div>
            <p style="color:var(--text-muted);font-size:0.92rem;line-height:1.7;flex-grow:1;margin-bottom:1rem">
                ${item.notes}
            </p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto">
                <span style="font-size:0.78rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;font-weight:600">${item.category}</span>
                <span style="font-size:0.82rem;font-weight:700;color:${item.currentlyReading ? '#06b6d4' : 'var(--text-muted)'}">${item.status}</span>
            </div>
            ${item.currentlyReading ? `
                <div class="reading-progress-track">
                    <div class="reading-progress-bar" style="width:${item.progress}%"></div>
                </div>
            ` : ''}
        </article>
    `).join('');
}
