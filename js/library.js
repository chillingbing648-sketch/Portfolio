/**
 * js/library.js
 * Digital Library System — Apple-Inspired Knowledge Hub & Reading Progress
 */

import { fetchJson, debounce } from './utils.js';
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
let searchQuery = '';

function escapeHTML(str) {
  return String(str || '').replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

export async function initLibrary() {
  const grid = document.getElementById('library-grid');
  const tabsContainer = document.getElementById('library-tabs');
  if (!grid) return;

  libraryData = await fetchJson('data/library.json', FALLBACK_LIBRARY);

  renderToolbar(tabsContainer, grid);
  renderGrid(grid);
  bindHoverTargets();
}

function renderToolbar(container, grid) {
  if (!container) return;

  const uniqueCategories = Array.from(new Set(libraryData.map(item => item.category).filter(Boolean)));
  const categories = [
    { id: 'all', label: 'All Resources' },
    ...uniqueCategories.map(cat => ({
      id: cat,
      label: cat === 'books' ? 'Books' : (cat.charAt(0).toUpperCase() + cat.slice(1))
    }))
  ];

  container.innerHTML = `
    <div class="library-toolbar">
      <div class="library-tabs-dock" role="tablist" aria-label="Knowledge Hub filter tabs">
        ${categories.map(cat => {
          const isActive = cat.id === activeCategory;
          return `
            <button class="library-tab ${isActive ? 'active' : ''}"
                    type="button"
                    role="tab"
                    id="tab-${cat.id}"
                    aria-selected="${isActive ? 'true' : 'false'}"
                    tabindex="${isActive ? '0' : '-1'}"
                    aria-controls="library-grid"
                    data-cat="${cat.id}">
              ${cat.label}
            </button>
          `;
        }).join('')}
      </div>

      <div class="library-search-wrap">
        <svg class="library-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="search" 
               class="library-search-input" 
               id="librarySearchInput" 
               placeholder="Search resources or notes…" 
               aria-label="Search digital library" 
               autocomplete="off" 
               value="${escapeHTML(searchQuery)}">
        <button type="button" class="library-search-clear" id="librarySearchClear" aria-label="Clear search" ${searchQuery ? '' : 'hidden'}>✕</button>
      </div>
    </div>
  `;

  // Tab Events & Keyboard Navigation
  const tabs = Array.from(container.querySelectorAll('.library-tab'));
  const selectTab = (btn) => {
    activeCategory = btn.dataset.cat;
    tabs.forEach(b => {
      const isCurrent = b === btn;
      b.classList.toggle('active', isCurrent);
      b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      b.setAttribute('tabindex', isCurrent ? '0' : '-1');
    });
    btn.focus();
    renderGrid(grid);
  };

  tabs.forEach((btn, index) => {
    btn.addEventListener('click', () => selectTab(btn));
    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') targetIndex = 0;
      else if (e.key === 'End') targetIndex = tabs.length - 1;

      if (targetIndex !== null) {
        e.preventDefault();
        selectTab(tabs[targetIndex]);
      }
    });
  });

  // Search Input Events
  const searchInput = container.querySelector('#librarySearchInput');
  const searchClear = container.querySelector('#librarySearchClear');

  const onSearchChange = debounce((val) => {
    searchQuery = val.trim();
    if (searchClear) searchClear.hidden = !searchQuery;
    renderGrid(grid);
  }, 120);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      onSearchChange(e.target.value);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchQuery = '';
      searchClear.hidden = true;
      renderGrid(grid);
    });
  }
}

function renderGrid(grid) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = libraryData.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    if (!matchesCat) return false;
    if (!normalizedQuery) return true;
    return (
      (item.title && item.title.toLowerCase().includes(normalizedQuery)) ||
      (item.author && item.author.toLowerCase().includes(normalizedQuery)) ||
      (item.notes && item.notes.toLowerCase().includes(normalizedQuery)) ||
      (item.category && item.category.toLowerCase().includes(normalizedQuery))
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="library-empty-state">
        <div class="library-empty-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h4 class="library-empty-title">No resources found</h4>
        <p class="library-empty-desc">No entries matching "${escapeHTML(searchQuery)}"${activeCategory !== 'all' ? ` in ${escapeHTML(activeCategory)}` : ''}.</p>
        <button type="button" class="library-reset-btn" id="libraryResetBtn">Clear Filters</button>
      </div>
    `;

    const resetBtn = grid.querySelector('#libraryResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        const tabsContainer = document.getElementById('library-tabs');
        renderToolbar(tabsContainer, grid);
        renderGrid(grid);
      });
    }
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="library-card ${item.currentlyReading ? 'currently-reading' : ''}">
      <div class="library-card-top">
        <span class="library-card-kicker">${item.category ? item.category.toUpperCase() : 'RESOURCE'}</span>
        ${item.currentlyReading ? `
          <span class="library-status-pill status-reading">
            <span class="status-pulse-dot" aria-hidden="true"></span>
            <span>Reading · ${item.progress}%</span>
          </span>
        ` : `
          <span class="library-status-pill status-completed">
            <span class="status-check" aria-hidden="true">✓</span>
            <span>${item.status || 'Completed'}</span>
          </span>
        `}
      </div>

      <div class="library-card-body">
        <h3 class="library-card-title">${item.title}</h3>
        <div class="library-card-author">${item.author}</div>
        <p class="library-card-notes">${item.notes}</p>
      </div>

      ${item.currentlyReading ? `
        <div class="library-progress-bar-wrap" aria-label="Reading progress: ${item.progress}%" role="progressbar" aria-valuenow="${item.progress}" aria-valuemin="0" aria-valuemax="100">
          <div class="library-progress-fill" style="width: ${item.progress}%"></div>
        </div>
      ` : ''}
    </article>
  `).join('');

  bindHoverTargets();
}
