/**
 * AETHER ARCHIVE — THE LIVING PROJECT UNIVERSE
 * Motion & Visual Polish Edition
 *
 * Capabilities:
 * - Fluid 3D Spatial Carousel with real-time gesture tracking and Apple spring physics
 * - Dual-layer optical cross-fade atmosphere engine for smooth environmental morphing
 * - Handcrafted authentic vector interface mini-scenes for all 16 public repositories
 * - Resilient state model: zero dropped clicks, no text jumps, seamless rapid navigation
 * - Page Visibility & battery optimization (particle loop pauses when tab is hidden)
 * - Accessible focus indicators, keyboard arrow controls, and zero layout shift
 */

import { PROJECTS_DATA } from './projects-data.js';
import { SVG_ARTWORKS } from './artworks.js';

// GitHub API Endpoint
const GITHUB_USERNAME = 'chillingbing648-sketch';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

// Language color mapping
const LANG_COLORS = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'C++': '#f34b7d',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Default': '#8b5cf6'
};

// SVG_ARTWORKS is imported from ./artworks.js (authentic GitHub repository SVGs + bespoke vector interfaces)

// ═══════════════════════════════════════════════════════════════
// STATE STORE
// ═══════════════════════════════════════════════════════════════
let allProjects = [...PROJECTS_DATA];
let featuredProjects = allProjects.filter(p => p.featured);
let activeCarouselIndex = 0;
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'curated';
let currentView = 'grid';

// Gesture & Animation State
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragDeltaX = 0;
let dragStartTime = 0;
let lastWheelTime = 0;
let activeAtmosphereLayer = 'A';

// ═══════════════════════════════════════════════════════════════
// DOM REFERENCES
// ═══════════════════════════════════════════════════════════════
const atmosphereLayerA = document.getElementById('atmosphereLayerA');
const atmosphereLayerB = document.getElementById('atmosphereLayerB');
const atmosphereCanvas = document.getElementById('atmosphereCanvas');

const carouselHud = document.getElementById('carouselHud');
const hudIndex = document.getElementById('hudIndex');
const hudCategory = document.getElementById('hudCategory');
const hudStatus = document.getElementById('hudStatus');
const hudTitle = document.getElementById('hudTitle');
const hudDesc = document.getElementById('hudDesc');
const hudTechRow = document.getElementById('hudTechRow');

const carouselStageContainer = document.getElementById('carouselStageContainer');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrevBtn = document.getElementById('carouselPrevBtn');
const carouselNextBtn = document.getElementById('carouselNextBtn');
const orbitalProgressWrapper = document.getElementById('orbitalProgressWrapper');
const zoneLeft = document.getElementById('zoneLeft');
const zoneRight = document.getElementById('zoneRight');

const inspectActiveBtn = document.getElementById('inspectActiveBtn');
const demoActiveBtn = document.getElementById('demoActiveBtn');
const ghActiveBtn = document.getElementById('ghActiveBtn');

// Directory Elements
const directorySearchInput = document.getElementById('directorySearchInput');
const directorySearchClear = document.getElementById('directorySearchClear');
const directorySortSelect = document.getElementById('directorySortSelect');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const directoryResultsCount = document.getElementById('directoryResultsCount');
const directoryGridContainer = document.getElementById('directoryGridContainer');
const directoryTableContainer = document.getElementById('directoryTableContainer');
const directoryTableBody = document.getElementById('directoryTableBody');
const directoryEmptyState = document.getElementById('directoryEmptyState');
const filterChips = document.querySelectorAll('.filter-chip');
const viewButtons = document.querySelectorAll('.view-btn');

// Modal Elements
const projectModal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCategory = document.getElementById('modalCategory');
const modalStatus = document.getElementById('modalStatus');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalProjectDesc = document.getElementById('modalProjectDesc');
const modalArtworkWrapper = document.getElementById('modalArtworkWrapper');
const modalProjectContent = document.getElementById('modalProjectContent');
const modalProjectActions = document.getElementById('modalProjectActions');

// Header Status
const syncStatusPill = document.getElementById('syncStatusPill');
const syncDot = document.getElementById('syncDot');
const syncText = document.getElementById('syncText');

