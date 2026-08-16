<div align="center">

<img src="https://raw.githubusercontent.com/chillingbing648-sketch/Portfolio/main/SaveClip.App_751726771_17937382965320859_6813620073578380356_n.jpg" alt="Harsh Dubey" width="110" style="border-radius:50%;border:2px solid #8b5cf6"/>

<br/>

# HARSH DUBEY

### AETHER — Interactive Digital Portfolio

> A cinematic digital universe where engineering, motion, and identity collapse into one experience.

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES2020+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js_r128-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP_3.12-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://greensock.com/gsap)
[![Lenis](https://img.shields.io/badge/Lenis_1.1-6366f1?style=flat-square&logoColor=white)](https://lenis.darkroom.engineering)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://harshportfolio404.netlify.app/)

<br/>

### **[↗ Enter Aether](https://harshportfolio404.netlify.app/)** &nbsp;&nbsp;·&nbsp;&nbsp; **[View Repository](https://github.com/chillingbing648-sketch/Portfolio)**

<sub>✦ &nbsp; Status: Actively Evolving &nbsp;·&nbsp; Mumbai, India &nbsp;·&nbsp; Open to Opportunities &nbsp; ✦</sub>

</div>

---

## ✦ What is Aether?

Aether is not a resume page.

It is a portfolio engineered as an immersive digital universe — a single-page experience where identity, engineering craft, and creative direction are inseparable. Every interaction is deliberate. Every transition earns its place.

The architecture is fully modular, the content is data-driven through a JSON layer, and the motion is orchestrated by a purpose-built ES module system. These are decisions that don't show on the surface — they define the quality underneath.

---

## ◆ Feature Architecture

<details>
<summary><strong>&nbsp;◉ &nbsp;Experience Layer</strong></summary>
<br/>

**⌁ AI Consciousness Boot Loader** — Cinematic terminal boot sequence with scanlines, aurora gradient, animated progress beam, and typewriter boot messages before the portfolio reveals.

**⌁ Three.js Neural Network** — WebGL particle system rendered on `<canvas>` at 60–120 FPS. The background is a live, GPU-accelerated environment — not a video or a static image.

**⌁ Digital Observatory Ending** — A standalone animated finale section: star canvas, SVG signature animation, constellation social navigation, and an ambient sound toggle.

**⌁ Time-of-Day Themes** — The palette automatically shifts based on system time: Morning (amber), Afternoon (purple/cyan), Sunset (pink/orange), Night (indigo). Override via terminal at any time.

</details>

<details>
<summary><strong>&nbsp;◉ &nbsp;Interaction Layer</strong></summary>
<br/>

**⌁ Developer Terminal** — A fully functional in-page terminal with a command registry, Tab autocomplete, command history (↑↓), easter eggs, and deep portfolio navigation. `Ctrl + K` to open.

**⌁ Custom Cursor** — Dual-layer `cursor-dot` + `cursor-orb` system with hover morphing on interactive elements.

**⌁ Universal Search** — Cross-section search powered by `search.js`, with live skill capsule highlighting via terminal `find <skill>`.

**⌁ 3D Tilt Portrait** — CSS perspective tilt driven by pointer position in the hero section.

**⌁ Scroll Progress Bar** — 2px Apple-style progress indicator at the top of the viewport.

**⌁ Aether AI Companion** — Floating assistant widget for quick portfolio queries without leaving the page.

</details>

<details>
<summary><strong>&nbsp;◉ &nbsp;Data & Architecture Layer</strong></summary>
<br/>

**⌁ JSON Content Layer** — All portfolio content (projects, skills, commands, timeline, achievements, experience, library) is fully decoupled from markup into 7 JSON files.

**⌁ Dynamic Renderers** — Skills capsules, project cards, timeline, achievements grid, and the library are all JS-rendered from data — changing content means editing JSON, not HTML.

**⌁ Case Study Modals** — Per-project deep-dive panels injected by `projects.js` from `projects.json`.

**⌁ Digital Library** — Tabbed knowledge hub with category filtering, rendered from `library.json`.

**⌁ ES Module System** — 15 modular JavaScript files, each with a single responsibility, orchestrated by `main.js` as the application bootstrapper.

</details>

---

## ⌁ Developer Terminal

The terminal is a signature feature of Aether — a fully navigable command interface built into the portfolio itself.

```text
harsh@universe:~$ help
```

| Command | Action |
|---|---|
| `about` · `projects` · `skills` · `contact` | Navigate to section |
| `open <project>` | Open case study (`psych` · `attendify` · `sustainable` · `chatbot`) |
| `find <skill>` | Highlight matching skill capsule |
| `search <query>` | Search across skills and projects |
| `theme <name>` | Switch palette: `morning` · `afternoon` · `sunset` · `night` · `matrix` |
| `whoami` | Display profile card |
| `resume` | Download PDF resume |
| `github` · `linkedin` | Open social profiles |
| `stats` | Portfolio statistics |
| `history` · `origin` | Command history / scroll to top |
| `sudo hire harsh` | 🎉 |
| `konami` · `42` · `coffee` · `quote` | Easter eggs |

**Open via:** &nbsp; `Ctrl + K` (Windows/Linux) &nbsp;·&nbsp; `⌘ + K` (macOS) &nbsp;·&nbsp; `` ` `` tilde key &nbsp;·&nbsp; Navbar button

The terminal exists because some people think in commands. It is a faster, more expressive interface for anyone who prefers the keyboard — and a statement about the kind of engineer who built this.

---

## ⚡ Tech Stack

| Technology | Version | Role |
|---|---|---|
| HTML5 | — | Semantic structure, accessibility markup |
| CSS3 | — | 16-file modular design system, CSS custom properties |
| JavaScript | ES2020+ | 15-module application layer, ES modules |
| Three.js | r128 | WebGL neural network background + observatory canvas |
| GSAP | 3.12.5 | ScrollTrigger reveals, scroll-to transitions |
| Lenis | 1.1.18 | Smooth scroll engine |
| Google Fonts | — | Inter · Plus Jakarta Sans · JetBrains Mono |

---

## ◆ Architecture

```text
Portfolio/
│
├── index.html                 ← Assembly shell — mounts all modules
│
├── css/                       ← 16-file Modular Design System
│   ├── variables.css          ← Design tokens, CSS custom properties
│   ├── themes.css             ← Time-of-day + matrix theme overrides
│   ├── animations.css         ← Loader & keyframe definitions
│   ├── terminal.css           ← Developer Terminal styles
│   ├── footer.css             ← Digital Observatory ending
│   └── [section].css         ← Per-section stylesheets
│
├── js/                        ← 15-file ES Module System
│   ├── main.js                ← Bootstrapper — orchestrates all modules
│   ├── particles.js           ← Three.js neural network
│   ├── terminal.js            ← Developer Terminal engine
│   ├── animations.js          ← GSAP ScrollTrigger reveals
│   ├── theme.js               ← Time-of-day environment detection
│   ├── search.js              ← Universal search & skill highlight
│   └── [module].js           ← Feature-specific modules
│
├── data/                      ← JSON Data Layer
│   ├── projects.json          ← Project case studies
│   ├── skills.json            ← Skill taxonomy
│   ├── commands.json          ← Terminal command registry
│   ├── timeline.json          ← Education milestones
│   ├── achievements.json      ← Recognition & awards
│   ├── experience.json        ← Work history
│   └── library.json           ← Digital library index
│
├── components/                ← HTML component templates (reference)
├── assets/                    ← Images, icons, fonts, audio
└── docs/                      ← ARCHITECTURE · ROADMAP · CHANGELOG
```

---

## ◉ Engineering Principles

**Motion with purpose** — nothing animates without reason. Every transition communicates state, reveals content, or reinforces identity.

**Content decoupled from markup** — all data lives in JSON. The UI renders from it. Updating the portfolio means editing a data file, not touching HTML structure.

**Modular by design** — 16 CSS files, 15 JS modules, 7 data files. Each unit has a single responsibility and a clear boundary.

**Performance as a feature** — GPU-accelerated compositing, Three.js frame budgeting, Lighthouse 90+ targets, CLS: 0. Speed is not an afterthought.

**Accessible throughout** — semantic HTML, ARIA roles, keyboard navigation, live regions, and graceful noscript degradation baked in from the start.

---

## → Run Locally

> ⚠️ Uses ES Modules and `fetch()` for JSON data. Do not open `index.html` directly via `file://` — it will throw CORS errors.

```bash
# Option 1 — Python
python -m http.server 8000
# → http://localhost:8000

# Option 2 — Node.js
npx serve .
# → http://localhost:3000
```

Or: open the project in VS Code → right-click `index.html` → **Open with Live Server**.

---

## ⌘ Evolution

```text
Prototype
  → Modular Architecture
    → Interactive Systems
      → JSON Data Layer
        → Motion Refinement
          → Developer Terminal
            → Aether
```

The portfolio is not finished. It is a continuously refined experiment in engineering, motion design, and personal identity — each iteration sharper than the last.

---

## ✦ Philosophy

I don't measure growth by certificates — I measure it by problems solved and people led along the way.

Curiosity is the default state. Discipline is how things ship. Calculated risk is what separates work that is merely good from work that is remembered. Every project I build carries a signature: engineering done with intent, finished with care, designed to last.

---

## → Links

| | |
|---|---|
| ◆ Portfolio | [harshportfolio404.netlify.app](https://harshportfolio404.netlify.app/) |
| ◆ GitHub | [chillingbing648-sketch](https://github.com/chillingbing648-sketch) |
| ◆ LinkedIn | [harsh-dubey-640a68389](https://www.linkedin.com/in/harsh-dubey-640a68389/) |
| ◆ Resume | [Harsh_Resume_Doc.pdf](https://github.com/chillingbing648-sketch/Portfolio/raw/main/Harsh_Resume_Doc.pdf) |
| ◆ Email | harshitd585@gmail.com |

---

<div align="center">

```
Built with curiosity.
Engineered with intent.
Designed to be remembered.
```

**Harsh Dubey © 2026** &nbsp;·&nbsp; Mumbai, India

</div>
