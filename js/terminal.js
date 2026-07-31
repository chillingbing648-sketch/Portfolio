/**
 * js/terminal.js
 * Developer Terminal — Full OS-Grade Command Engine
 * Features: Parser · Autocomplete · History · Syntax Highlight · Easter Eggs
 */

import { searchSkills, searchProjects } from './search.js';
import { setThemeClass } from './theme.js';
import { openModal } from './projects.js';

const COMMANDS = [
    'help','whoami','about','projects','skills','experience','education',
    'timeline','achievements','resume','github','linkedin','contact','stats',
    'search','history','pwd','date','time','theme','matrix','coffee',
    'quote','future','origin','clear','exit','open','find'
];

const QUOTES = [
    '"The only way to do great work is to love what you do." — Steve Jobs',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"The best error message is the one that never shows up." — Thomas Fuchs'
];

let history = JSON.parse(localStorage.getItem('aether-terminal-history') || '[]');
let historyIdx = -1;
let isOpen = false;
let konamiStep = 0;
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const autocomplete = document.getElementById('term-autocomplete');
    if (!overlay || !input || !output) return;

    // ── Open / Close ────────────────────────────────────────────────────────
    function openTerminal() {
        if (isOpen) return;
        isOpen = true;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 350);
        if (!output.innerHTML.trim()) printWelcome();
    }

    function closeTerminal() {
        if (!isOpen) return;
        isOpen = false;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        input.value = '';
        clearSuggestions();
    }

    // Trigger sources
    document.getElementById('terminalTrigger')?.addEventListener('click', openTerminal);
    document.querySelector('#term-close-dot')?.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeTerminal(); });

    document.addEventListener('keydown', e => {
        // Konami code
        if (e.key === KONAMI[konamiStep]) {
            konamiStep++;
            if (konamiStep === KONAMI.length) { konamiStep = 0; openTerminal(); executeCommand('konami'); }
        } else { konamiStep = 0; }

        // Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); isOpen ? closeTerminal() : openTerminal(); return; }
        // Tilde
        if (e.key === '`' && !isOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { openTerminal(); return; }
        // Escape
        if (e.key === 'Escape' && isOpen) { closeTerminal(); return; }
    });

    // ── Input Handling ────────────────────────────────────────────────────────
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (cmd) {
                history.unshift(cmd);
                if (history.length > 50) history.pop();
                localStorage.setItem('aether-terminal-history', JSON.stringify(history));
                historyIdx = -1;
                appendLine('prompt', `harsh@universe:~$ ${cmd}`);
                executeCommand(cmd.toLowerCase());
            }
            input.value = '';
            clearSuggestions();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIdx < history.length - 1) { historyIdx++; input.value = history[historyIdx] || ''; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx > 0) { historyIdx--; input.value = history[historyIdx] || ''; }
            else { historyIdx = -1; input.value = ''; }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = input.value.trim().toLowerCase();
            const matches = COMMANDS.filter(c => c.startsWith(partial));
            if (matches.length === 1) { input.value = matches[0]; clearSuggestions(); }
            else if (matches.length > 1) { showSuggestions(matches); }
        }
    });

    input.addEventListener('input', () => {
        const val = input.value.trim().toLowerCase();
        if (!val) { clearSuggestions(); return; }
        const matches = COMMANDS.filter(c => c.startsWith(val));
        showSuggestions(matches.slice(0, 8));
    });

    // ── Suggestions ──────────────────────────────────────────────────────────
    function showSuggestions(matches) {
        if (!autocomplete) return;
        autocomplete.innerHTML = matches.map(m =>
            `<button class="term-suggestion" tabindex="-1">${m}</button>`
        ).join('');
        autocomplete.querySelectorAll('.term-suggestion').forEach(btn => {
            btn.addEventListener('mousedown', e => {
                e.preventDefault();
                input.value = btn.textContent;
                input.focus();
                clearSuggestions();
            });
        });
    }

    function clearSuggestions() {
        if (autocomplete) autocomplete.innerHTML = '';
    }

    // ── Output Helpers ────────────────────────────────────────────────────────
    function appendLine(type, text, delay = 0) {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = `term-line`;

            if (type === 'prompt') {
                div.innerHTML = `<span class="term-prompt">harsh@universe:~$&nbsp;</span><span class="term-command">${escHtml(text.replace(/^harsh@universe:~\$\s*/, ''))}</span>`;
            } else if (type === 'separator') {
                div.innerHTML = `<span class="term-separator">${text}</span>`;
            } else {
                div.innerHTML = `<span class="term-${type}">${text}</span>`;
            }

            output.appendChild(div);
            output.scrollTop = output.scrollHeight;
        }, delay);
    }

    function appendBlock(lines, baseDelay = 0) {
        lines.forEach(([type, text], i) => appendLine(type, text, baseDelay + i * 30));
    }

    function printWelcome() {
        appendBlock([
            ['separator', '╔══════════════════════════════════════════════════════╗'],
            ['success',   '  ✦ AETHER OS v4.0 — Harsh Dubey\'s Digital Universe'],
            ['separator', '╚══════════════════════════════════════════════════════╝'],
            ['info',      '  Type <span class="term-highlight">help</span> to explore available commands.'],
            ['response',  '  Press <span class="term-highlight">Tab</span> for autocomplete · <span class="term-highlight">↑↓</span> for history'],
            ['separator', '─────────────────────────────────────────────────────────'],
        ]);
    }

    // ── Command Executor ──────────────────────────────────────────────────────
    function executeCommand(raw) {
        const parts = raw.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1).join(' ');

        const scroll = id => {
            closeTerminal();
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
        };

        switch (cmd) {

            case 'help':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  NAVIGATION'],
                    ['response',  '  about · projects · skills · experience · education · timeline · contact'],
                    ['highlight', '  ACTIONS'],
                    ['response',  '  resume · github · linkedin · open &lt;project&gt; · find &lt;skill&gt; · search &lt;query&gt;'],
                    ['highlight', '  SYSTEM'],
                    ['response',  '  help · whoami · stats · history · pwd · date · time · theme &lt;name&gt; · clear · exit'],
                    ['highlight', '  CREATIVE'],
                    ['response',  '  matrix · coffee · quote · future · origin'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['info',      '  <span class="term-highlight">hint:</span> try "sudo hire harsh" 👀'],
                ]);
                break;

            case 'whoami':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['success',   '  Harsh Dubey'],
                    ['response',  '  AI Developer · Creative Engineer · Student'],
                    ['response',  '  📍 Mumbai, India'],
                    ['response',  '  🎓 BSc IT · Thakur College · GPA 9.1'],
                    ['response',  '  ⚡ Specialising in AI integration & cinematic web experiences'],
                    ['response',  '  🏆 Hackathon Winner · Top 5% Competitor · Debate Champion'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'about':
                appendLine('success', '  ↓ Navigating to About section...');
                scroll('about');
                break;

            case 'projects':
                appendLine('success', '  ↓ Navigating to Projects section...');
                scroll('projects');
                break;

            case 'skills':
                appendLine('success', '  ↓ Navigating to Skills section...');
                scroll('about');
                break;

            case 'experience':
                appendLine('success', '  ↓ Navigating to Experience section...');
                scroll('work');
                break;

            case 'education':
                appendLine('success', '  ↓ Navigating to Education timeline...');
                scroll('experience');
                break;

            case 'timeline':
                appendLine('success', '  ↓ Navigating to Timeline section...');
                scroll('experience');
                break;

            case 'contact':
                appendLine('success', '  ↓ Navigating to Contact section...');
                scroll('contact');
                break;

            case 'achievements':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  ACHIEVEMENTS'],
                    ['success',   '  🏆  IntraCollegiate Debate — 1st Place'],
                    ['success',   '  📊  PR Head · 2,000+ attendees · 1,000+ registrations'],
                    ['success',   '  🎓  Academic Excellence — GPA 9.1'],
                    ['success',   '  🥇  Hackathon First Prize — Sustainable Shopping AI'],
                    ['success',   '  ⭐  Top 5% of 500 competitors — Real-Time Chatbot'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'resume':
                appendLine('success', '  ↓ Downloading resume...');
                closeTerminal();
                setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = 'Harsh_Resume_Doc.pdf';
                    a.download = 'Harsh_Dubey_Resume.pdf';
                    a.click();
                }, 400);
                break;

            case 'github':
                appendLine('success', '  ↗ Opening GitHub profile...');
                closeTerminal();
                setTimeout(() => window.open('https://github.com/chillingbing648-sketch', '_blank'), 400);
                break;

            case 'linkedin':
                appendLine('success', '  ↗ Opening LinkedIn profile...');
                closeTerminal();
                setTimeout(() => window.open('https://www.linkedin.com/in/harsh-dubey-640a68389/', '_blank'), 400);
                break;

            case 'stats':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  PORTFOLIO STATS'],
                    ['info',      `  Uptime      : ${Math.floor(Math.random() * 8000 + 1000)}ms`],
                    ['info',      '  Projects    : 4 shipped'],
                    ['info',      '  Skills      : 35+ technologies'],
                    ['info',      '  GPA         : 9.1 / 10'],
                    ['info',      '  FPS         : 60–120 ✓'],
                    ['info',      '  Lighthouse  : 92+ ✓'],
                    ['info',      '  Awwwards    : Pending submission 👀'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'history':
                if (!history.length) { appendLine('response', '  No commands in history yet.'); break; }
                appendLine('highlight', '  COMMAND HISTORY');
                history.slice(0, 20).forEach((h, i) => appendLine('response', `  ${String(i + 1).padStart(3, ' ')}  ${h}`));
                break;

            case 'pwd':
                appendLine('response', '  /universe/harsh-dubey/portfolio/v4');
                break;

            case 'date':
                appendLine('response', `  ${new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}`);
                break;

            case 'time':
                appendLine('response', `  ${new Date().toLocaleTimeString('en-IN')} IST`);
                break;

            case 'theme':
                const themes = { matrix: 'theme-matrix', morning: 'env-morning', afternoon: 'env-afternoon', sunset: 'env-sunset', night: 'env-night', reset: '' };
                if (!args) {
                    appendLine('info', '  Usage: theme &lt;matrix|morning|afternoon|sunset|night|reset&gt;');
                } else if (themes[args] !== undefined) {
                    setThemeClass(themes[args]);
                    appendLine('success', `  ✓ Theme switched to: ${args}`);
                    closeTerminal();
                } else {
                    appendLine('error', `  Unknown theme: "${args}". Options: ${Object.keys(themes).join(', ')}`);
                }
                break;

            case 'origin':
                appendLine('success', '  ↑ Returning to origin...');
                closeTerminal();
                setTimeout(() => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(window, { scrollTo: { y: 0 }, duration: 1.8, ease: 'power4.inOut' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 300);
                break;

            case 'future':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  PLANNED FEATURES'],
                    ['info',      '  ⬡  Architecture Viewer — Visual dependency graph'],
                    ['info',      '  ⬡  GitHub Visualizer — Live contribution map'],
                    ['info',      '  ⬡  Digital Library — Books · Research · Learning'],
                    ['info',      '  ⬡  Project Workspace — Interactive code explorer'],
                    ['info',      '  ⬡  Mission Control — AI dashboard'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'quote':
                appendLine('info', `  "${QUOTES[Math.floor(Math.random() * QUOTES.length)]}"`);
                break;

            case 'search':
                if (!args) { appendLine('error', '  Usage: search &lt;keyword&gt;'); break; }
                const skillCount = searchSkills(args);
                const projCount = searchProjects(args);
                const total = skillCount + projCount;
                if (total > 0) {
                    appendLine('success', `  ✓ Found ${total} results for "${args}" (${skillCount} skills, ${projCount} projects)`);
                    closeTerminal();
                } else {
                    appendLine('error', `  No results found for "${args}"`);
                }
                break;

            case 'find':
                if (!args) { appendLine('error', '  Usage: find &lt;skill&gt;'); break; }
                const n = searchSkills(args);
                if (n) { appendLine('success', `  ✓ Found ${n} skill(s) matching "${args}"`); closeTerminal(); }
                else { appendLine('error', `  Skill "${args}" not found in the stack.`); }
                break;

            case 'open':
                const projectMap = {
                    'psych': 'modal-psych', 'psychology': 'modal-psych',
                    'attendify': 'modal-attendify', 'attendance': 'modal-attendify',
                    'sustainable': 'modal-sustainable', 'shopping': 'modal-sustainable',
                    'chatbot': 'modal-chatbot', 'chat': 'modal-chatbot'
                };
                if (!args) { appendLine('error', '  Usage: open &lt;psych|attendify|sustainable|chatbot&gt;'); break; }
                const modalId = projectMap[args.toLowerCase()];
                if (modalId) {
                    appendLine('success', `  ↗ Opening case study: ${args}`);
                    closeTerminal();
                    setTimeout(() => openModal(modalId), 350);
                } else {
                    appendLine('error', `  Unknown project "${args}". Options: psych, attendify, sustainable, chatbot`);
                }
                break;

            case 'clear':
                output.innerHTML = '';
                break;

            case 'exit':
                appendLine('response', '  Goodbye. The universe awaits.');
                setTimeout(closeTerminal, 600);
                break;

            case 'matrix':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['success',   '  INITIATING MATRIX MODE...'],
                    ['info',      '  Wake up, Neo...'],
                    ['info',      '  The Matrix has you.'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                setThemeClass('theme-matrix');
                closeTerminal();
                break;

            case 'coffee':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['success',   '  ☕ Brewing...'],
                    ['response',  '       ) ) )'],
                    ['response',  '      ( ( ('],
                    ['response',  '    ._______.'],
                    ['response',  '    |       |]'],
                    ['response',  '    \\       /'],
                    ['response',  '     `-----\''],
                    ['info',      '  This code was powered by coffee.'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            // ── Easter Eggs ───────────────────────────────────────────────────
            case 'sudo':
                if (raw.includes('hire harsh')) {
                    appendBlock([
                        ['separator', '══════════════════════════════════════════════════════'],
                        ['success',   ''],
                        ['success',   '  ██╗  ██╗██╗██████╗ ███████╗██████╗ '],
                        ['success',   '  ██║  ██║██║██╔══██╗██╔════╝██╔══██╗'],
                        ['success',   '  ███████║██║██████╔╝█████╗  ██║  ██║'],
                        ['success',   '  ██╔══██║██║██╔══██╗██╔══╝  ██║  ██║'],
                        ['success',   '  ██║  ██║██║██║  ██║███████╗██████╔╝'],
                        ['success',   '  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ '],
                        ['success',   ''],
                        ['highlight', '  ✦ REQUEST ACCEPTED BY THE UNIVERSE ✦'],
                        ['info',      '  harshitd585@gmail.com — +91 9321521258'],
                        ['separator', '══════════════════════════════════════════════════════'],
                    ]);
                    triggerHireAnimation();
                } else {
                    appendLine('error', '  Permission denied. But... have you tried "sudo hire harsh"? 😄');
                }
                break;

            case '42':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  42'],
                    ['response',  '  The answer to life, the universe, and everything.'],
                    ['info',      '  — The Hitchhiker\'s Guide to the Galaxy'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'konami':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['success',   '  ↑↑↓↓←→←→BA'],
                    ['highlight', '  CHEAT CODE ACTIVATED'],
                    ['info',      '  +30 lives. You\'re welcome.'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'developer':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  DEVELOPER PROFILE'],
                    ['info',      '  Stack    : HTML · CSS · JS · React · Node · Three.js · GSAP'],
                    ['info',      '  AI Stack : Claude API · OpenAI · Prompt Engineering · RAG'],
                    ['info',      '  DevOps   : Git · Docker · Vercel · CI/CD'],
                    ['info',      '  Arch     : MVC · REST · System Design · Modular'],
                    ['info',      '  GPA      : 9.1 | Projects: 4+ | Hackathon: 🥇'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'debug':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['highlight', '  DEBUG MODE'],
                    ['info',      `  User Agent : ${navigator.userAgent.substring(0, 50)}...`],
                    ['info',      `  Resolution : ${window.innerWidth}×${window.innerHeight}`],
                    ['info',      `  DevPixelRatio : ${window.devicePixelRatio}`],
                    ['info',      `  Timestamp  : ${Date.now()}`],
                    ['info',      `  Memory     : ${navigator.deviceMemory || 'N/A'} GB`],
                    ['info',      `  Cores      : ${navigator.hardwareConcurrency || 'N/A'}`],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            case 'hello':
                appendBlock([
                    ['separator', '─────────────────────────────────────────────────────────'],
                    ['success',   '  Hello, curious traveller. 👋'],
                    ['response',  '  You found the terminal. You\'re clearly someone who'],
                    ['response',  '  explores beyond the surface.'],
                    ['info',      '  Harsh would love to build something with you.'],
                    ['info',      '  → harshitd585@gmail.com'],
                    ['separator', '─────────────────────────────────────────────────────────'],
                ]);
                break;

            default:
                appendLine('error', `  Command not found: "${cmd}". Type <span class="term-highlight">help</span> for commands.`);
        }
    }

    // ── Hire Animation ───────────────────────────────────────────────────────
    function triggerHireAnimation() {
        if (typeof gsap === 'undefined') return;
        const tl = gsap.timeline();
        tl.to('body', { filter: 'hue-rotate(60deg) brightness(1.2)', duration: 0.3, repeat: 3, yoyo: true, ease: 'none' })
          .to('body', { filter: 'none', duration: 0.5 });
    }
}

// HTML escape helper
function escHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
