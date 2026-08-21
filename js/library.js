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

  container.innerHTML = `
    <div class="library-tabs-dock">
      ${categories.map(cat => `
        <button class="library-tab ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
          ${cat.label}
        </button>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.library-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      container.querySelectorAll('.library-tab').forEach(b => b.classList.toggle('active', b === btn));
      const grid = document.getElementById('library-grid');
      if (grid) renderGrid(grid);
    });
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
          <span class="badge-dot"></span>
          Reading Now (${item.progress}%)
        </div>
      ` : ''}

      <div class="library-card-header">
        <div class="library-card-icon" aria-hidden="true">${item.icon}</div>
        <div class="library-card-meta">
          <h4 class="library-card-title">${item.title}</h4>
          <div class="library-card-author">${item.author}</div>
        </div>
      </div>

      <p class="library-card-notes">${item.notes}</p>

      <div class="library-card-footer">
        <span class="library-card-category">${item.category}</span>
        <span class="library-card-status ${item.currentlyReading ? 'reading' : 'completed'}">${item.status}</span>
      </div>

      ${item.currentlyReading ? `
        <div class="reading-progress-track">
          <div class="reading-progress-bar" style="width:${item.progress}%"></div>
        </div>
      ` : ''}
    </article>
  `).join('');
}
