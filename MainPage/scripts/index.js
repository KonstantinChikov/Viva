import { isLoggedIn } from './util.js'

function redirect() {
    if (isLoggedIn()) {
        return;
    }
    
    window.location.href = '../LogInRegisterPage/index.html';
}

redirect();

document.addEventListener('DOMContentLoaded', () => {
    // Heart button toggle
    const heartButtons = document.querySelectorAll('.heart-button');
    heartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.stopPropagation();
            button.textContent = button.textContent === '🤍' ? '❤️' : '🤍';
        });
    });

    // Grid-item navigation
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                // da go eba
            }
        });
    });
});