// ═══════════════════════════════════════════════════════════════
// DYNAMIC ATMOSPHERE CANVAS ENGINE
// ═══════════════════════════════════════════════════════════════
class AtmosphereParticleEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.animFrameId = null;
        this.velocityBias = 0;
        this.isPaused = false;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        // Pause loop when document is hidden to conserve GPU/battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            } else {
                this.start();
            }
        });

        // Determine particle count (lighter on mobile)
        const count = window.innerWidth < 680 ? 24 : 48;

        this.particles = Array.from({ length: count }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            radius: Math.random() * 1.5 + 0.5,
            baseAlpha: Math.random() * 0.35 + 0.15,
            alpha: Math.random() * 0.35 + 0.15,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulsePhase: Math.random() * Math.PI * 2
        }));

        this.start();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    start() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.draw();
            return;
        }

        if (this.animFrameId) return;

        const render = () => {
            this.update();
            this.draw();
            this.animFrameId = requestAnimationFrame(render);
        };
        this.animFrameId = requestAnimationFrame(render);
    }

    stop() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    }

    nudgeVelocity(dir) {
        this.velocityBias = dir * 1.8;
    }

    update() {
        this.velocityBias *= 0.94;

        this.particles.forEach(p => {
            p.x += p.vx + this.velocityBias;
            p.y += p.vy;

            p.pulsePhase += p.pulseSpeed;
            p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.12;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
            this.ctx.fill();
        });
    }
}

let particleEngine = null;

// ═══════════════════════════════════════════════════════════════
// 3D SPATIAL CAROUSEL ENGINE
// ═══════════════════════════════════════════════════════════════

function renderCarouselCards() {
    carouselTrack.innerHTML = featuredProjects.map((p, idx) => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const svgArtwork = SVG_ARTWORKS[p.artworkKey]
            ? SVG_ARTWORKS[p.artworkKey]()
            : SVG_ARTWORKS.generic(p.name, p.language, p.categoryLabel);

        return `
            <article class="carousel-card"
                     id="card-${idx}"
                     data-index="${idx}"
                     data-project-id="${p.id}"
                     tabindex="0"
                     role="group"
                     aria-roledescription="Project Slide"
                     aria-label="${p.title}">
                
                <div class="card-bezel-header">
                    <div class="card-bezel-left">
                        <div class="window-dots" aria-hidden="true">
                            <span class="window-dot"></span>
                            <span class="window-dot"></span>
                            <span class="window-dot"></span>
                        </div>
                        <span class="card-bezel-slug">${p.name.toLowerCase()} // active</span>
                    </div>
                    <div class="card-bezel-right">
                        <span class="card-lang-badge">
                            <span class="card-lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                            <span>${p.language}</span>
                        </span>
                        <span class="card-stars-badge" aria-label="${p.stars} stars">
                            <span aria-hidden="true">★</span>
                            <span>${p.stars || 0}</span>
                        </span>
                    </div>
                </div>

                <div class="card-artwork-frame">
                    ${svgArtwork}
                </div>

                <div class="card-bezel-footer">
                    <span class="card-footer-info">${p.technologies.slice(0, 3).join(' • ')}</span>
                    <span class="card-footer-hint">Explore Story →</span>
                </div>
            </article>
        `;
    }).join('');

    renderOrbitalProgress();
    updateCarouselLayout(0, false);
}

function renderOrbitalProgress() {
    orbitalProgressWrapper.innerHTML = featuredProjects.map((p, idx) => `
        <button type="button"
                class="orbital-node ${idx === activeCarouselIndex ? 'active' : ''}"
                data-index="${idx}"
                role="tab"
                aria-selected="${idx === activeCarouselIndex}"
                aria-label="Go to ${p.title}"
                title="${p.title}">
        </button>
    `).join('');
}

/**
 * Update 3D card layout with optional real-time drag scrubbing
 */
