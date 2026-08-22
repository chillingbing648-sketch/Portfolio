export function initPitchModal() {
    const modal = document.getElementById('pitch-modal');
    if (!modal) return;

    const steps = [...modal.querySelectorAll('[data-pitch-step]')];
    const progressSteps = [...modal.querySelectorAll('[data-progress-step]')];
    const choices = [...modal.querySelectorAll('[data-project-type]')];
    const customWrap = modal.querySelector('.pitch-custom-type');
    const customInput = modal.querySelector('#pitch-custom-input');
    const summaryInput = modal.querySelector('#pitch-summary');
    let currentStep = 1;
    let projectType = 'Web App';

    const setStep = stepNumber => {
        currentStep = stepNumber;
        steps.forEach(step => {
            const active = Number(step.dataset.pitchStep) === stepNumber;
            step.classList.toggle('active', active);
            step.disabled = !active;
        });
        progressSteps.forEach(step => step.classList.toggle('active', Number(step.dataset.progressStep) <= stepNumber));
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('pitch-modal-open');
    };

    const openModal = () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pitch-modal-open');
        setStep(1);
        modal.querySelector('.pitch-choice.selected')?.focus();
    };

    const copyMessage = message => {
        if (navigator.clipboard) navigator.clipboard.writeText(message);
    };

    const handleConnect = (platform, selectedType, customType, summary) => {
        const finalType = selectedType === 'Other' ? customType : selectedType;
        const message = `Hey! I have a project idea for a ${finalType}.\n\nSummary: ${summary}\n\nLet's chat!`;
        const encodedMessage = encodeURIComponent(message);

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/919321521258?text=${encodedMessage}`, '_blank');
                break;
            case 'instagram':
                copyMessage(message);
                alert('Message copied to clipboard! Paste it directly in my IG DMs.');
                window.open('https://www.instagram.com/harrshittt87/', '_blank');
                break;
            case 'discord':
                copyMessage(message);
                alert('Project pitch copied to clipboard! Add me on Discord: harshit00597');
                break;
            default:
                break;
        }
    };

    document.querySelectorAll('.pitch-idea-trigger').forEach(trigger => trigger.addEventListener('click', openModal));
    modal.querySelectorAll('[data-pitch-close]').forEach(trigger => trigger.addEventListener('click', closeModal));

    choices.forEach(choice => choice.addEventListener('click', () => {
        choices.forEach(item => item.classList.remove('selected'));
        choice.classList.add('selected');
        projectType = choice.dataset.projectType;
        const isOther = projectType === 'Other';
        customWrap.classList.toggle('visible', isOther);
        customWrap.setAttribute('aria-hidden', String(!isOther));
        customInput.disabled = !isOther;
        if (isOther) customInput.focus();
    }));

    modal.querySelectorAll('[data-next-step]').forEach(button => button.addEventListener('click', () => {
        if (currentStep === 1 && projectType === 'Other' && !customInput.value.trim()) return customInput.focus();
        if (currentStep === 2 && !summaryInput.value.trim()) return summaryInput.focus();
        setStep(Number(button.dataset.nextStep));
    }));
    modal.querySelectorAll('[data-prev-step]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.prevStep))));
    modal.querySelectorAll('[data-platform]').forEach(button => button.addEventListener('click', () => handleConnect(button.dataset.platform, projectType, customInput.value.trim(), summaryInput.value.trim())));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
}
