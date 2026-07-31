# AETHER Portfolio v4.0
## Harsh Dubey — AI-Powered Developer & Creative Engineer

> A cinematic digital universe — not a traditional portfolio.

---

## 🚀 Quick Start

**⚠️ Important:** This project uses ES Modules and `fetch()` for JSON data. You must serve it from a local web server — opening `index.html` directly via `file://` will cause CORS errors.

### Option 1 — VS Code Live Server (Recommended)
1. Open the `Portfolio/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 2 — Node.js `serve`
```bash
cd Portfolio
npx serve .
```
Then open `http://localhost:3000`

### Option 3 — Python
```bash
cd Portfolio
python -m http.server 8080
```
Then open `http://localhost:8080`

---

## 📁 Architecture

```
Portfolio/
├── index.html              ← Assembly shell (mounts all modules)
│
├── css/                    ← Modular Design System
│   ├── variables.css       ← Design tokens & environment themes
│   ├── base.css            ← Reset & scrollbar
│   ├── typography.css      ← Heading, gradient text
│   ├── layout.css          ← Nav, containers, cursor
│   ├── components.css      ← Glass panels, buttons, AI assistant
│   ├── animations.css      ← Loader, return-to-origin keyframes
│   ├── hero.css            ← Hero section & portrait
│   ├── about.css           ← About section
│   ├── skills.css          ← Skill capsules
│   ├── projects.css        ← Project cards & case study modals
│   ├── timeline.css        ← Timeline, experience, achievements
│   ├── contact.css         ← Contact cards & social dock
│   ├── terminal.css        ← Developer Terminal
│   ├── footer.css          ← Digital Observatory ending
│   ├── themes.css          ← Time-of-day & matrix themes
│   └── responsive.css      ← All media queries
│
├── js/                     ← ES Module System
│   ├── main.js             ← Bootstrapper — orchestrates all modules
│   ├── loader.js           ← AI Boot Loader animation
│   ├── theme.js            ← Time-of-day environment detection
│   ├── cursor.js           ← Custom cursor & hover effects
│   ├── particles.js        ← Three.js neural network background
│   ├── scroll.js           ← Lenis smooth scroll
│   ├── navigation.js       ← Navbar & active links
│   ├── hero.js             ← Typewriter & 3D tilt portrait
│   ├── skills.js           ← Skills renderer (from skills.json)
│   ├── projects.js         ← Project cards & case study modals
│   ├── timeline.js         ← Timeline & achievements renderer
│   ├── animations.js       ← GSAP ScrollTrigger reveals
│   ├── terminal.js         ← Developer Terminal engine
│   ├── search.js           ← Universal search & highlight
│   └── utils.js            ← fetchJson, clamp, debounce
│
├── data/                   ← JSON Data Layer
│   ├── projects.json       ← Project case studies
│   ├── skills.json         ← Skill taxonomy
│   ├── commands.json       ← Terminal command registry
│   ├── timeline.json       ← Education milestones
│   ├── achievements.json   ← Recognition & awards
│   ├── experience.json     ← Work history
│   └── library.json        ← Digital library index
│
├── components/             ← HTML Component Templates (reference)
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── timeline.html
│   ├── contact.html
│   ├── footer.html
│   └── terminal.html
│
├── assets/                 ← Static Assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── audio/
│
└── docs/                   ← Project Documentation
    ├── README.md
    ├── ARCHITECTURE.md
    ├── ROADMAP.md
    └── CHANGELOG.md
```

---

## ⌨️ Developer Terminal

Open the terminal with:
- `Ctrl + K` (Windows/Linux)
- `⌘ + K` (macOS)
- `` ` `` (tilde key, when not in an input)
- Click **"⌘ Ctrl+K"** button in the navbar

### Commands
| Command | Action |
|---|---|
| `help` | Show all commands |
| `whoami` | Display profile card |
| `about / projects / skills / contact` | Navigate to section |
| `open <project>` | Open case study (psych, attendify, sustainable, chatbot) |
| `find <skill>` | Highlight matching skill |
| `search <query>` | Search skills & projects |
| `theme <name>` | Switch theme (matrix, morning, afternoon, sunset, night) |
| `resume` | Download resume |
| `github / linkedin` | Open social profiles |
| `stats` | Portfolio statistics |
| `history` | Command history |
| `origin` | Scroll to top |
| `matrix / coffee / quote` | Easter eggs |
| `sudo hire harsh` | 🎉 |
| `42` | The answer |
| `konami` | ↑↑↓↓←→←→BA |

---

## 🎨 Design System

### Color Tokens (CSS Variables)
- `--accent-primary` — Purple `#8b5cf6`
- `--accent-secondary` — Blue `#3b82f6`
- `--accent-cyan` — Cyan `#06b6d4`
- `--bg-dark` — Deep dark `#030308`
- `--gradient-primary` — Purple → Blue → Cyan

### Time-of-Day Themes
The site automatically detects the time of day:
- 🌅 **Morning** (6–12) — Amber palette
- ☀️ **Afternoon** (12–17) — Default purple/cyan
- 🌇 **Sunset** (17–20) — Pink/orange palette
- 🌙 **Night** (20–6) — Indigo palette

Switch manually via terminal: `theme morning`

---

## 🏆 Performance Targets
- **FPS:** 60–120
- **Lighthouse:** 90+
- **WCAG:** AA compliant
- **CLS:** 0
- **GPU:** Accelerated (Three.js + GSAP will-change)

---

## 📬 Contact
**Harsh Dubey** — harshitd585@gmail.com · +91 9321521258 · Mumbai, India

[LinkedIn](https://www.linkedin.com/in/harsh-dubey-640a68389/) · [GitHub](https://github.com/chillingbing648-sketch)
