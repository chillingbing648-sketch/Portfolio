/**
 * js/liquid-button-mount.jsx
 * Mounts the PremiumCard and LiquidButton React components into the portfolio.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PremiumCard } from '../PremiumCard.jsx';
import LiquidButton from '../LiquidButton.jsx';

let _root = null;

export function initLiquidButton() {
    const cardMount = document.getElementById('archiveEditorialMount');
    if (cardMount) {
        try {
            if (!_root) {
                _root = createRoot(cardMount);
            }
            _root.render(
                <PremiumCard
                    href="projects/"
                    eyebrow="The complete universe"
                    title="Explore Beyond the Featured Work"
                />
            );
            return;
        } catch (err) {
            console.error('[PremiumCard] Mount error:', err);
        }
    }

    // Fallback if only button mount is present
    const btnMount = document.getElementById('exploreArchiveMount');
    if (btnMount) {
        try {
            if (!_root) {
                _root = createRoot(btnMount);
            }
            _root.render(
                <LiquidButton
                    href="projects/"
                    id="exploreArchiveBtn"
                    aria-label="Explore All Projects in Aether Archive"
                >
                    Explore All Projects <span className="lqb-arrow" aria-hidden="true">↗</span>
                </LiquidButton>
            );
        } catch (err) {
            console.error('[LiquidButton] Mount error:', err);
        }
    }
}

export const initPremiumCard = initLiquidButton;
