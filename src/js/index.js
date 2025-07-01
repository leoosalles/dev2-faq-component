const buttons = document.querySelectorAll('.faq-question');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        togglePanel(button);
    });

    button.addEventListener('keydown', (event) => {
        if(event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            togglePanel(button);
        };
    });
});

function togglePanel(button) {
    const content = document.getElementById(button.getAttribute('aria-controls'));

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    buttons.forEach(btn => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));

        btn.setAttribute('aria-expanded', 'false');

        panel.hidden = true;
        panel.style.maxHeight = null;

        btn.querySelector('.btn-details').classList.remove('open');
    });

    if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');

        content.hidden = false;

        button.querySelector('.btn-details').classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
    };
};