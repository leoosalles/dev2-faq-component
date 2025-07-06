const buttons = document.querySelectorAll('.faq-question');

function togglePanel(button) {
    const content = document.getElementById(button.getAttribute('aria-controls'));

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    buttons.forEach(btn => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));

        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.btn-details').classList.remove('open');

        if (!panel.hidden) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            void panel.offsetHeight;
            panel.style.maxHeight = '0px';

            panel.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'max-height') {
                    panel.hidden = true;
                    panel.removeEventListener('transitionend', handler);
                }
            });
        } else {
            panel.hidden = true;
            panel.style.maxHeight = null;
        };
    });

    if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');

        content.hidden = false;

        button.querySelector('.btn-details').classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
    };
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        togglePanel(button);
    });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            togglePanel(button);
        };
    });
});