/**
 * AETHER — PITCH AN IDEA MULTI-STEP WORKFLOW CONTROLLER
 * Steps: 01 Choose Domain → 02 Describe Idea → 03 Choose Contact Channel → 04 Launch Conversation
 * Preserves inputs, provides tactile directional transitions, and executes channel dispatch.
 */

export function initPitchModal() {
    const modal = document.getElementById('pitch-modal');
    if (!modal) return;

    // Elements
    const stepViews = [...modal.querySelectorAll('[data-pitch-step]')];
    const stepIndicators = [...modal.querySelectorAll('.pitch-step-indicator')];
    const trackFills = [
        modal.querySelector('#trackFill1'),
        modal.querySelector('#trackFill2'),
        modal.querySelector('#trackFill3')
    ];

    // Step 1: Domain
    const domainButtons = [...modal.querySelectorAll('.pitch-choice')];
    const customWrap = modal.querySelector('#pitch-custom-wrap');
    const customInput = modal.querySelector('#pitch-custom-input');

    // Step 2: Idea
    const summaryInput = modal.querySelector('#pitch-summary');
    const charCounter = modal.querySelector('#pitch-char-counter');
    const starterChips = [...modal.querySelectorAll('.starter-chip')];

    // Step 3: Channel
    const channelCards = [...modal.querySelectorAll('.pitch-channel-card')];

    // Step 4: Launch & Review
    const reviewDomain = modal.querySelector('#pitchReviewDomain');
    const reviewChannel = modal.querySelector('#pitchReviewChannel');
    const previewBody = modal.querySelector('#pitchPreviewBody');
    const launchBtn = modal.querySelector('#pitchLaunchBtn');
    const launchBtnText = modal.querySelector('#launchBtnText');
    const launchBtnIcon = modal.querySelector('#launchBtnIcon');
    const copyBtn = modal.querySelector('#pitchCopyBtn');
    const copyBtnText = modal.querySelector('#copyBtnText');
    const statusStrip = modal.querySelector('#pitchStatusStrip');
    const statusMsg = modal.querySelector('#pitchStatusMsg');

    // Navigation Buttons
    const nextButtons = [...modal.querySelectorAll('[data-next-step]')];
    const prevButtons = [...modal.querySelectorAll('[data-prev-step]')];
    const closeButtons = [...modal.querySelectorAll('[data-pitch-close]')];
    const triggers = [...document.querySelectorAll('.pitch-idea-trigger')];

    // Channel Metadata
    const CHANNEL_DATA = {
        whatsapp: {
            name: 'WhatsApp',
            badge: 'Instant',
            actionText: 'Launch on WhatsApp',
            destUrl: (msg) => `https://wa.me/919321521258?text=${encodeURIComponent(msg)}`,
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/></svg>`
        },
        instagram: {
            name: 'Instagram DM',
            badge: 'Visual & Direct',
            actionText: 'Open Instagram & Send Pitch',
            destUrl: () => 'https://www.instagram.com/harrshittt87/',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
        },
        discord: {
            name: 'Discord',
            badge: 'Developer',
            actionText: 'Copy Pitch & Connect on Discord',
            destUrl: () => null,
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`
        }
    };

    // State
    let currentStep = 1;
    let maxVisitedStep = 1;
    let selectedDomain = 'Web Application';
    let selectedChannel = 'whatsapp';
    let previousActiveElement = null;
    let statusTimer = null;

    const defaultStatus = 'Typical turnaround within 24 hours · Mumbai, India (IST)';

    // Status Message Toast
    const setStatus = (msg, isSuccess = false) => {
        if (statusTimer) clearTimeout(statusTimer);
        if (!statusStrip || !statusMsg) return;

        statusMsg.textContent = msg;
        statusStrip.classList.toggle('status-success', isSuccess);

        statusTimer = setTimeout(() => {
            statusMsg.textContent = defaultStatus;
            statusStrip.classList.remove('status-success');
        }, 5000);
    };

    // Synthesize Final Pitch Message
    const getResolvedDomain = () => {
        if (selectedDomain === 'Other') {
            const val = customInput ? customInput.value.trim() : '';
            return val || 'Custom Project Concept';
        }
        return selectedDomain;
    };

    const getFormattedPitch = () => {
        const domain = getResolvedDomain();
        const summary = summaryInput ? summaryInput.value.trim() : '';
        const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        if (summary) {
            return `Hey Harsh! I have a project idea for a ${domain}.\n\nSummary:\n${summary}\n\n[Transmitted via Aether Portfolio // ${timestamp}]\nLet's chat!`;
        }
        return `Hey Harsh! I came across your portfolio and would love to collaborate on a ${domain} project.\n\n[Transmitted via Aether Portfolio // ${timestamp}]\nLet's chat!`;
    };

    // Clipboard copy helper
    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch {
            try {
                const tempArea = document.createElement('textarea');
                tempArea.value = text;
                tempArea.style.position = 'fixed';
                tempArea.style.opacity = '0';
                document.body.appendChild(tempArea);
                tempArea.focus();
                tempArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(tempArea);
                return successful;
            } catch {
                return false;
            }
        }
        return false;
    };

    // Update Step 4 Review Card
    const updateReviewView = () => {
        const domain = getResolvedDomain();
        const channelMeta = CHANNEL_DATA[selectedChannel] || CHANNEL_DATA.whatsapp;

        if (reviewDomain) reviewDomain.textContent = domain;
        if (reviewChannel) reviewChannel.textContent = channelMeta.name;

        const pitchText = getFormattedPitch();
        if (previewBody) previewBody.textContent = pitchText;

        if (launchBtnText) launchBtnText.textContent = channelMeta.actionText;
        if (launchBtnIcon) launchBtnIcon.innerHTML = channelMeta.icon;
    };

    // Directional Step Transition Engine
    const setStep = (targetStep, direction = 'forward') => {
        if (targetStep < 1 || targetStep > 4) return;
        const prevStep = currentStep;
        currentStep = targetStep;

        if (targetStep > maxVisitedStep) {
            maxVisitedStep = targetStep;
        }

        // Stepper Progress Indicators
        stepIndicators.forEach((btn, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;

            btn.classList.toggle('active', isActive);
            btn.classList.toggle('completed', isCompleted);
            btn.setAttribute('aria-selected', String(isActive));
            btn.tabIndex = (stepNum <= maxVisitedStep) ? 0 : -1;
        });

        // Connector Track Lines
        if (trackFills[0]) trackFills[0].style.width = currentStep >= 2 ? '100%' : '0%';
        if (trackFills[1]) trackFills[1].style.width = currentStep >= 3 ? '100%' : '0%';
        if (trackFills[2]) trackFills[2].style.width = currentStep >= 4 ? '100%' : '0%';

        // Switch Step Views with Directional Motion
        stepViews.forEach(view => {
            const viewStep = Number(view.dataset.pitchStep);

            // Clean previous animation classes
            view.classList.remove(
                'pitch-slide-left-in',
                'pitch-slide-left-out',
                'pitch-slide-right-in',
                'pitch-slide-right-out'
            );

            if (viewStep === currentStep) {
                view.classList.add('active');
                view.disabled = false;
                view.removeAttribute('hidden');

                // Animate entry based on direction
                if (direction === 'forward') {
                    view.classList.add('pitch-slide-left-in');
                } else if (direction === 'backward') {
                    view.classList.add('pitch-slide-right-in');
                }

                // Auto-focus primary input in newly active step
                setTimeout(() => {
                    if (currentStep === 1) {
                        const sel = view.querySelector('.pitch-choice.selected');
                        if (sel) sel.focus();
                    } else if (currentStep === 2) {
                        if (summaryInput) summaryInput.focus();
                    } else if (currentStep === 3) {
                        const selCh = view.querySelector('.pitch-channel-card.selected');
                        if (selCh) selCh.focus();
                    } else if (currentStep === 4) {
                        if (launchBtn) launchBtn.focus();
                    }
                }, 80);
            } else if (viewStep === prevStep) {
                view.classList.remove('active');
                view.disabled = true;

                // Animate exit
                if (direction === 'forward') {
                    view.classList.add('pitch-slide-left-out');
                } else if (direction === 'backward') {
                    view.classList.add('pitch-slide-right-out');
                }
            } else {
                view.classList.remove('active');
                view.disabled = true;
            }
        });

        // Synthesize review card if entering Step 4
        if (currentStep === 4) {
            updateReviewView();
        }
    };

    // Step Validation
    const validateStep = (fromStep) => {
        if (fromStep === 1) {
            if (selectedDomain === 'Other') {
                const customVal = customInput ? customInput.value.trim() : '';
                if (!customVal) {
                    if (customInput) {
                        customInput.classList.add('input-shake');
                        customInput.focus();
                        setTimeout(() => customInput.classList.remove('input-shake'), 600);
                    }
                    return false;
                }
            }
            return true;
        }

        if (fromStep === 2) {
            const summaryVal = summaryInput ? summaryInput.value.trim() : '';
            if (!summaryVal) {
                if (summaryInput) {
                    summaryInput.classList.add('input-shake');
                    summaryInput.placeholder = 'Please write a brief note or pick a suggestion below to proceed...';
                    summaryInput.focus();
                    setTimeout(() => summaryInput.classList.remove('input-shake'), 600);
                }
                return false;
            }
            return true;
        }

        return true;
    };

    // Open & Close Modal
    const openModal = () => {
        previousActiveElement = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pitch-modal-open');

        // Reset to Step 1 on fresh open, preserving any user inputs
        setStep(1, 'neutral');
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('pitch-modal-open');

        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }
    };

    // Event Listeners: Triggers & Close
    triggers.forEach(trig => trig.addEventListener('click', openModal));
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-pitch-close')) {
            closeModal();
        }
    });

    // Event Listeners: Next & Prev Step
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStepNum = Number(btn.dataset.nextStep);
            if (validateStep(currentStep)) {
                setStep(nextStepNum, 'forward');
            }
        });
    });

    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStepNum = Number(btn.dataset.prevStep);
            setStep(prevStepNum, 'backward');
        });
    });

    // Stepper Indicator Direct Navigation
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetStep = Number(indicator.dataset.stepTarget);
            if (targetStep <= maxVisitedStep) {
                const dir = targetStep > currentStep ? 'forward' : 'backward';
                setStep(targetStep, dir);
            }
        });
    });

    // Step 1: Domain Selection
    domainButtons.forEach(button => {
        button.addEventListener('click', () => {
            domainButtons.forEach(b => {
                b.classList.remove('selected');
                b.setAttribute('aria-checked', 'false');
            });
            button.classList.add('selected');
            button.setAttribute('aria-checked', 'true');

            selectedDomain = button.dataset.domain;
            const isOther = selectedDomain === 'Other';

            if (customWrap) {
                customWrap.hidden = !isOther;
                if (isOther && customInput) {
                    customInput.focus();
                }
            }
        });
    });

    // Step 2: Idea Textarea Character Counter & Starters
    if (summaryInput) {
        summaryInput.addEventListener('input', () => {
            const len = summaryInput.value.length;
            if (charCounter) charCounter.textContent = `${len} / 500`;
        });
    }

    starterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (!summaryInput) return;
            const textToInsert = chip.dataset.insert;
            if (!summaryInput.value.trim()) {
                summaryInput.value = textToInsert;
            } else {
                summaryInput.value += ' ' + textToInsert;
            }
            summaryInput.dispatchEvent(new Event('input'));
            summaryInput.focus();
        });
    });

    // Step 3: Channel Selection
    channelCards.forEach(card => {
        card.addEventListener('click', () => {
            channelCards.forEach(c => {
                c.classList.remove('selected');
                c.setAttribute('aria-checked', 'false');
            });
            card.classList.add('selected');
            card.setAttribute('aria-checked', 'true');

            selectedChannel = card.dataset.channel;
        });
    });

    // Step 4: Launch Dispatch Execution
    if (launchBtn) {
        launchBtn.addEventListener('click', async () => {
            const pitchMessage = getFormattedPitch();
            const channelMeta = CHANNEL_DATA[selectedChannel] || CHANNEL_DATA.whatsapp;

            if (selectedChannel === 'whatsapp') {
                const targetUrl = channelMeta.destUrl(pitchMessage);
                setStatus('Opening WhatsApp with your pitch pre-filled…', true);
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
            } else if (selectedChannel === 'instagram') {
                await copyToClipboard(pitchMessage);
                setStatus('Pitch copied to clipboard! Paste directly in @harrshittt87 DM.', true);
                window.open('https://www.instagram.com/harrshittt87/', '_blank', 'noopener,noreferrer');
            } else if (selectedChannel === 'discord') {
                const discordText = `Discord: harshit00597\n\n${pitchMessage}`;
                await copyToClipboard(discordText);
                setStatus('Pitch and Discord tag (harshit00597) copied to clipboard!', true);
                if (launchBtnText) {
                    const original = launchBtnText.textContent;
                    launchBtnText.textContent = 'Copied to Clipboard ✓';
                    setTimeout(() => {
                        launchBtnText.textContent = original;
                    }, 3000);
                }
            }
        });
    }

    // Step 4: Secondary Copy Button
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const pitchMessage = getFormattedPitch();
            const success = await copyToClipboard(pitchMessage);

            if (success) {
                if (copyBtnText) copyBtnText.textContent = 'Copied to Clipboard ✓';
                setStatus('Pitch brief copied to clipboard!', true);
                setTimeout(() => {
                    if (copyBtnText) copyBtnText.textContent = 'Copy Pitch Text';
                }, 2500);
            }
        });
    }

    // Keyboard Accessibility (Escape to close, Tab trapping)
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }

        // Trap focus inside modal
        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll(
                'button:not([disabled]):not([hidden]), [href], input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
            );
            const focusableArr = [...focusable].filter(el => el.offsetParent !== null);
            if (focusableArr.length === 0) return;

            const firstEl = focusableArr[0];
            const lastEl = focusableArr[focusableArr.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    });
}
