/**
 * Premium Custom Cursor & Ambient Glow Engine
 *
 * Features:
 * - Smooth lagging cursor orb
 * - Instant cursor dot
 * - Ambient mouse-following glow
 * - Smart hover states
 * - Button/card ripple effects
 * - Mobile/touch protection
 * - Reduced-motion support
 * - Safe re-binding without duplicate listeners
 * - Automatic cleanup
 */

let cursorCleanup = null;

export function initCursor() {
    // Prevent duplicate initialization
    if (cursorCleanup) {
        cursorCleanup();
        cursorCleanup = null;
    }

    const cursorDot = document.getElementById("cursorDot");
    const cursorOrb = document.getElementById("cursorOrb");
    const ambientGlow = document.getElementById("ambientGlow");

    if (!cursorDot || !cursorOrb) return;

    // Don't run custom cursor on touch devices
    const isTouchDevice =
        window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouchDevice) {
        cursorDot.style.display = "none";
        cursorOrb.style.display = "none";
        if (ambientGlow) ambientGlow.style.display = "none";
        return;
    }

    // Respect accessibility preferences
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let orbX = mouseX;
    let orbY = mouseY;

    let animationFrame = null;
    let isRunning = false;

    // Smooth orb interpolation with idle convergence sleep
    const renderCursor = () => {
        if (document.hidden) {
            isRunning = false;
            animationFrame = null;
            return;
        }

        const dx = mouseX - orbX;
        const dy = mouseY - orbY;

        // When orb converges to cursor target or in reduced-motion, sleep the animation loop
        if (prefersReducedMotion || (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1)) {
            orbX = mouseX;
            orbY = mouseY;
            cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
            isRunning = false;
            animationFrame = null;
            return;
        }

        orbX += dx * 0.14;
        orbY += dy * 0.14;

        cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
        animationFrame = requestAnimationFrame(renderCursor);
    };

    const startLoop = () => {
        if (!isRunning) {
            isRunning = true;
            animationFrame = requestAnimationFrame(renderCursor);
        }
    };

    const handleMouseMove = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        // Instant dot
        cursorDot.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Ambient glow
        if (ambientGlow) {
            ambientGlow.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove, {
        passive: true
    });

    const handleVisibilityChange = () => {
        if (!document.hidden) {
            startLoop();
        } else if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
            isRunning = false;
        }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial positioning
    startLoop();

    const removeListeners = bindHoverTargets({
        cursorOrb,
        reducedMotion: prefersReducedMotion
    });

    // Cleanup function
    cursorCleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("visibilitychange", handleVisibilityChange);

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        isRunning = false;

        removeListeners?.();

        cursorOrb.classList.remove("hover-active", "hover-link");
        cursorOrb.removeAttribute("data-cursor");
    };

    return cursorCleanup;
}


/**
 * Bind hover interactions and ripple effects
 */
export function bindHoverTargets({
    cursorOrb = document.getElementById("cursorOrb"),
    reducedMotion = false
} = {}) {
    if (!cursorOrb) {
        return () => {};
    }

    const hoverSelector = [
        "a",
        "button",
        ".btn",
        ".glass-panel",
        ".skill-capsule",
        ".contact-card-interactive",
        ".social-card-item",
        ".project-card",
        ".constellation-node",
        ".loader-skip-btn",
        ".library-tab",
        ".nav-mobile-terminal-btn",
        ".terminal-close-action",
        ".term-dot"
    ].join(",");

    const hoverTargets = document.querySelectorAll(hoverSelector);

    const listeners = [];

    const addListener = (element, event, handler) => {
        element.addEventListener(event, handler);
        listeners.push(() => {
            element.removeEventListener(event, handler);
        });
    };

    // -----------------------------
    // Hover interaction
    // -----------------------------

    hoverTargets.forEach((target) => {
        const isInteractive =
            target.matches("a, button, .btn");

        const handleEnter = () => {
            cursorOrb.classList.remove("hover-active", "hover-link");

            cursorOrb.classList.add(
                isInteractive ? "hover-active" : "hover-link"
            );

            cursorOrb.dataset.cursor =
                isInteractive ? "interactive" : "hover";
        };

        const handleLeave = () => {
            cursorOrb.classList.remove(
                "hover-active",
                "hover-link"
            );

            delete cursorOrb.dataset.cursor;
        };

        addListener(target, "mouseenter", handleEnter);
        addListener(target, "mouseleave", handleLeave);
    });

    // -----------------------------
    // Ripple interaction
    // -----------------------------

    const rippleTargets = document.querySelectorAll(
        ".btn, .contact-card-interactive, .social-card-item"
    );

    rippleTargets.forEach((element) => {
        const handleClick = (event) => {
            if (reducedMotion) return;

            const rect = element.getBoundingClientRect();

            const size = Math.max(
                rect.width,
                rect.height
            );

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            element.appendChild(ripple);

            ripple.addEventListener(
                "animationend",
                () => ripple.remove(),
                { once: true }
            );
        };

        addListener(element, "click", handleClick);
    });

    // -----------------------------
    // Cleanup
    // -----------------------------

    return () => {
        listeners.forEach((remove) => remove());
    };
}