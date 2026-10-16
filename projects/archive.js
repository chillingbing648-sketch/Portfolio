/**
 * AETHER ARCHIVE — THE LIVING PROJECT UNIVERSE
 * Motion & Visual Polish Edition
 *
 * Capabilities:
 * - Fluid 3D Spatial Carousel with real-time gesture tracking and Apple spring physics
 * - Dual-layer optical cross-fade atmosphere engine for smooth environmental morphing
 * - Handcrafted authentic vector interface mini-scenes for all 17 public repositories
 * - Resilient state model: zero dropped clicks, no text jumps, seamless rapid navigation
 * - Page Visibility & battery optimization (particle loop pauses when tab is hidden)
 * - Accessible focus indicators, keyboard arrow controls, and zero layout shift
 */

import { PROJECTS_DATA } from './projects-data.js';

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

// ═══════════════════════════════════════════════════════════════
// SVG ARTWORK MINI-SCENE GENERATOR
// Authentic, handcrafted vector interface artworks for all 17 projects
// ═══════════════════════════════════════════════════════════════
const SVG_ARTWORKS = {
    kaamkaagaz: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="KaamKaagaz Civic Pipeline Artwork">
            <defs>
                <linearGradient id="kk-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0e0a05"/>
                    <stop offset="100%" stop-color="#1c1208"/>
                </linearGradient>
                <radialGradient id="kk-glow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stop-color="rgba(249, 115, 22, 0.25)"/>
                    <stop offset="100%" stop-color="rgba(249, 115, 22, 0)"/>
                </radialGradient>
                <filter id="kk-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.5"/>
                </filter>
            </defs>
            <rect width="800" height="500" fill="url(#kk-bg)"/>
            <rect width="800" height="500" fill="url(#kk-glow)"/>
            <g opacity="0.08" stroke="#f97316" stroke-width="1">
                <circle cx="400" cy="250" r="180"/>
                <circle cx="400" cy="250" r="240"/>
                <circle cx="400" cy="250" r="300"/>
                <line x1="100" y1="250" x2="700" y2="250"/>
                <line x1="400" y1="50" x2="400" y2="450"/>
            </g>
            <g transform="translate(100, 45)">
                <rect width="600" height="42" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                <text x="35" y="26" fill="#fb923c" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700">01. INGEST HINGLISH NLP</text>
                <circle cx="20" cy="21" r="5" fill="#fb923c"/>
                <line x1="200" y1="21" x2="240" y2="21" stroke="#f97316" stroke-dasharray="3 3"/>
                <text x="275" y="26" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600">02. VERIFY SCHEMAS</text>
                <circle cx="260" cy="21" r="5" fill="#34d399"/>
                <line x1="420" y1="21" x2="460" y2="21" stroke="#34d399" stroke-dasharray="3 3"/>
                <text x="495" y="26" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500">03. ADMISSIONS ROADMAP</text>
                <circle cx="480" cy="21" r="5" fill="#64748b"/>
            </g>
            <g transform="translate(80, 115)" filter="url(#kk-shadow)">
                <rect width="300" height="280" rx="12" fill="#140e08" stroke="rgba(249, 115, 22, 0.3)" stroke-width="1.5"/>
                <path d="M0 12C0 5.37 5.37 0 12 0H288C294.63 0 300 5.37 300 12V45H0V12Z" fill="rgba(249, 115, 22, 0.12)"/>
                <text x="20" y="28" fill="#fb923c" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">आय प्रमाण पत्र / Income Certificate</text>
                <g transform="translate(20, 65)">
                    <rect width="260" height="32" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
                    <text x="12" y="20" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">Tahsil Office Verification: APPROVED</text>
                    <circle cx="245" cy="16" r="4" fill="#34d399"/>
                </g>
                <g transform="translate(20, 110)">
                    <rect width="260" height="32" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
                    <text x="12" y="20" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">Ration Card &amp; Electricity Bill</text>
                    <text x="235" y="21" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="12">✓</text>
                </g>
                <g transform="translate(20, 155)">
                    <rect width="260" height="32" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
                    <text x="12" y="20" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">Samarth MU ID: 2026-ENG-8402</text>
                    <text x="235" y="21" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="12">✓</text>
                </g>
                <g transform="translate(180, 205)">
                    <circle cx="45" cy="35" r="30" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 2"/>
                    <circle cx="45" cy="35" r="24" fill="rgba(217, 119, 6, 0.08)"/>
                    <text x="45" y="32" text-anchor="middle" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700">VERIFIED</text>
                    <text x="45" y="44" text-anchor="middle" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="8">MUMBAI</text>
                </g>
            </g>
            <g transform="translate(420, 115)" filter="url(#kk-shadow)">
                <rect width="300" height="280" rx="12" fill="#140e08" stroke="rgba(251, 191, 36, 0.25)" stroke-width="1.5"/>
                <path d="M0 12C0 5.37 5.37 0 12 0H288C294.63 0 300 5.37 300 12V45H0V12Z" fill="rgba(251, 191, 36, 0.1)"/>
                <text x="20" y="28" fill="#fbbf24" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">CET Cell CAP Allotment Matrix</text>
                <line x1="45" y1="75" x2="45" y2="235" stroke="rgba(249, 115, 22, 0.3)" stroke-width="2"/>
                <circle cx="45" cy="85" r="10" fill="#ea580c"/>
                <text x="45" y="89" text-anchor="middle" fill="#fff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">✓</text>
                <text x="70" y="85" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Option Form Round 1</text>
                <text x="70" y="100" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">State Rank 4,120 • Submitted</text>
                <circle cx="45" cy="145" r="10" fill="#f97316"/>
                <text x="45" y="149" text-anchor="middle" fill="#fff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">●</text>
                <text x="70" y="145" fill="#fbbf24" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Seat Allotment (Autonomous)</text>
                <text x="70" y="160" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10">College of Engg. Computer Science</text>
                <circle cx="45" cy="205" r="10" fill="#334155"/>
                <text x="45" y="209" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">03</text>
                <text x="70" y="205" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Reporting &amp; Fee Acceptance</text>
                <text x="70" y="220" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10">ARC Center Physical Reporting</text>
            </g>
            <g transform="translate(100, 430)">
                <text x="0" y="20" fill="#ea580c" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">NEXT.js 15 APP ROUTER</text>
                <text x="180" y="20" fill="rgba(255,255,255,0.3)" font-family="'JetBrains Mono', monospace" font-size="11">•</text>
                <text x="200" y="20" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600">DETERMINISTIC CLIENT SEARCH</text>
                <text x="410" y="20" fill="rgba(255,255,255,0.3)" font-family="'JetBrains Mono', monospace" font-size="11">•</text>
                <text x="430" y="20" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600">ZERO TRACKING / 100% PRIVATE</text>
            </g>
        </svg>
    `,

    walle: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WALL-E Mental Health Companion Artwork">
            <defs>
                <linearGradient id="we-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0b0412"/>
                    <stop offset="100%" stop-color="#180724"/>
                </linearGradient>
                <linearGradient id="we-wave-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#ec4899"/>
                    <stop offset="50%" stop-color="#c084fc"/>
                    <stop offset="100%" stop-color="#8b5cf6"/>
                </linearGradient>
                <radialGradient id="we-orb-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(236, 72, 153, 0.45)"/>
                    <stop offset="50%" stop-color="rgba(139, 92, 246, 0.2)"/>
                    <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
                </radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#we-bg)"/>
            <circle cx="400" cy="230" r="180" fill="url(#we-orb-glow)"/>
            <path d="M 80 240 Q 160 120, 240 240 T 400 240 T 560 240 T 720 240" stroke="url(#we-wave-grad)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M 120 240 Q 200 320, 280 240 T 440 240 T 600 240 T 680 240" stroke="#f472b6" stroke-width="2" fill="none" opacity="0.45" stroke-dasharray="4 4"/>
            <g transform="translate(180, 50)">
                <rect width="440" height="64" rx="32" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(236, 72, 153, 0.35)"/>
                <circle cx="34" cy="32" r="14" fill="rgba(236, 72, 153, 0.25)"/>
                <text x="34" y="37" text-anchor="middle" fill="#f472b6" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">🌱</text>
                <text x="64" y="28" fill="#f472b6" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700">MINDFUL CHECK-IN PROMPT</text>
                <text x="64" y="47" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500">“Take a deep breath. What gave you calm today?”</text>
            </g>
            <g transform="translate(80, 310)">
                <rect width="280" height="130" rx="14" fill="rgba(18, 8, 28, 0.85)" stroke="rgba(236, 72, 153, 0.25)"/>
                <text x="20" y="32" fill="#ec4899" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">TODAY'S EMOTIONAL RESONANCE</text>
                <text x="20" y="65" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="700">Centered &amp; Grounded</text>
                <g transform="translate(20, 85)">
                    <rect x="0" y="10" width="8" height="20" rx="4" fill="#8b5cf6"/>
                    <rect x="16" y="4" width="8" height="26" rx="4" fill="#a855f7"/>
                    <rect x="32" y="0" width="8" height="30" rx="4" fill="#ec4899"/>
                    <rect x="48" y="8" width="8" height="22" rx="4" fill="#f472b6"/>
                    <rect x="64" y="14" width="8" height="16" rx="4" fill="#8b5cf6"/>
                    <text x="95" y="20" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">Resilience: 8.8 / 10</text>
                </g>
            </g>
            <g transform="translate(440, 310)">
                <rect width="280" height="130" rx="14" fill="rgba(18, 8, 28, 0.85)" stroke="rgba(139, 92, 246, 0.25)"/>
                <text x="20" y="32" fill="#a78bfa" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">ETHICAL BOUNDARIES &amp; PRIVACY</text>
                <text x="20" y="62" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600">Zero Cloud Ingestion</text>
                <text x="20" y="85" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="11">
                    All moods and reflective journals persist exclusively in client browser localStorage.
                </text>
                <text x="20" y="115" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">🔒 ENCRYPTED LOCAL STORAGE • ACTIVE</text>
            </g>
        </svg>
    `,

    continuity: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Continuity Financial Legacy Vault Artwork">
            <defs>
                <linearGradient id="ct-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#020e0a"/>
                    <stop offset="100%" stop-color="#081e16"/>
                </linearGradient>
                <radialGradient id="ct-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)"/>
                    <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
                </radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#ct-bg)"/>
            <circle cx="400" cy="230" r="190" fill="url(#ct-glow)"/>
            <g transform="translate(400, 230)">
                <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(16, 185, 129, 0.2)" stroke-width="2"/>
                <circle cx="0" cy="0" r="125" fill="none" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" stroke-dasharray="6 4"/>
                <circle cx="0" cy="0" r="105" fill="#041812" stroke="#10b981" stroke-width="2.5"/>
                <path d="M-15 -15 L15 -15 L15 20 L-15 20 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#34d399" stroke-width="2" rx="4"/>
                <path d="M-8 -15 V-25 C-8 -30 8 -30 8 -25 V-15" fill="none" stroke="#34d399" stroke-width="2.5"/>
                <circle cx="0" cy="0" r="4" fill="#34d399"/>
                <text x="0" y="45" text-anchor="middle" fill="#6ee7b7" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">ENCRYPTED VAULT</text>
                <text x="0" y="60" text-anchor="middle" fill="#a7f3d0" font-family="'JetBrains Mono', monospace" font-size="9">AES-256-GCM</text>
            </g>
            <g transform="translate(60, 90)">
                <rect width="240" height="280" rx="12" fill="rgba(3, 20, 14, 0.85)" stroke="rgba(16, 185, 129, 0.25)"/>
                <text x="20" y="30" fill="#34d399" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">PORTFOLIO VAULT ASSETS</text>
                <g transform="translate(20, 50)">
                    <text x="0" y="16" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600">Family Living Will &amp; Trust</text>
                    <text x="0" y="32" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">Notarized Legal Deed • PDF</text>
                    <rect x="0" y="40" width="200" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
                    <rect x="0" y="40" width="180" height="4" rx="2" fill="#10b981"/>
                </g>
                <g transform="translate(20, 115)">
                    <text x="0" y="16" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600">Real Estate Titles &amp; Deeds</text>
                    <text x="0" y="32" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">Commercial + Residential</text>
                    <rect x="0" y="40" width="200" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
                    <rect x="0" y="40" width="140" height="4" rx="2" fill="#059669"/>
                </g>
                <g transform="translate(20, 180)">
                    <text x="0" y="16" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600">Securities &amp; Portfolios</text>
                    <text x="0" y="32" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">Designated Beneficiary (100%)</text>
                    <rect x="0" y="40" width="200" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
                    <rect x="0" y="40" width="200" height="4" rx="2" fill="#34d399"/>
                </g>
            </g>
            <g transform="translate(500, 90)">
                <rect width="240" height="280" rx="12" fill="rgba(3, 20, 14, 0.85)" stroke="rgba(16, 185, 129, 0.25)"/>
                <text x="20" y="30" fill="#34d399" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">CONTROLLED ACCESS</text>
                <g transform="translate(20, 60)">
                    <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.2)"/>
                    <text x="12" y="16" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10">✓</text>
                    <text x="32" y="10" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Primary Heir Sign-off</text>
                    <text x="32" y="24" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="9">Dual-key verification</text>
                </g>
                <g transform="translate(20, 115)">
                    <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.2)"/>
                    <text x="12" y="16" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10">✓</text>
                    <text x="32" y="10" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Proof of Life Protocol</text>
                    <text x="32" y="24" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="9">30-day periodic check</text>
                </g>
                <rect x="20" y="220" width="200" height="34" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)"/>
                <text x="120" y="242" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">STATUS: PROTECTED &amp; SYNCED</text>
            </g>
        </svg>
    `,

    attendify: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Attendify Telemetry Dashboard Artwork">
            <defs>
                <linearGradient id="at-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#040914"/>
                    <stop offset="100%" stop-color="#08142a"/>
                </linearGradient>
                <radialGradient id="at-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(59, 130, 246, 0.3)"/>
                    <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
                </radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#at-bg)"/>
            <circle cx="400" cy="220" r="180" fill="url(#at-glow)"/>
            <g transform="translate(400, 220)">
                <circle cx="0" cy="0" r="115" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="16" stroke-dasharray="540 200" stroke-linecap="round" transform="rotate(135)"/>
                <circle cx="0" cy="0" r="115" fill="none" stroke="#38bdf8" stroke-width="16" stroke-dasharray="450 300" stroke-linecap="round" transform="rotate(135)"/>
                <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="800">84.6%</text>
                <text x="0" y="32" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">AGGREGATE ATTENDANCE</text>
                <text x="0" y="50" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10">SAFE STATUS (+9.6% OVER MIN)</text>
            </g>
            <g transform="translate(70, 90)">
                <rect width="250" height="280" rx="12" fill="rgba(8, 16, 36, 0.85)" stroke="rgba(59, 130, 246, 0.25)"/>
                <text x="20" y="30" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">DISCIPLINE MONITOR</text>
                <g transform="translate(20, 50)">
                    <text x="0" y="14" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Data Structures &amp; Algo</text>
                    <text x="180" y="14" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">92%</text>
                    <rect x="0" y="24" width="210" height="5" rx="2" fill="rgba(255,255,255,0.08)"/>
                    <rect x="0" y="24" width="193" height="5" rx="2" fill="#3b82f6"/>
                    <text x="0" y="42" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="9">Can safely skip: 4 lectures</text>
                </g>
                <g transform="translate(20, 115)">
                    <text x="0" y="14" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Operating Systems</text>
                    <text x="180" y="14" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">81%</text>
                    <rect x="0" y="24" width="210" height="5" rx="2" fill="rgba(255,255,255,0.08)"/>
                    <rect x="0" y="24" width="170" height="5" rx="2" fill="#38bdf8"/>
                    <text x="0" y="42" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="9">Can safely skip: 1 lecture</text>
                </g>
            </g>
            <g transform="translate(480, 90)">
                <rect width="250" height="280" rx="12" fill="rgba(8, 16, 36, 0.85)" stroke="rgba(59, 130, 246, 0.25)"/>
                <text x="20" y="30" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">ADMIN TELEMETRY</text>
                <g transform="translate(20, 60)">
                    <rect width="210" height="110" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
                    <line x1="10" y1="65" x2="200" y2="65" stroke="#ef4444" stroke-dasharray="3 3"/>
                    <text x="15" y="60" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="8">75% MIN REQUIRED</text>
                    <path d="M 20 80 Q 70 30, 120 40 T 195 25" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
                    <circle cx="195" cy="25" r="4" fill="#34d399"/>
                </g>
                <g transform="translate(20, 195)">
                    <text x="0" y="16" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="10">Batch Size: 60 Students</text>
                    <text x="0" y="34" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="10">Offline-First Local Storage</text>
                    <text x="0" y="52" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">SY IT Production Registry</text>
                </g>
            </g>
        </svg>
    `,

    saviorai: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SaviorAI Autonomous Agent Architecture Artwork">
            <defs>
                <linearGradient id="sv-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0c0418"/>
                    <stop offset="100%" stop-color="#18072c"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#sv-bg)"/>
            <g transform="translate(100, 180)">
                <line x1="80" y1="50" x2="200" y2="50" stroke="#a855f7" stroke-width="2" stroke-dasharray="4 4"/>
                <line x1="280" y1="50" x2="400" y2="50" stroke="#a855f7" stroke-width="2"/>
                <line x1="480" y1="50" x2="600" y2="50" stroke="#34d399" stroke-width="2"/>
                <g transform="translate(0, 15)">
                    <rect width="90" height="70" rx="10" fill="#1e0c38" stroke="#a855f7" stroke-width="2"/>
                    <text x="45" y="35" text-anchor="middle" fill="#e9d5ff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">TRIAGE</text>
                    <text x="45" y="52" text-anchor="middle" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="8">Symptom Input</text>
                </g>
                <g transform="translate(195, 15)">
                    <rect width="90" height="70" rx="10" fill="#1e0c38" stroke="#a855f7" stroke-width="2"/>
                    <text x="45" y="35" text-anchor="middle" fill="#e9d5ff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">GATE</text>
                    <text x="45" y="52" text-anchor="middle" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="8">Deterministic</text>
                </g>
                <g transform="translate(395, 15)">
                    <rect width="90" height="70" rx="10" fill="#1e0c38" stroke="#38bdf8" stroke-width="2"/>
                    <text x="45" y="35" text-anchor="middle" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">AI MODEL</text>
                    <text x="45" y="52" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="8">Gemini Engine</text>
                </g>
                <g transform="translate(595, 15)">
                    <rect width="90" height="70" rx="10" fill="#1e0c38" stroke="#34d399" stroke-width="2"/>
                    <text x="45" y="35" text-anchor="middle" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">RESPONSE</text>
                    <text x="45" y="52" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="8">First Aid Steps</text>
                </g>
            </g>
            <g transform="translate(140, 50)">
                <rect width="520" height="85" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                <circle cx="20" cy="18" r="4" fill="#ef4444"/>
                <circle cx="34" cy="18" r="4" fill="#fbbf24"/>
                <circle cx="48" cy="18" r="4" fill="#34d399"/>
                <text x="70" y="22" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10">savior-ai // safety-triage.ts</text>
                <text x="20" y="50" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="11">interface EmergencySafetyTriage { severity: "urgent"; route: "immediate-aid"; }</text>
                <text x="20" y="68" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">&gt; Deterministic safety gates verified • Escalation paths ready</text>
            </g>
        </svg>
    `,

    psychstudy: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Psych-Study Active Recall Interface Artwork">
            <defs>
                <linearGradient id="ps-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#120409"/>
                    <stop offset="100%" stop-color="#240813"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#ps-bg)"/>
            <g transform="translate(140, 70)">
                <rect width="520" height="260" rx="16" fill="#1f0912" stroke="#f43f5e" stroke-width="1.8"/>
                <rect width="520" height="40" rx="16" fill="rgba(244, 63, 94, 0.12)"/>
                <text x="25" y="26" fill="#fda4af" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">COGNITIVE PSYCHOLOGY • ACTIVE RECALL</text>
                <text x="440" y="26" fill="#fb7185" font-family="'JetBrains Mono', monospace" font-size="11">UNIT 04</text>
                <text x="35" y="80" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700">Cognitive Dissonance Theory (Festinger, 1957)</text>
                <text x="35" y="115" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="13">
                    Explain how contradictory cognitions produce motivational tension and resolution.
                </text>
                <g transform="translate(35, 175)">
                    <rect width="130" height="42" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
                    <text x="65" y="26" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700">RECALLED (88%)</text>
                </g>
                <g transform="translate(180, 175)">
                    <rect width="160" height="42" rx="8" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e"/>
                    <text x="80" y="26" text-anchor="middle" fill="#fff" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700">NEXT: IN 3 DAYS</text>
                </g>
            </g>
            <g transform="translate(140, 360)">
                <rect width="520" height="90" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
                <text x="25" y="32" fill="#fda4af" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">Ebbinghaus Spaced Repetition Engine</text>
                <text x="25" y="55" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="11">
                    Automated quiz intervals consolidate long-term behavioral science memory retention.
                </text>
                <text x="430" y="50" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">94.2% PASS</text>
            </g>
        </svg>
    `,

    aerion: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aerion Spatial Interface Artwork">
            <defs>
                <linearGradient id="ae-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#030712"/>
                    <stop offset="100%" stop-color="#0b1329"/>
                </linearGradient>
                <radialGradient id="ae-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(56, 189, 248, 0.35)"/>
                    <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
                </radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#ae-bg)"/>
            <circle cx="400" cy="240" r="190" fill="url(#ae-glow)"/>
            <g opacity="0.3" stroke="#38bdf8" stroke-width="1">
                <line x1="200" y1="100" x2="600" y2="100"/>
                <line x1="160" y1="180" x2="640" y2="180"/>
                <line x1="120" y1="260" x2="680" y2="260"/>
                <line x1="80" y1="340" x2="720" y2="340"/>
                <line x1="400" y1="60" x2="200" y2="400"/>
                <line x1="400" y1="60" x2="600" y2="400"/>
                <line x1="400" y1="60" x2="400" y2="400"/>
            </g>
            <circle cx="400" cy="240" r="32" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="400" cy="240" r="8" fill="#ffffff"/>
            <line x1="360" y1="240" x2="440" y2="240" stroke="#38bdf8" stroke-width="2"/>
            <line x1="400" y1="200" x2="400" y2="280" stroke="#38bdf8" stroke-width="2"/>
            <text x="400" y="300" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">SPATIAL MATTER FABRIC // 60 FPS</text>
            <g transform="translate(180, 50)">
                <rect width="440" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
                <text x="220" y="25" text-anchor="middle" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="11">GESTURE PHYSICS • CANVAS API • TYPESCRIPT ENGINE</text>
            </g>
        </svg>
    `,

    asyouwish: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="As You Wish Creative Canvas Artwork">
            <defs>
                <linearGradient id="ayw-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#100412"/>
                    <stop offset="100%" stop-color="#200824"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#ayw-bg)"/>
            <g transform="translate(120, 100) rotate(-4)">
                <rect width="180" height="180" rx="12" fill="#2d1035" stroke="#f472b6" stroke-width="1.5"/>
                <circle cx="90" cy="20" r="4" fill="#f472b6"/>
                <text x="20" y="55" fill="#fbcfe8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">Project Sparks ✦</text>
                <text x="20" y="80" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="11">Creative architecture doodles and rapid thoughts.</text>
            </g>
            <g transform="translate(320, 70) rotate(2)">
                <rect width="200" height="220" rx="12" fill="#1f0c2e" stroke="#c084fc" stroke-width="1.5"/>
                <circle cx="100" cy="20" r="4" fill="#c084fc"/>
                <text x="20" y="55" fill="#e9d5ff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">Weekly Moodboard</text>
                <rect x="20" y="75" width="160" height="70" rx="6" fill="rgba(255,255,255,0.04)"/>
                <text x="100" y="115" text-anchor="middle" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="10">PALETTE #F472B6</text>
            </g>
            <g transform="translate(540, 120) rotate(5)">
                <rect width="160" height="160" rx="12" fill="#240c1e" stroke="#fb7185" stroke-width="1.5"/>
                <circle cx="80" cy="20" r="4" fill="#fb7185"/>
                <text x="20" y="50" fill="#fecdd3" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">Quick Check 🌸</text>
                <text x="20" y="75" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">✓ Design System</text>
                <text x="20" y="95" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">✓ Local Storage</text>
            </g>
            <g transform="translate(200, 380)">
                <text x="200" y="25" text-anchor="middle" fill="#f472b6" font-family="'JetBrains Mono', monospace" font-size="11">
                    LOCAL-FIRST PERSISTENCE • INFINITE ZOOM &amp; PAN • ZUSTAND STATE
                </text>
            </g>
        </svg>
    `,

    pomodoro: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pomodoro Productivity Timer Artwork">
            <defs>
                <linearGradient id="po-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#120404"/>
                    <stop offset="100%" stop-color="#240808"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#po-bg)"/>
            <g transform="translate(400, 210)">
                <circle cx="0" cy="0" r="110" fill="#1f0707" stroke="#ef4444" stroke-width="4"/>
                <circle cx="0" cy="0" r="95" fill="none" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="0" y="10" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="800">25:00</text>
                <text x="0" y="38" text-anchor="middle" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">DEEP SPRINT ACTIVE</text>
            </g>
            <g transform="translate(180, 360)">
                <rect width="440" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(239, 68, 68, 0.3)"/>
                <text x="25" y="35" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="11">🎵 SPOTIFY AMBIENT STUDY AUDIO</text>
                <text x="330" y="35" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">RHYTHM 100%</text>
            </g>
        </svg>
    `,

    invite: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Invite RSVP Engine Interface Artwork">
            <defs>
                <linearGradient id="iv-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#140a02"/>
                    <stop offset="100%" stop-color="#241405"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#iv-bg)"/>
            <g transform="translate(180, 50)">
                <rect width="440" height="340" rx="16" fill="#1f1106" stroke="#f59e0b" stroke-width="2"/>
                <circle cx="220" cy="65" r="28" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
                <text x="220" y="72" text-anchor="middle" fill="#fff" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800">HD</text>
                <text x="220" y="130" text-anchor="middle" fill="#fbbf24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" letter-spacing="0.1em">DIGITAL INVITATION</text>
                <text x="220" y="165" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800">Bappa's Garden Showcase</text>
                <text x="220" y="200" text-anchor="middle" fill="#fde68a" font-family="'JetBrains Mono', monospace" font-size="12">MUMBAI, INDIA • SCROLL-DRIVEN EXPERIENCE</text>
                <g transform="translate(60, 235)">
                    <rect width="320" height="60" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(245, 158, 11, 0.25)"/>
                    <text x="20" y="26" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">LIVE RSVP CAPTURE</text>
                    <text x="20" y="46" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">Confirmed Attendees Active</text>
                    <text x="235" y="38" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="12">VERCEL EDGE</text>
                </g>
            </g>
        </svg>
    `,

    portfolio: () => `
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aether Digital Universe Core Architecture">
            <defs>
                <linearGradient id="po-bg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#03030c"/>
                    <stop offset="100%" stop-color="#0a0a20"/>
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#po-bg)"/>
            <g transform="translate(400, 240)">
                <ellipse cx="0" cy="0" rx="220" ry="85" fill="none" stroke="rgba(99, 102, 241, 0.4)" stroke-width="1.5" transform="rotate(-15)"/>
                <ellipse cx="0" cy="0" rx="160" ry="60" fill="none" stroke="rgba(6, 182, 212, 0.5)" stroke-width="2" transform="rotate(25)"/>
                <circle cx="0" cy="0" r="35" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" stroke-width="2"/>
                <text x="0" y="5" text-anchor="middle" fill="#fff" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">AETHER</text>
            </g>
            <g transform="translate(140, 50)">
                <rect width="520" height="110" rx="10" fill="rgba(10, 10, 25, 0.9)" stroke="rgba(255, 255, 255, 0.12)"/>
                <circle cx="20" cy="20" r="4" fill="#ef4444"/>
                <circle cx="34" cy="20" r="4" fill="#fbbf24"/>
                <circle cx="48" cy="20" r="4" fill="#34d399"/>
                <text x="70" y="24" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">aether-os // terminal</text>
                <text x="20" y="55" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">$ aether --explore-universe</text>
                <text x="20" y="78" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="12">&gt; WebGL 2 Engine: 12,000 Particles @ 60 FPS • CLS: 0.00</text>
            </g>
            <g transform="translate(200, 395)">
                <rect width="400" height="42" rx="21" fill="rgba(255,255,255,0.04)" stroke="rgba(139, 92, 246, 0.3)"/>
                <text x="200" y="26" text-anchor="middle" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600">
                    RAW GLSL SHADERS • LENIS SCROLL • ZERO FRAMEWORK BLOAT
                </text>
            </g>
        </svg>
    `,

    // Dedicated vector compositions for the remaining 6 repositories
    generic: (name, lang, category) => {
        const id = name.toLowerCase();

        // 1. My-Little-Universe
        if (id.includes('universe')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="My-Little-Universe Artwork">
                    <rect width="800" height="500" fill="#05030e"/>
                    <g transform="translate(400, 250)">
                        <circle cx="0" cy="0" r="28" fill="#fbbf24" filter="drop-shadow(0 0 20px #f59e0b)"/>
                        <ellipse cx="0" cy="0" rx="90" ry="35" fill="none" stroke="rgba(192, 132, 252, 0.4)" stroke-width="1.5" transform="rotate(-15)"/>
                        <ellipse cx="0" cy="0" rx="170" ry="65" fill="none" stroke="rgba(139, 92, 246, 0.4)" stroke-width="1.5" transform="rotate(-15)"/>
                        <ellipse cx="0" cy="0" rx="250" ry="95" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.5" transform="rotate(-15)"/>
                        <circle cx="70" cy="-20" r="8" fill="#38bdf8"/>
                        <circle cx="-130" cy="40" r="12" fill="#ec4899"/>
                        <circle cx="210" cy="-50" r="14" fill="#a78bfa"/>
                    </g>
                    <g transform="translate(180, 50)">
                        <rect width="440" height="38" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                        <text x="220" y="24" text-anchor="middle" fill="#c084fc" font-family="'JetBrains Mono', monospace" font-size="11">PURE CSS3 3D TRANSFORMS • KEPLERIAN ORBITS</text>
                    </g>
                </svg>
            `;
        }

        // 2. Only-For-Her
        if (id.includes('her')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Only-For-Her Keepsake Artwork">
                    <rect width="800" height="500" fill="#14050b"/>
                    <g transform="translate(240, 80) rotate(-3)">
                        <rect width="320" height="280" rx="16" fill="#240c17" stroke="#fb7185" stroke-width="2"/>
                        <rect x="20" y="20" width="280" height="190" rx="8" fill="rgba(255,255,255,0.04)"/>
                        <circle cx="160" cy="115" r="28" fill="rgba(251, 113, 133, 0.25)" stroke="#fb7185" stroke-width="1.5"/>
                        <text x="160" y="122" text-anchor="middle" fill="#fda4af" font-family="'Plus Jakarta Sans', sans-serif" font-size="18">✦</text>
                        <text x="160" y="240" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">A Handcrafted Digital Keepsake</text>
                    </g>
                    <g transform="translate(200, 410)">
                        <text x="200" y="20" text-anchor="middle" fill="#fda4af" font-family="'JetBrains Mono', monospace" font-size="11">CHAPTER NARRATIVES • REACT • AUDIO AMBIANCE</text>
                    </g>
                </svg>
            `;
        }

        // 3. RCGSC
        if (id.includes('rcgsc')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RCGSC Community Platform Artwork">
                    <rect width="800" height="500" fill="#040c18"/>
                    <g transform="translate(180, 70)">
                        <rect width="440" height="300" rx="16" fill="#081830" stroke="#38bdf8" stroke-width="1.8"/>
                        <circle cx="220" cy="80" r="35" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2"/>
                        <text x="220" y="87" text-anchor="middle" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="800">RCGSC</text>
                        <text x="220" y="150" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700">Rotaract Youth Services Portal</text>
                        <g transform="translate(60, 180)">
                            <rect width="320" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                            <text x="20" y="25" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11">COMMUNITY DIRECTORY &amp; NOTICES</text>
                            <circle cx="295" cy="20" r="5" fill="#34d399"/>
                        </g>
                    </g>
                </svg>
            `;
        }

        // 4. BenchWarmers
        if (id.includes('bench')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BenchWarmers Training App Artwork">
                    <rect width="800" height="500" fill="#041208"/>
                    <g transform="translate(160, 80)">
                        <rect width="480" height="280" rx="14" fill="#092410" stroke="#22c55e" stroke-width="1.5"/>
                        <line x1="240" y1="20" x2="240" y2="260" stroke="rgba(255,255,255,0.15)"/>
                        <circle cx="240" cy="140" r="45" fill="none" stroke="rgba(255,255,255,0.15)"/>
                        <text x="240" y="55" text-anchor="middle" fill="#84cc16" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800">BENCHWARMERS FOOTBALL</text>
                        <circle cx="100" cy="140" r="10" fill="#eab308"/>
                        <circle cx="180" cy="90" r="10" fill="#22c55e"/>
                        <circle cx="300" cy="140" r="12" fill="#ec4899"/>
                        <circle cx="380" cy="90" r="10" fill="#38bdf8"/>
                        <text x="240" y="230" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600">Tactical Drills &amp; Development Hub</text>
                    </g>
                </svg>
            `;
        }

        // 5. MENSWARE
        if (id.includes('mensware')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MENSWARE E-Commerce Artwork">
                    <rect width="800" height="500" fill="#0a0a10"/>
                    <g transform="translate(200, 80)">
                        <rect width="400" height="290" rx="16" fill="#141420" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
                        <text x="200" y="70" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" letter-spacing="0.1em">MENSWARE</text>
                        <text x="200" y="100" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">PREMIUM ACCESSORIES STOREFRONT</text>
                        <g transform="translate(60, 140)">
                            <rect width="280" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                            <text x="20" y="30" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">EXPRESS API • MONGODB CART</text>
                            <text x="245" y="30" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">200 OK</text>
                        </g>
                    </g>
                </svg>
            `;
        }

        // 6. Pawfect-care
        if (id.includes('pawfect')) {
            return `
                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pawfect-care Adoption Artwork">
                    <rect width="800" height="500" fill="#080e0c"/>
                    <g transform="translate(200, 80)">
                        <rect width="400" height="290" rx="16" fill="#0e1a17" stroke="#10b981" stroke-width="1.5"/>
                        <circle cx="200" cy="75" r="28" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5"/>
                        <text x="200" y="83" text-anchor="middle" fill="#34d399" font-family="'Plus Jakarta Sans', sans-serif" font-size="20">🐾</text>
                        <text x="200" y="145" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700">Pawfect Care Community</text>
                        <text x="200" y="175" text-anchor="middle" fill="#a7f3d0" font-family="'JetBrains Mono', monospace" font-size="11">PET WELFARE &amp; ADOPTION PORTAL</text>
                        <g transform="translate(60, 210)">
                            <rect width="280" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
                            <text x="20" y="25" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">ADOPTION REGISTRY ACTIVE</text>
                        </g>
                    </g>
                </svg>
            `;
        }

        // Standard Fallback
        return `
            <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${name} Repository Architecture">
                <rect width="800" height="500" fill="#080814"/>
                <g transform="translate(150, 100)">
                    <rect width="500" height="300" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
                    <circle cx="250" cy="110" r="45" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2"/>
                    <text x="250" y="116" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">&lt;/&gt;</text>
                    <text x="250" y="195" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="700">${name}</text>
                    <text x="250" y="225" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="13">${category.toUpperCase()} • ${lang.toUpperCase()}</text>
                    <text x="250" y="260" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="11">VERIFIED GITHUB PUBLIC REPOSITORY</text>
                </g>
            </svg>
        `;
    }
};

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
        const liveBtn = p.liveUrl
            ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link" aria-label="Live Preview for ${p.name}"><span>Live Preview</span> <span aria-hidden="true">↗</span></a>`
            : `<span class="grid-action-link" style="opacity:0.5;cursor:default;"><span>Code Only</span></span>`;

        return `
            <article class="grid-card" data-project-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.title}">
                <div>
                    <div class="grid-card-header">
                        <span class="grid-card-category">${p.categoryLabel}</span>
                        <span class="grid-card-stars">
                            <span aria-hidden="true">★</span>
                            <span>${p.stars || 0}</span>
                        </span>
                    </div>
                    <h3 class="grid-card-title">${p.title}</h3>
                    <p class="grid-card-desc">${p.description}</p>
                    <div class="grid-card-tech" aria-label="Technologies used">
                        ${p.technologies.slice(0, 3).map(t => `<span class="grid-tech-tag">${t}</span>`).join('')}
                        ${p.technologies.length > 3 ? `<span class="grid-tech-tag">+${p.technologies.length - 3}</span>` : ''}
                    </div>
                </div>

                <div class="grid-card-footer">
                    <span class="grid-lang-indicator">
                        <span class="grid-lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                        <span>${p.language}</span>
                    </span>
                    <div class="grid-card-actions" onclick="event.stopPropagation()">
                        ${liveBtn}
                        <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link" aria-label="Source code for ${p.name}"><span>Source Code</span> <span aria-hidden="true">↗</span></a>
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
            ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link">Live Preview ↗</a>`
            : `<span class="grid-action-link" style="opacity:0.45;cursor:default;">No Preview</span>`;

        return `
            <tr data-project-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.title}">
                <td>
                    <div class="table-project-cell">
                        <span class="table-title">${p.title}</span>
                        <span class="table-desc">${p.description}</span>
                    </div>
                </td>
                <td><span class="table-domain-badge">${p.categoryLabel}</span></td>
                <td>
                    <div class="grid-card-tech">
                        ${p.technologies.slice(0, 2).map(t => `<span class="grid-tech-tag">${t}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <span class="grid-lang-indicator">
                        <span class="grid-lang-dot" style="background-color: ${langColor}" aria-hidden="true"></span>
                        <span>${p.language}</span>
                    </span>
                </td>
                <td style="font-family:'JetBrains Mono',monospace;font-size:0.78rem">
                    ${formatTimeAgo(p.updatedAt)}
                </td>
                <td class="table-actions-col" onclick="event.stopPropagation()">
                    <div class="table-actions-wrap">
                        ${liveBtn}
                        <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="grid-action-link">Source Code ↗</a>
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
function openProjectModal(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

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

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.grid-card, tr[data-project-id]');
        if (item && !e.target.closest('a')) {
            const projId = item.dataset.projectId;
            openProjectModal(projId);
        }
    });

    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalBackdrop.addEventListener('click', closeProjectModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }

        if (e.key === '/' && document.activeElement !== directorySearchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            directorySearchInput.focus();
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

        const repoMap = new Map();
        repos.forEach(repo => {
            repoMap.set(repo.name.toLowerCase(), repo);
        });

        allProjects = allProjects.map(proj => {
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

        syncDot.className = 'sync-dot synced';
        syncText.textContent = 'Live GitHub Sync';
        syncStatusPill.title = `Synced with GitHub API (${repos.length} public repos verified)`;
    } catch (err) {
        console.info('Aether Archive: Using verified local registry (GitHub API offline or rate-limited).', err.message);
        syncDot.className = 'sync-dot offline';
        syncText.textContent = 'Verified Registry';
        syncStatusPill.title = 'Serving verified curated local registry';
    }

    renderCarouselCards();
    renderDirectory();
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