function updateCarouselLayout(dragProgress = 0, animate = true) {
    const total = featuredProjects.length;
    const isMobile = window.innerWidth < 680;
    const isTablet = window.innerWidth >= 680 && window.innerWidth < 1024;

    const baseSpread = isMobile ? 180 : (isTablet ? 280 : 380);
    const depthStep = isMobile ? 90 : (isTablet ? 120 : 150);
    const rotStep = isMobile ? 15 : (isTablet ? 18 : 20);

    const cards = carouselTrack.querySelectorAll('.carousel-card');

    cards.forEach((card, i) => {
        let offset = (i - activeCarouselIndex) % total;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // Apply real-time drag scrub
        const effectiveOffset = offset + dragProgress;
        const absEff = Math.abs(effectiveOffset);
        const sign = Math.sign(effectiveOffset);

        if (!animate || dragProgress !== 0) {
            card.style.transition = 'none';
        } else {
            card.style.transition = 'transform 0.55s var(--ease-spring), opacity 0.55s var(--ease-spring), filter 0.55s var(--ease-spring), box-shadow 0.5s ease, border-color 0.35s ease';
        }

        if (absEff <= 2.2) {
            const x = effectiveOffset * baseSpread;
            const z = -absEff * depthStep;
            const rotateY = -effectiveOffset * rotStep;
            const scale = Math.max(0.4, 1 - absEff * (isMobile ? 0.15 : 0.12));
            const opacity = Math.max(0, 1 - absEff * 0.32);
            const blur = absEff < 0.2 ? 0 : Math.min(3, (absEff - 0.2) * 2.2);
            const zIndex = Math.round(50 - absEff * 10);

            card.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
            card.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : 'none';
            card.style.opacity = opacity.toFixed(2);
            card.style.zIndex = zIndex;
            card.style.pointerEvents = 'auto';
            card.style.visibility = 'visible';
            card.classList.toggle('is-active', absEff < 0.5);

            if (absEff < 0.5) {
                const project = featuredProjects[i];
                if (project && project.theme) {
                    card.style.setProperty('--card-glow', project.theme.glow);
                }
            }
        } else {
            const x = (sign || 1) * 620;
            card.style.transform = `translate3d(${x}px, 0, -450px) scale(0.45)`;
            card.style.opacity = '0';
            card.style.filter = 'blur(4px)';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
            card.style.visibility = 'hidden';
            card.classList.remove('is-active');
        }
    });

    if (dragProgress === 0) {
        updateHudAndAtmosphere();
    }
}

/**
 * Update Telemetry HUD and Dual-Layer Seamless Atmosphere
 */
