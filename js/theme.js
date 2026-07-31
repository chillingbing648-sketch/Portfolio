/**
 * Theme & Dynamic Environment System
 */

export function initEnvironmentTheme() {
    const hour = new Date().getHours();
    let envClass;
    if (hour >= 6 && hour < 12) envClass = 'env-morning';
    else if (hour >= 12 && hour < 17) envClass = 'env-afternoon';
    else if (hour >= 17 && hour < 20) envClass = 'env-sunset';
    else envClass = 'env-night';

    document.body.classList.add(envClass);
}

export function setThemeClass(themeName) {
    document.body.classList.remove('env-morning', 'env-afternoon', 'env-sunset', 'env-night', 'theme-matrix');
    if (themeName) {
        document.body.classList.add(themeName);
    } else {
        initEnvironmentTheme();
    }
}
