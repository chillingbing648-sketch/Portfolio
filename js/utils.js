/**
 * Utility functions module for Aether Portfolio
 */

/**
 * Safely fetch JSON data with fallback
 * @param {string} url 
 * @param {any} fallbackData 
 * @returns {Promise<any>}
 */
export async function fetchJson(url, fallbackData = []) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn(`[Aether Data] Fetch failed for ${url}, using fallback dataset.`, err);
        return fallbackData;
    }
}

/**
 * Clamp a number between min and max
 */
export function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

/**
 * Debounce function execution
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