function updateHudAndAtmosphere() {
    const activeProject = featuredProjects[activeCarouselIndex];
    if (!activeProject) return;

    hudIndex.textContent = `0${activeCarouselIndex + 1} / 0${featuredProjects.length}`;
    hudCategory.textContent = activeProject.categoryLabel;
    hudStatus.textContent = activeProject.featured ? 'Flagship Architecture' : 'Standard Artifact';

    // Stable text transition: fade out then immediately update and fade in
    hudTitle.style.opacity = '0';
    hudDesc.style.opacity = '0';

    setTimeout(() => {
        hudTitle.textContent = activeProject.title;
        hudDesc.textContent = activeProject.description;
        hudTitle.style.opacity = '1';
        hudDesc.style.opacity = '1';
    }, 120);

    hudTechRow.innerHTML = activeProject.technologies.map(t => `<span class="hud-tag">${t}</span>`).join('');

    // Update Action Dock buttons
    if (activeProject.liveUrl) {
        demoActiveBtn.hidden = false;
        demoActiveBtn.href = activeProject.liveUrl;
    } else {
        demoActiveBtn.hidden = true;
    }
    ghActiveBtn.href = activeProject.sourceUrl;

    // Update orbital progress dots
    const nodes = orbitalProgressWrapper.querySelectorAll('.orbital-node');
    nodes.forEach((node, idx) => {
        const isActive = idx === activeCarouselIndex;
        node.classList.toggle('active', isActive);
        node.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Dual-Layer Optical Atmosphere Cross-Fade
    if (activeProject.theme) {
        const nextLayer = activeAtmosphereLayer === 'A' ? atmosphereLayerB : atmosphereLayerA;
        const currentLayer = activeAtmosphereLayer === 'A' ? atmosphereLayerA : atmosphereLayerB;

        if (nextLayer && currentLayer) {
            nextLayer.style.setProperty('--bloom-primary', activeProject.theme.primary);
            nextLayer.style.setProperty('--bloom-secondary', activeProject.theme.secondary);
            nextLayer.style.setProperty('--bloom-deep', activeProject.theme.deep);

            nextLayer.classList.add('active');
            currentLayer.classList.remove('active');

            activeAtmosphereLayer = activeAtmosphereLayer === 'A' ? 'B' : 'A';
        }
    }
}

/**
 * Navigate to next/prev without lockout or dropped inputs
 */
function navigateCarousel(delta) {
    const total = featuredProjects.length;
    activeCarouselIndex = (activeCarouselIndex + delta + total) % total;

    if (particleEngine) {
        particleEngine.nudgeVelocity(delta > 0 ? -1 : 1);
    }

    updateCarouselLayout(0, true);
}

function jumpToProject(index) {
    if (index === activeCarouselIndex || index < 0 || index >= featuredProjects.length) return;
    const diff = index - activeCarouselIndex;
    activeCarouselIndex = index;

    if (particleEngine) {
        particleEngine.nudgeVelocity(diff > 0 ? -1 : 1);
    }

    updateCarouselLayout(0, true);
}

// ═══════════════════════════════════════════════════════════════
// GESTURE & INTERACTION CONTROLLER
// Real-time gesture scrubbing, controlled wheel, keyboard
// ═══════════════════════════════════════════════════════════════
function attachCarouselInteractions() {
    carouselPrevBtn.addEventListener('click', () => navigateCarousel(-1));
    carouselNextBtn.addEventListener('click', () => navigateCarousel(1));

    zoneLeft.addEventListener('click', () => navigateCarousel(-1));
    zoneRight.addEventListener('click', () => navigateCarousel(1));

    orbitalProgressWrapper.addEventListener('click', (e) => {
        const node = e.target.closest('.orbital-node');
        if (node) {
            const idx = parseInt(node.dataset.index, 10);
            jumpToProject(idx);
        }
    });

    carouselTrack.addEventListener('click', (e) => {
        if (Math.abs(dragDeltaX) > 10) return; // Prevent click on drag release

        const card = e.target.closest('.carousel-card');
        if (!card) return;

        const cardIdx = parseInt(card.dataset.index, 10);
        if (cardIdx === activeCarouselIndex) {
            const projId = card.dataset.projectId;
            openProjectModal(projId);
        } else {
            jumpToProject(cardIdx);
        }
    });

    inspectActiveBtn.addEventListener('click', () => {
        const activeProj = featuredProjects[activeCarouselIndex];
        if (activeProj) openProjectModal(activeProj.id);
    });

    // Real-Time Drag & Swipe Scrubbing
    const onPointerDown = (e) => {
        isDragging = true;
        dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        dragDeltaX = 0;
        dragStartTime = Date.now();
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

        dragDeltaX = currentX - dragStartX;
        const deltaY = currentY - dragStartY;

        // Don't hijack vertical page scroll
        if (Math.abs(deltaY) > Math.abs(dragDeltaX) && Math.abs(dragDeltaX) < 15) {
            return;
        }

        if (Math.abs(dragDeltaX) > 8) {
            if (e.cancelable) e.preventDefault();
            const width = window.innerWidth < 680 ? 280 : 480;
            const progress = dragDeltaX / width;
            updateCarouselLayout(progress, false);
        }
    };

    const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;

        const duration = Math.max(1, Date.now() - dragStartTime);
        const velocity = dragDeltaX / duration;
        const threshold = 35;

        if (dragDeltaX < -threshold || velocity < -0.25) {
            navigateCarousel(1);
        } else if (dragDeltaX > threshold || velocity > 0.25) {
            navigateCarousel(-1);
        } else {
            // Settle smoothly back to current card
            updateCarouselLayout(0, true);
        }

        setTimeout(() => {
            dragDeltaX = 0;
        }, 50);
    };

    carouselStageContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);

    carouselStageContainer.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // Controlled Mouse-Wheel Navigation with short debounce
    carouselStageContainer.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelTime < 280) return;

        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const threshold = 28;

        if (Math.abs(delta) > threshold) {
            e.preventDefault();
            lastWheelTime = now;
            navigateCarousel(delta > 0 ? 1 : -1);
        }
    }, { passive: false });

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateCarousel(1);
        } else if (e.key === 'Enter' && !projectModal.classList.contains('active')) {
            const activeProj = featuredProjects[activeCarouselIndex];
            if (activeProj) openProjectModal(activeProj.id);
        }
    });

    window.addEventListener('resize', () => {
        updateCarouselLayout(0, false);
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// REPOSITORY DIRECTORY & FILTER ENGINE (ALL 17 REPOSITORIES)
// ═══════════════════════════════════════════════════════════════

function getFilteredAndSortedProjects() {
    return allProjects.filter(p => {
        if (currentCategory === 'featured' && !p.featured) return false;
        if (currentCategory !== 'all' && currentCategory !== 'featured' && p.category !== currentCategory) return false;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchTitle = p.title.toLowerCase().includes(q);
            const matchName = p.name.toLowerCase().includes(q);
            const matchDesc = p.description.toLowerCase().includes(q);
            const matchStack = p.technologies.some(t => t.toLowerCase().includes(q));
            const matchLang = p.language.toLowerCase().includes(q);
            if (!matchTitle && !matchName && !matchDesc && !matchStack && !matchLang) return false;
        }

        return true;
    }).sort((a, b) => {
        if (currentSort === 'recent') {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        if (currentSort === 'name') {
            return a.title.localeCompare(b.title);
        }
        if (currentSort === 'size') {
            return b.sizeKb - a.sizeKb;
        }
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        return a.title.localeCompare(b.title);
    });
}

function renderGridView(projects) {
    directoryGridContainer.innerHTML = projects.map(p => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const svgArtwork = SVG_ARTWORKS[p.artworkKey]
            ? SVG_ARTWORKS[p.artworkKey]()
            : SVG_ARTWORKS.generic(p.name, p.language, p.categoryLabel);

        const liveBtn = p.liveUrl
            ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link grid-action-live" aria-label="Open live demo for ${p.name}"><span>Live Demo</span> <span aria-hidden="true">↗</span></a>`
            : `<span class="grid-action-pill-muted">Source Only</span>`;

        return `
            <article class="grid-card" data-project-id="${p.id}" tabindex="0" role="article" aria-label="Project: ${p.title}">
                <div class="grid-card-preview" aria-hidden="true">
                    ${svgArtwork}
                    <div class="grid-card-preview-overlay">
                        <span class="preview-domain-tag">${p.categoryLabel}</span>
                        <span class="preview-lang-tag">
                            <span class="preview-lang-dot" style="background-color: ${langColor}"></span>
                            <span>${p.language}</span>
                        </span>
                    </div>
                </div>

                <div class="grid-card-body">
                    <div class="grid-card-header">
                        <span class="grid-card-category">${p.categoryLabel}</span>
                        <div class="grid-card-stars" aria-label="${p.stars || 0} stars">
                            <span aria-hidden="true">★</span>
                            <span>${p.stars || 0}</span>
                        </div>
                    </div>

                    <h3 class="grid-card-title">${p.title}</h3>
                    <p class="grid-card-desc">${p.description}</p>

                    <div class="grid-card-tech" aria-label="Technologies used">
                        ${p.technologies.slice(0, 3).map(t => `<span class="grid-tech-tag">${t}</span>`).join('')}
                        ${p.technologies.length > 3 ? `<span class="grid-tech-tag grid-tech-more">+${p.technologies.length - 3}</span>` : ''}
                    </div>

                    <div class="grid-card-footer">
                        <button type="button" class="grid-card-story-btn" data-action="story" aria-label="Inspect ${p.title} case study">
                            <span>Deep Story</span>
                            <span class="story-arrow" aria-hidden="true">→</span>
                        </button>
                        <div class="grid-card-actions">
                            ${liveBtn}
                            <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link grid-action-code" aria-label="Source code for ${p.name}">
                                <span>Code</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function renderTableView(projects) {
    directoryTableBody.innerHTML = projects.map(p => {
        const langColor = LANG_COLORS[p.language] || LANG_COLORS.Default;
        const liveBtn = p.liveUrl
            ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link grid-action-live" aria-label="Open live demo for ${p.name}"><span>Preview</span> <span aria-hidden="true">↗</span></a>`
            : `<span class="grid-action-pill-muted">Source Only</span>`;

        return `
            <tr data-project-id="${p.id}" tabindex="0" role="row" aria-label="View case study for ${p.title}">
                <td>
                    <div class="table-project-cell">
                        <span class="table-title">${p.title}</span>
                        <span class="table-desc">${p.description}</span>
                    </div>
                </td>
                <td><span class="table-domain-badge">${p.categoryLabel}</span></td>
                <td>
                    <div class="grid-card-tech">
                        ${p.technologies.slice(0, 3).map(t => `<span class="grid-tech-tag">${t}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <span class="grid-lang-indicator">
                        <span class="grid-lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                        <span>${p.language}</span>
                    </span>
                </td>
                <td class="table-updated-cell">
                    ${formatTimeAgo(p.updatedAt)}
                </td>
                <td class="table-actions-col">
                    <div class="table-actions-wrap">
                        <button type="button" class="table-action-story-btn" data-action="story" aria-label="Inspect story for ${p.title}">Story →</button>
                        ${liveBtn}
                        <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link grid-action-code" aria-label="Source code for ${p.name}"><span>Code</span> <span aria-hidden="true">↗</span></a>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderDirectory() {
    updateMetricCounts();
    const filtered = getFilteredAndSortedProjects();

    directoryResultsCount.textContent = `Showing ${filtered.length} of ${allProjects.length} repositories`;

    if (filtered.length === 0) {
        directoryEmptyState.hidden = false;
        directoryGridContainer.hidden = true;
        directoryTableContainer.hidden = true;
    } else {
        directoryEmptyState.hidden = true;
        if (currentView === 'grid') {
            directoryGridContainer.hidden = false;
            directoryTableContainer.hidden = true;
            renderGridView(filtered);
        } else {
            directoryGridContainer.hidden = true;
            directoryTableContainer.hidden = false;
            renderTableView(filtered);
        }
    }
}

function updateMetricCounts() {
    const elAll = document.getElementById('countAll');
    const elFeatured = document.getElementById('countFeatured');
    const elAi = document.getElementById('countAi');
    const elWeb = document.getElementById('countWeb');
    const elCivic = document.getElementById('countCivic');
    const elCreative = document.getElementById('countCreative');

    if (elAll) elAll.textContent = allProjects.length;
    if (elFeatured) elFeatured.textContent = allProjects.filter(p => p.featured).length;
    if (elAi) elAi.textContent = allProjects.filter(p => p.category === 'ai').length;
    if (elWeb) elWeb.textContent = allProjects.filter(p => p.category === 'web').length;
    if (elCivic) elCivic.textContent = allProjects.filter(p => p.category === 'civic').length;
    if (elCreative) elCreative.textContent = allProjects.filter(p => p.category === 'creative').length;
}

function formatTimeAgo(isoDate) {
    if (!isoDate) return 'Recently';
    const date = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}yr ago`;
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDY & PROJECT DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
let modalOpener = null;

function openProjectModal(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

    modalOpener = document.activeElement;

    modalCategory.textContent = project.categoryLabel;
    modalStatus.textContent = project.featured ? 'Flagship Architecture' : 'Verified Public Repository';
    modalProjectTitle.textContent = project.title;
    modalProjectDesc.textContent = project.description;

    const svgBanner = SVG_ARTWORKS[project.artworkKey]
        ? SVG_ARTWORKS[project.artworkKey]()
        : SVG_ARTWORKS.generic(project.name, project.language, project.categoryLabel);
    modalArtworkWrapper.innerHTML = svgBanner;

    const cs = project.caseStudy || {};
    let contentHtml = '';

    if (cs.story) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">The Vision &amp; Context</h4>
                <p class="modal-section-p">${cs.story}</p>
            </div>
        `;
    }

    if (cs.problem) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Problem Statement</h4>
                <p class="modal-section-p">${cs.problem}</p>
            </div>
        `;
    }

    if (cs.architecture) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">System Architecture &amp; Core Engineering</h4>
                <p class="modal-section-p">${cs.architecture}</p>
            </div>
        `;
    }

    if (cs.challenges) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Key Engineering Challenges Solved</h4>
                <p class="modal-section-p">${cs.challenges}</p>
            </div>
        `;
    }

    if (cs.impact) {
        contentHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Verified Impact &amp; Outcomes</h4>
                <p class="modal-section-p">${cs.impact}</p>
            </div>
        `;
    }

    contentHtml += `
        <div class="modal-section">
            <h4 class="modal-section-title">Complete Technology Ecosystem</h4>
            <div class="modal-stack-tags">
                ${project.technologies.map(t => `<span class="modal-stack-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;

    modalProjectContent.innerHTML = contentHtml;

    const actions = [];
    if (project.liveUrl) {
        actions.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span>Live Preview</span> <span aria-hidden="true">↗</span></a>`);
    }
    actions.push(`<a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span>Source Code</span> <span aria-hidden="true">↗</span></a>`);
    modalProjectActions.innerHTML = actions.join('');

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalOpener && typeof modalOpener.focus === 'function') {
        modalOpener.focus();
    }
}

// ═══════════════════════════════════════════════════════════════
// DIRECTORY EVENT ATTACHMENTS
// ═══════════════════════════════════════════════════════════════
function attachDirectoryEvents() {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
            currentCategory = chip.dataset.category;
            renderDirectory();
        });
    });

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderDirectory();
        });
    });

    let debounceTimer;
    directorySearchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value.trim();
        directorySearchClear.hidden = searchQuery.length === 0;
        debounceTimer = setTimeout(() => {
            renderDirectory();
        }, 150);
    });

    directorySearchClear.addEventListener('click', () => {
        directorySearchInput.value = '';
        searchQuery = '';
        directorySearchClear.hidden = true;
        renderDirectory();
        directorySearchInput.focus();
    });

    resetFiltersBtn.addEventListener('click', () => {
        searchQuery = '';
        directorySearchInput.value = '';
        directorySearchClear.hidden = true;
        currentCategory = 'all';
        filterChips.forEach(c => {
            const isAll = c.dataset.category === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        currentSort = 'curated';
        directorySortSelect.value = 'curated';
        renderDirectory();
    });

    directorySortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderDirectory();
    });

    // Delegated click handling: ignore external links, open modal on card or story trigger
    document.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;

        const storyBtn = e.target.closest('[data-action="story"]');
        const item = e.target.closest('.grid-card, tr[data-project-id]');
        if (storyBtn || item) {
            const targetEl = storyBtn ? storyBtn.closest('[data-project-id]') : item;
            const projId = targetEl ? targetEl.dataset.projectId : null;
            if (projId) openProjectModal(projId);
        }
    });

    // Keyboard activation (Enter on card or table row)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const activeEl = document.activeElement;
            if (activeEl && activeEl.matches && activeEl.matches('.grid-card, tr[data-project-id]')) {
                const projId = activeEl.dataset.projectId;
                if (projId) openProjectModal(projId);
            }
        }
    });

    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalBackdrop.addEventListener('click', closeProjectModal);

    // Modal focus trap & shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
            return;
        }

        if (e.key === '/' && document.activeElement !== directorySearchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            directorySearchInput.focus();
        }

        if (e.key === 'Tab' && projectModal.classList.contains('active')) {
            const focusables = [...projectModal.querySelectorAll('button:not([disabled]), a[href]:not([disabled]), [tabindex="0"]')].filter(el => el.offsetParent !== null);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// GITHUB API SYNCHRONIZATION
// Updates stars, forks, repo size, and updated dates
// ═══════════════════════════════════════════════════════════════
async function syncGitHubData() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const repos = await response.json();

        // Safely filter out only exact 'her' repository
        const publicRepos = repos.filter(r => r.name.toLowerCase() !== 'her');
        const repoMap = new Map();
        publicRepos.forEach(repo => {
            repoMap.set(repo.name.toLowerCase(), repo);
        });

        allProjects = allProjects.filter(p => p.name.toLowerCase() !== 'her').map(proj => {
            const liveRepo = repoMap.get(proj.name.toLowerCase());
            if (liveRepo) {
                return {
                    ...proj,
                    stars: liveRepo.stargazers_count ?? proj.stars,
                    forks: liveRepo.forks_count ?? proj.forks,
                    sizeKb: liveRepo.size || proj.sizeKb,
                    updatedAt: liveRepo.updated_at || proj.updatedAt
                };
            }
            return proj;
        });

        featuredProjects = allProjects.filter(p => p.featured);

        if (syncDot && syncText && syncStatusPill) {
            syncDot.className = 'sync-dot synced';
            syncText.textContent = 'Live GitHub Sync';
            syncStatusPill.title = `Synced with GitHub API (${publicRepos.length} public repos verified)`;
        }

        updateCarouselLayout(0, false);
        renderDirectory();
    } catch (err) {
        console.info('Aether Archive: Using verified local registry (GitHub API offline or rate-limited).', err.message);
        if (syncDot && syncText && syncStatusPill) {
            syncDot.className = 'sync-dot offline';
            syncText.textContent = 'Verified Registry';
            syncStatusPill.title = 'Serving verified curated local registry';
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════
function initAetherArchive() {
    if (atmosphereCanvas) {
        particleEngine = new AtmosphereParticleEngine(atmosphereCanvas);
    }

    renderCarouselCards();
    renderDirectory();
    attachCarouselInteractions();
    attachDirectoryEvents();
    syncGitHubData();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAetherArchive);
} else {
    initAetherArchive();
}
